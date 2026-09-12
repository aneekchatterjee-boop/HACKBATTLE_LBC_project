'use client';
import React, { useEffect, useState } from 'react';
import { Shield, Activity, AlertTriangle, ArrowUpRight, Search, CheckCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const initialTransactions = [
  { id: 'TX-9281', amount: '₹48,000', route: 'Bank A → Bank C', score: 91, status: 'BLOCKED', time: 'Just now' },
  { id: 'TX-9280', amount: '₹120,000', route: 'Bank X → Bank Y', score: 84, status: 'BLOCKED', time: '2m ago' },
  { id: 'TX-9279', amount: '₹3,500', route: 'Bank B → Bank D', score: 12, status: 'CLEARED', time: '5m ago' },
  { id: 'TX-9278', amount: '₹75,000', route: 'Bank Z → Bank A', score: 88, status: 'BLOCKED', time: '9m ago' },
  { id: 'TX-9277', amount: '₹5,200', route: 'Bank C → Bank B', score: 5, status: 'CLEARED', time: '14m ago' },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  useEffect(() => {
  fetch('http://127.0.0.1:5000/api/health')
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        setBackendStatus('Online');
      } else {
        setBackendStatus('Offline');
      }
    })

    .catch(() => {
      setBackendStatus('Offline');
    });
}, []);
const analyzeTransaction = async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:5000/api/transactions/analyze',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 120000,
          velocity: 10,
          account_age: 15,
          recipients: 8,
        }),
      }
    );

    const data = await response.json();
    setAnalysisResult(data);
  } catch (error) {
    console.error('Transaction analysis failed:', error);
  }
};
  const [txs, setTxs] = useState(initialTransactions);

  const filteredTxs = txs.filter(t => t.id.toLowerCase().includes(searchTerm.toLowerCase()) || t.route.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {showAnalysis && analysisResult && (
  <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-5">
    <div className="mb-3 text-sm text-gray-400">
      Latest Risk Analysis
    </div>

    <div className="flex items-center gap-6">
      <div>
        <div className="text-3xl font-bold">
          {analysisResult.risk_score}/100
        </div>
        <div className="text-sm text-gray-400">Risk Score</div>
      </div>

      <div>
        <div className="text-xl font-semibold">
          {analysisResult.decision}
        </div>
        <div className="text-sm text-gray-400">Decision</div>
      </div>
    </div>

    <div className="mt-4">
      <div className="mb-2 text-sm text-gray-400">Risk Signals</div>

      <div className="flex flex-wrap gap-2">
        {analysisResult.signals.map((signal: string) => (
          <span
            key={signal}
            className="rounded-full border border-white/10 px-3 py-1 text-xs"
          >
            {signal}
          </span>
        ))}
      </div>
    </div>
  </div>
)}
      {/* Top Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-500">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Mule<span className="text-orange-500">Shield</span> <span className="text-xs font-mono text-zinc-500 ml-2">NODE CONSOLE</span>
          </span>
        </Link>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Backend: {backendStatus}</span>
            <button
  onClick={async () => {
  await analyzeTransaction();
  setShowAnalysis(true);
}}
  className="ml-4 rounded-lg border border-white/20 px-3 py-1 text-sm"
>
  Test Risk
</button>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full p-6 space-y-8 flex-1">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Processed Today</span>
            <div className="text-3xl font-extrabold font-mono">142,890</div>
            <span className="text-emerald-400 text-xs flex items-center font-medium">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> +12.4% from yesterday
            </span>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Mule Rings Blocked</span>
            <div className="text-3xl font-extrabold font-mono text-red-400">384</div>
            <span className="text-zinc-400 text-xs">₹1.42 Cr prevented in losses</span>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Avg Latency</span>
            <div className="text-3xl font-extrabold font-mono text-orange-400">42ms</div>
            <span className="text-zinc-400 text-xs">Cross-bank graph sync active</span>
          </div>
        </div>

        {/* Live Transaction Stream Table */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Inter-Bank Transaction Stream</h2>
              <p className="text-zinc-400 text-sm">Real-time risk scoring across connected banking nodes.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search Tx ID or route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-xs font-mono text-zinc-500 bg-zinc-950/40">
                  <th className="p-4">TRANSACTION ID</th>
                  <th className="p-4">AMOUNT</th>
                  <th className="p-4">ROUTE</th>
                  <th className="p-4">RISK SCORE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {filteredTxs.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-4 font-mono font-medium text-zinc-200">{tx.id}</td>
                    <td className="p-4 font-mono">{tx.amount}</td>
                    <td className="p-4 text-zinc-300">{tx.route}</td>
                    <td className="p-4 font-mono font-bold">
                      <span className={tx.score > 75 ? 'text-red-400' : 'text-emerald-400'}>{tx.score}/100</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${tx.status === 'BLOCKED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 text-xs">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}