'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  KeyRound, 
  Server, 
  ArrowLeft,
  Sliders,
  Play,
  Check
} from 'lucide-react';
import Link from 'next/link';

const presetBanks = [
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC0000001' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICIC0000002' },
  { id: 'sbi', name: 'State Bank of India', code: 'SBIN0000003' },
  { id: 'axis', name: 'Axis Bank', code: 'UTIB0000004' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  // 1. Bank Information State
  const [bankName, setBankName] = useState('HDFC Bank');
  const [ifscPrefix, setIfscPrefix] = useState('HDFC0000001');

  // 2. Stream Connection Credentials
  const [apiUrl, setApiUrl] = useState('https://api.hdfcbank.com/v1/stream');
  const [apiKey, setApiKey] = useState('mule_live_sec_89f2a49b81x90');

  // 3. Field Mapping Schema State
  const [mappings, setMappings] = useState({
    transactionId: 'txn_ref_no',
    senderAccount: 'src_account_num',
    receiverAccount: 'dest_account_num',
    amount: 'transfer_amt',
    timestamp: 'created_at_utc',
  });

  // 4. Test Integration Simulation State
  const [testingStatus, setTestingStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [testLogs, setTestLogs] = useState<string[]>([]);

  const runIntegrationTest = () => {
    setTestingStatus('running');
    setTestLogs(['[SYS] Initiating handshake with ' + apiUrl + '...']);

    setTimeout(() => {
      setTestLogs(prev => [...prev, '[SYS] TLS 1.3 encrypted socket established.']);
    }, 600);

    setTimeout(() => {
      setTestLogs(prev => [...prev, '[SCHEMA] Validating mapped payload attributes...']);
    }, 1200);

    setTimeout(() => {
      setTestLogs(prev => [...prev, '[MULESHIELD] Connection verified! Node latency: 12ms.']);
      setTestingStatus('success');
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing</span>
        </Link>

        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-white tracking-tight text-sm">
            Mule<span className="text-orange-500">Shield</span> Bank Gateway
          </span>
        </div>
      </header>

      {/* Main Form Container */}
      <div className="max-w-2xl mx-auto w-full px-6 py-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 text-[11px] font-mono text-zinc-500 overflow-x-auto pb-2">
          <span className={step >= 1 ? 'text-orange-400 font-bold' : ''}>1. Bank Details</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-orange-400 font-bold' : ''}>2. Connect Stream</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-orange-400 font-bold' : ''}>3. Map Fields</span>
          <span>→</span>
          <span className={step >= 4 ? 'text-orange-400 font-bold' : ''}>4. Test Setup</span>
          <span>→</span>
          <span className={step >= 5 ? 'text-orange-400 font-bold' : ''}>5. Ready</span>
        </div>

        {/* STEP 1: Bank Information */}
        {step === 1 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight">Step 1: Bank Information</h1>
              <p className="text-sm text-zinc-400">Select or enter your bank credentials for grid enrollment.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-2">PRESET INSTITUTION</label>
                <div className="grid grid-cols-2 gap-2">
                  {presetBanks.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => {
                        setBankName(bank.name);
                        setIfscPrefix(bank.code);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        bankName === bank.name
                          ? 'border-orange-500 bg-orange-500/10 text-white'
                          : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="font-semibold text-xs">{bank.name}</div>
                      <div className="text-[10px] font-mono text-zinc-500">{bank.code}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">INSTITUTION NAME</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">IFSC / ROUTING CODE</label>
                <input
                  type="text"
                  value={ifscPrefix}
                  onChange={(e) => setIfscPrefix(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
            >
              <span>Next: Connect Transaction Stream</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Connect Stream */}
        {step === 2 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight">Step 2: Connect Transaction Stream</h1>
              <p className="text-sm text-zinc-400">Provide your transaction stream endpoint and secret key.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">STREAM API ENDPOINT</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">SECRET API KEY</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm flex items-center justify-center space-x-2"
              >
                <span>Next: Map Transaction Fields</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Map Transaction Fields */}
        {step === 3 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight">Step 3: Map Transaction Fields</h1>
              <p className="text-sm text-zinc-400">Map your bank's JSON payload keys to MuleShield attributes.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {Object.keys(mappings).map((key) => (
                <div key={key} className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-orange-400 font-bold uppercase">{key}</span>
                  <span className="text-zinc-600">→</span>
                  <input
                    type="text"
                    value={mappings[key as keyof typeof mappings]}
                    onChange={(e) =>
                      setMappings({ ...mappings, [key]: e.target.value })
                    }
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-orange-500 text-right w-1/2"
                  />
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm flex items-center justify-center space-x-2"
              >
                <span>Next: Test Integration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Test Integration */}
        {step === 4 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight">Step 4: Test Integration</h1>
              <p className="text-sm text-zinc-400">Test payload delivery and verify socket handshake latency.</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs space-y-2 min-h-[140px]">
              <div className="text-zinc-500">// Execution Console</div>
              {testLogs.map((log, index) => (
                <div key={index} className="text-emerald-400">{log}</div>
              ))}
              {testingStatus === 'idle' && (
                <div className="text-zinc-600">Click button below to initiate stream handshake test...</div>
              )}
            </div>

            {testingStatus !== 'success' ? (
              <button
                onClick={runIntegrationTest}
                disabled={testingStatus === 'running'}
                className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black font-semibold text-sm flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{testingStatus === 'running' ? 'Testing Connection...' : 'Run Integration Test'}</span>
              </button>
            ) : (
              <button
                onClick={() => setStep(5)}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-sm flex items-center justify-center space-x-2"
              >
                <span>Integration Test Passed! Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* STEP 5: Integration Ready */}
        {step === 5 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight">Integration Ready!</h1>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                <strong className="text-white">{bankName}</strong> is connected. MuleShield is actively analyzing live streams for suspicious mule patterns.
              </p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-left space-y-1 text-zinc-400">
              <div className="text-emerald-400 font-bold">STATUS: READY_AND_ACTIVE</div>
              <div>BANK: {bankName} ({ifscPrefix})</div>
              <div>ENDPOINT: {apiUrl}</div>
              <div>LATENCY: 12ms</div>
            </div>

            <Link
              href="/dashboard"
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm transition-colors block text-center"
            >
              Enter Security Dashboard →
            </Link>
          </div>
        )}
      </div>

      <footer className="text-center py-4 border-t border-zinc-900 text-xs text-zinc-600">
        MuleShield Integration Protocol v2.4
      </footer>
    </main>
  );
}
