import React from 'react';
import { Sparkles, Heart, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-pink-200 bg-white/80 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-gradient-slay">SlaySkin</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold">
                Smart Skincare
              </span>
            </div>
            <p className="text-xs text-gray-600 max-w-sm leading-relaxed">
              Your daily skincare companion. We analyze your skin condition using computer-vision and match gentle, non-medicated daily cleansers, serums, and barrier moisturizers with direct store links.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for healthy, glowing skin.</span>
            </div>
          </div>

          {/* Col 2: Features */}
          <div className="space-y-2.5">
            <p className="text-xs font-black text-gray-900 uppercase tracking-wider">Features</p>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>
                <button onClick={() => onNavigate('scanner')} className="hover:text-pink-600 transition-colors">
                  Face Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-pink-600 transition-colors">
                  Diagnostic Skin Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-pink-600 transition-colors">
                  Matched Products Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('routine')} className="hover:text-pink-600 transition-colors">
                  AM / PM Routine Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ingredients')} className="hover:text-pink-600 transition-colors">
                  Ingredient Safety Scanner
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported Stores */}
          <div className="space-y-2.5">
            <p className="text-xs font-black text-gray-900 uppercase tracking-wider">Connected Stores</p>
            <div className="flex flex-wrap gap-1.5">
              {['Amazon', 'Nykaa', 'Sephora', 'Ulta Beauty', 'YesStyle', 'CeraVe Official', 'The Ordinary'].map((store, i) => (
                <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-pink-50 border border-pink-200 text-pink-800">
                  {store}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <b>Cosmetic Reference Notice:</b> All matched items are non-medicated, over-the-counter cosmetic essentials. Consult a dermatologist for severe dermatological conditions.
            </span>
          </div>
          <p>© {new Date().getFullYear()} SlaySkin. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
