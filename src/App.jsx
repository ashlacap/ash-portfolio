import { useState, useEffect, useRef } from 'react'
import Nav from './Nav'
import Hero from './Hero'
import AboutSection from './AboutSection'
import CaseStudyCard from './CaseStudyCard'
import CaseStudyDetail from './CaseStudyDetail'
import VideoCard from './VideoCard'
import VideoEditsPage from './VideoEditsPage'
import Footer from './Footer'
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakText, TweakRadio } from '../tweaks-panel'

// ── Scroll reveal hook ────────────────────────────────────
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    // Immediately show anything already in the viewport
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 40) el.classList.add('visible');
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('visible');});
    }, { threshold: 0.05 });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
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

// ── Section heading ───────────────────────────────────────
const SectionHeading = ({ label, title, subtitle, light }) =>
<div style={{ marginBottom: 8 }}>
    <div style={{
    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: light ? '#ffd024' : '#d42020', marginBottom: 14
  }}>{label}</div>
    <h2 style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 700,
    letterSpacing: '-0.03em', lineHeight: 1.05,
    color: light ? 'white' : '#1a1410',
    marginBottom: subtitle ? 14 : 0
  }}>{title}</h2>
    {subtitle &&
  <p style={{
    fontFamily: "'DM Sans', sans-serif", fontSize: 16,
    color: light ? '#8a99d8' : '#8c7a70', lineHeight: 1.65, maxWidth: 520
  }}>{subtitle}</p>
  }
  </div>;


