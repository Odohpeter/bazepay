import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode, CSSProperties } from "react";
import { ShieldCheck, LockKeyhole, MessageCircle, Zap, Globe2, CreditCard } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims.png";

export const Route = createFileRoute("/store")({
  component: StorePreview,
  head: () => ({
    meta: [
      { title: "BazePay · Play Store Screenshot Preview" },
      { name: "description", content: "Design preview for the BazePay Google Play store screenshot carousel." },
    ],
  }),
});

/* ------------------------------------------------------------------ */
/* Slide canvas is designed at 1080x1920 (Play Store spec) and scaled  */
/* down for preview. Final assets are rendered from the same markup.   */
/* ------------------------------------------------------------------ */

const CANVAS_W = 1080;
const CANVAS_H = 1920;
const PREVIEW_W = 432;
const SCALE = PREVIEW_W / CANVAS_W;

type Chip = { text: string; side: "l" | "r"; y: number; icon?: "zap" | "globe" | "card" | "lock" | "shield" | "chat" };

type Slide = {
  theme: "dark" | "indigo" | "limeGlow" | "creamGlow" | "cyanGlow" | "violet";
  badge: string;
  title: ReactNode[];
  sub: string;
  img?: string;
  imgWidth?: number;
  imgTop?: number;
  subTop: number;
  featureGrid?: { icon: "zap" | "globe" | "card" | "lock" | "shield" | "chat"; label: string; sub: string }[];
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
    theme: "indigo",
    badge: "NOW ON GOOGLE PLAY",
    title: ["Spend naira", <>from <em>anywhere</em>.</>],
    sub: "No local bank. No paperwork. Your money, ready the moment you land.",
    img: heroHome,
    imgWidth: 560,
    imgTop: 700,
    subTop: 566,
    chips: [
      { text: "Ready in minutes", side: "l", y: 960, icon: "zap" },
      { text: "Diaspora-friendly", side: "r", y: 1290, icon: "globe" },
    ],
  },
  {
    theme: "dark",
    badge: "TOP UP IN SECONDS",
    title: [<>Fund from <em>40+ currencies</em>.</>],
    sub: "Real exchange rates, live before you confirm. Arrives instantly.",
    img: shotTopup,
    imgWidth: 560,
    imgTop: 700,
    subTop: 566,
    chips: [
      { text: "£1 = ₦1,952", side: "l", y: 960, icon: "zap" },
      { text: "Arrival: instant", side: "r", y: 1290, icon: "zap" },
    ],
  },
  {
    theme: "violet",
    badge: "INSTANT CARDS",
    title: ["Virtual & physical", <>naira cards.</>],
    sub: "Virtual Visas for online payments and subscriptions. Physical naira cards you tap at stores across Nigeria.",
    img: shotCards,
    imgWidth: 545,
    imgTop: 718,
    subTop: 566,
    chips: [
      { text: "Online · Visa", side: "l", y: 960, icon: "card" },
      { text: "In-store · Physical", side: "r", y: 1290, icon: "lock" },
    ],
  },
  {
    theme: "creamGlow",
    badge: "BILLS MADE EASY",
    title: ["Every bill,", <>one tap away.</>],
    sub: "Airtime, data, power, TV and betting — all from your wallet.",
    img: shotPay,
    imgWidth: 560,
    imgTop: 700,
    subTop: 566,
    chips: [
      { text: "MTN · Glo · Airtel", side: "l", y: 960, icon: "zap" },
      { text: "Settled in seconds", side: "r", y: 1290, icon: "shield" },
    ],
  },
  {
    theme: "cyanGlow",
    badge: "TRAVEL eSIM",
    title: ["Land connected.",],
    sub: "eSIM data for 190+ countries, live before you reach immigration.",
    img: shotEsims,
    imgWidth: 580,
    imgTop: 680,
    subTop: 480,
    chips: [
      { text: "190+ countries", side: "l", y: 940, icon: "globe" },
      { text: "QR in seconds", side: "r", y: 1270, icon: "zap" },
    ],
  },
  {
    theme: "indigo",
    badge: "SAFE BY DESIGN",
    title: ["Protected at", <>every step.</>],
    sub: "Transaction PIN, biometric login, 2FA and real human support.",
    subTop: 566,
    cta: true,
    featureGrid: [
      { icon: "lock", label: "Transaction PIN", sub: "On every payment" },
      { icon: "shield", label: "2FA & biometrics", sub: "Face or fingerprint" },
      { icon: "chat", label: "24/7 live chat", sub: "Real humans, fast" },
      { icon: "card", label: "Freeze control", sub: "Cards in one tap" },
    ],
  },
];

