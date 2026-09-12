import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to fortify your transaction pipeline?
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              Integrate MuleShield SDK in minutes or start with our simulated bank sandbox.
            </p>
          </div>
          <a
            href="/onboarding"
            className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm flex items-center space-x-2 transition-colors shrink-0"
          >
            <span>Connect your bank</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900 pt-8 gap-4 text-sm text-zinc-500">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-bold text-white tracking-tight">
              Mule<span className="text-orange-500">Shield</span>
            </span>
            <span>— Inter-bank Fraud Intelligence Engine</span>
          </div>

          <p className="text-xs">© {new Date().getFullYear()} MuleShield Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
