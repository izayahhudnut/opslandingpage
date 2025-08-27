"use client";

import { Plus, Code, Zap, Grid3X3 } from "lucide-react";
import { useState } from "react";

export function ThreeCardSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="bg-black py-2" id="three-card-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* First Card - Purpose-built for product development */}
          <div 
            className="relative group h-96 bg-gradient-to-br from-black via-gray-900/50 to-black rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Background 3D Layered Panels */}
            <div className="absolute inset-0 p-8">
              {/* Back layers - semi-transparent UI mockups */}
              <div className="absolute top-16 left-8 w-64 h-32 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 transform rotate-12 -translate-x-4 transition-transform duration-700 group-hover:rotate-6">
                <div className="p-4 font-mono text-xs text-white/60">
                  <div className="text-green-400">function aiModelDet...</div>
                  <div className="text-white/80">return "ACCURATE"</div>
                </div>
              </div>
              
              <div className="absolute top-24 right-4 w-48 h-28 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 transform -rotate-6 translate-x-2 transition-transform duration-700 group-hover:rotate-3">
                <div className="p-3 text-xs text-white/60">
                  <div className="mb-1">Projects / Roadmap</div>
                  <div className="w-full h-1 bg-white/20 rounded-full mb-1">
                    <div className="w-3/4 h-full bg-blue-400/60 rounded-full"></div>
                  </div>
                  <div className="text-white/40 text-xs">Issues: 24</div>
                </div>
              </div>
              
              {/* Foreground focal symbol */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/15">
                <Plus className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Bottom tagline */}
            <div className="absolute bottom-6 left-6 right-12">
              <h3 className="text-white font-medium text-lg leading-tight">
                Purpose-built for<br />product development
              </h3>
            </div>
            
            {/* Bottom-right + button */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Second Card - Designed to move fast */}
          <div 
            className="relative group h-96 bg-gradient-to-br from-black via-gray-900/50 to-black rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Motion streaks and speed visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Orbital rings/velocity streaks */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-all duration-1000 group-hover:scale-110"
                  style={{
                    transform: `rotate(${i * 36 - 72}deg) translateX(${40 + i * 8}px)`,
                    opacity: 0.8 - i * 0.15,
                    animationDelay: `${i * 100}ms`
                  }}
                />
              ))}
              
              {/* Central speed indicator */}
              <div className="relative z-10 text-center">
                <div className="text-3xl font-bold text-white mb-1 transition-all duration-500 group-hover:scale-110">
                  50ms
                </div>
                <div className="w-16 h-16 mx-auto bg-white/5 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Bottom tagline */}
            <div className="absolute bottom-6 left-6 right-12">
              <h3 className="text-white font-medium text-lg leading-tight">
                Designed to<br />move fast
              </h3>
            </div>
            
            {/* Bottom-right + button */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Third Card - Crafted to perfection */}
          <div 
            className="relative group h-96 bg-gradient-to-br from-black via-gray-900/50 to-black rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* 3D Grid and floating UI elements */}
            <div className="absolute inset-0 p-8">
              {/* Grid plane */}
              <div className="absolute inset-0 opacity-30">
                <svg 
                  className="w-full h-full" 
                  viewBox="0 0 400 400" 
                  style={{ transform: 'perspective(800px) rotateX(60deg) translateZ(-100px)' }}
                >
                  {/* Grid lines */}
                  {[...Array(10)].map((_, i) => (
                    <g key={i}>
                      <line 
                        x1={i * 40} 
                        y1={0} 
                        x2={i * 40} 
                        y2={400} 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth="1"
                        strokeDasharray="2,4"
                      />
                      <line 
                        x1={0} 
                        y1={i * 40} 
                        x2={400} 
                        y2={i * 40} 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth="1"
                        strokeDasharray="2,4"
                      />
                    </g>
                  ))}
                  {/* Anchor points */}
                  {[...Array(25)].map((_, i) => {
                    const x = (i % 5) * 80 + 40;
                    const y = Math.floor(i / 5) * 80 + 40;
                    return (
                      <circle 
                        key={i}
                        cx={x} 
                        cy={y} 
                        r="2" 
                        fill="rgba(255,255,255,0.3)"
                      />
                    );
                  })}
                </svg>
              </div>
              
              {/* Floating UI blocks */}
              <div className="absolute top-16 left-16 w-20 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center transform transition-all duration-700 group-hover:-translate-y-2 group-hover:rotate-3">
                <span className="text-xs text-white/80">Create</span>
              </div>
              
              <div className="absolute top-32 right-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center transform transition-all duration-700 group-hover:-translate-y-1 group-hover:-rotate-2">
                <Plus className="w-4 h-4 text-white" />
              </div>
              
              {/* Central focal element */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/15">
                <Grid3X3 className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Bottom tagline */}
            <div className="absolute bottom-6 left-6 right-12">
              <h3 className="text-white font-medium text-lg leading-tight">
                Crafted to<br />perfection
              </h3>
            </div>
            
            {/* Bottom-right + button */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}