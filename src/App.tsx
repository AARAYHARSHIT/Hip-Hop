/** @jsxImportSource react */
import React, { useState } from 'react';
import { Disc, Layers, Music, ExternalLink } from 'lucide-react';
import Scene from './components/Scene';

// Explicit local asset imports from your zip map folder paths
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden selection:bg-rose-600">
      
      {/* Global Navigation Wrapper */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="text-lg font-black tracking-widest font-mono text-white">KR$NA // YOURS TRULY</div>
        <nav className="hidden md:flex space-x-8 text-xs font-mono tracking-widest text-neutral-400">
          <a href="#3d-viewport" className="hover:text-rose-500 transition-colors">01 // WebGL CANVAS</a>
          <a href="#tracks" className="hover:text-rose-500 transition-colors">02 // DISCOGRAPHY</a>
          <a href="#gallery" className="hover:text-rose-500 transition-colors">03 // ARTWORK EXHIBIT</a>
        </nav>
        <a 
          href="#tracks" 
          className="bg-white text-black font-mono text-xs px-4 py-1.5 uppercase font-bold hover:bg-rose-600 hover:text-white transition-all duration-300"
        >
          EXPLORE
        </a>
      </header>

      {/* Hero Viewport Frame */}
      <section id="3d-viewport" className="relative h-screen w-full flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
        
        {/* WebGL Component Target container */}
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>

        <div className="absolute left-6 bottom-24 z-20 max-w-lg pointer-events-none select-none hidden md:block">
          <span className="text-rose-500 font-mono text-xs block mb-2 tracking-widest uppercase">// NOW RENDERING 3D MATRIX</span>
          <h1 className="text-8xl font-black tracking-tighter leading-none text-white uppercase drop-shadow-2xl">
            YOURS <br />
            <span className="text-neutral-500 opacity-80">TRULY</span>
          </h1>
        </div>
      </section>

      {/* Marquee Ticker Stripe */}
      <div className="w-full bg-rose-600 py-2.5 overflow-hidden whitespace-nowrap border-y border-white/10 relative z-20">
        <div className="inline-block animate-marquee font-mono text-xs tracking-widest text-black font-black uppercase">
          PRARTHANA • YOURS TRULY • STILL HERE • TIME WILL TELL • FAR FROM OVER • JOOTA JAPANI • NO CAP • PRARTHANA • YOURS TRULY • STILL HERE • TIME WILL TELL • FAR FROM OVER • JOOTA JAPANI • NO CAP •
        </div>
      </div>

      {/* Interactive Item Tracker Section */}
      <section id="tracks" className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <div className="mb-12 border-b border-neutral-800 pb-4 flex justify-between items-end">
          <div>
            <span className="font-mono text-xs text-rose-500 tracking-widest block mb-1 uppercase">// COLLECTION LOG</span>
            <h2 className="text-3xl font-black uppercase tracking-tight">DHH PLATFORM DATA MAPPING</h2>
          </div>
          <Music className="text-neutral-700 w-8 h-8 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Grid Controller Cards List */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {discography.map((track) => (
              <div
                key={track.id}
                onClick={() => setActiveTrack(track)}
                className={`p-5 border transition-all duration-300 cursor-pointer flex justify-between items-center bg-[#121212] group ${
                  activeTrack.id === track.id ? 'border-rose-500 bg-neutral-900/40' : 'border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2.5 transition-colors duration-300 ${activeTrack.id === track.id ? 'bg-rose-500 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                    <Disc className={`w-5 h-5 ${activeTrack.id === track.id ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm tracking-wide uppercase">{track.title}</h4>
                    <p className="text-[11px] font-mono text-neutral-400 uppercase">{track.type} // {track.vibe}</p>
                  </div>
                </div>
                <div className="font-mono text-xs text-neutral-600 group-hover:text-neutral-300 transition-colors">{track.year}</div>
              </div>
            ))}
          </div>

          {/* Right Monitor Panel Block (Dynamic Image Rendering) */}
          <div className="border border-neutral-800 bg-[#111111] p-4 sticky top-24">
            <div className="aspect-square bg-neutral-900 overflow-hidden relative border border-neutral-800 group mb-4">
              <img 
                src={activeTrack.image} 
                alt={activeTrack.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-black/80 font-mono text-[10px] px-2 py-0.5 border border-white/10 tracking-widest text-rose-500 uppercase">
                // {activeTrack.year}
              </div>
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">{activeTrack.title}</h3>
                <span className="font-mono text-xs text-neutral-400 block mt-0.5 uppercase">{activeTrack.vibe}</span>
              </div>
              <Layers className="text-rose-500 w-5 h-5 mt-1" />
            </div>
          </div>

        </div>
      </section>

      {/* Grid Image Mapping Showcase Layout Section */}
      <section id="gallery" className="py-24 px-6 bg-black border-t border-neutral-900 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-rose-500 tracking-widest block mb-1 uppercase">// MATRIX VIEW</span>
            <h2 className="text-3xl font-black uppercase tracking-tight">ARTWORK EXHIBITION</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {discography.slice(0, 4).map((track, i) => (
              <div key={i} className="border border-neutral-800 bg-[#121212] p-3 group hover:border-rose-500 transition-colors duration-300">
                <div className="w-full aspect-square overflow-hidden bg-neutral-900 mb-3 border border-neutral-800">
                  <img src={track.image} alt="Exhibition Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex justify-between items-center font-mono text-[10px] text-neutral-500">
                  <span className="uppercase font-bold text-neutral-300">{track.title}</span>
                  <span>[0{i + 1}]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-neutral-900 bg-[#060606] px-6 text-center font-mono text-[11px] text-neutral-600 uppercase tracking-widest relative z-20">
        // PORTFOLIO RUNNING VITE ENGINE ENGINE CORE. ALL SYSTEMS OPERATIONAL.
      </footer>
    </div>
  );
}