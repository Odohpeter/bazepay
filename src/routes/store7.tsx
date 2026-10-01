import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Plane, ArrowRight, Wifi, CreditCard, Receipt, Wallet, MessageCircle } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";
import wordmark from "@/assets/bazepay-wordmark.png.asset.json";

export const Route = createFileRoute("/store7")({
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Departures" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Store7Page,
});

/* ------------------------------------------------------------------ */
/*  Design: "DEPARTURES" — an airport split-flap board meets a boarding */
/*  pass. Charcoal flip-board canvas, row stripes, flight numbers, a    */
/*  perforated ticket stub with barcode, and the phone as the passport. */
/* ------------------------------------------------------------------ */

const INK = "oklch(0.15 0.02 280)"; // board charcoal
const INK2 = "oklch(0.19 0.025 280)"; // row stripe
const PAPER = "oklch(0.96 0.01 95)"; // ticket paper
const LIME = "#CBFD5B";
const BLUE = "#5C4DFB";

type Slide = {
  flight: string;
  gate: string;
  dest: string;
  title: ReactNode[];
  sub: string;
  img?: string;
  imgAlt?: string;
  status: string;
  board?: { icon: "wallet" | "card" | "receipt" | "wifi" | "chat"; label: string; detail: string; status: string }[];
};

const SLIDES: Slide[] = [
  {
    flight: "BZ 001",
    gate: "A1",
    dest: "NAIRA",
    title: ["Final call for", "bank queues."],
    sub: "BazePay is the fast lane for diaspora and travelers — fund with your foreign card, spend naira like a local.",
    img: heroHome,
    imgAlt: "BazePay home",
    status: "BOARDING",
  },
  {
    flight: "BZ 002",
    gate: "A2",
    dest: "TOP-UP",
    title: ["Your card boards.", "Naira lands."],
    sub: "Visa, Mastercard or Amex in 40+ currencies. Live rates, 3.9% fee, in your wallet before you finish boarding.",
    img: shotTopup,
    imgAlt: "Top up",
    status: "ON TIME",
  },
  {
    flight: "BZ 003",
    gate: "B1",
    dest: "CARDS",
    title: ["Two cards.", "Every till in Nigeria."],
    sub: "A virtual Visa for online payments and subscriptions, and a physical naira card that taps at stores nationwide.",
    img: shotCards,
    imgAlt: "Cards",
    status: "ON TIME",
  },
  {
    flight: "BZ 004",
    gate: "B2",
    dest: "BILLS",
    title: ["Home is one", "tap away."],
    sub: "Airtime, data, power, TV and betting — settle bills for you or family in Nigeria from any timezone.",
    img: shotPay,
    imgAlt: "Bill payments",
    status: "ON TIME",
  },
  {
    flight: "BZ 005",
    gate: "C1",
    dest: "ESIM",
    title: ["Connected before", "passport control."],
    sub: "eSIM data for 190+ countries. Buy on the plane, land online — no kiosk, no queue, no roaming shock.",
    img: shotEsims,
    imgAlt: "eSIM plans",
    status: "BOARDING",
  },
  {
    flight: "BZ 006",
    gate: "ALL",
    dest: "EVERYWHERE",
    title: ["One app.", "Every departure."],
    sub: "Everything you'd land and need, already on the board.",
    status: "NOW BOARDING",
    board: [
      { icon: "wallet", label: "Naira wallet", detail: "Funded by any foreign card", status: "ON TIME" },
      { icon: "card", label: "Virtual + physical cards", detail: "Online and in-store", status: "ON TIME" },
      { icon: "receipt", label: "Bills & airtime", detail: "For you or family back home", status: "ON TIME" },
      { icon: "wifi", label: "Travel eSIMs", detail: "190+ countries", status: "ON TIME" },
      { icon: "chat", label: "24/7 human support", detail: "Real people, live chat", status: "24/7" },
    ],
  },
];

