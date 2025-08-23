"use client"

import { useEffect, useState, useRef, forwardRef } from "react"
import { CustomTypingAnimation } from "@/components/custom-typing-animation"
import { LiquidGlass } from "@/components/liquid-glass"
import { ArrowUp, Loader2, Github, Server, Zap, Check, Database, Cloud, Globe, MonitorSpeaker, Network, Users, Activity, Shield, Gauge } from "lucide-react"
import Image from "next/image"
import { GridBeams } from "@/components/magicui/grid-beams";
import { AnimatedList } from "@/components/magicui/animated-list";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Particles } from "@/components/magicui/particles";
import { Ripple } from "@/components/magicui/ripple";
import { cn } from "@/lib/utils";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const Hero = () => {
  const [vw, setVw] = useState(1200)
  const [animationStage, setAnimationStage] = useState(0) // 0: initial, 1: arrow rotated, 2: loading, 3: boxes flying
  const [showBoxes, setShowBoxes] = useState([false, false, false])
  const [cardLoadingStates, setCardLoadingStates] = useState([true, true, true])
  const [cardTextAnimated, setCardTextAnimated] = useState([false, false, false])
  const [moveHeaderAndInput, setMoveHeaderAndInput] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)
  const optimizeRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleTypingComplete = () => {
    if (animationStage === 0) {
      setAnimationStage(1)
      
      // Pressed animation, then loading
      setTimeout(() => {
        setAnimationStage(2)
        
        // Show boxes one by one
        setTimeout(() => {
          setAnimationStage(3)
          setMoveHeaderAndInput(true) // Start moving header and input immediately
          
          setTimeout(() => setShowBoxes([true, false, false]), 1000)
          setTimeout(() => setShowBoxes([true, true, false]), 3000)
          setTimeout(() => setShowBoxes([true, true, true]), 5000)
          
          // Start loading animation for cards and then complete them
          setTimeout(() => {
            setCardLoadingStates([false, true, true])
            setTimeout(() => setCardTextAnimated([true, false, false]), 100)
          }, 2000)
          
          setTimeout(() => {
            setCardLoadingStates([false, false, true])
            setTimeout(() => setCardTextAnimated([true, true, false]), 100)
          }, 2500)
          
          setTimeout(() => {
            setCardLoadingStates([false, false, false])
            setTimeout(() => setCardTextAnimated([true, true, true]), 100)
          }, 3000)
        }, 1500)
      }, 500)
    }
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Bulbs */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)'
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-80 h-80 rounded-full blur-3xl animate-float-slower"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.06) 40%, transparent 70%)'
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-20 w-72 h-72 rounded-full blur-3xl animate-float-reverse"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 40%, transparent 70%)'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-32 w-64 h-64 rounded-full blur-3xl animate-float-diagonal"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.06) 40%, transparent 70%)'
          }}
        ></div>
        <div 
          className="absolute top-60 left-1/2 w-80 h-80 rounded-full blur-3xl animate-float-orbit"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 40%, transparent 70%)'
          }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/3 w-56 h-56 rounded-full blur-3xl animate-float-gentle"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(236, 72, 153, 0.04) 40%, transparent 70%)'
          }}
        ></div>
      </div>
      {/* Header and Input - Fixed Position */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-10 w-full max-w-7xl px-4 transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        moveHeaderAndInput ? '-translate-y-[120%]' : '-translate-y-1/2'
      }`}>
        <h1
          className="relative z-10 text-[96px] font-medium tracking-[-0.03em] leading-[1] text-center text-transparent bg-clip-text animate-shimmer-very-slow flex items-center justify-center gap-4"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #777 0%, #999 35%, rgba(255,255,255,0.8) 45%, #fff 50%, rgba(255,255,255,0.8) 55%, #999 65%, #777 100%)",
            backgroundSize: "250% 100%",
            fontFamily: "Inter, sans-serif",
          }}
        >
          SMART DEPLOY WITH
          <Image
            src="/icon.svg"
            alt="Icon"
            width={96}
            height={96}
            className="w-24 h-24 inline-block mx-3 -mr-3 opacity-75"
          />
          PS
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
                <CustomTypingAnimation 
                  text="Improve homepage speed"
                  speed={80}
                  className="text-gray-300"
                  loop={true}
                  pauseDuration={1500}
                  onComplete={handleTypingComplete}
                />
              </span>
            </div>

            <button
              className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                animationStage >= 3 ? 'bg-green-500/80 hover:bg-green-500' : 
                animationStage === 1 ? 'transform rotate-90 scale-95 bg-white/40' : 'bg-white/20 hover:bg-white/30'
              }`}
              aria-label="Send"
            >
              {animationStage === 2 ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : animationStage >= 3 ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <ArrowUp className={`w-4 h-4 text-white transition-transform duration-300 ${
                  animationStage === 1 ? 'rotate-90' : ''
                }`} />
              )}
            </button>
          </div>
        </LiquidGlass>
      </div>

      {/* Floating Glass Boxes - Separate Positioning */}
      {animationStage >= 3 && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-12" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
          <div className={`flex flex-col transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            showBoxes[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Github className="w-3 h-3 text-white/60" />
              </div>
              <h3 className="text-white/60 text-2xl font-medium">Repository Activity</h3>
            </div>
            <LiquidGlass
              variant="panel"
              intensity="medium"
              rippleEffect={false}
              flowOnHover={true}
              stretchOnDrag={false}
              className="w-80 h-80 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-md rounded-xl shadow-2xl shadow-black/30 border border-white/20 border-t-white/30 border-l-white/25"
              style={{
                animation: `float1 4.5s ease-in-out infinite`,
                transform: 'rotateX(15deg) rotateY(-8deg) translateZ(20px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              <div className="w-full h-full flex flex-col px-0.5 py-1">
                <div className="flex-1">
                  {cardTextAnimated[0] ? (
                    <AnimatedList delay={800} className="w-full h-full flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-sm text-gray-200 bg-white/10 rounded-xl p-4 min-h-[60px]">
                        <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <span className="font-medium">Bundle size reduced</span>
                          <div className="text-xs text-gray-400 mt-1">Webpack optimization complete</div>
                        </div>
                        <span className="text-xs text-gray-400">2m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-200 bg-white/10 rounded-xl p-4 min-h-[60px]">
                        <div className="w-3 h-3 bg-orange-400 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <span className="font-medium">Performance check</span>
                          <div className="text-xs text-gray-400 mt-1">Lighthouse audit completed</div>
                        </div>
                        <span className="text-xs text-gray-400">5m ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-200 bg-white/10 rounded-xl p-4 min-h-[60px]">
                        <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <span className="font-medium">Code analysis</span>
                          <div className="text-xs text-gray-400 mt-1">ESLint checks passed</div>
                        </div>
                        <span className="text-xs text-gray-400">8m ago</span>
                      </div>
                    </AnimatedList>
                  ) : (
                    <div className="h-32"></div>
                  )}
                </div>
                
                <div className="mt-1 pt-1 border-t border-white/10">
                  <span className="text-white/70 text-xs underline cursor-pointer hover:text-white/90 transition-colors">
                    View Details
                  </span>
                </div>
              </div>
            </LiquidGlass>
          </div>
          
          <div className={`flex flex-col transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            showBoxes[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Server className="w-3 h-3 text-white/60" />
              </div>
              <h3 className="text-white/60 text-2xl font-medium">Server Insight</h3>
            </div>
            <LiquidGlass
              variant="panel"
              intensity="medium"
              rippleEffect={false}
              flowOnHover={true}
              stretchOnDrag={false}
              className="w-80 h-80 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-md rounded-xl shadow-2xl shadow-black/30 border border-white/20 border-t-white/30 border-l-white/25"
              style={{
                animation: `float2 5.2s ease-in-out infinite`,
                transform: 'rotateX(12deg) rotateY(0deg) translateZ(30px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              <div className="w-full h-full flex flex-col px-0.5 py-1 relative overflow-hidden">
                <Ripple 
                  mainCircleSize={120}
                  mainCircleOpacity={0.04}
                  numCircles={3}
                />
                
                <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                  <div className="mb-4">
                    <AnimatedCircularProgressBar
                      max={100}
                      min={0}
                      value={75}
                      gaugePrimaryColor="rgb(34 197 94)"
                      gaugeSecondaryColor="rgba(255, 255, 255, 0.1)"
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-white text-sm font-medium mb-1">Server Performance</div>
                    <div className="text-gray-300 text-xs">75% optimal</div>
                    <div className="text-orange-300 text-xs mt-2">4 slow endpoints detected</div>
                  </div>
                </div>
                
                <div className="mt-1 pt-1 border-t border-white/10">
                  <span className="text-white/70 text-xs underline cursor-pointer hover:text-white/90 transition-colors">
                    View Details
                  </span>
                </div>
              </div>
            </LiquidGlass>
          </div>
          
          <div className={`flex flex-col transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            showBoxes[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Zap className="w-3 h-3 text-white/60" />
              </div>
              <h3 className="text-white/60 text-2xl font-medium">Optimize Performance</h3>
            </div>
            <LiquidGlass
              variant="panel"
              intensity="medium"
              rippleEffect={false}
              flowOnHover={true}
              stretchOnDrag={false}
              className="w-80 h-80 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-md rounded-xl shadow-2xl shadow-black/30 border border-white/20 border-t-white/30 border-l-white/25"
              style={{
                animation: `float3 6s ease-in-out infinite`,
                transform: 'rotateX(15deg) rotateY(8deg) translateZ(20px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              <div className="w-full h-full flex flex-col px-4 py-4 relative" ref={containerRef}>
                <Particles
                  className="absolute inset-0 opacity-40"
                  quantity={30}
                  staticity={30}
                  size={0.3}
                  color="#ffffff"
                />
                
                <div className="text-center mb-6 relative z-10">
                  <div className="text-white text-sm font-medium">Performance Optimization</div>
                  <div className="text-gray-400 text-xs">Connect and accelerate</div>
                </div>
                
                <div className="flex-1 flex items-center justify-center relative z-10">
                  <div className="flex justify-between items-center w-full px-4">
                    <div className="text-center">
                      <Circle ref={monitorRef}>
                        <Activity className="w-5 h-5 text-black" />
                      </Circle>
                      <div className="text-xs text-gray-300 font-medium mt-2">Monitor</div>
                      <div className="text-[10px] text-gray-500">2.3s</div>
                    </div>
                    
                    <div className="text-center">
                      <Circle ref={optimizeRef}>
                        <Zap className="w-5 h-5 text-black" />
                      </Circle>
                      <div className="text-xs text-gray-300 font-medium mt-2">Process</div>
                      <div className="text-[10px] text-orange-400">1.2s</div>
                    </div>
                    
                    <div className="text-center">
                      <Circle ref={resultRef}>
                        <Gauge className="w-5 h-5 text-black" />
                      </Circle>
                      <div className="text-xs text-gray-300 font-medium mt-2">Optimize</div>
                      <div className="text-[10px] text-green-400">0.8s</div>
                    </div>
                  </div>
                  
                  {/* Simple connecting lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <line 
                        x1="15%" 
                        y1="38%" 
                        x2="42%" 
                        y2="38%" 
                        stroke="rgba(255,255,255,0.15)" 
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                      <line 
                        x1="58%" 
                        y1="38%" 
                        x2="85%" 
                        y2="38%" 
                        stroke="rgba(255,255,255,0.15)" 
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                        style={{ animationDelay: '0.5s' }}
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center relative z-10">
                  <span className="text-white/60 text-xs underline cursor-pointer hover:text-white/80 transition-colors">
                    View Details
                  </span>
                  <button className="px-3 py-2 bg-gradient-to-r from-white/80 to-gray-200/80 hover:from-white hover:to-gray-200 text-gray-800 text-xs font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105">
                    Optimize Now
                  </button>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </div>
      )}


      <style jsx>{`
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 18s ease-in-out infinite reverse;
        }
        .animate-float-diagonal {
          animation: float-diagonal 22s ease-in-out infinite;
        }
        .animate-float-orbit {
          animation: float-orbit 30s ease-in-out infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 16s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}

export default Hero
