"use client";

import { useState, useEffect } from 'react';
import { CometCard } from '@/components/ui/comet-card';
import { 
  Activity, 
  CheckCircle, 
  DollarSign, 
  TrendingDown, 
  TrendingUp
} from 'lucide-react';

interface InfrastructureMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface ServiceHealth {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
}

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  primaryMetric: {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  metrics: InfrastructureMetric[];
  services: ServiceHealth[];
  tags: string[];
  glowColor: string;
  animationDelay: number;
}

const generateRealtimeData = (): CardData[] => [
  {
    id: 'incident-response',
    title: 'Incident Response',
    subtitle: 'AI-powered incident detection and automated resolution',
    primaryMetric: {
      value: '99.97%',
      label: 'System Uptime',
      icon: CheckCircle
    },
    metrics: [
      { label: 'MTTR', value: 8.2, unit: 'min', trend: 'down', change: -12.3 },
      { label: 'MTBF', value: 847, unit: 'hours', trend: 'up', change: 15.7 },
      { label: 'Alerts Resolved', value: 156, unit: 'today', trend: 'up', change: 8.4 }
    ],
    services: [
      { name: 'API Gateway', status: 'healthy', uptime: 99.98, responseTime: 45 },
      { name: 'Database', status: 'healthy', uptime: 99.95, responseTime: 12 },
      { name: 'Cache Layer', status: 'warning', uptime: 98.87, responseTime: 89 },
      { name: 'Load Balancer', status: 'healthy', uptime: 100, responseTime: 3 }
    ],
    tags: ['Auto-healing', 'Predictive', 'Real-time'],
    glowColor: 'to-red-500/5',
    animationDelay: 0
  },
  {
    id: 'infrastructure-optimization',
    title: 'Infrastructure Optimization',
    subtitle: 'Cost-efficient resource allocation with performance insights',
    primaryMetric: {
      value: '$47K',
      label: 'Monthly Savings',
      icon: DollarSign
    },
    metrics: [
      { label: 'CPU Efficiency', value: 87.3, unit: '%', trend: 'up', change: 5.2 },
      { label: 'Memory Usage', value: 64.7, unit: '%', trend: 'stable', change: 0.1 },
      { label: 'Storage Optimized', value: 2.4, unit: 'TB', trend: 'up', change: 18.9 }
    ],
    services: [
      { name: 'AWS EC2', status: 'healthy', uptime: 99.92, responseTime: 23 },
      { name: 'RDS Cluster', status: 'healthy', uptime: 99.99, responseTime: 8 },
      { name: 'S3 Storage', status: 'healthy', uptime: 100, responseTime: 15 },
      { name: 'CloudWatch', status: 'healthy', uptime: 99.87, responseTime: 67 }
    ],
    tags: ['Cost Optimization', 'Auto-scaling', 'Performance'],
    glowColor: 'to-green-500/5',
    animationDelay: 400
  },
  {
    id: 'monitoring-analytics',
    title: 'Monitoring & Analytics',
    subtitle: 'Advanced observability with ML-driven anomaly detection',
    primaryMetric: {
      value: '2.3M',
      label: 'Events Processed',
      icon: Activity
    },
    metrics: [
      { label: 'Anomalies Detected', value: 23, unit: 'today', trend: 'down', change: -34.5 },
      { label: 'Log Processing', value: 847, unit: 'GB/h', trend: 'up', change: 12.1 },
      { label: 'Dashboards Active', value: 67, unit: 'live', trend: 'up', change: 4.7 }
    ],
    services: [
      { name: 'Elasticsearch', status: 'healthy', uptime: 99.91, responseTime: 34 },
      { name: 'Grafana', status: 'healthy', uptime: 99.87, responseTime: 78 },
      { name: 'Prometheus', status: 'healthy', uptime: 99.94, responseTime: 22 },
      { name: 'Jaeger', status: 'warning', uptime: 98.23, responseTime: 156 }
    ],
    tags: ['ML Detection', 'Real-time', 'Observability'],
    glowColor: 'to-blue-500/5',
    animationDelay: 800
  }
];

