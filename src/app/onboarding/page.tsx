'use client';

import React, { useState } from 'react';
import { Shield, ArrowRight, CheckCircle2, Building2, KeyRound, Server, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const banks = [
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC0000001' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICIC0000002' },
  { id: 'sbi', name: 'State Bank of India', code: 'SBIN0000003' },
  { id: 'axis', name: 'Axis Bank', code: 'UTIB0000004' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState('');
  const [apiKey, setApiKey] = useState('mule_live_sec_89f2a49b81');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setStep(3);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-black">
      {/* Simple Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-white tracking-tight text-sm">
            Mule<span className="text-orange-500">Shield</span> Node Setup
          </span>
        </div>
      </header>

      {/* Main Flow Container */}
      <div className="max-w-xl mx-auto w-full px-6 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8 text-xs font-mono text-zinc-500">
          <span className={step >= 1 ? 'text-orange-400 font-bold' : ''}>1. Select Institution</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-orange-400 font-bold' : ''}>2. API Credentials</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-orange-400 font-bold' : ''}>3. Verify Node</span>
        </div>

        {/* STEP 1: Select Bank */}
        {step === 1 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight">Select your Banking Node</h1>
              <p className="text-sm text-zinc-400">Choose the primary financial institution to connect to the MuleShield anti-fraud relay grid.</p>
            </div>

            <div className="space-y-3">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.id)}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all text-left ${
                    selectedBank === bank.id
                      ? 'border-orange-500 bg-orange-500/10 text-white'
                      : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-orange-400" />
                    <div>
                      <div className="font-semibold text-sm">{bank.name}</div>
                      <div className="text-xs font-mono text-zinc-500">{bank.code}</div>
                    </div>
                  </div>
                  {selectedBank === bank.id && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedBank}
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue to Integration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Configure Credentials */}
        {step === 2 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight">Configure API Gateway</h1>
              <p className="text-sm text-zinc-400">Enter your institution's transaction webhook endpoint secret to establish an encrypted socket.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-2">INTEGRATION API KEY</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <div className="font-semibold text-zinc-300">Sandbox Environment Mode</div>
                <div>Payloads are routed through a zero-knowledge simulation proxy. No live PII is ingested.</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-2/3 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                {isConnecting ? (
                  <span>Verifying Node Socket...</span>
                ) : (
                  <>
                    <span>Initialize Connection</span>
                    <Server className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success Screen */}
        {step === 3 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight">Bank Node Successfully Connected!</h1>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                Your institution's transaction stream is now active. MuleShield is actively scoring cross-bank mule risk in real-time.
              </p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-left space-y-1 text-zinc-400">
              <div className="text-orange-400">STATUS: ACTIVE_NODE</div>
              <div>SOCKET: wss://relay.muleshield.io/v1/stream</div>
              <div>LATENCY: 14ms</div>
            </div>

            <Link
              href="/"
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm transition-colors block text-center"
            >
              Return to Landing Page
            </Link>
          </div>
        )}
      </div>

      <footer className="text-center py-6 border-t border-zinc-900 text-xs text-zinc-600">
        MuleShield Enterprise Onboarding Security Protocol v2.4
      </footer>
    </main>
  );
}
