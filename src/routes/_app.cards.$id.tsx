import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Copy,
  Snowflake,
  Sun,
  Plus,
  Settings2,
  X,
  Trash2,
  ShieldCheck,
  Receipt,
  ChevronRight,
  Truck,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { VirtualCardArt, RevealToggle } from "@/components/virtual-card";
import {
  formatNgn,
  relativeDay,
  merchantCategories,
  SHIPPING_STAGES,
  SHIPPING_LABEL,
  type ShippingStage,
} from "@/lib/cards";
import {
  useCardsStore,
  toggleFreeze,
  topUpCard,
  cancelCard,
  setLimit as setLimitStore,
  setBlocked as setBlockedStore,
  advanceShipping,
  activatePhysicalCard,
  reportCardLostOrStolen,
} from "@/lib/cards-store";


export const Route = createFileRoute("/_app/cards/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Card · ${params.id} · BazePay` },
      { name: "description", content: "Manage card limits, freeze, and review transactions." },
    ],
  }),
  loader: ({ params }) => ({ id: params.id }),
  notFoundComponent: () => (
    <div className="min-h-full flex flex-col items-center justify-center p-6 text-center">
      <p className="text-sm text-foreground/60">Card not found.</p>
      <Link to="/cards" className="mt-4 text-sm font-bold text-primary">
        Back to Cards
      </Link>
    </div>
  ),
  component: CardDetail,
});

