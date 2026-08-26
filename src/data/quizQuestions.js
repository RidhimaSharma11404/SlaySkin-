// SlaySkin Diagnostic Quiz Questions

export const QUIZ_QUESTIONS = [
  {
    id: 'skin_type_feel',
    title: 'How does your skin feel midday (around 2 PM)?',
    subtitle: 'This helps our ML model assess your baseline sebum production and natural moisture barrier.',
    icon: 'Sparkles',
    multiSelect: false,
    options: [
      {
        id: 'oily',
        label: 'Shiny & Oily all over',
        desc: 'Forehead, nose, and cheeks have noticeable sheen and need blotting.',
        badge: 'Oily Skin Profile'
      },
      {
        id: 'combination',
        label: 'Oily T-Zone, but normal/dry cheeks',
        desc: 'Forehead and nose get shiny, while rest of face feels balanced or dry.',
        badge: 'Combination Profile'
      },
      {
        id: 'dry',
        label: 'Tight, dry or slightly flaky',
        desc: 'Skin craves moisturizer, feels tight when making facial expressions.',
        badge: 'Dry / Dehydrated Profile'
      },
      {
        id: 'sensitive',
        label: 'Flushed, stingy or reactive',
        desc: 'Prone to redness, burning sensation from harsh weather or active ingredients.',
        badge: 'Sensitive Profile'
      },
      {
        id: 'normal',
        label: 'Comfortable, neither dry nor oily',
        desc: 'Smooth texture, balanced hydration with no extreme shine.',
        badge: 'Balanced Profile'
      }
    ]
  },
  {
    id: 'primary_concerns',
    title: 'What are your top skincare concerns?',
    subtitle: 'Select up to 3 priority focus areas you want to slay.',
    icon: 'Target',
    multiSelect: true,
    maxSelect: 3,
    options: [
      {
        id: 'acne',
        label: 'Active Acne & Breakouts',
        desc: 'Whiteheads, blackheads, occasional hormonal cysts',
        tag: 'Acne Defense'
      },
      {
        id: 'dark_spots',
        label: 'Dark Spots & Hyperpigmentation',
        desc: 'Post-acne marks, sun spots, melasma patches',
        tag: 'Pigment Correction'
      },
      {
        id: 'dullness',
        label: 'Dullness & Tired Complexion',
        desc: 'Lacks radiance, uneven tone, needs instant glow',
        tag: 'Glass Skin Glow'
      },
      {
        id: 'large_pores',
        label: 'Enlarged Pores & Excessive Shine',
        desc: 'Visible pores on nose & cheeks, blackhead buildup',
        tag: 'Pore Refining'
      },
      {
        id: 'dehydration',
        label: 'Dehydration & Compromised Barrier',
        desc: 'Dull tight feeling, rough patches, compromised defense',
        tag: 'Barrier Repair'
      },
      {
        id: 'redness',
        label: 'Redness & Skin Irritation',
        desc: 'Facial flushing, reactive barrier, broken capillaries',
        tag: 'Calming Relief'
      },
      {
        id: 'fine_lines',
        label: 'Early Fine Lines & Loss of Elasticity',
        desc: 'Smile lines, forehead texture, preventive pro-aging care',
        tag: 'Youth Plumping'
      }
    ]
  },
  {
    id: 'lifestyle_sun',
    title: 'How much direct sun exposure do you get daily?',
    subtitle: 'Crucial for recommending the perfect daily SPF filter and antioxidant serum.',
    icon: 'Sun',
    multiSelect: false,
    options: [
      {
        id: 'low',
        label: 'Mostly Indoors (< 1 hour)',
        desc: 'Office/indoor work with minimal window/UV exposure.',
        badge: 'Lightweight Daily Shield'
      },
      {
        id: 'moderate',
        label: 'Moderate (1 to 3 hours)',
        desc: 'Commute, walking, errands, casual outdoor activities.',
        badge: 'Broad Spectrum SPF 50'
      },
      {
        id: 'high',
        label: 'High (3+ hours outdoor / active)',
        desc: 'Sports, outdoor work, or high UV index sunny climate.',
        badge: 'Sweat-Resistant High Defense'
      }
    ]
  },
  {
    id: 'routine_experience',
    title: 'What is your ideal daily routine commitment?',
    subtitle: 'We tailor the regimen steps so you can stick to it consistently every day.',
    icon: 'Clock',
    multiSelect: false,
    options: [
      {
        id: 'minimalist',
        label: '2-3 Steps: Quick & Effortless (3 mins)',
        desc: 'Facewash + Moisturizer + Sunscreen (No fuss, high results)',
        badge: 'Minimalist Routine'
      },
      {
        id: 'balanced',
        label: '4-5 Steps: The Sweet Spot (5 mins)',
        desc: 'Cleanse + Tone + Targeted Serum + Moisturize + SPF',
        badge: 'Balanced Glow Routine'
      },
      {
        id: 'advanced',
        label: '6+ Steps: K-Beauty Glass Skin Ritual (10 mins)',
        desc: 'Double cleanse, essence, targeted actives, barrier cream, eye cream & SPF',
        badge: 'Master Skincare Ritual'
      }
    ]
  },
  {
    id: 'budget_store',
    title: 'What is your preferred shopping & budget range?',
    subtitle: 'We prioritize products matching your wallet and favorite stores.',
    icon: 'ShoppingBag',
    multiSelect: false,
    options: [
      {
        id: 'budget',
        label: 'Budget-Friendly & Value (Under $15 / ₹600)',
        desc: 'Drugstore heroes with proven clinical ingredients.',
        badge: 'Great Value'
      },
      {
        id: 'mid',
        label: 'Mid-Tier Cult Favorites ($15 - $35 / ₹600 - ₹1800)',
        desc: 'Top-rated K-beauty, dermatologist brands, & active concentrates.',
        badge: 'Bestseller Tier'
      },
      {
        id: 'luxe',
        label: 'Premium & Luxury Skincare ($35+ / ₹1800+)',
        desc: 'High-end botanical formulations and luxury clinical formulas.',
        badge: 'Luxury Indulgence'
      }
    ]
  }
];
