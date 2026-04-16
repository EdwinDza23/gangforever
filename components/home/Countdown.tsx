'use client';

import { useState, useEffect } from 'react';
import { TRIP_INFO } from '@/lib/constants/trip';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(): TimeLeft {
  const diff = TRIP_INFO.startDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days,    label: 'Days' },
    { value: timeLeft.hours,   label: 'Hrs' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ];

  return (
    <div className="flex gap-3" style={{ animation: 'fadeUp 1s 0.3s ease both' }}>
      {units.map((unit) => (
        <div key={unit.label} className="cd-unit">
          <div className="cd-num">
            {mounted ? String(unit.value).padStart(2, '0') : '--'}
          </div>
          <div className="cd-label">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
