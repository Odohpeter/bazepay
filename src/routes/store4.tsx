import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode, CSSProperties } from "react";
import { ShieldCheck, LockKeyhole, MessageCircle, Zap, Globe2, CreditCard, Check } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import bazepayWordmark from "@/assets/bazepay-wordmark.png.asset.json";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";

export const Route = createFileRoute("/store4")({
  component: StorePreview4,
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Hyper-modern" },
      { name: "description", content: "Alternative Play Store slide design: centered hero type, glass notification chips with real values, color blooms." },
    ],
  }),
});

/* Design 4 — Hyper-modern: everything centered, color blooms in the corners,
   glass notification-style chips carrying real values. */

const CANVAS_W = 1080;
const CANVAS_H = 1920;
const PREVIEW_W = 432;
const SCALE = PREVIEW_W / CANVAS_W;

type GlassChip = { label: string; value: string; side: "l" | "r"; y: number; icon?: "zap" | "globe" | "card" | "lock" | "shield" | "chat" | "check" };

type Slide = {
  badge: string;
  title: ReactNode[];
  sub: string;
  img?: string;
  imgTop?: number;
  subTop: number;
  featureGrid?: { icon: GlassChip["icon"]; label: string; sub: string }[];
  cta?: boolean;
  chips?: GlassChip[];
};

const chipIcon = (i?: GlassChip["icon"]) => {
  const cls = "w-7 h-7";
  switch (i) {
    case "zap": return <Zap className={cls} strokeWidth={2.4} />;
    case "globe": return <Globe2 className={cls} strokeWidth={2.4} />;
    case "card": return <CreditCard className={cls} strokeWidth={2.4} />;
    case "lock": return <LockKeyhole className={cls} strokeWidth={2.4} />;
    case "shield": return <ShieldCheck className={cls} strokeWidth={2.4} />;
    case "chat": return <MessageCircle className={cls} strokeWidth={2.4} />;
    case "check": return <Check className={cls} strokeWidth={3} />;
    default: return null;
  }
};

const SLIDES: Slide[] = [
  {
    badge: "NOW ON GOOGLE PLAY",
    title: ["Spend naira", <>from <em style={{ fontStyle: "italic", color: "var(--lime)" }}>anywhere</em>.</>],
    sub: "No local bank. No paperwork. Your money, ready the moment you land.",
    img: heroHome, imgTop: 780, subTop: 600,
    chips: [
      { label: "TOP UP", value: "₦250,000 received", side: "l", y: 1060, icon: "check" },
      { label: "SETUP", value: "Ready in minutes", side: "r", y: 1400, icon: "zap" },
    ],
  },
  {
    badge: "TOP UP IN SECONDS",
    title: [<>Fund from <em style={{ fontStyle: "italic", color: "var(--lime)" }}>40+ currencies</em>.</>],
    sub: "Real exchange rates, live before you confirm. Arrives instantly.",
    img: shotTopup, imgTop: 780, subTop: 600,
    chips: [
      { label: "LIVE RATE", value: "£1 = ₦1,952", side: "l", y: 1060, icon: "zap" },
      { label: "ARRIVAL", value: "Instant", side: "r", y: 1400, icon: "check" },
    ],
  },
  {
    badge: "INSTANT CARDS",
    title: ["Virtual & physical", <>naira <em style={{ fontStyle: "italic", color: "var(--lime)" }}>cards</em>.</>],
    sub: "Virtual Visas for online payments and subscriptions. Physical naira cards you tap at stores across Nigeria.",
    img: shotCards, imgTop: 798, subTop: 600,
    chips: [
      { label: "VIRTUAL VISA", value: "Created in seconds", side: "l", y: 1060, icon: "card" },
      { label: "PHYSICAL", value: "Tap in stores", side: "r", y: 1400, icon: "lock" },
    ],
  },
  {
    badge: "BILLS MADE EASY",
    title: ["Every bill,", <>one <em style={{ fontStyle: "italic", color: "var(--lime)" }}>tap</em> away.</>],
    sub: "Airtime, data, power, TV and betting — all from your wallet.",
    img: shotPay, imgTop: 780, subTop: 600,
    chips: [
      { label: "AIRTIME", value: "MTN · Glo · Airtel", side: "l", y: 1060, icon: "zap" },
      { label: "SETTLED", value: "In seconds", side: "r", y: 1400, icon: "shield" },
    ],
  },
  {
    badge: "TRAVEL eSIM",
    title: [<>Land <em style={{ fontStyle: "italic", color: "var(--lime)" }}>connected</em>.</>],
    sub: "eSIM data for 190+ countries, live before you reach immigration.",
    img: shotEsims, imgTop: 720, subTop: 520,
    chips: [
      { label: "COVERAGE", value: "190+ countries", side: "l", y: 1040, icon: "globe" },
      { label: "ACTIVATION", value: "QR in seconds", side: "r", y: 1380, icon: "zap" },
    ],
  },
  {
    badge: "SAFE BY DESIGN",
    title: ["Protected at", <>every <em style={{ fontStyle: "italic", color: "var(--lime)" }}>step</em>.</>],
    sub: "Transaction PIN, biometric login, 2FA and real human support.",
    subTop: 600, cta: true,
    featureGrid: [
      { icon: "lock", label: "Transaction PIN", sub: "On every payment" },
      { icon: "shield", label: "2FA & biometrics", sub: "Face or fingerprint" },
      { icon: "chat", label: "24/7 live chat", sub: "Real humans, fast" },
      { icon: "card", label: "Freeze control", sub: "Cards in one tap" },
    ],
  },
];

