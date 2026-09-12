// src/app/onboarding/page.tsx
'use client';
import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, Building2, Lock } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [bankName, setBankName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between p-6">
      <div className="max-w-xl mx-auto w-full pt-12 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Mule<span className="text-orange-500">Shield</span>
            </span>
          </Link>
          <span className="text-xs font-mono text-zinc-500">STEP {step} OF 3</span>
        </div>

        {!submitted ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-white">
                {step === 1 && "Connect your institution"}
                {step === 2 && "Configure gateway protocol"}
                {step === 3 && "Security and zero-knowledge compliance"}
              </h1>
              <p className="text-zinc-400 text-sm">
                {step === 1 && "Enter your banking organization name to initialize the gateway link."}
                {step === 2 && "Select your core transaction routing architecture."}
                {step === 3 && "Verify encryption keys for multi-party secure computation."}
              </p>
            </div>

            <form onSubmit={handleNext} className="space-y-4">
              {step === 1 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Institution Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g., Apex National Bank"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Routing Protocol</label>
                  {['ISO 20022 Real-Time Feed', 'UPI / Instant Payment Gateway Hook', 'SWIFT Cross-Border Node'].map((proto, idx) => (
                    <label key={idx} className="flex items-center space-x-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                      <input type="radio" name="protocol" defaultChecked={idx === 0} className="text-orange-500 focus:ring-orange-500" />
                      <span className="text-sm font-medium text-zinc-200">{proto}</span>
                    </label>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Compliance Check</label>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs text-zinc-400">
                    <div className="flex items-center space-x-2 text-orange-400 font-medium">
                      <Lock className="w-4 h-4" />
                      <span>Zero-Knowledge Multi-Party Computation Enabled</span>
                    </div>
                    <p>PII data will remain masked on local node hardware while graph models evaluate threat topology.</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
              >
                <span>{step === 3 ? 'Complete Integration' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Gateway Connected Successfully</h2>
              <p className="text-zinc-400 text-sm">
                {bankName || 'Your institution'} is now linked to the MuleShield inter-bank defense pipeline. Sandbox environment active.
              </p>
            </div>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-sm font-semibold transition-all"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}