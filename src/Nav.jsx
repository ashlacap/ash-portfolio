// Nav sticky top navigation with mobile-ready layout
import React, { useState, useEffect, useRef } from 'react'

const Nav = ({ activePage, activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Work', page: 'work' },
    { label: 'Side Quests', page: 'side-quests' },
    { label: 'About', page: 'about' },
    { label: 'Resume', page: 'resume' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: 64,
      background: '#d42020',
      borderBottom: '2.5px solid #111',
      boxShadow: '0 2px 0 #111',
      transition: 'background 200ms',
    }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 22, fontWeight: 700,
          color: 'white', letterSpacing: '-0.02em',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}>
        Ash<span style={{ color: 'rgba(255,255,255,0.5)' }}>.</span>Lacap
      </button>

      <ul style={{ display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map(({ label, page }) => {
          const isActive = activePage === page || (activePage === 'home' && (page === 'work' || page === 'side-quests'));
          return (
            <li key={page}>
              <button
                onClick={() => onNavigate(page)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'white' : 'rgba(255,255,255,0.85)',
                  background: isActive ? 'rgba(0,0,0,0.2)' : 'none',
                  border: 'none', cursor: 'pointer',
                  padding: '6px 14px', borderRadius: 6,
                  transition: 'color 150ms, background 150ms',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}>
                {label}
                {isActive && (
                  <span style={{
                    position: 'absolute', bottom: 2, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20, height: 2, background: 'white', borderRadius: 2,
                  }} />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => onNavigate('contact')}
        style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
          padding: '9px 20px', borderRadius: 8,
          background: 'white', color: '#d42020',
          border: '2px solid rgba(255,255,255,0.4)', boxShadow: 'none',
          cursor: 'pointer', letterSpacing: '-0.01em',
          transition: 'background 120ms, transform 120ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f5f2f0'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(0)'; }}>
        Let's Connect
      </button>
    </nav>
  );
};

Object.assign(window, { Nav });

export default Nav