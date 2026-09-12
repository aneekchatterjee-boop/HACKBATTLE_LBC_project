import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Mule<span className="text-orange-500">Shield</span>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#technology" className="hover:text-white transition-colors">Technology</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-2">
            Sign in
          </button>
          <a
            href="/onboarding"
            className="text-sm font-medium bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <span>Connect your bank</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
