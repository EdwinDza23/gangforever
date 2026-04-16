// Budget estimates and expense category configuration

export const BUDGET_ITEMS = [
  { category: 'Fuel & Tolls',    total: 8000,  perHead: 800,  percent: 75, color: '#d4b86a' },
  { category: 'Accommodation',   total: 12000, perHead: 1200, percent: 60, color: '#7ecfa8' },
  { category: 'Food & Drinks',   total: 10000, perHead: 1000, percent: 50, color: '#d4866a' },
  { category: 'Activities',      total: 6000,  perHead: 600,  percent: 35, color: '#6aaed4' },
  { category: 'Misc / Buffer',   total: 4000,  perHead: 400,  percent: 0,  color: ''        },
];

export const BUDGET_TOTAL = { total: 40000, perHead: 4000 };

export const EXPENSE_CATEGORIES = [
  'Food',
  'Stay',
  'Activity',
  'Transport',
  'Other',
];

export const CATEGORY_COLORS: Record<string, string> = {
  Food:      '#d4866a',
  Stay:      '#7ecfa8',
  Activity:  '#6aaed4',
  Transport: '#d4b86a',
  Other:     '#a082dc',
};
