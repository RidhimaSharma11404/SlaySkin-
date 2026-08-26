// SlaySkin Skincare Ingredient Dictionary & Comedogenic Database

export const INGREDIENT_DICTIONARY = [
  {
    name: 'Niacinamide (Vitamin B3)',
    aliases: ['niacinamide', 'nicotinamide', 'vitamin b3'],
    category: 'Vitamin / Active',
    comedogenicRating: 0,
    irritationRating: 0,
    benefits: ['Minimizes pore appearance', 'Regulates sebum oil output', 'Fades hyperpigmentation', 'Strengthens lipid barrier'],
    suitableFor: ['All skin types', 'Oily skin', 'Acne-prone', 'Hyperpigmentation'],
    caution: 'Concentrations above 10% may cause temporary flushing in hypersensitive skin.',
    status: 'good'
  },
  {
    name: 'Hyaluronic Acid / Sodium Hyaluronate',
    aliases: ['hyaluronic acid', 'sodium hyaluronate', 'hydrolyzed hyaluronic acid', 'sodium hyaluronate crosspolymer'],
    category: 'Humectant',
    comedogenicRating: 0,
    irritationRating: 0,
    benefits: ['Holds up to 1000x its weight in water', 'Instantly plumps dehydration fine lines', 'Non-sticky hydration'],
    suitableFor: ['All skin types', 'Dry skin', 'Dehydrated skin'],
    caution: 'Best applied on slightly damp skin followed by a moisturizer to lock in moisture.',
    status: 'good'
  },
  {
    name: 'Salicylic Acid (BHA)',
    aliases: ['salicylic acid', 'betaine salicylate', 'capryloyl salicylic acid'],
    category: 'Beta Hydroxy Acid (Exfoliant)',
    comedogenicRating: 0,
    irritationRating: 1,
    benefits: ['Lipophilic (oil-soluble) so it cleans inside pores', 'Dissolves blackheads and dead skin debris', 'Anti-inflammatory for acne'],
    suitableFor: ['Oily skin', 'Acne-prone', 'Enlarged pores'],
    caution: 'Do not overuse (1-3 times weekly is ideal). Always pair with SPF 50 during daytime.',
    status: 'good'
  },
  {
    name: 'Centella Asiatica (Cica)',
    aliases: ['centella asiatica extract', 'madecassoside', 'asiaticoside', 'madecassic acid', 'asiatic acid'],
    category: 'Botanical Soothing Extract',
    comedogenicRating: 0,
    irritationRating: 0,
    benefits: ['Rapidly soothes redness and inflammation', 'Accelerates wound healing and skin barrier repair', 'Antioxidant boost'],
    suitableFor: ['Sensitive skin', 'Redness-prone', 'Compromised skin barrier', 'Acne-prone'],
    caution: 'Extremely gentle with virtually zero irritation risk.',
    status: 'good'
  },
  {
    name: 'Ceramides (1, 3, 6-II, NP, AP, EOP)',
    aliases: ['ceramide np', 'ceramide ap', 'ceramide eop', 'ceramide 3', 'ceramide 1', 'ceramide 6-ii', 'phytosphingosine'],
    category: 'Skin-Identical Lipid',
    comedogenicRating: 0,
    irritationRating: 0,
    benefits: ['Rebuilds intercellular matrix of stratum corneum', 'Prevents Transepidermal Water Loss (TEWL)', 'Locks in long-lasting moisture'],
    suitableFor: ['All skin types', 'Dry skin', 'Sensitive skin', 'Post-procedure repair'],
    caution: 'Essential for keeping harmful environmental irritants out of skin.',
    status: 'good'
  },
  {
    name: 'Vitamin C (Ascorbic Acid / Derivatives)',
    aliases: ['ascorbic acid', 'l-ascorbic acid', 'ethyl ascorbic acid', 'sodium ascorbyl phosphate', 'tetrahexyldecyl ascorbate'],
    category: 'Antioxidant',
    comedogenicRating: 0,
    irritationRating: 1,
    benefits: ['Neutralizes free radicals from UV/pollution', 'Fades post-acne dark marks and sunspots', 'Stimulates collagen synthesis'],
    suitableFor: ['Dull skin', 'Hyperpigmentation', 'Pro-aging care'],
    caution: 'Store pure L-Ascorbic Acid away from sunlight and heat to prevent oxidation.',
    status: 'good'
  },
  {
    name: 'Alpha Arbutin',
    aliases: ['alpha arbutin', 'arbutin'],
    category: 'Tyrosinase Inhibitor',
    comedogenicRating: 0,
    irritationRating: 0,
    benefits: ['Safely inhibits melanin synthesis', 'Fades stubborn melasma and brown patches', 'Safe for sensitive skin'],
    suitableFor: ['Hyperpigmentation', 'Uneven tone', 'Post-inflammatory marks'],
    caution: 'Works best when paired with Vitamin C or Niacinamide.',
    status: 'good'
  },
  {
    name: 'Coconut Oil',
    aliases: ['cocos nucifera oil', 'coconut oil'],
    category: 'Plant Oil / Emollient',
    comedogenicRating: 4,
    irritationRating: 0,
    benefits: ['Deep nourishment for extremely dry body skin'],
    suitableFor: ['Extremely dry body skin (avoid on acne-prone face)'],
    caution: 'High comedogenic rating (4/5) – highly prone to clogging facial pores and causing breakouts on face.',
    status: 'warning'
  },
  {
    name: 'Synthetic Fragrance / Parfum',
    aliases: ['fragrance', 'parfum', 'perfume', 'synthetic fragrance'],
    category: 'Sensitizing Additive',
    comedogenicRating: 0,
    irritationRating: 3,
    benefits: ['Provides pleasant scent (no skin health benefit)'],
    suitableFor: ['Resilient skin types only'],
    caution: 'One of the leading causes of contact dermatitis and allergic flare-ups in skincare.',
    status: 'warning'
  },
  {
    name: 'Denatured Alcohol / Alcohol Denat.',
    aliases: ['alcohol denat.', 'denatured alcohol', 'isopropyl alcohol', 'sd alcohol 40'],
    category: 'Solvent / Astringent',
    comedogenicRating: 0,
    irritationRating: 3,
    benefits: ['Creates ultra-quick dry finish, thins thick formulas'],
    suitableFor: ['Very rare (can degrade barrier over time)'],
    caution: 'Can strip the skin acid mantle and trigger rebound oil production when used in high quantities.',
    status: 'warning'
  }
];

export function analyzeIngredientList(rawText) {
  if (!rawText || !rawText.trim()) return [];
  const cleanList = rawText
    .split(/[,;\n\+]/)
    .map(item => item.trim())
    .filter(item => item.length > 1);

  return cleanList.map(item => {
    const lower = item.toLowerCase();
    const matched = INGREDIENT_DICTIONARY.find(entry => 
      entry.aliases.some(alias => lower.includes(alias.toLowerCase()))
    );

    if (matched) {
      return {
        query: item,
        name: matched.name,
        category: matched.category,
        comedogenicRating: matched.comedogenicRating,
        irritationRating: matched.irritationRating,
        benefits: matched.benefits,
        suitableFor: matched.suitableFor,
        caution: matched.caution,
        status: matched.status,
        isIdentified: true
      };
    }

    return {
      query: item,
      name: item,
      category: 'General Cosmetic Ingredient',
      comedogenicRating: 0,
      irritationRating: 0,
      benefits: ['Supports cosmetic formula stability and texture.'],
      suitableFor: ['General skincare compatibility'],
      caution: 'No known high risk flagged in baseline database.',
      status: 'neutral',
      isIdentified: false
    };
  });
}
