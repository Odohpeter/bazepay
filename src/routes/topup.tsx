import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import { Flag } from "@/components/country-picker";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Banknote,
  Check,
  ChevronDown,
  ChevronRight,
  Delete,
  ShieldCheck,
  Copy,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { usePinGate } from "@/components/pin-prompt";

export const Route = createFileRoute("/topup")({
  head: () => ({
    meta: [
      { title: "Top up — BazePay" },
      { name: "description", content: "Add money to your BazePay wallet." },
    ],
  }),
  component: TopupFlow,
});

type Method = {
  id: string;
  label: string;
  sub: string;
  icon: typeof CreditCard;
  fee: string;
  arrival: string;
};

const METHODS: Method[] = [
  { id: "card", label: "Debit / Credit card", sub: "Visa · Mastercard · Verve", icon: CreditCard, fee: "1.5% fee", arrival: "Instant" },
  { id: "transfer", label: "Bank transfer", sub: "Send to your unique account", icon: Building2, fee: "Free", arrival: "Under 30s" },
  { id: "ussd", label: "USSD", sub: "Pay with bank shortcode", icon: Banknote, fee: "Free", arrival: "Instant" },
];

type SrcCurrency = string;

type CurrencyInfo = { symbol: string; cc: string; rate: number; min: number; name: string };

const CURRENCY_META: Record<string, CurrencyInfo> = {
  NGN: { symbol: "₦", cc: "ng", rate: 1, min: 100, name: "Nigerian Naira" },
  USD: { symbol: "$", cc: "us", rate: 1542, min: 1, name: "US Dollar" },
  EUR: { symbol: "€", cc: "eu", rate: 1670, min: 1, name: "Euro" },
  GBP: { symbol: "£", cc: "gb", rate: 1952, min: 1, name: "British Pound" },
  CAD: { symbol: "C$", cc: "ca", rate: 1130, min: 1, name: "Canadian Dollar" },
  AUD: { symbol: "A$", cc: "au", rate: 1015, min: 1, name: "Australian Dollar" },
  NZD: { symbol: "NZ$", cc: "nz", rate: 920, min: 1, name: "New Zealand Dollar" },
  CHF: { symbol: "CHF", cc: "ch", rate: 1740, min: 1, name: "Swiss Franc" },
  JPY: { symbol: "¥", cc: "jp", rate: 10, min: 100, name: "Japanese Yen" },
  CNY: { symbol: "¥", cc: "cn", rate: 215, min: 5, name: "Chinese Yuan" },
  HKD: { symbol: "HK$", cc: "hk", rate: 198, min: 5, name: "Hong Kong Dollar" },
  SGD: { symbol: "S$", cc: "sg", rate: 1145, min: 1, name: "Singapore Dollar" },
  INR: { symbol: "₹", cc: "in", rate: 18, min: 50, name: "Indian Rupee" },
  AED: { symbol: "د.إ", cc: "ae", rate: 420, min: 5, name: "UAE Dirham" },
  SAR: { symbol: "﷼", cc: "sa", rate: 411, min: 5, name: "Saudi Riyal" },
  TRY: { symbol: "₺", cc: "tr", rate: 45, min: 10, name: "Turkish Lira" },
  ZAR: { symbol: "R", cc: "za", rate: 85, min: 10, name: "South African Rand" },
  KES: { symbol: "KSh", cc: "ke", rate: 12, min: 50, name: "Kenyan Shilling" },
  GHS: { symbol: "₵", cc: "gh", rate: 100, min: 5, name: "Ghanaian Cedi" },
  EGP: { symbol: "E£", cc: "eg", rate: 32, min: 10, name: "Egyptian Pound" },
  MAD: { symbol: "DH", cc: "ma", rate: 155, min: 5, name: "Moroccan Dirham" },
  XOF: { symbol: "CFA", cc: "sn", rate: 2.55, min: 500, name: "West African CFA" },
  BRL: { symbol: "R$", cc: "br", rate: 285, min: 5, name: "Brazilian Real" },
  MXN: { symbol: "Mex$", cc: "mx", rate: 78, min: 10, name: "Mexican Peso" },
  ARS: { symbol: "$", cc: "ar", rate: 1.55, min: 1000, name: "Argentine Peso" },
  SEK: { symbol: "kr", cc: "se", rate: 145, min: 10, name: "Swedish Krona" },
  NOK: { symbol: "kr", cc: "no", rate: 142, min: 10, name: "Norwegian Krone" },
  DKK: { symbol: "kr", cc: "dk", rate: 224, min: 5, name: "Danish Krone" },
  PLN: { symbol: "zł", cc: "pl", rate: 385, min: 5, name: "Polish Złoty" },
  CZK: { symbol: "Kč", cc: "cz", rate: 67, min: 20, name: "Czech Koruna" },
  RUB: { symbol: "₽", cc: "ru", rate: 17, min: 50, name: "Russian Ruble" },
  KRW: { symbol: "₩", cc: "kr", rate: 1.1, min: 1000, name: "South Korean Won" },
  THB: { symbol: "฿", cc: "th", rate: 45, min: 30, name: "Thai Baht" },
  IDR: { symbol: "Rp", cc: "id", rate: 0.095, min: 10000, name: "Indonesian Rupiah" },
  MYR: { symbol: "RM", cc: "my", rate: 345, min: 5, name: "Malaysian Ringgit" },
  PHP: { symbol: "₱", cc: "ph", rate: 26, min: 50, name: "Philippine Peso" },
  VND: { symbol: "₫", cc: "vn", rate: 0.061, min: 20000, name: "Vietnamese Dong" },
  PKR: { symbol: "₨", cc: "pk", rate: 5.5, min: 100, name: "Pakistani Rupee" },
  BDT: { symbol: "৳", cc: "bd", rate: 13, min: 50, name: "Bangladeshi Taka" },
};

