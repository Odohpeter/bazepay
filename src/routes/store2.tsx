import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode, CSSProperties } from "react";
import { ShieldCheck, LockKeyhole, MessageCircle, Zap, Globe2, CreditCard } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import bazepayWordmark from "@/assets/bazepay-wordmark.png.asset.json";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";

export const Route = createFileRoute("/store2")({
  component: StorePreview2,
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Geometric Depth" },
      { name: "description", content: "Alternative Play Store slide design: luminous gradient canvas, larger glowing phone, glassy chips." },
    ],
  }),
});

/* Design 2 — Geometric depth: big luminous glow behind a larger phone,
   glassy floating chips, layered light. 1080x1920 canvas scaled for preview. */

const CANVAS_W = 1080;
const CANVAS_H = 1920;
const PREVIEW_W = 432;
const SCALE = PREVIEW_W / CANVAS_W;

type Chip = { text: string; side: "l" | "r"; y: number; icon?: "zap" | "globe" | "card" | "lock" | "shield" | "chat" };

type Slide = {
  badge: string;
  title: ReactNode[];
  sub: string;
  img?: string;
  imgTop?: number;
  subTop: number;
  featureGrid?: { icon: Chip["icon"]; label: string; sub: string }[];
  cta?: boolean;
  chips?: Chip[];
};

const chipIcon = (i?: Chip["icon"]) => {
  const cls = "w-7 h-7";
  switch (i) {
    case "zap": return <Zap className={cls} strokeWidth={2.4} />;
    case "globe": return <Globe2 className={cls} strokeWidth={2.4} />;
    case "card": return <CreditCard className={cls} strokeWidth={2.4} />;
    case "lock": return <LockKeyhole className={cls} strokeWidth={2.4} />;
    case "shield": return <ShieldCheck className={cls} strokeWidth={2.4} />;
    case "chat": return <MessageCircle className={cls} strokeWidth={2.4} />;
    default: return null;
  }
};

const SLIDES: Slide[] = [
  {
    badge: "NOW ON GOOGLE PLAY",
    title: ["Spend naira", <>from <em>anywhere</em>.</>],
    sub: "No local bank. No paperwork. Your money, ready the moment you land.",
    img: heroHome, imgTop: 720, subTop: 566,
    chips: [
      { text: "Ready in minutes", side: "l", y: 1000, icon: "zap" },
      { text: "Diaspora-friendly", side: "r", y: 1330, icon: "globe" },
    ],
  },
  {
    badge: "TOP UP IN SECONDS",
    title: [<>Fund from <em>40+ currencies</em>.</>],
    sub: "Real exchange rates, live before you confirm. Arrives instantly.",
    img: shotTopup, imgTop: 720, subTop: 566,
    chips: [
      { text: "£1 = ₦1,952", side: "l", y: 1000, icon: "zap" },
      { text: "Arrival: instant", side: "r", y: 1330, icon: "zap" },
    ],
  },
  {
    badge: "INSTANT CARDS",
    title: ["Virtual & physical", <>naira cards.</>],
    sub: "Virtual Visas for online payments and subscriptions. Physical naira cards you tap at stores across Nigeria.",
    img: shotCards, imgTop: 738, subTop: 566,
    chips: [
      { text: "Online · Visa", side: "l", y: 1000, icon: "card" },
      { text: "In-store · Physical", side: "r", y: 1330, icon: "lock" },
    ],
  },
  {
    badge: "BILLS MADE EASY",
    title: ["Every bill,", <>one tap away.</>],
    sub: "Airtime, data, power, TV and betting — all from your wallet.",
    img: shotPay, imgTop: 720, subTop: 566,
    chips: [
      { text: "MTN · Glo · Airtel", side: "l", y: 1000, icon: "zap" },
      { text: "Settled in seconds", side: "r", y: 1330, icon: "shield" },
    ],
  },
  {
    badge: "TRAVEL eSIM",
    title: ["Land connected."],
    sub: "eSIM data for 190+ countries, live before you reach immigration.",
    img: shotEsims, imgTop: 660, subTop: 480,
    chips: [
      { text: "190+ countries", side: "l", y: 980, icon: "globe" },
      { text: "QR in seconds", side: "r", y: 1310, icon: "zap" },
    ],
  },
  {
    badge: "SAFE BY DESIGN",
    title: ["Protected at", <>every step.</>],
    sub: "Transaction PIN, biometric login, 2FA and real human support.",
    subTop: 566, cta: true,
    featureGrid: [
      { icon: "lock", label: "Transaction PIN", sub: "On every payment" },
      { icon: "shield", label: "2FA & biometrics", sub: "Face or fingerprint" },
      { icon: "chat", label: "24/7 live chat", sub: "Real humans, fast" },
      { icon: "card", label: "Freeze control", sub: "Cards in one tap" },
    ],
  },
];

