import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import shotHome from "@/assets/store/ipad/home.png.asset.json";
import shotExchange from "@/assets/store/ipad/wallet.png.asset.json";
import shotCards from "@/assets/store/ipad/cards.png.asset.json";
import shotBills from "@/assets/store/ipad/bills.png.asset.json";
import wordmark from "@/assets/bazepay-wordmark.png.asset.json";

export const Route = createFileRoute("/store-ipad")({
  head: () => ({
    meta: [
      { title: "BazePay · iPad Screenshots" },
      { name: "description", content: "iPad store screenshots for BazePay in the Panorama design." },
      { property: "og:title", content: "BazePay · iPad Screenshots" },
      { property: "og:description", content: "iPad store screenshots for BazePay in the Panorama design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StoreIpadPage,
});

// Six portrait 1200 × 1920 windows into one continuous Panorama canvas.
const WIDTH = 1200;
const HEIGHT = 1600; // exports at 2064 × 2752 (iPad 13")
const COUNT = 6;
const WORLD_WIDTH = WIDTH * COUNT;

type Slide = {
  kicker: string;
  title: [string, string];
  description: string;
  image?: string;
  label: string;
};

const slides: Slide[] = [
  {
    kicker: "FOR DIASPORA & TRAVELERS",
    title: ["Land in Lagos.", "Spend like a local."],
    description: "Your everyday money for Nigeria, ready when you are.",
    image: shotHome.url,
    label: "WELCOME",
  },
  {
    kicker: "ONE NAIRA WALLET",
    title: ["Top up, send,", "track it all."],
    description: "Fund with your foreign card and see every naira you spend.",
    image: shotExchange.url,
    label: "WALLET",
  },
  {
    kicker: "NAIRA CARDS",
    title: ["Your card.", "Your control."],
    description: "Manage your naira cards and spending right from your wallet.",
    image: shotCards.url,
    label: "CARDS",
  },
  {
    kicker: "BILLS & AIRTIME",
    title: ["Bills back home,", "sorted."],
    description: "Take care of electricity, data, airtime and TV wherever you are.",
    image: shotBills.url,
    label: "PAYMENTS",
  },
  {
    kicker: "MORE WAYS TO PAY",
    title: ["Everyday payments,", "made simple."],
    description: "Keep your essentials covered, from mobile data to household bills.",
    image: shotBills.url,
    label: "ESSENTIALS",
  },
  {
    kicker: "READY WHEN YOU ARE",
    title: ["Your naira,", "ready when you land."],
    description: "Everything you need to spend like a local, wherever the journey takes you.",
    label: "LET’S GO",
  },
];

const ribbon = "M -200 1460 C 320 1210 810 1650 1320 1430 S 2100 1110 2680 1450 S 3570 1700 3860 1370 S 4820 1150 5220 1470 S 6060 1710 6500 1310 S 7040 1190 7420 1460";
const coins = [
  { x: 1200, y: 1150, symbol: "£", rotation: -13 },
  { x: 2400, y: 1250, symbol: "$", rotation: 11 },
  { x: 3600, y: 1100, symbol: "€", rotation: -9 },
  { x: 4800, y: 1250, symbol: "₦", rotation: 12 },
  { x: 6000, y: 1120, symbol: "₦", rotation: -11 },
];

function PortraitWorld() {
  return (
    <div className="absolute left-0 top-0" style={{ width: WORLD_WIDTH, height: HEIGHT }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--primary) 0%, color-mix(in oklab, var(--primary) 68%, var(--background)) 38%, var(--background) 88%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, color-mix(in oklab, var(--background) 35%, transparent))" }} />
      {[650, 2800, 5150].map((x) => (
        <div key={x} className="absolute select-none font-black leading-none" style={{ left: x, top: 520, fontSize: 950, color: "transparent", WebkitTextStroke: "3px color-mix(in oklab, var(--foreground) 12%, transparent)" }}>₦</div>
      ))}
      <svg className="absolute inset-0" width={WORLD_WIDTH} height={HEIGHT} viewBox={`0 0 ${WORLD_WIDTH} ${HEIGHT}`} aria-hidden="true">
        <path transform="translate(0 -230)" d={ribbon} fill="none" stroke="var(--lime)" strokeWidth="125" strokeLinecap="round" opacity=".95" />
        <path transform="translate(0 -230)" d={ribbon} fill="none" stroke="var(--background)" strokeWidth="4" strokeDasharray="23 27" opacity=".65" />
      </svg>
      {coins.map((coin) => (
        <div key={coin.x} className="absolute flex items-center justify-center rounded-full font-black" style={{ left: coin.x - 104, top: coin.y - 104, width: 208, height: 208, transform: `rotate(${coin.rotation}deg)`, background: coin.symbol === "₦" ? "radial-gradient(circle at 32% 25%, var(--card), var(--lime) 55%)" : "radial-gradient(circle at 32% 25%, var(--card), var(--primary) 95%)", boxShadow: "var(--shadow-card)", color: "var(--background)", fontSize: 105 }}>{coin.symbol}</div>
      ))}
    </div>
  );
}

function TabletScreenshot({ image }: { image: string }) {
  return (
    <div className="absolute" style={{ left: 359, top: 540, width: 482, height: 1000 }}>
      <div className="h-full w-full rounded-[40px] border-[8px] border-foreground/70 bg-background p-[9px] shadow-[0_55px_110px_-24px_color-mix(in_oklab,var(--background)_75%,transparent)]">
        <div className="h-full w-full overflow-hidden rounded-[26px] bg-background">
          <img src={image} alt="BazePay iPad app screenshot" className="block h-full w-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

function Finale() {
  const steps = [
    ["01", "Download BazePay", "Get the app on the App Store"],
    ["02", "Fund your wallet", "Use your foreign card"],
    ["03", "Spend in naira", "Cards, bills, transfers & more"],
  ];
  return (
    <div className="absolute" style={{ left: 100, right: 100, top: 600 }}>
      {steps.map(([number, title, detail], i) => (
        <div key={number} className="flex items-center" style={{ gap: 30, padding: "38px 36px", marginBottom: 24, borderRadius: 22, background: i === 2 ? "var(--lime)" : "color-mix(in oklab, var(--foreground) 12%, transparent)", border: i === 2 ? "1px solid transparent" : "1px solid color-mix(in oklab, var(--foreground) 24%, transparent)", color: i === 2 ? "var(--background)" : "var(--foreground)" }}>
          <span className="shrink-0 font-black" style={{ fontSize: 62, color: i === 2 ? "var(--background)" : "var(--lime)" }}>{number}</span>
          <div>
            <div className="font-extrabold" style={{ fontSize: 42, lineHeight: 1.15 }}>{title}</div>
            <div style={{ fontSize: 27, marginTop: 8, opacity: .75 }}>{detail}</div>
          </div>
        </div>
      ))}
      <div className="inline-flex items-center font-black" style={{ gap: 20, marginTop: 42, padding: "27px 34px", background: "var(--card)", color: "var(--card-foreground)", borderRadius: 100, fontSize: 34, boxShadow: "var(--shadow-card)" }}>
        Download on the App Store <ArrowUpRight size={42} strokeWidth={3} />
      </div>
    </div>
  );
}

function PortraitSlide({ slide, index }: { slide: Slide; index: number }) {
  return (
    <div className="relative overflow-hidden" style={{ width: WIDTH, height: HEIGHT, fontFamily: "Sora, sans-serif" }}>
      <div className="absolute top-0" style={{ left: -index * WIDTH, width: WORLD_WIDTH, height: HEIGHT }}><PortraitWorld /></div>
      <div className="absolute flex items-center justify-between" style={{ left: 76, right: 76, top: 72 }}>
        <div style={{ padding: "15px 24px", background: "color-mix(in oklab, var(--background) 70%, transparent)", border: "1px solid color-mix(in oklab, var(--foreground) 20%, transparent)", borderRadius: 100 }}>
          <img src={wordmark.url} alt="BazePay" style={{ height: 44, display: "block" }} />
        </div>
        <div className="flex items-center font-bold" style={{ gap: 16, fontSize: 27, color: "var(--foreground)" }}>
          <span style={{ color: "var(--lime)" }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ width: 52, height: 2, background: "var(--foreground)", opacity: .55 }} />06
        </div>
      </div>
      <div className="absolute" style={{ left: 76, right: 76, top: 220 }}>
        <div className="flex items-center font-extrabold" style={{ gap: 14, color: "var(--lime)", fontSize: 26 }}>
          <span style={{ width: 14, height: 14, background: "var(--lime)", borderRadius: 20 }} />{slide.kicker}
        </div>
        <h2 className="font-black" style={{ fontSize: 78, lineHeight: 1.06, marginTop: 25, color: "var(--foreground)", letterSpacing: 0 }}>
          <span className="block">{slide.title[0]}</span>
          <span className="block" style={{ color: "var(--lime)" }}>{slide.title[1]}</span>
        </h2>
        <p style={{ marginTop: 23, maxWidth: 990, fontSize: 31, lineHeight: 1.34, fontWeight: 500, color: "var(--foreground)", opacity: .83 }}>{slide.description}</p>
      </div>
      {slide.image ? <TabletScreenshot image={slide.image} /> : <Finale />}
      <div className="absolute font-bold" style={{ left: 76, bottom: 46, fontSize: 25, color: "var(--foreground)" }}>{slide.label} <span style={{ color: "var(--lime)", marginLeft: 18 }}>↗</span></div>
    </div>
  );
}

function StoreIpadPage() {
  return (
    <main className="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <h1 className="mb-2 text-2xl font-bold">BazePay — Panorama tablet screenshots · Portrait</h1>
      <p className="mb-6 text-muted-foreground">6 portrait slides · 2064 × 2752 export · real iPad screenshots · previewed at 40%</p>
      <div className="flex gap-3 overflow-x-auto pb-5">
        {slides.map((slide, index) => (
          <div key={index} className="slide-frame shrink-0 overflow-hidden" style={{ width: 480, height: 640 }}>
            <div style={{ transform: "scale(.4)", transformOrigin: "top left" }}><PortraitSlide slide={slide} index={index} /></div>
          </div>
        ))}
      </div>
    </main>
  );
}
