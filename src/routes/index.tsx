import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, Heart, Music, VolumeX, Send } from "lucide-react";
import floral from "@/assets/floral.png";
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

function WriteOn({ text, delay = 0, size = 110 }: { text: string; delay?: number; size?: number }) {
  return (
    <svg viewBox={`0 0 ${text.length * size * 0.42 + 40} ${size * 1.4}`} className="mx-auto w-full max-w-3xl overflow-visible">
      <text
        x="50%" y="72%" textAnchor="middle"
        className="write-on font-script"
        style={{ fontSize: size, animationDelay: `${delay}s, ${delay + 2.8}s` }}
      >{text}</text>
    </svg>
  );
}

function Divider() {
  return (
    <div className="my-4 flex items-center justify-center gap-3 text-gold">
      <span className="h-px w-20 bg-gold/60" /><Heart className="h-3 w-3 fill-current text-primary" /><span className="h-px w-20 bg-gold/60" />
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) el.classList.add("in"); }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <section ref={ref} className={`reveal relative mx-auto max-w-5xl px-6 py-24 ${className}`}>{children}</section>;
}

function Index() {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [rsvp, setRsvp] = useState<string | null>(null);
  const [petals, setPetals] = useState<{ l: number; d: number; s: number }[]>([]);
  useEffect(() => setPetals(Array.from({ length: 18 }, () => ({ l: Math.random() * 100, d: Math.random() * 10, s: 8 + Math.random() * 10 }))), []);

  const enter = () => {
    setEntered(true);
    setTimeout(() => document.getElementById("celebration")?.scrollIntoView({ behavior: "smooth" }), 400);
  };

  return (
    <main className="relative overflow-hidden text-foreground">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.s}s`, animationDelay: `${p.d}s` }} />
      ))}

      {entered && !muted && (
        <iframe
          className="pointer-events-none fixed -left-[9999px] h-1 w-1"
          src={`https://www.youtube.com/embed/${VIDEO}?autoplay=1&start=0&end=33&loop=1&playlist=${VIDEO}&controls=0`}
          allow="autoplay"
          title="Wedding music"
        />
      )}
      {entered && (
        <button onClick={() => setMuted(!muted)} aria-label="Toggle music"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-4 text-primary-foreground shadow-lg transition hover:scale-110">
          {muted ? <VolumeX className="h-5 w-5" /> : <Music className="h-5 w-5 animate-pulse" />}
        </button>
      )}

      <nav className="fade-up absolute right-8 top-6 z-30 hidden gap-6 text-sm md:flex">
        {[["Home", "home"], ["Our Celebration", "celebration"], ["Location", "location"], ["RSVP", "rsvp"]].map(([l, id]) => (
          <a key={id} href={`#${id}`} className="transition hover:text-primary">{l}</a>
        ))}
      </nav>

      {/* Hero */}
      <header id="home" className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <img src={floral} alt="" width={1024} height={1024} className="sway pointer-events-none absolute -left-16 -top-16 w-[340px] md:w-[520px]" />
        <img src={floral} alt="" width={1024} height={1024} className="sway pointer-events-none absolute -bottom-16 -right-16 w-[300px] rotate-180 md:w-[460px]" />
        <p className="fade-up relative z-10 tracking-[0.35em] text-sm uppercase text-muted-foreground">The wedding celebration of</p>
        <div className="relative z-10 w-full">
          <WriteOn text="King Vincente" delay={0.6} />
          <p className="fade-up font-script text-6xl text-gold" style={{ animationDelay: "3.2s" }}>&amp;</p>
          <WriteOn text="Precious Eshun" delay={3.6} />
        </div>
        <div className="fade-up relative z-10 mt-6 flex flex-wrap items-center justify-center gap-8 text-lg" style={{ animationDelay: "6.5s" }}>
          <span className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />April 06, Saturday</span>
          <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />11:30 AM</span>
          <span className="flex max-w-xs items-center gap-2 text-left"><MapPin className="h-5 w-5 shrink-0 text-primary" />Family Praise Assemblies of God, Mariville Homes, Spintex</span>
        </div>
        <button onClick={enter} className="fade-up relative z-10 mt-10 rounded-full bg-primary px-10 py-3 text-xl text-primary-foreground shadow-xl transition hover:scale-105" style={{ animationDelay: "7s" }}>
          Enter Invitation ›
        </button>
        <p className="fade-up relative z-10 mt-3 text-xs italic text-muted-foreground" style={{ animationDelay: "7.3s" }}>Tap to begin with music ♪</p>
      </header>

      <Section className="grid items-center gap-12 md:grid-cols-2">
        <span id="celebration" className="absolute -top-4" />
        <img src={rings} alt="Wedding rings" loading="lazy" width={816} height={816}
          className="float-photo rounded-sm border-8 border-card shadow-2xl" style={{ "--r": "-4deg", transform: "rotate(-4deg)" } as React.CSSProperties} />
        <div className="text-center">
          <h2 className="font-script text-6xl text-primary">Our Celebration</h2>
          <Divider />
          <p className="text-xl leading-relaxed">Two hearts, one journey, a lifetime together. Join us as we celebrate the love and union of King Vincente &amp; Precious Eshun.</p>
        </div>
      </Section>

      <Section className="grid items-center gap-12 md:grid-cols-2">
        <span id="location" className="absolute -top-4" />
        <div className="text-center">
          <h2 className="font-script text-6xl text-primary">Location</h2>
          <Divider />
          <p className="flex items-center justify-center gap-2 text-xl"><MapPin className="h-5 w-5 text-primary" />Family Praise Assemblies of God, Mariville Homes, Spintex</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Family+Praise+Assemblies+of+God+Mariville+Homes+Spintex" target="_blank" rel="noreferrer"
            className="mt-6 inline-block rounded-full border border-border bg-card px-6 py-2 shadow transition hover:shadow-lg">View on Google Maps</a>
        </div>
        <img src={church} alt="Church" loading="lazy" width={928} height={720}
          className="float-photo rounded-sm border-8 border-card shadow-2xl" style={{ "--r": "3deg", transform: "rotate(3deg)" } as React.CSSProperties} />
      </Section>

      <Section className="text-center">
        <span id="rsvp" className="absolute -top-4" />
        <h2 className="font-script text-6xl text-primary">RSVP</h2>
        <Divider />
        <p className="text-lg">Kindly confirm your attendance</p>
        {rsvp ? (
          <p className="fade-up mt-8 font-script text-4xl text-primary">Thank you, {rsvp}! ♥</p>
        ) : (
          <form className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 md:flex-row"
            onSubmit={(e) => { e.preventDefault(); setRsvp(new FormData(e.currentTarget).get("name") as string); }}>
            <input name="name" required placeholder="Your Name" className="flex-1 rounded-lg border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
            <select required defaultValue="" className="flex-1 rounded-lg border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-primary">
              <option value="" disabled>Will you attend?</option>
              <option>Joyfully accept</option>
              <option>Regretfully decline</option>
            </select>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-primary-foreground transition hover:scale-105"><Send className="h-4 w-4" />Submit</button>
          </form>
        )}
      </Section>

      <Section className="pb-40 text-center">
        <img src={floral} alt="" width={1024} height={1024} loading="lazy" className="sway pointer-events-none absolute -left-24 bottom-0 w-72 -rotate-90 opacity-90" />
        <h2 className="font-script text-7xl text-primary">Thank You!</h2>
        <Divider />
        <p className="text-xl italic">for being a part of our special day.</p>
      </Section>
    </main>
  );
}
