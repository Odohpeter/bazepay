import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode, CSSProperties } from "react";
import { ShieldCheck, LockKeyhole, MessageCircle, Zap, Globe2, CreditCard } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import bazepayWordmark from "@/assets/bazepay-wordmark.png.asset.json";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";

export const Route = createFileRoute("/store3")({
  component: StorePreview3,
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Dynamic Depth" },
      { name: "description", content: "Alternative Play Store slide design: editorial layout, phone rising from the bottom edge, radial glows." },
    ],
  }),
});

/* Design 3 — Dynamic depth: editorial type block up top, phone rises from
   the bottom edge (clipped), radial glow behind, lime italic accents. */

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
    title: ["Spend naira", <>from <em className="not-italic" style={{ fontStyle: "italic", color: "var(--lime)" }}>anywhere</em>.</>],
    sub: "No local bank. No paperwork. Your money, ready the moment you land.",
    img: heroHome, imgTop: 860, subTop: 620,
    chips: [
      { text: "Ready in minutes", side: "l", y: 1080, icon: "zap" },
      { text: "Diaspora-friendly", side: "r", y: 1420, icon: "globe" },
    ],
  },
  {
    badge: "TOP UP IN SECONDS",
    title: [<>Fund from <em style={{ fontStyle: "italic", color: "var(--lime)" }}>40+ currencies</em>.</>],
    sub: "Real exchange rates, live before you confirm. Arrives instantly.",
    img: shotTopup, imgTop: 860, subTop: 620,
    chips: [
      { text: "£1 = ₦1,952", side: "l", y: 1080, icon: "zap" },
      { text: "Arrival: instant", side: "r", y: 1420, icon: "zap" },
    ],
  },
  {
    badge: "INSTANT CARDS",
    title: ["Virtual & physical", <>naira <em style={{ fontStyle: "italic", color: "var(--lime)" }}>cards</em>.</>],
    sub: "Virtual Visas for online payments and subscriptions. Physical naira cards you tap at stores across Nigeria.",
    img: shotCards, imgTop: 878, subTop: 620,
    chips: [
      { text: "Online · Visa", side: "l", y: 1080, icon: "card" },
      { text: "In-store · Physical", side: "r", y: 1420, icon: "lock" },
    ],
  },
  {
    badge: "BILLS MADE EASY",
    title: ["Every bill,", <>one <em style={{ fontStyle: "italic", color: "var(--lime)" }}>tap</em> away.</>],
    sub: "Airtime, data, power, TV and betting — all from your wallet.",
    img: shotPay, imgTop: 860, subTop: 620,
    chips: [
      { text: "MTN · Glo · Airtel", side: "l", y: 1080, icon: "zap" },
      { text: "Settled in seconds", side: "r", y: 1420, icon: "shield" },
    ],
  },
  {
    badge: "TRAVEL eSIM",
    title: [<>Land <em style={{ fontStyle: "italic", color: "var(--lime)" }}>connected</em>.</>],
    sub: "eSIM data for 190+ countries, live before you reach immigration.",
    img: shotEsims, imgTop: 800, subTop: 540,
    chips: [
      { text: "190+ countries", side: "l", y: 1060, icon: "globe" },
      { text: "QR in seconds", side: "r", y: 1400, icon: "zap" },
    ],
  },
  {
    badge: "SAFE BY DESIGN",
    title: ["Protected at", <>every <em style={{ fontStyle: "italic", color: "var(--lime)" }}>step</em>.</>],
    sub: "Transaction PIN, biometric login, 2FA and real human support.",
    subTop: 620, cta: true,
    featureGrid: [
      { icon: "lock", label: "Transaction PIN", sub: "On every payment" },
      { icon: "shield", label: "2FA & biometrics", sub: "Face or fingerprint" },
      { icon: "chat", label: "24/7 live chat", sub: "Real humans, fast" },
      { icon: "card", label: "Freeze control", sub: "Cards in one tap" },
    ],
  },
];

const BG: CSSProperties = {
  background: `radial-gradient(circle at 50% 72%, oklch(0.55 0.245 278 / 0.28), transparent 62%),
               radial-gradient(circle at 18% 12%, oklch(0.4 0.2 278 / 0.3), transparent 55%),
               oklch(0.12 0.025 278)`,
};

