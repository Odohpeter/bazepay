import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, CreditCard, Globe2, Home, LayoutGrid, Search, ShieldCheck, Smartphone, Tv, Wifi, Zap } from "lucide-react";
import wordmark from "@/assets/bazepay-wordmark.png.asset.json";

export const Route = createFileRoute("/store9-tablet")({
  head: () => ({
    meta: [
      { title: "BazePay · Tablet Store Screenshots — Panorama" },
      { name: "description", content: "BazePay Android tablet app screenshots in the Panorama design." },
      { property: "og:title", content: "BazePay · Tablet Store Screenshots — Panorama" },
      { property: "og:description", content: "BazePay Android tablet app screenshots in the Panorama design." },
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
  screen?: "home" | "exchange" | "cards" | "bills" | "esim";
  indexLabel: string;
};

const slides: Slide[] = [
  {
    kicker: "FOR DIASPORA & TRAVELERS",
    title: ["Land in Lagos.", "Spend like a local."],
    description: "Fund with your foreign card and pay in naira. Your everyday money for Nigeria, ready when you are.",
    screen: "home",
    indexLabel: "WELCOME",
  },
  {
    kicker: "FUND IN 40+ CURRENCIES",
    title: ["Pounds in.", "Naira out."],
    description: "Fund with Visa, Mastercard or Amex. See your rate and fees before you pay.",
    screen: "exchange",
    indexLabel: "EXCHANGE",
  },
  {
    kicker: "VIRTUAL & PHYSICAL CARDS",
    title: ["Tap in stores.", "Pay online."],
    description: "A physical naira card for stores in Nigeria. A virtual Visa for online payments and subscriptions.",
    screen: "cards",
    indexLabel: "CARDS",
  },
  {
    kicker: "BILLS & AIRTIME",
    title: ["Bills back home,", "sorted."],
    description: "Take care of electricity, data, airtime and TV for yourself or family — wherever you are.",
    screen: "bills",
    indexLabel: "PAYMENTS",
  },
  {
    kicker: "TRAVEL eSIMs",
    title: ["Online before", "you clear customs."],
    description: "Find a data plan for your destination. Activate in a few taps and land connected.",
    screen: "esim",
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

const nav = [
  { label: "Home", icon: Home, screen: "home" },
  { label: "Wallet", icon: LayoutGrid, screen: "exchange" },
  { label: "Cards", icon: CreditCard, screen: "cards" },
  { label: "Pay bills", icon: Zap, screen: "bills" },
  { label: "Travel eSIM", icon: Globe2, screen: "esim" },
] as const;

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-lg bg-card p-5 text-card-foreground shadow-sm"><p className="text-sm font-semibold text-card-foreground/50">{label}</p><p className="mt-3 font-display text-3xl font-bold">{value}</p><p className="mt-2 text-sm text-primary">{note}</p></div>;
}

function ScreenContent({ screen }: { screen: NonNullable<Slide["screen"]> }) {
  if (screen === "home") return <>
    <div className="flex items-end justify-between"><div><p className="text-sm text-foreground/60">Good morning, Alex</p><h3 className="mt-1 font-display text-3xl font-bold">Your money, at a glance</h3></div><span className="rounded-full bg-card px-4 py-2 text-sm text-card-foreground">NGN wallet</span></div>
    <div className="mt-6 flex items-center justify-between rounded-lg bg-primary p-7 text-primary-foreground"><div><p className="text-sm opacity-80">Available balance</p><p className="mt-2 font-display text-5xl font-bold">₦1,240,500.00</p><p className="mt-3 text-sm opacity-75">≈ £635.50</p></div><div className="flex gap-3"><span className="rounded-full bg-lime px-5 py-3 font-bold text-lime-foreground">＋ Top up</span><span className="rounded-full bg-primary-foreground/15 px-5 py-3 font-bold">↗ Transfer</span></div></div>
    <div className="mt-5 grid grid-cols-2 gap-4"><Metric label="Topped up" value="₦1.2M" note="↑ 18% this month" /><Metric label="Spent" value="₦654K" note="This month" /></div>
    <div className="mt-5 rounded-lg bg-card p-5 text-card-foreground"><div className="flex items-center justify-between"><h4 className="font-display text-lg font-bold">Recent activity</h4><span className="text-sm text-primary">View all →</span></div><div className="mt-4 flex items-center gap-3 border-t border-border pt-3"><span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><ArrowDownLeft size={20} /></span><span className="flex-1 font-semibold">Wallet top up <small className="block font-normal text-card-foreground/50">Today · 09:14</small></span><b>+₦250,000</b></div></div>
  </>;
  if (screen === "exchange") return <>
    <div><p className="text-sm text-foreground/60">Wallet / Top up</p><h3 className="mt-1 font-display text-3xl font-bold">Exchange to naira</h3></div>
    <div className="mt-6 grid grid-cols-[1fr_56px_1fr] items-center gap-3"><div className="rounded-lg bg-card p-6 text-card-foreground"><p className="text-sm text-card-foreground/50">You pay</p><p className="mt-5 text-4xl font-bold">£500.00</p><p className="mt-4 text-sm font-bold">GBP · British Pound</p></div><div className="flex size-12 items-center justify-center rounded-full bg-lime text-lime-foreground"><ArrowLeftRight size={23} /></div><div className="rounded-lg bg-card p-6 text-card-foreground"><p className="text-sm text-card-foreground/50">You receive</p><p className="mt-5 text-4xl font-bold">₦976,000</p><p className="mt-4 text-sm font-bold">NGN · Nigerian Naira</p></div></div>
    <div className="mt-5 rounded-lg bg-card px-6 py-5 text-card-foreground"><div className="flex justify-between border-b border-border pb-3"><span>Exchange rate</span><b>£1 = ₦1,952</b></div><div className="flex justify-between border-b border-border py-3"><span>Bank Processing Fees (3.9%)</span><b>£19.50</b></div><div className="flex justify-between pt-3"><span>Arrival time</span><b>Instant</b></div></div>
    <div className="mt-5 flex items-center justify-between"><span className="text-foreground/70">Total to pay <b className="ml-2 text-foreground">£519.50</b></span><span className="rounded-full bg-lime px-8 py-3 font-bold text-lime-foreground">Continue →</span></div>
  </>;
  if (screen === "cards") return <>
    <div className="flex items-end justify-between"><div><p className="text-sm text-foreground/60">Your wallet</p><h3 className="mt-1 font-display text-3xl font-bold">Naira cards</h3></div><span className="rounded-full bg-lime px-5 py-2 font-bold text-lime-foreground">＋ Issue a card</span></div>
    <div className="mt-6 grid grid-cols-2 gap-5"><div className="relative h-52 overflow-hidden rounded-lg bg-primary p-6 text-primary-foreground"><div className="absolute -right-16 -top-20 size-60 rounded-full border-[28px] border-lime/35" /><p className="text-xl font-bold">bazepay</p><p className="mt-12 text-2xl font-semibold">•••• •••• •••• 4286</p><div className="mt-5 flex justify-between text-sm"><span>VIRTUAL · ONLINE</span><b>VISA</b></div></div><div className="relative h-52 overflow-hidden rounded-lg bg-foreground p-6 text-background"><div className="absolute -right-20 -bottom-28 size-64 rounded-full bg-lime" /><p className="relative text-xl font-bold">bazepay</p><p className="relative mt-12 text-2xl font-semibold">•••• •••• •••• 9012</p><div className="relative mt-5 flex justify-between text-sm"><span>PHYSICAL · IN-STORE</span><b>VISA</b></div></div></div>
    <div className="mt-5 grid grid-cols-2 gap-5"><div className="rounded-lg bg-card p-5 text-card-foreground"><CreditCard className="text-primary" /><h4 className="mt-3 font-bold">Virtual card</h4><p className="mt-1 text-sm text-card-foreground/55">Online payments & subscriptions</p></div><div className="rounded-lg bg-card p-5 text-card-foreground"><ShieldCheck className="text-primary" /><h4 className="mt-3 font-bold">Physical card</h4><p className="mt-1 text-sm text-card-foreground/55">Shops and ATMs in Nigeria</p></div></div>
  </>;
  if (screen === "bills") return <>
    <div><p className="text-sm text-foreground/60">Payments</p><h3 className="mt-1 font-display text-3xl font-bold">Pay bills</h3></div>
    <div className="mt-6 flex items-center gap-3 rounded-lg bg-card px-5 py-4 text-card-foreground/50"><Search size={20} /> Search services</div>
    <div className="mt-5 grid grid-cols-3 gap-4">{[
      { label: "Airtime", detail: "All networks", icon: Smartphone }, { label: "Data bundles", detail: "Stay connected", icon: Wifi }, { label: "Electricity", detail: "Prepaid & postpaid", icon: Zap },
      { label: "TV subscription", detail: "Entertainment", icon: Tv }, { label: "Internet", detail: "Home broadband", icon: Globe2 }, { label: "Travel eSIM", detail: "190+ countries", icon: Globe2 },
    ].map(({ label, detail, icon: Icon }) => <div key={label} className="rounded-lg bg-card p-5 text-card-foreground"><span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon size={23} /></span><h4 className="mt-4 font-bold">{label}</h4><p className="mt-1 text-sm text-card-foreground/50">{detail}</p></div>)}</div>
    <div className="mt-5 rounded-lg bg-primary/20 p-5"><h4 className="font-bold">Recent payment</h4><p className="mt-1 text-sm text-foreground/65">MTN Airtime · ₦5,000 · Today</p></div>
  </>;
  return <>
    <div><p className="text-sm text-foreground/60">Travel / Connectivity</p><h3 className="mt-1 font-display text-3xl font-bold">Stay connected abroad</h3></div>
    <div className="mt-6 rounded-lg bg-primary p-7 text-primary-foreground"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-lime">TRAVEL eSIM</p><h4 className="mt-3 text-3xl font-bold">Data wherever you land.</h4><p className="mt-3 max-w-sm text-base opacity-80">Browse flexible plans for your next trip, then activate in a few taps.</p></div><Globe2 size={92} strokeWidth={1} className="text-lime" /></div></div>
    <div className="mt-5 flex items-center gap-3 rounded-lg bg-card px-5 py-4 text-card-foreground/60"><Search size={20} /> Search destinations or regions</div>
    <div className="mt-5 grid grid-cols-3 gap-4">{[{ icon: "NG", name: "Nigeria", detail: "From $4.50 / GB" }, { icon: "UK", name: "United Kingdom", detail: "Flexible plans" }, { icon: "🌐", name: "Global", detail: "190+ countries" }].map((item) => <div key={item.name} className="rounded-lg bg-card p-5 text-card-foreground"><span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{item.icon}</span><h4 className="mt-4 font-bold">{item.name}</h4><p className="mt-1 text-sm text-card-foreground/50">{item.detail}</p></div>)}</div>
  </>;
}

function TabletDevice({ screen }: { screen: NonNullable<Slide["screen"]> }) {
  return (
    <div className="absolute" style={{ width: 1040, height: 720, top: 247, left: 790 }}>
      <div className="h-full w-full rounded-[35px] border-[9px] border-foreground/85 bg-foreground p-[9px] shadow-[0_50px_90px_-25px_rgba(0,0,0,.55)]">
        <div className="relative flex h-full overflow-hidden rounded-[18px] bg-background text-foreground">
          <div className="flex w-[186px] shrink-0 flex-col border-r border-foreground/10 bg-background px-4 py-6">
            <div className="mb-12 px-2"><img src={wordmark.url} alt="BazePay" className="h-7 w-auto" /></div>
            <div className="space-y-2">{nav.map(({ label, icon: Icon, screen: item }) => <div key={item} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${item === screen ? "bg-primary text-primary-foreground" : "text-foreground/55"}`}><Icon size={19} />{label}</div>)}</div>
            <div className="mt-auto flex items-center gap-2 border-t border-foreground/10 pt-5 text-sm"><span className="flex size-8 items-center justify-center rounded-full bg-lime font-bold text-lime-foreground">A</span>Alex Morgan</div>
          </div>
          <div className="flex-1 overflow-hidden px-7 py-6"><div className="mb-6 flex items-center justify-between border-b border-foreground/10 pb-4 text-sm text-foreground/55"><span>Overview</span><span>● &nbsp; Account active &nbsp; ◉</span></div><ScreenContent screen={screen} /></div>
          <span className="absolute left-1/2 top-1 size-2 -translate-x-1/2 rounded-full bg-foreground/30" />
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
      {slide.screen ? <TabletDevice screen={slide.screen} /> : <Finale />}
      <div className="absolute font-bold" style={{ left: 100, bottom: 64, fontSize: 22, color: "rgba(255,255,255,.72)" }}>{slide.indexLabel} <span style={{ color: LIME, marginLeft: 18 }}>↗</span></div>
    </div>
  );
}

function Store9TabletPage() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-8 text-foreground">
      <h1 className="mb-2 text-2xl font-bold">BazePay — Tablet screenshots · Panorama</h1>
      <p className="mb-6 text-muted-foreground">6 landscape slides · 1920 × 1080 each · previewed at half size</p>
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