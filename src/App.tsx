import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Clock, Calendar, Check, Loader2, AlertTriangle } from 'lucide-react';
import { Scene } from './components/Scene';
import { supabase } from './lib/supabase';

const LINEUP = [
  { name: 'MASON DRED', tag: 'HEADLINER', time: '11:30 PM', color: 'tape' },
  { name: 'KOLD STEEL', tag: 'CO-HEAD', time: '10:45 PM', color: 'blood' },
  { name: 'VEX LULLABY', tag: 'FEATURE', time: '10:00 PM', color: 'concrete' },
  { name: 'BISHOP NOIR', tag: 'FEATURE', time: '9:15 PM', color: 'tape' },
  { name: 'AMBER FREQ', tag: 'OPENER', time: '8:30 PM', color: 'blood' },
  { name: 'DIRT CIRCUIT', tag: 'OPENER', time: '7:45 PM', color: 'concrete' },
];

const MERCH = [
  {
    name: 'LUNCH BREAK TEES',
    price: '$35',
    desc: 'Heavyweight 240gsm. Bleach-discharge print on black.',
    tag: 'LIMITED 200',
  },
  {
    name: 'WAX SIDE A 12"',
    price: '$28',
    desc: 'Pressed vinyl. Screen-printed jacket. Numbered.',
    tag: 'PRESS 300',
  },
  {
    name: 'STREET CAP HOODIE',
    price: '$65',
    desc: 'Boxy fit. Embroidered chest. Taped seams.',
    tag: 'LIMITED 150',
  },
];

const TICKET_TYPES = [
  { id: 'GA', name: 'GENERAL ADMISSION', price: '$25' },
  { id: 'VIP', name: 'VIP PIT', price: '$60' },
  { id: 'BACKSTAGE', name: 'BACKSTAGE PASS', price: '$120' },
];

