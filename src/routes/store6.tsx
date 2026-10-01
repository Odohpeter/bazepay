import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ShieldCheck, LockKeyhole, MessageCircle, Zap, Globe2, CreditCard, ArrowRight } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";

export const Route = createFileRoute("/store6")({
  component: StorePreview6,
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Split Bold" },
      { name: "description", content: "Alternative Play Store slide design: diagonal lime/blue split, upright phone, ticket callouts, starburst badge." },
    ],
  }),
});

/* Design 6 — Split bold: a diagonal split canvas (lime over brand blue),
   an upright phone straddling the divide, vertical edge lettering, dashed
   "ticket" callouts and a starburst badge. No stickers, no marquee, no
   paper texture — a different language from designs 1–5. 1080x1920. */

const CANVAS_W = 1080;
const CANVAS_H = 1920;
const PREVIEW_W = 432;
const SCALE = PREVIEW_W / CANVAS_W;

const INK = "#14120F";
const LIME = "#CBFD5B";
const BLUE = "#5C4DFB";

type Ticket = { text: string; x: number; y: number; dark?: boolean };

type Slide = {
  kicker: string;
  title: ReactNode[];
  sub: string;
  img?: string;
  tickets?: Ticket[];
  burst?: string;
  featureGrid?: { icon: "zap" | "globe" | "card" | "lock" | "shield" | "chat"; label: string; sub: string }[];
  cta?: boolean;
};

const gridIcon = (i: string) => {
  const cls = "w-9 h-9";
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
    kicker: "NOW ON GOOGLE PLAY",
    title: ["Spend naira", "from anywhere."],
    sub: "No local bank. No paperwork. Your money, ready the moment you land.",
    img: heroHome,
    burst: "FREE",
    tickets: [
      { text: "READY IN MINUTES", x: 66, y: 1010 },
      { text: "NO LOCAL BANK NEEDED", x: 560, y: 1560, dark: true },
    ],
  },
  {
    kicker: "TOP UP IN SECONDS",
    title: ["Fund from", "40+ currencies."],
    sub: "Real exchange rates, live before you confirm. Arrives instantly.",
    img: shotTopup,
    burst: "3.9% FEE",
    tickets: [
      { text: "£1 = ₦1,952 LIVE", x: 590, y: 1010 },
      { text: "ARRIVAL: INSTANT", x: 66, y: 1560, dark: true },
    ],
  },
  {
    kicker: "INSTANT CARDS",
    title: ["Virtual & physical", "naira cards."],
    sub: "Virtual Visas for online payments and subscriptions. Physical naira cards you tap at stores across Nigeria.",
    img: shotCards,
    burst: "VISA",
    tickets: [
      { text: "ONLINE · VIRTUAL VISA", x: 66, y: 1010 },
      { text: "IN-STORE · PHYSICAL", x: 560, y: 1560, dark: true },
    ],
  },
  {
    kicker: "BILLS MADE EASY",
    title: ["Every bill,", "one tap away."],
    sub: "Airtime, data, power, TV and betting — all from your wallet.",
    img: shotPay,
    burst: "1 TAP",
    tickets: [
      { text: "MTN · GLO · AIRTEL", x: 580, y: 1010 },
      { text: "SETTLED IN SECONDS", x: 66, y: 1560, dark: true },
    ],
  },
  {
    kicker: "TRAVEL eSIM",
    title: ["Land connected."],
    sub: "eSIM data for 190+ countries, live before you reach immigration.",
    img: shotEsims,
    burst: "190+",
    tickets: [
      { text: "190+ COUNTRIES", x: 66, y: 1010 },
      { text: "QR IN SECONDS", x: 620, y: 1560, dark: true },
    ],
  },
  {
    kicker: "SAFE BY DESIGN",
    title: ["Protected at", "every step."],
    sub: "Transaction PIN, biometric login, 2FA and real human support.",
    burst: "24/7",
    cta: true,
    featureGrid: [
      { icon: "lock", label: "Transaction PIN", sub: "On every payment" },
      { icon: "shield", label: "2FA & biometrics", sub: "Face or fingerprint" },
      { icon: "chat", label: "24/7 live chat", sub: "Real humans, fast" },
      { icon: "card", label: "Freeze control", sub: "Cards in one tap" },
    ],
  },
];

function Starburst({ text }: { text: string }) {
  return (
    <div className="absolute" style={{ right: 70, top: 620, width: 220, height: 220 }}>
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.25))" }}>
        <polygon
          fill={INK}
          points={Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI) / 12;
            const r = i % 2 === 0 ? 98 : 76;
            return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
          }).join(" ")}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-black" style={{ color: LIME, fontSize: 40, transform: "rotate(-8deg)" }}>
        {text}
      </div>
    </div>
  );
}

function TicketTag({ t }: { t: Ticket }) {
  const dark = t.dark;
  return (
    <div
      className="absolute flex items-center gap-4 font-extrabold uppercase"
      style={{
        left: t.x,
        top: t.y,
        padding: "20px 34px",
        fontSize: 28,
        letterSpacing: "0.08em",
        color: dark ? LIME : INK,
        background: dark ? "rgba(20,18,15,0.92)" : "rgba(255,255,255,0.92)",
        border: `3px dashed ${dark ? LIME : INK}`,
        borderRadius: 18,
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: 999, background: dark ? LIME : BLUE }} />
      {t.text}
    </div>
  );
}

