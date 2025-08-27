"use client";

import { useState, useEffect } from 'react';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/magicui/terminal';
import { CheckCircle, AlertCircle, Clock, Zap, Shield } from 'lucide-react';

interface TerminalSequence {
  type: 'command' | 'output' | 'success' | 'warning' | 'info';
  content: string;
  delay?: number;
}

const devOpsSequences = {
  deployment: [
    { type: 'command', content: '> kubectl apply -f prod.yaml' },
    { type: 'output', content: 'deployment configured' },
    { type: 'output', content: 'service configured' },
    { type: 'success', content: '✓ Deployment complete' },
    { type: 'command', content: '> kubectl get pods' },
    { type: 'output', content: 'NAME        READY   STATUS' },
    { type: 'output', content: 'api-server  1/1     Running' },
    { type: 'output', content: 'worker-1    1/1     Running' },
    { type: 'success', content: '✓ All pods healthy' },
    { type: 'command', content: '> curl /health' },
    { type: 'output', content: '{"status": "ok"}' },
    { type: 'success', content: '✓ Service validated' }
  ] as TerminalSequence[],
  
  monitoring: [
    { type: 'command', content: '> ops monitor --real-time --infrastructure' },
    { type: 'info', content: '🔍 Initializing real-time monitoring dashboard...' },
    { type: 'success', content: '✓ Connected to 47 service endpoints' },
    { type: 'success', content: '✓ Metrics collection active' },
    { type: 'output', content: '' },
    { type: 'output', content: '📊 SYSTEM OVERVIEW' },
    { type: 'output', content: '├─ CPU Usage: 34% (↓2% from 5min ago)' },
    { type: 'output', content: '├─ Memory: 2.4GB / 8GB (30%)' },
    { type: 'output', content: '├─ Network: 145MB/s in, 89MB/s out' },
    { type: 'output', content: '└─ Disk I/O: 234 IOPS (read: 156, write: 78)' },
    { type: 'output', content: '' },
    { type: 'output', content: '🚨 ALERTS & ANOMALIES' },
    { type: 'warning', content: '⚠ Database connection pool 87% utilized' },
    { type: 'success', content: '✓ Auto-scaling triggered: +2 instances' },
    { type: 'success', content: '✓ Load balancer reconfigured' },
    { type: 'info', content: '📈 Response time improved: 89ms → 45ms' }
  ] as TerminalSequence[],
  
  security: [
    { type: 'command', content: '> ops security scan --deep --production' },
    { type: 'info', content: '🛡️ Initiating comprehensive security scan...' },
    { type: 'success', content: '✓ Vulnerability database updated (CVE-2024-*)' },
    { type: 'success', content: '✓ Container images scanned: 23/23' },
    { type: 'success', content: '✓ Network policies validated' },
    { type: 'output', content: '' },
    { type: 'output', content: '🔒 SECURITY FINDINGS' },
    { type: 'success', content: '✓ No critical vulnerabilities detected' },
    { type: 'success', content: '✓ All secrets properly encrypted' },
    { type: 'success', content: '✓ RBAC policies compliant' },
    { type: 'warning', content: '⚠ 2 medium-risk dependencies identified' },
    { type: 'info', content: '📋 Auto-generated remediation plan:' },
    { type: 'output', content: '   • Update lodash: 4.17.19 → 4.17.21' },
    { type: 'output', content: '   • Update express: 4.17.1 → 4.18.2' },
    { type: 'command', content: '> npm audit fix --production' },
    { type: 'success', content: '✓ Dependencies updated automatically' },
    { type: 'success', content: '✓ Security baseline restored' }
  ] as TerminalSequence[]
};