const BG: CSSProperties = {
  background: `radial-gradient(1100px 900px at 50% 62%, oklch(0.55 0.245 278 / 0.32), transparent 62%),
               radial-gradient(700px 520px at 90% 4%, oklch(0.45 0.22 278 / 0.4), transparent 60%),
               radial-gradient(760px 560px at 8% 96%, oklch(0.93 0.193 125 / 0.1), transparent 62%),
               linear-gradient(175deg, oklch(0.19 0.08 278) 0%, oklch(0.11 0.02 278) 70%)`,
};

function Phone({ img, top }: { img: string; top: number }) {
  const width = 620;
  return (
    <div style={{ position: "absolute", top, left: (CANVAS_W - width) / 2, width, zIndex: 5 }}>
      <div
        style={{
          position: "absolute", inset: -90, zIndex: -1,
          background: "radial-gradient(closest-side, oklch(0.62 0.2 278 / 0.55), transparent 72%)",
          filter: "blur(30px)",
        }}
      />
      <div
        style={{
          borderRadius: 68, padding: 14, position: "relative",
          background: "linear-gradient(150deg, oklch(0.5 0.04 265) 0%, oklch(0.17 0.015 265) 40%, oklch(0.3 0.02 265) 70%, oklch(0.55 0.03 265) 100%)",
          border: "2.5px solid oklch(0.8 0.02 260 / 0.6)",
          boxShadow:
            "0 70px 130px -30px oklch(0 0 0 / 0.8), 0 0 60px oklch(0.6 0.18 278 / 0.5), inset 0 1.5px 2px oklch(0.98 0.005 260 / 0.55)",
        }}
      >
        <img src={img} alt="" style={{ display: "block", width: "100%", borderRadius: 56, border: "1px solid oklch(0.98 0.005 260 / 0.14)" }} />
      </div>
    </div>
  );
}

function FloatChip({ text, side, y, icon }: Chip) {
  return (
    <div
      style={{
        position: "absolute", top: y, left: side === "l" ? 40 : undefined, right: side === "r" ? 40 : undefined, zIndex: 20,
        display: "flex", alignItems: "center", gap: 14, padding: "20px 30px", borderRadius: 28,
        background: "oklch(0.98 0.005 260 / 0.08)", border: "1.5px solid oklch(0.98 0.005 260 / 0.18)",
        backdropFilter: "blur(14px)", boxShadow: "0 24px 48px -18px oklch(0 0 0 / 0.6)",
      }}
    >
      <span
        style={{
          width: 52, height: 52, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center",
          background: "oklch(0.93 0.193 125 / 0.2)", color: "var(--lime)", flexShrink: 0,
        }}
      >
        {chipIcon(icon)}
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "oklch(0.98 0.005 260)", whiteSpace: "nowrap" }}>
        {text}
      </span>
    </div>
  );
}

