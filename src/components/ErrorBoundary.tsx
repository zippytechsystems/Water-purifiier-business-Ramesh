import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home, PhoneCall, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Priya AquaFresh Uncaught Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.href = window.location.origin + window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-black text-white">
                Priya's AquaFresh
              </h1>
              <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider font-telugu">
                లాస్య వాటర్ ప్యూరిఫైయర్ సేల్స్ & సర్వీసెస్
              </p>
              <p className="text-sm text-slate-300 pt-2 leading-relaxed">
                We encountered a temporary display issue. Tap below to reload the home page cleanly.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Home Page</span>
              </button>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call Support</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20Ramesh%20garu,%20I%20need%20assistance%20with%20water%20purifier`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              Khilashapur Road, Raghunathpally, Jangaon Dist.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
