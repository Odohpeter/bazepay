import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
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

type CurrencyInfo = { symbol: string; flag: string; rate: number; min: number; name: string };

const CURRENCY_META: Record<string, CurrencyInfo> = {
  NGN: { symbol: "₦", flag: "🇳🇬", rate: 1, min: 100, name: "Nigerian Naira" },
  USD: { symbol: "$", flag: "🇺🇸", rate: 1542, min: 1, name: "US Dollar" },
  EUR: { symbol: "€", flag: "🇪🇺", rate: 1670, min: 1, name: "Euro" },
  GBP: { symbol: "£", flag: "🇬🇧", rate: 1952, min: 1, name: "British Pound" },
  CAD: { symbol: "C$", flag: "🇨🇦", rate: 1130, min: 1, name: "Canadian Dollar" },
  AUD: { symbol: "A$", flag: "🇦🇺", rate: 1015, min: 1, name: "Australian Dollar" },
  NZD: { symbol: "NZ$", flag: "🇳🇿", rate: 920, min: 1, name: "New Zealand Dollar" },
  CHF: { symbol: "CHF", flag: "🇨🇭", rate: 1740, min: 1, name: "Swiss Franc" },
  JPY: { symbol: "¥", flag: "🇯🇵", rate: 10, min: 100, name: "Japanese Yen" },
  CNY: { symbol: "¥", flag: "🇨🇳", rate: 215, min: 5, name: "Chinese Yuan" },
  HKD: { symbol: "HK$", flag: "🇭🇰", rate: 198, min: 5, name: "Hong Kong Dollar" },
  SGD: { symbol: "S$", flag: "🇸🇬", rate: 1145, min: 1, name: "Singapore Dollar" },
  INR: { symbol: "₹", flag: "🇮🇳", rate: 18, min: 50, name: "Indian Rupee" },
  AED: { symbol: "د.إ", flag: "🇦🇪", rate: 420, min: 5, name: "UAE Dirham" },
  SAR: { symbol: "﷼", flag: "🇸🇦", rate: 411, min: 5, name: "Saudi Riyal" },
  TRY: { symbol: "₺", flag: "🇹🇷", rate: 45, min: 10, name: "Turkish Lira" },
  ZAR: { symbol: "R", flag: "🇿🇦", rate: 85, min: 10, name: "South African Rand" },
  KES: { symbol: "KSh", flag: "🇰🇪", rate: 12, min: 50, name: "Kenyan Shilling" },
  GHS: { symbol: "₵", flag: "🇬🇭", rate: 100, min: 5, name: "Ghanaian Cedi" },
  EGP: { symbol: "E£", flag: "🇪🇬", rate: 32, min: 10, name: "Egyptian Pound" },
  MAD: { symbol: "DH", flag: "🇲🇦", rate: 155, min: 5, name: "Moroccan Dirham" },
  XOF: { symbol: "CFA", flag: "🇸🇳", rate: 2.55, min: 500, name: "West African CFA" },
  BRL: { symbol: "R$", flag: "🇧🇷", rate: 285, min: 5, name: "Brazilian Real" },
  MXN: { symbol: "Mex$", flag: "🇲🇽", rate: 78, min: 10, name: "Mexican Peso" },
  ARS: { symbol: "$", flag: "🇦🇷", rate: 1.55, min: 1000, name: "Argentine Peso" },
  SEK: { symbol: "kr", flag: "🇸🇪", rate: 145, min: 10, name: "Swedish Krona" },
  NOK: { symbol: "kr", flag: "🇳🇴", rate: 142, min: 10, name: "Norwegian Krone" },
  DKK: { symbol: "kr", flag: "🇩🇰", rate: 224, min: 5, name: "Danish Krone" },
  PLN: { symbol: "zł", flag: "🇵🇱", rate: 385, min: 5, name: "Polish Złoty" },
  CZK: { symbol: "Kč", flag: "🇨🇿", rate: 67, min: 20, name: "Czech Koruna" },
  RUB: { symbol: "₽", flag: "🇷🇺", rate: 17, min: 50, name: "Russian Ruble" },
  KRW: { symbol: "₩", flag: "🇰🇷", rate: 1.1, min: 1000, name: "South Korean Won" },
  THB: { symbol: "฿", flag: "🇹🇭", rate: 45, min: 30, name: "Thai Baht" },
  IDR: { symbol: "Rp", flag: "🇮🇩", rate: 0.095, min: 10000, name: "Indonesian Rupiah" },
  MYR: { symbol: "RM", flag: "🇲🇾", rate: 345, min: 5, name: "Malaysian Ringgit" },
  PHP: { symbol: "₱", flag: "🇵🇭", rate: 26, min: 50, name: "Philippine Peso" },
  VND: { symbol: "₫", flag: "🇻🇳", rate: 0.061, min: 20000, name: "Vietnamese Dong" },
  PKR: { symbol: "₨", flag: "🇵🇰", rate: 5.5, min: 100, name: "Pakistani Rupee" },
  BDT: { symbol: "৳", flag: "🇧🇩", rate: 13, min: 50, name: "Bangladeshi Taka" },
};