const BG: CSSProperties = {
  background: `radial-gradient(700px 700px at -8% 96%, oklch(0.55 0.245 278 / 0.4), transparent 65%),
               radial-gradient(560px 560px at 104% 2%, oklch(0.93 0.193 125 / 0.12), transparent 62%),
               radial-gradient(900px 700px at 50% 40%, oklch(0.3 0.12 278 / 0.35), transparent 68%),
               oklch(0.11 0.02 278)`,
};

function Phone({ img, top }: { img: string; top: number }) {
  const width = 560;
  return (
    <div style={{ position: "absolute", top, left: (CANVAS_W - width) / 2, width, zIndex: 5 }}>
      <div
        style={{
          position: "absolute", inset: -60, zIndex: -1,
          background: "radial-gradient(closest-side, oklch(0.55 0.245 278 / 0.4), transparent 72%)",
          filter: "blur(26px)",
        }}
      />
      <div
        style={{
          borderRadius: 64, padding: 14, position: "relative",
          background: "linear-gradient(150deg, oklch(0.5 0.04 265) 0%, oklch(0.17 0.015 265) 40%, oklch(0.3 0.02 265) 70%, oklch(0.55 0.03 265) 100%)",
          border: "2.5px solid oklch(0.8 0.02 260 / 0.6)",
          boxShadow: "0 70px 130px -30px oklch(0 0 0 / 0.8), 0 0 50px oklch(0.6 0.18 278 / 0.4), inset 0 1.5px 2px oklch(0.98 0.005 260 / 0.55)",
        }}
      >
        <img src={img} alt="" style={{ display: "block", width: "100%", borderRadius: 52, border: "1px solid oklch(0.98 0.005 260 / 0.14)" }} />
      </div>
    </div>
  );
}

function GlassChip({ label, value, side, y, icon }: GlassChip) {
  return (
    <div
      style={{
        position: "absolute", top: y, left: side === "l" ? 36 : undefined, right: side === "r" ? 36 : undefined, zIndex: 20,
        display: "flex", alignItems: "center", gap: 18, padding: "22px 30px", borderRadius: 32,
        background: "oklch(0.18 0.04 278 / 0.88)", border: "1.5px solid oklch(0.98 0.005 260 / 0.2)",
        backdropFilter: "blur(16px)", boxShadow: "0 30px 60px -20px oklch(0 0 0 / 0.65)",
      }}
    >
      <span style={{ width: 60, height: 60, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--lime)", color: "oklch(0.13 0.02 278)", flexShrink: 0 }}>
        {chipIcon(icon)}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "0.14em", color: "oklch(0.98 0.005 260 / 0.5)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "oklch(0.98 0.005 260)", whiteSpace: "nowrap" }}>{value}</span>
      </span>
    </div>
  );
}

function FeatureGrid({ items }: { items: NonNullable<Slide["featureGrid"]> }) {
  return (
    <div style={{ position: "absolute", top: 780, left: 72, right: 72, zIndex: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18, padding: "56px 32px", borderRadius: 44,
            background: "oklch(0.98 0.005 260 / 0.06)", border: "1.5px solid oklch(0.98 0.005 260 / 0.14)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span style={{ width: 88, height: 88, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.93 0.193 125 / 0.16)", color: "var(--lime)" }}>
            {chipIcon(it.icon)}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "oklch(0.98 0.005 260)", lineHeight: 1.2 }}>{it.label}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 28, color: "oklch(0.98 0.005 260 / 0.55)" }}>{it.sub}</span>
        </div>
      ))}
    </div>
  );
}

