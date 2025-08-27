"use client";

import React, { useRef, useState, useEffect } from 'react';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { 
  Cloud, 
  Database, 
  Server, 
  Activity, 
  Shield, 
  Layers
} from 'lucide-react';
import Image from 'next/image';

interface ServiceNode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'healthy' | 'warning' | 'critical';
  metrics: {
    uptime: number;
    load: number;
    connections: number;
  };
  position: 'top-left' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right';
  discovered: boolean;
  description: string;
}

const serviceNodes: ServiceNode[] = [
  {
    id: 'aws',
    name: 'AWS Cloud',
    icon: Cloud,
    status: 'healthy',
    metrics: { uptime: 99.9, load: 45, connections: 1247 },
    position: 'top-left',
    discovered: false,
    description: 'Auto-scaling infrastructure with intelligent cost optimization'
  },
  {
    id: 'database',
    name: 'Database Cluster',
    icon: Database,
    status: 'healthy',
    metrics: { uptime: 99.8, load: 62, connections: 834 },
    position: 'top-right',
    discovered: false,
    description: 'High-availability PostgreSQL cluster with automated backups'
  },
  {
    id: 'api',
    name: 'API Gateway',
    icon: Server,
    status: 'warning',
    metrics: { uptime: 98.5, load: 78, connections: 2156 },
    position: 'middle-left',
    discovered: false,
    description: 'Scalable API gateway with rate limiting and authentication'
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: Activity,
    status: 'healthy',
    metrics: { uptime: 100, load: 23, connections: 156 },
    position: 'middle-right',
    discovered: false,
    description: 'Real-time monitoring with AI-powered anomaly detection'
  },
  {
    id: 'security',
    name: 'Security Hub',
    icon: Shield,
    status: 'healthy',
    metrics: { uptime: 99.9, load: 34, connections: 445 },
    position: 'bottom-left',
    discovered: false,
    description: 'Advanced threat detection and compliance monitoring'
  },
  {
    id: 'kubernetes',
    name: 'K8s Cluster',
    icon: Layers,
    status: 'healthy',
    metrics: { uptime: 99.7, load: 56, connections: 1889 },
    position: 'bottom-right',
    discovered: false,
    description: 'Container orchestration with auto-healing and scaling'
  }
];

interface CircleProps {
  node: ServiceNode;
  isDiscovered: boolean;
  onHover: (node: ServiceNode | null) => void;
  nodeRef: React.RefObject<HTMLDivElement>;
}

