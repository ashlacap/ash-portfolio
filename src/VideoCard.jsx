// Shared click-to-play video player with seek bar, timestamp, and vertical volume
import React, { useState, useEffect, useRef } from 'react'

export const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const VideoCard = ({ src, label, accent = 'white', style: outerStyle = {} }) => {
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
        position: 'relative', borderRadius: 14, overflow: 'hidden',
        border: '2.5px solid #111', boxShadow: '4px 4px 0 #111',
        background: '#0d0d0d', cursor: 'pointer',
        ...outerStyle,
      }}
    >
      <video
        ref={ref}
        src={src}
        loop playsInline preload="metadata"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Play button overlay: shown when paused */}
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

      {/* Bottom control bar: shown on hover or when playing on touch */}
      {(hovering || (isTouchDevice && playing)) && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '40px 10px 8px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          }}
        >
          {/* Vertical volume control: right side above seek bar */}
          <div style={{
            position: 'absolute', right: 10, bottom: 36,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <input
              type="range" min="0" max="1" step="0.05"
              value={volume} onChange={handleVolume}
              style={{
                writingMode: 'vertical-lr', direction: 'rtl',
                height: 64, cursor: 'pointer', accentColor: accent,
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
            style={{ width: '100%', cursor: 'pointer', accentColor: accent, display: 'block' }}
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

export default VideoCard