const CURRENCIES: SrcCurrency[] = Object.keys(CURRENCY_META);

// USD-equivalent targets, snapped to clean round numbers per currency
const USD_TARGETS = [50, 100, 500, 1000];
const USD_RATE = 1542;

function snapNice(v: number): number {
  if (v <= 0) return 0;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / mag;
  let s;
  if (n < 1.5) s = 1;
  else if (n < 3.5) s = 2;
  else if (n < 7.5) s = 5;
  else s = 10;
  return s * mag;
}

function quickAmounts(rate: number): number[] {
  const out: number[] = [];
  for (const t of USD_TARGETS) {
    const v = snapNice((t * USD_RATE) / rate);
    if (!out.includes(v)) out.push(v);
  }
  return out;
}

const FEE_RATE = 0.039;

type Step = "amount" | "summary" | "success";

function TopupFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [srcCurrency, setSrcCurrency] = useState<SrcCurrency>("GBP");
  const [ccyOpen, setCcyOpen] = useState(false);

  const meta = CURRENCY_META[srcCurrency];
  const srcAmount = Number(amount.replace(/,/g, "")) || 0;
  const srcFormatted = srcAmount
    ? srcAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })
    : "0";
  const numeric = Math.round(srcAmount * meta.rate); // NGN equivalent
  const formatted = numeric ? numeric.toLocaleString("en-US") : "0";
  const srcFee = srcAmount * FEE_RATE;
  const srcFeeFormatted = srcFee
    ? srcFee.toLocaleString("en-US", { maximumFractionDigits: 2 })
    : "0";
  const srcTotal = srcAmount + srcFee;
  const srcTotalFormatted = srcTotal.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const fee = Math.round(numeric * FEE_RATE);
  const total = numeric + fee;

  const press = (key: string) => {
    if (key === "back") {
      setAmount((a) => a.slice(0, -1));
      return;
    }
    if (key === "." && amount.includes(".")) return;
    if (amount.length >= 12) return;
    setAmount((a) => a + key);
  };

  const onContinue = () => {
    if (srcAmount < meta.min) {
      toast.error(`Enter at least ${meta.symbol}${meta.min}`);
      return;
    }
    setStep("summary");
  };

  const { requirePin, pinGate } = usePinGate({ subtitle: "Authorise wallet top-up" });

  const onPay = () => {
    requirePin(() => setStep("success"));
  };

  return (
    <PhoneFrame>
    <div className="min-h-screen md:min-h-0 md:h-[860px] bg-background text-foreground flex flex-col">
      <div className="h-10" />
      <div className="px-6 pt-4 flex items-center justify-between">
        <button
          onClick={() => {
            if (step === "amount") navigate({ to: "/home" });
            else if (step === "method") setStep("amount");
            else if (step === "transfer-details") setStep("method");
            else setStep("amount");
          }}
          className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-foreground/55">
          Top up wallet
        </p>
        <div className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {step === "amount" && (
          <motion.div
            key="amount"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col px-6 pt-4">
              <p className="text-[11px] uppercase tracking-widest text-foreground/55 font-bold">
                You pay
              </p>

              <div className="mt-2 rounded-3xl bg-foreground/5 border border-foreground/10 p-4 flex items-center gap-3">
                <button
                  onClick={() => setCcyOpen(true)}
                  className="flex items-center gap-2 bg-foreground/10 rounded-full pl-1.5 pr-2.5 py-1.5 active:scale-95 transition"
                >
                  <Flag code={meta.cc} className="w-7 h-5" />
                  <span className="text-sm font-bold">{srcCurrency}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 text-right">
                  <p className="font-display text-3xl font-bold tabular-nums leading-none">
                    {meta.symbol}
                    {srcFormatted}
                  </p>
                </div>
              </div>

              <div className="my-2 flex justify-center">
                <div className="w-9 h-9 rounded-full bg-lime/20 border border-background flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-lime rotate-90" />
                </div>
              </div>

              <p className="text-[11px] uppercase tracking-widest text-foreground/55 font-bold">
                You receive
              </p>
              <div className="mt-2 rounded-3xl bg-primary/5 border border-primary/20 p-4 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-foreground/5 rounded-full pl-1.5 pr-2.5 py-1.5">
                  <Flag code="ng" className="w-7 h-5" />
                  <span className="text-sm font-bold">NGN</span>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-display text-3xl font-bold tabular-nums leading-none">
                    ₦{formatted}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-foreground/5 p-3.5 space-y-2">
                <Row
                  label="Exchange rate"
                  value={
                    srcCurrency === "NGN"
                      ? "Base currency"
                      : `1 ${srcCurrency} = ₦${meta.rate.toLocaleString()}`
                  }
                />
                <Row
                  label="Bank Processing Fees"
                  value={`${meta.symbol}${srcFeeFormatted} (3.9%)`}
                />
                <Row label="Arrival Time" value="Instant" />
              </div>

              <div className="mt-3 flex gap-1.5 w-full">
                {quickAmounts(meta.rate).map((q: number) => (
                  <button
                    key={q}
                    onClick={() => setAmount(String(q))}
                    className="flex-1 min-w-0 px-2 h-9 rounded-full bg-foreground/10 text-[11px] font-bold active:scale-95 transition whitespace-nowrap"
                  >
                    {meta.symbol}
                    {q.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-t-[2rem] px-6 pt-5 pb-7 mt-4">
              <Keypad onPress={press} />
              <button
                onClick={onContinue}
                disabled={!srcAmount}
                className="mt-4 w-full h-13 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 active:scale-[0.99] transition"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === "method" && (
          <motion.div
            key="method"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <div className="px-6 mt-6">
              <h1 className="font-display text-2xl font-bold tracking-tight">How would you like to pay?</h1>
              <p className="text-sm text-foreground/55 mt-1">
                Adding <span className="font-bold text-foreground">₦{formatted}</span> to your wallet.
              </p>
            </div>

            <div className="flex-1 mt-7 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-8">
              <p className="text-[11px] uppercase tracking-widest text-card-foreground/50 font-semibold mb-3">
                Payment method
              </p>
              <div className="space-y-2.5">
                {METHODS.map((m) => {
                  const selected = method?.id === m.id;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition text-left ${
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-card-foreground/10 active:bg-card-foreground/[0.04]"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          selected ? "bg-primary text-primary-foreground" : "bg-accent text-card-foreground/70"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm">{m.label}</p>
                        <p className="text-[11px] text-card-foreground/55 mt-0.5">{m.sub}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-card-foreground/[0.05]">
                            {m.fee}
                          </span>
                          <span className="text-[10px] font-semibold text-card-foreground/55">
                            {m.arrival}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                          selected ? "border-primary bg-primary" : "border-card-foreground/20"
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {method && (
                <div className="mt-6 rounded-2xl bg-card-foreground/[0.04] p-4 space-y-2.5">
                  <Row label="Amount" value={`₦${formatted}`} />
                  <Row label="Fee" value={fee ? `₦${fee.toLocaleString()}` : "Free"} />
                  <div className="h-px bg-card-foreground/[0.08]" />
                  <Row label="Total" value={`₦${total.toLocaleString()}`} bold />
                </div>
              )}

              <button
                onClick={onPay}
                disabled={!method}
                className="mt-6 w-full h-13 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.99] transition"
              >
                <ShieldCheck className="w-4 h-4" />
                {method?.id === "transfer" ? "Show account details" : `Pay ₦${total.toLocaleString()}`}
              </button>
              <p className="text-[10px] text-card-foreground/45 text-center mt-3">
                Secured by 256-bit encryption · BazePay never stores your card details.
              </p>
            </div>
          </motion.div>
        )}

        {step === "transfer-details" && (
          <motion.div
            key="transfer-details"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <div className="px-6 mt-6 text-center">
              <p className="text-xs text-foreground/55 font-semibold">Send exactly</p>
              <p className="font-display text-4xl font-bold tracking-tight mt-2 tabular-nums">
                ₦{formatted}
              </p>
              <p className="text-xs text-foreground/55 mt-1">to the account below</p>
            </div>

            <div className="flex-1 mt-7 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-8">
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-5 space-y-4">
                <DetailRow label="Bank" value="Wema Bank" />
                <div className="h-px bg-card-foreground/[0.08]" />
                <DetailRow label="Account number" value="9012 3456 78" copy />
                <div className="h-px bg-card-foreground/[0.08]" />
                <DetailRow label="Account name" value="BazePay / Adaeze O." />
              </div>

              <div className="mt-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 flex gap-3">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold">This is your unique BazePay number</p>
                  <p className="text-[11px] text-card-foreground/65 mt-0.5 leading-relaxed">
                    Transfers reflect in under 30 seconds. Save it for next time.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep("success")}
                className="mt-6 w-full h-13 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.99] transition"
              >
                I've sent the transfer
              </button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 18, stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-lime/20 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-lime flex items-center justify-center">
                <Check className="w-8 h-8 text-lime-foreground" strokeWidth={3} />
              </div>
            </motion.div>
            <h1 className="font-display text-2xl font-bold tracking-tight mt-7">
              Top up successful
            </h1>
            <p className="text-sm text-foreground/55 mt-2 max-w-xs">
              <span className="font-bold text-foreground">₦{formatted}</span> has been added to your wallet.
            </p>
            <div className="mt-10 w-full max-w-sm space-y-3">
              <button
                onClick={() => navigate({ to: "/home" })}
                className="w-full h-13 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.99] transition"
              >
                Back to home
              </button>
              <button
                onClick={() => navigate({ to: "/wallet" })}
                className="w-full h-13 py-3.5 rounded-2xl bg-foreground/10 text-foreground font-bold text-sm active:scale-[0.99] transition"
              >
                View transactions
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    {pinGate}
    <CurrencySheet
      open={ccyOpen}
      onClose={() => setCcyOpen(false)}
      value={srcCurrency}
      onChange={(c) => {
        setSrcCurrency(c);
        setAmount("");
      }}
    />
    </PhoneFrame>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-[12px] ${bold ? "font-bold text-foreground" : "text-foreground/65"}`}>{label}</span>
      <span className={`tabular-nums text-foreground ${bold ? "font-display font-bold text-base" : "text-sm font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}

function DetailRow({ label, value, copy }: { label: string; value: string; copy?: boolean }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(value.replace(/\s/g, "")).catch(() => {});
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-bold text-card-foreground/55">{label}</p>
        <p className="text-sm font-bold mt-0.5 tabular-nums">{value}</p>
      </div>
      {copy && (
        <button
          onClick={onCopy}
          className="text-[11px] font-bold text-primary flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-primary/10"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

function Keypad({ onPress }: { onPress: (key: string) => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];
  return (
    <div className="grid grid-cols-3 gap-1">
      {keys.map((k) => (
        <button
          key={k}
          onClick={() => onPress(k)}
          className="h-13 py-3 rounded-2xl text-xl font-display font-bold flex items-center justify-center active:bg-card-foreground/[0.06] transition"
        >
          {k === "back" ? <Delete className="w-5 h-5" /> : k}
        </button>
      ))}
    </div>
  );
}

function CurrencySheet({
  open,
  onClose,
  value,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (code: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter((c) => {
      const m = CURRENCY_META[c];
      return c.toLowerCase().includes(q) || m.name.toLowerCase().includes(q);
    });
  }, [search]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-x-0 bottom-0 z-50 bg-card text-card-foreground rounded-t-[2rem] flex flex-col max-h-[85%]"
          >
            <div className="pt-3 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-card-foreground/15" />
            </div>
            <div className="px-6 pt-4 pb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Select currency</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 pb-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-card-foreground/40" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search currency"
                  className="w-full h-12 pl-11 pr-4 rounded-2xl bg-muted text-[14px] text-card-foreground placeholder:text-card-foreground/40 focus:outline-none focus:border-primary/40 border border-transparent"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-6">
              {filtered.map((c) => {
                const m = CURRENCY_META[c];
                const selected = c === value;
                return (
                  <button
                    key={c}
                    onClick={() => {
                      onChange(c);
                      setSearch("");
                      onClose();
                    }}
                    className={`w-full px-3 py-3 rounded-xl flex items-center gap-3 text-left transition ${
                      selected ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                  >
                    <Flag code={m.cc} className="w-8 h-6" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14.5px] font-bold">{c}</p>
                      <p className="text-[12px] text-card-foreground/55 truncate">{m.name}</p>
                    </div>
                    <span className="text-[12px] text-card-foreground/55 tabular-nums">
                      {c === "NGN" ? "Base" : `₦${m.rate.toLocaleString()}`}
                    </span>
                    {selected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-center text-[13px] text-card-foreground/50 py-8">
                  No currency found
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
