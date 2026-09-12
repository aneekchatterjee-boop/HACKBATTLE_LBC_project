import React from 'react';
import { AlertTriangle, Clock, Network, ShieldOff } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: 'Siloed Bank Detection',
    description:
      'Banks only see transactions inside their own systems, completely blind to coordinated multi-hop money laundering across external banks.',
  },
  {
    icon: Network,
    title: 'Rapid Mule Networks',
    description:
      'Fraud syndicates exploit instant payments, splitting funds into dozens of mule accounts across multiple nodes in under 45 seconds.',
  },
  {
    icon: ShieldOff,
    title: 'Post-Fraud Recovery Failure',
    description:
      'Traditional AML systems catch fraud days after settlement, leaving law enforcement and victims with empty accounts.',
  },
];

export default function Problem() {
  return (
    <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>The Banking Vulnerability</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Legacy AML systems fail against multi-bank mule routing.
        </h2>
        <p className="text-zinc-400 text-base">
          Fraudsters don't stay within one institution. MuleShield provides the missing inter-bank intelligence layer to block money laundering before funds vanish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {problems.map((item, idx) => (
          <div
            key={idx}
            className="bg-zinc-900/50 border border-zinc-800/80 p-8 rounded-2xl space-y-4 hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