function BoardIcon({ name, size = 30 }: { name: string; size?: number }) {
  const cls = "shrink-0";
  switch (name) {
    case "wallet": return <Wallet size={size} className={cls} />;
    case "card": return <CreditCard size={size} className={cls} />;
    case "receipt": return <Receipt size={size} className={cls} />;
    case "wifi": return <Wifi size={size} className={cls} />;
    default: return <MessageCircle size={size} className={cls} />;
  }
}

/* Barcode strip built from repeating gradient bars */
function Barcode({ color = INK, h = 44 }: { color?: string; h?: number }) {
  return (
    <div
      style={{
        height: h,
        width: 190,
        background: `repeating-linear-gradient(90deg, ${color} 0 3px, transparent 3px 6px, ${color} 6px 7px, transparent 7px 12px, ${color} 12px 16px, transparent 16px 19px)`,
      }}
    />
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative"
      style={{
        width: 520,
        borderRadius: 64,
        padding: 10,
        background: "linear-gradient(160deg, oklch(0.85 0.02 280), oklch(0.55 0.03 280) 40%, oklch(0.8 0.02 280))",
        boxShadow: "0 50px 100px -30px rgba(0,0,0,0.75)",
      }}
    >
      <div style={{ borderRadius: 56, overflow: "hidden", background: "#000" }}>
        <img src={src} alt={alt} style={{ display: "block", width: "100%" }} />
      </div>
    </div>
  );
}