const CURRENCIES: SrcCurrency[] = Object.keys(CURRENCY_META);

function quickAmounts(rate: number): number[] {
  const targets = [15000, 40000, 80000, 160000];
  return targets.map((t) => {
    const v = t / rate;
    if (v >= 10000) return Math.round(v / 1000) * 1000;
    if (v >= 100) return Math.round(v / 10) * 10;
    if (v >= 10) return Math.round(v);
    return Math.round(v * 10) / 10;
  });
}

type Step = "amount" | "method" | "success" | "transfer-details";

function TopupFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [srcCurrency, setSrcCurrency] = useState<SrcCurrency>("NGN");
  const [ccyOpen, setCcyOpen] = useState(false);
  const [method, setMethod] = useState<Method | null>(null);

  const meta = CURRENCY_META[srcCurrency];
  const srcAmount = Number(amount.replace(/,/g, "")) || 0;
  const srcFormatted = srcAmount
    ? srcAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })
    : "0";
  const numeric = Math.round(srcAmount * meta.rate); // NGN equivalent
  const formatted = numeric ? numeric.toLocaleString("en-US") : "0";
  const fee = method?.id === "card" ? Math.round(numeric * 0.015) : 0;
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
    setStep("method");
  };

  const { requirePin, pinGate } = usePinGate({ subtitle: "Authorise wallet top-up" });

  const onPay = () => {
    if (!method) return;
    if (method.id === "transfer") {
      setStep("transfer-details");
    } else {
      requirePin(() => setStep("success"));
    }
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
                <div className="relative">
                  <button
                    onClick={() => setCcyOpen((v) => !v)}
                    className="flex items-center gap-2 bg-foreground/10 rounded-full pl-1.5 pr-2.5 py-1.5"
                  >
                    <span className="w-7 h-7 rounded-full bg-background flex items-center justify-center text-base">
                      {meta.flag}
                    </span>
                    <span className="text-sm font-bold">{srcCurrency}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition ${ccyOpen ? "rotate-90" : "rotate-90"}`} />
                  </button>
                  {ccyOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-card border border-foreground/10 rounded-2xl p-1.5 shadow-xl z-30 max-h-72 overflow-y-auto">
                      {CURRENCIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setSrcCurrency(c);
                            setCcyOpen(false);
                            setAmount("");
                          }}
                          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-foreground/5 text-xs font-semibold"
                        >
                          <span className="text-base">{CURRENCY_META[c].flag}</span>
                          <span className="w-10 text-left shrink-0">{c}</span>
                          <span className="flex-1 text-left text-foreground/55 truncate">{CURRENCY_META[c].name}</span>
                          {srcCurrency === c && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-display text-3xl font-bold tabular-nums leading-none">
                    {meta.symbol}
                    {srcFormatted}
                  </p>
                </div>
              </div>

              <div className="my-2 flex justify-center">
                <div className="w-9 h-9 rounded-full bg-primary/15 border border-background flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-primary rotate-90" />
                </div>
              </div>

              <p className="text-[11px] uppercase tracking-widest text-foreground/55 font-bold">
                You receive
              </p>
              <div className="mt-2 rounded-3xl bg-primary/5 border border-primary/20 p-4 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-foreground/5 rounded-full pl-1.5 pr-2.5 py-1.5">
                  <span className="w-7 h-7 rounded-full bg-background flex items-center justify-center text-base">
                    🇳🇬
                  </span>
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
                  label="Processing fee"
                  value={method?.id === "card" ? "1.5%" : "Free"}
                />
                <Row label="Arrives" value="Instantly" />
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
    </PhoneFrame>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-[12px] ${bold ? "font-bold" : "text-card-foreground/65"}`}>{label}</span>
      <span className={`tabular-nums ${bold ? "font-display font-bold text-base" : "text-sm font-semibold"}`}>
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
