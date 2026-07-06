import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Globe2,
  ShieldCheck,
  Zap,
  CreditCard,
  Wifi,
  Phone,
  Tv,
  Plus,
  ArrowLeftRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BazePay — Naira spending, no Nigerian bank account" },
      {
        name: "description",
        content:
          "Fund with your foreign Visa, Mastercard or Amex. Spend in Naira, pay bills, get an eSIM and a Nigerian virtual number — before you even land.",
      },
      { property: "og:title", content: "BazePay — Naira spending, no Nigerian bank account" },
      {
        property: "og:description",
        content:
          "Fund with your foreign Visa, Mastercard or Amex. Spend in Naira, pay bills, get an eSIM and a Nigerian virtual number — before you even land.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Bento />
      <Fund />
      <QuickPay />
      <Stats />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ------------------------------ NAV ------------------------------ */
function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 h-16">
        <BrandMark />
        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#fund" className="hover:text-foreground transition">Fund</a>
          <a href="#pay" className="hover:text-foreground transition">Pay</a>
          <a href="#stats" className="hover:text-foreground transition">Numbers</a>
        </nav>
        <a
          href="#download"
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-lime text-lime-foreground font-semibold text-sm hover:scale-[1.02] active:scale-95 transition"
        >
          Download
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-lg shadow-[0_10px_30px_-10px_oklch(0.55_0.24_280/0.7)]">
        B
      </div>
      <span className="font-display font-bold text-xl tracking-tight">BazePay</span>
    </Link>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.366l2.807 1.626a1 1 0 0 1 0 1.738l-2.808 1.626L15.206 12l2.492-2.659zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
  );
}