// ── Work section ──────────────────────────────────────────
const WorkSection = ({ onNavigate, tweaks }) => {
  useReveal();
  const isMobile = useWindowWidth() < 768;
  const projects = [
  {
    slug: 'valobanners',
    tag: 'Data Analyst · LiveOps · Gaming',
    title: 'VALOBANNERS',
    description: 'Built Mixpanel and Tableau dashboards tracking 15+ core game KPIs, ran 12+ A/B tests monthly, and used SQL + Python analysis to drive an 18% YoY ARPU lift and 25% retention improvement.',
    bgColor: '#141b42',
    accentColor: '#ffd024',
    featured: true,
    imageContent: <img loading="lazy" src="/valobanners-cover.png" alt="VALOBANNERS" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />,
  },
  {
    slug: 'samsung',
    tag: 'Business Intelligence · Agency',
    title: 'Social View Agency',
    description: 'As Business Intelligence MBA Intern, designed A/B tests with SQL and Tableau that lifted user conversion +13%, and built automated dashboards tracking 12+ campaign KPIs to speed optimization decisions by 50%.',
    bgColor: '#1a1410',
    accentColor: '#8a99d8',
    featured: true,
    imageContent: <img loading="lazy" src="/sva-cartzilla-cover.png" alt="Social View Agency" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
  },
  {
    slug: 'hr-block',
    tag: 'Data Analyst · Performance',
    title: 'H&R Block',
    description: 'Wrote BigQuery + SQL to extract campaign and user behavior data at scale, and ran statistical A/B tests on email and landing pages that cut cost-per-acquisition 22% and lifted conversion 68% YoY.',
    bgColor: '#0a3d2e',
    accentColor: '#5ec8a0',
    imageContent: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: 44, fontWeight: 700, color: 'rgba(255,255,255,0.14)', letterSpacing: '-0.04em' }}>H&amp;R BLOCK</div>
  },
  {
    slug: 'agsm',
    tag: 'Leadership · Marketing & PR',
    title: 'AGSM Student Association',
    description: 'As Director of Marketing & Public Relations, rebuilt the content strategy across social, email, and PR to grow engagement and event turnout 40%, leading a team of 10+ with a unified brand identity.',
    bgColor: '#1e2a5e',
    accentColor: '#7ecaef',
    imageContent: <img loading="lazy" src="/agsm-cover.png" alt="AGSM" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
  },
  {
    slug: 'liquid-death',
    tag: 'Consumer Insights · Academic',
    title: 'Liquid Death',
    description: 'Analyzed 300+ consumer responses to develop data-driven brand positioning and messaging strategy targeting younger segments.',
    bgColor: '#2d0606',
    accentColor: '#e05050',
    imageContent: <img loading="lazy" src="/liquid-death-cover.webp" alt="Liquid Death" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
  },
  {
    slug: 'quay-australia',
    tag: 'Integrated Marketing · Academic',
    title: 'Quay Australia',
    description: 'Full Gen Z go-to-market playbook: channel strategy, influencer partnerships, audience segmentation, and measurable KPIs.',
    bgColor: '#0d1230',
    accentColor: '#7ecaef',
    imageContent: <img loading="lazy" src="/quay-cover.jpg" alt="Quay Australia" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
  }];


  return (
    <section id="work" style={{ padding: isMobile ? '60px 20px' : '80px 48px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div className="reveal">
        <SectionHeading
          label="Selected Work"
          title="Data-driven marketing work."
          subtitle="Roles where I turned analytics into measurable growth. Click any project for the full story." />
        
      </div>
      <div className="work-grid">
        {projects.map((p, i) =>
        <div key={p.slug} className="reveal" style={{ transitionDelay: `${i * 80}ms`, flex: p.featured ? '1 1 100%' : '1 1 calc(50% - 10px)', minWidth: p.featured ? 'unset' : 280 }}>
            <CaseStudyCard
            tag={p.tag}
            title={p.title}
            description={p.description}
            bgColor={p.bgColor}
            accentColor={p.accentColor}
            featured={p.featured}
            imageContent={p.imageContent}
            onClick={() => onNavigate('case-study/' + p.slug)} />
          
          </div>
        )}
      </div>
    </section>);

};

// ── Side Quests section ───────────────────────────────────
const SideQuestsSection = () =>
<div id="side-quests" className="side-quests-section">
    <div className="side-quests-inner">

      {/* Left: intro text */}
      <div style={{ flexShrink: 0, maxWidth: 400 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a6400', marginBottom: 14
        }}>Products I've Built</div>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 38, fontWeight: 700, color: '#1a1410',
          letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16
        }}>Real apps,<br />shipped and live.</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 16,
          color: '#6b5c52', lineHeight: 1.75, marginBottom: 0
        }}>
          Beyond campaigns, I design and build full products end to end. These are live,
          usable apps I shipped myself, from concept to code.
        </p>
      </div>

      {/* Right: project cards */}
      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 20 }}>

        {/* THE GROVE */}
        <div style={{
          flex: '1 1 300px', background: 'white',
          border: '2.5px solid #111', borderRadius: 16,
          overflow: 'hidden', boxShadow: '4px 4px 0 #111',
        }}>
          {/* Visual header: Grove cover */}
          <div style={{
            height: 140, position: 'relative', overflow: 'hidden',
            background: '#0a1a0c', borderBottom: '2.5px solid #111',
          }}>
            <img loading="lazy" src="/grove-cover.png" alt="THE GROVE"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>

          {/* Content */}
          <div style={{ padding: '18px 20px 20px' }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#2f7d4f', marginBottom: 8,
            }}>Startup · Co-Founder & Builder</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700,
              color: '#1a1410', letterSpacing: '-0.025em', marginBottom: 8,
            }}>THE GROVE</div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              color: '#6b5c52', lineHeight: 1.65, marginBottom: 14,
            }}>
              An AI data platform for entertainment, gaming, and live events. I co-founded it and designed and built the full product myself, from an AI asset pipeline to an encrypted transfer layer. YC applicant.
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {['React', 'Gemini 2.5 Flash', 'AES-256', 'Google AI SDK'].map(t => (
                <span key={t} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
                  color: '#4a3e36', background: '#f0ece8',
                  padding: '4px 10px', borderRadius: 20,
                  border: '1.5px solid #e4dfdc',
                }}>{t}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://thegrove.cloud" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
                color: 'white', background: '#1a4d2e',
                padding: '9px 18px', borderRadius: 8,
                border: '2px solid #111', boxShadow: '3px 3px 0 #111',
                textDecoration: 'none',
              }}>Live Site ↗</a>
            </div>
          </div>
        </div>

        {/* Instagram Unfollowers */}
        <div style={{
          flex: '1 1 300px', background: 'white',
          border: '2.5px solid #111', borderRadius: 16,
          overflow: 'hidden', boxShadow: '4px 4px 0 #111',
        }}>
          {/* Visual header: Instagram gradient */}
          <div style={{
            height: 140,
            background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
            </svg>
          </div>

          {/* Content */}
          <div style={{ padding: '18px 20px 20px' }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#833ab4', marginBottom: 8,
            }}>Personal Project · Web App</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700,
              color: '#1a1410', letterSpacing: '-0.025em', marginBottom: 8,
            }}>Instagram Unfollowers</div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              color: '#6b5c52', lineHeight: 1.65, marginBottom: 14,
            }}>
              Find out who doesn't follow you back, no login required. Upload your Instagram data export and get instant, private results.
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS'].map(t => (
                <span key={t} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
                  color: '#4a3e36', background: '#f0ece8',
                  padding: '4px 10px', borderRadius: 20,
                  border: '1.5px solid #e4dfdc',
                }}>{t}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://instagram-unfollowers-seven.vercel.app" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
                color: 'white', background: '#833ab4',
                padding: '9px 18px', borderRadius: 8,
                border: '2px solid #111', boxShadow: '3px 3px 0 #111',
                textDecoration: 'none',
              }}>Live Site ↗</a>
              <a href="https://github.com/ashlacap/instagram-unfollowers" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
                color: '#1a1410', background: 'white',
                padding: '9px 18px', borderRadius: 8,
                border: '2px solid #111', boxShadow: '3px 3px 0 #111',
                textDecoration: 'none',
              }}>GitHub ↗</a>
            </div>
          </div>
        </div>

        {/* Ashtronomical */}
        <div style={{
          flex: '1 1 300px', background: 'white',
          border: '2.5px solid #111', borderRadius: 16,
          overflow: 'hidden', boxShadow: '4px 4px 0 #111',
        }}>
          {/* Visual header: space theme */}
          <div style={{
            height: 140,
            background: 'linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 60%, #0d0d0d 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Stars */}
            {[[15,20],[40,60],[70,25],[85,70],[25,80],[60,45],[90,15],[50,85]].map(([x,y], i) => (
              <div key={i} style={{
                position: 'absolute', left: `${x}%`, top: `${y}%`,
                width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
                borderRadius: '50%', background: 'white', opacity: 0.6,
              }} />
            ))}
            {/* Saturn-like icon */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="14" fill="#333" opacity="0.9"/>
              <ellipse cx="28" cy="28" rx="24" ry="7" stroke="white" strokeWidth="1.8" fill="none" opacity="0.5"/>
              <circle cx="28" cy="28" r="14" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>

          {/* Content */}
          <div style={{ padding: '18px 20px 20px' }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#1a1410', marginBottom: 8,
            }}>Personal Project · FinTech App</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700,
              color: '#1a1410', letterSpacing: '-0.025em', marginBottom: 4,
            }}>Ashtronomical</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              color: '#8c7a70', marginBottom: 10, fontStyle: 'italic',
            }}>Your financial universe, mapped.</div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              color: '#6b5c52', lineHeight: 1.65, marginBottom: 14,
            }}>
              A space-themed personal finance app that connects to your bank via Plaid for automatic transaction imports, shared household budgets, savings goal pacing, and spending insights.
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {['React', 'Plaid API', 'Node.js', 'Tailwind CSS'].map(t => (
                <span key={t} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
                  color: '#4a3e36', background: '#f0ece8',
                  padding: '4px 10px', borderRadius: 20,
                  border: '1.5px solid #e4dfdc',
                }}>{t}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://ashtronomical.vercel.app" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
                color: 'white', background: '#111',
                padding: '9px 18px', borderRadius: 8,
                border: '2px solid #111', boxShadow: '3px 3px 0 #555',
                textDecoration: 'none',
              }}>Live Site ↗</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>;