function SlideCard({ s, i }: { s: Slide; i: number }) {
  const flap = "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace";
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: 1080, height: 1920, background: INK, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* flip-board row stripes */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(180deg, transparent 0 118px, ${INK2} 118px 120px)`,
          opacity: 0.9,
        }}
      />
      {/* soft blue bloom top-right */}
      <div
        className="absolute"
        style={{
          top: -260, right: -260, width: 720, height: 720, borderRadius: "50%",
          background: `radial-gradient(circle, ${BLUE}55, transparent 65%)`,
        }}
      />

      {/* top bar: wordmark + terminal tag */}
      <div className="absolute flex items-center justify-between" style={{ top: 72, left: 80, right: 80 }}>
        <img src={wordmark.url} alt="BazePay" style={{ height: 56 }} />
        <div
          className="flex items-center gap-3"
          style={{
            fontFamily: flap, fontSize: 24, letterSpacing: 4, color: LIME,
            border: `2px solid ${LIME}55`, borderRadius: 999, padding: "12px 26px",
          }}
        >
          <Plane size={22} style={{ transform: "rotate(45deg)" }} />
          TERMINAL · NGN
        </div>
      </div>

      {/* flight row: number / dest / status — split-flap style */}
      <div
        className="absolute flex items-stretch"
        style={{ top: 210, left: 80, right: 80, borderTop: `2px solid ${PAPER}22`, borderBottom: `2px solid ${PAPER}22` }}
      >
        {[
          { k: "FLIGHT", v: s.flight },
          { k: "DESTINATION", v: s.dest },
          { k: "GATE", v: s.gate },
        ].map((c, idx) => (
          <div
            key={c.k}
            style={{
              flex: idx === 1 ? 1.4 : 1,
              padding: "30px 28px",
              borderLeft: idx ? `2px solid ${PAPER}22` : undefined,
            }}
          >
            <div style={{ fontFamily: flap, fontSize: 20, letterSpacing: 5, color: `${PAPER}88` }}>{c.k}</div>
            <div style={{ fontFamily: flap, fontSize: 40, letterSpacing: 3, color: PAPER, marginTop: 8, fontWeight: 700 }}>
              {c.v}
            </div>
          </div>
        ))}
        <div style={{ padding: "30px 28px", borderLeft: `2px solid ${PAPER}22`, flex: 1 }}>
          <div style={{ fontFamily: flap, fontSize: 20, letterSpacing: 5, color: `${PAPER}88` }}>STATUS</div>
          <div
            className="inline-flex items-center gap-2"
            style={{
              marginTop: 10, fontFamily: flap, fontSize: 26, letterSpacing: 3, fontWeight: 700,
              color: INK, background: LIME, borderRadius: 8, padding: "6px 16px",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 99, background: INK, display: "inline-block" }} />
            {s.status}
          </div>
        </div>
      </div>

      {/* headline + sub */}
      <div style={{ position: "absolute", top: 460, left: 80, right: 80 }}>
        <h1 style={{ fontSize: 96, lineHeight: 1.02, fontWeight: 800, letterSpacing: -2, color: PAPER, margin: 0 }}>
          {s.title.map((line, li) => (
            <span key={li} style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </h1>
        <p style={{ fontSize: 36, lineHeight: 1.4, color: `${PAPER}BB`, marginTop: 28, maxWidth: 860 }}>{s.sub}</p>
      </div>

      {/* body: phone or departures board */}
      {s.board ? (
        <div
          className="absolute"
          style={{
            top: 830, left: 80, right: 80, bottom: 250,
            border: `2px solid ${PAPER}26`, borderRadius: 28, overflow: "hidden",
            background: `${INK2}66`,
          }}
        >
          {s.board.map((row, ri) => (
            <div
              key={row.label}
              className="flex items-center"
              style={{
                padding: "34px 40px",
                borderTop: ri ? `2px solid ${PAPER}1c` : undefined,
                gap: 28,
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{ width: 72, height: 72, borderRadius: 18, background: `${BLUE}33`, color: LIME }}
              >
                <BoardIcon name={row.icon} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: PAPER, letterSpacing: -0.5 }}>{row.label}</div>
                <div style={{ fontSize: 26, color: `${PAPER}99`, marginTop: 4 }}>{row.detail}</div>
              </div>
              <div style={{ fontFamily: flap, fontSize: 24, letterSpacing: 3, color: LIME, fontWeight: 700 }}>
                {row.status}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute" style={{ top: 860, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Phone src={s.img!} alt={s.imgAlt!} />
        </div>
      )}

      {/* perforated ticket stub footer */}
      <div
        className="absolute flex items-center"
        style={{
          left: 80, right: 80, bottom: 72, height: 140,
          background: PAPER, borderRadius: 24, overflow: "hidden",
        }}
      >
        <div className="flex items-center gap-5" style={{ padding: "0 40px", flex: 1 }}>
          <span style={{ fontFamily: flap, fontSize: 26, letterSpacing: 3, fontWeight: 700, color: INK }}>LHR</span>
          <Plane size={26} color={INK} style={{ transform: "rotate(45deg)" }} />
          <span style={{ fontFamily: flap, fontSize: 26, letterSpacing: 3, fontWeight: 700, color: INK }}>LOS</span>
          <span style={{ fontFamily: flap, fontSize: 22, letterSpacing: 2, color: `${INK}99`, marginLeft: 12 }}>
            SEAT {String(i + 1).padStart(2, "0")}A · BAZEPAY.COM
          </span>
        </div>
        {/* perforation */}
        <div style={{ width: 0, alignSelf: "stretch", borderLeft: `3px dashed ${INK}55` }} />
        <div className="flex items-center" style={{ padding: "0 36px" }}>
          {s.board ? (
            <div
              className="flex items-center gap-3"
              style={{ background: INK, color: LIME, borderRadius: 999, padding: "16px 30px", fontSize: 26, fontWeight: 700 }}
            >
              Download free <ArrowRight size={24} />
            </div>
          ) : (
            <Barcode />
          )}
        </div>
      </div>
    </div>
  );
}

function Store7Page() {
  return (
    <div className="min-h-screen bg-neutral-950 p-8">
      <h1 className="mb-2 text-xl font-semibold text-neutral-100">BazePay · Play Store slides — Departures</h1>
      <p className="mb-6 text-sm text-neutral-400">6 slides · 1080×1920 · shown at 40%</p>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {SLIDES.map((s, i) => (
          <div key={i} style={{ transform: "scale(0.4)", transformOrigin: "top left", width: 432, height: 768 }} className="shrink-0">
            <SlideCard s={s} i={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
