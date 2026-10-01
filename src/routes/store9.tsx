import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";
import wordmark from "@/assets/bazepay-wordmark.png.asset.json";

export const Route = createFileRoute("/store9")({
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Panorama" },
      { name: "description", content: "Panoramic Play Store slide design: one continuous canvas flowing across six slides." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Store9Page,
});

/* ------------------------------------------------------------------ */
/*  Design: "PANORAMA" — the six slides are windows onto ONE continuous */
/*  canvas. A lime ribbon flows across every slide, currency coins sit  */
/*  on the seams (£ → $ → € → ₦), and the background deepens from brand */
/*  blue to night ink as you swipe — the journey from your money to     */
/*  naira. Each slide is still a complete 1080×1920 frame.              */
/* ------------------------------------------------------------------ */

const W = 1080;
const H = 1920;
const COUNT = 6;
const PANO_W = W * COUNT;

const LIME = "#CBFD5B";
const BLUE = "#5C4DFB";
const INK = "oklch(0.14 0.03 280)";

type Slide = {
  kicker: string;
  title: [ReactNode, ReactNode];
  sub: string;
  img?: string;
  tilt?: number;
};

const SLIDES: Slide[] = [
  {
    kicker: "For diaspora & travelers",
    title: ["Land in Lagos.", "Spend like a local."],
    sub: "Fund with your foreign card and pay in naira — no bank queues, no paperwork.",
    img: heroHome,
    tilt: -5,
  },
  {
    kicker: "Fund with any card",
    title: ["Pounds in.", "Naira out."],
    sub: "Visa, Mastercard or Amex — 40+ currencies at live rates, in your wallet instantly.",
    img: shotTopup,
    tilt: 5,
  },
  {
    kicker: "Virtual & physical cards",
    title: ["Tap in stores.", "Pay online."],
    sub: "Physical naira cards for shops across Nigeria. Virtual Visas for subscriptions and checkout.",
    img: shotCards,
    tilt: -5,
  },
  {
    kicker: "Bills & airtime",
    title: ["Bills back home,", "sorted."],
    sub: "Electricity, data, airtime and TV for family — paid in seconds from anywhere.",
    img: shotPay,
    tilt: 5,
  },
  {
    kicker: "Travel eSIMs",
    title: ["Online before", "you clear customs."],
    sub: "Data plans in 190+ countries. Scan, activate, connected.",
    img: shotEsims,
    tilt: -5,
  },
  {
    kicker: "Ready for take-off",
    title: ["Your naira,", "ready when you land."],
    sub: "Three steps between you and spending like a local.",
  },
];

/* Coins sit on slide seams so they continue from one slide to the next. */
const COINS = [
  { x: 1080, y: 1010, sym: "£", size: 190, rot: -14 },
  { x: 2160, y: 1470, sym: "$", size: 170, rot: 10 },
  { x: 3240, y: 860, sym: "€", size: 180, rot: -8 },
  { x: 4320, y: 1180, sym: "₦", size: 200, rot: 12 },
  { x: 5400, y: 1560, sym: "₦", size: 175, rot: -10 },
  { x: 6050, y: 1250, sym: "₦", size: 260, rot: 8 },
];

const RIBBON =
  "M -200 1520 C 400 1760, 700 820, 1300 960 S 2000 1640, 2700 1380 S 3500 720, 4100 920 S 4900 1700, 5500 1460 S 6300 980, 6700 1080";

/* ---------------------------- shared world ---------------------------- */

function Panorama() {
  return (
    <div className="absolute top-0 left-0" style={{ width: PANO_W, height: H }}>
      {/* sky: blue → deep indigo → night ink */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${BLUE} 0%, oklch(0.42 0.22 280) 30%, oklch(0.27 0.13 280) 58%, ${INK} 84%, ${INK} 100%)`,
        }}
      />
      {/* soft light pools */}
      {[
        { x: 300, y: 1300, r: 900, c: "rgba(203,253,91,0.16)" },
        { x: 2400, y: 600, r: 1000, c: "rgba(255,255,255,0.10)" },
        { x: 4200, y: 1500, r: 1100, c: "rgba(92,77,251,0.45)" },
        { x: 6000, y: 1300, r: 1000, c: "rgba(203,253,91,0.14)" },
      ].map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: o.x - o.r / 2,
            top: o.y - o.r / 2,
            width: o.r,
            height: o.r,
            background: `radial-gradient(circle, ${o.c}, transparent 65%)`,
          }}
        />
      ))}

      {/* giant outlined naira glyphs straddling seams */}
      <div
        className="absolute font-black leading-none select-none"
        style={{ left: 640, top: 520, fontSize: 1500, color: "transparent", WebkitTextStroke: "4px rgba(255,255,255,0.13)" }}
      >
        ₦
      </div>
      <div
        className="absolute font-black leading-none select-none"
        style={{ left: 3900, top: 640, fontSize: 1400, color: "transparent", WebkitTextStroke: "4px rgba(203,253,91,0.12)" }}
      >
        ₦
      </div>

      {/* the ribbon */}
      <svg className="absolute inset-0" width={PANO_W} height={H} viewBox={`0 0 ${PANO_W} ${H}`}>
        <defs>
          <linearGradient id="rib" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={LIME} stopOpacity="0.95" />
            <stop offset="0.5" stopColor={LIME} stopOpacity="0.8" />
            <stop offset="1" stopColor={LIME} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d={RIBBON} fill="none" stroke="url(#rib)" strokeWidth={130} strokeLinecap="round" opacity={0.9} />
        <path d={RIBBON} fill="none" stroke={INK} strokeWidth={4} strokeDasharray="22 26" opacity={0.55} />
      </svg>

      {/* coins on the seams */}
      {COINS.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full flex items-center justify-center font-black"
          style={{
            left: c.x - c.size / 2,
            top: c.y - c.size / 2,
            width: c.size,
            height: c.size,
            transform: `rotate(${c.rot}deg)`,
            background: c.sym === "₦"
              ? `radial-gradient(circle at 32% 28%, #f2ffd0, ${LIME} 45%, oklch(0.72 0.19 128) 100%)`
              : "radial-gradient(circle at 32% 28%, #ffffff, #dcd8ff 45%, #8f84ff 100%)",
            boxShadow: "0 30px 50px -15px rgba(0,0,0,0.55), inset 0 -10px 0 rgba(0,0,0,0.12), inset 0 0 0 8px rgba(255,255,255,0.35)",
            color: INK,
            fontSize: c.size * 0.5,
          }}
        >
          {c.sym}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- pieces ------------------------------- */

function Phone({ src, tilt = 0 }: { src: string; tilt?: number }) {
  return (
    <div
      className="absolute left-1/2"
      style={{ top: 650, width: 540, transform: `translateX(-50%) rotate(${tilt}deg)` }}
    >
      <div
        className="relative rounded-[78px] p-[5px]"
        style={{
          background: "linear-gradient(150deg, #f4f4fa, #9a9ab0 35%, #34343f 65%, #d6d6e2)",
          boxShadow: "0 80px 120px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.25)",
        }}
      >
        <div className="rounded-[73px] p-[9px]" style={{ background: "#07070a" }}>
          <div className="rounded-[64px] overflow-hidden" style={{ background: "#000" }}>
            <img src={src} alt="" className="w-full block" style={{ aspectRatio: "430/932", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ i }: { i: number }) {
  return (
    <div className="absolute flex items-center justify-between" style={{ left: 80, right: 80, top: 96 }}>
      <img src={wordmark.url} alt="BazePay" style={{ height: 52, display: "block" }} />
      <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.75)", fontSize: 26, fontWeight: 700, letterSpacing: "0.12em" }}>
        <span style={{ color: LIME }}>{String(i + 1).padStart(2, "0")}</span>
        <span style={{ width: 60, height: 3, background: "rgba(255,255,255,0.35)", display: "inline-block" }} />
        <span>06</span>
      </div>
    </div>
  );
}

function Copy({ s }: { s: Slide }) {
  return (
    <div className="absolute" style={{ left: 80, right: 80, top: 220 }}>
      <div
        className="inline-flex items-center gap-3 uppercase"
        style={{ color: LIME, fontSize: 26, fontWeight: 800, letterSpacing: "0.18em" }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 99, background: LIME, display: "inline-block" }} />
        {s.kicker}
      </div>
      <h2
        style={{
          marginTop: 22,
          fontSize: 88,
          lineHeight: 0.98,
          fontWeight: 900,
          letterSpacing: "-0.035em",
          color: "#fff",
        }}
      >
        <span className="block whitespace-nowrap">{s.title[0]}</span>
        <span className="block whitespace-nowrap" style={{ color: LIME }}>{s.title[1]}</span>
      </h2>
      <p style={{ marginTop: 26, fontSize: 32, lineHeight: 1.35, color: "rgba(255,255,255,0.78)", maxWidth: 860, fontWeight: 500 }}>
        {s.sub}
      </p>
    </div>
  );
}

function Finale() {
  const steps = [
    { n: "01", t: "Download BazePay", d: "Free on Google Play" },
    { n: "02", t: "Fund with your foreign card", d: "40+ currencies, live rates" },
    { n: "03", t: "Spend naira everywhere", d: "Cards, bills, transfers, eSIMs" },
  ];
  return (
    <>
      <div className="absolute flex flex-col" style={{ left: 80, right: 80, top: 640, gap: 26 }}>
        {steps.map((st, k) => (
          <div
            key={st.n}
            className="flex items-center"
            style={{
              gap: 34,
              padding: "34px 40px",
              borderRadius: 40,
              background: k === 2 ? LIME : "rgba(255,255,255,0.08)",
              border: k === 2 ? "none" : "2px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(12px)",
              marginLeft: k * 40,
              marginRight: (2 - k) * 40,
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: "-0.04em", color: k === 2 ? INK : LIME, width: 100 }}>{st.n}</span>
            <div>
              <div style={{ fontSize: 40, fontWeight: 800, color: k === 2 ? INK : "#fff", letterSpacing: "-0.02em" }}>{st.t}</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: k === 2 ? "rgba(20,18,40,0.7)" : "rgba(255,255,255,0.65)", marginTop: 4 }}>{st.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="absolute flex items-center gap-5"
        style={{
          left: 80,
          top: 1600,
          padding: "30px 46px",
          borderRadius: 999,
          background: "#fff",
          color: INK,
          fontSize: 38,
          fontWeight: 900,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        Get it on Google Play
        <span className="flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: BLUE, color: "#fff" }}>
          <ArrowRight style={{ width: 34, height: 34 }} strokeWidth={3} />
        </span>
      </div>
    </>
  );
}

function SlideFrame({ s, i }: { s: Slide; i: number }) {
  return (
    <div className="relative overflow-hidden" style={{ width: W, height: H, fontFamily: "inherit" }}>
      {/* window onto the shared panorama */}
      <div className="absolute top-0" style={{ left: -i * W, width: PANO_W, height: H }}>
        <Panorama />
      </div>
      <Header i={i} />
      <Copy s={s} />
      {s.img ? <Phone src={s.img} tilt={s.tilt} /> : <Finale />}
    </div>
  );
}

function Store9Page() {
  return (
    <div className="min-h-screen bg-neutral-900 p-8">
      <h1 className="text-white text-2xl font-bold mb-2">BazePay — Play Store slides · Panorama</h1>
      <p className="text-neutral-400 mb-6">
        6 slides · 1080×1920 each (shown at 0.4×) · one continuous canvas — swipe and the ribbon, coins and colour flow from slide to slide
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
