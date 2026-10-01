import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Wallet, CreditCard, Receipt, Wifi, MessageCircle } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";
import wordmark from "@/assets/bazepay-wordmark.png.asset.json";

export const Route = createFileRoute("/store10")({
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Neon Lagos" },
      { name: "description", content: "Neon night-market Play Store slide design: lime neon type, ticker tape, spotlight phones." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Store10Page,
});

/* ------------------------------------------------------------------ */
/*  Design: "NEON LAGOS" — a night-market at 2am. Pitch-black canvas,   */
/*  headlines rendered as glowing lime neon tube signs, a live currency */
/*  ticker tape across the top, and the phone standing in a cone of     */
/*  light on a perspective grid floor. Every slide is a shop window.    */
/* ------------------------------------------------------------------ */

const W = 1080;
const H = 1920;

const LIME = "#CBFD5B";
const BLUE = "#5C4DFB";
const BLACK = "#060608";

type Slide = {
  kicker: string;
  neon: [ReactNode, ReactNode];
  sub: string;
  img?: string;
  chip: string;
};

const SLIDES: Slide[] = [
  {
    kicker: "For diaspora & travelers",
    neon: ["Land in Lagos.", "Spend like a local."],
    sub: "Fund with your foreign card and pay in naira — no bank queues, no paperwork.",
    img: heroHome,
    chip: "OPEN 24/7",
  },
  {
    kicker: "Fund with any card",
    neon: ["Pounds in.", "Naira out."],
    sub: "Visa, Mastercard or Amex — 40+ currencies at live rates, in your wallet instantly.",
    img: shotTopup,
    chip: "£1 = ₦1,952",
  },
  {
    kicker: "Virtual & physical cards",
    neon: ["Tap in stores.", "Pay online."],
    sub: "Physical naira cards for shops across Nigeria. Virtual Visas for subscriptions and checkout.",
    img: shotCards,
    chip: "VISA · VIRTUAL",
  },
  {
    kicker: "Bills & airtime",
    neon: ["Bills back home,", "sorted."],
    sub: "Electricity, data, airtime and TV for family — paid in seconds from anywhere.",
    img: shotPay,
    chip: "PAID IN SECONDS",
  },
  {
    kicker: "Travel eSIMs",
    neon: ["Online before", "you clear customs."],
    sub: "Data plans in 190+ countries. Scan, activate, connected.",
    img: shotEsims,
    chip: "190+ COUNTRIES",
  },
  {
    kicker: "Always open",
    neon: ["Your naira,", "ready when you land."],
    sub: "Three steps between you and spending like a local.",
    chip: "DOWNLOAD FREE",
  },
];

const TICKER = [
  "£1 = ₦1,952", "$1 = ₦1,530", "€1 = ₦1,680", "40+ CURRENCIES", "3.9% FEE", "INSTANT TOP-UP",
  "£1 = ₦1,952", "$1 = ₦1,530", "€1 = ₦1,680", "40+ CURRENCIES", "3.9% FEE", "INSTANT TOP-UP",
];

/* ------------------------------- pieces ------------------------------ */

function Ticker() {
  return (
    <div
      className="absolute left-0 right-0 overflow-hidden flex items-center"
      style={{ top: 0, height: 84, background: LIME, borderBottom: `4px solid ${BLACK}` }}
    >
      <div className="flex items-center whitespace-nowrap" style={{ gap: 64, paddingLeft: 40 }}>
        {TICKER.map((t, i) => (
          <span key={i} className="flex items-center" style={{ gap: 64, color: BLACK, fontSize: 30, fontWeight: 900, letterSpacing: "0.08em" }}>
            {t}
            <span style={{ width: 12, height: 12, borderRadius: 99, background: BLACK, display: "inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Header({ i }: { i: number }) {
  return (
    <div className="absolute flex items-center justify-between" style={{ left: 80, right: 80, top: 130 }}>
      <div style={{ padding: "14px 26px", borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
        <img src={wordmark.url} alt="BazePay" style={{ height: 40, display: "block" }} />
      </div>
      <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.6)", fontSize: 26, fontWeight: 800, letterSpacing: "0.14em" }}>
        <span style={{ color: LIME }}>{String(i + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>06</span>
      </div>
    </div>
  );
}

function NeonCopy({ s }: { s: Slide }) {
  return (
    <div className="absolute" style={{ left: 80, right: 80, top: 250 }}>
      <div
        className="inline-flex items-center gap-3 uppercase"
        style={{ color: "rgba(255,255,255,0.65)", fontSize: 25, fontWeight: 800, letterSpacing: "0.22em" }}
      >
        <span style={{ width: 26, height: 4, background: BLUE, display: "inline-block", borderRadius: 2 }} />
        {s.kicker}
      </div>
      <h2 style={{ marginTop: 24, fontSize: 84, lineHeight: 1.0, fontWeight: 900, letterSpacing: "-0.03em" }}>
        <span className="block whitespace-nowrap" style={{ color: "#fff" }}>{s.neon[0]}</span>
        <span
          className="block whitespace-nowrap"
          style={{
            color: LIME,
            textShadow: `0 0 18px rgba(203,253,91,0.85), 0 0 60px rgba(203,253,91,0.5), 0 0 140px rgba(203,253,91,0.35)`,
          }}
        >
          {s.neon[1]}
        </span>
      </h2>
      <p style={{ marginTop: 26, fontSize: 31, lineHeight: 1.35, color: "rgba(255,255,255,0.72)", maxWidth: 860, fontWeight: 500 }}>
        {s.sub}
      </p>
    </div>
  );
}

function Stage({ src, chip }: { src: string; chip: string }) {
  return (
    <>
      {/* perspective grid floor */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: 1330,
          bottom: 0,
          background:
            "repeating-linear-gradient(90deg, rgba(92,77,251,0.28) 0 2px, transparent 2px 120px), repeating-linear-gradient(0deg, rgba(92,77,251,0.28) 0 2px, transparent 2px 90px)",
          transform: "perspective(900px) rotateX(58deg)",
          transformOrigin: "top center",
          maskImage: "linear-gradient(to bottom, black, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 92%)",
        }}
      />
      {/* spotlight cone */}
      <div
        className="absolute left-1/2"
        style={{
          top: 620,
          width: 900,
          height: 1150,
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse 50% 55% at 50% 42%, rgba(203,253,91,0.20), rgba(92,77,251,0.12) 55%, transparent 75%)",
        }}
      />
      {/* phone */}
      <div className="absolute left-1/2" style={{ top: 690, width: 500, transform: "translateX(-50%)" }}>
        <div
          className="relative rounded-[74px] p-[5px]"
          style={{
            background: "linear-gradient(150deg, #f4f4fa, #9a9ab0 35%, #34343f 65%, #d6d6e2)",
            boxShadow: `0 90px 120px -40px rgba(0,0,0,0.85), 0 0 90px -10px rgba(203,253,91,0.35), 0 0 0 1px rgba(255,255,255,0.25)`,
          }}
        >
          <div className="rounded-[69px] p-[9px]" style={{ background: "#07070a" }}>
            <div className="rounded-[60px] overflow-hidden" style={{ background: "#000" }}>
              <img src={src} alt="" className="w-full block" style={{ aspectRatio: "430/932", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </div>
      {/* neon chip */}
      <div
        className="absolute flex items-center gap-3 uppercase"
        style={{
          left: 80,
          top: 1720,
          padding: "18px 34px",
          borderRadius: 999,
          border: `3px solid ${LIME}`,
          color: LIME,
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: "0.14em",
          boxShadow: "0 0 24px rgba(203,253,91,0.45), inset 0 0 18px rgba(203,253,91,0.18)",
          textShadow: "0 0 14px rgba(203,253,91,0.8)",
          background: "rgba(6,6,8,0.7)",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 99, background: LIME, boxShadow: "0 0 12px rgba(203,253,91,1)" }} />
        {chip}
      </div>
    </>
  );
}

function Finale({ chip }: { chip: string }) {
  const rows = [
    { icon: Wallet, t: "Naira wallet", d: "Fund with any foreign card" },
    { icon: CreditCard, t: "Virtual & physical cards", d: "Online and in stores across Nigeria" },
    { icon: Receipt, t: "Bills & airtime", d: "Electricity, data, TV — in seconds" },
    { icon: Wifi, t: "Travel eSIMs", d: "Data in 190+ countries" },
    { icon: MessageCircle, t: "24/7 human support", d: "Real people, fast answers" },
  ];
  return (
    <>
      <div className="absolute flex flex-col" style={{ left: 80, right: 80, top: 660, gap: 18 }}>
        {rows.map((r) => (
          <div
            key={r.t}
            className="flex items-center"
            style={{
              gap: 28,
              padding: "24px 34px",
              borderRadius: 28,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{ width: 72, height: 72, borderRadius: 20, background: BLUE, boxShadow: "0 0 30px rgba(92,77,251,0.6)" }}
            >
              <r.icon style={{ width: 34, height: 34, color: "#fff" }} strokeWidth={2.2} />
            </span>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{r.t}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{r.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="absolute flex items-center gap-5"
        style={{
          left: 80,
          top: 1620,
          padding: "28px 44px",
          borderRadius: 999,
          background: LIME,
          color: BLACK,
          fontSize: 38,
          fontWeight: 900,
          boxShadow: "0 0 60px rgba(203,253,91,0.5), 0 30px 60px -20px rgba(0,0,0,0.7)",
        }}
      >
        Get it on Google Play
        <span className="flex items-center justify-center rounded-full" style={{ width: 62, height: 62, background: BLACK, color: LIME }}>
          <ArrowRight style={{ width: 32, height: 32 }} strokeWidth={3} />
        </span>
      </div>

      <div
        className="absolute uppercase"
        style={{
          right: 80,
          top: 1648,
          padding: "16px 30px",
          borderRadius: 999,
          border: `3px solid ${LIME}`,
          color: LIME,
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: "0.14em",
          boxShadow: "0 0 24px rgba(203,253,91,0.4)",
          textShadow: "0 0 14px rgba(203,253,91,0.8)",
        }}
      >
        {chip}
      </div>
    </>
  );
}

function SlideFrame({ s, i }: { s: Slide; i: number }) {
  return (
    <div className="relative overflow-hidden" style={{ width: W, height: H, background: BLACK, fontFamily: "inherit" }}>
      {/* faint blue haze top corners */}
      <div className="absolute rounded-full" style={{ left: -300, top: 60, width: 700, height: 700, background: "radial-gradient(circle, rgba(92,77,251,0.22), transparent 65%)" }} />
      <div className="absolute rounded-full" style={{ right: -320, top: 220, width: 640, height: 640, background: "radial-gradient(circle, rgba(92,77,251,0.16), transparent 65%)" }} />
      <Ticker />
      <Header i={i} />
      <NeonCopy s={s} />
      {s.img ? <Stage src={s.img} chip={s.chip} /> : <Finale chip={s.chip} />}
    </div>
  );
}

function Store10Page() {
  return (
    <div className="min-h-screen bg-neutral-900 p-8">
      <h1 className="text-white text-2xl font-bold mb-2">BazePay — Play Store slides · Neon Lagos</h1>
      <p className="text-neutral-400 mb-6">
        6 slides · 1080×1920 each (shown at 0.4×) · night-market neon: ticker tape, glowing lime type, spotlight phones on a grid floor
      </p>
      <div className="flex gap-2 overflow-x-auto pb-4">
        {SLIDES.map((s, i) => (
          <div key={i} style={{ width: 432, height: 768, overflow: "hidden" }} className="shrink-0 slide-frame">
            <div style={{ transform: "scale(0.4)", transformOrigin: "top left" }}>
              <SlideFrame s={s} i={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