function Phone({ img, top }: { img: string; top: number }) {
  const width = 600;
  return (
    <div style={{ position: "absolute", top, left: (CANVAS_W - width) / 2, width, zIndex: 5 }}>
      <div
        style={{
          position: "absolute", inset: -70, zIndex: -1,
          background: "radial-gradient(closest-side, oklch(0.6 0.2 278 / 0.45), transparent 72%)",
          filter: "blur(28px)",
        }}
      />
      {/* frame with rounded top only — bottom runs off the canvas edge */}
      <div
        style={{
          borderRadius: "68px 68px 0 0", padding: "14px 14px 0", position: "relative",
          background: "linear-gradient(150deg, oklch(0.48 0.04 265) 0%, oklch(0.17 0.015 265) 40%, oklch(0.28 0.02 265) 70%, oklch(0.52 0.03 265) 100%)",
          border: "2.5px solid oklch(0.8 0.02 260 / 0.55)", borderBottom: "none",
          boxShadow: "0 60px 120px -30px oklch(0 0 0 / 0.75), 0 0 50px oklch(0.6 0.18 278 / 0.4), inset 0 1.5px 2px oklch(0.98 0.005 260 / 0.5)",
        }}
      >
        <img src={img} alt="" style={{ display: "block", width: "100%", borderRadius: "56px 56px 0 0", border: "1px solid oklch(0.98 0.005 260 / 0.12)", borderBottom: "none" }} />
      </div>
    </div>
  );
}

function FloatChip({ text, side, y, icon }: Chip) {
  return (
    <div
      style={{
        position: "absolute", top: y, left: side === "l" ? 44 : undefined, right: side === "r" ? 44 : undefined, zIndex: 20,
        display: "flex", alignItems: "center", gap: 14, padding: "20px 30px", borderRadius: 999,
        background: "oklch(0.98 0.005 260 / 0.1)", border: "1.5px solid oklch(0.98 0.005 260 / 0.18)",
        backdropFilter: "blur(12px)", boxShadow: "0 24px 48px -18px oklch(0 0 0 / 0.6)",
      }}
    >
      <span style={{ width: 52, height: 52, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.93 0.193 125 / 0.18)", color: "var(--lime)", flexShrink: 0 }}>
        {chipIcon(icon)}
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "oklch(0.98 0.005 260)", whiteSpace: "nowrap" }}>{text}</span>
    </div>
  );
}

function FeatureGrid({ items }: { items: NonNullable<Slide["featureGrid"]> }) {
  return (
    <div style={{ position: "absolute", top: 800, left: 72, right: 72, zIndex: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            display: "flex", flexDirection: "column", gap: 20, padding: "56px 40px", borderRadius: 40,
            background: "oklch(0.98 0.005 260 / 0.05)", border: "1.5px solid oklch(0.98 0.005 260 / 0.12)",
          }}
        >
          <span style={{ width: 88, height: 88, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.55 0.245 278 / 0.25)", color: "oklch(0.85 0.12 278)" }}>
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
      {/* brand row: wordmark left, badge right */}
      <img src={bazepayWordmark.url} alt="" style={{ position: "absolute", top: 84, left: 72, height: 60, width: "auto", zIndex: 10 }} />
      <div style={{ position: "absolute", top: 92, right: 72, zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 26px", borderRadius: 999,
            border: "1.5px solid oklch(0.93 0.193 125 / 0.35)", background: "oklch(0.93 0.193 125 / 0.08)",
            color: "var(--lime)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "0.16em",
          }}
        >
          {slide.badge}
        </div>
      </div>
      <div
        style={{
          position: "absolute", top: 260, left: 72, right: 72, zIndex: 10,
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 96, lineHeight: 1.04,
          letterSpacing: "-0.03em", color: "var(--foreground)",
        }}
      >
        {slide.title.map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <div
        style={{
          position: "absolute", top: slide.subTop, left: 72, right: 220, zIndex: 10,
          fontFamily: "var(--font-sans)", fontSize: 34, lineHeight: 1.45, color: "oklch(0.98 0.005 260 / 0.6)",
        }}
      >
        {slide.sub}
      </div>
      {slide.img && <Phone img={slide.img} top={slide.imgTop!} />}
      {slide.featureGrid && <FeatureGrid items={slide.featureGrid} />}
      {slide.cta && (
        <div style={{ position: "absolute", top: 1660, left: 72, right: 72, zIndex: 10 }}>
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 20, padding: "28px 48px",
              borderRadius: 32, background: "var(--lime)", color: "oklch(0.13 0.02 278)",
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40, letterSpacing: "0.02em",
              boxShadow: "0 0 60px oklch(0.93 0.193 125 / 0.3)",
            }}
          >
            DOWNLOAD BAZEPAY FREE
          </div>
        </div>
      )}
      {(slide.chips ?? []).map((c) => <FloatChip key={c.text} {...c} />)}
    </div>
  );
}

function StorePreview3() {
  return (
    <div className="min-h-screen py-10 px-6" style={{ background: "oklch(0.94 0.02 278)" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em]" style={{ color: "oklch(0.5 0.02 278)" }}>BAZEPAY · GOOGLE PLAY</p>
        <h1 className="font-display text-2xl font-bold tracking-tight mt-1" style={{ color: "oklch(0.13 0.02 278)" }}>
          Store screenshots — Design 3 · Dynamic depth
        </h1>
        <p className="text-sm mt-1" style={{ color: "oklch(0.4 0.02 278)" }}>
          Editorial layout — phone rises from the bottom edge, radial glows, lime italic accents.
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
