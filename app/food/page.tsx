'use client';

import Navbar from '@/components/Navbar';

export default function FoodPage() {
  const mustTryFoods = [
    { name: 'Sadya', description: 'Traditional Kerala feast on banana leaf — 20+ dishes served in a specific order', emoji: '🍃', category: 'Must Try' },
    { name: 'Appam with Stew', description: 'Fermented rice pancake with coconut milk stew', emoji: '🥞', category: 'Breakfast' },
    { name: 'Puttu & Kadala Curry', description: 'Steamed rice cake with spicy chickpea curry', emoji: '🫘', category: 'Breakfast' },
    { name: 'Malabar Parotta', description: 'Flaky layered flatbread, best with beef or chicken curry', emoji: '🫓', category: 'Lunch' },
    { name: 'Fish Mole', description: 'Fish in tangy kodumpuli (gambooge) gravy', emoji: '🐟', category: 'Main Course' },
    { name: 'Karimeen Pollichathu', description: 'Pearl spot fish marinated in masala, wrapped and grilled in banana leaf', emoji: '🔥', category: 'Main Course' },
    { name: 'Prawns Roast', description: 'Kerala-style spicy prawns in rich tomato-onion gravy', emoji: '🦐', category: 'Main Course' },
    { name: 'Banana Chips', description: 'Thin-sliced raw banana deep fried in coconut oil', emoji: '🍌', category: 'Snack' },
  ];

  const restaurants = [
    { name: 'Kayees Bakery', location: 'Fort Kochi', specialty: 'Appam and egg curry', price: '₹', color: '#7ecfa8' },
    { name: 'Fusion Bay', location: 'Fort Kochi', specialty: 'Seafood & continental', price: '₹₹', color: '#d4b86a' },
    { name: 'Sreekumar Restaurant', location: 'Alappuzha', specialty: 'Kerala meals', price: '₹', color: '#7ecfa8' },
    { name: 'Thaffare', location: 'Kollam', specialty: 'Local Kerala food', price: '₹', color: '#7ecfa8' },
    { name: 'Aashim', location: 'Varkala', specialty: 'Beachside dining', price: '₹₹', color: '#d4b86a' },
    { name: 'Cafe Italiano', location: 'Varkala North Cliff', specialty: 'Fusion & coffee', price: '₹₹', color: '#d4866a' },
  ];

  const categoryColors: Record<string, string> = {
    'Must Try': '#d4b86a',
    Breakfast: '#7ecfa8',
    Lunch: '#6aaed4',
    'Main Course': '#d4866a',
    Snack: '#a082dc',
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Eat Like a Local</div>
          <h1 className="page-title">Food Guide</h1>
          <p className="page-subtitle">Kerala culinary experiences you can&apos;t miss</p>
        </div>

        {/* Must-Try Dishes */}
        <div className="mb-8">
          <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '20px', fontWeight: 700, color: '#d4b86a', marginBottom: '16px' }}>
            🍛 Must-Try Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 stagger-children">
            {mustTryFoods.map((food, index) => (
              <div key={index} className="glass-card animate-fade-up" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ fontSize: '28px', flexShrink: 0, marginTop: '2px' }}>{food.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ fontWeight: 700, color: '#e8e2d4', fontSize: '15px' }}>{food.name}</div>
                      <span
                        className="badge"
                        style={{
                          background: `${categoryColors[food.category]}15`,
                          color: categoryColors[food.category],
                          border: `1px solid ${categoryColors[food.category]}33`,
                        }}
                      >
                        {food.category}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#5a6a5e', lineHeight: 1.6 }}>{food.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div className="glass-card">
          <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '20px', fontWeight: 700, color: '#7ecfa8', marginBottom: '16px' }}>
            📍 Recommended Restaurants
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#0c0f0a',
                  borderRadius: '10px',
                  padding: '16px 18px',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#e8e2d4', fontSize: '14px' }}>{restaurant.name}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a5e', marginTop: '3px' }}>
                    {restaurant.location} · {restaurant.specialty}
                  </div>
                </div>
                <div style={{ color: restaurant.color, fontWeight: 700, fontSize: '16px' }}>{restaurant.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
