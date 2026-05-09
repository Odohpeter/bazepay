import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Plus,
  Check,
  Delete,
  Building2,
  Users,
  ShieldCheck,
  ChevronRight,
  Loader2,
  Zap,
  Copy,
  Wallet,
  Sparkles,
  Clock,
  Star,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { wallets } from "@/lib/wallets";
import { verifyPin, hasPin } from "@/lib/pin-store";

export const Route = createFileRoute("/transfer")({
  head: () => ({
    meta: [
      { title: "Send money — BazePay" },
      { name: "description", content: "Send money to anyone, instantly." },
    ],
  }),
  component: TransferFlow,
});

type Recipient = {
  id: string;
  name: string;
  bank: string;
  account: string;
  initials: string;
  color: string;
};

const RECENTS: Recipient[] = [
  { id: "r1", name: "Tunde Adebayo", bank: "GTBank", account: "0123456789", initials: "TA", color: "#FFE4D6" },
  { id: "r2", name: "Chioma Eze", bank: "Access Bank", account: "0234567890", initials: "CE", color: "#E0E7FF" },
  { id: "r3", name: "Mom", bank: "First Bank", account: "0345678901", initials: "MO", color: "#FCE7F3" },
  { id: "r4", name: "Femi Akande", bank: "Zenith Bank", account: "0456789012", initials: "FA", color: "#D1FAE5" },
];

const BANKS = [
  "GTBank",
  "Access Bank",
  "Zenith Bank",
  "First Bank",
  "UBA",
  "Wema Bank",
  "Stanbic IBTC",
  "Kuda",
  "Opay",
  "Palmpay",
  "Sterling Bank",
  "FCMB",
  "Fidelity Bank",
  "Union Bank",
  "Polaris Bank",
  "Ecobank",
  "Heritage Bank",
  "Keystone Bank",
  "Providus Bank",
  "Moniepoint",
];

const FIRST_NAMES = ["Tunde", "Chioma", "Femi", "Aisha", "Emeka", "Ngozi", "Bola", "Yemi", "Kelechi", "Funke"];
const LAST_NAMES = ["Okafor", "Adeyemi", "Bello", "Eze", "Ibrahim", "Olawale", "Nwankwo", "Akande", "Obi", "Lawal"];