function SlideView({ slide }: { slide: Slide }) {
  return (
    <div style={{ position: "relative", width: CANVAS_W, height: CANVAS_H, overflow: "hidden", ...BG }}>
      {/* centered brand */}
      <div style={{ position: "absolute", top: 84, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
        <img src={bazepayWordmark.url} alt="" style={{ height: 60, width: "auto" }} />
      </div>
      {/* centered badge */}
      <div style={{ position: "absolute", top: 220, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 28px", borderRadius: 999,
            border: "1.5px solid oklch(0.98 0.005 260 / 0.16)", background: "oklch(0.98 0.005 260 / 0.06)",
            color: "var(--lime)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "0.2em",
          }}
        >
          {slide.badge}
        </div>
      </div>
      {/* centered headline */}
      <div
        style={{
          position: "absolute", top: 320, left: 60, right: 60, zIndex: 10, textAlign: "center",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 88, lineHeight: 1.08,
          letterSpacing: "-0.03em", color: "var(--foreground)",
        }}
      >
        {slide.title.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      {/* centered subcopy */}
      <div
        style={{
          position: "absolute", top: slide.subTop, left: 120, right: 120, zIndex: 10, textAlign: "center",
          fontFamily: "var(--font-sans)", fontSize: 32, lineHeight: 1.45, color: "oklch(0.98 0.005 260 / 0.6)",
        }}
      >
        {slide.sub}
      </div>
      {slide.img && <Phone img={slide.img} top={slide.imgTop!} />}
      {slide.featureGrid && <FeatureGrid items={slide.featureGrid} />}
      {slide.cta && (
        <div style={{ position: "absolute", top: 1660, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 20, padding: "26px 52px", borderRadius: 999,
              background: "var(--lime)", color: "oklch(0.13 0.02 278)",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38,
              boxShadow: "0 0 70px oklch(0.93 0.193 125 / 0.4)",
            }}
          >
            Download BazePay free
          </div>
        </div>
      )}
      {(slide.chips ?? []).map((c) => <GlassChip key={c.value} {...c} />)}
      {/* bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 240, background: "linear-gradient(to top, oklch(0.55 0.245 278 / 0.18), transparent)", pointerEvents: "none" }} />
    </div>
  );
}

function StorePreview4() {
  return (
    <div className="min-h-screen py-10 px-6" style={{ background: "oklch(0.94 0.02 278)" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em]" style={{ color: "oklch(0.5 0.02 278)" }}>BAZEPAY · GOOGLE PLAY</p>
        <h1 className="font-display text-2xl font-bold tracking-tight mt-1" style={{ color: "oklch(0.13 0.02 278)" }}>
          Store screenshots — Design 4 · Hyper-modern
        </h1>
        <p className="text-sm mt-1" style={{ color: "oklch(0.4 0.02 278)" }}>
          Centered hero type, glass notification chips with real values, blue and lime color blooms.
        </p>
        <div className="mt-8 flex gap-6 overflow-x-auto pb-6 -mx-6 px-6">
          {SLIDES.map((s, i) => (
            <div key={i} className="shrink-0">
              <div style={{ width: PREVIEW_W, height: CANVAS_H * SCALE, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -20px oklch(0.13 0.02 278 / 0.5)" }}>
                <div style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
                  <SlideView slide={s} />
                </div>
              </div>
              <p className="text-center text-xs mt-3 font-semibold" style={{ color: "oklch(0.4 0.02 278)" }}>{i + 1}. {s.badge}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
