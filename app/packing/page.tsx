'use client';

import { useState, useEffect } from 'react';
import { Plus, Check, Trash2, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface PackingItem {
  id: string;
  item: string;
  category: string;
  assignedTo: string | null;
  isPacked: boolean;
}

export default function PackingPage() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('Personal');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/packing');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/packing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: newItem, category, assignedTo: assignTo || null }),
      });
      if (res.ok) {
        fetchItems();
        setNewItem('');
        setAssignTo('');
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleTogglePacked = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    try {
      const res = await fetch('/api/packing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPacked: !item.isPacked }),
      });
      if (res.ok) fetchItems();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/packing?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const personalItems = items.filter((i) => i.category === 'Personal');
  const sharedItems = items.filter((i) => i.category === 'Shared');
  const packedCount = items.filter((i) => i.isPacked).length;
  const progress = items.length > 0 ? (packedCount / items.length) * 100 : 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-container flex items-center justify-center" style={{ minHeight: '60vh' }}>
          <div style={{ color: '#d4b86a', fontSize: '18px' }}>Loading packing list...</div>
        </div>
      </>
    );
  }

  const renderItem = (item: PackingItem, accentColor: string) => (
    <div
      key={item.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0c0f0a',
        borderRadius: '10px',
        padding: '12px 14px',
        border: '1px solid rgba(255,255,255,0.04)',
        opacity: item.isPacked ? 0.5 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => handleTogglePacked(item.id)}
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            border: item.isPacked ? 'none' : '1.5px solid rgba(255,255,255,0.12)',
            background: item.isPacked ? accentColor : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
        >
          {item.isPacked && <Check size={13} color="#0c0f0a" strokeWidth={3} />}
        </button>
        <span
          style={{
            fontSize: '14px',
            color: item.isPacked ? '#3a4a3e' : '#e8e2d4',
            textDecoration: item.isPacked ? 'line-through' : 'none',
          }}
        >
          {item.item}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {item.assignedTo && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#5a6a5e' }}>
            <User size={11} />
            {item.assignedTo}
          </span>
        )}
        <button onClick={() => handleDelete(item.id)} className="btn-danger" style={{ padding: '4px' }}>
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <div className="section-label">Don&apos;t Forget</div>
          <h1 className="page-title">Packing List</h1>
          <p className="page-subtitle">Track what you&apos;ve packed — never forget anything</p>
        </div>

        {/* Progress */}
        <div className="glass-card mb-6" style={{ padding: '18px 24px' }}>
          <div className="flex justify-between mb-2" style={{ fontSize: '12px' }}>
            <span style={{ color: '#5a6a5e' }}>Packing Progress</span>
            <span style={{ color: '#7ecfa8', fontWeight: 600 }}>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <p style={{ fontSize: '12px', color: '#4a5a4e', marginTop: '6px' }}>{packedCount} of {items.length} items packed</p>
        </div>

        {/* Add form */}
        <div className="glass-card mb-8">
          <form onSubmit={handleAddItem}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="form-label">Item</label>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Item name"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-input form-select"
                >
                  <option value="Personal">Personal</option>
                  <option value="Shared">Shared</option>
                </select>
              </div>
              <div>
                <label className="form-label">Assigned To</label>
                <input
                  type="text"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  placeholder="Optional"
                  className="form-input"
                />
              </div>
            </div>
            <div style={{ marginTop: '14px' }}>
              <button type="submit" className="btn-primary">
                <Plus size={15} />
                Add Item
              </button>
            </div>
          </form>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card">
            <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: '#7ecfa8', marginBottom: '14px' }}>
              Personal Items ({personalItems.length})
            </h2>
            {personalItems.length === 0 ? (
              <p style={{ color: '#4a5a4e', fontSize: '13px' }}>No personal items yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {personalItems.map((item) => renderItem(item, '#7ecfa8'))}
              </div>
            )}
          </div>

          <div className="glass-card">
            <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: '#d4b86a', marginBottom: '14px' }}>
              Shared Items ({sharedItems.length})
            </h2>
            {sharedItems.length === 0 ? (
              <p style={{ color: '#4a5a4e', fontSize: '13px' }}>No shared items yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sharedItems.map((item) => renderItem(item, '#d4b86a'))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