function MetricBadge({ metric }: { metric: InfrastructureMetric }) {
  const TrendIcon = metric.trend === 'up' ? TrendingUp : 
                   metric.trend === 'down' ? TrendingDown : 
                   Activity;
  
  const trendColor = metric.trend === 'up' ? 'text-green-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 
                    'text-gray-400';

  return (
    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
      <div>
        <div className="text-xs text-white/60 mb-1">{metric.label}</div>
        <div className="font-mono font-bold text-white">
          {metric.value.toLocaleString()}{metric.unit}
        </div>
      </div>
      <div className={`flex items-center gap-1 ${trendColor}`}>
        <TrendIcon className="w-3 h-3" />
        <span className="text-xs font-medium">
          {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

function ServiceStatus({ service }: { service: ServiceHealth }) {
  const statusConfig = {
    healthy: { color: 'bg-green-400', text: 'text-green-400' },
    warning: { color: 'bg-yellow-400', text: 'text-yellow-400' },
    critical: { color: 'bg-red-400', text: 'text-red-400' }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${statusConfig[service.status].color} animate-pulse`} />
        <span className="text-sm text-white/80">{service.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-white/60 font-mono">
          {service.uptime}%
        </span>
        <span className="text-xs text-white/60 font-mono">
          {service.responseTime}ms
        </span>
      </div>
    </div>
  );
}

interface InfrastructureCardProps {
  data: CardData;
  isActive: boolean;
  onHover?: () => void;
}

function InfrastructureCard({ data, isActive, onHover }: InfrastructureCardProps) {
  return (
    <CometCard
      rotateDepth={isActive ? 18 : 8}
      translateDepth={isActive ? 30 : 15}
    >
      <div 
        className={`w-[30rem] h-[26rem] rounded-2xl p-6 backdrop-blur-xl transition-all duration-500
          bg-gradient-to-br from-black/95 via-black/90 to-black/80 
          border border-white/10 shadow-2xl
          bg-gradient-to-br from-black/95 ${data.glowColor}
          ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-20'}
        `}
        onMouseEnter={onHover}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <data.primaryMetric.icon className="w-8 h-8 text-white" />
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">{data.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{data.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Primary Metric */}
        <div className="mb-6">
          <div className="text-4xl font-bold text-white mb-1">{data.primaryMetric.value}</div>
          <div className="text-sm text-white/60">{data.primaryMetric.label}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content Area - Conditional Rendering */}
        <div className="space-y-4">
          {isActive && (
            <>
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 gap-3">
                {data.metrics.slice(0, 2).map((metric) => (
                  <MetricBadge key={metric.label} metric={metric} />
                ))}
              </div>

              {/* Services Status */}
              <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">Service Health</div>
                {data.services.slice(0, 3).map((service) => (
                  <ServiceStatus key={service.name} service={service} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </CometCard>
  );
}

interface EnhancedInfrastructureCardsProps {
  currentCardIndex: number;
  onCardChange: (index: number) => void;
}

export function EnhancedInfrastructureCards({ 
  currentCardIndex, 
  onCardChange 
}: EnhancedInfrastructureCardsProps) {
  const [cards, setCards] = useState<CardData[]>([]);

  // Initialize cards with real-time data
  useEffect(() => {
    setCards(generateRealtimeData());
    
    // Update data periodically
    const interval = setInterval(() => {
      setCards(generateRealtimeData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through cards
  useEffect(() => {
    const interval = setInterval(() => {
      onCardChange((currentCardIndex + 1) % cards.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentCardIndex, cards.length, onCardChange]);

  if (cards.length === 0) return null;

  return (
    <div className="relative w-full h-[28rem] [perspective:1500px] [transform-style:preserve-3d]">
      {cards.map((card, index) => {
        const isActive = index === currentCardIndex;
        const translateX = isActive ? '0px' : index < currentCardIndex ? '-240px' : '240px';
        const zIndex = isActive ? 30 : index < currentCardIndex ? 10 : 20;
        const opacity = isActive ? 1 : 0.2;

        return (
          <div
            key={card.id}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              transform: `translateX(${translateX}) scale(${isActive ? 1 : 0.85})`,
              zIndex,
              opacity
            }}
          >
            <InfrastructureCard
              data={card}
              isActive={isActive}
              onHover={() => isActive && onCardChange(index)}
            />
          </div>
        );
      })}
      
      {/* Card Navigation Indicators */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentCardIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => onCardChange(index)}
          />
        ))}
      </div>
    </div>
  );
}