// ── Graphic Design section ────────────────────────────────
const GraphicDesignSection = () => {
  const isMobile = useWindowWidth() < 768;
  const [openProject, setOpenProject] = useState(null); // project index, or null
  const [slide, setSlide] = useState(0);                 // slide index within open project

  const projects = [
    {
      title: 'Mission: Paramount',
      category: 'Case Competition Deck',
      blurb: 'A 12-slide transmedia strategy deck for a graduate case competition, covering the full visual system, data viz, and a spy-thriller narrative concept.',
      aspect: '16 / 9',
      slides: [
        '/design-pulse-01.jpg', '/design-pulse-02.jpg', '/design-pulse-03.jpg',
        '/design-pulse-04.jpg', '/design-pulse-05.jpg', '/design-pulse-06.jpg',
        '/design-pulse-07.jpg', '/design-pulse-08.jpg', '/design-pulse-09.jpg',
        '/design-pulse-10.jpg', '/design-pulse-11.jpg', '/design-pulse-12.jpg',
      ],
    },
    {
      title: 'Student Association Merch',
      category: 'Apparel Graphic',
      blurb: 'Y2K-inspired promo graphic for the AGSM Student Association’s Fall 2025 merch drop.',
      aspect: '4 / 5',
      coverPosition: 'center',
      slides: ['/design-merch-sa-fall25.jpg'],
    },
    {
      title: 'Gaming Stream Pack',
      category: 'Twitch Overlays',
      blurb: 'Bold red-and-black overlay set: Starting Soon, Stream Offline, and Be Right Back.',
      aspect: '16 / 9',
      slides: ['/design-ss-gaming.jpg', '/design-offline-gaming.jpg', '/design-brb-gaming.jpg'],
    },
    {
      title: 'Minimal Mono Pack',
      category: 'Twitch Overlays',
      blurb: 'Clean monochrome overlays with a stream schedule and most-recent-TikTok frame.',
      aspect: '16 / 9',
      slides: ['/design-ss-minimal.jpg', '/design-offline-minimal.jpg', '/design-brb-minimal.jpg'],
    },
    {
      title: 'Pastel Cloud Pack',
      category: 'Twitch Overlays',
      blurb: 'Soft, cozy pastel overlay set with hand-drawn clouds and kawaii accents.',
      aspect: '16 / 9',
      slides: ['/design-ss-cute.jpg', '/design-offline-cute.jpg', '/design-brb-cute.jpg'],
    },
  ];

  const active = openProject !== null ? projects[openProject] : null;

  const open = (i) => { setOpenProject(i); setSlide(0); };
  const close = () => setOpenProject(null);
  const next = () => setSlide(s => (s + 1) % active.slides.length);
  const prev = () => setSlide(s => (s - 1 + active.slides.length) % active.slides.length);

  // Lock body scroll while lightbox is open + Esc / arrow keys
  useEffect(() => {
    if (openProject === null) return;
    const len = projects[openProject].slides.length;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenProject(null);
      if (e.key === 'ArrowRight') setSlide(s => (s + 1) % len);
      if (e.key === 'ArrowLeft') setSlide(s => (s - 1 + len) % len);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [openProject]);

  return (
    <section id="graphic-design" style={{
      background: '#faf8f7', borderBottom: '2.5px solid #111',
      padding: isMobile ? '56px 20px' : '80px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d42020', marginBottom: 14,
        }}>Graphic Design</div>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: isMobile ? 28 : 38, fontWeight: 700, color: '#1a1410',
          letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16,
        }}>Designs I've made.</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 16,
          color: '#6b5c52', lineHeight: 1.7, marginBottom: isMobile ? 32 : 44, maxWidth: 580,
        }}>
          Decks, apparel graphics, and stream overlay packs I've designed end to end. Tap any
          project to flip through the full set.
        </p>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 16 : 20,
        }}>
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => open(i)}
              style={{
                display: 'block', padding: 0, cursor: 'pointer',
                background: '#111', border: '2.5px solid #111', borderRadius: 14,
                overflow: 'hidden', boxShadow: '4px 4px 0 #111',
                transition: 'box-shadow 180ms cubic-bezier(0.22,1,0.36,1), transform 180ms cubic-bezier(0.22,1,0.36,1)',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '7px 7px 0 #111'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '4px 4px 0 #111'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  loading="lazy"
                  src={p.slides[0]}
                  alt={p.title}
                  style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', objectPosition: p.coverPosition || 'center', display: 'block' }}
                />
                {/* Slide-count badge */}
                {p.slides.length > 1 && (
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: 'rgba(17,17,17,0.85)', backdropFilter: 'blur(4px)',
                    border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 20,
                    padding: '4px 10px',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: 'white',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                      <rect x="3" y="3" width="14" height="14" rx="2" />
                      <path d="M7 21h12a2 2 0 0 0 2-2V7" />
                    </svg>
                    {p.slides.length}
                  </div>
                )}
              </div>
              {/* Caption strip */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                padding: '10px 14px', background: 'white', borderTop: '2.5px solid #111', textAlign: 'left',
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#1a1410',
                }}>{p.title}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.04em', textTransform: 'uppercase', color: '#8c7a70', whiteSpace: 'nowrap',
                }}>{p.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 600,
            background: 'rgba(14,18,48,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? 16 : 48, animation: 'fadeIn 180ms ease both',
          }}
        >
          {/* Close */}
          <button onClick={(e) => { e.stopPropagation(); close(); }} style={{
            position: 'absolute', top: isMobile ? 12 : 24, right: isMobile ? 12 : 24,
            width: 44, height: 44, borderRadius: 10,
            background: 'white', border: '2.5px solid #111', boxShadow: '3px 3px 0 #111',
            cursor: 'pointer', fontSize: 22, lineHeight: 1, color: '#1a1410',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
          }}>×</button>

          {/* Prev (only when multi-slide) */}
          {active.slides.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
              position: 'absolute', left: isMobile ? 8 : 24, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'white', border: '2.5px solid #111', boxShadow: '3px 3px 0 #111',
              cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
            }}>←</button>
          )}

          {/* Image + caption */}
          <div onClick={(e) => e.stopPropagation()} style={{
            maxWidth: 1040, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <img
              src={active.slides[slide]}
              alt={`${active.title}, slide ${slide + 1}`}
              style={{
                width: 'auto', maxWidth: '100%', maxHeight: isMobile ? '72vh' : '78vh', objectFit: 'contain',
                border: '2.5px solid #111', borderRadius: 14, boxShadow: '6px 6px 0 #111',
                background: '#111', display: 'block',
              }}
            />
            <div style={{
              marginTop: 16, textAlign: 'center',
              fontFamily: "'DM Sans', sans-serif", color: 'white',
            }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{active.title}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginLeft: 10 }}>
                {active.category}{active.slides.length > 1 ? ` · ${slide + 1} / ${active.slides.length}` : ''}
              </span>
            </div>
          </div>

          {/* Next (only when multi-slide) */}
          {active.slides.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
              position: 'absolute', right: isMobile ? 8 : 24, top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              background: 'white', border: '2.5px solid #111', boxShadow: '3px 3px 0 #111',
              cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
            }}>→</button>
          )}
        </div>
      )}
    </section>
  );
};