function CardDetail() {
  const { id } = Route.useLoaderData();
  const navigate = useNavigate();
  const { cards, txns: allTxns } = useCardsStore();
  const card = cards.find((c) => c.id === id);

  const [revealed, setRevealed] = useState(false);
  const [showLimits, setShowLimits] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showActivate, setShowActivate] = useState(false);
  const [showTracking, setShowTracking] = useState(false);


  const txns = useMemo(
    () =>
      allTxns
        .filter((t) => t.cardId === id)
        .sort((a, b) => +new Date(b.at) - +new Date(a.at)),
    [allTxns, id],
  );

  useEffect(() => {
    if (!card && cards.length === 0) {
      navigate({ to: "/cards" });
    }
  }, [card, cards.length, navigate]);

  if (!card) {
    if (cards.length > 0) throw notFound();
    return null;
  }

  const frozen = card.status === "frozen";

  const copy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(key);
        setTimeout(() => setCopied(null), 1400);
      });
    }
  };

  const pct = Math.min(100, Math.round((card.monthlySpentNgn / card.monthlyLimitNgn) * 100));

  return (
    <div className="min-h-full bg-background text-foreground flex flex-col">
      <div className="h-10" />
      <div className="px-6 pt-4 flex items-center justify-between">
        <button
          onClick={() => navigate({ to: "/cards" })}
          className="w-10 h-10 rounded-full bg-card text-card-foreground flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowLimits(true)}
          className="w-10 h-10 rounded-full bg-card text-card-foreground flex items-center justify-center"
          aria-label="Manage"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 mt-5">
        <VirtualCardArt card={card} revealed={revealed} size="lg" />
        {cards.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {cards.map((c) => {
              const isActive = c.id === card.id;
              return (
                <button
                  key={c.id}
                  onClick={() => navigate({ to: "/cards/$id", params: { id: c.id } })}
                  className={`h-1.5 rounded-full transition-all ${
                    isActive ? "w-6 bg-primary" : "w-1.5 bg-foreground/25"
                  }`}
                  aria-label={`Go to ${c.label}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Reveal + copy */}
      <div className="px-6 mt-4 flex items-center gap-2">
        <RevealToggle on={revealed} onClick={() => setRevealed((v) => !v)} />
        <button
          onClick={() => copy(card.pan.replace(/\s/g, ""), "pan")}
          className="h-10 px-4 rounded-full bg-card-foreground/[0.06] text-sm font-bold flex items-center gap-1.5 active:scale-[0.98] transition"
        >
          {copied === "pan" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied === "pan" ? "Copied" : "Copy PAN"}
        </button>
        <button
          onClick={() => copy(card.cvv, "cvv")}
          className="h-10 px-4 rounded-full bg-card-foreground/[0.06] text-sm font-bold flex items-center gap-1.5 active:scale-[0.98] transition"
        >
          {copied === "cvv" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          CVV
        </button>
      </div>

      {/* Quick actions */}
      <div className="px-6 mt-4 grid grid-cols-3 gap-2">
        <ActionTile
          icon={frozen ? <Sun className="w-4 h-4" /> : <Snowflake className="w-4 h-4" />}
          label={frozen ? "Unfreeze" : "Freeze"}
          onClick={() => {
            toggleFreeze(card.id);
            toast.success(frozen ? "Card unfrozen" : "Card frozen");
          }}
          active={frozen}
        />
        <ActionTile
          icon={<Plus className="w-4 h-4" />}
          label="Top up"
          onClick={() => setShowFund(true)}
        />
        <ActionTile
          icon={<Settings2 className="w-4 h-4" />}
          label="Limits"
          onClick={() => setShowLimits(true)}
        />
      </div>

      <div className="flex-1 mt-6 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-28 space-y-6">
        {card.type === "physical" && card.physical && (
          <PhysicalStatusPanel
            card={card}
            onOpenTracking={() => setShowTracking(true)}
            onActivate={() => setShowActivate(true)}
            onReportLost={() => {
              reportCardLostOrStolen(card.id);
              toast.success("Card frozen. A replacement request has been logged.");
            }}
          />
        )}

        {/* Spend */}

        <div className="rounded-2xl bg-card-foreground/[0.04] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/55">
              Monthly spend
            </p>
            <p className="text-[11px] tabular-nums text-card-foreground/65">
              {formatNgn(card.monthlySpentNgn)} / {formatNgn(card.monthlyLimitNgn)}
            </p>
          </div>
          <div className="mt-3 h-2 rounded-full bg-card-foreground/[0.08] overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-card-foreground/50">Balance</p>
              <p className="font-display font-bold text-xl tabular-nums mt-1">{formatNgn(card.balanceNgn)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-card-foreground/50">Status</p>
              <p className="font-display font-bold text-xl mt-1 capitalize">
                {frozen ? "Frozen" : "Active"}
              </p>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="font-display font-bold text-base">Recent activity</h2>
            <span className="text-[11px] text-card-foreground/55">{txns.length} txns</span>
          </div>
          {txns.length === 0 ? (
            <div className="rounded-2xl bg-card-foreground/[0.04] p-6 text-center">
              <Receipt className="w-6 h-6 text-card-foreground/40 mx-auto" />
              <p className="text-[12px] text-card-foreground/55 mt-2">No transactions yet.</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-card-foreground/[0.04] divide-y divide-card-foreground/[0.06] overflow-hidden">
              {txns.map((t) => {
                const isCredit = t.amountNgn > 0;
                return (
                  <Link
                    key={t.id}
                    to="/cards/$id/txn/$txnId"
                    params={{ id: card.id, txnId: t.id }}
                    className="flex items-center gap-3 px-4 py-3.5 active:bg-card-foreground/[0.06] transition"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isCredit ? "bg-success/15 text-success" : "bg-card-foreground/[0.06] text-card-foreground/70"
                      }`}
                    >
                      {t.merchant.slice(0, 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{t.merchant}</p>
                      <p className="text-[11px] text-card-foreground/55 capitalize">
                        {t.category} · {relativeDay(t.at)}
                        {t.status !== "settled" && (
                          <span className="ml-1.5 text-amber-600 font-bold uppercase tracking-wider text-[9px]">
                            · {t.status}
                          </span>
                        )}
                      </p>
                    </div>
                    <p
                      className={`font-display font-bold text-sm tabular-nums shrink-0 ${
                        isCredit ? "text-success" : "text-card-foreground"
                      }`}
                    >
                      {isCredit ? "+" : "−"}
                      {formatNgn(Math.abs(t.amountNgn))}
                    </p>
                    <ChevronRight className="w-4 h-4 text-card-foreground/30 shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-card-foreground/[0.04] p-4 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-[12px] text-card-foreground/65 leading-relaxed">
            See something you don't recognise? Freeze the card and contact support.
          </p>
        </div>
      </div>

      {showLimits && (
        <LimitsSheet
          cardId={card.id}
          initialLimit={card.monthlyLimitNgn}
          initialBlocked={card.blockedCategories}
          onCancel={() => {
            setShowLimits(false);
            setShowCancel(true);
          }}
          onClose={() => setShowLimits(false)}
        />
      )}
      {showFund && (
        <FundSheet
          cardId={card.id}
          onClose={() => setShowFund(false)}
        />
      )}
      {showCancel && (
        <ConfirmCancelSheet
          label={card.label}
          onConfirm={() => {
            cancelCard(card.id);
            toast.success("Card cancelled");
            navigate({ to: "/cards" });
          }}
          onClose={() => setShowCancel(false)}
        />
      )}
      {showActivate && card.physical && (
        <ActivationSheet
          card={card}
          onClose={() => setShowActivate(false)}
          onSuccess={() => {
            setShowActivate(false);
            toast.success("Card activated");
          }}
        />
      )}
      {showTracking && card.physical && (
        <TrackingSheet card={card} onClose={() => setShowTracking(false)} />
      )}

    </div>
  );
}

function ActionTile({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-12 rounded-2xl flex items-center justify-center gap-1.5 text-[12px] font-bold transition active:scale-[0.98] ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-card text-card-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function LimitsSheet({
  cardId,
  initialLimit,
  initialBlocked,
  onCancel,
  onClose,
}: {
  cardId: string;
  initialLimit: number;
  initialBlocked: string[];
  onCancel: () => void;
  onClose: () => void;
}) {
  const [limit, setLimit] = useState(initialLimit);
  const [blocked, setBlocked] = useState<string[]>(initialBlocked);

  const save = () => {
    setLimitStore(cardId, limit);
    setBlockedStore(cardId, blocked);
    toast.success("Limits updated");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end">
      <button onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full bg-card text-card-foreground rounded-t-[2rem] pt-3 pb-8 max-h-[85vh] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 rounded-full bg-card-foreground/15 mx-auto" />
        <div className="px-6 mt-4 flex items-center justify-between">
          <h3 className="font-display font-bold text-lg">Limits & controls</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-card-foreground/[0.06] flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 mt-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/55 mb-2">
            Monthly limit
          </p>
          <p className="font-display font-bold text-3xl tabular-nums">{formatNgn(limit)}</p>
          <input
            type="range"
            min={50000}
            max={5000000}
            step={50000}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full mt-3 accent-primary"
          />
          <div className="flex justify-between text-[10px] text-card-foreground/55 tabular-nums">
            <span>₦50k</span>
            <span>₦5M</span>
          </div>
        </div>

        <div className="px-6 mt-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/55 mb-2">
            Blocked merchant categories
          </p>
          <div className="space-y-2">
            {merchantCategories.map((c) => {
              const on = blocked.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() =>
                    setBlocked(on ? blocked.filter((b) => b !== c.id) : [...blocked, c.id])
                  }
                  className="w-full rounded-2xl bg-card-foreground/[0.04] px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-sm font-semibold">{c.label}</span>
                  <div
                    className={`w-11 h-6 rounded-full transition relative ${
                      on ? "bg-destructive" : "bg-card-foreground/[0.12]"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                        on ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 mt-6 space-y-2">
          <button
            onClick={save}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm"
          >
            Save changes
          </button>
          <button
            onClick={onCancel}
            className="w-full h-12 rounded-full bg-destructive/10 text-destructive font-bold text-sm flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Cancel card
          </button>
        </div>
      </div>
    </div>
  );
}

function FundSheet({ cardId, onClose }: { cardId: string; onClose: () => void }) {
  const [amount, setAmount] = useState(50000);
  const submit = () => {
    if (amount < 1000) return;
    topUpCard(cardId, amount);
    toast.success(`Topped up ${formatNgn(amount)}`);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[80] flex items-end">
      <button onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full bg-card text-card-foreground rounded-t-[2rem] pt-3 pb-8 animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 rounded-full bg-card-foreground/15 mx-auto" />
        <div className="px-6 mt-4 flex items-center justify-between">
          <h3 className="font-display font-bold text-lg">Top up card</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-card-foreground/[0.06] flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 mt-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/55 mb-2">
            Amount (NGN)
          </p>
          <input
            type="number"
            value={amount}
            min={1000}
            step={1000}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
            className="w-full h-14 rounded-2xl bg-card-foreground/[0.04] px-4 text-2xl font-bold tabular-nums outline-none"
          />
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[25000, 50000, 100000, 250000].map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className="h-10 rounded-full bg-card-foreground/[0.04] text-sm font-bold tabular-nums"
              >
                ₦{(a / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        <div className="mx-6 mt-5 rounded-2xl bg-card-foreground/[0.04] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-card-foreground/55">From</p>
            <p className="text-sm font-semibold">NGN Wallet</p>
          </div>
          <ChevronRight className="w-4 h-4 text-card-foreground/40" />
        </div>

        <div className="px-6 mt-5">
          <button
            disabled={amount < 1000}
            onClick={submit}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40"
          >
            Top up · {formatNgn(amount)}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmCancelSheet({
  label,
  onConfirm,
  onClose,
}: {
  label: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-end">
      <button onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full bg-card text-card-foreground rounded-t-[2rem] pt-3 pb-8 animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 rounded-full bg-card-foreground/15 mx-auto" />
        <div className="px-6 mt-5 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-destructive/15 text-destructive flex items-center justify-center">
            <Trash2 className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl mt-4">Cancel {label}?</h3>
          <p className="text-[12px] text-card-foreground/60 mt-2 leading-relaxed max-w-[280px] mx-auto">
            This permanently closes the card. Any remaining balance is returned to your wallet.
          </p>
        </div>
        <div className="px-6 mt-6 space-y-2">
          <button
            onClick={onConfirm}
            className="w-full h-12 rounded-full bg-destructive text-destructive-foreground font-bold text-sm"
          >
            Cancel card
          </button>
          <button
            onClick={onClose}
            className="w-full h-12 rounded-full bg-card-foreground/[0.06] font-bold text-sm"
          >
            Keep card
          </button>
        </div>
      </div>
    </div>
  );
}

function PhysicalStatusPanel({
  card,
  onOpenTracking,
  onActivate,
  onReportLost,
}: {
  card: ReturnType<typeof useCardsStore>["cards"][number];
  onOpenTracking: () => void;
  onActivate: () => void;
  onReportLost: () => void;
}) {
  if (!card.physical) return null;
  const stage = card.physical.shippingStage;
  const stages = SHIPPING_STAGES;
  const currentIdx = stages.indexOf(stage);
  const isDelivered = stage === "delivered";
  const isActive = card.status === "active";
  const eta = new Date(card.physical.eta).toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <div className="rounded-2xl bg-card-foreground/[0.04] p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
          {isDelivered ? <Sparkles className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold">
            {isDelivered && isActive
              ? "Card active"
              : isDelivered
                ? "Delivered — ready to activate"
                : SHIPPING_LABEL[stage]}
          </p>
          <p className="text-[11px] text-card-foreground/55">
            {card.physical.courier} · {isDelivered ? `Delivered on ${eta}` : `ETA ${eta}`}
          </p>
        </div>
        <button
          onClick={onOpenTracking}
          className="text-[11px] font-bold text-primary flex items-center gap-0.5"
        >
          Track <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {stages.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= currentIdx ? "bg-primary" : "bg-card-foreground/10"
            }`}
          />
        ))}
      </div>

      {isDelivered && !isActive && (
        <button
          onClick={onActivate}
          className="mt-4 w-full h-11 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Activate card
        </button>
      )}
      {isDelivered && isActive && (
        <button
          onClick={onReportLost}
          className="mt-4 w-full h-11 rounded-full bg-destructive/10 text-destructive font-bold text-sm flex items-center justify-center gap-2"
        >
          <AlertTriangle className="w-4 h-4" /> Report lost or stolen
        </button>
      )}
    </div>
  );
}

function TrackingSheet({
  card,
  onClose,
}: {
  card: ReturnType<typeof useCardsStore>["cards"][number];
  onClose: () => void;
}) {
  if (!card.physical) return null;
  const stages = SHIPPING_STAGES;
  const currentIdx = stages.indexOf(card.physical.shippingStage);

  // Demo helper — advance stage manually for prototype
  const nextStage: ShippingStage | null =
    currentIdx < stages.length - 1 ? stages[currentIdx + 1] : null;

  return (
    <AnimatePresence>
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
        className="absolute inset-x-0 bottom-0 z-50 bg-card text-card-foreground rounded-t-[2rem] max-h-[85%] flex flex-col"
      >
        <div className="pt-3 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-card-foreground/15" />
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Delivery tracking</h2>
            <p className="text-[11px] text-card-foreground/55 mt-0.5">
              {card.physical.courier} · {card.physical.trackingCode}
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-card-foreground/[0.06] flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="rounded-2xl bg-card-foreground/[0.04] p-4 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-card-foreground/50">Shipping to</p>
            <p className="text-sm font-bold mt-1">{card.physical.address.fullName}</p>
            <p className="text-[12px] text-card-foreground/65 mt-0.5 leading-relaxed">
              {card.physical.address.line1}
              {card.physical.address.line2 ? `, ${card.physical.address.line2}` : ""}
              <br />
              {card.physical.address.city}, {card.physical.address.state}
            </p>
          </div>

          <ol className="relative border-l border-card-foreground/10 ml-4 space-y-5 py-2">
            {stages.map((s, i) => {
              const done = i <= currentIdx;
              const event = card.physical!.events.find((e) => e.stage === s);
              return (
                <li key={s} className="pl-6 relative">
                  <span
                    className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 ${
                      done
                        ? "bg-primary border-primary"
                        : "bg-card border-card-foreground/20"
                    } flex items-center justify-center`}
                  >
                    {done && <Check className="w-2.5 h-2.5 text-primary-foreground" strokeWidth={4} />}
                  </span>
                  <p className={`text-[13px] font-bold ${done ? "" : "text-card-foreground/50"}`}>
                    {SHIPPING_LABEL[s]}
                  </p>
                  <p className="text-[11px] text-card-foreground/55 mt-0.5">
                    {event
                      ? new Date(event.at).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Pending"}
                  </p>
                  {event?.note && (
                    <p className="text-[11px] text-card-foreground/60 mt-0.5 italic">{event.note}</p>
                  )}
                </li>
              );
            })}
          </ol>

          {nextStage && (
            <button
              onClick={() => {
                advanceShipping(card.id, nextStage);
                toast.success(`Updated · ${SHIPPING_LABEL[nextStage]}`);
              }}
              className="mt-6 w-full h-11 rounded-full bg-card-foreground/[0.06] text-card-foreground text-[12px] font-bold"
            >
              Simulate next update · {SHIPPING_LABEL[nextStage]}
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ActivationSheet({
  card,
  onClose,
  onSuccess,
}: {
  card: ReturnType<typeof useCardsStore>["cards"][number];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [last4, setLast4] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState<string | null>(null);
  const canSubmit = last4.length === 4 && cvv.length === 3;

  const submit = () => {
    setError(null);
    const ok = activatePhysicalCard(card.id, last4, cvv);
    if (ok) onSuccess();
    else setError("Details don't match. Check the back of your card.");
  };

  return (
    <AnimatePresence>
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
        className="absolute inset-x-0 bottom-0 z-50 bg-card text-card-foreground rounded-t-[2rem] pb-8"
      >
        <div className="pt-3 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-card-foreground/15" />
        </div>
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Activate card</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-card-foreground/[0.06] flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 pt-2 space-y-4">
          <p className="text-[12.5px] text-card-foreground/65 leading-relaxed">
            Enter the last 4 digits printed on the card and the 3-digit CVV on the back to activate.
          </p>
          <div className="rounded-xl bg-primary/10 text-primary text-[11.5px] px-3 py-2 font-medium leading-relaxed">
            Demo hint — Last 4: <span className="font-bold tabular-nums">{card.pan.replace(/\s/g, "").slice(-4)}</span> · CVV: <span className="font-bold tabular-nums">{card.cvv}</span>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/50 mb-1.5 px-1">Last 4 digits</p>
            <input
              value={last4}
              onChange={(e) => setLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric"
              placeholder="1234"
              className="w-full h-12 rounded-2xl bg-card-foreground/[0.04] px-4 text-[15px] font-bold tabular-nums tracking-widest outline-none focus:bg-card-foreground/[0.06]"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/50 mb-1.5 px-1">CVV</p>
            <input
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              inputMode="numeric"
              placeholder="123"
              className="w-full h-12 rounded-2xl bg-card-foreground/[0.04] px-4 text-[15px] font-bold tabular-nums tracking-widest outline-none focus:bg-card-foreground/[0.06]"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 text-destructive text-[12px] px-3 py-2 font-medium">
              {error}
            </div>
          )}

          <button
            disabled={!canSubmit}
            onClick={submit}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 transition"
          >
            Activate now
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
