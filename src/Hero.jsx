// Hero section
import React, { useState, useEffect, useRef } from 'react'

const Hero = ({ onNavigate }) => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const fadeIn = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  const avatarStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.92)',
    transition: `opacity 700ms cubic-bezier(0.34,1.56,0.64,1) 200ms, transform 700ms cubic-bezier(0.34,1.56,0.64,1) 200ms`,
  };

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '80px 48px 0', maxWidth: 1200, margin: '0 auto',
      position: 'relative', gap: 0,
    }}>
      {/* Left: Text */}
      <div style={{ flex: 1, paddingTop: 24, paddingRight: 48 }}>
        <p style={{
          ...fadeIn(100),
          fontFamily: "'DM Sans', sans-serif", fontSize: 16,
          color: '#6b5c52', marginBottom: 8, fontWeight: 400,
        }}>
          Hey everyone! My name is:
        </p>

        <h1 style={{
          ...fadeIn(180),
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(52px, 6.5vw, 80px)',
          fontWeight: 700, lineHeight: 1.0,
          letterSpacing: '-0.03em', color: '#1e2a5e',
          marginBottom: 10,
        }}>
          Ash Lacap
        </h1>

        <div style={{
          ...fadeIn(210),
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: '#8c7a70', marginBottom: 20, fontStyle: 'italic',
        }}>(she/her)</div>

        <p style={{
          ...fadeIn(260),
          fontFamily: "'DM Sans', sans-serif", fontSize: 17,
          color: '#6b5c52', lineHeight: 1.75, maxWidth: 440, marginBottom: 40,
        }}>
          Creative marketer specializing in Gen Z engagement, social strategy, and community-driven campaigns.
        </p>

        <div style={{ ...fadeIn(340), display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('work')}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
              padding: '13px 30px', borderRadius: 8,
              background: '#1e2a5e', color: 'white',
              border: '2.5px solid #111', boxShadow: '4px 4px 0 #111',
              cursor: 'pointer', transition: 'box-shadow 120ms, transform 120ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '6px 6px 0 #111'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '4px 4px 0 #111'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            See the Work →
          </button>
          <button
            onClick={() => onNavigate('about')}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
              padding: '13px 30px', borderRadius: 8,
              background: 'transparent', color: '#1e2a5e',
              border: '2.5px solid #111', boxShadow: '4px 4px 0 #b8c2ea',
              cursor: 'pointer', transition: 'box-shadow 120ms, transform 120ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '6px 6px 0 #b8c2ea'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '4px 4px 0 #b8c2ea'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            About Me
          </button>
          <button
            onClick={() => onNavigate('resume')}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
              padding: '13px 30px', borderRadius: 8,
              background: 'transparent', color: '#1e2a5e',
              border: '2.5px solid #111', boxShadow: '4px 4px 0 #b8c2ea',
              cursor: 'pointer', transition: 'box-shadow 120ms, transform 120ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '6px 6px 0 #b8c2ea'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '4px 4px 0 #b8c2ea'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Resume
          </button>
        </div>

        {/* Skills row */}
        <div style={{ ...fadeIn(420), display: 'flex', gap: 10, marginTop: 52, flexWrap: 'wrap' }}>
          {['Brand Strategy', 'Digital Marketing', 'Campaign Planning', 'Content', 'Social Media', 'Gaming'].map(s => (
            <span key={s} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
              color: '#6b5c52', background: '#f5f2f0',
              padding: '5px 12px', borderRadius: 20,
              border: '1.5px solid #e4dfdc',
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Right: Avatar */}
      <div style={{
        flexShrink: 0, width: 380, display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        position: 'relative', alignSelf: 'center',
      }}>
        {/* Speech bubble */}
        <div style={{
          ...fadeIn(300),
          background: '#f8f6f2', border: '2.5px solid #111',
          borderRadius: 14, padding: '10px 18px',
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
          color: '#1a1410', boxShadow: '3px 3px 0 #111',
          marginBottom: 4, zIndex: 2, position: 'relative',
          whiteSpace: 'nowrap',
        }}>
          Nice to meet you!
          {/* Arrow */}
          <div style={{
            position: 'absolute', bottom: -11, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
            borderTop: '11px solid #111',
          }} />
          <div style={{
            position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '9px solid transparent', borderRight: '9px solid transparent',
            borderTop: '10px solid #f8f6f2',
          }} />
        </div>

        <div style={avatarStyle}>
          <img
            src="/animated-me.png?v=2"
            alt="Ash Lacap cartoon avatar"
            style={{ width: 300, height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero });

export default Hero