import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Truck,
  MapPin,
  Zap,
  Package,
} from "lucide-react";
import { VirtualCardArt } from "@/components/virtual-card";
import type { CardBrand } from "@/lib/cards";
import {
  formatNgn,
  PHYSICAL_ISSUE_FEE_NGN,
  PHYSICAL_SHIPPING_FEE_NGN,
  PHYSICAL_EXPRESS_FEE_NGN,
} from "@/lib/cards";
import { issuePhysicalCard } from "@/lib/cards-store";
import { usePinGate } from "@/components/pin-prompt";

export const Route = createFileRoute("/_app/cards/physical")({
  head: () => ({
    meta: [
      { title: "Order Physical Card · BazePay" },
      { name: "description", content: "Request a physical Naira card delivered to you." },
    ],
  }),
  component: PhysicalCardPage,
});

const themes: { id: string; from: string; to: string; label: string }[] = [
  { id: "indigo", from: "oklch(0.32 0.14 270)", to: "oklch(0.22 0.12 300)", label: "Midnight" },
  { id: "gold", from: "oklch(0.28 0.10 240)", to: "oklch(0.45 0.16 60)", label: "Aurum" },
  { id: "teal", from: "oklch(0.30 0.08 200)", to: "oklch(0.20 0.06 260)", label: "Glacier" },
  { id: "coral", from: "oklch(0.40 0.16 20)", to: "oklch(0.25 0.10 350)", label: "Ember" },
];

type Step = "intro" | "address" | "design" | "delivery" | "review" | "issuing" | "success";

function PhysicalCardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [label, setLabel] = useState("");
  const [brand, setBrand] = useState<CardBrand>("Visa");
  const [themeId, setThemeId] = useState(themes[0].id);
  const theme = themes.find((t) => t.id === themeId)!;

  const [fullName, setFullName] = useState("Tunde Oke");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Lagos");
  const [phone, setPhone] = useState("");

  const [speed, setSpeed] = useState<"standard" | "express">("standard");
  const shippingFee = speed === "express" ? PHYSICAL_EXPRESS_FEE_NGN : PHYSICAL_SHIPPING_FEE_NGN;
  const total = PHYSICAL_ISSUE_FEE_NGN + shippingFee;

  const newIdRef = useRef<string | null>(null);
  const { requirePin, pinGate } = usePinGate({ subtitle: "Authorise physical card order" });

  const labelOk = label.trim().length >= 2;
  const addressOk =
    fullName.trim().length > 1 &&
    line1.trim().length > 3 &&
    city.trim().length > 1 &&
    stateName.trim().length > 1 &&
    phone.trim().replace(/\D/g, "").length >= 10;

  const handlePay = () => {
    requirePin(() => {
      setStep("issuing");
      setTimeout(() => {
        const card = issuePhysicalCard({
          label: label.trim(),
          brand,
          gradient: { from: theme.from, to: theme.to },
          address: {
            fullName: fullName.trim(),
            line1: line1.trim(),
            line2: line2.trim() || undefined,
            city: city.trim(),
            state: stateName.trim(),
            phone: phone.trim(),
          },
          deliverySpeed: speed,
        });
        newIdRef.current = card.id;
        setStep("success");
      }, 1800);
    });
  };

  const back = () => {
    const order: Step[] = ["intro", "address", "design", "delivery", "review"];
    const i = order.indexOf(step);
    if (i <= 0) navigate({ to: "/cards" });
    else setStep(order[i - 1]);
  };

  const titles: Record<Step, { title: string; sub: string }> = {
    intro: { title: "Physical card", title2: "", sub: "Naira card, delivered" } as any,
    address: { title: "Delivery address", sub: "Step 1 of 3" },
    design: { title: "Customize", sub: "Step 2 of 3" },
    delivery: { title: "Delivery speed", sub: "Step 3 of 3" },
    review: { title: "Review & pay", sub: "Confirm order" },
    issuing: { title: "Placing order", sub: "Just a moment" },
    success: { title: "Order placed", sub: "On its way to you" },
  } as Record<Step, { title: string; sub: string }>;

  return (
    <div className="min-h-full bg-background text-foreground flex flex-col">
      <div className="h-10" />
      <div className="px-6 pt-4 flex items-center gap-3">
        {step !== "issuing" && step !== "success" && (
          <button
            onClick={back}
            className="w-10 h-10 rounded-full bg-card text-card-foreground flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div className="flex-1">
          <h1 className="font-display text-xl font-bold tracking-tight">{titles[step].title}</h1>
          <p className="text-[11px] text-foreground/55">{titles[step].sub}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          <Package className="w-4 h-4" />
        </div>
      </div>

      {step === "intro" && (
        <IntroScreen onContinue={() => setStep("address")} />
      )}

      {step === "address" && (
        <AddressScreen
          fullName={fullName}
          setFullName={setFullName}
          line1={line1}
          setLine1={setLine1}
          line2={line2}
          setLine2={setLine2}
          city={city}
          setCity={setCity}
          stateName={stateName}
          setStateName={setStateName}
          phone={phone}
          setPhone={setPhone}
          canContinue={addressOk}
          onContinue={() => setStep("design")}
        />
      )}

      {step === "design" && (
        <DesignScreen
          label={label}
          setLabel={setLabel}
          brand={brand}
          setBrand={setBrand}
          themeId={themeId}
          setThemeId={setThemeId}
          theme={theme}
          canContinue={labelOk}
          onContinue={() => setStep("delivery")}
        />
      )}

      {step === "delivery" && (
        <DeliveryScreen
          speed={speed}
          setSpeed={setSpeed}
          onContinue={() => setStep("review")}
        />
      )}

      {step === "review" && (
        <ReviewScreen
          label={label}
          brand={brand}
          theme={theme}
          address={{ fullName, line1, line2, city, state: stateName, phone }}
          speed={speed}
          shippingFee={shippingFee}
          total={total}
          onPay={handlePay}
        />
      )}

      {(step === "issuing" || step === "success") && (
        <SuccessScreen done={step === "success"} newId={newIdRef.current} speed={speed} />
      )}
      {pinGate}
    </div>
  );
}

function IntroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 mt-5">
        <div
          className="relative aspect-[1.586/1] w-full rounded-3xl overflow-hidden p-6 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          style={{
            background: "linear-gradient(135deg, oklch(0.32 0.14 270) 0%, oklch(0.22 0.12 300) 100%)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-30 blur-3xl bg-amber-300" />
          <div className="relative flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
              BazePay · Physical
            </div>
            <CreditCard className="w-5 h-5 opacity-80" />
          </div>
          <div className="relative">
            <p className="font-display text-2xl font-bold tracking-tight">
              A real card. Everywhere.
            </p>
            <p className="text-[11px] opacity-75 mt-1.5 leading-relaxed max-w-[260px]">
              Tap, swipe or insert — POS, ATMs, in-store, worldwide. Funded in Naira from your wallet.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-6 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-32">
        <h2 className="font-display font-bold text-base">What's included</h2>
        <div className="mt-3 space-y-2">
          <Bullet icon={<Truck className="w-4 h-4" />} title="Free door delivery" desc="Standard delivery within 5–7 business days, or express in 2–3 days." />
          <Bullet icon={<Zap className="w-4 h-4" />} title="Contactless & chip" desc="Tap to pay, chip & PIN, and ATM withdrawals in Nigeria and abroad." />
          <Bullet icon={<ShieldCheck className="w-4 h-4" />} title="Freeze & reissue" desc="Instant freeze, spend limits, and free reissue if lost or stolen." />
        </div>

        <div className="mt-6 rounded-2xl bg-card-foreground/[0.04] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/55">
            Order breakdown
          </p>
          <div className="mt-2 space-y-1.5 text-[13px]">
            <RowLine label="Card issuance" value={formatNgn(PHYSICAL_ISSUE_FEE_NGN)} />
            <RowLine label="Standard shipping" value={formatNgn(PHYSICAL_SHIPPING_FEE_NGN)} />
            <div className="h-px bg-card-foreground/[0.08] my-1" />
            <RowLine
              label="Starting from"
              value={formatNgn(PHYSICAL_ISSUE_FEE_NGN + PHYSICAL_SHIPPING_FEE_NGN)}
              bold
            />
          </div>
        </div>

        <button
          onClick={onContinue}
          className="mt-6 w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm"
        >
          Order my card
        </button>
      </div>
    </div>
  );
}

