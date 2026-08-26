import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Star, 
  Check, 
  Heart, 
  Droplets, 
  Pipette, 
  Cloud, 
  Sun, 
  Sparkle,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES, CONCERNS, PRODUCTS } from '../data/products';

export default function ProductMatcher({ matchedProducts = PRODUCTS, onSaveProduct, savedProductIds = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedConcern, setSelectedConcern] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyCrueltyFree, setOnlyCrueltyFree] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const categoryIcons = {
    all: Sparkles,
    facewash: Droplets,
    serum: Pipette,
    moisturizer: Cloud,
    sunscreen: Sun,
    toner: Sparkle,
  };

  // Filter logic
  const filteredProducts = matchedProducts.filter(prod => {
    // Category match
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }
    // Concern match
    if (selectedConcern !== 'all' && !prod.targetsConcerns.includes(selectedConcern)) {
      return false;
    }
    // Cruelty-free filter
    if (onlyCrueltyFree && !prod.crueltyFree) {
      return false;
    }
    // Search query match (name, brand, active)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchBrand = prod.brand.toLowerCase().includes(q);
      const matchActives = prod.keyActives.some(a => a.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchActives) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-bold">
          <ShoppingBag className="w-3.5 h-3.5 text-pink-500" />
          <span>Everyday OTC Skincare Products Database</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Matched Non-Medicated <span className="text-gradient-slay">Skincare Essentials</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Gentle daily facewashes, vitamin serums, hydrating barrier creams, and SPF sunscreens with direct links across Amazon, Nykaa, Sephora, Ulta & YesStyle.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card rounded-3xl p-5 border border-pink-200 shadow-md space-y-4">
        
        {/* Row 1: Search input + Cruelty Free switch */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, brand (CeraVe, The Ordinary, Minimalist, COSRX) or active (Niacinamide, Vitamin C)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-hidden text-xs sm:text-sm text-gray-800"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer select-none px-3 py-2 bg-pink-50 rounded-xl border border-pink-200 whitespace-nowrap self-start md:self-auto">
            <input
              type="checkbox"
              checked={onlyCrueltyFree}
              onChange={(e) => setOnlyCrueltyFree(e.target.checked)}
              className="rounded-sm text-pink-600 focus:ring-pink-400"
            />
            <span>Cruelty-Free Only 🐰</span>
          </label>
        </div>

        {/* Row 2: Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.id] || Sparkles;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-xs scale-102'
                    : 'bg-white text-gray-700 hover:bg-pink-100/60 border border-pink-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Target Concern Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
            Target Concern:
          </span>
          <button
            onClick={() => setSelectedConcern('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedConcern === 'all'
                ? 'bg-pink-200 text-pink-900'
                : 'text-gray-600 hover:bg-pink-50'
            }`}
          >
            All Concerns
          </button>
          {CONCERNS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedConcern(c.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedConcern === c.id
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-white/80 text-gray-700 hover:bg-pink-100/70 border border-pink-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const isSaved = savedProductIds.includes(prod.id);

          return (
            <div
              key={prod.id}
              className="glass-card rounded-3xl p-5 border border-pink-200/90 shadow-md flex flex-col justify-between glass-card-hover group relative"
            >
              {/* Product Header & Image */}
              <div className="space-y-4">
                
                {/* Image Container with Badges */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-pink-50 border border-pink-200/60">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Slay Match Score Badge */}
                  <div className="absolute top-3 left-3 bg-pink-600/90 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{prod.matchScore}% Slay Match</span>
                  </div>

                  {/* Save Heart Button */}
                  <button
                    onClick={() => onSaveProduct && onSaveProduct(prod)}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
                      isSaved
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:text-rose-500'
                    }`}
                    title="Save to Favorites"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  </button>

                  {/* Non-medicated tag */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>OTC Daily Essential</span>
                  </div>
                </div>

                {/* Brand & Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-pink-600 uppercase tracking-wide">
                      {prod.brand}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{prod.rating}</span>
                      <span className="text-gray-400 font-normal">({(prod.reviewsCount / 1000).toFixed(0)}k)</span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-gray-900 leading-snug mt-1 group-hover:text-pink-600 transition-colors">
                    {prod.name}
                  </h3>
                </div>

                {/* Match Reason Box */}
                {prod.matchReason && (
                  <div className="bg-pink-50/90 border border-pink-200/80 rounded-xl p-2.5 text-[11px] text-pink-900 leading-relaxed font-medium">
                    <b className="text-pink-700">Why it matches:</b> {prod.matchReason}
                  </div>
                )}

                {/* Key Actives Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prod.keyActives.map((act, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-white border border-pink-200 text-gray-700"
                    >
                      {act}
                    </span>
                  ))}
                </div>

              </div>

              {/* Product Footer & Store Multi-Links */}
              <div className="pt-4 mt-4 border-t border-pink-100 space-y-3">
                
                {/* Price Display */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-black text-gray-900">${prod.price}</span>
                    <span className="text-xs text-gray-500 ml-1.5 font-medium">(₹{prod.priceINR})</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Usage: {prod.usageTime}
                  </span>
                </div>

                {/* Direct Store Links Bar */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    Buy & Reference Links:
                  </p>
                  
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    {prod.links.amazon && (
                      <a
                        href={prod.links.amazon}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Amazon</span>
                        <ExternalLink className="w-2.5 h-2.5 text-amber-700" />
                      </a>
                    )}
                    {prod.links.nykaa && (
                      <a
                        href={prod.links.nykaa}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Nykaa</span>
                        <ExternalLink className="w-2.5 h-2.5 text-rose-700" />
                      </a>
                    )}
                    {prod.links.sephora && (
                      <a
                        href={prod.links.sephora}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Sephora</span>
                        <ExternalLink className="w-2.5 h-2.5 text-gray-700" />
                      </a>
                    )}
                    {prod.links.ulta && (
                      <a
                        href={prod.links.ulta}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-orange-50 text-orange-900 border border-orange-200 hover:bg-orange-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Ulta</span>
                        <ExternalLink className="w-2.5 h-2.5 text-orange-700" />
                      </a>
                    )}
                    {prod.links.yesstyle && (
                      <a
                        href={prod.links.yesstyle}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-pink-50 text-pink-900 border border-pink-200 hover:bg-pink-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>YesStyle</span>
                        <ExternalLink className="w-2.5 h-2.5 text-pink-700" />
                      </a>
                    )}
                    {prod.links.official && (
                      <a
                        href={prod.links.official}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Official</span>
                        <ExternalLink className="w-2.5 h-2.5 text-purple-700" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white/60 rounded-3xl border border-pink-200 space-y-3">
          <p className="text-sm font-bold text-gray-700">No products found matching your search.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedConcern('all'); setSearchQuery(''); }}
            className="btn-slay-secondary px-4 py-2 rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
