import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Wifi,
  Phone,
  Zap,
  Tv,
  CreditCard,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import heroAppHome from "@/assets/hero-app-home.png";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "BazePay v2 — Spend Naira, land ready" },
      {
        name: "description",
        content:
          "An editorial take on BazePay: fund with foreign cards, pay Naira bills, get an eSIM and virtual number before you land.",
      },
      { property: "og:title", content: "BazePay v2 — Spend Naira, land ready" },
      {
        property: "og:description",
        content:
          "Fund with your foreign card. Spend in Naira. Get an eSIM and a Nigerian virtual number — before touchdown.",
      },
    ],
  }),
  component: LandingV2,
});

/* --------------------------- ROOT --------------------------- */
function LandingV2() {
  return (
    <div className="min-h-screen bg-[oklch(0.97_0.01_95)] text-[oklch(0.14_0.02_280)] font-sans overflow-x-hidden">
      <TopBar />
      <Editorial />
      <Ticker />
      <ManifestoRow />
      <FeatureTable />
      <FundStrip />
      <NumbersPress />
      <ClosingSpread />
      <FootLine />
    </div>
  );
}

/* --------------------------- TOP BAR --------------------------- */
function TopBar() {
  return (
    <header className="border-b border-[oklch(0.14_0.02_280)]/15">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-display font-black tracking-tighter text-xl">
            BAZEPAY<span className="text-primary">.</span>
          </Link>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] text-[oklch(0.14_0.02_280)]/50 border-l border-[oklch(0.14_0.02_280)]/20 pl-3">
            Vol. II · Ed. 2026
          </span>
        </div>
        <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.18em] font-semibold">
          <Link to="/" className="hidden md:inline hover:opacity-60 transition">
            ← v1
          </Link>
          <a href="#download" className="hover:opacity-60 transition">Get the app</a>
        </div>
      </div>
    </header>
  );
}

