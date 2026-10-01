import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ShieldCheck, LockKeyhole, MessageCircle, Zap, Globe2, CreditCard, ArrowDownRight, Star } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";

export const Route = createFileRoute("/store5")({
  component: StorePreview5,
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Editorial Light" },
      { name: "description", content: "Alternative Play Store slide design: light editorial canvas, oversized type, tilted phone, sticker accents." },
    ],
  }),
});

/* Design 5 — Editorial light: warm cream paper canvas, oversized black
   display type, lime sticker accents, a tilted phone, and a marquee-style
   footer strip. A deliberate break from the dark-navy sets. 1080x1920. */

const CANVAS_W = 1080;
const CANVAS_H = 1920;
const PREVIEW_W = 432;
const SCALE = PREVIEW_W / CANVAS_W;

const INK = "#14120F";
const PAPER = "#F3EFE6";
const LIME = "#CBFD5B";
const BLUE = "#5C4DFB";

type Sticker = { text: string; x: number; y: number; rotate: number; color?: string };

type Slide = {
  kicker: string;
  title: ReactNode[];
  sub: string;
  img?: string;
  tilt?: number;
  stickers?: Sticker[];
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
    img: heroHome, tilt: -5,
    stickers: [
      { text: "READY IN MINUTES", x: 60, y: 1075, rotate: -6 },
      { text: "DIASPORA-FRIENDLY", x: 640, y: 1420, rotate: 4, color: BLUE },
    ],
  },
  {
    kicker: "TOP UP IN SECONDS",
    title: ["Fund from", "40+ currencies."],
    sub: "Real exchange rates, live before you confirm. Arrives instantly.",
    img: shotTopup, tilt: 4,
    stickers: [
      { text: "£1 = ₦1,952", x: 600, y: 1060, rotate: 5 },
      { text: "ARRIVAL: INSTANT", x: 70, y: 1420, rotate: -4, color: BLUE },
    ],
  },
  {
    kicker: "INSTANT CARDS",
    title: ["Virtual & physical", "naira cards."],
    sub: "Virtual Visas for online payments and subscriptions. Physical naira cards you tap at stores across Nigeria.",
    img: shotCards, tilt: -4,
    stickers: [
      { text: "ONLINE · VISA", x: 70, y: 1090, rotate: -5 },
      { text: "IN-STORE · PHYSICAL", x: 560, y: 1440, rotate: 4, color: BLUE },
    ],
  },
  {
    kicker: "BILLS MADE EASY",
    title: ["Every bill,", "one tap away."],
    sub: "Airtime, data, power, TV and betting — all from your wallet.",
    img: shotPay, tilt: 5,
    stickers: [
      { text: "MTN · GLO · AIRTEL", x: 590, y: 1075, rotate: 5 },
      { text: "SETTLED IN SECONDS", x: 60, y: 1430, rotate: -5, color: BLUE },
    ],
  },
  {
    kicker: "TRAVEL eSIM",
    title: ["Land connected."],
    sub: "eSIM data for 190+ countries, live before you reach immigration.",
    img: shotEsims, tilt: -5,
    stickers: [
      { text: "190+ COUNTRIES", x: 70, y: 1060, rotate: -6 },
      { text: "QR IN SECONDS", x: 650, y: 1400, rotate: 4, color: BLUE },
    ],
  },
  {
    kicker: "SAFE BY DESIGN",
    title: ["Protected at", "every step."],
    sub: "Transaction PIN, biometric login, 2FA and real human support.",
    cta: true,
    featureGrid: [
      { icon: "lock", label: "Transaction PIN", sub: "On every payment" },
      { icon: "shield", label: "2FA & biometrics", sub: "Face or fingerprint" },
      { icon: "chat", label: "24/7 live chat", sub: "Real humans, fast" },
      { icon: "card", label: "Freeze control", sub: "Cards in one tap" },
    ],
  },
];

