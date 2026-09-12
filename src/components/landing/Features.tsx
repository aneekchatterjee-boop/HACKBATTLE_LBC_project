import React from 'react';
import { Cpu, Lock, Network, Zap } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Sub-second Risk Scoring',
    description:
      'Evaluates incoming transaction payloads against network topology models before authorization completes.',
  },
  {
    icon: Network,
    title: 'Cross-Bank Graph Analysis',
    description:
      'Maps funds routing across participating nodes to flag coordinated multi-account pooling instantly.',
  },
  {
    icon: Cpu,
    title: 'Behavioral Velocity Detection',
    description:
      'Identifies accounts exhibiting rapid cash-in and immediate wire-out behaviors typical of mule operation.',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Data Sharing',
    description:
      'Protects customer PII using encrypted multi-party computation while maintaining inter-bank fraud visibility.',
  },
];

export default function Features() {
  return (
    <section id="technology" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Built for real-time inter-bank defense.
        </h2>
        <p className="text-zinc-400 text-base">
          Our intelligence pipeline plugs directly into transaction gateways to surface high-confidence risk signals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl space-y-4 hover:border-orange-500/50 hover:bg-zinc-900/80 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
