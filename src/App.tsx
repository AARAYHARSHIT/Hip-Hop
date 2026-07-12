import React, { useState, useEffect } from 'react';
import { Disc, Layers, ShoppingBag, Ticket, ArrowRight, X, Loader2, CheckCircle2 } from 'lucide-react';
import Scene from './components/Scene';

import prarthanaImg from './assets/Prarthana.jpg';
import yoursTrulyImg from './assets/YoursTruly2.jpg';
import stillHereImg from './assets/StillHere.jpg';
import farFOImg from './assets/FarFO.jpg';
import jootaJapaniImg from './assets/JootaJapani.jpg';
import timeWillTellImg from './assets/TimeWillTell.jpg';

interface Track {
  id: string;
  title: string;
  type: string;
  year: string;
  vibe: string;
  image: string;
}

// Updated with authentic DHH / Industry terminology
const discography: Track[] = [
  { id: '1', title: 'Prarthana', type: 'Single', year: '2023', vibe: 'Desi Hip Hop', image: prarthanaImg },
  { id: '2', title: 'Yours Truly', type: 'Mixtape', year: '2025', vibe: 'Lyrical Rap', image: yoursTrulyImg },
  { id: '3', title: 'Still Here', type: 'LP Album', year: '2021', vibe: 'Hardcore Boom Bap', image: stillHereImg },
  { id: '4', title: 'Time Will Tell', type: 'EP Drop', year: '2023', vibe: 'Modern Trap', image: timeWillTellImg },
  { id: '5', title: 'Far From Over', type: 'Single Pack', year: '2024', vibe: 'Underground Drill', image: farFOImg },
  { id: '6', title: 'Joota Japani', type: 'Performance', year: '2024', vibe: 'Freestyle Cypher', image: jootaJapaniImg }
];

