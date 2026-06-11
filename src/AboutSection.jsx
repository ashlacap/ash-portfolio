// About Section
import React, { useState, useEffect, useRef } from 'react'

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const VideoCard = ({ src, label, style: outerStyle = {} }) => {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [hovering, setHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const prevVol = useRef(0.8);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.volume = 0.8;
    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('loadedmetadata', onMeta);
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) { video.pause(); setPlaying(false); } },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('loadedmetadata', onMeta);
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) { video.play().catch(() => {}); setPlaying(true); }
    else { video.pause(); setPlaying(false); }
  };

  const handleSeek = (e) => {
    const video = ref.current;
    if (!video) return;
    const v = parseFloat(e.target.value);
    video.currentTime = v;
    setCurrentTime(v);
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    const video = ref.current;
    if (!video) return;
    if (v > 0) prevVol.current = v;
    video.volume = v;
    video.muted = v === 0;
    setVolume(v);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = ref.current;
    if (!video) return;
    if (volume > 0) {
      prevVol.current = volume;
      video.volume = 0; video.muted = true; setVolume(0);
    } else {
      const v = prevVol.current || 0.8;
      video.volume = v; video.muted = false; setVolume(v);
    }
  };

  const VolumeIcon = () => volume === 0
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={togglePlay}
      style={{
        borderRadius: 14, border: '2.5px solid #111',
        overflow: 'hidden', boxShadow: '4px 4px 0 #111',
        background: '#0d0d0d', position: 'relative', cursor: 'pointer',
        ...outerStyle,
      }}
    >
      <video
        ref={ref}
        src={src}
        loop playsInline preload="metadata"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Play button overlay — shown when paused */}
      {!playing && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.35)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#1a1410" style={{ marginLeft: 3 }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Bottom control bar — shown on hover or when playing on touch */}
      {(hovering || (isTouchDevice && playing)) && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '40px 10px 8px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          }}
        >
          {/* Vertical volume control — right side above seek bar */}
          <div style={{
            position: 'absolute', right: 10, bottom: 36,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <input
              type="range" min="0" max="1" step="0.05"
              value={volume} onChange={handleVolume}
              style={{
                writingMode: 'vertical-lr', direction: 'rtl',
                height: 64, cursor: 'pointer', accentColor: '#ffd024',
              }}
            />
            <button onClick={toggleMute} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 2, lineHeight: 1, display: 'flex',
            }}>
              <VolumeIcon />
            </button>
          </div>

          {/* Seek bar */}
          <input
            type="range" min="0" max={duration || 100} step="0.1"
            value={currentTime} onChange={handleSeek}
            style={{ width: '100%', cursor: 'pointer', accentColor: '#ffd024', display: 'block' }}
          />
          {/* Timestamp */}
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
            color: 'white', letterSpacing: '0.02em', marginTop: 3, display: 'block',
          }}>
            {fmt(currentTime)} / {fmt(duration)}
          </span>
        </div>
      )}

      {label && (
        <div style={{
          position: 'absolute', bottom: 46, left: 10,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
          borderRadius: 6, padding: '4px 10px',
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          fontWeight: 600, color: 'white', letterSpacing: '0.04em',
        }}>{label}</div>
      )}
    </div>
  );
};

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
          {/* Photo wrapper — avatar is anchored here */}
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
            {/* Avatar — bottom-right of photo */}
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
              { degree: 'MBA, Marketing and Business Analytics', school: 'University of California, Riverside · Expected 2026' },
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
            I earned my B.S. in Marketing from California State University, Northridge, and I'm now a second-year MBA candidate at the University of California, Riverside, where I serve as the Director of Public Relations and Marketing for our Student Association.
          </p>

          {/* Skill tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Integrated Campaigns', 'Influencer Marketing', 'Social Strategy', 'Performance Analytics', 'Brand Messaging', 'Email and Content'].map(s => (
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

      {/* ── Video Showcase ───────────────────────────────── */}
      <div style={{ padding: isMobile ? '56px 20px 60px' : '72px 48px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Video Editing */}
          <div style={{ marginBottom: 60 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#d42020', marginBottom: 8,
            }}>Video Editing</div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700,
              color: '#1a1410', letterSpacing: '-0.03em', marginBottom: 8,
            }}>Content I've created.</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              color: '#6b5c52', lineHeight: 1.7, marginBottom: 24, maxWidth: 520,
            }}>
              TikToks, branded edits, and creative cuts. These autoplay as you scroll.
            </p>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 20 : 110, alignItems: 'stretch', justifyContent: 'center' }}>
              {/* Left: two stacked 16:9 videos */}
              <div style={{ width: isMobile ? '100%' : 380, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <VideoCard
                  src="/video-tiktok1.mp4"
                  label="TikTok Edit 1"
                  style={{ width: '100%', aspectRatio: '16 / 9' }}
                />
                <VideoCard
                  src="/video-edit1.mov"
                  label="Video Edit"
                  style={{ width: '100%', aspectRatio: '16 / 9' }}
                />
              </div>
              {/* Right: portrait at natural 9:16, centered vertically */}
              <div style={{ width: isMobile ? '60%' : 300, flexShrink: 0, display: 'flex', alignItems: 'center', margin: isMobile ? '0 auto' : 0 }}>
                <VideoCard
                  src="/video-tiktok2.mp4"
                  label="TikTok Edit 2"
                  style={{ width: '100%', aspectRatio: '9 / 16' }}
                />
              </div>
            </div>
          </div>

          {/* Gaming */}
          <div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#d42020', marginBottom: 8,
            }}>Gaming</div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700,
              color: '#1a1410', letterSpacing: '-0.03em', marginBottom: 8,
            }}>In my element.</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              color: '#6b5c52', lineHeight: 1.7, marginBottom: 24, maxWidth: 520,
            }}>
              Gaming has been a part of my life for as long as I can remember.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <VideoCard
                src="/video-gaming1.mp4"
                label="Gaming Clip"
                style={{ width: isMobile ? '100%' : '60%', aspectRatio: '16 / 9' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Photography Carousel ──────────────────────────── */}
      <div style={{ padding: '72px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#d42020', marginBottom: 8,
          }}>Photography</div>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700,
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
              height: 520,
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
              position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
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
              position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
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