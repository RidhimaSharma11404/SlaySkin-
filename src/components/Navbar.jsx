import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  HelpCircle, 
  ShoppingBag, 
  Calendar, 
  FlaskConical, 
  User, 
  Heart,
  Menu, 
  X,
  LogOut
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, savedProductsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'scanner', label: 'Skin Scanner', icon: Camera },
    { id: 'quiz', label: 'Skin Quiz', icon: HelpCircle },
    { id: 'results', label: 'My Glow Report', icon: Sparkles },
    { id: 'products', label: 'Matched Products', icon: ShoppingBag },
    { id: 'routine', label: 'Routine Builder', icon: Calendar },
    { id: 'ingredients', label: 'Ingredient Checker', icon: FlaskConical },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/75 border-b border-pink-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 flex items-center justify-center shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-gradient-slay font-sans">
                  SlaySkin
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold border border-pink-200">
                  ML Edition
                </span>
              </div>
              <p className="text-[11px] font-medium text-pink-600/80 tracking-wide">
                Smart Non-Medicated Skincare Matcher
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/30 scale-102'
                      : 'text-pink-900/80 hover:text-pink-600 hover:bg-pink-100/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Auth & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-pink-50/90 border border-pink-200 rounded-2xl px-3 py-1.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user.name ? user.name[0].toUpperCase() : 'G'}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-800 leading-tight">
                    {user.name || 'Glow Member'}
                  </p>
                  <p className="text-[10px] text-pink-600 font-medium">
                    {user.skinType ? `${user.skinType.toUpperCase()} Skin` : 'Skin Profile Ready'}
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1 text-gray-400 hover:text-pink-600 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white text-pink-600 border border-pink-300 hover:bg-pink-50 transition-all shadow-xs"
              >
                <User className="w-4 h-4 text-pink-500" />
                Sign In / Guest
              </button>
            )}

            <button
              onClick={() => setActiveTab('scanner')}
              className="btn-slay-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Face</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-pink-200 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-pink-50/70 text-gray-800 hover:bg-pink-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-pink-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-pink-100 flex items-center justify-between gap-3">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-gray-700">Signed in as <b>{user.name}</b></span>
                <button onClick={onLogout} className="text-xs text-rose-600 font-bold">Logout</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-bold bg-pink-100 text-pink-700 rounded-xl"
              >
                Sign In / Guest Profile
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