export default function App() {
  const [activeTrack, setActiveTrack] = useState<Track>(discography[1]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  
  // Backend Simulation States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'merch' | 'ticket' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Real Backend API Call Integration
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Grab values directly from the form event targets
    const form = e.target as HTMLFormElement;
    const name = (form.elements[0] as HTMLInputElement).value;
    const email = (form.elements[1] as HTMLInputElement).value;
    const selection = (form.elements[2] as HTMLSelectElement).value;

    try {
      // Send the data to your local Node.js / Express server
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          orderType: modalType,
          selection
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-close modal after successful database injection
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        form.reset(); // Clear the form inputs
      }, 3000);

    } catch (error) {
      console.error('Transaction Failed:', error);
      setIsSubmitting(false);
      // You can add a setErrorMessage state here later to show UI failure alerts
      alert("Database connection failed. Ensure your Express server is running on port 5000.");
    }
  };

  const openModal = (type: 'merch' | 'ticket') => {
    setModalType(type);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden selection:bg-rose-600">
      
      {/* Custom Cursor */}
      <div 
        className="custom-cursor hidden md:block" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />

      {/* Base Background */}
      <div className="fixed inset-0 -z-20 bg-[#060608]" />

      {/* GLOBAL FIXED 3D CANVAS */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Scene activeTexture={activeTrack.image} />
      </div>
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 px-8 py-5 flex justify-between items-center mix-blend-difference pointer-events-auto">
        <div className="text-xl font-black tracking-tighter font-mono">KR$NA // PROJECTS</div>
        <nav className="hidden md:flex space-x-12 text-xs font-mono tracking-widest text-neutral-400 uppercase cursor-hover">
          <a href="#viewport" className="hover:text-rose-500 transition-colors">01 // WebGL Space</a>
          <a href="#discography" className="hover:text-rose-500 transition-colors">02 // Audio Archives</a>
          <a href="#merch" className="hover:text-rose-500 transition-colors">03 // Premium Drops</a>
        </nav>
        <button 
          onClick={() => openModal('ticket')}
          className="border border-white text-white font-mono text-xs px-5 py-2 uppercase font-bold hover:bg-white hover:text-black transition-all duration-300"
        >
          Get Tickets
        </button>
      </header>

      {/* Hero Viewport */}
      <section id="viewport" className="relative h-screen w-full flex items-center pointer-events-none">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#060608] via-[#060608]/80 to-transparent opacity-90 pointer-events-none" />
        
        <div className="relative z-20 pl-12 md:pl-24 select-none max-w-2xl pointer-events-auto cursor-hover">
          <span className="text-rose-500 font-mono text-xs tracking-widest uppercase block mb-4">// RAW UNDERGROUND INTERACTIVE LAYER</span>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-none uppercase text-white mb-6">
            REAL <br/>
            <span className="text-transparent stroke-text bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-700">TALK</span>
          </h1>
          <p className="font-mono text-xs text-neutral-400 leading-relaxed uppercase tracking-wide">
            A premium immersive matrix framework showcasing physical 3D elements, dynamic depth maps, and responsive audio nodes.
          </p>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-full bg-rose-600 py-2.5 overflow-hidden whitespace-nowrap border-y border-white/10 relative z-20">
        <div className="inline-block animate-marquee font-mono text-xs tracking-widest text-black font-black uppercase">
          PRARTHANA • YOURS TRULY • STILL HERE • TIME WILL TELL • FAR FROM OVER • JOOTA JAPANI • NO CAP • PRARTHANA • YOURS TRULY • STILL HERE • TIME WILL TELL • FAR FROM OVER • JOOTA JAPANI • NO CAP •
        </div>
      </div>

      {/* Discography Section */}
      <section id="discography" className="py-32 px-8 max-w-7xl mx-auto relative z-20 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Audio Stack */}
          <div className="lg:col-span-7 space-y-4 pointer-events-auto">
            <div className="mb-8">
              <span className="text-rose-500 font-mono text-xs tracking-widest block uppercase mb-1">// INDEX 02</span>
              <h2 className="text-4xl font-black uppercase tracking-tight">THE AUDIO STACK</h2>
            </div>
            
            {discography.map((track) => (
              <div
                key={track.id}
                onMouseEnter={() => setActiveTrack(track)}
                className={`group p-6 border-b flex justify-between items-center cursor-pointer transition-all duration-300 ${
                  activeTrack.id === track.id ? 'border-rose-500 bg-[#121214] pl-4' : 'border-neutral-800 bg-[#0a0a0c]/80 hover:border-neutral-500 hover:bg-[#121214]'
                }`}
              >
                <div className="flex items-center space-x-6">
                  <span className="font-mono text-xs text-neutral-600 group-hover:text-rose-500 transition-colors">0{track.id}</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-rose-500 transition-colors">{track.title}</h3>
                </div>
                <div className="flex items-center space-x-4 font-mono text-xs text-neutral-500">
                  <span className="hidden sm:inline uppercase tracking-widest">{track.vibe}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Monitor Panel (Tilting Canvas) */}
          <div className="lg:col-span-5 h-full flex items-center justify-center pointer-events-auto relative cursor-hover">
            <div 
              className="w-full relative group shadow-2xl transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                  transform: 'translateZ(20px)'
                }}
              />
              <div className="bg-[#111113]/90 backdrop-blur-md border-2 border-neutral-800 p-4" style={{ transform: 'translateZ(0px)' }}>
                <div className="aspect-square w-full bg-neutral-900 overflow-hidden relative border border-black mb-4 shadow-inner">
                  <img src={activeTrack.image} alt={activeTrack.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ transform: 'translateZ(-10px)' }} />
                  <div className="absolute top-4 right-4 bg-black/90 px-2 py-1 font-mono text-[9px] text-rose-500 tracking-widest uppercase border border-white/10" style={{ transform: 'translateZ(30px)' }}>
                    VOL // 0{activeTrack.id}
                  </div>
                </div>
                <div className="flex justify-between items-end font-mono" style={{ transform: 'translateZ(15px)' }}>
                  <div>
                    <span className="text-[10px] text-rose-500 uppercase tracking-widest block mb-1">// ARCHIVE FILE</span>
                    <span className="text-xl font-black uppercase tracking-tight text-white">{activeTrack.title}</span>
                  </div>
                  <span className="text-sm text-neutral-500 font-bold mb-1">[{activeTrack.year}]</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Solid Merch Section */}
      <section id="merch" className="py-32 bg-[#0b0b0d]/90 backdrop-blur-md border-t border-neutral-900 px-8 relative z-20 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-rose-500 font-mono text-xs tracking-widest block uppercase mb-1">// SYSTEM SUBSYSTEM 03</span>
              <h2 className="text-4xl font-black uppercase tracking-tight">COMMERCE HOOKS</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
              onClick={() => openModal('merch')}
              className="border border-neutral-800 p-8 bg-neutral-950/80 flex justify-between items-center group hover:border-rose-500 transition-colors w-full text-left"
            >
              <div className="space-y-4">
                <ShoppingBag className="w-8 h-8 text-neutral-600 group-hover:text-rose-500 transition-colors" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">01 // Limited Apparel</h3>
                  <p className="font-mono text-xs text-neutral-500 mt-2 uppercase">Order physical media & street wear.</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => openModal('ticket')}
              className="border border-neutral-800 p-8 bg-neutral-950/80 flex justify-between items-center group hover:border-rose-500 transition-colors w-full text-left"
            >
              <div className="space-y-4">
                <Ticket className="w-8 h-8 text-neutral-600 group-hover:text-rose-500 transition-colors" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">02 // Live Ticketing</h3>
                  <p className="font-mono text-xs text-neutral-500 mt-2 uppercase">RSVP & Secure venue access passes.</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Backend Interactive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#111113] border border-rose-500 p-8 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <span className="text-rose-500 font-mono text-[10px] tracking-widest uppercase">// SECURE CHECKOUT</span>
              <h2 className="text-2xl font-black uppercase mt-1">
                {modalType === 'merch' ? 'Apparel Pre-Order' : 'Event RSVP'}
              </h2>
            </div>

            {isSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 text-green-400">
                <CheckCircle2 className="w-16 h-16" />
                <h3 className="text-xl font-black uppercase">Transaction Successful</h3>
                <p className="font-mono text-xs text-neutral-400 uppercase">Your request has been logged to the database.</p>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">Full Name</label>
                  <input required type="text" className="w-full bg-black border border-neutral-800 p-3 text-sm font-mono text-white focus:outline-none focus:border-rose-500 transition-colors" placeholder="ENTER NAME" />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">Email Address</label>
                  <input required type="email" className="w-full bg-black border border-neutral-800 p-3 text-sm font-mono text-white focus:outline-none focus:border-rose-500 transition-colors" placeholder="ENTER EMAIL" />
                </div>

                {modalType === 'merch' ? (
                  <div>
                    <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">Size</label>
                    <select className="w-full bg-black border border-neutral-800 p-3 text-sm font-mono text-white focus:outline-none focus:border-rose-500 transition-colors appearance-none">
                      <option>MEDIUM (M)</option>
                      <option>LARGE (L)</option>
                      <option>X-LARGE (XL)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">Access Tier</label>
                    <select className="w-full bg-black border border-neutral-800 p-3 text-sm font-mono text-white focus:outline-none focus:border-rose-500 transition-colors appearance-none">
                      <option>GENERAL ADMISSION</option>
                      <option>VIP BACKSTAGE PASS</option>
                    </select>
                  </div>
                )}

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-white text-black font-black uppercase py-4 mt-4 hover:bg-rose-600 hover:text-white transition-all flex justify-center items-center"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Selection'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 bg-black px-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-neutral-600 tracking-widest uppercase border-t border-neutral-950 relative z-20 pointer-events-auto">
        <div>© 2026 KR$NA PORTFOLIO ENGINE</div>
        <div className="mt-2 sm:mt-0">Built via React Three Fiber + Tailwind CSS</div>
      </footer>
    </div>
  );
}