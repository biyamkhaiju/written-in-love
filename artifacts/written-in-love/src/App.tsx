import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { CalendarDays, CheckCircle2, Clock3, Heart, House, MapPin, Music2, Send, UserRound, VolumeX } from 'lucide-react';
import floral from '@/assets/floral.png';
import floralSide from '@/assets/floral-side.png';
import envelope from '@/assets/envelope.png';
import rings from '@/assets/rings.jpg';
import church from '@/assets/church.jpg';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [playing, setPlaying] = useState(true);
  const [rsvp, setRsvp] = useState<{ name: string; attendance: string } | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [petals, setPetals] = useState<{ left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 16 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 9 + Math.random() * 10,
    })));
  }, []);

  const musicCommand = (func: string) => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
  };
  const toggleMusic = () => {
    if (playing) musicCommand('pauseVideo');
    else {
      musicCommand('unMute');
      musicCommand('playVideo');
    }
    setPlaying(!playing);
  };
  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setRsvp({
      name: String(formData.get('name') ?? '').trim(),
      attendance: String(formData.get('attendance') ?? ''),
    });
  };

  return (
    <main className="wedding-page" data-testid="page-wedding-invitation">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="petal"
          data-testid={`decoration-falling-petal-${index}`}
          style={{ left: `${petal.left}%`, animationDelay: `${petal.delay}s`, animationDuration: `${petal.duration}s` }}
          aria-hidden="true"
        />
      ))}
      <iframe
        ref={frame}
        className="pointer-events-none fixed -left-[9999px] h-px w-px"
        src="https://www.youtube.com/embed/LSUR0075KLI?autoplay=1&start=0&end=33&loop=1&playlist=LSUR0075KLI&controls=0&enablejsapi=1&playsinline=1"
        allow="autoplay; encrypted-media"
        title="Wedding music"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        className={`music-toggle ${playing ? 'is-playing' : ''}`}
        onClick={toggleMusic}
        aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
        aria-pressed={playing}
        data-testid="button-toggle-music"
      >
        {playing ? <Music2 size={21} /> : <VolumeX size={21} />}
      </button>

      <header id="home" className="hero">
        <img src={floral} alt="" className="flower-corner sway" width={1024} height={1024} aria-hidden="true" />
        <img src={floralSide} alt="" className="flower-side sway" width={640} height={1280} aria-hidden="true" />
        <nav className="hero-nav fade-up" aria-label="Invitation sections" data-testid="navigation-invitation">
          <a className="nav-heart" href="#home" aria-label="Home" data-testid="link-home"><House size={16} /></a>
          <a href="#home" data-testid="link-nav-home">Home</a><span className="nav-dot" aria-hidden="true">·</span>
          <a href="#celebration" data-testid="link-nav-celebration">Our Celebration</a><span className="nav-dot" aria-hidden="true">·</span>
          <a href="#location" data-testid="link-nav-location">Location</a><span className="nav-dot" aria-hidden="true">·</span>
          <a href="#rsvp" data-testid="link-nav-rsvp">RSVP</a>
        </nav>
        <div className="hero-content">
          <p className="eyebrow fade-up" style={{ animationDelay: '.15s' }}>The wedding celebration of</p>
          <Heart className="hero-heart fade-up" size={14} fill="currentColor" style={{ animationDelay: '.35s' }} aria-hidden="true" />
          <h1 className="hero-title" data-testid="text-couple-names">
            <span className="write-on" style={{ animationDelay: '.55s' }}>King Vincente</span>
            <span className="ampersand fade-up" style={{ animationDelay: '2.1s' }}>&amp;</span>
            <span className="write-on" style={{ animationDelay: '2.4s' }}>Precious Eshun</span>
          </h1>
          <div className="event-meta fade-up" style={{ animationDelay: '4.3s' }} data-testid="content-wedding-details">
            <div className="meta-item"><CalendarDays size={19} /><span>April 06<br />Saturday</span></div>
            <div className="meta-item"><Clock3 size={19} /><span>11:30 AM</span></div>
            <div className="meta-item"><MapPin size={19} /><span>Family Praise Assemblies of God, Mariville Homes, Spintex</span></div>
          </div>
          <div className="flourish fade-up" style={{ animationDelay: '4.6s' }} aria-hidden="true">~ ❦ ~</div>
        </div>
      </header>
      <Wave />

      <Reveal id="celebration" className="story-section">
        <img src={floralSide} alt="" className="flower-side sway" width={640} height={1280} loading="lazy" aria-hidden="true" />
        <div className="story-grid">
          <div className="photo-wrap">
            <Polaroid src={rings} alt="Wedding rings" rotation="-4deg" testId="image-wedding-rings" />
            <img src={floral} alt="" className="photo-flower" width={1024} height={1024} loading="lazy" aria-hidden="true" />
          </div>
          <div className="story-copy">
            <SectionTitle>Our Celebration</SectionTitle>
            <p data-testid="text-celebration-copy">Two hearts, one journey, a lifetime together. Join us as we celebrate the love and union of King Vincente &amp; Precious Eshun.</p>
            <div className="flourish" aria-hidden="true">~ ❦ ~</div>
          </div>
        </div>
      </Reveal>
      <Wave flip />

      <Reveal id="location" className="story-section location-section">
        <img src={floralSide} alt="" className="flower-side sway" width={640} height={1280} loading="lazy" aria-hidden="true" />
        <div className="story-grid location-grid">
          <div className="story-copy">
            <SectionTitle>Location</SectionTitle>
            <p className="location-address" data-testid="text-venue-address">
              <MapPin size={20} aria-hidden="true" />
              <span>Family Praise Assemblies of God,<br />Mariville Homes, Spintex</span>
            </p>
            <a
              className="map-link"
              href="https://www.google.com/maps/search/?api=1&query=Family+Praise+Assemblies+of+God+Mariville+Homes+Spintex"
              target="_blank"
              rel="noreferrer"
              data-testid="link-google-maps"
            >
              <MapPin size={16} />View on Google Maps
            </a>
          </div>
          <div className="photo-wrap">
            <Polaroid src={church} alt="Family Praise Assemblies of God church" rotation="4deg" testId="image-wedding-venue" />
            <img src={floral} alt="" className="photo-flower location-photo-flower" width={1024} height={1024} loading="lazy" aria-hidden="true" />
          </div>
        </div>
      </Reveal>
      <Wave />

      <Reveal id="rsvp" className="story-section rsvp-section">
        <div className="rsvp-wrap">
          <img src={envelope} alt="" className="envelope-art" width={1024} height={1024} loading="lazy" aria-hidden="true" />
          <div className="story-copy">
            <SectionTitle>RSVP</SectionTitle>
            <p className="section-kicker" data-testid="text-rsvp-instruction">Kindly confirm your attendance</p>
            {rsvp ? (
              <div className="rsvp-response" role="status" data-testid="status-rsvp-confirmation">
                Thank you, {rsvp.name}!
                <div className="section-kicker" style={{ marginTop: 10, letterSpacing: '.12em' }}>
                  {rsvp.attendance === 'Joyfully accept' ? 'We look forward to celebrating with you.' : 'Thank you for letting us know.'}
                </div>
              </div>
            ) : (
              <form className="rsvp-form" onSubmit={submitRsvp} data-testid="form-rsvp">
                <label className="field">
                  <UserRound size={17} aria-hidden="true" />
                  <input name="name" required placeholder="Your Name" aria-label="Your name" data-testid="input-rsvp-name" />
                </label>
                <label className="field">
                  <CheckCircle2 size={17} aria-hidden="true" />
                  <select name="attendance" required defaultValue="" aria-label="Will you attend?" data-testid="select-rsvp-attendance">
                    <option value="" disabled>Will you attend?</option>
                    <option>Joyfully accept</option>
                    <option>Regretfully decline</option>
                  </select>
                </label>
                <button className="submit-rsvp" type="submit" data-testid="button-submit-rsvp"><Send size={15} />Submit RSVP</button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
      <Wave flip />

      <Reveal className="thanks-section">
        <img src={floral} alt="" className="thanks-decoration thanks-left sway" width={1024} height={1024} loading="lazy" aria-hidden="true" />
        <img src={floral} alt="" className="thanks-decoration thanks-right sway" width={1024} height={1024} loading="lazy" aria-hidden="true" />
        <h2 data-testid="text-thank-you">Thank You!</h2>
        <div className="flourish" aria-hidden="true">— <Heart size={15} fill="currentColor" style={{ display: 'inline' }} /> —</div>
        <p>for being a part of our special day.</p>
      </Reveal>
    </main>
  );
}

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="wave" style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <path d="M0,60 C300,10 600,90 900,45 C1140,10 1320,40 1440,25 L1440,90 L0,90 Z" opacity=".5" />
      <path d="M0,58 C300,8 600,88 900,43 C1140,8 1320,38 1440,23" fill="none" strokeWidth="2" />
      <path d="M0,70 C320,25 620,95 920,55 C1150,25 1330,50 1440,40" fill="none" strokeWidth="1" opacity=".5" />
    </svg>
  );
}

function Reveal({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        element.classList.add('in');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <section id={id} ref={ref} className={`reveal relative ${className}`}>{children}</section>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="section-title">
      <Heart className="section-heart" aria-hidden="true" />
      <span>{children}</span>
    </h2>
  );
}

function Polaroid({ src, alt, rotation, testId }: { src: string; alt: string; rotation: string; testId: string }) {
  return (
    <div className="polaroid" style={{ transform: `rotate(${rotation})` }}>
      <img src={src} alt={alt} loading="lazy" data-testid={testId} />
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