// ── Results snapshot band ─────────────────────────────────
const ResultsBand = () => {
  const isMobile = useWindowWidth() < 768;
  const stats = [
    { metric: '+18%', label: 'YoY ARPU growth', sub: 'VALOBANNERS' },
    { metric: '+13%', label: 'User conversion (A/B)', sub: 'Social View Agency' },
    { metric: '−22%', label: 'Cost-per-acquisition', sub: 'H&R Block' },
    { metric: '+68%', label: 'YoY conversion rate', sub: 'H&R Block' },
    { metric: '27+', label: 'KPIs tracked in dashboards', sub: 'Across roles' },
  ];
  return (
    <section style={{
      background: '#1e2a5e', borderTop: '2.5px solid #111', borderBottom: '2.5px solid #111',
      padding: isMobile ? '40px 20px' : '52px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ffd024',
          marginBottom: isMobile ? 24 : 32, textAlign: isMobile ? 'center' : 'left',
        }}>Results at a glance</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
          gap: isMobile ? 24 : 20,
        }}>
          {stats.map((s) => (
            <div key={s.metric + s.label} style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? 34 : 44, fontWeight: 700, color: 'white',
                letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8,
              }}>{s.metric}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                color: '#c3ccf0', lineHeight: 1.4, marginBottom: 4,
              }}>{s.label}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7385cc',
              }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Video highlight (curated, inline) ─────────────────────