function AddressScreen({
  fullName,
  setFullName,
  line1,
  setLine1,
  line2,
  setLine2,
  city,
  setCity,
  stateName,
  setStateName,
  phone,
  setPhone,
  canContinue,
  onContinue,
}: {
  fullName: string;
  setFullName: (s: string) => void;
  line1: string;
  setLine1: (s: string) => void;
  line2: string;
  setLine2: (s: string) => void;
  city: string;
  setCity: (s: string) => void;
  stateName: string;
  setStateName: (s: string) => void;
  phone: string;
  setPhone: (s: string) => void;
  canContinue: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="flex-1 mt-6 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-32">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
          <MapPin className="w-4 h-4" />
        </div>
        <p className="text-[12px] text-card-foreground/65 leading-relaxed">
          We ship to any Nigerian address. Ensure someone can receive the card.
        </p>
      </div>

      <div className="space-y-3">
        <Field label="Full name" value={fullName} onChange={setFullName} placeholder="As printed on card" />
        <Field label="Address line 1" value={line1} onChange={setLine1} placeholder="Street, house number" />
        <Field label="Address line 2 (optional)" value={line2} onChange={setLine2} placeholder="Apartment, floor, landmark" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" value={city} onChange={setCity} placeholder="Ikeja" />
          <Field label="State" value={stateName} onChange={setStateName} placeholder="Lagos" />
        </div>
        <Field label="Phone" value={phone} onChange={setPhone} placeholder="0803 000 0000" inputMode="tel" />
      </div>

      <button
        disabled={!canContinue}
        onClick={onContinue}
        className="mt-6 w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 transition"
      >
        Continue
      </button>
    </div>
  );
}

