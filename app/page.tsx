"use client";

import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { ArrowRight, Container, Github, Hexagon, BarChart3 } from 'lucide-react';
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import React, { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FlipWords } from "@/components/ui/flip-words";
import { ThreeCardSection } from "@/components/ThreeCardSection";
import { Spotlight } from "@/components/ui/spotlight-new";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; message?: string }
>(({ className = "", children, message }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white/10 backdrop-blur border-white/20 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-200 hover:scale-110 hover:bg-white/20",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      
      {/* Hover Card */}
      {isHovered && message && (
        <div 
          className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none animate-in fade-in duration-200"
        >
          <div className="px-8 py-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md rounded-full shadow-lg w-80 h-14 flex items-center justify-center border border-white/20">
            <div className="text-center px-1">
              <span className="text-white text-sm font-medium leading-relaxed tracking-wide">{message}</span>
            </div>
          </div>
          {/* Arrow pointer */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white/10"></div>
          </div>
        </div>
      )}
    </div>
  );
});

Circle.displayName = "Circle";

const Icons = {
  aws: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 12C6.5 9.5 8.5 7.5 11 7.5C13.5 7.5 15.5 9.5 15.5 12C15.5 14.5 13.5 16.5 11 16.5C8.5 16.5 6.5 14.5 6.5 12Z" fill="#FF9900"/>
      <path d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12C21 17 17 21 12 21C7 21 3 17 3 12Z" stroke="#FF9900" strokeWidth="2" fill="none"/>
    </svg>
  ),
  gcp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L3 12L12 21L21 12L12 3Z" fill="#4285F4"/>
      <path d="M12 8L8 12L12 16L16 12L12 8Z" fill="#34A853"/>
    </svg>
  ),
  docker: () => (
    <Container className="w-5 h-5 text-blue-400" />
  ),
  kubernetes: () => (
    <Hexagon className="w-5 h-5 text-purple-400" />
  ),
  github: () => (
    <Github className="w-5 h-5 text-white" />
  ),
  datadog: () => (
    <BarChart3 className="w-5 h-5 text-purple-400" />
  ),
};

