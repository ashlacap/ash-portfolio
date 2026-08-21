// About Section
import React, { useState, useEffect } from 'react'
import VideoCard from './VideoCard'

const useWindowWidth = () => {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
};

const AboutSection = () => {
  const photoSlides = [
    '/photo-rocks.jpg',
    '/photo-pool.jpg',
    '/photo-fire.png',
    '/photo-concert.png',
    '/photo-gaming.jpg',
    '/photo-selfie.jpg',
  ];
  const [photoCurrent, setPhotoCurrent] = React.useState(0);
  const isMobile = useWindowWidth() < 768;

  React.useEffect(() => {
    photoSlides.forEach(src => { const img = new Image(); img.src = src; });
  }, []);

  const prevPhoto = () => setPhotoCurrent(i => (i - 1 + photoSlides.length) % photoSlides.length);
  const nextPhoto = () => setPhotoCurrent(i => (i + 1) % photoSlides.length);

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Bio block ─────────────────────────────────────── */}
      <div style={{
        padding: isMobile ? '80px 20px 48px' : '100px 48px 64px',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 40 : 72, alignItems: 'flex-start',
      }}>
        {/* Photo stack + education below */}
        <div style={{ flexShrink: 0, width: isMobile ? '100%' : 320 }}>
          {/* Photo wrapper: avatar is anchored here */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 320, marginBottom: isMobile ? 36 : 56 }}>
            {/* Yellow offset */}
            {!isMobile && <div style={{
              position: 'absolute', top: 14, left: -14,
              width: 320, height: 380, background: '#ffd024',
              border: '2.5px solid #111', borderRadius: 18, zIndex: 0,
            }} />}
            {/* Photo */}
            <div style={{
              width: '100%', height: isMobile ? 280 : 380, border: '2.5px solid #111', borderRadius: 18,
              overflow: 'hidden', boxShadow: '6px 6px 0 #1e2a5e',
              position: 'relative', zIndex: 1,
            }}>
              <img loading="lazy" src="/photo-headshot.jpg" alt="Ash Lacap"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            {/* Avatar: bottom-right of photo */}
            <div style={{
              position: 'absolute', bottom: -28, right: isMobile ? -8 : -36,
              width: isMobile ? 80 : 110, zIndex: 2,
              filter: 'drop-shadow(3px 3px 0 #111)',
            }}>
              <img loading="lazy" src="/animated-me.png" alt="" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Education cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { degree: 'MBA, Marketing and Business Analytics', school: 'University of California, Riverside · 2026' },
              { degree: 'BS, Marketing', school: 'California State University, Northridge · 2022' },
            ].map(e => (
              <div key={e.school} style={{
                padding: '14px 18px',
                border: '2px solid #e4dfdc', borderRadius: 10, background: '#faf8f7',
              }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: '#1a1410', marginBottom: 4 }}>{e.degree}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#8c7a70' }}>{e.school}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio text */}
        <div style={{ flex: 1, paddingBottom: 20 }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#d42020', marginBottom: 16,
          }}>About Me</div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: '#8c7a70', marginBottom: 6, fontStyle: 'italic',
          }}>Hey again! My name is</div>

          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 42, fontWeight: 700, color: '#1a1410',
            letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 6,
          }}>Ash Lacap</h2>

          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            color: '#8c7a70', fontStyle: 'italic', marginBottom: 24,
          }}>(she/her)</div>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: '#6b5c52', lineHeight: 1.8, marginBottom: 16, maxWidth: 520,
          }}>
            I was born and raised in Glendale, CA, but I've called many places home: La Puente, San Diego, Yokosuka (Japan), Honolulu, Santa Clarita, and Menifee. By the time I graduated high school, I had attended eight different schools, which taught me adaptability, resilience, and how to connect with people from all walks of life.
          </p>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: '#6b5c52', lineHeight: 1.8, marginBottom: 16, maxWidth: 520,
          }}>
            I'm the proud eldest daughter of Filipino immigrants, a lesbian, a neurodivergent woman, and someone who values diversity, inclusion, and authentic storytelling. These parts of my identity explain why I approach marketing with empathy, creativity, and a drive to build meaningful connections.
          </p>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: '#6b5c52', lineHeight: 1.8, marginBottom: 32, maxWidth: 520,
          }}>
            I earned my B.S. in Marketing from California State University, Northridge, and my MBA from the University of California, Riverside, concentrating in Marketing and Business Analytics, where I served as the Director of Marketing & Public Relations for our Student Association. Now that I've graduated, I'm seeking opportunities to put my MBA and hands-on marketing and analytics experience to work.
          </p>

          {/* Skill tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Data Visualization', 'A/B Testing', 'SQL & Python', 'Performance Analytics', 'Brand Strategy', 'Social Strategy'].map(s => (
              <span key={s} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                color: '#1e2a5e', background: '#e0e4f5',
                padding: '6px 14px', borderRadius: 20, border: '1.5px solid #b8c2ea',
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fun Facts ─────────────────────────────────────── */}
      <div style={{
        background: '#f5f2f0', borderTop: '2.5px solid #111', borderBottom: '2.5px solid #111',
        padding: isMobile ? '56px 20px' : '72px 48px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#d42020', marginBottom: 12,
          }}>Fun Facts</div>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 26 : 36, fontWeight: 700,
            color: '#1a1410', letterSpacing: '-0.03em', marginBottom: 40,
          }}>A little more about me.</h2>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              {
                title: 'Video Editing',
                icon: '🎬',
                body: "I've been editing videos for nearly 11 years, starting with Vine edits of my favorite artists and eventually working on professional content for brands and social media campaigns. Whether it's dynamic event recaps, beat-synced cuts, or motion graphics, I love finding creative ways to tell a story visually.",
              },
              {
                title: 'Photography',
                icon: '📷',
                body: "Since taking photography in high school, I've always had a camera in my hand. I love experimenting with different styles, from cinematic video shots to crisp, colorful portraits. My approach combines technical skill with storytelling to make sure each photo captures a feeling, not just a moment.",
              },
              {
                title: 'Gaming',
                icon: '🎮',
                body: "I've been playing video games before I could speak. Gaming is a huge part of my life and a major creative influence. My passion has inspired themed content, live esports coverage on Discord and Twitch, and it's taught me teamwork, quick thinking, and how to thrive in fast-paced environments.",
              },
            ].map(({ title, icon, body }) => (
              <div key={title} style={{
                flex: '1 1 280px',
                padding: '28px 28px 32px',
                background: 'white', border: '2.5px solid #111',
                borderRadius: 16, boxShadow: '4px 4px 0 #111',
              }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
                  color: '#1a1410', marginBottom: 10,
                }}>{title}</div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  color: '#6b5c52', lineHeight: 1.75, margin: 0,
                }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Photography Carousel ──────────────────────────── */}
      <div style={{ padding: isMobile ? '56px 20px' : '72px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#d42020', marginBottom: 8,
          }}>Photography</div>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700,
            color: '#1a1410', letterSpacing: '-0.03em', marginBottom: 8,
          }}>Through my lens.</h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            color: '#6b5c52', lineHeight: 1.7, marginBottom: 28, maxWidth: 560,
          }}>
            A mix of travel, concerts, everyday moments, and the occasional fire. Shot on everything from DSLRs to my phone.
          </p>

          {/* Carousel */}
          <div style={{ position: 'relative' }}>
            <div style={{
              border: '2.5px solid #111', borderRadius: 16,
              overflow: 'hidden', boxShadow: '4px 4px 0 #111',
              background: '#111', position: 'relative',
              height: isMobile ? 260 : 520,
            }}>
              {photoSlides.map((src, i) => (
                <img key={src} src={src} alt={`Photo ${i + 1}`} style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  opacity: i === photoCurrent ? 1 : 0,
                  transition: 'opacity 350ms ease',
                  pointerEvents: i === photoCurrent ? 'auto' : 'none',
                }} />
              ))}
            </div>
            <button onClick={prevPhoto} style={{
              position: 'absolute', left: isMobile ? 8 : -20, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'white', border: '2.5px solid #111', boxShadow: '3px 3px 0 #111',
              cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'box-shadow 120ms, transform 120ms', zIndex: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '5px 5px 0 #111'; e.currentTarget.style.transform = 'translateY(calc(-50% - 2px))'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '3px 3px 0 #111'; e.currentTarget.style.transform = 'translateY(-50%)'; }}>
              ←
            </button>
            <button onClick={nextPhoto} style={{
              position: 'absolute', right: isMobile ? 8 : -20, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'white', border: '2.5px solid #111', boxShadow: '3px 3px 0 #111',
              cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'box-shadow 120ms, transform 120ms', zIndex: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '5px 5px 0 #111'; e.currentTarget.style.transform = 'translateY(calc(-50% - 2px))'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '3px 3px 0 #111'; e.currentTarget.style.transform = 'translateY(-50%)'; }}>
              →
            </button>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
            {photoSlides.map((_, i) => (
              <button key={i} onClick={() => setPhotoCurrent(i)} style={{
                width: i === photoCurrent ? 24 : 8, height: 8,
                borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                background: i === photoCurrent ? '#1e2a5e' : '#cec6c0',
                transition: 'width 200ms, background 200ms',
              }} />
            ))}
          </div>
          <div style={{
            textAlign: 'center', marginTop: 10,
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#8c7a70',
          }}>{photoCurrent + 1} / {photoSlides.length}</div>
        </div>
      </div>

    </section>
  );
};

Object.assign(window, { AboutSection });

export default AboutSection