export function LiveTerminalDemo() {
  const [currentSequence, setCurrentSequence] = useState<'deployment' | 'monitoring' | 'security'>('deployment');
  const [terminalKey, setTerminalKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [visibleToasts, setVisibleToasts] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  // Cycle through different demo sequences
  useEffect(() => {
    const sequences: Array<'deployment' | 'monitoring' | 'security'> = ['deployment', 'monitoring', 'security'];
    let currentIndex = 0;

    // Show toast notifications with staggered timing
    const toastMessages = [
      { id: 1, message: 'Infrastructure scan completed', delay: 3000 },
      { id: 2, message: 'Auto-scaling rules optimized', delay: 4500 },
      { id: 3, message: 'Security policies updated', delay: 6000 }
    ];
    
    toastMessages.forEach((toast) => {
      setTimeout(() => {
        setVisibleToasts(prev => [...prev, toast.id]);
        // Hide toast after 3 seconds
        setTimeout(() => {
          setVisibleToasts(prev => prev.filter(id => id !== toast.id));
        }, 3000);
      }, toast.delay);
    });
    
    // Show main popup
    setTimeout(() => {
      const messages = {
        deployment: 'Deployment optimized with zero downtime',
        monitoring: 'Performance improved by 34%',
        security: 'Security vulnerabilities patched automatically'
      };
      setPopupMessage(messages['deployment']);
      setShowPopup(true);
      
      // Hide popup after 4 seconds
      setTimeout(() => setShowPopup(false), 4000);
    }, 8000); // Show initial popup

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequences.length;
      setCurrentSequence(sequences[currentIndex]);
      setTerminalKey(prev => prev + 1); // Force re-render
      
      // Show popup after sequence completes
      setTimeout(() => {
        const messages = {
          deployment: 'Deployment optimized with zero downtime',
          monitoring: 'Performance improved by 34%',
          security: 'Security vulnerabilities patched automatically'
        };
        setPopupMessage(messages[sequences[currentIndex]]);
        setShowPopup(true);
        
        // Hide popup after 4 seconds
        setTimeout(() => setShowPopup(false), 4000);
      }, 8000); // Show popup 8 seconds after sequence starts
    }, 45000); // Switch every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const getSequenceTitle = (sequence: string) => {
    switch (sequence) {
      case 'deployment': return 'Production Deployment';
      case 'monitoring': return 'Real-time Monitoring';
      case 'security': return 'Security Scanning';
      default: return 'DevOps Operations';
    }
  };

  const getSequenceIcon = (sequence: string) => {
    switch (sequence) {
      case 'deployment': return '🚀';
      case 'monitoring': return '📊';
      case 'security': return '🛡️';
      default: return '⚡';
    }
  };

  return (
    <div className="w-full">
      {/* Header matching EnhancedActivityFeed */}
      <div className="mb-4 px-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">AI Operations</span>
        </div>
        <p className="text-xs text-white/70">Live infrastructure management</p>
      </div>
      
      {/* Terminal Container */}
      <div className="relative">
        <div className="mb-3">
          <Terminal
            key={terminalKey}
            className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg p-3 font-mono text-sm leading-normal w-full h-64 overflow-hidden"
            startOnView={true}
            sequence={true}
          >
            {devOpsSequences[currentSequence].slice(0, 6).map((item, index) => {
              if (item.type === 'command') {
                return (
                  <TypingAnimation
                    key={index}
                    className="text-blue-400"
                    duration={30}
                  >
                    {item.content}
                  </TypingAnimation>
                );
              } else {
                const colorClass = 
                  item.type === 'success' ? 'text-green-400' :
                  item.type === 'warning' ? 'text-yellow-400' :
                  item.type === 'info' ? 'text-cyan-400' :
                  'text-gray-300';

                return (
                  <AnimatedSpan
                    key={index}
                    className={colorClass}
                  >
                    <span>{item.content}</span>
                  </AnimatedSpan>
                );
              }
            })}
            
            {/* Final prompt */}
            <TypingAnimation className="text-green-400">
              {"> _"}
            </TypingAnimation>
          </Terminal>
        </div>
        
        {/* Status and notifications matching EnhancedActivityFeed structure */}
        <div className="mt-3 space-y-2">
          {[1, 2, 3].map((toastId) => {
            const toastData = {
              1: { message: 'Infrastructure scan completed', icon: CheckCircle },
              2: { message: 'Auto-scaling rules optimized', icon: Zap },
              3: { message: 'Security policies updated', icon: Shield }
            }[toastId];
            
            const IconComponent = toastData?.icon || CheckCircle;
            
            return visibleToasts.includes(toastId) ? (
              <div key={toastId} className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-xs text-white/80">{toastData?.message}</span>
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </div>

        {/* Main Success Popup */}
        {showPopup && (
          <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-500 ease-out shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-white">{popupMessage}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}