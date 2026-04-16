// Trip metadata and route destinations

export const TRIP_INFO = {
  startDate: new Date('2026-05-01T07:00:00+05:30'),
  endDate: new Date('2026-05-06T23:59:59+05:30'),
  totalFriends: 10,
  totalDistance: 369,
  totalDays: 3,
  totalDriveHours: 10.5,
  logo: 'GangForever',
};

export const DESTINATIONS = [
  { name: 'Snehatheeram, Kerala', order: 1, type: 'start' as const },
  { name: 'Guruvayur, Kerala', order: 2, type: 'stop' as const },
  { name: 'Chinese Fishing Nets, Fort Kochi', order: 3, type: 'stop' as const },
  { name: 'Cherai Beach, Vypin', order: 4, type: 'stop' as const },
  { name: 'Alappuzha Beach', order: 5, type: 'stop' as const },
  { name: 'Munroe Island', order: 6, type: 'stop' as const },
  { name: 'Kollam Beach', order: 7, type: 'stop' as const },
  { name: 'Varkala, Kerala', order: 8, type: 'end' as const },
];