function ServiceCircle({ node, isDiscovered, onHover, nodeRef }: CircleProps) {
  const statusColors = {
    healthy: 'bg-green-500/20 border-green-400 shadow-green-400/20',
    warning: 'bg-yellow-500/20 border-yellow-400 shadow-yellow-400/20',
    critical: 'bg-red-500/20 border-red-400 shadow-red-400/20'
  };

  const pulseColors = {
    healthy: 'animate-pulse bg-green-400',
    warning: 'animate-pulse bg-yellow-400',
    critical: 'animate-pulse bg-red-400'
  };

  return (
    <div
      ref={nodeRef}
      className={`
        relative z-10 flex size-14 items-center justify-center rounded-full border-2 backdrop-blur 
        transition-all duration-500 cursor-pointer group
        ${isDiscovered ? statusColors[node.status] : 'bg-white/5 border-white/20'}
        ${isDiscovered ? 'hover:scale-110' : 'scale-75 opacity-50'}
        shadow-[0_0_20px_-8px] hover:shadow-[0_0_30px_-8px]
      `}
      onMouseEnter={() => isDiscovered && onHover(node)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Status indicator */}
      {isDiscovered && (
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${pulseColors[node.status]}`} />
      )}
      
      {/* Main icon */}
      <node.icon className={`w-6 h-6 transition-colors duration-300 ${
        isDiscovered ? 'text-white' : 'text-white/30'
      }`} />
      
      {/* Discovery animation ring */}
      {!isDiscovered && (
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
      )}
    </div>
  );
}

interface HoverCardProps {
  node: ServiceNode;
  position: { x: number; y: number };
}

function HoverCard({ node, position }: HoverCardProps) {
  return (
    <div
      className="absolute z-50 pointer-events-none animate-in fade-in duration-200"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <div className="bg-black/90 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-2xl min-w-[300px]">
        <div className="flex items-center gap-3 mb-3">
          <node.icon className="w-5 h-5 text-white" />
          <span className="font-semibold text-white">{node.name}</span>
          <div className={`w-2 h-2 rounded-full ${
            node.status === 'healthy' ? 'bg-green-400' :
            node.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
          }`} />
        </div>
        
        <p className="text-sm text-gray-300 mb-3">{node.description}</p>
        
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="text-gray-400">Uptime</div>
            <div className="text-white font-mono">{node.metrics.uptime}%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">Load</div>
            <div className="text-white font-mono">{node.metrics.load}%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">Connections</div>
            <div className="text-white font-mono">{node.metrics.connections}</div>
          </div>
        </div>
      </div>
      
      {/* Arrow pointer */}
      <div className="flex justify-center">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/20" />
      </div>
    </div>
  );
}

export function EnhancedInfrastructureMapping() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});
  const centralNodeRef = useRef<HTMLDivElement>(null);
  
  const [discoveredServices, setDiscoveredServices] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<ServiceNode | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [discoveryComplete, setDiscoveryComplete] = useState(false);

  // Initialize refs for each service node
  useEffect(() => {
    serviceNodes.forEach(node => {
      if (!nodeRefs.current[node.id]) {
        nodeRefs.current[node.id] = React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;
      }
    });
  }, []);

  // Service discovery animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const intervals = serviceNodes.map((node, index) => {
        return setTimeout(() => {
          setDiscoveredServices(prev => new Set(prev).add(node.id));
          
          // Mark discovery as complete when all services are discovered
          if (index === serviceNodes.length - 1) {
            setTimeout(() => setDiscoveryComplete(true), 500);
          }
        }, index * 800); // Stagger discovery by 800ms
      });

      return () => intervals.forEach(clearTimeout);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNodeHover = (node: ServiceNode | null, event?: React.MouseEvent) => {
    if (event) {
      setHoverPosition({ x: event.clientX, y: event.clientY });
    }
    setHoveredNode(node);
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left': return 'absolute top-0 left-0';
      case 'top-right': return 'absolute top-0 right-0';
      case 'middle-left': return 'absolute top-1/2 left-0 -translate-y-1/2';
      case 'middle-right': return 'absolute top-1/2 right-0 -translate-y-1/2';
      case 'bottom-left': return 'absolute bottom-0 left-0';
      case 'bottom-right': return 'absolute bottom-0 right-0';
      default: return '';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Infrastructure Mapping */}
      <div
        ref={containerRef}
        className="relative h-[500px] w-full flex items-center justify-center overflow-visible p-12"
      >
        {/* Service nodes positioned around the perimeter */}
        {serviceNodes.map((node) => (
          <div
            key={node.id}
            className={getPositionClasses(node.position)}
          >
            <ServiceCircle
              node={node}
              isDiscovered={discoveredServices.has(node.id)}
              onHover={handleNodeHover}
              nodeRef={nodeRefs.current[node.id]}
            />
          </div>
        ))}

        {/* Central platform node */}
        <div
          ref={centralNodeRef}
          className="z-20 flex size-20 items-center justify-center rounded-full border-4 bg-white/10 backdrop-blur border-white/30 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
        >
          <Image
            src="/icon.svg"
            alt="Platform Core"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </div>

        {/* Animated beams connecting services to central node */}
        {discoveryComplete && serviceNodes.map((node) => (
          <AnimatedBeam
            key={`beam-${node.id}`}
            containerRef={containerRef}
            fromRef={nodeRefs.current[node.id]}
            toRef={centralNodeRef}
            curvature={Math.random() * 100 - 50} // Random curvature for organic feel
            duration={3 + Math.random() * 2} // Varying animation speeds
            gradientStartColor="#ffffff"
            gradientStopColor="#60a5fa"
            pathColor="white"
            pathOpacity={0.4}
            delay={Math.random() * 1000} // Random delays for staggered effect
          />
        ))}

        {/* Discovery status overlay */}
        {!discoveryComplete && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
            <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium">
                Discovering services... {discoveredServices.size}/{serviceNodes.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hover card */}
      {hoveredNode && (
        <HoverCard
          node={hoveredNode}
          position={hoverPosition}
        />
      )}
    </div>
  );
}