/* ------------------------------------------------------------------ */

function themeStyle(theme: Slide["theme"]): CSSProperties {
  const dark = `oklch(0.13 0.02 278)`;
  switch (theme) {
    case "indigo":
      return {
        background: `radial-gradient(900px 620px at 85% -8%, oklch(0.45 0.22 278 / 0.55), transparent 60%),
                     radial-gradient(700px 520px at -12% 30%, oklch(0.4 0.2 278 / 0.4), transparent 60%),
                     linear-gradient(170deg, oklch(0.2 0.09 278) 0%, ${dark} 62%)`,
      };
    case "dark":
      return {
        background: `radial-gradient(820px 560px at 82% 6%, oklch(0.4 0.18 278 / 0.32), transparent 62%),
                     radial-gradient(640px 480px at -10% 62%, oklch(0.4 0.2 130 / 0.12), transparent 60%),
                     ${dark}`,
      };
    case "violet":
      return {
        background: `radial-gradient(880px 640px at 88% 12%, oklch(0.4 0.2 305 / 0.4), transparent 60%),
                     radial-gradient(680px 520px at -14% 78%, oklch(0.42 0.2 278 / 0.34), transparent 62%),
                     ${dark}`,
      };
    case "creamGlow":
      return {
        background: `radial-gradient(820px 560px at 84% 8%, oklch(0.78 0.13 80 / 0.22), transparent 60%),
                     radial-gradient(640px 480px at -12% 64%, oklch(0.55 0.245 278 / 0.3), transparent 62%),
                     ${dark}`,
      };
    case "cyanGlow":
      return {
        background: `radial-gradient(860px 580px at 86% 10%, oklch(0.72 0.16 220 / 0.3), transparent 60%),
                     radial-gradient(660px 500px at -12% 66%, oklch(0.42 0.2 278 / 0.32), transparent 62%),
                     ${dark}`,
      };
    default:
      return { background: dark };
  }
}

function BrandRow({ light = false }: { light?: boolean }) {
  return (
    <div style={{ position: "absolute", top: 76, left: 72, display: "flex", alignItems: "center", gap: 20 }}>
      <div
        style={{
          width: 64, height: 64, borderRadius: 20, background: "var(--lime)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, color: "oklch(0.13 0.02 278)",
        }}
      >
        B
      </div>
      <span
        style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36,
          letterSpacing: "-0.02em", color: light ? "oklch(0.98 0.005 260)" : "var(--foreground)",
        }}
      >
        BazePay
      </span>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 26px", borderRadius: 999,
        border: "1.5px solid oklch(0.55 0.245 278 / 0.45)", background: "oklch(0.55 0.245 278 / 0.14)",
        color: "oklch(0.85 0.12 278)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24,
        letterSpacing: "0.18em",
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--lime)", display: "inline-block" }} />
      {text}
    </div>
  );
}

function Phone({ img, width, top }: { img: string; width: number; top: number }) {
  return (
    <div style={{ position: "absolute", top, left: (CANVAS_W - width) / 2, width, zIndex: 5 }}>
      {/* soft glow behind the phone so it lifts off dark backgrounds */}
      <div
        style={{
          position: "absolute", inset: -60, zIndex: -1,
          background: "radial-gradient(closest-side, oklch(0.7 0.15 278 / 0.38), transparent 75%)",
          filter: "blur(24px)",
        }}
      />
      <div
        style={{
          borderRadius: 64, padding: 14, position: "relative",
          background: "linear-gradient(150deg, oklch(0.42 0.03 265) 0%, oklch(0.16 0.015 265) 38%, oklch(0.24 0.02 265) 68%, oklch(0.5 0.03 265) 100%)",
          border: "2.5px solid oklch(0.78 0.02 260 / 0.55)",
          boxShadow:
            "0 60px 120px -30px oklch(0 0 0 / 0.75), 0 0 44px oklch(0.6 0.18 278 / 0.35), inset 0 1.5px 2px oklch(0.98 0.005 260 / 0.5)",
        }}
      >
        <img
          src={img}
          alt=""
          style={{
            display: "block", width: "100%", borderRadius: 52,
            border: "1px solid oklch(0.98 0.005 260 / 0.12)",
          }}
        />
      </div>
    </div>
  );
}

