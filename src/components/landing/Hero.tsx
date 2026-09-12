import React from 'react';
import { ArrowRight, ShieldAlert } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 opacity-40" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Real-time Financial Security Layer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Stop mule money <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              before it moves.
            </span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
            MuleShield is a real-time network intelligence engine that analyzes transaction streams to detect and isolate suspicious money movement patterns before funds propagate across institutions.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="/onboarding"
              className="px-6 py-3.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm flex items-center justify-center space-x-2 transition-all"
            >
              <span>Connect your bank</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#how-it-works"
              className="px-6 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-sm flex items-center justify-center transition-all"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-zinc-500">LIVE TRANSACTION STREAM</span>
              </div>
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>BLOCK</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Transaction ID</span>
                <span className="font-mono text-white">TX-9281</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Amount</span>
                <span className="text-lg font-bold font-mono text-white">₹48,000</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Route</span>
                <span className="text-zinc-300 font-medium">Bank A → Bank C</span>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-medium">Risk Score Analysis</span>
                  <span className="text-red-400 font-mono font-bold">91 / 100 (CRITICAL)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[91%]" />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Detected Signals</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700">HIGH VELOCITY</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700">RAPID DEPLETION</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700">SUSPICIOUS NETWORK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
