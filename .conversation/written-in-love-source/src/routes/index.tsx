import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, Heart, Music, VolumeX, Send, User, CircleCheck, Home } from "lucide-react";
import floral from "@/assets/floral.png";
import floralSide from "@/assets/floral-side.png";
import envelope from "@/assets/envelope.png";
import rings from "@/assets/rings.jpg";
import church from "@/assets/church.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "King Vincente & Precious Eshun — Wedding Invitation" },
      { name: "description", content: "Join us on Saturday, April 06 at 11:30 AM to celebrate the union of King Vincente & Precious Eshun." },
      { property: "og:title", content: "King Vincente & Precious Eshun — Wedding" },
      { property: "og:description", content: "Two hearts, one journey. You're invited to our wedding celebration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const VIDEO = "LSUR0075KLI";

function WriteOn({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="write-on font-script text-[3.4rem] leading-[1.15] sm:text-7xl md:text-[5.5rem]" style={{ animationDelay: `${delay}s` }}>
      {text}
    </span>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <Heart className="mb-1 h-3 w-3 fill-primary text-primary" />
      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-primary/40 md:w-16" />
        <h2 className="font-script text-5xl text-primary md:text-6xl">{children}</h2>
        <span className="h-px w-10 bg-primary/40 md:w-16" />
      </div>
    </div>
  );
}

function Flourish() {
  return <div className="my-3 text-center text-xl tracking-widest text-gold">~ ❦ ~</div>;
}

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={`wave relative z-10 -my-px ${flip ? "-scale-x-100" : ""}`} aria-hidden>
      <path d="M0,60 C300,10 600,90 900,45 C1140,10 1320,40 1440,25 L1440,90 L0,90 Z" fill="var(--card)" opacity=".5" />
      <path d="M0,58 C300,8 600,88 900,43 C1140,8 1320,38 1440,23" fill="none" stroke="var(--gold)" strokeWidth="2" />
      <path d="M0,70 C320,25 620,95 920,55 C1150,25 1330,50 1440,40" fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".5" />
    </svg>
  );
}

function Reveal({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) el.classList.add("in"); }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <section id={id} ref={ref} className={`reveal relative ${className}`}>{children}</section>;
}

function Polaroid({ src, alt, rot, w, h }: { src: string; alt: string; rot: string; w: number; h: number }) {
  return (
    <div className="float-photo relative z-10 w-44 bg-card p-2 shadow-xl md:w-56" style={{ "--r": rot, transform: `rotate(${rot})` } as React.CSSProperties}>
      <img src={src} alt={alt} loading="lazy" width={w} height={h} className="aspect-[4/3] w-full object-cover" />
    </div>
  );
}