const VideoHighlight = ({ onNavigate }) => {
  const isMobile = useWindowWidth() < 768;
  // Curated cross-section: esports flagship, agency client, leadership reel
  const clips = [
    { src: '/flyquest-fly-vs-sen-edit.mp4', label: 'FlyQuest · FLY vs SEN', tag: 'Esports' },
    { src: '/CartZilla%201.mp4', label: 'CartZilla Reel', tag: 'Agency · SVA' },
    { src: '/Student%20Association%20Reel%201.mp4', label: 'Student Association Reel', tag: 'Leadership · AGSM' },
  ];
  return (
    <section id="video-edits" style={{ padding: isMobile ? '60px 20px' : '80px 48px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d42020', marginBottom: 14,
      }}>Video Editing</div>
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end',
        gap: 16, marginBottom: isMobile ? 28 : 36,
      }}>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: isMobile ? 28 : 38, fontWeight: 700, color: '#1a1410',
          letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 560,
        }}>Short-form content that performs.</h2>
        <button onClick={() => onNavigate('video-edits')} style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
          color: '#1e2a5e', background: 'white',
          padding: '10px 20px', borderRadius: 8,
          border: '2.5px solid #111', boxShadow: '3px 3px 0 #111',
          cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'box-shadow 120ms, transform 120ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '5px 5px 0 #111'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '3px 3px 0 #111'; e.currentTarget.style.transform = 'translateY(0)'; }}>
          View all edits →
        </button>
      </div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: isMobile ? 16 : 24,
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}>
        {clips.map((c) => (
          <div key={c.src} style={{ width: isMobile ? '76%' : 260 }}>
            <VideoCard src={c.src} label={c.label} accent="#ffd024" style={{ width: '100%', aspectRatio: '9 / 16' }} />
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8c7a70',
              marginTop: 10, textAlign: isMobile ? 'center' : 'left',
            }}>{c.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Contact section ───────────────────────────────────────
const ContactSection = ({ onContact }) =>
<div id="contact" className="contact-section">
    <img src="/headshot-animated.png" alt="Ash Lacap"
  style={{
    width: 96, height: 96, borderRadius: '50%',
    border: '3px solid #ffd024', objectFit: 'cover',
    marginBottom: 28, boxShadow: '0 0 0 3px #111'
  }} />
    <h2 style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: 'white',
    letterSpacing: '-0.03em', marginBottom: 16
  }}>Let's make something great.</h2>
    <p style={{
    fontFamily: "'DM Sans', sans-serif", fontSize: 16,
    color: '#8a99d8', maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.7
  }}>
      Have a project in mind? Or just want to talk marketing?
      I'm always up for a good conversation.
    </p>
    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
      <button
      onClick={onContact}
      style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
        padding: '13px 32px', borderRadius: 8,
        background: '#d42020', color: 'white',
        border: '2.5px solid #ffd024', boxShadow: '4px 4px 0 #ffd024',
        cursor: 'pointer', transition: 'box-shadow 120ms, transform 120ms'
      }}
      onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '6px 6px 0 #ffd024';e.currentTarget.style.transform = 'translateY(-2px)';}}
      onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '4px 4px 0 #ffd024';e.currentTarget.style.transform = 'translateY(0)';}}>
        Get In Touch →
      </button>
      <a href="https://www.linkedin.com/in/ash-lacap/" target="_blank" rel="noopener noreferrer"
    style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600,
      padding: '13px 32px', borderRadius: 8,
      background: 'transparent', color: 'white',
      border: '2.5px solid rgba(255,255,255,0.3)',
      cursor: 'pointer', textDecoration: 'none',
      transition: 'border-color 150ms'
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'white'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}>
        LinkedIn →
      </a>
    </div>
  </div>;


// ── Contact Modal ─────────────────────────────────────────
const ContactModal = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(onClose, 2000);
  };

  return (
    <div className="modal-overlay" onClick={(e) => {if (e.target === e.currentTarget) onClose();}}>
      <div className="modal-card">
        {sent ?
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
            <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, color: '#1a1410', marginBottom: 8 }}>Message sent!</h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#8c7a70' }}>I'll be in touch soon.</p>
          </div> :

        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 24, fontWeight: 700, color: '#1a1410', marginBottom: 4 }}>Let's Connect</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#8c7a70' }}>Drop me a message! I'll get back to you.</p>
              </div>
              <button onClick={onClose} style={{
              background: '#f5f2f0', border: '2px solid #e4dfdc', borderRadius: 8,
              width: 36, height: 36, cursor: 'pointer', fontSize: 18, color: '#6b5c52',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>×</button>
            </div>
            <form onSubmit={submit}>
              <div className="form-field">
                <label className="form-label">Name</label>
                <input className="form-input" type="text" placeholder="Your name" required
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="you@example.com" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea className="form-input" placeholder="What do you want to chat about?" required
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" style={{
              width: '100%', padding: '13px', borderRadius: 8,
              background: '#1e2a5e', color: 'white', border: '2.5px solid #111',
              boxShadow: '4px 4px 0 #111', fontFamily: "'DM Sans',sans-serif",
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              transition: 'box-shadow 120ms, transform 120ms'
            }}
            onMouseEnter={(e) => {e.currentTarget.style.boxShadow = '6px 6px 0 #111';e.currentTarget.style.transform = 'translateY(-2px)';}}
            onMouseLeave={(e) => {e.currentTarget.style.boxShadow = '4px 4px 0 #111';e.currentTarget.style.transform = 'translateY(0)';}}>
                Send Message →
              </button>
            </form>
          </>
        }
      </div>
    </div>);

};