function FloatChip({ text, side, y, icon }: Chip) {
  const left = side === "l" ? 44 : undefined;
  const right = side === "r" ? 44 : undefined;
  return (
    <div
      style={{
        position: "absolute", top: y, left, right, zIndex: 20,
        display: "flex", alignItems: "center", gap: 14, padding: "20px 30px", borderRadius: 999,
        background: "oklch(0.2 0.05 278 / 0.82)", border: "1.5px solid oklch(0.98 0.005 260 / 0.14)",
        backdropFilter: "blur(8px)", boxShadow: "0 24px 48px -18px oklch(0 0 0 / 0.55)",
      }}
    >
      <span
        style={{
          width: 52, height: 52, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center",
          background: "oklch(0.93 0.193 125 / 0.18)", color: "var(--lime)", flexShrink: 0,
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
    <div
      style={{
        position: "absolute", top: 760, left: 72, right: 72, zIndex: 10,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26,
      }}
    >
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            display: "flex", flexDirection: "column", gap: 20, padding: "64px 40px", borderRadius: 44,
            background: "oklch(0.2 0.05 278 / 0.82)", border: "1.5px solid oklch(0.98 0.005 260 / 0.12)",
          }}
        >
          <span
            style={{
              width: 88, height: 88, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center",
              background: "oklch(0.93 0.193 125 / 0.16)", color: "var(--lime)",
            }}
          >
            {chipIcon(it.icon)}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, color: "oklch(0.98 0.005 260)", lineHeight: 1.2 }}>
            {it.label}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 30, color: "oklch(0.98 0.005 260 / 0.55)" }}>
            {it.sub}
          </span>
        </div>
      ))}
    </div>
  );
}

function Slide({ slide }: { slide: Slide }) {
  const imgHeight = ((slide.imgWidth ?? 560) * 1864) / 860;
  return (
    <div
      style={{
        position: "relative", width: CANVAS_W, height: CANVAS_H, overflow: "hidden",
        ...themeStyle(slide.theme),
      }}
    >
      {/* subtle dot texture */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(oklch(0.98 0.005 260 / 0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "56px 56px",
        }}
      />
      <BrandRow />
      <div style={{ position: "absolute", top: 236, left: 72, zIndex: 10 }}>
        <Badge text={slide.badge} />
      </div>
      <div
        style={{
          position: "absolute", top: 340, left: 72, right: 72, zIndex: 10,
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 88, lineHeight: 1.06,
          letterSpacing: "-0.03em", color: "var(--foreground)",
        }}
      >
        {slide.title.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div
        style={{
          position: "absolute", top: slide.subTop, left: 72, right: 200, zIndex: 10,
          fontFamily: "var(--font-sans)", fontSize: 34, lineHeight: 1.45, color: "oklch(0.98 0.005 260 / 0.62)",
        }}
      >
        {slide.sub}
      </div>
      {slide.img && <Phone img={slide.img} width={slide.imgWidth!} top={slide.imgTop!} />}
      {slide.featureGrid && <FeatureGrid items={slide.featureGrid} />}
      {slide.cta && (
        <div
          style={{
            position: "absolute", top: 1650, left: 0, right: 0, zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex", alignItems: "center", gap: 20, padding: "26px 48px",
              borderRadius: 999, background: "var(--lime)", color: "oklch(0.13 0.02 278)",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38,
            }}
          >
            Download BazePay free
          </div>
        </div>
      )}
      {(slide.chips ?? []).map((c) => (
        <FloatChip key={c.text} {...c} />
      ))}
    </div>
  );
}

function StorePreview() {
  return (
    <div className="min-h-screen py-10 px-6" style={{ background: "oklch(0.94 0.02 278)" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em]" style={{ color: "oklch(0.5 0.02 278)" }}>
          BAZEPAY · GOOGLE PLAY
        </p>
        <h1 className="font-display text-2xl font-bold tracking-tight mt-1" style={{ color: "oklch(0.13 0.02 278)" }}>
          Store screenshots — carousel preview
        </h1>
        <p className="text-sm mt-1" style={{ color: "oklch(0.4 0.02 278)" }}>
          6 slides · 1080×1920 · rendered from real app screens. Pick a direction or ask for tweaks, then I export the final PNGs.
        </p>

        <div className="mt-8 flex gap-6 overflow-x-auto pb-6 -mx-6 px-6">
          {SLIDES.map((s, i) => (
            <div key={i} className="shrink-0">
              <div style={{ width: PREVIEW_W, height: CANVAS_H * SCALE, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px -20px oklch(0.13 0.02 278 / 0.5)" }}>
                <div style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
                  <Slide slide={s} />
                </div>
              </div>
              <p className="text-center text-xs mt-3 font-semibold" style={{ color: "oklch(0.4 0.02 278)" }}>
                {i + 1}. {s.badge}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
