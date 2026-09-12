'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Building2,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

const initialTransactions = [
  { id: 'TX-9042', source: 'HDFC Bank', target: 'ICICI Bank', amount: '₹42,500', velocity: '3 tx/min', risk: 'HIGH', score: 92, status: 'FLAGGED' },
  { id: 'TX-9041', source: 'State Bank of India', target: 'Axis Bank', amount: '₹12,000', velocity: '1 tx/min', risk: 'LOW', score: 14, status: 'CLEARED' },
  { id: 'TX-9040', source: 'Axis Bank', target: 'HDFC Bank', amount: '₹1,80,000', velocity: '12 tx/min', risk: 'CRITICAL', score: 98, status: 'BLOCKED' },
  { id: 'TX-9039', source: 'ICICI Bank', target: 'State Bank of India', amount: '₹8,400', velocity: '2 tx/min', risk: 'LOW', score: 22, status: 'CLEARED' },
  { id: 'TX-9038', source: 'HDFC Bank', target: 'Axis Bank', amount: '₹65,000', velocity: '8 tx/min', risk: 'MEDIUM', score: 67, status: 'UNDER_REVIEW' },
];

export default function DashboardPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filter, setFilter] = useState('ALL');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const banks = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'];
      const randomSrc = banks[Math.floor(Math.random() * banks.length)];
      let randomDst = banks[Math.floor(Math.random() * banks.length)];
      while (randomDst === randomSrc) {
        randomDst = banks[Math.floor(Math.random() * banks.length)];
      }

      const randomScore = Math.floor(Math.random() * 95) + 5;
      const randomRisk = randomScore > 85 ? 'CRITICAL' : randomScore > 60 ? 'HIGH' : randomScore > 35 ? 'MEDIUM' : 'LOW';
      const randomStatus = randomRisk === 'CRITICAL' ? 'BLOCKED' : randomRisk === 'HIGH' ? 'FLAGGED' : 'CLEARED';

      const newTx = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        source: randomSrc,
        target: randomDst,
        amount: `₹${(Math.floor(Math.random() * 90) + 5)},000`,
        velocity: `${Math.floor(Math.random() * 10) + 1} tx/min`,
        risk: randomRisk,
        score: randomScore,
        status: randomStatus,
      };

      setTransactions((prev) => [newTx, ...prev.slice(0, 7)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isLive]);

  const filteredTx = transactions.filter(t => filter === 'ALL' || t.risk === filter);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-orange-500 selection:text-black flex flex-col">
      <header className="border-b border-zinc-900 bg-zinc-950/90 sticky top-0 z-50 backdrop-blur px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-white tracking-tight text-lg">
              Mule<span className="text-orange-500">Shield</span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>RELAY GRID: ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium flex items-center space-x-2 transition-colors ${
              isLive
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-zinc-800 bg-zinc-900 text-zinc-500'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLive ? 'animate-spin' : ''}`} />
            <span>{isLive ? 'LIVE FEED ON' : 'STREAM PAUSED'}</span>
          </button>
          <Link
            href="/onboarding"
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs transition-colors"
          >
            + Add Node
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>ACTIVE BANK NODES</span>
              <Building2 className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">4 / 4</div>
            <div className="text-xs text-emerald-400 font-mono">
              <span>● HDFC, ICICI, SBI, AXIS</span>
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>STREAM VELOCITY</span>
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">1,420 <span className="text-xs font-normal text-zinc-500">req/s</span></div>
            <div className="text-xs text-orange-400 font-mono">Avg Latency: 12ms</div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>MULE NETWORKS BLOCKED</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-extrabold text-red-400">14 <span className="text-xs font-normal text-zinc-400">today</span></div>
            <div className="text-xs text-zinc-500 font-mono">₹1.24 Cr intercepted</div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>ACCURACY SCORE</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">99.4%</div>
            <div className="text-xs text-emerald-400 font-mono">0.02% false positive</div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Real-Time Inter-Bank Stream</h2>
              <p className="text-xs text-zinc-400">Monitoring multi-hop account activity across grid nodes</p>
            </div>

            <div className="flex items-center space-x-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
              {['ALL', 'CRITICAL', 'HIGH', 'LOW'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1.5 rounded-lg font-mono transition-colors ${
                    filter === t
                      ? 'bg-orange-500 text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-xs font-mono uppercase">
                  <th className="py-3 px-4">TX ID</th>
                  <th className="py-3 px-4">Source Node</th>
                  <th className="py-3 px-4">Target Node</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Risk Score</th>
                  <th className="py-3 px-4">Action Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {filteredTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-zinc-900/80 transition-colors font-mono">
                    <td className="py-3.5 px-4 font-bold text-orange-400">{tx.id}</td>
                    <td className="py-3.5 px-4 text-zinc-300">{tx.source}</td>
                    <td className="py-3.5 px-4 text-zinc-300">{tx.target}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{tx.amount}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-zinc-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${
                              tx.score > 80 ? 'bg-red-500' : tx.score > 50 ? 'bg-orange-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${tx.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold">{tx.score}/100</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          tx.status === 'BLOCKED'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                            : tx.status === 'FLAGGED'
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {tx.status === 'BLOCKED' && <XCircle className="w-3 h-3" />}
                        {tx.status === 'CLEARED' && <CheckCircle2 className="w-3 h-3" />}
                        {tx.status === 'FLAGGED' && <AlertTriangle className="w-3 h-3" />}
                        <span>{tx.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-900 py-4 text-center text-xs text-zinc-600">
        MuleShield Inter-Bank Intelligence Grid • Live Telemetry Stream
      </footer>
    </div>
  );
}