function Phone({ src }: { src: string }) {
  return (
    <div className="absolute left-1/2" style={{ top: 800, width: 540, transform: "translateX(-50%)" }}>
      <div
        className="relative rounded-[80px] p-[10px]"
        style={{
          background: "linear-gradient(160deg, #3a3a42, #0c0c10 60%)",
          boxShadow: "0 60px 100px -40px rgba(0,0,0,0.55)",
        }}
      >
        <div className="rounded-[70px] overflow-hidden" style={{ background: "#000" }}>
          <img src={src} alt="" className="w-full block" style={{ aspectRatio: "430/932", objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
}

function SlideCanvas({ s, index }: { s: Slide; index: number }) {
  return (
    <div className="relative shrink-0 overflow-hidden" style={{ width: CANVAS_W, height: CANVAS_H }}>
      {/* diagonal split: lime over blue */}
      <div className="absolute inset-0" style={{ background: BLUE }} />
      <div
        className="absolute inset-0"
        style={{ background: LIME, clipPath: "polygon(0 0, 100% 0, 100% 34%, 0 52%)" }}
      />

      {/* vertical edge lettering */}
      <div
        className="absolute font-black uppercase select-none"
        style={{
          left: -30,
          top: "50%",
          transform: "translateY(-50%) rotate(180deg)",
          writingMode: "vertical-rl",
          fontSize: 30,
          letterSpacing: "0.5em",
          color: "rgba(20,18,15,0.35)",
        }}
      >
        bazepay · bazepay · bazepay
      </div>

      {/* header */}
      <div className="absolute left-[72px] right-[72px] top-[84px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl flex items-center justify-center font-black" style={{ width: 76, height: 76, background: INK, color: LIME, fontSize: 40 }}>
            B
          </div>
          <span className="font-black tracking-tight" style={{ fontSize: 44, color: INK }}>bazepay</span>
        </div>
        <div
          className="rounded-full font-bold uppercase"
          style={{ background: INK, color: LIME, padding: "14px 30px", fontSize: 24, letterSpacing: "0.14em" }}
        >
          {s.kicker}
        </div>
      </div>

      {/* headline in the lime zone */}
      <div className="absolute left-[72px] right-[72px]" style={{ top: 240 }}>
        <h1 className="font-black" style={{ fontSize: 104, lineHeight: 0.98, letterSpacing: "-0.03em", color: INK }}>
          {s.title.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>
        <p className="font-semibold" style={{ fontSize: 36, lineHeight: 1.35, marginTop: 36, maxWidth: 820, color: "rgba(20,18,15,0.66)" }}>
          {s.sub}
        </p>
      </div>

      {s.burst && <Starburst text={s.burst} />}

      {s.img && <Phone src={s.img} />}
      {s.tickets?.map((t, i) => (
        <TicketTag key={i} t={t} />
      ))}

      {s.featureGrid && (
        <div className="absolute left-[72px] right-[72px] grid grid-cols-2" style={{ top: 880, gap: 26 }}>
          {s.featureGrid.map((f) => (
            <div
              key={f.label}
              className="rounded-[32px]"
              style={{ background: "rgba(255,255,255,0.10)", border: "2px solid rgba(255,255,255,0.28)", padding: "38px 34px", backdropFilter: "blur(6px)" }}
            >
              <div className="rounded-2xl flex items-center justify-center" style={{ width: 72, height: 72, background: LIME, color: INK }}>
                {gridIcon(f.icon)}
              </div>
              <div className="font-extrabold" style={{ fontSize: 34, marginTop: 22, color: "#fff" }}>{f.label}</div>
              <div className="font-medium" style={{ fontSize: 26, marginTop: 8, color: "rgba(255,255,255,0.65)" }}>{f.sub}</div>
            </div>
          ))}
        </div>
      )}

      {s.cta && (
        <div className="absolute left-1/2" style={{ top: 1620, transform: "translateX(-50%)" }}>
          <div
            className="flex items-center gap-4 rounded-full font-black whitespace-nowrap"
            style={{ background: LIME, color: INK, padding: "30px 60px", fontSize: 40, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4)" }}
          >
            Download BazePay free
            <ArrowRight className="w-10 h-10" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* footer: slide counter + dots */}
      <div className="absolute left-[72px] right-[72px] bottom-[56px] flex items-center justify-between">
        <span className="font-black uppercase" style={{ fontSize: 26, letterSpacing: "0.2em", color: "rgba(255,255,255,0.75)" }}>
          {String(index + 1).padStart(2, "0")} / 06
        </span>
        <div className="flex items-center gap-3">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === index ? 44 : 14,
                height: 14,
                borderRadius: 999,
                background: i === index ? LIME : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StorePreview6() {
  return (
    <div className="min-h-screen bg-neutral-900 py-10">
      <div className="text-center text-neutral-400 text-sm mb-6 font-medium">
        Design 6 — Split Bold · 1080×1920 preview
      </div>
      <div className="flex gap-6 overflow-x-auto px-10 pb-6">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{ width: PREVIEW_W, height: CANVAS_H * SCALE }}
          >
            <div style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
              <SlideCanvas s={s} index={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