// ── Resume Page ───────────────────────────────────────────
const ResumeSection = ({ title, children }) =>
<div style={{ marginBottom: 48 }}>
    <div style={{
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20
  }}>
      <div style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d42020'
    }}>{title}</div>
      <div style={{ flex: 1, height: 2, background: '#e4dfdc', borderRadius: 2 }} />
    </div>
    {children}
  </div>;


const ResumeEntry = ({ org, role, period, bullets }) => {
  const isMobile = useWindowWidth() < 768;
  return (
<div style={{ marginBottom: 28 }}>
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: isMobile ? 4 : 0 }}>
      <div>
        <div style={{

        fontSize: 17, fontWeight: 700, color: '#1a1410', marginBottom: 2, fontFamily: "\"DM Sans\""
      }}>{org}</div>
        <div style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 13,
        color: '#d42020', fontWeight: 600
      }}>{role}</div>
      </div>
      <div style={{
      fontFamily: "'DM Sans',sans-serif", fontSize: 12,
      color: '#8c7a70', marginTop: isMobile ? 0 : 3,
    }}>{period}</div>
    </div>
    {bullets &&
  <ul style={{ margin: '10px 0 0 0', paddingLeft: 18 }}>
        {bullets.map((b, i) =>
    <li key={i} style={{
      fontFamily: "'DM Sans',sans-serif", fontSize: 14,
      color: '#4a3e36', lineHeight: 1.7, marginBottom: 4
    }}>{b}</li>
    )}
      </ul>
  }
  </div>
  );
};


