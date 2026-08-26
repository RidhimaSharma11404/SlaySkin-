import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: name || (isSignUp ? 'Glow Member' : 'Maya Sharma'),
      email: email || 'user@slayskin.com',
      isLoggedIn: true,
      skinType: 'combination'
    };
    localStorage.setItem('slayskin_user', JSON.stringify(userObj));
    onLoginSuccess(userObj);
    onClose();
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: 'Guest Slay Member',
      email: 'guest@slayskin.com',
      isLoggedIn: true,
      skinType: 'combination'
    };
    localStorage.setItem('slayskin_user', JSON.stringify(guestUser));
    onLoginSuccess(guestUser);
    onClose();
  };

  const handleQuickProfile = (profileName, skinType) => {
    const userObj = {
      name: profileName,
      email: `${profileName.toLowerCase()}@slayskin.com`,
      isLoggedIn: true,
      skinType: skinType
    };
    localStorage.setItem('slayskin_user', JSON.stringify(userObj));
    onLoginSuccess(userObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-300 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-pink-600 hover:bg-pink-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center mx-auto shadow-md shadow-pink-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-2xl font-black text-gray-900">
            {isSignUp ? 'Create SlaySkin Account' : 'Welcome to SlaySkin'}
          </h3>
          <p className="text-xs text-gray-500">
            Save your skin scans, track progress, & unlock matched product routines.
          </p>
        </div>

        {/* Quick Demo Logins */}
        <div className="bg-pink-50/80 p-3 rounded-2xl border border-pink-200 text-center space-y-2">
          <p className="text-[11px] font-extrabold text-pink-700 uppercase tracking-wide">
            ⚡ Quick Demo 1-Click Access:
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleQuickProfile('Maya', 'oily')}
              className="px-2.5 py-1 text-[11px] font-bold bg-white text-gray-800 rounded-lg border border-pink-200 hover:bg-pink-100 transition-colors"
            >
              Maya (Oily)
            </button>
            <button
              onClick={() => handleQuickProfile('Aria', 'dry')}
              className="px-2.5 py-1 text-[11px] font-bold bg-white text-gray-800 rounded-lg border border-pink-200 hover:bg-pink-100 transition-colors"
            >
              Aria (Dry)
            </button>
            <button
              onClick={() => handleQuickProfile('Chloe', 'combination')}
              className="px-2.5 py-1 text-[11px] font-bold bg-white text-gray-800 rounded-lg border border-pink-200 hover:bg-pink-100 transition-colors"
            >
              Chloe (Combo)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Ridhima"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-xs text-gray-800 outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-xs text-gray-800 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-xs text-gray-800 outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-slay-primary py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md mt-2"
          >
            <span>{isSignUp ? 'Create Profile & Slay' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Guest Mode & Toggle */}
        <div className="space-y-3 pt-2 text-center border-t border-pink-100">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="text-xs font-extrabold text-pink-600 hover:text-pink-800 hover:underline block mx-auto"
          >
            Or continue as Guest (No Password Needed) →
          </button>

          <p className="text-xs text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-pink-600 font-bold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up Free'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
