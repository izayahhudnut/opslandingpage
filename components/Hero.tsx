"use client"

import React, { useState, useRef, forwardRef, useEffect } from "react"
import { CustomTypingAnimation } from "@/components/custom-typing-animation"
import { LiquidGlass } from "@/components/liquid-glass"
import { CometCard } from "@/components/ui/comet-card"
import { ArrowUp, Loader2, AlertTriangle, Activity, Search, Check, TrendingDown, TrendingUp, BarChart3, Zap, Eye, Bug, Clock, Layers, MonitorSpeaker, FileSearch, Terminal as TerminalIcon, DollarSign, Users, Wrench } from "lucide-react"
import Image from "next/image"
import { AnimatedList } from "@/components/magicui/animated-list";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/magicui/terminal";
import dynamic from "next/dynamic";
import { Globe } from "@/components/magicui/globe";
import { EnhancedActivityFeed } from "@/components/EnhancedActivityFeed";
import { LiveTerminalDemo } from "@/components/LiveTerminalDemo";
import { AIGlobeView } from "@/components/AIGlobeView";

// Circle component for the button
const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }
>(({ className, children, onClick, disabled }, ref) => {
  return (
    <div
      ref={ref}
      onClick={disabled ? undefined : onClick}
      className={`
        z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} 
        ${className}
      `}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// Prompts data structure
const prompts = [
  {
    text: "How can I reduce incident response time by 70%?",
    cardType: 0, // Incident Response  
    gradient: "from-red-500 to-orange-600",
    cardData: {
      mttr: "14m",
      incidents: [
        { service: "API Gateway", duration: "Resolved", color: "green" },
        { service: "Database", duration: "2m ago", color: "yellow" },
        { service: "Cache Layer", duration: "Active", color: "red" },
      ],
      healthScore: 94,
      metrics: [
        { name: "CPU", value: 45, threshold: 100 },
        { name: "Memory", value: 67, threshold: 100 },
        { name: "Disk I/O", value: 23, threshold: 100 },
      ],
      activities: [
        { type: "success", message: "Auto-resolved API timeout", time: "2m" },
        { type: "warning", message: "High memory usage detected", time: "5m" },
        { type: "info", message: "Backup completed", time: "12m" },
      ]
    }
  },
  {
    text: "What's the best way to optimize my cloud infrastructure costs?",
    cardType: 1, // Infrastructure Optimization
    gradient: "from-emerald-500 to-green-600",
    cardData: {
      monthlySavings: "$12,400",
      services: "47",
      healthScore: 97,
      metrics: [
        { name: "Cost Efficiency", value: 89, threshold: 100 },
        { name: "Resource Utilization", value: 76, threshold: 100 },
        { name: "Auto-scaling", value: 92, threshold: 100 },
      ],
      activities: [
        { type: "success", message: "Scaled down unused instances", time: "15m" },
        { type: "success", message: "Optimized storage costs", time: "1h" },
        { type: "info", message: "Scheduled maintenance", time: "2h" },
      ]
    }
  },
  {
    text: "Can you show me real-time monitoring across all regions?",
    cardType: 2, // Global Monitoring
    gradient: "from-blue-500 to-indigo-600",
    cardData: {
      globalUptime: "99.97%",
      regions: 12,
      healthScore: 96,
      metrics: [
        { name: "Global Latency", value: 85, threshold: 100 },
        { name: "Availability", value: 99, threshold: 100 },
        { name: "Throughput", value: 78, threshold: 100 },
      ],
      activities: [
        { type: "success", message: "All regions operational", time: "now" },
        { type: "info", message: "Failover test completed", time: "30m" },
        { type: "success", message: "CDN cache optimized", time: "1h" },
      ]
    }
  }
];

function Hero() {
  const [animationStage, setAnimationStage] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardAnimated, setCardAnimated] = useState(false);
  const [contentReadyCards, setContentReadyCards] = useState<number[]>([]);
  const [moveHeaderAndInput, setMoveHeaderAndInput] = useState(false);
  const [revealedCards, setRevealedCards] = useState<number[]>([]); // Track which cards have been revealed
  const cyclingStartedRef = useRef(false);
  const cycleStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-start animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000); // Start after 1 second

    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through all prompts; ensure we don't accidentally clear interval on re-renders
  useEffect(() => {
    if (animationStage !== 4 || cyclingStartedRef.current) return;
    cyclingStartedRef.current = true;

    cycleStartTimeoutRef.current = setTimeout(() => {
      let currentIndex = 0;

      const cycleToNextPrompt = () => {
        currentIndex = (currentIndex + 1) % prompts.length;
        
        // If we've completed all 3 prompts (back to 0), reset everything
        if (currentIndex === 0) {
          setRevealedCards([]);
          setContentReadyCards([]);
        }
        
        setCardAnimated(false);
        setAnimationStage(1);
        setCurrentPromptIndex(currentIndex);
        setTimeout(() => setAnimationStage(2), 500);
      };

      cycleToNextPrompt();
      cycleIntervalRef.current = setInterval(cycleToNextPrompt, 12000);
    }, 3000);
  }, [animationStage]);

  // Cleanup only on unmount
  useEffect(() => {
    return () => {
      if (cycleStartTimeoutRef.current) clearTimeout(cycleStartTimeoutRef.current);
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
    };
  }, []);

  const startAnimation = () => {
    setAnimationStage(1); // Move header up, show spinner
    setMoveHeaderAndInput(true);

    setTimeout(() => {
      setAnimationStage(2); // Start typing animation - onComplete will handle the rest
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float-slow-pulse opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.20) 40%, transparent 70%)',
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-80 h-80 rounded-full blur-3xl animate-float-slower-pulse opacity-45"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.32) 0%, rgba(168, 85, 247, 0.18) 40%, transparent 70%)',
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-20 w-72 h-72 rounded-full blur-3xl animate-float-reverse-pulse opacity-55"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.30) 0%, rgba(34, 197, 94, 0.18) 40%, transparent 70%)',
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-32 w-64 h-64 rounded-full blur-3xl animate-float-diagonal-pulse opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.32) 0%, rgba(6, 182, 212, 0.20) 40%, transparent 70%)',
          }}
        ></div>
        <div 
          className="absolute top-60 left-1/2 w-80 h-80 rounded-full blur-3xl animate-float-orbit-pulse opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(99, 102, 241, 0.16) 40%, transparent 70%)',
          }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/3 w-56 h-56 rounded-full blur-3xl animate-float-gentle-pulse opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.30) 0%, rgba(236, 72, 153, 0.16) 40%, transparent 70%)',
          }}
        ></div>
      </div>

      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-10 w-full max-w-7xl px-4 transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        moveHeaderAndInput ? '-translate-y-[45%]' : '-translate-y-1/2'
      }`}>
        {/* Hero Header */}
        <h1 
          className="relative z-10 text-[96px] font-medium tracking-[-0.03em] text-center text-transparent bg-clip-text animate-shimmer-very-slow flex items-center justify-center gap-4"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #777 0%, #999 35%, rgba(255,255,255,0.8) 45%, #fff 50%, rgba(255,255,255,0.8) 55%, #999 65%, #777 100%)",
            backgroundSize: '200% 100%',
            fontFamily: "Inter, sans-serif",
            animation: 'shimmer-very-slow 3s ease-in-out infinite',
            backgroundPosition: '0% 50%'
          }}
        >
          Smart Deploy with
          <Image
            src="/icon.svg"
            alt="Ops Icon"
            width={96}
            height={96}
            className="w-24 h-24 inline-block -mr-3 opacity-75"
          />ps
        </h1>

        {/* ChatGPT-style glass input */}
        <LiquidGlass
          variant="panel"
          intensity="medium"
          rippleEffect={false}
          flowOnHover={true}
          stretchOnDrag={false}
          className="relative z-10 w-full max-w-[600px] rounded-full px-6 py-4 text-white bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md"
        >
          <div className="flex w-full items-center gap-2">
            <div className="min-w-0 flex-1 overflow-hidden whitespace-nowrap leading-none">
              <span className="block truncate text-base text-gray-300">
                {animationStage > 0 && (
                  <CustomTypingAnimation
                    className="text-gray-300"
                    speed={20}
                    text={prompts[currentPromptIndex].text}
                    key={currentPromptIndex}
                    onComplete={() => {
                      // When typing finishes, always proceed to spinner -> check -> cards
                      setAnimationStage(2.5); // Show loading spinner
                        setTimeout(() => {
                          setAnimationStage(3); // Show green checkmark
                          setTimeout(() => {
                            setAnimationStage(4); // Reveal cards
                            setCurrentCardIndex(currentPromptIndex);
                            setRevealedCards(prev => (
                              prev.includes(currentPromptIndex) ? prev : [...prev, currentPromptIndex]
                            ));
                            setContentReadyCards(prev => (
                              prev.includes(currentPromptIndex) ? prev : [...prev, currentPromptIndex]
                            ));
                            setCardAnimated(true);
                          }, 800);
                        }, 1000);
                    }}
                  />
                )}
              </span>
            </div>
            <button
              onClick={animationStage === 0 ? startAnimation : undefined}
              className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                animationStage >= 3 ? 'bg-green-500/80 hover:bg-green-500' : 
                animationStage === 2.5 ? 'transform rotate-90 scale-95 bg-white/40' : 'bg-white/20 hover:bg-white/30'
              }`}
              aria-label="Send"
            >
              {animationStage >= 3 ? (
                <Check className="w-4 h-4 text-white" />
              ) : animationStage === 2.5 ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <ArrowUp className={`w-4 h-4 text-white transition-transform duration-300 ${
                  animationStage === 0 ? 'hover:scale-110' : ''
                }`} />
              )}
            </button>
          </div>
        </LiquidGlass>

        {/* Cards Carousel Layout */}
        {revealedCards.length > 0 && (
          <div className="mt-2 w-full relative">
            <div className="relative flex justify-center items-center min-h-[40rem] py-8" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
              {/* Card 1 - Animated List */}
              <div 
                className={`absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
                style={{ 
                  transform: `translateY(${revealedCards.includes(0) ? '0px' : '100px'}) translateX(${ 
                    currentCardIndex === 0 ? '0px' : 
                    currentCardIndex === 1 ? '-270px' : 
                    '270px'
                  }) scale(${currentCardIndex === 0 ? '1' : '0.85'})`,
                  opacity: revealedCards.includes(0) ? (currentCardIndex === 0 ? 1 : 0.2) : 0,
                  zIndex: currentCardIndex === 0 ? 30 : (currentCardIndex === 1 ? 10 : 20),
                  transitionDelay: animationStage >= 4 ? '0ms' : '0ms'
                }}>
                <CometCard className="w-[40rem] h-[36rem]" rotateDepth={currentCardIndex === 0 ? 18 : 8} translateDepth={currentCardIndex === 0 ? 30 : 15}>
                  <div className="w-full h-full bg-white/5 backdrop-blur-2xl rounded-xl border border-white/20 overflow-hidden shadow-2xl shadow-white/5">
                    <div className="p-4 h-full flex items-center justify-center">
                      {contentReadyCards.includes(0) ? (
                        <EnhancedActivityFeed />
                      ) : (
                        <div className="animate-pulse w-8 h-8 bg-white/10 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </CometCard>
              </div>

              {/* Card 2 - Terminal */}
              <div 
                className={`absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
                style={{ 
                  transform: `translateY(${revealedCards.includes(1) ? '0px' : '100px'}) translateX(${ 
                    currentCardIndex === 1 ? '0px' : 
                    currentCardIndex === 2 ? '-270px' : 
                    '270px'
                  }) scale(${currentCardIndex === 1 ? '1' : '0.85'})`,
                  opacity: revealedCards.includes(1) ? (currentCardIndex === 1 ? 1 : 0.2) : 0,
                  zIndex: currentCardIndex === 1 ? 30 : (currentCardIndex === 2 ? 10 : 20),
                  transitionDelay: animationStage >= 3 ? '200ms' : '200ms'
                }}>
                <CometCard className="w-[40rem] h-[36rem]" rotateDepth={currentCardIndex === 1 ? 18 : 8} translateDepth={currentCardIndex === 1 ? 30 : 15}>
                  <div className="w-full h-full bg-white/5 backdrop-blur-2xl rounded-xl border border-white/20 overflow-hidden shadow-2xl shadow-white/5">
                    <div className="p-4 h-full flex items-center justify-center">
                      {contentReadyCards.includes(1) ? (
                        <LiveTerminalDemo />
                      ) : (
                        <div className="animate-pulse w-8 h-8 bg-white/10 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </CometCard>
              </div>

              {/* Card 3 - Globe */}
              <div 
                className={`absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
                style={{ 
                  transform: `translateY(${revealedCards.includes(2) ? '0px' : '100px'}) translateX(${ 
                    currentCardIndex === 2 ? '0px' : 
                    currentCardIndex === 0 ? '-270px' : 
                    '270px'
                  }) scale(${currentCardIndex === 2 ? '1' : '0.85'})`,
                  opacity: revealedCards.includes(2) ? (currentCardIndex === 2 ? 1 : 0.2) : 0,
                  zIndex: currentCardIndex === 2 ? 30 : (currentCardIndex === 0 ? 10 : 20),
                  transitionDelay: animationStage >= 3 ? '400ms' : '400ms'
                }}>
                <CometCard className="w-[40rem] h-[36rem]" rotateDepth={currentCardIndex === 2 ? 18 : 8} translateDepth={currentCardIndex === 2 ? 30 : 15}>
                  <div className="w-full h-full bg-white/5 backdrop-blur-2xl rounded-xl border border-white/20 overflow-hidden shadow-2xl shadow-white/5">
                    <div className="p-3 h-full">
                      {contentReadyCards.includes(2) ? (
                        <AIGlobeView />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <div className="animate-pulse w-8 h-8 bg-white/10 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </CometCard>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer-very-slow {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes float-enhanced {
          0%, 100% { 
            transform: translate3d(0px, 0px, 0px) rotate(0deg);
          }
          25% { 
            transform: translate3d(8px, -12px, 10px) rotate(1deg);
          }
          50% { 
            transform: translate3d(-6px, -20px, 15px) rotate(-0.5deg);
          }
          75% { 
            transform: translate3d(-10px, -8px, 8px) rotate(0.8deg);
          }
        }
        @keyframes float-gentle-exit {
          0%, 100% { 
            transform: translate3d(0px, 0px, 0px) rotate(0deg) scale(1);
          }
          50% { 
            transform: translate3d(-15px, -25px, 5px) rotate(-1deg) scale(0.98);
          }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, -60px) scale(0.9); }
          75% { transform: translate(-40px, 20px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-50px, 30px) scale(0.95); }
          66% { transform: translate(40px, -20px) scale(1.08); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          30% { transform: translate(60px, 40px) scale(0.92); }
          70% { transform: translate(-30px, -50px) scale(1.12); }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-45px, -45px) scale(0.88); }
        }
        @keyframes float-orbit {
          0% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(80px, -30px) scale(1.15); }
          50% { transform: translate(0px, -60px) scale(0.85); }
          75% { transform: translate(-80px, -30px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(25px, -35px) scale(0.95); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-shimmer-very-slow {
          animation: shimmer-very-slow 3s ease-in-out infinite;
        }
        /* Combined float + pulse so both animations can run together */\n        .animate-float-slow-pulse {\n          animation: float-slow 20s ease-in-out infinite, pulse-slow 4s ease-in-out infinite;\n        }\n        .animate-float-slower-pulse {\n          animation: float-slower 25s ease-in-out infinite, pulse-slow 4s ease-in-out infinite;\n        }\n        .animate-float-reverse-pulse {\n          animation: float-reverse 18s ease-in-out infinite reverse, pulse-slow 4s ease-in-out infinite;\n        }\n        .animate-float-diagonal-pulse {\n          animation: float-diagonal 22s ease-in-out infinite, pulse-slow 4s ease-in-out infinite;\n        }\n        .animate-float-orbit-pulse {\n          animation: float-orbit 30s ease-in-out infinite, pulse-slow 4s ease-in-out infinite;\n        }\n        .animate-float-gentle-pulse {\n          animation: float-gentle 16s ease-in-out infinite, pulse-slow 4s ease-in-out infinite;\n        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        @keyframes fade-in {
          0% { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% { 
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        .animate-float-enhanced {
          animation: float-enhanced 8s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .animate-float-gentle-exit {
          animation: float-gentle-exit 6s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}

export default Hero