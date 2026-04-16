'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/itinerary', label: 'Route' },
  { href: '/budget',    label: 'Budget' },
  { href: '/gallery',   label: 'Gallery' },
  { href: '/packing',   label: 'Packing' },
  { href: '/tips',      label: 'Tips' },
  { href: '/food',      label: 'Food' },
  { href: '/achievements', label: 'Badges' },
  { href: '/playlist',  label: 'Playlist' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const activeStyle = {
    color: '#d4b86a',
    borderColor: 'rgba(212,184,106,0.4)',
    background: 'rgba(212,184,106,0.07)',
  };

  return (
    <nav className="nav-bar">
      <Link
        href="/"
        className="nav-pill"
        style={pathname === '/' ? activeStyle : {}}
      >
        Home
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-1.5 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-pill"
            style={pathname === link.href ? activeStyle : {}}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden nav-pill"
        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        {isOpen ? <X size={14} /> : <Menu size={14} />}
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden w-full flex flex-wrap gap-1.5 pt-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="nav-pill"
              style={pathname === link.href ? activeStyle : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
