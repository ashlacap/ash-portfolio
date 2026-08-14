import React, { useState, useEffect } from 'react'

const useWindowWidth = () => {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
};

const Nav = ({ activePage, activeSection, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 900;

  useEffect(() => {
    const closeOnScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', closeOnScroll);
    return () => window.removeEventListener('scroll', closeOnScroll);
  }, []);

  const handleNav = (page) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  const links = [
    { label: 'Work', page: 'work' },
    { label: 'Products', page: 'side-quests' },
    { label: 'Design', page: 'graphic-design' },
    { label: 'Videos', page: 'video-edits' },
    { label: 'About', page: 'about' },
  ];
  const resumeHref = '/Ash-Lacap-Resume.pdf';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 20px' : '0 48px', height: 64,
        background: '#d42020',
        borderBottom: '2.5px solid #111',
        boxShadow: '0 2px 0 #111',
      }}>
        <button
          onClick={() => handleNav('home')}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 22, fontWeight: 700,
            color: 'white', letterSpacing: '-0.02em',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
          Ash<span style={{ color: 'rgba(255,255,255,0.5)' }}>.</span>Lacap
        </button>

        {!isMobile && (
          <ul style={{ display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map(({ label, page }) => {
              const isActive = activePage === page || activeSection === page;
              return (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
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
            <li>
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400,
                  color: 'rgba(255,255,255,0.85)', background: 'none',
                  cursor: 'pointer', padding: '6px 14px', borderRadius: 6,
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5,
                  transition: 'color 150ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}>
                Resume ↗
              </a>
            </li>
          </ul>
        )}

        {!isMobile ? (
          <button
            onClick={() => handleNav('contact')}
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
        ) : (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
            <span style={{
              display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2,
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              transition: 'transform 200ms',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2,
              opacity: menuOpen ? 0 : 1, transition: 'opacity 200ms',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2,
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              transition: 'transform 200ms',
            }} />
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          background: '#d42020',
          borderBottom: '2.5px solid #111',
          boxShadow: '0 4px 0 #111',
          zIndex: 199, padding: '12px 20px 20px',
        }}>
          {links.map(({ label, page }) => {
            const isActive = activePage === page || activeSection === page;
            return (
              <button key={page} onClick={() => handleNav(page)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? 'white' : 'rgba(255,255,255,0.85)',
                background: isActive ? 'rgba(0,0,0,0.15)' : 'none',
                border: 'none', cursor: 'pointer',
                padding: '12px 14px', borderRadius: 8, marginBottom: 4,
              }}>
                {label}
              </button>
            );
          })}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 400,
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              padding: '12px 14px', borderRadius: 8, marginBottom: 4,
            }}>
            Resume ↗
          </a>
          <button onClick={() => handleNav('contact')} style={{
            display: 'block', width: '100%', textAlign: 'center', marginTop: 8,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
            padding: '12px 20px', borderRadius: 8,
            background: 'white', color: '#d42020',
            border: '2px solid rgba(255,255,255,0.4)',
            cursor: 'pointer',
          }}>
            Let's Connect
          </button>
        </div>
      )}
    </>
  );
};

Object.assign(window, { Nav });

export default Nav
