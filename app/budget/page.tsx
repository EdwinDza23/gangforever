'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';
import { EXPENSE_CATEGORIES, CATEGORY_COLORS, BUDGET_TOTAL } from '@/lib/constants';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  category: string;
  date: string;
}

function formatCurrency(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function BudgetPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitAmong: [] as string[],
    category: 'Food',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/expenses');
      if (res.ok) {
        const data = await res.json();
        setExpenses(data.expenses || []);
      }
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchExpenses();
        setShowForm(false);
        setFormData({ description: '', amount: '', paidBy: '', splitAmong: [], category: 'Food' });
      }
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchExpenses();
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryData = EXPENSE_CATEGORIES.map((cat) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
    color: CATEGORY_COLORS[cat],
  })).filter((d) => d.value > 0);

  const personSpending = expenses.reduce((acc, exp) => {
    const perPerson = exp.amount / exp.splitAmong.length;
    exp.splitAmong.forEach((person) => {
      acc[person] = (acc[person] || 0) + perPerson;
    });
    return acc;
  }, {} as Record<string, number>);

  const personData = Object.entries(personSpending).map(([name, amount]) => ({
    name,
    amount: Math.round(amount),
  }));

  const settlement = expenses.reduce((acc, exp) => {
    const perPerson = exp.amount / exp.splitAmong.length;
    exp.splitAmong.forEach((person) => {
      if (person !== exp.paidBy) {
        const key = `${person}->${exp.paidBy}`;
        acc[key] = (acc[key] || 0) + perPerson;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  // Net out reverse debts (A owes B and B owes A)
  const netSettlement: Record<string, number> = {};
  Object.entries(settlement).forEach(([key, amount]) => {
    const [from, to] = key.split('->');
    const reverseKey = `${to}->${from}`;
    if (netSettlement[reverseKey] !== undefined) {
      const diff = netSettlement[reverseKey] - amount;
      if (diff > 0.01) {
        netSettlement[reverseKey] = diff;
      } else if (diff < -0.01) {
        netSettlement[key] = -diff;
        delete netSettlement[reverseKey];
      } else {
        delete netSettlement[reverseKey];
      }
    } else {
      netSettlement[key] = amount;
    }
  });

  const remaining = BUDGET_TOTAL.total - totalAmount;
  const spentPercent = Math.min((totalAmount / BUDGET_TOTAL.total) * 100, 100);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-container flex items-center justify-center" style={{ minHeight: '60vh' }}>
          <div style={{ color: '#d4b86a', fontSize: '18px' }}>Loading budget...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="page-header" style={{ marginBottom: 0 }}>
            <div className="section-label">Money Talk</div>
            <h1 className="page-title">Budget Tracker</h1>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            <Plus size={16} />
            Add Expense
          </button>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="expense-card" style={{ border: '1px solid rgba(126,207,168,0.15)', background: 'rgba(126,207,168,0.05)' }}>
            <div className="expense-value" style={{ color: '#7ecfa8' }}>{formatCurrency(totalAmount)}</div>
            <div className="expense-label" style={{ color: '#3a5a4e' }}>Total Spent</div>
          </div>
          <div className="expense-card" style={{ border: '1px solid rgba(212,184,106,0.15)', background: 'rgba(212,184,106,0.05)' }}>
            <div className="expense-value" style={{ color: '#d4b86a' }}>{formatCurrency(BUDGET_TOTAL.total)}</div>
            <div className="expense-label" style={{ color: '#5a4a2e' }}>Budget</div>
          </div>
          <div className="expense-card" style={{ border: '1px solid rgba(212,134,106,0.15)', background: 'rgba(212,134,106,0.05)' }}>
            <div className="expense-value" style={{ color: remaining >= 0 ? '#d4866a' : '#ff6b6b' }}>{formatCurrency(remaining)}</div>
            <div className="expense-label" style={{ color: '#5a3a2e' }}>Remaining</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="glass-card mb-8" style={{ padding: '18px 24px' }}>
          <div className="flex justify-between mb-2" style={{ fontSize: '12px', color: '#5a6a5e' }}>
            <span>Budget Used</span>
            <span style={{ color: '#d4b86a' }}>{Math.round(spentPercent)}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${spentPercent}%` }} />
          </div>
        </div>

        {/* Add Expense Form */}
        {showForm && (
          <div className="glass-card mb-8 animate-fade-up">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Dinner at Kayees"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="form-input"
                    placeholder="1500"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Paid By</label>
                  <input
                    type="text"
                    value={formData.paidBy}
                    onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                    className="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Split Among (comma separated)</label>
                  <input
                    type="text"
                    value={formData.splitAmong.join(', ')}
                    onChange={(e) => setFormData({ ...formData, splitAmong: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                    className="form-input"
                    placeholder="Name1, Name2, Name3"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-input form-select"
                  >
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <button type="submit" className="btn-primary">Add Expense</button>
              </div>
            </form>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Expense list */}
          <div className="lg:col-span-2 glass-card">
            <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#e8e2d4', marginBottom: '16px' }}>
              Expenses ({expenses.length})
            </h2>
            {expenses.length === 0 ? (
              <p style={{ color: '#4a5a4e', fontSize: '14px' }}>No expenses yet. Add your first expense!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#0c0f0a',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#e8e2d4', fontSize: '14px' }}>{expense.description}</div>
                      <div style={{ fontSize: '12px', color: '#5a6a5e', marginTop: '3px' }}>
                        <span className="badge badge-teal" style={{ marginRight: '6px' }}>{expense.category}</span>
                        {expense.paidBy} paid · {expense.splitAmong.join(', ')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: '#d4b86a', fontWeight: 600, fontSize: '15px', fontFamily: "var(--font-display), 'Bebas Neue', sans-serif", letterSpacing: '0.5px' }}>
                        {formatCurrency(expense.amount)}
                      </span>
                      <button onClick={() => handleDelete(expense.id)} className="btn-danger">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pie chart */}
          <div className="glass-card">
            <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: '#e8e2d4', marginBottom: '16px' }}>
              By Category
            </h2>
            {categoryData.length === 0 ? (
              <p style={{ color: '#4a5a4e', fontSize: '13px' }}>No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    stroke="none"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#111610', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e8e2d4' }}
                    itemStyle={{ color: '#8a9e8e' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Per person */}
          <div className="glass-card">
            <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: '#e8e2d4', marginBottom: '16px' }}>
              Per Person
            </h2>
            {personData.length === 0 ? (
              <p style={{ color: '#4a5a4e', fontSize: '13px' }}>No data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={personData}>
                  <XAxis dataKey="name" stroke="#4a5a4e" fontSize={11} />
                  <YAxis stroke="#4a5a4e" fontSize={11} />
                  <Tooltip
                    contentStyle={{ background: '#111610', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e8e2d4' }}
                    itemStyle={{ color: '#8a9e8e' }}
                  />
                  <Bar dataKey="amount" fill="#7ecfa8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Settlements */}
          <div className="glass-card">
            <h2 style={{ fontFamily: "var(--font-heading), 'Syne', sans-serif", fontSize: '16px', fontWeight: 700, color: '#e8e2d4', marginBottom: '16px' }}>
              💰 Who Owes Whom
            </h2>
            {Object.keys(netSettlement).length === 0 ? (
              <p style={{ color: '#4a5a4e', fontSize: '13px' }}>All settled up!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(netSettlement).map(([key, amount]) => {
                  const [from, to] = key.split('->');
                  return (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#0c0f0a',
                        borderRadius: '10px',
                        padding: '12px 16px',
                      }}
                    >
                      <span style={{ color: '#e8e2d4', fontSize: '14px' }}>
                        {from} <span style={{ color: '#d4866a', margin: '0 8px' }}>→</span> {to}
                      </span>
                      <span style={{ color: '#d4b86a', fontWeight: 600 }}>{formatCurrency(amount)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