const ResumePage = () => {
  const isMobile = useWindowWidth() < 768;
  return (
<section style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '60px 20px 60px' : '60px 48px 80px' }}>
    {/* Header */}
    <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 48, paddingBottom: 32, borderBottom: '2.5px solid #111'
  }}>
      <div>
        <h1 style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: isMobile ? 38 : 52, fontWeight: 700, color: '#1a1410',
        letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8
      }}>Ash Lacap</h1>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#6b5c52', fontStyle: 'italic', marginBottom: 16 }}>(she/her)</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
        { label: 'ashleynlacap@gmail.com', href: 'mailto:ashleynlacap@gmail.com' },
        { label: 'linkedin.com/in/ash-lacap', href: 'https://www.linkedin.com/in/ash-lacap/' },
        { label: 'ashlacap.com', href: 'https://ashlacap.com' },
        { label: 'Greater Los Angeles, CA', href: null }].
        map(({ label, href }) =>
        href ?
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#1e2a5e', textDecoration: 'none', borderBottom: '1px solid #b8c2ea' }}>{label}</a> :
        <span key={label} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#8c7a70' }}>{label}</span>
        )}
        </div>
      </div>
    </div>

    {/* Summary */}
    <div style={{ marginBottom: 48 }}>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#4a3e36', lineHeight: 1.8 }}>
        Marketing associate with 4+ years of hands-on experience planning and executing integrated campaigns across social, content, influencer, and email channels for consumer-facing brands. Comfortable working with performance data to monitor results, adjust plans, and report findings to stakeholders. Strong cross-functional collaborator with experience managing timelines across multiple concurrent projects. MBA candidate at UC Riverside concentrating in Marketing and Business Analytics.
      </p>
    </div>

    {/* Core Competencies */}
    <ResumeSection title="Core Competencies">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {[
      'Integrated Marketing Campaigns', 'Omnichannel Execution', 'Campaign Planning',
      'Consumer Insights', 'Performance Analytics', 'KPI Tracking',
      'Cross-Functional Collaboration', 'Social Media Marketing', 'Influencer Marketing',
      'Email & Content Strategy', 'Stakeholder Communication', 'Brand Messaging'].
      map((c) =>
      <span key={c} style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500,
        color: '#1e2a5e', background: '#e0e4f5',
        padding: '6px 14px', borderRadius: 20, border: '1.5px solid #b8c2ea'
      }}>{c}</span>
      )}
      </div>
    </ResumeSection>

    {/* Experience */}
    <ResumeSection title="Experience">
      <ResumeEntry
      org="VALOBANNERS"
      role="Brand Marketing Associate · Remote"
      period="Dec 2020 – Dec 2023"
      bullets={[
      "Developed and executed integrated campaigns across social, influencer, and community channels, defining target audiences, messaging frameworks, and KPIs, then monitoring daily performance via TikTok Analytics and Meta Business Suite to drive a 25% increase in monthly sales.",
      "Managed influencer partnerships end to end: coordinating outreach, briefing creators, tracking deliverables, and producing performance reports across multiple concurrent campaigns.",
      "Grew brand audience by 103% and engagement by 58% through audience-informed campaign planning, creative iteration, and cross-platform execution across TikTok, Instagram, and Discord.",
      "Analyzed content performance weekly to identify top-performing formats and inform future creative direction, consistently improving click-through and save rates.",
      "Collaborated with the product team to align campaign messaging with new drops and seasonal releases, ensuring consistency across all touchpoints."]
      } />
    
      <ResumeEntry
      org="Social View Agency"
      role="Social Media Intern · Remote"
      period="Aug 2025 – Nov 2025"
      bullets={[
      "Supported integrated campaign execution across multiple client accounts in a fast-paced agency environment, managing content assets and adapting messaging to each brand's channel mix.",
      "Tracked campaign KPIs across clients using Meta Business Suite and platform-native analytics tools, surfacing weekly insights to account managers.",
      "Assisted in building content calendars, writing captions, and coordinating asset delivery between creative and client teams on tight turnarounds.",
      "Contributed to client strategy decks by compiling competitive research and social listening findings."]
      } />
    
      <ResumeEntry
      org="H&R Block"
      role="Social Media Strategist (Contract) · Remote"
      period="Oct 2022 – Apr 2023"
      bullets={[
      "Planned and managed on-brand content across social channels during peak tax season, developing a content cadence that balanced educational, promotional, and community-driven posts.",
      "Monitored performance data daily and refined posting frequency and content mix to improve reach and audience engagement over the campaign window.",
      "Ensured brand voice consistency across all published content in alignment with H&R Block's national guidelines."]
      } />
    
    </ResumeSection>

    {/* Ventures */}
    <ResumeSection title="Ventures">
      <ResumeEntry
      org="THE GROVE"
      role="Co-Founder & Head of Data Infrastructure · Sole App Designer & Builder"
      period="Apr 2026 – Present"
      bullets={[
      "Co-founded an encrypted AI data pipeline for entertainment, gaming, and live events organizations with Maya Cohen, serving as the sole app designer and builder from day one.",
      "Designed and built the full product in React, integrating Google Gemini 2.5 Flash to power predictive asset generation with a confidence scoring engine that tells users exactly how production-ready their output is.",
      "Built a flexible ingestion layer accepting any file type (USD, FBX, audio stems, PDFs, CSVs) and cloud storage connections (OneDrive, SharePoint, Google Drive) with no reformatting required.",
      "Architected AES-256 encrypted asset transfer with provenance tracking, granular access control, and tamper-evident audit trails for secure inter-organizational collaboration.",
      "Developing YC application strategy targeting enterprise pilots at AEG, Riot Games, Tixr, FlyQuest, and XSolla."
      ]} />
    </ResumeSection>

    {/* Leadership */}
    <ResumeSection title="Leadership">
      <ResumeEntry
      org="UCR AGSM Student Association"
      role="Director of PR and Marketing · Riverside, CA"
      period="May 2025 – June 2026"
      bullets={[
      "Lead integrated marketing campaigns across email, social, and campus channels to promote graduate school events and programming.",
      "Present campaign strategy and post-event results to faculty leadership on a recurring basis, demonstrating impact through data.",
      "Increased event turnout by 40% through targeted outreach, improved messaging, and more strategic channel selection.",
      "Manage a small team of student volunteers, delegating tasks, reviewing content, and maintaining brand consistency across all outputs."]
      } />
    
    </ResumeSection>

    {/* Projects */}
    <ResumeSection title="Projects">
      <ResumeEntry org="Liquid Death" role="Consumer Insights & Brand Positioning" period="Jan – Mar 2025"
    bullets={[
    "Analyzed 300+ consumer survey responses to identify audience trends, brand perception gaps, and purchase intent signals across demographic segments.",
    "Developed data-driven brand positioning recommendations and a messaging strategy targeting younger consumer segments, grounded in competitive landscape analysis.",
    "Presented findings and strategic recommendations to faculty with supporting data visualizations built in Tableau and Google Slides."]
    } />
      <ResumeEntry org="Quay Australia" role="Gen Z Integrated Marketing Playbook" period="Jan – May 2022"
    bullets={[
    "Conducted primary market research and social listening to map Gen Z behavior, platform preferences, and purchase decision patterns.",
    "Built a full go-to-market playbook covering channel strategy, influencer partnership framework, audience segmentation, and a measurable KPI model.",
    "Delivered the playbook as a client-facing presentation, receiving strong feedback on strategic clarity and research depth."]
    } />
    </ResumeSection>

    {/* Education */}
    <ResumeSection title="Education">
      <ResumeEntry org="UC Riverside A. Gary Anderson Graduate School of Management" role="MBA, Marketing & Business Analytics" period="2026"
    bullets={["Concentrating in Marketing and Business Analytics. Active member of the AGSM Student Association, currently serving as Director of PR and Marketing."]} />
      <ResumeEntry org="California State University, Northridge" role="BS, Marketing" period="2022"
    bullets={["Bachelor of Science in Marketing. Built foundational knowledge in consumer behavior, brand strategy, and integrated marketing communications."]} />
    </ResumeSection>

    {/* Skills */}
    <ResumeSection title="Skills">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
      { cat: 'Marketing', items: 'Integrated Campaigns · Influencer Marketing · Email Marketing · Social Media Strategy · Content Planning · Brand Messaging · Omnichannel Execution' },
      { cat: 'Partnerships', items: 'Influencer & Creator Partnerships · Partner Outreach · Brand Collaborations · Sponsorship Strategy · Creator Briefing · Deliverables Management · Contract & Rate Negotiation · Co-Marketing · Partner Reporting · Relationship Management' },
      { cat: 'Analytics', items: 'Meta Business Suite · TikTok Analytics · Google Analytics · Tableau · Excel · Google Sheets · KPI Tracking · Performance Reporting' },
      { cat: 'Tools', items: 'Canva · Adobe Premiere Pro · Photoshop · Notion · Asana · Slack · PowerPoint · Google Slides · CapCut' },
      { cat: 'Platforms', items: 'TikTok · Instagram · YouTube · LinkedIn · Twitter/X · Reddit · Discord' }].
      map(({ cat, items }) =>
      <div key={cat} style={{ display: 'flex', gap: 16, paddingBottom: 16, borderBottom: '1px solid #f5f2f0' }}>
            <div style={{ width: 110, flexShrink: 0, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: '#1e2a5e', paddingTop: 2 }}>{cat}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#4a3e36', lineHeight: 1.7 }}>{items}</div>
          </div>
      )}
      </div>
    </ResumeSection>
  </section>
  );
};