function seededName(account: string, bank: string) {
  const seed = (account + bank).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const f = FIRST_NAMES[seed % FIRST_NAMES.length];
  const l = LAST_NAMES[(seed * 7) % LAST_NAMES.length];
  return `${f} ${l}`.toUpperCase();
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const AVATAR_COLORS = ["#FFE4D6", "#E0E7FF", "#FCE7F3", "#D1FAE5", "#FEF3C7", "#E0F2FE"];

type Step = "recipient" | "new-recipient" | "amount" | "review" | "pin" | "success";

const QUICK_AMOUNTS = [1000, 5000, 10000, 20000];
const WALLET_BALANCE = 845320.5;

function TransferFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("recipient");
  const [query, setQuery] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [reference, setReference] = useState("");

  // new recipient
  const [newAccount, setNewAccount] = useState("");
  const [newBank, setNewBank] = useState<string | null>(null);
  const [bankQuery, setBankQuery] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifiedName, setVerifiedName] = useState<string | null>(null);

  // pin
  const [pin, setPin] = useState("");

  const numeric = Number(amount.replace(/,/g, "")) || 0;
  const formatted = numeric ? numeric.toLocaleString("en-US") : "0";
  const fee = numeric > 5000 ? 25 : 10;
  const total = numeric + fee;
  const overBalance = total > WALLET_BALANCE;

  const filtered = RECENTS.filter(
    (r) =>
      !query ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.bank.toLowerCase().includes(query.toLowerCase()) ||
      r.account.includes(query),
  );

  const filteredBanks = useMemo(
    () => BANKS.filter((b) => b.toLowerCase().includes(bankQuery.toLowerCase())),
    [bankQuery],
  );

  // simulate name verification
  useEffect(() => {
    if (newAccount.length === 10 && newBank) {
      setVerifying(true);
      setVerifiedName(null);
      const t = setTimeout(() => {
        setVerifiedName(seededName(newAccount, newBank));
        setVerifying(false);
      }, 900);
      return () => clearTimeout(t);
    }
    setVerifiedName(null);
    setVerifying(false);
  }, [newAccount, newBank]);

  const press = (key: string) => {
    if (key === "back") return setAmount((a) => a.slice(0, -1));
    if (amount.length >= 10) return;
    if (key === "0" && amount === "") return;
    setAmount((a) => a + key);
  };

  const back = () => {
    if (step === "recipient") navigate({ to: "/home" });
    else if (step === "new-recipient") setStep("recipient");
    else if (step === "amount") setStep(recipient?.id.startsWith("new-") ? "new-recipient" : "recipient");
    else if (step === "review") setStep("amount");
    else if (step === "pin") setStep("review");
    else setStep("recipient");
  };

  const onContinueAmount = () => {
    if (!numeric || numeric < 100) return toast.error("Enter at least ₦100");
    if (overBalance) return toast.error("Insufficient balance");
    setStep("review");
  };

  const confirmNewRecipient = () => {
    if (newAccount.length < 10 || !newBank || !verifiedName) {
      toast.error("Wait for account verification");
      return;
    }
    const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    setRecipient({
      id: `new-${Date.now()}`,
      name: verifiedName,
      bank: newBank,
      account: newAccount,
      initials: initialsOf(verifiedName),
      color,
    });
    setStep("amount");
  };

  const pressPin = (key: string) => {
    if (key === "back") return setPin((p) => p.slice(0, -1));
    if (pin.length >= 4) return;
    setPin((p) => p + key);
  };

  // auto-submit pin
  useEffect(() => {
    if (step === "pin" && pin.length === 4) {
      if (verifyPin(pin)) {
        const t = setTimeout(() => {
          setReference("BZP" + Date.now().toString().slice(-8));
          setStep("success");
          setPin("");
        }, 400);
        return () => clearTimeout(t);
      } else {
        toast.error("Incorrect PIN");
        const t = setTimeout(() => setPin(""), 350);
        return () => clearTimeout(t);
      }
    }
  }, [pin, step]);

  const resetAll = () => {
    setStep("recipient");
    setRecipient(null);
    setAmount("");
    setNote("");
    setNewAccount("");
    setNewBank(null);
    setBankQuery("");
    setVerifiedName(null);
    setSaveBeneficiary(false);
    setReference("");
  };

  return (
    <PhoneFrame>
    <div className="min-h-screen md:min-h-0 md:h-[860px] bg-background text-foreground flex flex-col">
      <div className="h-12" />
      <div className="px-6 pt-4 flex items-center justify-between">
        <button
          onClick={back}
          className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-foreground/55">
          Send money
        </p>
        <div className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {step === "recipient" && (
          <motion.div
            key="recipient"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {/* Balance — minimal & prominent */}
            <div className="px-6 mt-10">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-foreground/45">
                Available balance
              </p>
              <p className="font-display text-[44px] leading-none font-bold tabular-nums mt-2">
                ₦{wallets.NGN.whole}
                <span className="text-foreground/35">{wallets.NGN.decimals}</span>
              </p>
            </div>

            <div className="px-6 mt-4">
              <div className="flex items-center gap-2 bg-foreground/10 rounded-full px-4 h-11">
                <Search className="w-4 h-4 text-foreground/45" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, bank or account"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/45"
                />
              </div>
            </div>

            <div className="flex-1 mt-5 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-8">
              <button
                onClick={() => setStep("new-recipient")}
                className="w-full flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/85 text-primary-foreground p-3.5 shadow-md shadow-primary/20 active:scale-[0.99] transition"
              >
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold">Send to a new account</p>
                  <p className="text-[11px] opacity-80">Any Nigerian bank · Verified instantly</p>
                </div>
                <ChevronRight className="w-4 h-4 opacity-80" />
              </button>

              <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-card-foreground/55 font-bold mt-6 mb-3 px-1">
                <Star className="w-3 h-3 text-lime fill-lime" /> Favorites
              </p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-1">

                {RECENTS.map((r, idx) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRecipient(r);
                      setStep("amount");
                    }}
                    className="flex flex-col items-center gap-1.5 shrink-0 w-16 active:scale-95 transition"
                  >
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold ring-2 ring-card"
                        style={{ background: r.color, color: "#1a1335" }}
                      >
                        {r.initials}
                      </div>
                      {idx === 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-lime ring-2 ring-card flex items-center justify-center">
                          <Sparkles className="w-2.5 h-2.5 text-lime-foreground" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10.5px] font-semibold leading-tight text-center truncate w-full">
                      {r.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-7 mb-3 px-1">
                <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-card-foreground/55 font-bold">
                  <Clock className="w-3 h-3" /> Recent transfers
                </p>
                <span className="text-[10px] font-semibold text-card-foreground/45">
                  Last 30 days
                </span>
              </div>
              <div className="space-y-2">
                {filtered.map((r, idx) => {
                  const lastAmount = [12500, 5000, 25000, 8400][idx % 4];
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRecipient(r);
                        setStep("amount");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl bg-card-foreground/[0.03] hover:bg-card-foreground/[0.05] active:scale-[0.99] transition text-left"
                    >
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ background: r.color, color: "#1a1335" }}
                      >
                        {r.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{r.name}</p>
                        <p className="text-[11px] text-card-foreground/55 truncate flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {r.bank} · {r.account}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-bold tabular-nums">
                          ₦{lastAmount.toLocaleString()}
                        </p>
                        <p className="text-[9px] text-card-foreground/45 uppercase tracking-wider font-semibold">
                          last sent
                        </p>
                      </div>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="text-center text-sm text-card-foreground/40 py-8">No matches.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {step === "new-recipient" && (
          <motion.div
            key="new-recipient"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <div className="px-6 mt-6">
              <h1 className="font-display text-2xl font-bold tracking-tight">New recipient</h1>
              <p className="text-sm text-foreground/55 mt-1">We'll verify the account name instantly.</p>
            </div>

            <div className="flex-1 mt-6 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-8">
              {/* Account number — premium input card */}
              <div className="relative rounded-3xl bg-card-foreground/[0.04] border border-card-foreground/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] font-bold text-card-foreground/55">
                    <Building2 className="w-3 h-3" /> Account number
                  </span>
                  <span className={`text-[10px] font-bold tabular-nums ${newAccount.length === 10 ? "text-primary" : "text-card-foreground/40"}`}>
                    {newAccount.length}/10
                  </span>
                </div>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value.replace(/\D/g, ""))}
                  placeholder="0 0 0 0 0 0 0 0 0 0"
                  className="mt-2 w-full bg-transparent font-display text-[28px] font-bold tabular-nums tracking-[0.18em] outline-none placeholder:text-card-foreground/20"
                />
                {/* progress dots */}
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition ${
                        i < newAccount.length ? "bg-primary" : "bg-card-foreground/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bank section */}
              <div className="mt-5 flex items-center justify-between px-1">
                <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-card-foreground/55 font-bold">
                  <Building2 className="w-3 h-3" /> Choose bank
                </p>
                {newBank && (
                  <button
                    onClick={() => setNewBank(null)}
                    className="text-[10px] font-bold text-primary"
                  >
                    Clear
                  </button>
                )}
              </div>



              <div className="mt-3 flex items-center gap-2 bg-card-foreground/[0.04] rounded-2xl px-4 h-10">
                <Search className="w-4 h-4 text-card-foreground/40" />
                <input
                  value={bankQuery}
                  onChange={(e) => setBankQuery(e.target.value)}
                  placeholder="Search all banks"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-card-foreground/40"
                />
              </div>
              <div className="mt-2 rounded-2xl bg-card-foreground/[0.03] max-h-[200px] overflow-y-auto no-scrollbar">
                {filteredBanks.map((b) => {
                  const selected = newBank === b;
                  const palette = ["#FFE4D6", "#E0E7FF", "#FCE7F3", "#D1FAE5", "#FEF3C7", "#E0F2FE", "#FDE2E2"];
                  const color = palette[b.length % palette.length];
                  return (
                    <button
                      key={b}
                      onClick={() => setNewBank(b)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition ${
                        selected ? "bg-primary/10" : "active:bg-card-foreground/[0.04]"
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold shrink-0"
                        style={{ background: color, color: "#1a1335" }}
                      >
                        {b.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="flex-1 text-sm font-semibold truncate">{b}</span>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
                {filteredBanks.length === 0 && (
                  <p className="text-center text-sm text-card-foreground/40 py-6">No banks match.</p>
                )}
              </div>

              {/* verification status */}
              {newAccount.length === 10 && newBank && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl bg-gradient-to-r from-primary/10 to-lime/15 border border-primary/20 p-3.5 flex items-center gap-3"
                >
                  {verifying ? (
                    <>
                      <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-card-foreground/55">
                          Verifying
                        </p>
                        <p className="text-sm font-bold">Checking account…</p>
                      </div>
                    </>
                  ) : verifiedName ? (
                    <>
                      <div className="w-10 h-10 rounded-2xl bg-lime flex items-center justify-center">
                        <Check className="w-5 h-5 text-lime-foreground" strokeWidth={3} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-card-foreground/55">
                          Account verified
                        </p>
                        <p className="text-sm font-bold truncate">{verifiedName}</p>
                        <p className="text-[10.5px] text-card-foreground/55 truncate">
                          {newBank} · {newAccount}
                        </p>
                      </div>
                    </>
                  ) : null}
                </motion.div>
              )}

              <button
                onClick={confirmNewRecipient}
                disabled={!verifiedName || verifying}
                className="mt-5 w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 active:scale-[0.99] transition flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === "amount" && recipient && (
          <motion.div
            key="amount"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {/* Recipient pill card */}
            <div className="px-6 mt-4">
              <div className="rounded-2xl bg-card text-card-foreground p-3 flex items-center gap-3 shadow-sm">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: recipient.color, color: "#1a1335" }}
                >
                  {recipient.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-card-foreground/55">
                    Sending to
                  </p>
                  <p className="text-sm font-bold truncate">{recipient.name}</p>
                  <p className="text-[10.5px] text-card-foreground/55 truncate">
                    {recipient.bank} · {recipient.account}
                  </p>
                </div>
                <button
                  onClick={() => setStep("recipient")}
                  className="text-[10px] font-bold text-primary px-3 py-1.5 rounded-full bg-primary/10"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/55 font-bold">
                Amount
              </p>
              <motion.p
                key={formatted}
                initial={{ scale: 0.96, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="font-display text-[64px] leading-none font-bold tracking-tight mt-2 tabular-nums"
              >
                <span className="text-foreground/35">₦</span>
                {formatted}
              </motion.p>

              <div className="mt-3 h-5 text-[11px] font-semibold flex items-center gap-2">
                {numeric > 0 && !overBalance && (
                  <>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/70">
                      Fee ₦{fee}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-lime/15 text-lime font-bold">
                      <TrendingUp className="w-3 h-3" />
                      Total ₦{total.toLocaleString()}
                    </span>
                  </>
                )}
                {overBalance && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive/15 text-destructive">
                    Insufficient balance
                  </span>
                )}
                {!numeric && (
                  <span className="text-foreground/45">
                    Balance ₦{wallets.NGN.whole}
                    {wallets.NGN.decimals}
                  </span>
                )}
              </div>

              {/* Balance progress */}
              {numeric > 0 && (
                <div className="mt-3 w-56 h-1 rounded-full bg-foreground/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, (total / WALLET_BALANCE) * 100)}%`,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`h-full rounded-full ${overBalance ? "bg-destructive" : "bg-gradient-to-r from-primary to-lime"}`}
                  />
                </div>
              )}

              <div className="mt-5 flex gap-2 flex-wrap justify-center">
                {QUICK_AMOUNTS.map((q) => {
                  const sel = numeric === q;
                  return (
                    <button
                      key={q}
                      onClick={() => setAmount(String(q))}
                      className={`px-3.5 h-9 rounded-full text-[11px] font-bold active:scale-95 transition ${
                        sel
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                          : "bg-foreground/10 text-foreground/80"
                      }`}
                    >
                      ₦{q.toLocaleString()}
                    </button>
                  );
                })}
              </div>

              <input
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 64))}
                placeholder="✏️  Add a note (optional)"
                className="mt-5 bg-foreground/10 rounded-full px-4 h-10 text-xs outline-none placeholder:text-foreground/45 text-center w-64"
              />
            </div>

            <div className="bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-8">
              <Keypad onPress={press} />
              <button
                onClick={onContinueAmount}
                disabled={!numeric || overBalance}
                className="mt-5 w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 active:scale-[0.99] transition flex items-center justify-center gap-2"
              >
                Review transfer
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === "review" && recipient && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <div className="px-6 mt-6">
              <div className="rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-lime/15 border border-primary/20 p-5">
                <p className="text-[11px] uppercase tracking-widest text-foreground/55 font-bold text-center">
                  You're sending
                </p>
                <p className="font-display text-5xl font-bold tracking-tight mt-2 tabular-nums text-center">
                  ₦{formatted}
                </p>
                <p className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-primary mx-auto w-full justify-center">
                  <Zap className="w-3 h-3" /> Arrives instantly · Fee ₦{fee}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold uppercase tracking-wider">
                    YOU
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 border-t border-dashed border-foreground/25" />
                    <div className="w-7 h-7 rounded-full bg-lime/20 flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 text-lime" />
                    </div>
                    <div className="flex-1 border-t border-dashed border-foreground/25" />
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ring-2 ring-background"
                    style={{ background: recipient.color, color: "#1a1335" }}
                  >
                    {recipient.initials}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-foreground/55">From wallet</span>
                  <span className="font-bold truncate ml-2 text-right">
                    {recipient.name}
                    <span className="text-foreground/45 font-semibold"> · {recipient.bank}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 mt-5 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-8">
              <div className="rounded-2xl bg-card-foreground/[0.04] p-4 space-y-2.5">
                <Row label="Amount" value={`₦${formatted}`} />
                <Row label="Fee" value={`₦${fee}`} />
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-card-foreground/55 mb-1">
                    Note
                  </p>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 64))}
                    placeholder="Add a note (optional)"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-card-foreground/40"
                  />
                </div>
                <div className="h-px bg-card-foreground/[0.08]" />
                <Row label="Total" value={`₦${total.toLocaleString()}`} bold />
              </div>

              <button
                onClick={() => setSaveBeneficiary((s) => !s)}
                className="mt-3 w-full flex items-center gap-3 rounded-2xl bg-card-foreground/[0.04] p-4 text-left"
              >
                <div
                  className={`w-10 h-6 rounded-full transition relative ${
                    saveBeneficiary ? "bg-primary" : "bg-card-foreground/20"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition ${
                      saveBeneficiary ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Save as beneficiary</p>
                  <p className="text-[11px] text-card-foreground/55">Send faster next time</p>
                </div>
              </button>

              <div className="mt-4 rounded-2xl bg-primary/5 border border-primary/15 p-4 flex gap-3">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold">Safe transfer</p>
                  <p className="text-[11px] text-card-foreground/65 mt-0.5 leading-relaxed">
                    BazePay reverses failed transfers automatically. You're covered.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!hasPin()) {
                    toast.info("Set up your transaction PIN first");
                    navigate({ to: "/auth/pin-setup" });
                    return;
                  }
                  setStep("pin");
                }}
                className="mt-5 w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.99] transition"
              >
                Confirm & send
              </button>
            </div>
          </motion.div>
        )}

        {step === "pin" && recipient && (
          <motion.div
            key="pin"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight mt-5">Enter PIN</h1>
              <p className="text-sm text-foreground/55 mt-1 text-center">
                Authorise <span className="font-bold text-foreground">₦{formatted}</span> to{" "}
                <span className="font-bold text-foreground">{recipient.name}</span>
              </p>

              <div className="flex gap-3 mt-8">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full transition ${
                      i < pin.length ? "bg-primary scale-110" : "bg-foreground/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-8">
              <Keypad onPress={pressPin} hideDecimal />
            </div>
          </motion.div>
        )}

        {step === "success" && recipient && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center relative"
          >
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-lime/20 blur-3xl" />
            </div>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 18, stiffness: 200 }}
              className="relative w-28 h-28 rounded-full bg-lime/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-lime/30"
              />
              <div className="relative w-16 h-16 rounded-full bg-gradient-lime flex items-center justify-center shadow-lg shadow-lime/30">
                <Check className="w-8 h-8 text-lime-foreground" strokeWidth={3} />
              </div>
            </motion.div>
            <h1 className="font-display text-2xl font-bold tracking-tight mt-7">Transfer sent</h1>
            <p className="text-sm text-foreground/55 mt-2 max-w-xs">
              <span className="font-bold text-foreground">₦{formatted}</span> is on the way to{" "}
              <span className="font-bold text-foreground">{recipient.name}</span>.
            </p>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(reference);
                toast.success("Reference copied");
              }}
              className="mt-5 inline-flex items-center gap-2 px-3 h-8 rounded-full bg-foreground/10 text-[11px] font-bold"
            >
              <span className="text-foreground/55">REF</span>
              <span className="tabular-nums">{reference}</span>
              <Copy className="w-3 h-3" />
            </button>

            {saveBeneficiary && (
              <p className="mt-3 text-[11px] text-foreground/55">
                Saved <span className="font-bold text-foreground">{recipient.name}</span> as a beneficiary.
              </p>
            )}

            <div className="mt-10 w-full max-w-sm space-y-3">
              <button
                onClick={() => navigate({ to: "/home" })}
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-sm active:scale-[0.99] transition"
              >
                Back to home
              </button>
              <button
                onClick={resetAll}
                className="w-full h-12 rounded-2xl bg-foreground/10 text-foreground font-bold text-sm active:scale-[0.99] transition flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                Send to another person
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </PhoneFrame>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`text-[12px] ${bold ? "font-bold" : "text-card-foreground/65"}`}>{label}</span>
      <span
        className={`tabular-nums text-right ${
          bold ? "font-display font-bold text-base" : "text-sm font-semibold"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Keypad({
  onPress,
  hideDecimal,
}: {
  onPress: (key: string) => void;
  hideDecimal?: boolean;
}) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", hideDecimal ? "" : "", "0", "back"];
  return (
    <div className="grid grid-cols-3 gap-1">
      {keys.map((k, i) => (
        <button
          key={i}
          onClick={() => k && onPress(k)}
          disabled={!k}
          className="h-12 rounded-2xl text-xl font-display font-bold flex items-center justify-center active:bg-card-foreground/[0.06] transition disabled:opacity-0"
        >
          {k === "back" ? <Delete className="w-5 h-5" /> : k}
        </button>
      ))}
    </div>
  );
}
