'use client';

import React from 'react';
import { Shield, LayoutDashboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="p-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-white tracking-tight text-lg">
            Mule<span className="text-orange-500">Shield</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#technology" className="hover:text-white transition-colors">
            Technology
          </a>
        </div>

        {/* Right CTA Group */}
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center space-x-2 transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/onboarding"
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs flex items-center space-x-1 transition-colors"
          >
            <span>Connect bank</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