function FeatureGrid({ items }: { items: NonNullable<Slide["featureGrid"]> }) {
  return (
    <div style={{ position: "absolute", top: 760, left: 72, right: 72, zIndex: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            display: "flex", flexDirection: "column", gap: 20, padding: "64px 40px", borderRadius: 44,
            background: "oklch(0.98 0.005 260 / 0.06)", border: "1.5px solid oklch(0.98 0.005 260 / 0.14)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span style={{ width: 88, height: 88, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.93 0.193 125 / 0.16)", color: "var(--lime)" }}>
            {chipIcon(it.icon)}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "oklch(0.98 0.005 260)", lineHeight: 1.2 }}>{it.label}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 30, color: "oklch(0.98 0.005 260 / 0.55)" }}>{it.sub}</span>
        </div>
      ))}
    </div>
  );
}

function SlideView({ slide }: { slide: Slide }) {
  return (
    <div style={{ position: "relative", width: CANVAS_W, height: CANVAS_H, overflow: "hidden", ...BG }}>
      {/* geometric ring accents */}
      <div style={{ position: "absolute", top: -180, right: -180, width: 480, height: 480, borderRadius: 999, border: "2px solid oklch(0.55 0.245 278 / 0.25)" }} />
      <div style={{ position: "absolute", top: -100, right: -100, width: 320, height: 320, borderRadius: 999, border: "2px solid oklch(0.93 0.193 125 / 0.16)" }} />
      <img src={bazepayWordmark.url} alt="" style={{ position: "absolute", top: 76, left: 72, height: 64, width: "auto", zIndex: 10 }} />
      <div style={{ position: "absolute", top: 236, left: 72, zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 26px", borderRadius: 999,
            border: "1.5px solid oklch(0.93 0.193 125 / 0.4)", background: "oklch(0.93 0.193 125 / 0.1)",
            color: "var(--lime)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, letterSpacing: "0.18em",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--lime)", display: "inline-block" }} />
          {slide.badge}
        </div>
      </div>
      <div
        style={{
          position: "absolute", top: 340, left: 72, right: 72, zIndex: 10,
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 88, lineHeight: 1.06,
          letterSpacing: "-0.03em", color: "var(--foreground)",
        }}
      >
        {slide.title.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <div
        style={{
          position: "absolute", top: slide.subTop, left: 72, right: 200, zIndex: 10,
          fontFamily: "var(--font-sans)", fontSize: 34, lineHeight: 1.45, color: "oklch(0.98 0.005 260 / 0.62)",
        }}
      >
        {slide.sub}
      </div>
      {slide.img && <Phone img={slide.img} top={slide.imgTop!} />}
      {slide.featureGrid && <FeatureGrid items={slide.featureGrid} />}
      {slide.cta && (
        <div style={{ position: "absolute", top: 1650, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 20, padding: "26px 48px", borderRadius: 999,
              background: "var(--lime)", color: "oklch(0.13 0.02 278)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38,
              boxShadow: "0 0 60px oklch(0.93 0.193 125 / 0.35)",
            }}
          >
            Download BazePay free
          </div>
        </div>
      )}
      {(slide.chips ?? []).map((c) => <FloatChip key={c.text} {...c} />)}
      {/* bottom lime accent fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: "linear-gradient(to top, oklch(0.93 0.193 125 / 0.08), transparent)", pointerEvents: "none" }} />
    </div>
  );
}

function StorePreview2() {
  return (
    <div className="min-h-screen py-10 px-6" style={{ background: "oklch(0.94 0.02 278)" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em]" style={{ color: "oklch(0.5 0.02 278)" }}>BAZEPAY · GOOGLE PLAY</p>
        <h1 className="font-display text-2xl font-bold tracking-tight mt-1" style={{ color: "oklch(0.13 0.02 278)" }}>
          Store screenshots — Design 2 · Geometric depth
        </h1>
        <p className="text-sm mt-1" style={{ color: "oklch(0.4 0.02 278)" }}>
          Luminous gradient canvas, larger glowing phone, glassy floating chips.
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