/* ------------------------- STORE BUTTONS ------------------------- */
function StoreButtons({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark";
  const base = isDark
    ? "bg-white text-background hover:bg-white/90"
    : "bg-lime-foreground text-lime hover:bg-lime-foreground/90";
  const subColor = isDark ? "text-background/60" : "text-lime/70";
  return (
    <div className="flex items-center gap-3">
      <a
        href="#"
        className={`group inline-flex items-center gap-2.5 h-12 pl-3.5 pr-5 rounded-2xl font-semibold transition ${base}`}
      >
        <Apple className="w-6 h-6" fill="currentColor" />
        <div className="text-left leading-none">
          <p className={`text-[10px] font-medium ${subColor}`}>Download on the</p>
          <p className="text-sm font-bold mt-0.5">App Store</p>
        </div>
      </a>
      <a
        href="#"
        className={`group inline-flex items-center gap-2.5 h-12 pl-3.5 pr-5 rounded-2xl font-semibold transition ${base}`}
      >
        <GooglePlayIcon className="w-6 h-6" />
        <div className="text-left leading-none">
          <p className={`text-[10px] font-medium ${subColor}`}>Get it on</p>
          <p className="text-sm font-bold mt-0.5">Google Play</p>
        </div>
      </a>
    </div>
  );
}

/* ------------------------------ HERO ----------------------------- */
function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -right-20 w-[420px] h-[420px] rounded-full bg-lime/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-semibold tracking-wide uppercase text-foreground/70"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            No BVN · No NIN · No Nigerian bank
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display font-bold tracking-[-0.04em] leading-[0.92] mt-6 text-[52px] sm:text-[72px] md:text-[92px]"
          >
            Spend Naira.
            <br />
            Skip the <span className="italic font-medium text-lime">bank.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base md:text-lg text-foreground/65 leading-relaxed"
          >
            Fund with your foreign Visa, Mastercard or Amex — pay vendors, settle
            bills and transfer to any Nigerian bank. Land with an eSIM and a local
            number already active on your phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            id="download"
            className="mt-8"
          >
            <StoreButtons variant="dark" />
          </motion.div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["#CBFD5B", "#5C4DFB", "#E07A4F", "#1DB954"].map((c) => (
                <div
                  key={c}
                  className="w-8 h-8 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p className="text-xs text-foreground/55">
              <span className="text-foreground font-semibold">40,000+</span>{" "}
              travelers and diaspora already spending Naira with BazePay.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="relative mx-auto w-[280px] md:w-[320px] h-[580px] md:h-[640px] rounded-[3rem] border-[10px] border-black bg-background shadow-[0_40px_120px_-30px_oklch(0.55_0.24_280/0.7)]"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />

      <div className="absolute inset-0 rounded-[2.2rem] overflow-hidden">
        <div className="pt-10 px-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/45">Naira balance</p>
              <p className="font-display text-4xl font-bold mt-1.5">
                ₦845,320<span className="text-foreground/40">.50</span>
              </p>
              <p className="text-[10px] text-foreground/45 mt-1">Funded via •• 4421</p>
            </div>
            <div className="h-7 px-2.5 rounded-full bg-white/10 flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="w-4 h-4 rounded-full bg-lime" />
              NGN
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="h-10 rounded-full bg-lime text-lime-foreground flex items-center justify-center gap-1.5 text-xs font-semibold">
              <Plus className="w-3.5 h-3.5" /> Top up
            </div>
            <div className="h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center gap-1.5 text-xs font-semibold">
              <ArrowLeftRight className="w-3.5 h-3.5" /> Transfer
            </div>
          </div>
        </div>

        <div className="mt-5 bg-card text-card-foreground rounded-t-[2rem] px-5 pt-5 pb-6 h-[340px]">
          <p className="font-display font-bold text-sm">Quick pay</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              { i: Wifi, c: "var(--service-esim)", l: "eSIM" },
              { i: Phone, c: "var(--service-airtime)", l: "Airtime" },
              { i: Zap, c: "var(--service-electricity)", l: "Power" },
              { i: Tv, c: "var(--service-cable)", l: "Cable" },
            ].map((s, idx) => {
              const Icon = s.i;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-full aspect-square rounded-xl flex items-center justify-center"
                    style={{ background: `color-mix(in oklab, ${s.c} 14%, transparent)` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: s.c }} strokeWidth={2.2} />
                  </div>
                  <span className="text-[9px] font-medium">{s.l}</span>
                </div>
              );
            })}
          </div>

          <p className="font-display font-bold text-sm mt-5">Recent</p>
          <div className="mt-2.5 space-y-2.5">
            {[
              { n: "Top up · Visa •• 4421", t: "09:14", a: "+₦250,000", bg: "#E0E7FF", fg: "#5C4DFB", ini: "TU", pos: true },
              { n: "MTN Airtime", t: "08:02", a: "-₦5,000", bg: "#FFE4D6", fg: "#E07A4F", ini: "MT", pos: false },
            ].map((t) => (
              <div key={t.n} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: t.bg, color: t.fg }}
                >
                  {t.ini}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold truncate">{t.n}</p>
                  <p className="text-[9px] text-card-foreground/50">{t.t}</p>
                </div>
                <p className={`text-[11px] font-bold ${t.pos ? "text-primary" : ""}`}>
                  {t.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden md:block absolute -right-20 top-20 w-56 h-32 rounded-2xl bg-gradient-primary p-4 shadow-[0_30px_60px_-20px_oklch(0.55_0.24_280/0.7)] rotate-6"
      >
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-semibold text-primary-foreground/80 tracking-wider">
            BAZEPAY
          </span>
          <CreditCard className="w-4 h-4 text-primary-foreground/80" />
        </div>
        <p className="mt-6 font-display text-primary-foreground text-sm tracking-[0.15em]">
          •• 4421
        </p>
        <p className="mt-1 text-[10px] text-primary-foreground/70">Virtual · Naira</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -40, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hidden md:flex absolute -left-16 bottom-32 h-12 px-4 rounded-full bg-lime items-center gap-2 shadow-[0_20px_40px_-15px_oklch(0.93_0.19_125/0.5)] -rotate-6"
      >
        <div className="w-6 h-6 rounded-full bg-lime-foreground/10 flex items-center justify-center">
          <Wifi className="w-3 h-3 text-lime-foreground" />
        </div>
        <div>
          <p className="text-[9px] font-semibold text-lime-foreground/60 leading-none">eSIM live</p>
          <p className="text-xs font-bold text-lime-foreground leading-tight">🇳🇬 Lagos</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------- MARQUEE ---------------------------- */
function Marquee() {
  const items = [
    "No BVN", "No NIN", "Foreign card top-up", "Naira wallet", "Virtual cards",
    "eSIM", "Nigerian number", "Airtime", "Electricity", "Cable TV", "Data",
    "Transfer to any bank",
  ];
  const track = [...items, ...items];
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-6 overflow-hidden">
      <div className="flex gap-10 whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {track.map((t, i) => (
          <div key={i} className="flex items-center gap-10 text-2xl md:text-3xl font-display font-bold text-foreground/40">
            <span>{t}</span>
            <span className="text-lime">✦</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

/* ----------------------------- BENTO ----------------------------- */
function Bento() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-5 md:px-10 py-24">
      <div className="flex items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime">Built for travelers</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-[-0.03em] mt-3 max-w-2xl leading-[1.05]">
            Everything you need in Nigeria — none of the paperwork.
          </h2>
        </div>
        <p className="hidden md:block max-w-xs text-sm text-foreground/60">
          Skip the BVN, the queue at GTB, and the SIM-swap at the airport.
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4 auto-rows-[180px]">
        <div className="col-span-6 md:col-span-4 row-span-2 rounded-3xl bg-gradient-primary p-8 relative overflow-hidden">
          <Globe2 className="absolute -right-10 -bottom-10 w-64 h-64 text-primary-foreground/10" strokeWidth={1} />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/70">
            No Nigerian bank required
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mt-3 text-primary-foreground leading-tight max-w-md">
            Top up in your currency. Spend in Naira instantly.
          </h3>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Visa", "Mastercard", "Amex", "Apple Pay"].map((c) => (
              <span
                key={c}
                className="h-9 px-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center text-sm font-semibold text-primary-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-6 md:col-span-2 row-span-2 rounded-3xl bg-white/[0.04] border border-white/10 p-6 relative overflow-hidden">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/50">
            Virtual cards
          </span>
          <h3 className="font-display font-bold text-2xl mt-2 leading-tight">
            Naira cards for online spending.
          </h3>
          <div className="absolute bottom-6 left-6 right-6 h-40 rounded-2xl bg-gradient-primary p-4 shadow-[0_20px_40px_-15px_oklch(0.55_0.24_278/0.6)] rotate-[-4deg]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-semibold text-primary-foreground/80 tracking-wider">BAZEPAY</span>
              <CreditCard className="w-4 h-4 text-primary-foreground/80" />
            </div>
            <p className="font-display text-primary-foreground text-lg tracking-[0.15em] mt-10">
              •• •• 4421
            </p>
          </div>
        </div>

        <div className="col-span-3 md:col-span-2 rounded-3xl bg-lime text-lime-foreground p-6 relative overflow-hidden">
          <Wifi className="w-7 h-7" />
          <p className="font-display font-bold text-2xl mt-3 leading-tight">
            eSIM before you land.
          </p>
          <p className="text-xs text-lime-foreground/70 mt-1">Online the second you touch down.</p>
        </div>

        <div className="col-span-3 md:col-span-2 rounded-3xl bg-white/[0.04] border border-white/10 p-6">
          <Phone className="w-7 h-7 text-lime" />
          <p className="font-display font-bold text-2xl mt-3 leading-tight">
            Nigerian number.
          </p>
          <p className="text-xs text-foreground/55 mt-1">Receive OTPs, no SIM swap.</p>
        </div>

        <div className="col-span-6 md:col-span-2 rounded-3xl bg-white/[0.04] border border-white/10 p-6 relative overflow-hidden">
          <ShieldCheck className="w-7 h-7" style={{ color: "var(--service-esim)" }} />
          <p className="font-display font-bold text-2xl mt-3 leading-tight">
            Freeze in one tap.
          </p>
          <p className="text-xs text-foreground/55 mt-1">Biometrics · PIN · 2FA.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FUND ----------------------------- */
function Fund() {
  return (
    <section id="fund" className="relative max-w-7xl mx-auto px-5 md:px-10 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime">Foreign card in, Naira out</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-[-0.03em] mt-3 leading-[1.05]">
            Load your wallet
            <br />
            <span className="italic font-medium text-lime">from anywhere.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-md leading-relaxed">
            Tap your foreign card, we handle the FX at fair rates, and Naira
            lands in your wallet in seconds. From there — pay vendors, settle
            bills, or send to any Nigerian bank.
          </p>

          <div className="mt-8 space-y-3">
            {[
              ["Fair FX, no surprises", "See the exact rate before you top up."],
              ["Any foreign card", "Visa, Mastercard, Amex — from any country."],
              ["Move it anywhere", "Transfer to any Nigerian bank in seconds."],
            ].map(([t, d]) => (
              <div key={t} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-lime flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-foreground" />
                </div>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="text-sm text-foreground/55">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -m-8 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative rounded-3xl bg-card text-card-foreground p-6 shadow-[0_40px_100px_-30px_oklch(0.55_0.24_278/0.6)]">
            <p className="text-xs text-card-foreground/60">Top up</p>
            <p className="font-display font-bold text-4xl mt-2">
              $250<span className="text-card-foreground/40">.00</span>
            </p>
            <p className="text-xs text-card-foreground/50 mt-1">You get ≈ ₦385,750 · rate 1,543</p>

            <div className="mt-6 rounded-2xl bg-card-foreground/[0.04] p-4">
              <p className="text-[11px] font-semibold text-card-foreground/60 uppercase tracking-wide">From</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-gradient-to-br from-[#1a1f71] to-[#3b4bcf] flex items-center justify-center text-[10px] font-bold text-white italic">
                  VISA
                </div>
                <div>
                  <p className="font-semibold text-sm">•• 4421</p>
                  <p className="text-[10px] text-card-foreground/50">Expires 08/28</p>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-card-foreground/[0.04] p-4">
              <p className="text-[11px] font-semibold text-card-foreground/60 uppercase tracking-wide">To</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-lime flex items-center justify-center text-sm font-bold text-lime-foreground">
                  ₦
                </div>
                <div>
                  <p className="font-semibold text-sm">Naira wallet</p>
                  <p className="text-[10px] text-card-foreground/50">Instant</p>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold">
              Top up $250
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- QUICK PAY -------------------------- */
function QuickPay() {
  const tiles = [
    { i: Wifi, c: "var(--service-esim)", l: "eSIM", d: "120+ countries" },
    { i: Phone, c: "var(--service-airtime)", l: "Airtime", d: "MTN · Glo · Airtel · 9mobile" },
    { i: Zap, c: "var(--service-electricity)", l: "Electricity", d: "Every DISCO" },
    { i: Tv, c: "var(--service-cable)", l: "Cable TV", d: "DStv · GOtv · Startimes" },
  ];
  return (
    <section id="pay" className="max-w-7xl mx-auto px-5 md:px-10 py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime">Bills, sorted</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-[-0.03em] mt-3 leading-[1.05]">
          Pay every bill in Nigeria — in one tap.
        </h2>
      </div>

      <div className="mt-12 grid md:grid-cols-4 gap-4">
        {tiles.map((t, i) => {
          const Icon = t.i;
          return (
            <div
              key={i}
              className="group rounded-3xl bg-white/[0.04] border border-white/10 p-6 hover:bg-white/[0.06] transition h-56 flex flex-col justify-between"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `color-mix(in oklab, ${t.c} 18%, transparent)` }}
              >
                <Icon className="w-6 h-6" style={{ color: t.c }} strokeWidth={2.2} />
              </div>
              <div>
                <p className="font-display font-bold text-xl">{t.l}</p>
                <p className="text-sm text-foreground/50 mt-0.5">{t.d}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ STATS ---------------------------- */
function Stats() {
  const stats = [
    ["40k+", "Active users"],
    ["3 min", "Sign-up, no paperwork"],
    ["12", "Countries funding from"],
    ["4.9★", "App store rating"],
  ];
  return (
    <section id="stats" className="max-w-7xl mx-auto px-5 md:px-10 py-24">
      <div className="rounded-[2.5rem] bg-gradient-primary p-10 md:p-16 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-lime/20 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">By the numbers</p>
        <h2 className="font-display font-bold text-primary-foreground text-3xl sm:text-4xl md:text-6xl tracking-[-0.03em] mt-3 max-w-2xl leading-[1.05]">
          Trusted by travelers, tourists and diaspora.
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(([n, l]) => (
            <div key={l}>
              <p className="font-display font-bold text-primary-foreground text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em]">
                {n}
              </p>
              <p className="text-primary-foreground/70 text-sm mt-2">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- FINAL CTA -------------------------- */
function FinalCta() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 pb-24">
      <div className="rounded-[2.5rem] bg-lime text-lime-foreground p-10 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.55_0.245_278/0.15),transparent_60%)]" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-lime-foreground/60">
          Ready?
        </p>
        <h2 className="relative font-display font-bold text-3xl sm:text-5xl md:text-7xl tracking-[-0.04em] mt-4 leading-[1]">
          Download BazePay.
          <br />
          Live in three minutes.
        </h2>
        <div className="relative mt-10 flex justify-center">
          <StoreButtons variant="light" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FOOTER ---------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <BrandMark />
        <div className="flex flex-wrap gap-6 text-sm text-foreground/55">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#fund" className="hover:text-foreground">Fund</a>
          <a href="#pay" className="hover:text-foreground">Pay</a>
          <a href="#download" className="hover:text-foreground">Download</a>
        </div>
        <p className="text-xs text-foreground/40">© {new Date().getFullYear()} BazePay. Naira spending, no bank required.</p>
      </div>
    </footer>
  );
}