// ── Tweaks ────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#d42020",
  "navStyle": "bordered",
  "showAvatar": true,
  "heroGreeting": "Nice to meet you!"
}/*EDITMODE-END*/;

// ── Main App ──────────────────────────────────────────────
const App = () => {
  const [page, setPage] = useState(() => {
    return localStorage.getItem('ash-portfolio-page') || 'home';
  });
  const [activeSection, setActiveSection] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    if (page !== 'home') { setActiveSection(null); return; }
    const sections = ['work', 'side-quests', 'graphic-design', 'video-edits'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs && obs.disconnect());
  }, [page]);

  useEffect(() => {
    localStorage.setItem('ash-portfolio-page', page);
    window.scrollTo({ top: 0 });
  }, [page]);

  const scrollSections = ['work', 'side-quests', 'graphic-design', 'video-edits', 'contact'];

  const handleNavigate = (target) => {
    if (target === 'contact-modal') { setShowContact(true); return; }
    if (scrollSections.includes(target)) {
      const scrollTo = () => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };
      if (page === 'home') {
        scrollTo();
      } else {
        setPage('home');
        setTimeout(scrollTo, 100);
      }
      return;
    }
    setPage(target);
  };

  const renderBody = () => {
    if (page.startsWith('case-study/')) {
      const slug = page.replace('case-study/', '');
      return <CaseStudyDetail slug={slug} onBack={() => handleNavigate('work')} />;
    }
    switch (page) {
      case 'about':
        return (
          <>
            <div style={{ paddingTop: 64 }}>
              <AboutSection />
            </div>
            <ContactSection onContact={() => setShowContact(true)} />
          </>);

      case 'video-edits':
        return (
          <>
            <div style={{ paddingTop: 64 }}>
              <VideoEditsPage />
            </div>
            <ContactSection onContact={() => setShowContact(true)} />
          </>);

      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} tweaks={tweaks} />
            <ResultsBand />
            <WorkSection onNavigate={handleNavigate} tweaks={tweaks} />
            <SideQuestsSection />
            <GraphicDesignSection />
            <VideoHighlight onNavigate={handleNavigate} />
            <ContactSection onContact={() => setShowContact(true)} />
          </>);

    }
  };

  return (
    <>
      <Nav activePage={page} activeSection={activeSection} onNavigate={handleNavigate} />
      <main style={{ flex: 1, color: "rgb(37, 38, 46)" }}>
        {renderBody()}
      </main>
      <Footer onNavigate={handleNavigate} />
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      <TweaksPanel>
        <TweakSection label="Colors" />
        <TweakColor label="Accent color" value={tweaks.accentColor} onChange={(v) => setTweak('accentColor', v)} />
        <TweakSection label="Hero" />
        <TweakToggle label="Show avatar" value={tweaks.showAvatar} onChange={(v) => setTweak('showAvatar', v)} />
        <TweakText label="Speech bubble" value={tweaks.heroGreeting} onChange={(v) => setTweak('heroGreeting', v)} />
        <TweakSection label="Navigation" />
        <TweakRadio label="Nav style" value={tweaks.navStyle} options={["bordered", "minimal"]} onChange={(v) => setTweak('navStyle', v)} />
      </TweaksPanel>
    </>);

};

export default App