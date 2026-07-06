import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
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
      { title: "BazePay — Bank without borders" },
      {
        name: "description",
        content:
          "Multi-currency wallet, instant Naira virtual cards, bill payments and travel eSIM — built for the Nigerian diaspora.",
      },
      { property: "og:title", content: "BazePay — Bank without borders" },
      {
        property: "og:description",
        content:
          "Multi-currency wallet, instant Naira virtual cards, bill payments and travel eSIM — built for the Nigerian diaspora.",
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
      <Send />
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
          <a href="#send" className="hover:text-foreground transition">Send</a>
          <a href="#pay" className="hover:text-foreground transition">Pay</a>
          <a href="#stats" className="hover:text-foreground transition">Numbers</a>
        </nav>
        <Link
          to="/onboarding"
          className="group inline-flex items-center gap-1.5 h-10 pl-4 pr-2 rounded-full bg-lime text-lime-foreground font-semibold text-sm hover:scale-[1.02] active:scale-95 transition"
        >
          Open app
          <span className="w-7 h-7 rounded-full bg-background text-lime flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
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

/* ------------------------------ HERO ----------------------------- */
function Hero() {
  return (
    <section className="relative">
      {/* ambient */}
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
            Live in 12 countries · KYC in 3 minutes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display font-bold tracking-[-0.04em] leading-[0.92] mt-6 text-[16vw] md:text-[104px]"
          >
            Bank
            <br />
            without <span className="italic font-medium text-lime">borders.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base md:text-lg text-foreground/65 leading-relaxed"
          >
            One account for Naira, Dollars, Euros and Pounds. Send home in seconds,
            pay bills, spin virtual cards and travel with instant eSIM — all from
            your phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/onboarding"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-lime text-lime-foreground font-semibold hover:scale-[1.02] active:scale-95 transition"
            >
              Get the app
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 bg-white/[0.03] font-semibold text-foreground/85 hover:bg-white/[0.06] transition"
            >
              How it works
            </a>
          </motion.div>

          <div className="mt-10 flex items-center gap-4">
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
              <span className="text-foreground font-semibold">40,000+</span> Nigerians
              abroad already moving money with BazePay.
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
      {/* notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />

      <div className="absolute inset-0 rounded-[2.2rem] overflow-hidden">
        {/* app top */}
        <div className="pt-10 px-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-foreground/45">Total balance</p>
              <p className="font-display text-4xl font-bold mt-1.5">
                ₦845,320<span className="text-foreground/40">.50</span>
              </p>
              <p className="text-[10px] text-foreground/45 mt-1">≈ $548.20</p>
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

        {/* sheet */}
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

      {/* floating card */}
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
          <ArrowUpRight className="w-3 h-3 text-lime-foreground" />
        </div>
        <div>
          <p className="text-[9px] font-semibold text-lime-foreground/60 leading-none">Sent</p>
          <p className="text-xs font-bold text-lime-foreground leading-tight">₦120,000</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------- MARQUEE ---------------------------- */
function Marquee() {
  const items = [
    "Naira", "Dollars", "Euros", "Pounds", "Virtual cards", "eSIM", "Airtime",
    "Electricity", "Cable TV", "Betting", "Data", "Instant transfers",
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
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime">Everything you need</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.03em] mt-3 max-w-2xl leading-[1]">
            One app. All your money moves.
          </h2>
        </div>
        <p className="hidden md:block max-w-xs text-sm text-foreground/60">
          From your first Naira transfer to a euro card in Paris — BazePay handles it.
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4 auto-rows-[180px]">
        {/* Big — Multi-currency */}
        <div className="col-span-6 md:col-span-4 row-span-2 rounded-3xl bg-gradient-primary p-8 relative overflow-hidden">
          <Globe2 className="absolute -right-10 -bottom-10 w-64 h-64 text-primary-foreground/10" strokeWidth={1} />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/70">
            Multi-currency wallet
          </span>
          <h3 className="font-display font-bold text-3xl md:text-4xl mt-3 text-primary-foreground leading-tight max-w-md">
            Hold Naira, Dollars, Euros and Pounds in a single account.
          </h3>
          <div className="mt-8 flex flex-wrap gap-2">
            {["₦ NGN", "$ USD", "€ EUR", "£ GBP"].map((c) => (
              <span
                key={c}
                className="h-9 px-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center text-sm font-semibold text-primary-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="col-span-6 md:col-span-2 row-span-2 rounded-3xl bg-white/[0.04] border border-white/10 p-6 relative overflow-hidden">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/50">
            Virtual cards
          </span>
          <h3 className="font-display font-bold text-2xl mt-2 leading-tight">
            Naira cards that work everywhere online.
          </h3>
          <div className="absolute bottom-6 left-6 right-6 h-40 rounded-2xl bg-gradient-primary p-4 shadow-[0_20px_40px_-15px_oklch(0.55_0.24_280/0.6)] rotate-[-4deg]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-semibold text-primary-foreground/80 tracking-wider">BAZEPAY</span>
              <CreditCard className="w-4 h-4 text-primary-foreground/80" />
            </div>
            <p className="font-display text-primary-foreground text-lg tracking-[0.15em] mt-10">
              •• •• 4421
            </p>
          </div>
        </div>

        {/* Speed */}
        <div className="col-span-3 md:col-span-2 rounded-3xl bg-lime text-lime-foreground p-6 relative overflow-hidden">
          <Zap className="w-7 h-7" fill="currentColor" />
          <p className="font-display font-bold text-2xl mt-3 leading-tight">
            Transfers land in 30s.
          </p>
          <p className="text-xs text-lime-foreground/70 mt-1">To any Nigerian bank.</p>
        </div>

        {/* Security */}
        <div className="col-span-3 md:col-span-2 rounded-3xl bg-white/[0.04] border border-white/10 p-6">
          <ShieldCheck className="w-7 h-7 text-lime" />
          <p className="font-display font-bold text-2xl mt-3 leading-tight">
            Bank-grade security.
          </p>
          <p className="text-xs text-foreground/55 mt-1">Biometrics · PIN · 2FA.</p>
        </div>

        {/* eSIM */}
        <div className="col-span-6 md:col-span-2 rounded-3xl bg-white/[0.04] border border-white/10 p-6 relative overflow-hidden">
          <Wifi className="w-7 h-7" style={{ color: "var(--service-esim)" }} />
          <p className="font-display font-bold text-2xl mt-3 leading-tight">
            Travel eSIM in 60s.
          </p>
          <p className="text-xs text-foreground/55 mt-1">120+ countries, pay-as-you-go.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SEND ----------------------------- */
function Send() {
  return (
    <section id="send" className="relative max-w-7xl mx-auto px-5 md:px-10 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime">Send home</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.03em] mt-3 leading-[1]">
            The fastest way to
            <br />
            <span className="italic font-medium text-lime">send Naira.</span>
          </h2>
          <p className="mt-5 text-foreground/60 max-w-md leading-relaxed">
            No routing numbers, no wire fees, no waiting three business days.
            Type a Nigerian account, confirm the name, and it's done.
          </p>

          <div className="mt-8 space-y-3">
            {[
              ["10-digit lookup", "Instant name resolution across every Nigerian bank."],
              ["Live FX rates", "Convert USD → NGN at rates you can watch update."],
              ["No hidden fees", "One transparent charge. That's the whole thing."],
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

        {/* mock transfer card */}
        <div className="relative">
          <div className="absolute inset-0 -m-8 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative rounded-3xl bg-card text-card-foreground p-6 shadow-[0_40px_100px_-30px_oklch(0.55_0.24_280/0.6)]">
            <p className="text-xs text-card-foreground/60">Send money</p>
            <p className="font-display font-bold text-4xl mt-2">
              ₦120,000<span className="text-card-foreground/40">.00</span>
            </p>
            <p className="text-xs text-card-foreground/50 mt-1">≈ $77.82 · GTBank</p>

            <div className="mt-6 rounded-2xl bg-card-foreground/[0.04] p-4">
              <p className="text-[11px] font-semibold text-card-foreground/60 uppercase tracking-wide">To</p>
              <p className="font-semibold mt-1">Chidera Okafor</p>
              <div className="mt-3 grid grid-cols-10 gap-1.5">
                {"0234567891".split("").map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="font-display text-lg font-bold">{d}</span>
                    <span className="h-[2px] w-full rounded-full bg-primary" />
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-6 w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold">
              Send ₦120,000
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
    { i: Phone, c: "var(--service-airtime)", l: "Airtime", d: "All networks" },
    { i: Zap, c: "var(--service-electricity)", l: "Electricity", d: "Every DISCO" },
    { i: Tv, c: "var(--service-cable)", l: "Cable TV", d: "DStv · GOtv · Startimes" },
  ];
  return (
    <section id="pay" className="max-w-7xl mx-auto px-5 md:px-10 py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lime">Bills, sorted</p>
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-[-0.03em] mt-3 leading-[1]">
          Pay everything back home — in one tap.
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
    ["₦8.2B", "Moved monthly"],
    ["12", "Countries"],
    ["4.9★", "App store rating"],
  ];
  return (
    <section id="stats" className="max-w-7xl mx-auto px-5 md:px-10 py-24">
      <div className="rounded-[2.5rem] bg-gradient-primary p-10 md:p-16 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-lime/20 blur-3xl" />
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">By the numbers</p>
        <h2 className="font-display font-bold text-primary-foreground text-4xl md:text-6xl tracking-[-0.03em] mt-3 max-w-2xl leading-[1]">
          Trusted by Nigerians on every continent.
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(([n, l]) => (
            <div key={l}>
              <p className="font-display font-bold text-primary-foreground text-5xl md:text-6xl tracking-[-0.04em]">
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
        <h2 className="relative font-display font-bold text-5xl md:text-8xl tracking-[-0.04em] mt-4 leading-[0.95]">
          Open your account
          <br />
          in three minutes.
        </h2>
        <Link
          to="/onboarding"
          className="relative mt-10 inline-flex items-center gap-2 h-14 px-8 rounded-full bg-lime-foreground text-lime font-semibold text-base hover:scale-[1.02] active:scale-95 transition"
        >
          Get started free
          <ArrowUpRight className="w-5 h-5" />
        </Link>
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
          <a href="#send" className="hover:text-foreground">Send</a>
          <a href="#pay" className="hover:text-foreground">Pay</a>
          <Link to="/onboarding" className="hover:text-foreground">Open app</Link>
        </div>
        <p className="text-xs text-foreground/40">© {new Date().getFullYear()} BazePay. Bank without borders.</p>
      </div>
    </footer>
  );
}
