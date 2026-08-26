import React from 'react';
import { 
  Sparkles, 
  Camera, 
  HelpCircle, 
  ShieldCheck, 
  ExternalLink, 
  Star, 
  Zap, 
  ShoppingBag, 
  Heart,
  Droplets,
  Award
} from 'lucide-react';

export default function HeroSection({ onStartScan, onStartQuiz, onExploreProducts }) {
  return (
    <div className="relative pt-6 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Aesthetic Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-300 text-pink-700 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Smart Skincare Diagnostic & Routine Matcher</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.12]">
              Slay Your Skin with{' '}
              <span className="text-gradient-slay underline decoration-pink-300 decoration-wavy decoration-2">
                Everyday Matches
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              No heavy prescription meds or confusing medical jargon. SlaySkin uses <b>Computer-Vision & ML scoring</b> to analyze your selfie & skin habits, instantly matching gentle daily cleansers, vitamin serums, and barrier moisturizers with direct links across <b>Amazon, Nykaa, Sephora, & Ulta</b>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartScan}
                className="w-full sm:w-auto btn-slay-primary px-7 py-4 rounded-2xl text-base font-extrabold flex items-center justify-center gap-3 group"
              >
                <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Scan Face Diagnostic</span>
              </button>

              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto btn-slay-secondary px-7 py-4 rounded-2xl text-base font-extrabold flex items-center justify-center gap-3 shadow-xs"
              >
                <HelpCircle className="w-5 h-5 text-pink-600" />
                <span>Take 60-Sec Skin Quiz</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-pink-200/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-pink-600">98.4%</p>
                <p className="text-xs text-gray-500 font-medium">Match Accuracy</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-rose-600">100%</p>
                <p className="text-xs text-gray-500 font-medium">Non-Medicated OTC</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-pink-600">5+ Stores</p>
                <p className="text-xs text-gray-500 font-medium">Amazon, Nykaa, Sephora</p>
              </div>
            </div>

          </div>

          {/* Right Column: Aesthetic Glassmorphism Showcase Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-pink-400/30 to-rose-300/30 rounded-3xl blur-2xl -z-10" />

            {/* Main Interactive Aesthetic Mockup */}
            <div className="glass-card rounded-3xl p-6 relative border border-white/80 shadow-2xl space-y-5 animate-float">
              
              {/* Card Header with Live Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-extrabold text-pink-800 tracking-wide uppercase">
                    Live Diagnostic Preview
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                  Slay Score: 92/100
                </span>
              </div>

              {/* Central Visual: Glowing Face Scan Visualization */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-pink-300/70 shadow-inner group">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80" 
                  alt="Face Scan Demo"
                  className="w-full h-64 object-cover object-top filter brightness-105"
                />

                {/* Laser scan line animation overlay */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-scan-laser shadow-[0_0_12px_#F472B6]" />

                {/* Facial Keypoint Annotations */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-pink-200 border border-pink-400/50 flex items-center gap-1.5 shadow-lg">
                  <Droplets className="w-3.5 h-3.5 text-pink-300" />
                  <span>T-Zone Sebum: <b>Balanced</b></span>
                </div>

                <div className="absolute bottom-1/4 left-6 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-pink-200 border border-pink-400/50 flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                  <span>Cheek Radiance: <b>88%</b></span>
                </div>

                <div className="absolute bottom-6 right-6 bg-pink-500/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-white font-bold flex items-center gap-1.5 shadow-lg">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Glass Skin Candidate</span>
                </div>
              </div>

              {/* Bottom Quick Match Preview */}
              <div className="bg-pink-50/90 rounded-2xl p-3.5 border border-pink-200/80 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&auto=format&fit=crop&q=80"
                  alt="Top Match Product"
                  className="w-12 h-12 rounded-xl object-cover border border-pink-200 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-900 truncate">Niacinamide 10% + Zinc 1%</p>
                    <span className="text-[11px] font-bold text-pink-600">99% Match</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">The Ordinary • Gentle Daily Serum</p>
                </div>
                <button
                  onClick={onExploreProducts}
                  className="p-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-xs"
                  title="View Products"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-card rounded-2xl p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 shadow-xs">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Computer-Vision Face Analysis</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Upload a selfie or use your live webcam. Our CV algorithm calculates radiance, oiliness, redness, and texture metrics instantly.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">100% Non-Medicated Daily Essentials</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Safe over-the-counter facewashes, hydrating essences, vitamin serums, and barrier moisturizers suited for everyday glow.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 glass-card-hover space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 shadow-xs">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">All-Store Price & Direct Links</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Get instant clickable buy & reference links on Amazon, Nykaa, Sephora, Ulta, and YesStyle with honest user ratings.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