const GRAFFITI_OVERLAY = [
  { text: 'RAW', left: 8, top: 22, color: '#fae500', rot: -8 },
  { text: 'BARS', left: 78, top: 18, color: '#e10600', rot: 6 },
  { text: 'CYPHER', left: 12, top: 68, color: '#f5f5f4', rot: 4 },
  { text: 'BOOM BAP', left: 70, top: 72, color: '#fae500', rot: -5 },
  { text: 'WAX', left: 45, top: 12, color: '#e10600', rot: 10 },
  { text: 'FRESH', left: 85, top: 45, color: '#f5f5f4', rot: -7 },
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrollProgress(v));
    return () => unsub();
  }, [scrollYProgress]);

  const fetchCount = useCallback(async () => {
    const { count } = await supabase
      .from('rsvps')
      .select('*', { count: 'exact', head: true });
    setRsvpCount(count ?? 0);
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div className="grain relative min-h-screen bg-concrete-950 text-concrete-50">
      {/* Fixed 3D background */}
      <div className="fixed inset-0 z-0">
        <Scene scrollProgress={scrollProgress} />
      </div>

      {/* Floating graffiti overlay (HTML, mirrors 3D tags) */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        {GRAFFITI_OVERLAY.map((tag, i) => (
          <motion.div
            key={i}
            className="absolute font-display text-2xl md:text-4xl select-none"
            style={{
              left: `${tag.left}%`,
              top: `${tag.top}%`,
              color: tag.color,
              textShadow: '3px 3px 0 #0c0a09',
              transform: `rotate(${tag.rot}deg)`,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {tag.text}
          </motion.div>
        ))}
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-concrete-900 bg-concrete-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-tape flex items-center justify-center font-display text-concrete-950">
              LB
            </div>
            <span className="font-display text-xl tracking-tight md:text-2xl">LUNCH//BREAK</span>
          </div>
          <div className="hidden items-center gap-8 font-mono text-xs uppercase md:flex">
            <a href="#lineup" className="hover:text-tape transition-colors">Lineup</a>
            <a href="#merch" className="hover:text-tape transition-colors">Merch</a>
            <a href="#info" className="hover:text-tape transition-colors">Info</a>
            <button
              onClick={() => setRsvpOpen(true)}
              className="border-2 border-tape bg-tape px-4 py-2 font-display text-concrete-950 hover:bg-transparent hover:text-tape transition-colors"
            >
              RSVP NOW
            </button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t-2 border-concrete-900 bg-concrete-950 md:hidden"
            >
              <div className="flex flex-col gap-4 p-6 font-mono text-sm uppercase">
                <a href="#lineup" onClick={() => setMenuOpen(false)}>Lineup</a>
                <a href="#merch" onClick={() => setMenuOpen(false)}>Merch</a>
                <a href="#info" onClick={() => setMenuOpen(false)}>Info</a>
                <button
                  onClick={() => { setMenuOpen(false); setRsvpOpen(true); }}
                  className="border-2 border-tape bg-tape px-4 py-2 font-display text-concrete-950"
                >
                  RSVP NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center">
          <div className="mb-4 inline-block tape-stripe px-4 py-1 font-mono text-xs font-bold uppercase text-concrete-950">
            Underground Showcase · Vol. 04
          </div>
          <h1 className="font-display text-6xl leading-[0.85] tracking-tighter sm:text-8xl md:text-9xl lg:text-[12rem]">
            LUNCH
            <br />
            <span className="text-tape">BREAK</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md font-mono text-sm uppercase text-concrete-300 md:text-base">
            One night. Six MCs. No industry. Pure street.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setRsvpOpen(true)}
              className="group relative border-4 border-concrete-50 bg-concrete-50 px-8 py-4 font-display text-lg text-concrete-950 shadow-brutal transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-sm"
            >
              GRAB A TICKET
            </button>
            <a
              href="#lineup"
              className="border-4 border-concrete-50 px-8 py-4 font-display text-lg text-concrete-50 transition-all hover:border-tape hover:text-tape"
            >
              SEE THE LINEUP
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase text-concrete-400"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ▼ Scroll
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee divider */}
      <div className="relative z-10 border-y-4 border-concrete-900 bg-tape py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="font-display text-2xl text-concrete-950 mx-8">
              LUNCH BREAK · AUG 23 · THE BASEMENT · DOORS 7PM · 21+ · LUNCH BREAK · AUG 23 ·
            </span>
          ))}
        </div>
      </div>

      {/* Lineup */}
      <section id="lineup" className="relative z-10 bg-concrete-950 px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start gap-4 border-b-4 border-concrete-50 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-tape mb-2">// Section 01</div>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">THE LINEUP</h2>
            </div>
            <div className="font-mono text-sm text-concrete-400">
              6 acts · 1 cypher · 0 industry
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {LINEUP.map((artist, i) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative border-4 border-concrete-50 bg-concrete-900 p-6 transition-all hover:border-tape hover:shadow-brutal-tape"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`font-mono text-xs uppercase mb-2 ${artist.color === 'tape' ? 'text-tape' : artist.color === 'blood' ? 'text-blood' : 'text-concrete-400'}`}>
                      {artist.tag}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl leading-none glitch">
                      {artist.name}
                    </h3>
                  </div>
                  <div className="font-mono text-sm text-concrete-300">{artist.time}</div>
                </div>
                <div className="mt-4 h-1 w-0 bg-tape transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Merch Drop */}
      <section id="merch" className="relative z-10 bg-concrete-900 px-4 py-24 md:px-8 border-y-4 border-concrete-50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start gap-4 border-b-4 border-concrete-50 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-blood mb-2">// Section 02</div>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">
                EXCLUSIVE<br /><span className="text-blood">MERCH DROP</span>
              </h2>
            </div>
            <div className="stamp px-4 py-2 text-sm">FIRST COME · FIRST SERVED</div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {MERCH.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative border-4 border-concrete-50 bg-concrete-950"
              >
                {/* Product visual */}
                <div className="relative aspect-square overflow-hidden border-b-4 border-concrete-50 bg-gradient-to-br from-concrete-800 to-concrete-950">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-display text-6xl text-concrete-700 transition-transform duration-500 group-hover:scale-110">
                      {item.name.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 tape-stripe px-2 py-1 font-mono text-[10px] font-bold uppercase text-concrete-950">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 font-display text-2xl text-tape">
                    {item.price}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl leading-none mb-2">{item.name}</h3>
                  <p className="font-mono text-xs text-concrete-400 mb-4">{item.desc}</p>
                  <button className="w-full border-2 border-concrete-50 py-3 font-mono text-xs uppercase transition-all hover:bg-tape hover:text-concrete-950 hover:border-tape">
                    Add to cart →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info / RSVP CTA */}
      <section id="info" className="relative z-10 bg-concrete-950 px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="font-mono text-xs uppercase text-tape mb-2">// Section 03</div>
              <h2 className="font-display text-5xl md:text-7xl leading-none mb-8">
                THE<br />DETAILS
              </h2>
              <div className="space-y-6 font-mono text-sm">
                <div className="flex items-start gap-4 border-l-4 border-tape pl-4">
                  <Calendar className="mt-0.5 shrink-0 text-tape" size={20} />
                  <div>
                    <div className="uppercase text-concrete-400 mb-1">Date</div>
                    <div className="text-lg font-bold">SAT · AUG 23 · 2025</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-l-4 border-blood pl-4">
                  <Clock className="mt-0.5 shrink-0 text-blood" size={20} />
                  <div>
                    <div className="uppercase text-concrete-400 mb-1">Time</div>
                    <div className="text-lg font-bold">DOORS 7PM · SHOW 7:45PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-l-4 border-concrete-50 pl-4">
                  <MapPin className="mt-0.5 shrink-0" size={20} />
                  <div>
                    <div className="uppercase text-concrete-400 mb-1">Location</div>
                    <div className="text-lg font-bold">THE BASEMENT · 47 RIVER ST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Torn poster RSVP */}
            <div className="relative">
              <div className="torn-edge bg-concrete-100 p-8 shadow-brutal-blood">
                <div className="tape-stripe-red -mx-8 -mt-8 mb-6 px-8 py-2 text-center">
                  <span className="font-display text-sm text-concrete-50">★ WANTED ★</span>
                </div>
                <h3 className="font-display text-4xl text-concrete-950 leading-none mb-2">
                  GET ON<br />THE LIST
                </h3>
                <p className="font-mono text-xs text-concrete-700 mb-6">
                  {rsvpCount} heads already locked in. Don't sleep.
                </p>
                <button
                  onClick={() => setRsvpOpen(true)}
                  className="w-full border-4 border-concrete-950 bg-blood py-4 font-display text-xl text-concrete-50 transition-all hover:bg-concrete-950 hover:text-blood"
                >
                  RSVP / BUY TICKET
                </button>
                <div className="mt-4 font-mono text-[10px] uppercase text-concrete-600 text-center">
                  21+ · ID required · No re-entry
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-concrete-50 bg-concrete-950 px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="font-display text-3xl">LUNCH//BREAK</div>
            <div className="font-mono text-xs uppercase text-concrete-500 text-center md:text-right">
              No industry. No suits. Just bars.<br />
              © 2025 · Underground Collective
            </div>
          </div>
        </div>
      </footer>

      {/* RSVP Modal */}
      <AnimatePresence>
        {rsvpOpen && (
          <RSVPModal
            onClose={() => setRsvpOpen(false)}
            onSuccess={fetchCount}
            currentCount={rsvpCount}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RSVPModal({
  onClose,
  onSuccess,
  currentCount,
}: {
  onClose: () => void;
  onSuccess: () => void;
  currentCount: number;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ticket, setTicket] = useState('GA');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatus('error');
      setError('Fill in every field.');
      return;
    }
    setStatus('loading');
    setError('');

    const { error: insertError } = await supabase
      .from('rsvps')
      .insert({ name: name.trim(), email: email.trim(), ticket_type: ticket });

    if (insertError) {
      setStatus('error');
      setError(insertError.message);
      return;
    }
    setStatus('success');
    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-concrete-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="torn-edge relative w-full max-w-md bg-concrete-100 p-8 shadow-brutal-blood"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-concrete-950 hover:text-blood transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-4 border-blood bg-blood">
              <Check size={32} className="text-concrete-50" />
            </div>
            <h3 className="font-display text-3xl text-concrete-950 mb-2">YOU'RE ON THE LIST</h3>
            <p className="font-mono text-xs text-concrete-700 mb-4">
              See you Aug 23. Bring ID. Tell nobody.
            </p>
            <div className="font-mono text-xs uppercase text-concrete-600">
              {currentCount + 1} heads locked in
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full border-4 border-concrete-950 bg-concrete-950 py-3 font-display text-concrete-50 hover:bg-blood hover:border-blood"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <div className="tape-stripe-red -mx-8 -mt-8 mb-6 px-8 py-2 text-center">
              <span className="font-display text-sm text-concrete-50">★ RSVP FORM ★</span>
            </div>
            <h3 className="font-display text-3xl text-concrete-950 leading-none mb-1">
              LOCK IN YOUR SPOT
            </h3>
            <p className="font-mono text-xs text-concrete-700 mb-6">
              {currentCount} already in. Limited capacity.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase text-concrete-700 block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-concrete-950 bg-concrete-50 px-3 py-2 font-mono text-sm text-concrete-950 focus:outline-none focus:border-blood"
                  placeholder="Your tag"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase text-concrete-700 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-concrete-950 bg-concrete-50 px-3 py-2 font-mono text-sm text-concrete-950 focus:outline-none focus:border-blood"
                  placeholder="you@street.fm"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase text-concrete-700 block mb-2">
                  Ticket Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TICKET_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTicket(t.id)}
                      className={`border-2 p-2 text-center transition-all ${
                        ticket === t.id
                          ? 'border-blood bg-blood text-concrete-50'
                          : 'border-concrete-950 bg-concrete-50 text-concrete-950 hover:border-blood'
                      }`}
                    >
                      <div className="font-display text-[10px] leading-tight">{t.name}</div>
                      <div className="font-mono text-xs font-bold mt-1">{t.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 border-2 border-blood bg-blood/10 px-3 py-2 font-mono text-xs text-blood">
                  <AlertTriangle size={14} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full border-4 border-concrete-950 bg-blood py-4 font-display text-xl text-concrete-50 transition-all hover:bg-concrete-950 hover:text-blood disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="mx-auto animate-spin" size={20} />
                ) : (
                  'CONFIRM RSVP'
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
