"use client";

import { Plus, Lock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function ThreeCardSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative bg-black py-16" id="three-card-section">
      {/* Overlay to reduce spotlight brightness */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1 - Uptime as a Service */}
          <div 
            className="relative group h-96 bg-gradient-to-br from-black via-gray-900/95 to-black rounded-2xl border border-white/30 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/40 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Central Image */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] flex items-center justify-center">
              <Image
                src="/65.svg"
                alt="AI Model Detection"
                width={208}
                height={208}
                className="w-[208px] h-[208px] opacity-80 transition-all duration-500 transform rotate-6 group-hover:scale-110 group-hover:rotate-12"
              />
            </div>
            
            {/* Content Layout */}
            <div className="absolute bottom-6 left-6 right-12">
              <h3 className="text-white font-medium text-lg leading-tight mb-2">
                Uptime as a Service
              </h3>
              <p className="text-white/60 text-sm font-medium">
                Selling peace of mind
              </p>
            </div>
            
            {/* Plus Button */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Card 2 - Security & Compliance Ready */}
          <div 
            className="relative group h-96 bg-gradient-to-br from-black via-gray-900/95 to-black rounded-2xl border border-white/30 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/40 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Concentric Rings Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Ring System */}
              {[120, 160, 200].map((size, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute rounded-full border transition-all duration-500",
                    hoveredCard === 2 ? "border-white/20" : "border-white/10",
                    "animate-pulse"
                  )}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: [0.6, 0.45, 0.3][i],
                    animationDuration: `${[3, 4, 5][i]}s`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
              
              {/* Central Icon */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-105 mb-2">
                  <Lock className="w-10 h-10 text-white/80" />
                </div>
                <div className="text-white/80 text-sm font-medium">Secure</div>
              </div>
            </div>
            
            {/* Content Layout */}
            <div className="absolute bottom-6 left-6 right-12">
              <h3 className="text-white font-medium text-lg leading-tight mb-2">
                Security and compliance on autopilot
              </h3>
              <p className="text-white/60 text-sm font-medium">
                Stop doing security work manually
              </p>
            </div>
            
            {/* Plus Button */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Card 3 - Proactive Optimization */}
          <div 
            className="relative group h-96 bg-gradient-to-br from-black via-gray-900/95 to-black rounded-2xl border border-white/30 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/40 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated Grid Pattern */}
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
              )}
            />
            
            {/* Content Layout */}
            <div className="absolute bottom-6 left-6 right-12">
              <h3 className="text-white font-medium text-lg leading-tight mb-2">
                We find what&apos;s breaking tomorrow
              </h3>
              <p className="text-white/60 text-sm font-medium">
                Proactive optimization
              </p>
            </div>
            
            {/* Empty Container for future floating UI elements */}
            <div className="p-8">
              {/* Reserved space for future enhancements */}
            </div>
            
            {/* Plus Button */}
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}