function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[400px] w-full items-center justify-center overflow-visible p-10 pt-24"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} message="Auto-scaling AWS infrastructure for peak performance">
            <Icons.aws />
          </Circle>
          <Circle ref={div5Ref} message="Optimizing GCP costs with intelligent resource management">
            <Icons.gcp />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} message="Automated deployments with quality assurance">
            <Icons.github />
          </Circle>
          <div 
            ref={div4Ref}
            className="z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white/10 backdrop-blur border-white/20 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
          >
            <Image
              src="/icon.svg"
              alt="Platform Icon"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <Circle ref={div6Ref} message="AI-powered monitoring with predictive insights">
            <Icons.datadog />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} message="Container optimization with security scanning">
            <Icons.docker />
          </Circle>
          <Circle ref={div7Ref} message="Intelligent cluster management with auto-healing">
            <Icons.kubernetes />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        gradientStartColor="#ffffff"
        gradientStopColor="#9ca3af"
        pathColor="white"
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        gradientStartColor="#ffffff"
        gradientStopColor="#9ca3af"
        pathColor="white"
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        gradientStartColor="#ffffff"
        gradientStopColor="#9ca3af"
        pathColor="white"
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
        gradientStartColor="#ffffff"
        gradientStopColor="#9ca3af"
        pathColor="white"
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
        gradientStartColor="#ffffff"
        gradientStopColor="#9ca3af"
        pathColor="white"
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
        gradientStartColor="#ffffff"
        gradientStopColor="#9ca3af"
        pathColor="white"
        pathOpacity={0.3}
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <Hero />
      </div>
      
      {/* Combined Section with Spotlight positioned for Operational Intelligence Engine */}
      <div className="relative w-full overflow-visible bg-black">
        {/* Spotlight effect behind the Operations Intelligence section */}
        <div className="absolute inset-x-0 top-0 z-0 overflow-visible pointer-events-none">
          {/* Spotlight moved lower behind the Ops section */}
          <Spotlight translateY={200} />
        </div>
        
        {/* Always Running Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-1000" id="about-content">
                {/* Meta Label */}
                <div className="flex items-center gap-3">
                  <Image
                    src="/icon.svg"
                    alt="Icon"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                    Always Running
                  </div>
                </div>
                
                {/* Hero Headline with FlipWords */}
                <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight">
                  Keep your
                  <FlipWords 
                    words={["bank", "hospital", "startup", "platform", "business", "application"]} 
                    duration={2500}
                    className="text-white"
                  />
                  <br />
                  online 24/7
                </h2>
                
                {/* Supporting Copy */}
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                  Monitor critical infrastructure and resolve issues before they impact users. 
                  Eliminate emergency alerts and prevent system failures.
                </p>
                
                {/* CTA Button */}
                <div className="pt-6">
                  <a href="https://cal.com/kenneth-eversole/demos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-50 text-black font-medium rounded-lg hover:from-gray-50 hover:to-gray-100 transition-all shadow-lg shadow-white/20 hover:shadow-lg hover:shadow-white/25">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                
              </div>
              
              {/* Right Visual - Before/After Compare */}
              <div className="relative h-80 animate-in slide-in-from-right-8 fade-in duration-1000 delay-300" id="compare-demo">
                <div className="w-full h-full flex items-center justify-center [perspective:800px] [transform-style:preserve-3d]">
                  <div
                    style={{
                      transform: "rotateX(15deg) translateZ(80px)",
                    }}
                    className="relative w-full h-full overflow-hidden"
                  >
                    {/* Only show border on top-left corner */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-neutral-700 rounded-tl-3xl"></div>
                    
                    <div className="relative w-full h-full bg-black transform scale-110 origin-top-left border border-white/5 rounded-2xl overflow-hidden">
                      {/* Fade to black overlay - stronger on bottom and right */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-black pointer-events-none z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black pointer-events-none z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none z-10"></div>
                      
                      {/* Zoomed Dashboard View - showing only top-left corner */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-green-900/20 animate-pulse opacity-20 scale-150 -translate-x-8 -translate-y-8"></div>
                      
                      {/* Main Content Zoomed */}
                      <div className="relative p-8 scale-150 origin-top-left -translate-x-4 -translate-y-4">
                        {/* Main Metric */}
                        <div className="space-y-2 animate-fade-in-up mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-5xl font-bold text-white animate-pulse">99.97%</span>
                            <svg className="w-5 h-5 text-green-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="text-base text-gray-400 animate-fade-in" style={{animationDelay: '0.5s'}}>
                            Uptime · <span className="text-green-400 animate-pulse">Global</span>
                          </div>
                        </div>

                        {/* Status Pills in Row */}
                        <div className="flex gap-2 mb-6 flex-wrap">
                          <div className="px-3 py-1 bg-white/15 rounded-full text-xs text-white/90 border border-white/30 animate-fade-in backdrop-blur-sm" style={{animationDelay: '1s'}}>
                            Auto-remediation active
                          </div>
                          <div className="px-3 py-1 bg-white/15 rounded-full text-xs text-white/90 border border-white/30 animate-fade-in backdrop-blur-sm opacity-70" style={{animationDelay: '1.2s'}}>
                            Security patched
                          </div>
                          <div className="px-3 py-1 bg-white/15 rounded-full text-xs text-white/90 border border-white/30 animate-fade-in backdrop-blur-sm opacity-40" style={{animationDelay: '1.4s'}}>
                            Error detection on
                          </div>
                        </div>

                        {/* Bottom Text - heavily faded */}
                        <div className="space-y-2 opacity-60">
                          <h3 className="text-xl font-semibold text-white animate-fade-in" style={{animationDelay: '1.8s'}}>Smart Infrastructure</h3>
                          <p className="text-sm text-gray-400 leading-relaxed max-w-48 animate-fade-in opacity-50" style={{animationDelay: '2s'}}>
                            Advanced monitoring with predictive insights...
                          </p>
                        </div>
                      </div>

                      {/* Floating particles - fewer and more subtle */}
                      <div className="absolute top-8 right-16 w-1 h-1 bg-white/20 rounded-full animate-ping opacity-30" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-20 left-32 w-1 h-1 bg-green-400/30 rounded-full animate-ping opacity-20" style={{animationDelay: '2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Intelligence Engine Text Section */}
        <div className="relative z-10 bg-black/[0.02] bg-grid-white/[0.02]">
          {/* Text Section */}
          <div className="flex md:items-center md:justify-center h-48">
            <div className="p-4 max-w-4xl mx-auto w-full pt-20 md:pt-0 text-center">
              <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight mb-4">
                Operational Intelligence Engine
              </h1>
              <p className="mt-4 font-normal text-lg text-neutral-300 max-w-2xl mx-auto">
                The missing layer that bridges platform engineering, security, and automation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      
      
      {/* Three Card Section - restored per user request */}
      <ThreeCardSection />
      {/* Third Section - DevOps Ecosystem */}
      <div className="bg-black" id="ecosystem-section">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Visual - Connected Services */}
            <div className="animate-in slide-in-from-left-8 fade-in duration-1000" id="services-visual">
              {/* @ts-ignore */}
        <AnimatedBeamDemo />
            </div>
            
            {/* Right Content */}
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-1000 delay-300" id="ecosystem-content">
              <div className="flex items-center gap-3">
                <Image
                  src="/icon.svg"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                  Connected Infrastructure
                </div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight">
                One platform,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  every service
                </span>
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                Connect your entire DevOps stack. From cloud providers to monitoring tools, 
                manage everything from a single dashboard.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-sm text-gray-400">
                  ✓ Cloud providers
                </div>
                <div className="text-sm text-gray-400">
                  ✓ Container orchestration
                </div>
                <div className="text-sm text-gray-400">
                  ✓ Source control systems
                </div>
                <div className="text-sm text-gray-400">
                  ✓ Monitoring platforms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section - Luxury Magazine Style */}
      <div className="bg-black py-32" id="cta-section">
        <div className="max-w-5xl mx-auto px-8">
          <div className="border-t border-white/10 pt-16"></div>
          
          <div className="text-center space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200" id="cta-content">
            {/* Overline */}
            <div className="text-gray-400 text-sm font-light uppercase tracking-[0.2em]">
              Autonomous Operations
            </div>
            
            {/* Main Headline */}
            <h2 className="text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight">
              Infrastructure
              <br />
              <span className="italic font-extralight">simplified</span>
            </h2>
            
            {/* Elegant paragraph */}
            <div className="max-w-xl mx-auto">
              <p className="text-gray-300 text-xl font-light leading-relaxed">
                Complex infrastructure shouldn&apos;t slow you down. 
                <br className="hidden sm:block" />
                We handle the operations, you focus on growth.
              </p>
            </div>
            
            {/* Centered Button */}
            <div className="pt-8 flex justify-center">
              <a href="https://cal.com/kenneth-eversole/demos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-white to-gray-50 text-black font-medium rounded-lg hover:from-gray-50 hover:to-gray-100 transition-all shadow-lg shadow-white/20 hover:shadow-lg hover:shadow-white/25">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="border-b border-white/5 pt-16"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="h-6 w-auto"
              />
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}