import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import shotHome from "@/assets/store/tablet/real/home.png.asset.json";
import shotExchange from "@/assets/store/tablet/real/exchange.png.asset.json";
import shotCards from "@/assets/store/tablet/real/cards.png.asset.json";
import shotBills from "@/assets/store/tablet/real/bills.png.asset.json";
import shotEsim from "@/assets/store/tablet/esim.png";
import wordmark from "@/assets/bazepay-wordmark.png.asset.json";

export const Route = createFileRoute("/store9-tablet")({
  head: () => ({
    meta: [
      { title: "BazePay · Panorama Store Screenshots" },
      { name: "description", content: "BazePay Android app screenshots in the Panorama store design." },
      { property: "og:title", content: "BazePay · Panorama Store Screenshots" },
      { property: "og:description", content: "BazePay Android app screenshots in the Panorama store design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Store9TabletPage,
});

// Six 1920 × 1080 windows into one continuous landscape panorama.
const W = 1920;
const H = 1080;
const COUNT = 6;
const WORLD_W = W * COUNT;
const BLUE = "#5C4DFB";
const LIME = "#CBFD5B";
const INK = "#171526";

type Slide = {
  kicker: string;
  title: [string, string];
  description: string;
  image?: string;
  indexLabel: string;
};

const slides: Slide[] = [
  {
    kicker: "FOR DIASPORA & TRAVELERS",
    title: ["Land in Lagos.", "Spend like a local."],
    description: "Fund with your foreign card and pay in naira. Your everyday money for Nigeria, ready when you are.",
    image: shotHome.url,
    indexLabel: "WELCOME",
  },
  {
    kicker: "FUND IN 40+ CURRENCIES",
    title: ["Pounds in.", "Naira out."],
    description: "Fund with Visa, Mastercard or Amex. See your rate and fees before you pay.",
    image: shotExchange.url,
    indexLabel: "EXCHANGE",
  },
  {
    kicker: "NAIRA CARDS",
    title: ["Your card.", "Your control."],
    description: "See your card, top it up and manage spending right from your wallet.",
    image: shotCards.url,
    indexLabel: "CARDS",
  },
  {
    kicker: "BILLS & AIRTIME",
    title: ["Bills back home,", "sorted."],
    description: "Take care of electricity, data, airtime and TV for yourself or family — wherever you are.",
    image: shotBills.url,
    indexLabel: "PAYMENTS",
  },
  {
    kicker: "TRAVEL eSIMs",
    title: ["Online before", "you clear customs."],
    description: "Find a data plan for your destination. Activate in a few taps and land connected.",
    image: shotEsim,
    indexLabel: "CONNECTED",
  },
  {
    kicker: "READY FOR TAKE-OFF",
    title: ["Your naira,", "ready when you land."],
    description: "Everything you need to spend like a local, wherever the journey takes you.",
    indexLabel: "LET’S GO",
  },
];

const ribbon = "M -250 910 C 460 665 1020 1030 1770 875 S 2820 650 3800 855 S 4820 1100 5750 825 S 6740 640 7670 875 S 8690 1090 9590 825 S 10720 650 11780 860";
const coins = [
  { x: 1920, y: 820, symbol: "£", size: 175, rotation: -13 },
  { x: 3840, y: 910, symbol: "$", size: 165, rotation: 11 },
  { x: 5760, y: 785, symbol: "€", size: 178, rotation: -9 },
  { x: 7680, y: 865, symbol: "₦", size: 180, rotation: 12 },
  { x: 9600, y: 790, symbol: "₦", size: 175, rotation: -11 },
];

function LandscapeWorld() {
  return (
    <div className="absolute left-0 top-0" style={{ width: WORLD_W, height: H }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${BLUE} 0%, #4937c7 27%, #30245e 54%, ${INK} 83%)` }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 54%, rgba(9,8,28,.35))" }} />
      {[920, 4510, 8280].map((x) => (
        <div key={x} className="absolute select-none font-black leading-none" style={{ left: x, top: 220, fontSize: 920, color: "transparent", WebkitTextStroke: "3px rgba(255,255,255,.10)" }}>₦</div>
      ))}
      <svg className="absolute inset-0" width={WORLD_W} height={H} viewBox={`0 0 ${WORLD_W} ${H}`} aria-hidden="true">
        <path d={ribbon} fill="none" stroke={LIME} strokeWidth="100" strokeLinecap="round" opacity=".95" />
        <path d={ribbon} fill="none" stroke={INK} strokeWidth="3" strokeDasharray="20 24" opacity=".6" />
      </svg>
      {coins.map((coin) => (
        <div
          key={coin.x}
          className="absolute flex items-center justify-center rounded-full font-black"
          style={{ left: coin.x - coin.size / 2, top: coin.y - coin.size / 2, width: coin.size, height: coin.size, transform: `rotate(${coin.rotation}deg)`, background: coin.symbol === "₦" ? `radial-gradient(circle at 32% 25%, #f2ffd0, ${LIME} 54%, #a9d241)` : "radial-gradient(circle at 32% 25%, #fff, #dcd8ff 54%, #8f84ff)", boxShadow: "0 22px 42px rgba(0,0,0,.35), inset 0 -8px 0 rgba(0,0,0,.12), inset 0 0 0 7px rgba(255,255,255,.3)", color: INK, fontSize: 85 }}
        >{coin.symbol}</div>
      ))}
    </div>
  );
}

function ScreenshotDevice({ image }: { image: string }) {
  return (
    <div className="absolute" style={{ width: 515, height: 824, top: 147, left: 1190 }}>
      <div className="h-full w-full rounded-[32px] border-[8px] border-foreground/85 bg-foreground p-[5px] shadow-[0_50px_90px_-25px_rgba(0,0,0,.55)]">
        <div className="relative h-full overflow-hidden rounded-[21px] bg-background">
          <img src={image} alt="Real BazePay Android app screenshot" className="block h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
}

function Finale() {
  const steps = [
    ["01", "Download BazePay", "Get the app on Google Play"],
    ["02", "Fund your wallet", "Use your foreign card"],
    ["03", "Spend in naira", "Cards, bills, transfers & more"],
  ];
  return (
    <div className="absolute" style={{ left: 1165, top: 240, width: 620 }}>
      {steps.map(([number, title, detail], i) => (
        <div key={number} className="flex items-center" style={{ gap: 24, padding: "25px 28px", marginBottom: 15, borderRadius: 22, background: i === 2 ? LIME : "rgba(255,255,255,.1)", border: i === 2 ? "1px solid transparent" : "1px solid rgba(255,255,255,.18)", color: i === 2 ? INK : "#fff" }}>
          <span className="font-black" style={{ fontSize: 48, color: i === 2 ? INK : LIME }}>{number}</span>
          <div>
            <div className="font-extrabold" style={{ fontSize: 30, lineHeight: 1.2 }}>{title}</div>
            <div style={{ fontSize: 21, marginTop: 5, opacity: .7 }}>{detail}</div>
          </div>
        </div>
      ))}
      <div className="inline-flex items-center font-black" style={{ gap: 20, marginTop: 16, padding: "19px 24px 19px 34px", background: "#fff", color: INK, borderRadius: 100, fontSize: 29, boxShadow: "0 22px 45px rgba(0,0,0,.24)" }}>
        Get it on Google Play <ArrowUpRight size={36} strokeWidth={3} />
      </div>
    </div>
  );
}

function TabletSlide({ slide, index }: { slide: Slide; index: number }) {
  return (
    <div className="relative overflow-hidden" style={{ width: W, height: H, fontFamily: "Sora, sans-serif" }}>
      <div className="absolute top-0" style={{ left: -index * W, width: WORLD_W, height: H }}><LandscapeWorld /></div>
      <div className="absolute flex items-center justify-between" style={{ left: 100, right: 100, top: 57 }}>
        <div style={{ padding: "13px 22px", background: "rgba(12,10,32,.62)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 100 }}>
          <img src={wordmark.url} alt="BazePay" style={{ height: 40, display: "block" }} />
        </div>
        <div className="flex items-center font-bold" style={{ gap: 17, fontSize: 25, color: "rgba(255,255,255,.75)" }}>
          <span style={{ color: LIME }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ width: 60, height: 2, background: "rgba(255,255,255,.4)" }} />06
        </div>
      </div>
      <div className="absolute" style={{ left: 100, top: 255, width: 650 }}>
        <div className="flex items-center font-extrabold" style={{ gap: 14, color: LIME, fontSize: 25 }}>
          <span style={{ width: 13, height: 13, background: LIME, borderRadius: 20 }} />{slide.kicker}
        </div>
        <h2 className="font-black" style={{ fontSize: 67, lineHeight: 1.08, marginTop: 26, color: "#fff" }}>
          <span className="block">{slide.title[0]}</span>
          <span className="block" style={{ color: LIME }}>{slide.title[1]}</span>
        </h2>
        <p style={{ marginTop: 28, maxWidth: 620, fontSize: 27, lineHeight: 1.4, fontWeight: 500, color: "rgba(255,255,255,.82)" }}>{slide.description}</p>
      </div>
      {slide.image ? <ScreenshotDevice image={slide.image} /> : <Finale />}
      <div className="absolute font-bold" style={{ left: 100, bottom: 64, fontSize: 22, color: "rgba(255,255,255,.72)" }}>{slide.indexLabel} <span style={{ color: LIME, marginLeft: 18 }}>↗</span></div>
    </div>
  );
}

function Store9TabletPage() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-8 text-foreground">
      <h1 className="mb-2 text-2xl font-bold">BazePay — Panorama store screenshots</h1>
      <p className="mb-6 text-muted-foreground">6 landscape slides · 1920 × 1080 each · real Android app screenshots · previewed at half size</p>
      <div className="flex gap-3 overflow-x-auto pb-5">
        {slides.map((slide, index) => (
          <div key={index} className="slide-frame shrink-0 overflow-hidden" style={{ width: 960, height: 540 }}>
            <div style={{ transform: "scale(.5)", transformOrigin: "top left" }}><TabletSlide slide={slide} index={index} /></div>
          </div>
        ))}
      </div>
    </main>
  );
}