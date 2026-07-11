import React, { useState, useEffect } from 'react';
import { Disc, Layers, ShoppingBag, Ticket, ExternalLink, ArrowRight } from 'lucide-react';
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

const discography: Track[] = [
  { id: '1', title: 'Prarthana', type: 'Single', year: '2023', vibe: 'Gothic Hip-Hop', image: prarthanaImg },
  { id: '2', title: 'Yours Truly', type: 'Mixtape', year: '2025', vibe: 'Conceptual DHH', image: yoursTrulyImg },
  { id: '3', title: 'Still Here', type: 'LP Album', year: '2021', vibe: 'Classic Hardcore', image: stillHereImg },
  { id: '4', title: 'Time Will Tell', type: 'EP Drop', year: '2023', vibe: 'Gritty Trap', image: timeWillTellImg },
  { id: '5', title: 'Far From Over', type: 'Single Pack', year: '2024', vibe: 'Aggressive Bars', image: farFOImg },
  { id: '6', title: 'Joota Japani', type: 'Performance', year: '2024', vibe: 'Raw Street', image: jootaJapaniImg }
];

export default function App() {
  const [activeTrack, setActiveTrack] = useState<Track>(discography[1]);
  const [mousePos, setMouseMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#060608] text-white font-sans overflow-x-hidden selection:bg-rose-600">
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-5 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-black tracking-tighter font-mono">KR$NA // PROJECTS</div>
        <nav className="hidden md:flex space-x-12 text-xs font-mono tracking-widest text-neutral-400 uppercase">
          <a href="#viewport" className="hover:text-rose-500 transition-colors">01 // WebGL Space</a>
          <a href="#discography" className="hover:text-rose-500 transition-colors">02 // Audio Archives</a>
          <a href="#merch" className="hover:text-rose-500 transition-colors">03 // Premium Drops</a>
        </nav>
        <button className="border border-white text-white font-mono text-xs px-5 py-2 uppercase font-bold hover:bg-white hover:text-black transition-all duration-300">
          Get Tickets
        </button>
      </header>

      {/* Hero Viewport */}
      <section id="viewport" className="relative h-screen w-full flex items-center bg-black">
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#060608] via-transparent to-transparent opacity-90" />
        
        <div className="relative z-20 pl-12 md:pl-24 pointer-events-none select-none max-w-2xl">
          <span className="text-rose-500 font-mono text-xs tracking-widest uppercase block mb-4">// RAW UNGROUND INTERACTIVE LAYER</span>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-none uppercase text-white mb-6">
            REAL <br/>
            <span className="text-transparent stroke-text bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-700">TALK</span>
          </h1>
          <p className="font-mono text-xs text-neutral-400 leading-relaxed uppercase tracking-wide">
            A premium immersive matrix framework showcasing physical 3D elements, dynamic depth maps, and responsive audio nodes.
          </p>
        </div>
      </section>

      {/* Discography Grid */}
      <section id="discography" className="py-32 px-8 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-8">
              <span className="text-rose-500 font-mono text-xs tracking-widest block uppercase mb-1">// INDEX 02</span>
              <h2 className="text-4xl font-black uppercase tracking-tight">THE AUDIO STACK</h2>
            </div>
            
            {discography.map((track) => (
              <div
                key={track.id}
                onMouseEnter={() => setActiveTrack(track)}
                className={`group p-6 border-b flex justify-between items-center cursor-pointer transition-all duration-300 ${
                  activeTrack.id === track.id ? 'border-rose-500 bg-neutral-900/20 pl-4' : 'border-neutral-800 hover:border-neutral-500'
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

          {/* Premium Image Canvas Component */}
          <div className="lg:col-span-5 h-full flex items-center justify-center">
            <div 
              className="w-full bg-[#111113] border border-neutral-800 p-6 shadow-2xl transition-all duration-200 ease-out"
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="aspect-square w-full bg-neutral-900 overflow-hidden relative border border-neutral-800 mb-6">
                <img src={activeTrack.image} alt={activeTrack.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-center font-mono">
                <div>
                  <span className="text-[10px] text-rose-500 uppercase tracking-widest block">// ARCHIVE FILE</span>
                  <span className="text-sm font-bold uppercase">{activeTrack.title}</span>
                </div>
                <span className="text-xs text-neutral-500 font-bold">[{activeTrack.year}]</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Merch and Staging Shell */}
      <section id="merch" className="py-32 bg-[#0b0b0d] border-t border-neutral-900 px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-rose-500 font-mono text-xs tracking-widest block uppercase mb-1">// SYSTEM SUBSYSTEM 03</span>
              <h2 className="text-4xl font-black uppercase tracking-tight">COMMERCE HOOKS</h2>
            </div>
            <p className="font-mono text-xs text-neutral-500 max-w-xs uppercase tracking-wide mt-4 md:mt-0">
              Wireframe slots configured for Stripe billing API integration and live database synchronization hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Merch Wireframe */}
            <div className="border border-neutral-800 p-8 bg-neutral-950/40 flex justify-between items-center group hover:border-rose-500 transition-colors">
              <div className="space-y-4">
                <ShoppingBag className="w-8 h-8 text-neutral-600 group-hover:text-rose-500 transition-colors" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">01 // Limited Apparel Drops</h3>
                  <p className="text-xs font-mono text-neutral-500 uppercase mt-1">E-Commerce infrastructure pipeline ready.</p>
                </div>
              </div>
              <ExternalLink className="text-neutral-700 group-hover:text-white transition-colors w-4 h-4" />
            </div>

            {/* Ticket Wireframe */}
            <div className="border border-neutral-800 p-8 bg-neutral-950/40 flex justify-between items-center group hover:border-rose-500 transition-colors">
              <div className="space-y-4">
                <Ticket className="w-8 h-8 text-neutral-600 group-hover:text-rose-500 transition-colors" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">02 // Live Ticketing Portal</h3>
                  <p className="text-xs font-mono text-neutral-500 uppercase mt-1">RSVP mapping data matrices active.</p>
                </div>
              </div>
              <ExternalLink className="text-neutral-700 group-hover:text-white transition-colors w-4 h-4" />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black px-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-neutral-600 tracking-widest uppercase border-t border-neutral-950 relative z-20">
        <div>© 2026 KR$NA PORTFOLIO ENGINE</div>
        <div className="mt-2 sm:mt-0">Built via React Three Fiber + Tailwind CSS</div>
      </footer>
    </div>
  );
}