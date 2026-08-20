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

const Footer = ({ onNavigate }) => {
  const isMobile = useWindowWidth() < 768;
  return (
  <footer style={{
    background: '#0d1230',
    borderTop: '2.5px solid #111',
    padding: isMobile ? '48px 20px 32px' : '56px 48px 40px',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: 'flex-start',
        gap: isMobile ? 32 : 0, marginBottom: 48,
      }}>
        {/* Logo + tagline */}
        <div>
          <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 30, fontWeight: 700,
          color: 'white', letterSpacing: '-0.02em', marginBottom: 8
        }}>
            Ash<span style={{ color: '#d42020' }}>.</span>Lacap
          </div>
          <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, color: '#5e71c4', lineHeight: 1.5, maxWidth: 240
        }}>
            Data Analytics that drive growth and revenue.
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: isMobile ? 40 : 56 }}>
          <div>
            <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#3a4ea8', marginBottom: 16
          }}>Navigate</div>
            {[['Work', 'work'], ['Projects', 'side-quests'], ['About', 'about']].map(([label, page]) =>
          <div key={page} style={{ marginBottom: 10 }}>
                <button onClick={() => onNavigate(page)} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400,
              color: '#8a99d8', background: 'none', border: 'none',
              cursor: 'pointer', padding: 0,
              transition: 'color 150ms'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffd024'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a99d8'}>
                  {label}
                </button>
              </div>
          )}
          <div style={{ marginBottom: 10 }}>
            <a href="/Ash-Lacap-Resume.pdf" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400,
              color: '#8a99d8', textDecoration: 'none', transition: 'color 150ms'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffd024'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a99d8'}>
              Resume ↗
            </a>
          </div>
          </div>

          <div>
            <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#3a4ea8', marginBottom: 16
          }}>Connect</div>
            {[
          ['LinkedIn', 'https://www.linkedin.com/in/ash-lacap/'],
          ['Email', 'mailto:ashleynlacap@gmail.com']].
          map(([label, href]) =>
          <div key={label} style={{ marginBottom: 10 }}>
                <a href={href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              color: '#8a99d8', textDecoration: 'none',
              transition: 'color 150ms'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffd024'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a99d8'}>
                  {label}
                </a>
              </div>
          )}
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: '#1e2a5e', marginBottom: 24 }} />

      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
        gap: 8,
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#3a4ea8' }}>
          © 2026 Ash Lacap. All rights reserved.
        </div>
        <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase', color: '#3a4ea8'
      }}>

      </div>
      </div>
    </div>
  </footer>
  );
};

Object.assign(window, { Footer });

export default Footer