function Index() {
  const [playing, setPlaying] = useState(true);
  const [rsvp, setRsvp] = useState<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [petals, setPetals] = useState<{ l: number; d: number; s: number }[]>([]);
  useEffect(() => setPetals(Array.from({ length: 16 }, () => ({ l: Math.random() * 100, d: Math.random() * 10, s: 9 + Math.random() * 10 }))), []);

  const cmd = (func: string) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");

  // Try autoplay immediately; browsers that block it start on the very first touch/scroll.
  useEffect(() => {
    const kick = () => { cmd("unMute"); cmd("playVideo"); };
    const evs = ["pointerdown", "touchstart", "keydown", "scroll", "wheel"];
    evs.forEach((ev) => window.addEventListener(ev, kick, { once: true, passive: true }));
    return () => evs.forEach((ev) => window.removeEventListener(ev, kick));
  }, []);

  const toggle = () => {
    if (playing) cmd("pauseVideo"); else { cmd("unMute"); cmd("playVideo"); }
    setPlaying(!playing);
  };

  return (
    <main className="wedding-page relative overflow-hidden text-foreground">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.s}s`, animationDelay: `${p.d}s` }} />
      ))}

      <iframe
        ref={frame}
        className="pointer-events-none fixed -left-[9999px] h-1 w-1"
        src={`https://www.youtube.com/embed/${VIDEO}?autoplay=1&start=0&end=33&loop=1&playlist=${VIDEO}&controls=0&enablejsapi=1&playsinline=1`}
        allow="autoplay; encrypted-media"
        title="Wedding music"
      />
      <button onClick={toggle} aria-label="Toggle music"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-primary p-3.5 text-primary-foreground shadow-lg transition hover:scale-110">
        {playing ? <Music className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
      </button>

      {/* HERO */}
      <header id="home" className="relative px-4 pb-14 pt-6 text-center md:pb-20">
        <img src={floral} alt="" width={1024} height={1024} className="sway pointer-events-none absolute -left-12 -top-10 w-[210px] md:-left-10 md:w-[420px]" />
        <img src={floralSide} alt="" width={640} height={1280} className="sway pointer-events-none absolute -right-14 top-40 hidden w-[180px] md:block lg:w-[220px]" />

        <nav className="fade-up relative z-20 mb-14 flex items-center justify-end gap-2 text-xs md:mb-10 md:gap-3 md:text-sm">
          <Home className="h-4 w-4 text-primary" />
          {[["Home", "home"], ["Our Celebration", "celebration"], ["Location", "location"], ["RSVP", "rsvp"]].map(([l, id], i) => (
            <span key={id} className="flex items-center gap-2 md:gap-3">
              {i > 0 && <span className="text-primary/50">•</span>}
              <a href={`#${id}`} className="transition hover:text-primary">{l}</a>
            </span>
          ))}
        </nav>

        <div className="relative z-10 mx-auto max-w-2xl md:pl-24">
          <p className="fade-up text-[0.7rem] uppercase tracking-[0.3em] text-primary md:text-sm">The wedding celebration of</p>
          <Heart className="fade-up mx-auto mt-2 h-3 w-3 fill-primary text-primary" />
          <div className="flex flex-col items-center">
            <WriteOn text="King Vincente" delay={0.5} />
            <div className="fade-up flex items-center gap-4" style={{ animationDelay: "2.6s" }}>
              <span className="h-px w-16 bg-primary/40 md:w-28" />
              <span className="font-script text-5xl text-primary md:text-6xl">&amp;</span>
              <span className="h-px w-16 bg-primary/40 md:w-28" />
            </div>
            <WriteOn text="Precious Eshun" delay={3} />
          </div>

          <div className="fade-up mt-6 grid grid-cols-3 items-start text-left text-sm md:text-base" style={{ animationDelay: "5.4s" }}>
            <div className="flex items-start justify-center gap-2 border-r border-primary/30 px-2">
              <Calendar className="h-5 w-5 shrink-0 text-primary" /><span>April 06<br />Saturday</span>
            </div>
            <div className="flex items-start justify-center gap-2 border-r border-primary/30 px-2">
              <Clock className="h-5 w-5 shrink-0 text-primary" /><span>11:30 AM</span>
            </div>
            <div className="flex items-start justify-center gap-2 px-2">
              <MapPin className="h-5 w-5 shrink-0 text-primary" /><span className="text-xs md:text-sm">Family Praise Assemblies of God, Mariville Homes, Spintex</span>
            </div>
          </div>
          <div className="fade-up" style={{ animationDelay: "5.8s" }}><Flourish /></div>
        </div>
      </header>

      <Wave />

      {/* CELEBRATION */}
      <Reveal id="celebration" className="px-6 py-12 md:py-16">
        <img src={floralSide} alt="" width={640} height={1280} loading="lazy" className="sway pointer-events-none absolute -right-12 top-0 w-28 opacity-90 md:w-40" />
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto">
            <Polaroid src={rings} alt="Wedding rings" rot="-5deg" w={816} h={816} />
            <img src={floral} alt="" width={1024} height={1024} loading="lazy" className="pointer-events-none absolute -bottom-10 -left-10 z-20 w-28 -rotate-90" />
          </div>
          <div className="text-center">
            <Title>Our Celebration</Title>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed">Two hearts, one journey, a lifetime together. Join us as we celebrate the love and union of King Vincente &amp; Precious Eshun.</p>
            <Flourish />
          </div>
        </div>
      </Reveal>

      <Wave flip />

      {/* LOCATION */}
      <Reveal id="location" className="px-6 py-12 md:py-16">
        <img src={floralSide} alt="" width={640} height={1280} loading="lazy" className="sway pointer-events-none absolute -left-12 top-0 w-28 opacity-90 md:w-40" />
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="text-center">
            <Title>Location</Title>
            <p className="mt-4 flex items-start justify-center gap-2 text-lg"><MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" /><span>Family Praise Assemblies of God,<br />Mariville Homes, Spintex</span></p>
            <a href="https://www.google.com/maps/search/?api=1&query=Family+Praise+Assemblies+of+God+Mariville+Homes+Spintex" target="_blank" rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2 text-sm shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
              <MapPin className="h-4 w-4 text-primary" />View on Google Maps
            </a>
          </div>
          <div className="relative mx-auto">
            <Polaroid src={church} alt="Church" rot="4deg" w={928} h={720} />
            <img src={floral} alt="" width={1024} height={1024} loading="lazy" className="pointer-events-none absolute -bottom-10 -left-12 z-20 w-28 -rotate-90" />
          </div>
        </div>
      </Reveal>

      <Wave />

      {/* RSVP */}
      <Reveal id="rsvp" className="px-6 py-12 md:py-16">
        <img src={envelope} alt="" width={1024} height={1024} loading="lazy" className="float-photo pointer-events-none absolute -left-6 top-6 hidden w-56 md:block lg:w-64" />
        <div className="mx-auto max-w-xl text-center md:pl-16">
          <Title>RSVP</Title>
          <p className="mt-2">Kindly confirm your attendance</p>
          {rsvp ? (
            <p className="fade-up mt-8 font-script text-4xl text-primary">Thank you, {rsvp}! ♥</p>
          ) : (
            <form className="mt-6 grid gap-3 sm:grid-cols-2"
              onSubmit={(e) => { e.preventDefault(); setRsvp(new FormData(e.currentTarget).get("name") as string); }}>
              <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
                <User className="h-4 w-4 text-primary" /><input name="name" required placeholder="Your Name" className="w-full bg-transparent outline-none" />
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
                <CircleCheck className="h-4 w-4 text-primary" />
                <select required defaultValue="" className="w-full bg-transparent outline-none">
                  <option value="" disabled>Will you attend?</option>
                  <option>Joyfully accept</option>
                  <option>Regretfully decline</option>
                </select>
              </label>
              <button className="mx-auto mt-2 flex items-center gap-2 rounded-full bg-primary px-10 py-3 text-primary-foreground shadow-lg transition hover:scale-105 sm:col-span-2">
                <Send className="h-4 w-4" />Submit RSVP
              </button>
            </form>
          )}
        </div>
      </Reveal>

      <Wave flip />

      {/* THANK YOU */}
      <Reveal className="px-6 pb-28 pt-12 text-center">
        <img src={floral} alt="" width={1024} height={1024} loading="lazy" className="sway pointer-events-none absolute -bottom-12 -left-12 w-44 -rotate-90 md:w-64" />
        <img src={floral} alt="" width={1024} height={1024} loading="lazy" className="sway pointer-events-none absolute -bottom-12 -right-12 w-44 rotate-180 md:w-64" />
        <h2 className="font-script text-6xl text-primary md:text-7xl">Thank You!</h2>
        <div className="my-2 flex items-center justify-center gap-3">
          <span className="h-px w-20 bg-primary/40" /><Heart className="h-4 w-4 fill-primary text-primary" /><span className="h-px w-20 bg-primary/40" />
        </div>
        <p className="text-lg italic">for being a part of our special day.</p>
        <Flourish />
      </Reveal>
    </main>
  );
}
