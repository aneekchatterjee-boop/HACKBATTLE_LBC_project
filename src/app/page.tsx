import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Activity, Building2, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-orange-500 selection:text-black flex flex-col">
      <header className="border-b border-zinc-900 bg-zinc-950/80 sticky top-0 z-50 backdrop-blur px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-white tracking-tight text-lg">
            Mule<span className="text-orange-500">Shield</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-white font-mono transition-colors">
            Live Grid
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs transition-colors flex items-center space-x-1"
          >
            <span>Bank Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center justify-center space-y-8">
        <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-mono text-orange-400">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span>Inter-Bank Fraud Prevention Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          Real-time intelligence grid against <span className="text-orange-500">mule account networks</span>.
        </h1>

        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          MuleShield unifies fragmented inter-bank transactional streams into a real-time risk scoring relay—intercepting illicit cross-institution transfers before settlement.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/10"
          >
            <span>Launch Bank Onboarding Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-sm transition-all flex items-center justify-center space-x-2"
          >
            <Activity className="w-4 h-4 text-orange-400" />
            <span>View Live Dashboard</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 w-full text-left">
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl w-fit text-orange-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Node Integration</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Standardized 5-step onboarding flow for commercial banks to link transactional stream APIs into the grid.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl w-fit text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Sub-15ms Telemetry</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Real-time socket-based risk score calculations evaluating transfer velocity across participating grid nodes.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl w-fit text-orange-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Automated Interception</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Immediate action triggers (Allow, Under Review, or Block) protecting multi-hop recipient networks.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600 font-mono">
        MuleShield Core • Hackathon Deployment Edition
      </footer>
    </div>
  );
}