function DesignScreen({
  label,
  setLabel,
  brand,
  setBrand,
  themeId,
  setThemeId,
  theme,
  canContinue,
  onContinue,
}: {
  label: string;
  setLabel: (s: string) => void;
  brand: CardBrand;
  setBrand: (b: CardBrand) => void;
  themeId: string;
  setThemeId: (id: string) => void;
  theme: { from: string; to: string };
  canContinue: boolean;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="px-6 mt-5">
        <VirtualCardArt card={{ label: label || "Physical", brand, gradient: theme }} blank />
      </div>
      <div className="flex-1 mt-6 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-32 space-y-6">
        <Field label="Card name" value={label} onChange={(v) => setLabel(v.slice(0, 24))} placeholder="e.g. Daily" />

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/50 mb-2 px-1">
            Network
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(["Visa", "Mastercard"] as CardBrand[]).map((b) => {
              const sel = brand === b;
              return (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`h-12 rounded-2xl text-sm font-bold transition ${
                    sel ? "bg-primary text-primary-foreground shadow" : "bg-card-foreground/[0.04] text-card-foreground/70"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/50 mb-2 px-1">
            Card finish
          </p>
          <div className="grid grid-cols-4 gap-3">
            {themes.map((t) => {
              const sel = themeId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setThemeId(t.id)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`relative aspect-[1.586/1] w-full rounded-xl overflow-hidden transition-all ${
                      sel ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-[1.02]" : "ring-1 ring-card-foreground/[0.08] group-active:scale-95"
                    }`}
                    style={{ background: `linear-gradient(135deg, ${t.from} 0%, ${t.to} 100%)` }}
                  >
                    {sel && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-6 h-6 rounded-full bg-white text-primary flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </span>
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${sel ? "text-card-foreground" : "text-card-foreground/55"}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          disabled={!canContinue}
          onClick={onContinue}
          className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm disabled:opacity-40 transition"
        >
          Continue
        </button>
      </div>
    </>
  );
}

function DeliveryScreen({
  speed,
  setSpeed,
  onContinue,
}: {
  speed: "standard" | "express";
  setSpeed: (s: "standard" | "express") => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex-1 mt-6 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-32 space-y-3">
      <SpeedOption
        selected={speed === "standard"}
        onClick={() => setSpeed("standard")}
        title="Standard delivery"
        subtitle="5–7 business days · GIG Logistics"
        price={PHYSICAL_SHIPPING_FEE_NGN}
      />
      <SpeedOption
        selected={speed === "express"}
        onClick={() => setSpeed("express")}
        title="Express delivery"
        subtitle="2–3 business days · DHL Express"
        price={PHYSICAL_EXPRESS_FEE_NGN}
        badge="Fastest"
      />

      <div className="rounded-2xl bg-card-foreground/[0.04] p-4 flex gap-3 mt-2">
        <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[11px] text-card-foreground/65 leading-relaxed">
          You'll receive an SMS with a tracking code once your card ships. Live status updates appear in the card details screen.
        </p>
      </div>

      <button
        onClick={onContinue}
        className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm mt-2"
      >
        Continue
      </button>
    </div>
  );
}

function SpeedOption({
  selected,
  onClick,
  title,
  subtitle,
  price,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  price: number;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-4 transition ${
        selected ? "bg-primary text-primary-foreground" : "bg-card-foreground/[0.04] text-card-foreground"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
            selected ? "border-primary-foreground bg-primary-foreground text-primary" : "border-card-foreground/30"
          }`}
        >
          {selected && <Check className="w-3 h-3" strokeWidth={4} />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm">{title}</p>
            {badge && (
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                  selected ? "bg-primary-foreground/20" : "bg-primary/15 text-primary"
                }`}
              >
                {badge}
              </span>
            )}
          </div>
          <p className={`text-[11px] mt-0.5 ${selected ? "opacity-80" : "text-card-foreground/55"}`}>{subtitle}</p>
        </div>
        <p className="font-bold text-sm tabular-nums">{formatNgn(price)}</p>
      </div>
    </button>
  );
}

function ReviewScreen({
  label,
  brand,
  theme,
  address,
  speed,
  shippingFee,
  total,
  onPay,
}: {
  label: string;
  brand: CardBrand;
  theme: { from: string; to: string };
  address: { fullName: string; line1: string; line2?: string; city: string; state: string; phone: string };
  speed: "standard" | "express";
  shippingFee: number;
  total: number;
  onPay: () => void;
}) {
  return (
    <>
      <div className="px-6 mt-5">
        <VirtualCardArt card={{ label, brand, gradient: theme }} blank />
      </div>
      <div className="flex-1 mt-6 bg-card text-card-foreground rounded-t-[2rem] px-6 pt-6 pb-32 space-y-4">
        <div className="rounded-2xl bg-card-foreground/[0.04] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/55 mb-2">
            Delivering to
          </p>
          <p className="text-sm font-bold">{address.fullName}</p>
          <p className="text-[12px] text-card-foreground/65 mt-0.5 leading-relaxed">
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}
            <br />
            {address.city}, {address.state}
            <br />
            {address.phone}
          </p>
        </div>

        <div className="rounded-2xl bg-card-foreground/[0.04] p-4 space-y-2 text-[13px]">
          <RowLine label="Card name" value={label} />
          <RowLine label="Network" value={brand} />
          <RowLine label="Delivery" value={speed === "express" ? "Express (2–3 days)" : "Standard (5–7 days)"} />
          <div className="h-px bg-card-foreground/[0.08] my-1" />
          <RowLine label="Card issuance" value={formatNgn(PHYSICAL_ISSUE_FEE_NGN)} />
          <RowLine label="Shipping" value={formatNgn(shippingFee)} />
          <div className="h-px bg-card-foreground/[0.08] my-1" />
          <RowLine label="Total" value={formatNgn(total)} bold />
        </div>

        <div className="rounded-2xl bg-card-foreground/[0.04] p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/55">Pay from</p>
            <p className="font-semibold text-sm mt-0.5">NGN Wallet</p>
          </div>
          <span className="px-2 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider">
            Selected
          </span>
        </div>

        <button
          onClick={onPay}
          className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm"
        >
          Pay {formatNgn(total)} & place order
        </button>
      </div>
    </>
  );
}

function SuccessScreen({ done, newId, speed }: { done: boolean; newId: string | null; speed: "standard" | "express" }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
          done ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
        }`}
      >
        {done ? (
          <Sparkles className="w-10 h-10" strokeWidth={2.2} />
        ) : (
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        )}
      </div>
      <h2 className="font-display font-bold text-2xl tracking-tight mt-6">
        {done ? "Order placed" : "Placing your order"}
      </h2>
      <p className="text-[13px] text-foreground/60 mt-2 max-w-[300px] leading-relaxed">
        {done
          ? `Your card will arrive in ${speed === "express" ? "2–3" : "5–7"} business days. Track live status any time from the card details screen.`
          : "Confirming payment and creating your card record."}
      </p>

      {done && newId && (
        <div className="w-full mt-8 space-y-2">
          <Link
            to="/cards/$id"
            params={{ id: newId }}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center"
          >
            Track my card
          </Link>
          <Link
            to="/cards"
            className="w-full h-12 rounded-full bg-card-foreground/[0.06] font-bold text-sm flex items-center justify-center"
          >
            Back to cards
          </Link>
        </div>
      )}
    </div>
  );
}

function Bullet({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-card-foreground/[0.04] p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-[11px] text-card-foreground/55 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-card-foreground/50 mb-1.5 px-1">
        {label}
      </p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full h-12 rounded-2xl bg-card-foreground/[0.04] px-4 text-[15px] font-semibold outline-none focus:bg-card-foreground/[0.06]"
      />
    </div>
  );
}

function RowLine({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-card-foreground/60">{label}</span>
      <span className={`tabular-nums ${bold ? "font-bold text-card-foreground" : "text-card-foreground/85"}`}>
        {value}
      </span>
    </div>
  );
}
