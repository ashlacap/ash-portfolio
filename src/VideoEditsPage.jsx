// Video Edits — a compilation of every edit, grouped by client / category
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

const VideoEditsPage = () => {
  const isMobile = useWindowWidth() < 768;

  // o: 'p' portrait (9:16), 'l' landscape (16:9)
  const groups = [
    {
      label: 'Esports & Gaming',
      blurb: 'Hype edits and gameplay cuts — beat-synced, motion-graphic driven, built for the FGC and esports audience.',
      videos: [
        { src: '/flyquest-fly-vs-sen-edit.mp4', label: 'FlyQuest · FLY vs SEN', o: 'p' },
        { src: '/video-gaming1.mp4', label: 'Gaming Clip', o: 'l' },
      ],
    },
    {
      label: 'Social View Agency · CartZilla',
      blurb: 'Short-form social content produced during my agency internship for CartZilla across TikTok and Instagram.',
      videos: [
        { src: '/CartZilla%201.mp4', label: 'CartZilla Reel 1', o: 'p' },
        { src: '/CartZilla%202.mp4', label: 'CartZilla Reel 2', o: 'p' },
        { src: '/CartZilla%203.mp4', label: 'CartZilla Reel 3', o: 'p' },
        { src: '/CartZilla%20Testimonial%20Video.mp4', label: 'CartZilla Testimonial', o: 'p' },
      ],
    },
    {
      label: 'AGSM Student Association',
      blurb: 'Promotional reels for UCR’s graduate business school student association events and programming.',
      videos: [
        { src: '/Student%20Association%20Reel%201.mp4', label: 'Student Association Reel 1', o: 'p' },
        { src: '/Student%20Association%20Reel%202.mp4', label: 'Student Association Reel 2', o: 'p' },
      ],
    },
    {
      label: 'Short-Form & Personal Edits',
      blurb: 'A mix of TikToks, branded cuts, and creative experiments spanning nearly 11 years of editing.',
      videos: [
        { src: '/video-tiktok1.mp4', label: 'TikTok Edit 1', o: 'l' },
        { src: '/video-tiktok2.mp4', label: 'TikTok Edit 2', o: 'p' },
        { src: '/video-edit1.mov', label: 'Video Edit', o: 'l' },
      ],
    },
  ];

  const total = groups.reduce((n, g) => n + g.videos.length, 0);

  const cardStyle = (o) => o === 'p'
    ? { width: isMobile ? '76%' : 250, aspectRatio: '9 / 16' }
    : { width: isMobile ? '100%' : 440, aspectRatio: '16 / 9' };

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '48px 20px 64px' : '72px 48px 96px' }}>
      {/* Header */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d42020', marginBottom: 14,
      }}>Video Edits</div>
      <h1 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: isMobile ? 36 : 52, fontWeight: 700, color: '#1a1410',
        letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: 16,
      }}>Everything I've cut.</h1>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17,
        color: '#6b5c52', lineHeight: 1.7, marginBottom: 8, maxWidth: 620,
      }}>
        A running compilation of my video editing work — {total} edits across esports, agency
        campaigns, student programming, and personal projects. Click any video to play; hover
        or tap for scrubbing and volume.
      </p>

      {/* Groups */}
      {groups.map((g, gi) => (
        <div key={g.label} style={{ marginTop: isMobile ? 44 : 64 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
          }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 26, fontWeight: 700,
              color: '#1a1410', letterSpacing: '-0.02em',
            }}>{g.label}</h2>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: '#8c7a70',
              background: '#f0ece8', border: '1.5px solid #e4dfdc', borderRadius: 20, padding: '2px 10px',
            }}>{g.videos.length}</span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            color: '#6b5c52', lineHeight: 1.65, marginBottom: 24, maxWidth: 560,
          }}>{g.blurb}</p>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: isMobile ? 16 : 24,
            justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'flex-start',
          }}>
            {g.videos.map((v) => (
              <VideoCard
                key={v.src}
                src={v.src}
                label={v.label}
                accent="#ffd024"
                style={cardStyle(v.o)}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

Object.assign(window, { VideoEditsPage });

export default VideoEditsPage