function Phone({ src, tilt = -5 }: { src: string; tilt?: number }) {
  return (
    <div
      className="absolute left-1/2"
      style={{
        top: 830,
        width: 560,
        transform: `translateX(-50%) rotate(${tilt}deg)`,
      }}
    >
      {/* hard offset shadow — print/poster feel */}
      <div
        className="absolute inset-0 rounded-[84px]"
        style={{ background: INK, transform: "translate(26px, 30px)" }}
      />
      <div
        className="relative rounded-[84px] p-[10px]"
        style={{
          background: `linear-gradient(160deg, #3a3a42, #0c0c10 60%)`,
          boxShadow: "0 40px 80px -30px rgba(20,18,15,0.45)",
        }}
      >
        <div className="rounded-[74px] overflow-hidden" style={{ background: "#000" }}>
          <img src={src} alt="" className="w-full block" style={{ aspectRatio: "430/932", objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
}

function StickerTag({ s }: { s: Sticker }) {
  const bg = s.color ?? LIME;
  const fg = s.color ? "#fff" : INK;
  return (
    <div
      className="absolute flex items-center gap-3 rounded-full font-extrabold tracking-wide"
      style={{
        left: s.x,
        top: s.y,
        transform: `rotate(${s.rotate}deg)`,
        background: bg,
        color: fg,
        padding: "22px 40px",
        fontSize: 30,
        boxShadow: `8px 10px 0 ${INK}`,
        border: `4px solid ${INK}`,
      }}
    >
      <Star className="w-7 h-7" fill={fg} strokeWidth={0} />
      {s.text}
    </div>
  );
}

function SlideCanvas({ s, index }: { s: Slide; index: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: CANVAS_W, height: CANVAS_H, background: PAPER, color: INK }}
    >
      {/* subtle paper texture: dotted grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(20,18,15,0.10) 2px, transparent 2px)`,
          backgroundSize: "44px 44px",
        }}
      />
      {/* giant ghost numeral */}
      <div
        className="absolute font-black select-none"
        style={{
          right: -40,
          top: 60,
          fontSize: 560,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `3px rgba(20,18,15,0.14)`,
          letterSpacing: "-0.06em",
        }}
      >
        0{index + 1}
      </div>

      {/* header row */}
      <div className="absolute left-[72px] right-[72px] top-[84px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="rounded-2xl flex items-center justify-center font-black"
            style={{ width: 76, height: 76, background: INK, color: LIME, fontSize: 40 }}
          >
            B
          </div>
          <span className="font-black tracking-tight" style={{ fontSize: 44 }}>bazepay</span>
        </div>
        <div
          className="rounded-full font-bold uppercase"
          style={{
            border: `3px solid ${INK}`,
            padding: "14px 30px",
            fontSize: 24,
            letterSpacing: "0.14em",
          }}
        >
          {s.kicker}
        </div>
      </div>

      {/* headline block */}
      <div className="absolute left-[72px] right-[72px]" style={{ top: 250 }}>
        <h1 className="font-black" style={{ fontSize: 108, lineHeight: 0.98, letterSpacing: "-0.03em" }}>
          {s.title.map((line, i) => (
            <span key={i} className="block">
              {i === s.title.length - 1 ? (
                <span
                  style={{
                    background: LIME,
                    padding: "0 24px",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                  }}
                >
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>
        <p className="font-medium" style={{ fontSize: 38, lineHeight: 1.35, marginTop: 44, maxWidth: 840, color: "rgba(20,18,15,0.72)" }}>
          {s.sub}
        </p>
      </div>

      {/* phone or feature grid */}
      {s.img && <Phone src={s.img} tilt={s.tilt} />}
      {s.stickers?.map((st, i) => (
        <StickerTag key={i} s={st} />
      ))}

      {s.featureGrid && (
        <div className="absolute left-[72px] right-[72px] grid grid-cols-2" style={{ top: 900, gap: 28 }}>
          {s.featureGrid.map((f) => (
            <div
              key={f.label}
              className="rounded-[36px]"
              style={{ background: "#fff", border: `4px solid ${INK}`, boxShadow: `10px 12px 0 ${INK}`, padding: "40px 36px" }}
            >
              <div
                className="rounded-2xl flex items-center justify-center"
                style={{ width: 72, height: 72, background: LIME, border: `3px solid ${INK}`, color: INK }}
              >
                {gridIcon(f.icon)}
              </div>
              <div className="font-extrabold" style={{ fontSize: 36, marginTop: 24 }}>{f.label}</div>
              <div className="font-medium" style={{ fontSize: 27, marginTop: 8, color: "rgba(20,18,15,0.6)" }}>{f.sub}</div>
            </div>
          ))}
        </div>
      )}

      {s.cta && (
        <div className="absolute left-1/2" style={{ top: 1560, transform: "translateX(-50%)" }}>
          <div
            className="flex items-center gap-4 rounded-full font-black whitespace-nowrap"
            style={{ background: INK, color: LIME, padding: "30px 64px", fontSize: 40, boxShadow: `10px 12px 0 ${BLUE}` }}
          >
            Download BazePay free
            <ArrowDownRight className="w-10 h-10" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* marquee footer strip */}
      <div
        className="absolute left-0 right-0 bottom-0 flex items-center overflow-hidden"
        style={{ height: 96, background: INK, color: PAPER }}
      >
        <div className="flex items-center gap-10 whitespace-nowrap font-bold uppercase" style={{ fontSize: 28, letterSpacing: "0.18em", paddingLeft: 40 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>BazePay</span>
              <span style={{ color: LIME }}>✦</span>
              <span>Spend naira anywhere</span>
              <span style={{ color: LIME }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StorePreview5() {
  return (
    <div className="min-h-screen bg-neutral-900 py-10">
      <div className="text-center text-neutral-400 text-sm mb-6 font-medium">
        Design 5 — Editorial Light · 1080×1920 preview
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