/* --------------------------- EDITORIAL HERO --------------------------- */
function Editorial() {
  return (
    <section className="relative border-b border-[oklch(0.14_0.02_280)]/15">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-8 md:pt-14 pb-14 md:pb-24">
        {/* dateline */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[oklch(0.14_0.02_280)]/55 font-semibold">
          <span>Issue №01 · Naira spending, no bank account</span>
          <span className="hidden md:inline">Lagos · Abuja · London · Toronto</span>
        </div>

        <div className="mt-6 md:mt-10 grid md:grid-cols-12 gap-8 md:gap-10 items-end">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-8"
          >
            <h1 className="font-display font-black tracking-[-0.04em] leading-[0.85] text-[16vw] md:text-[10.5rem]">
              Spend
              <br />
              <span className="italic font-medium text-primary">Naira</span>,
              <br />
              land <span className="underline decoration-lime decoration-[10px] underline-offset-[10px]">ready</span>.
            </h1>
            <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-relaxed text-[oklch(0.14_0.02_280)]/75">
              A wallet for the diaspora, the visitor, the founder-in-transit.
              Fund with your foreign Visa, Mastercard or Amex. Pay bills, top up
              airtime, buy an eSIM and a Nigerian virtual number before you clear
              customs.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#download"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-none bg-[oklch(0.14_0.02_280)] text-[oklch(0.97_0.01_95)] font-semibold text-sm hover:-translate-y-0.5 transition"
              >
                Download the app <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#read"
                className="inline-flex items-center gap-2 h-12 px-5 border border-[oklch(0.14_0.02_280)] text-[oklch(0.14_0.02_280)] font-semibold text-sm hover:bg-[oklch(0.14_0.02_280)] hover:text-[oklch(0.97_0.01_95)] transition"
              >
                Read the manifesto
              </a>
            </div>
          </motion.div>

          {/* Sidebar figure */}
          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-4 relative"
          >
            <div className="relative bg-[oklch(0.14_0.02_280)] p-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[oklch(0.97_0.01_95)]/60 font-semibold">
                <span>Fig. 01</span>
                <span>Live · 09:14</span>
              </div>
              <div className="mt-4 rounded-[1.6rem] overflow-hidden border-[6px] border-black bg-black">
                <img
                  src={heroAppHome}
                  alt="BazePay Naira wallet"
                  className="w-full h-auto block"
                  draggable={false}
                />
              </div>
              <p className="mt-4 text-[oklch(0.97_0.01_95)]/70 text-[11px] leading-relaxed">
                The Naira balance updates the instant your card clears.
                Bills, cable, data — one tap. No handshake with a Nigerian bank.
              </p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-lime text-lime-foreground font-display font-black text-xs px-3 py-2 tracking-widest rotate-[-4deg]">
              INSTANT · LIVE
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TICKER --------------------------- */
function Ticker() {
  const items = [
    "₦1.00 = live FX",
    "eSIM in 90 seconds",
    "Nigerian virtual number",
    "Fund with Visa · Mastercard · Amex",
    "No BVN. No NIN. No bank.",
    "Airtime · Data · Power · Cable",
    "Diaspora ready",
  ];
  const loop = [...items, ...items];
  return (
    <section className="border-b border-[oklch(0.14_0.02_280)]/15 bg-lime text-lime-foreground py-3 overflow-hidden">
      <motion.div
        className="flex gap-10 whitespace-nowrap font-display font-black text-xl tracking-tight"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{t}</span>
            <span className="opacity-40">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------- MANIFESTO ROW --------------------------- */
function ManifestoRow() {
  return (
    <section id="read" className="border-b border-[oklch(0.14_0.02_280)]/15">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-[oklch(0.14_0.02_280)]/55">
          §I · Manifesto
        </div>
        <div className="md:col-span-9">
          <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight">
            A Nigerian bank account should not be the price of{" "}
            <span className="italic text-primary">belonging</span>. BazePay is
            the shortcut for anyone who spends here without living here — the
            visitor, the student, the diaspora sending nothing but themselves.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-sm text-[oklch(0.14_0.02_280)]/75">
            <p>
              <strong className="text-[oklch(0.14_0.02_280)] font-display font-black block mb-1">
                No paperwork.
              </strong>
              Skip the BVN, NIN and utility-bill scavenger hunt. Onboard with a
              passport and a selfie.
            </p>
            <p>
              <strong className="text-[oklch(0.14_0.02_280)] font-display font-black block mb-1">
                No wait.
              </strong>
              Your foreign card funds a Naira balance in seconds. Spend on the
              plane, land connected.
            </p>
            <p>
              <strong className="text-[oklch(0.14_0.02_280)] font-display font-black block mb-1">
                No middleman.
              </strong>
              Bills, airtime, data, cable, betting — direct to biller, no cash
              swaps at the airport.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- FEATURE TABLE --------------------------- */
function FeatureTable() {
  const rows = [
    {
      no: "01",
      title: "Naira wallet",
      desc: "Fund with Visa, Mastercard, Amex. Live FX, no hidden spread.",
      icon: CreditCard,
    },
    {
      no: "02",
      title: "Bills, in Naira",
      desc: "Airtime, data, electricity, cable, betting. One tap, direct to biller.",
      icon: Zap,
    },
    {
      no: "03",
      title: "eSIM at arrival",
      desc: "Nigerian data plan activated before wheels down. No SIM shopping.",
      icon: Wifi,
    },
    {
      no: "04",
      title: "Virtual +234 number",
      desc: "A real Nigerian phone number for banks, Uber, Chowdeck, WhatsApp.",
      icon: Phone,
    },
    {
      no: "05",
      title: "Global by default",
      desc: "Built for Lagos, Abuja, London, Toronto, Houston, Berlin.",
      icon: Globe2,
    },
    {
      no: "06",
      title: "Passport-grade KYC",
      desc: "Selfie plus passport. Encrypted, revocable, yours.",
      icon: ShieldCheck,
    },
  ];
  return (
    <section id="features" className="border-b border-[oklch(0.14_0.02_280)]/15">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="flex items-end justify-between border-b-2 border-[oklch(0.14_0.02_280)] pb-6">
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-none">
            The <span className="italic text-primary">index</span>.
          </h2>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[oklch(0.14_0.02_280)]/55">
            §II · What&rsquo;s inside
          </span>
        </div>

        <div>
          {rows.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.no}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group grid grid-cols-12 gap-4 py-6 md:py-8 border-b border-[oklch(0.14_0.02_280)]/20 hover:bg-[oklch(0.14_0.02_280)] hover:text-[oklch(0.97_0.01_95)] transition-colors"
              >
                <div className="col-span-2 md:col-span-1 font-display font-black text-lg opacity-40">
                  {r.no}
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="font-display font-black text-2xl md:text-4xl tracking-tight">
                    {r.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 text-sm md:text-base leading-relaxed opacity-80">
                  {r.desc}
                </div>
                <div className="col-span-12 md:col-span-1 flex md:justify-end items-start">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- FUND STRIP --------------------------- */
function FundStrip() {
  return (
    <section id="fund" className="bg-[oklch(0.14_0.02_280)] text-[oklch(0.97_0.01_95)]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold opacity-60">
            §III · Fund
          </p>
          <h2 className="mt-4 font-display font-black text-5xl md:text-8xl leading-[0.9] tracking-tight">
            Your card.
            <br />
            <span className="italic font-medium text-lime">Our rails.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[oklch(0.97_0.01_95)]/70 text-base md:text-lg leading-relaxed">
            We accept the cards Nigerian banks never issued you. Add money in
            USD, GBP, EUR or CAD — see it land in Naira at a rate that isn&rsquo;t a
            surprise.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold">
            {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Bank transfer"].map((c) => (
              <span key={c} className="border border-[oklch(0.97_0.01_95)]/25 px-3 py-1.5">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 space-y-3">
          <FxRow flag="🇺🇸" code="USD" pair="1 USD → ₦1,542.20" delta="+0.12%" positive />
          <FxRow flag="🇬🇧" code="GBP" pair="1 GBP → ₦1,969.05" delta="+0.34%" positive />
          <FxRow flag="🇪🇺" code="EUR" pair="1 EUR → ₦1,671.44" delta="-0.08%" positive={false} />
          <FxRow flag="🇨🇦" code="CAD" pair="1 CAD → ₦1,128.60" delta="+0.21%" positive />
        </div>
      </div>
    </section>
  );
}

function FxRow({
  flag,
  code,
  pair,
  delta,
  positive,
}: {
  flag: string;
  code: string;
  pair: string;
  delta: string;
  positive: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[oklch(0.97_0.01_95)]/15 py-4">
      <div className="flex items-center gap-4">
        <span className="text-2xl leading-none">{flag}</span>
        <div>
          <p className="font-display font-black tracking-tight">{code}</p>
          <p className="text-xs opacity-60">{pair}</p>
        </div>
      </div>
      <div
        className={`flex items-center gap-1.5 text-xs font-bold ${
          positive ? "text-lime" : "text-[oklch(0.75_0.18_25)]"
        }`}
      >
        {positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
        {delta}
      </div>
    </div>
  );
}

/* --------------------------- NUMBERS (PRESS) --------------------------- */
function NumbersPress() {
  const stats = [
    { k: "₦4.1B", v: "moved through BazePay wallets" },
    { k: "180+", v: "countries funding into Naira" },
    { k: "90s", v: "median time from signup to first payment" },
    { k: "0", v: "Nigerian bank accounts required" },
  ];
  return (
    <section id="stats" className="border-b border-[oklch(0.14_0.02_280)]/15">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-4 gap-y-10 md:gap-x-10">
          {stats.map((s, i) => (
            <div key={i} className="border-t-2 border-[oklch(0.14_0.02_280)] pt-4">
              <p className="font-display font-black text-5xl md:text-7xl tracking-tighter leading-none">
                {s.k}
              </p>
              <p className="mt-3 text-sm text-[oklch(0.14_0.02_280)]/70 max-w-[18ch]">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- CLOSING SPREAD --------------------------- */
function ClosingSpread() {
  return (
    <section id="download" className="relative border-b border-[oklch(0.14_0.02_280)]/15">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-32 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[oklch(0.14_0.02_280)]/55 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> §IV · Colophon
          </p>
          <h2 className="mt-4 font-display font-black text-6xl md:text-[10rem] leading-[0.85] tracking-tight">
            Land <span className="italic text-primary">already</span>
            <br />
            <span className="bg-lime text-lime-foreground px-3">spending.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base md:text-lg text-[oklch(0.14_0.02_280)]/75 leading-relaxed">
            Download BazePay. Fund it before your flight. Buy your eSIM at the
            gate, your Uber before baggage claim, your first jollof before the
            trunk closes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-3 h-14 px-6 bg-[oklch(0.14_0.02_280)] text-[oklch(0.97_0.01_95)] font-semibold hover:-translate-y-0.5 transition"
            >
              <span className="text-left leading-none">
                <span className="block text-[10px] opacity-60">Download on the</span>
                <span className="block text-base font-black mt-1">App Store</span>
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 h-14 px-6 border border-[oklch(0.14_0.02_280)] font-semibold hover:bg-[oklch(0.14_0.02_280)] hover:text-[oklch(0.97_0.01_95)] transition"
            >
              <span className="text-left leading-none">
                <span className="block text-[10px] opacity-60">Get it on</span>
                <span className="block text-base font-black mt-1">Google Play</span>
              </span>
            </a>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="border-2 border-[oklch(0.14_0.02_280)] p-6 relative">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold">Quick pay</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { i: Wifi, l: "eSIM" },
                { i: Phone, l: "Airtime" },
                { i: Zap, l: "Power" },
                { i: Tv, l: "Cable" },
              ].map((s, i) => {
                const Icon = s.i;
                return (
                  <div
                    key={i}
                    className="aspect-square border border-[oklch(0.14_0.02_280)]/25 flex flex-col items-center justify-center gap-2 hover:bg-[oklch(0.14_0.02_280)] hover:text-[oklch(0.97_0.01_95)] transition"
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.6} />
                    <span className="text-xs font-semibold">{s.l}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] font-semibold border-t border-[oklch(0.14_0.02_280)]/20 pt-3">
              <span>Live · biller-direct</span>
              <Plus className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- FOOT LINE --------------------------- */
function FootLine() {
  return (
    <footer className="max-w-[1400px] mx-auto px-5 md:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] font-semibold text-[oklch(0.14_0.02_280)]/60">
      <span>© BazePay · Naira, unlocked.</span>
      <div className="flex gap-6">
        <a href="#" className="hover:text-[oklch(0.14_0.02_280)] transition">Privacy</a>
        <a href="#" className="hover:text-[oklch(0.14_0.02_280)] transition">Terms</a>
        <a href="#" className="hover:text-[oklch(0.14_0.02_280)] transition">Press</a>
        <Link to="/" className="hover:text-[oklch(0.14_0.02_280)] transition">v1 →</Link>
      </div>
    </footer>
  );
}
