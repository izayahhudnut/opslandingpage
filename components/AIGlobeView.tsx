"use client";

import { Globe } from "@/components/magicui/globe";
import { useState, useEffect } from "react";
import { COBEOptions } from "cobe";

const regions = [
  "North America",
  "Europe", 
  "Asia Pacific",
  "South America",
  "Africa",
  "Middle East"
];

const insights = [
  "Optimizing latency across regions",
  "Balancing traffic distribution", 
  "Analyzing performance metrics",
  "Detecting anomalies globally",
  "Scaling infrastructure dynamically"
];

const DARK_GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.8,
  mapSamples: 16000,
  mapBrightness: 0.8,
  baseColor: [0.1, 0.1, 0.1],
  markerColor: [0.1, 0.8, 1],
  glowColor: [0.1, 0.4, 0.8],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function AIGlobeView() {
  const [currentRegion, setCurrentRegion] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRegion(prev => (prev + 1) % regions.length);
      setCurrentInsight(prev => (prev + 1) % insights.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* AI Header */}
      <div className="mb-3 px-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">AI Global Intelligence</span>
        </div>
        <p className="text-xs text-white/80">Monitoring worldwide infrastructure...</p>
      </div>
      
      {/* Globe Container */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-80 h-80 relative">
          <Globe 
            className="relative w-full h-full" 
            config={DARK_GLOBE_CONFIG}
          />
        </div>
      </div>
      
      {/* AI Insights */}
      <div className="space-y-2">
        <div className="p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs text-white">Active Region: {regions[currentRegion]}</span>
          </div>
        </div>
        
        <div className="p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs text-white">{insights[currentInsight]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}