import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Wifi, CreditCard, Receipt, Wallet, MessageCircle, Globe } from "lucide-react";
import heroHome from "@/assets/hero-app-home.png";
import shotTopup from "@/assets/store/topup.png";
import shotCards from "@/assets/store/cards.png";
import shotPay from "@/assets/store/pay.png";
import shotEsims from "@/assets/store/esims-buy.png";
import wordmark from "@/assets/bazepay-wordmark.png.asset.json";

export const Route = createFileRoute("/store8")({
  head: () => ({
    meta: [
      { title: "BazePay · Store Slides — Bento" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Store8Page,
});

/* ------------------------------------------------------------------ */
/*  Design: "BENTO" — an Apple-keynote style bento grid. Porcelain      */
/*  canvas, soft rounded tiles, the phone showcased in a deep-blue      */
/*  gallery tile, and per-slide stat tiles in blue, lime and white.     */
/* ------------------------------------------------------------------ */

const PORCELAIN = "oklch(0.965 0.008 280)";
const TILE = "oklch(0.99 0.004 280)";
const INK = "oklch(0.16 0.03 280)";
const INK_SOFT = "oklch(0.42 0.04 280)";
const LIME = "#CBFD5B";
const BLUE = "#5C4DFB";
const BLUE_DEEP = "oklch(0.32 0.12 282)";

type Stat = { value: string; label: string; tone: "blue" | "lime" | "white" };

type Slide = {
  kicker: string;
  title: ReactNode[];
  sub: string;
  img?: string;
  imgAlt?: string;
  stats: [Stat, Stat];
  board?: { icon: "wallet" | "card" | "receipt" | "wifi" | "chat"; label: string; detail: string }[];
};

const SLIDES: Slide[] = [
  {
    kicker: "NAIRA WALLET",
    title: ["Skip the bank.", "Spend naira."],
    sub: "Built for diaspora and travelers — fund with your foreign card, spend like a local.",
    img: heroHome,
    imgAlt: "BazePay home",
    stats: [
      { value: "40+", label: "currencies supported", tone: "blue" },
      { value: "Instant", label: "wallet arrival", tone: "lime" },
    ],
  },
  {
    kicker: "TOP-UP",
    title: ["Your card in.", "Naira out."],
    sub: "Visa, Mastercard or Amex — live rates, one clear fee, in your wallet in seconds.",
    img: shotTopup,
    imgAlt: "Top-up exchange",
    stats: [
      { value: "3.9%", label: "one clear fee", tone: "lime" },
      { value: "Live", label: "exchange rates", tone: "white" },
    ],
  },
  {
    kicker: "CARDS",
    title: ["Two cards.", "Every till."],
    sub: "A virtual Visa for online payments and subscriptions, and a physical naira card for stores nationwide.",
    img: shotCards,
    imgAlt: "Cards wallet",
    stats: [
      { value: "Visa", label: "virtual, online", tone: "blue" },
      { value: "In-store", label: "physical naira card", tone: "white" },
    ],
  },
  {
    kicker: "BILLS",
    title: ["Home is one", "tap away."],
    sub: "Airtime, data, power, TV and betting — settle bills for you or family in Nigeria from any timezone.",
    img: shotPay,
    imgAlt: "Bill payments",
    stats: [
      { value: "24/7", label: "pay from anywhere", tone: "lime" },
      { value: "5+", label: "bill categories", tone: "blue" },
    ],
  },
  {
    kicker: "TRAVEL ESIM",
    title: ["Connected before", "passport control."],
    sub: "eSIM data for 190+ countries. Buy on the plane, land online — no kiosk, no queue, no roaming shock.",
    img: shotEsims,
    imgAlt: "Travel eSIM plans",
    stats: [
      { value: "190+", label: "countries covered", tone: "blue" },
      { value: "5 min", label: "to activate", tone: "lime" },
    ],
  },
  {
    kicker: "EVERYTHING",
    title: ["One app.", "Every errand."],
    sub: "Everything you'd land and need, already in your pocket.",
    stats: [
      { value: "Free", label: "to download", tone: "lime" },
      { value: "24/7", label: "human support", tone: "white" },
    ],
    board: [
      { icon: "wallet", label: "Naira wallet", detail: "Funded by any foreign card" },
      { icon: "card", label: "Virtual + physical cards", detail: "Online and in-store" },
      { icon: "receipt", label: "Bills & airtime", detail: "For you or family back home" },
      { icon: "wifi", label: "Travel eSIMs", detail: "190+ countries" },
      { icon: "chat", label: "24/7 human support", detail: "Real people, live chat" },
    ],
  },
];

const boardIcon = { wallet: Wallet, card: CreditCard, receipt: Receipt, wifi: Wifi, chat: MessageCircle };

function StatTile({ stat }: { stat: Stat }) {
  const styles =
    stat.tone === "blue"
      ? { bg: BLUE, fg: "white", sub: "oklch(1 0 0 / 0.75)" }
      : stat.tone === "lime"
        ? { bg: LIME, fg: INK, sub: "oklch(0.3 0.05 280 / 0.8)" }
        : { bg: TILE, fg: INK, sub: INK_SOFT };
  return (
    <div
      style={{
        background: styles.bg,
        borderRadius: 40,
        padding: "44px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
        flex: 1,
        boxShadow: "0 2px 12px oklch(0.16 0.03 280 / 0.05)",
      }}
    >
      <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.03em", color: styles.fg, lineHeight: 1 }}>
        {stat.value}
      </div>
      <div style={{ fontSize: 27, fontWeight: 600, color: styles.sub }}>{stat.label}</div>
    </div>
  );
}

function PhoneTile({ img, imgAlt }: { img: string; imgAlt?: string }) {
  return (
    <div
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, ${BLUE} 0%, ${BLUE_DEEP} 78%)`,
        borderRadius: 48,
        position: "relative",
        overflow: "hidden",
        width: 560,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {/* soft glow dot */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "oklch(1 0 0 / 0.14)",
          filter: "blur(60px)",
        }}
      />
      <img
        src={img}
        alt={imgAlt}
        style={{
          width: 400,
          borderRadius: "44px 44px 0 0",
          boxShadow: "0 -20px 80px oklch(0.1 0.05 280 / 0.55)",
          position: "relative",
          top: 36,
          display: "block",
        }}
      />
    </div>
  );
}

function SlideCard({ s, i }: { s: Slide; i: number }) {
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: PORCELAIN,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        fontFamily: "'Figtree', 'Inter', system-ui, sans-serif",
        color: INK,
      }}
    >
      {/* Header tile */}
      <div
        style={{
          background: TILE,
          borderRadius: 48,
          padding: "52px 56px",
          boxShadow: "0 2px 12px oklch(0.16 0.03 280 / 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 44 }}>
          {/* wordmark on a dark pill so the white text stays legible */}
          <div style={{ background: INK, borderRadius: 999, padding: "16px 30px", display: "flex", alignItems: "center" }}>
            <img src={wordmark.url} alt="BazePay" style={{ height: 40, display: "block" }} />
          </div>
          <div
            style={{
              border: `2px solid ${BLUE}`,
              color: BLUE,
              borderRadius: 999,
              padding: "12px 28px",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.14em",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Globe size={24} strokeWidth={2.4} />
            {s.kicker}
          </div>
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.02 }}>
          {s.title.map((line, k) => (
            <div key={k}>{line}</div>
          ))}
        </div>
        <div style={{ fontSize: 33, lineHeight: 1.4, color: INK_SOFT, marginTop: 26, maxWidth: 880, fontWeight: 500 }}>
          {s.sub}
        </div>
      </div>

      {/* Middle: phone + stats, or feature board on slide 6 */}
      {s.board ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          {s.board.map((row) => {
            const Icon = boardIcon[row.icon];
            return (
              <div
                key={row.label}
                style={{
                  background: TILE,
                  borderRadius: 36,
                  padding: "30px 44px",
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  flex: 1,
                  boxShadow: "0 2px 12px oklch(0.16 0.03 280 / 0.05)",
                }}
              >
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 26,
                    background: BLUE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={42} color="white" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em" }}>{row.label}</div>
                  <div style={{ fontSize: 27, color: INK_SOFT, fontWeight: 500, marginTop: 4 }}>{row.detail}</div>
                </div>
                <ArrowUpRight size={40} color={BLUE} strokeWidth={2.4} style={{ marginLeft: "auto" }} />
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 24, flex: 1, minHeight: 0 }}>
          <PhoneTile img={s.img!} imgAlt={s.imgAlt} />
          <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
            <StatTile stat={s.stats[0]} />
            <StatTile stat={s.stats[1]} />
          </div>
        </div>
      )}

      {/* Footer strip */}
      <div
        style={{
          background: INK,
          borderRadius: 40,
          padding: "30px 44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {SLIDES.map((_, k) => (
            <div
              key={k}
              style={{
                width: k === i ? 56 : 16,
                height: 16,
                borderRadius: 999,
                background: k === i ? LIME : "oklch(1 0 0 / 0.22)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            background: LIME,
            color: INK,
            borderRadius: 999,
            padding: "18px 36px",
            fontSize: 30,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 12,
            whiteSpace: "nowrap",
          }}
        >
          Download BazePay free
          <ArrowRight size={30} strokeWidth={2.6} />
        </div>
      </div>
    </div>
  );
}

function Store8Page() {
  return (
    <div className="min-h-screen bg-neutral-900 p-8">
      <h1 className="text-white text-2xl font-bold mb-2">BazePay — Play Store slides · Bento</h1>
      <p className="text-neutral-400 mb-6">6 slides · 1080×1920 each (shown at 0.4×)</p>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {SLIDES.map((s, i) => (
          <div key={i} style={{ width: 432, height: 768, overflow: "hidden" }} className="shrink-0 slide-frame">
            <div style={{ transform: "scale(0.4)", transformOrigin: "top left" }}>
              <SlideCard s={s} i={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
