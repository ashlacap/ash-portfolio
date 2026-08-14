// Case Study Detail pages full content for each project
// ── Image Carousel ────────────────────────────────────────
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

const ImageCarousel = ({ title, subtitle, slides }) => {
  const [current, setCurrent] = React.useState(0);
  const [loaded, setLoaded] = React.useState({});
  const isMobile = useWindowWidth() < 768;

  // Preload all images on mount
  React.useEffect(() => {
    slides.forEach((src, i) => {
      const img = new Image();
      img.onload = () => setLoaded(prev => ({ ...prev, [i]: true }));
      img.src = src;
    });
  }, []);

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent(i => (i + 1) % slides.length);

  return (
    <div style={{ marginTop: 56 }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "#d42020", marginBottom: 8,
      }}>Creator Work</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700,
        color: "#1a1410", marginBottom: 8,
      }}>{title}</div>
      {subtitle && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          color: "#6b5c52", lineHeight: 1.7, marginBottom: 20, maxWidth: 600,
        }}>{subtitle}</p>
      )}

      {/* Carousel container: fixed height, crossfade */}
      <div style={{ position: "relative" }}>
        <div style={{
          border: "2.5px solid #111", borderRadius: 16,
          overflow: "hidden", boxShadow: "4px 4px 0 #111",
          background: "#111",
          position: "relative",
          aspectRatio: "16/9",
        }}>
          {slides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Slide ${i + 1}`}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "contain",
                opacity: i === current ? 1 : 0,
                transition: "opacity 350ms ease",
                pointerEvents: i === current ? "auto" : "none",
              }}
            />
          ))}
        </div>

        {/* Prev button */}
        <button onClick={prev} style={{
          position: "absolute", left: isMobile ? 8 : -20, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%",
          background: "white", border: "2.5px solid #111", boxShadow: "3px 3px 0 #111",
          cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "box-shadow 120ms, transform 120ms", zIndex: 2,
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "5px 5px 0 #111"; e.currentTarget.style.transform = "translateY(calc(-50% - 2px))"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "3px 3px 0 #111"; e.currentTarget.style.transform = "translateY(-50%)"; }}>
          ←
        </button>

        {/* Next button */}
        <button onClick={next} style={{
          position: "absolute", right: isMobile ? 8 : -20, top: "50%", transform: "translateY(-50%)",
          width: 44, height: 44, borderRadius: "50%",
          background: "white", border: "2.5px solid #111", boxShadow: "3px 3px 0 #111",
          cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
          transition: "box-shadow 120ms, transform 120ms", zIndex: 2,
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "5px 5px 0 #111"; e.currentTarget.style.transform = "translateY(calc(-50% - 2px))"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "3px 3px 0 #111"; e.currentTarget.style.transform = "translateY(-50%)"; }}>
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 24 : 8, height: 8,
            borderRadius: 4, border: "none", cursor: "pointer", padding: 0,
            background: i === current ? "#1e2a5e" : "#cec6c0",
            transition: "width 200ms, background 200ms",
          }} />
        ))}
      </div>

      {/* Counter */}
      <div style={{
        textAlign: "center", marginTop: 10,
        fontFamily: "'DM Sans', sans-serif", fontSize: 12,
        color: "#8c7a70", fontWeight: 500,
      }}>{current + 1} / {slides.length}</div>
    </div>
  );
};

const CaseStudyDetail = ({ slug, onBack }) => {
  const isMobile = useWindowWidth() < 768;
  const studies = {
    grove: {
      tag: "Startup · Data Infrastructure",
      title: "THE GROVE",
      period: "2026 – Present",
      role: "Co-Founder & Head of Marketing · Sole App Designer & Builder",
      bgColor: "#0a1a0c",
      accentColor: "#E05B12",
      coverImage: "/grove-cover.png",
      intro: "Co-founded and sole-built an encrypted AI data pipeline for entertainment, gaming, and live events. Built from zero to YC application.",
      overview: "THE GROVE is a two-layer data product built for entertainment, gaming, and live events organizations. The hero product connects any file or tool users already work with and generates the next likely version of their asset with a confidence score that tells them exactly how production-ready it is. Free, immediate, no commitment required. The full pipeline adds AES-256 encrypted inter-organizational asset transfer with provenance tracking, access control, and a tamper-evident audit trail so originals are never overwritten and collaborators can only do what you explicitly permit. Co-founded with Maya Cohen.",
      outcomes: [
        { metric: "YC", label: "Applicant" },
        { metric: "AES-256", label: "Encrypted pipeline" },
        { metric: "Gemini", label: "AI-powered engine" },
      ],
      bullets: [
        "Designed and built the full-stack application as the sole app developer, covering the asset pipeline UI, confidence score gauge, flexible file ingestion layer, and encrypted transfer dashboard from zero.",
        "Integrated Google Gemini 2.5 Flash to power predictive asset generation: the pipeline ingests any file type (USD, FBX, audio stems, PDFs, CSVs, production schedules) and outputs a next-step asset with a data-completeness confidence score.",
        "Built a zero-friction flexible submission model supporting drag-and-drop files, one-click cloud storage connections (OneDrive, SharePoint, Google Drive, Dropbox), and direct tool integrations (ShotGrid, Airtable). No reformatting required.",
        "Architected AES-256 encrypted transfer layer with granular access control, provenance tracking, and tamper-evident audit trails for secure inter-organizational asset sharing.",
        "Co-founded with Maya Cohen and developed the YC application strategy targeting enterprise pilots at AEG, Riot Games, Tixr, FlyQuest, and XSolla.",
      ],
      tools: ["React", "Gemini 2.5 Flash", "Google AI SDK", "AES-256 Encryption", "OneDrive API", "SharePoint", "ShotGrid", "CapCut"],
      siteUrl: "https://thegrove.cloud",
    },
    valobanners: {
      tag: "Brand Marketing · Gaming",
      title: "VALOBANNERS",
      period: "Dec 2020 – Dec 2023",
      role: "Brand & Social Media Marketing Manager · Remote",
      bgColor: "#141b42",
      accentColor: "#ffd024",
      intro: "Three years building a brand from the ground up inside one of gaming's most passionate communities Valorant.",
      overview: "VALOBANNERS is a Valorant-adjacent brand built around community-driven content and creator culture. As Brand & Social Media Marketing Manager, I owned the full campaign lifecycle: from audience research and channel strategy to influencer coordination and daily performance monitoring.",
      outcomes: [
        { metric: "103%", label: "Audience growth" },
        { metric: "58%", label: "Engagement increase" },
        { metric: "25%", label: "Monthly sales lift" },
      ],
      bullets: [
        "Developed and executed integrated campaigns across TikTok, Instagram, and Discord defining target audiences, messaging frameworks, and KPIs before each launch.",
        "Managed influencer partnerships end to end: outreach, briefing, deliverables tracking, and performance reporting across multiple concurrent campaigns.",
        "Monitored daily performance via TikTok Analytics and Meta Business Suite, adjusting creative and cadence based on real-time data.",
        "Grew brand audience by 103% and engagement by 58% through audience-informed campaign planning and cross-platform execution.",
      ],
      coverImage: "/valobanners-cover.png",
      carousel: {
        title: "Reversah Creator Media Kit",
        subtitle: "Cory Poon (Reversah) is the founder and owner of VALOBANNERS. I assisted in designing this influencer media kit used to pitch brand partnerships.",
        slides: [
          "/reversah-1.jpg",
          "/reversah-2.jpg",
          "/reversah-3.jpg",
          "/reversah-4.jpg",
          "/reversah-5.jpg",
          "/reversah-6.jpg",
          "/reversah-7.jpg",
        ],
      },
      tools: ["TikTok Analytics", "Meta Business Suite", "Canva", "Discord", "Notion", "CapCut"],
      images: [
        { src: "/valobanners-banners.gif", caption: "Product lineup: physical Valorant-inspired banners available in multiple map themes." },
        { src: "/valobanners-shop.png", caption: "E-commerce experience and order flow across desktop and mobile." },
      ],
    },
    agsm: {
      tag: "Leadership · PR & Marketing",
      title: "AGSM Student Association",
      period: "May 2025 – Present",
      role: "Director of PR, Marketing & Merchandising · Riverside, CA",
      bgColor: "#1e2a5e",
      accentColor: "#7ecaef",
      coverImage: "/agsm-cover.png",
      intro: "Leading integrated marketing campaigns for UCR's graduate business school student association, increasing event turnout by 40%.",
      overview: "As Director of PR and Marketing for the UCR AGSM Student Association, I lead all marketing efforts to promote graduate school events, programs, and community initiatives across email, social, and campus channels.",
      outcomes: [
        { metric: "40%", label: "Event turnout increase" },
        { metric: "Multi", label: "Channel campaigns" },
        { metric: "Live", label: "Faculty presentations" },
      ],
      bullets: [
        "Lead integrated marketing campaigns across email, social, and campus channels to promote graduate school events and programming.",
        "Present campaign strategy and post-event results to faculty leadership on a recurring basis, demonstrating impact through data.",
        "Increased event turnout by 40% through targeted outreach, improved messaging, and more strategic channel selection.",
        "Manage a small team of student volunteers, delegating tasks, reviewing content, and maintaining brand consistency across all outputs.",
      ],
      tools: ["Email Marketing", "Instagram", "LinkedIn", "Canva", "Google Slides", "CapCut"],
    },
    samsung: {
      tag: "Agency · Social Media",
      title: "Social View Agency",
      period: "Aug 2025 – Nov 2025",
      role: "Social Media Intern · Remote",
      bgColor: "#1a1410",
      accentColor: "#7ecaef",
      intro: "Fast-paced agency experience supporting integrated campaign execution across a diverse portfolio of client accounts.",
      overview: "At Social View Agency, I worked across multiple client accounts simultaneously managing content assets, tracking performance, and ensuring each brand's voice stayed consistent across their channel mix.",
      outcomes: [
        { metric: "Multi", label: "Client accounts" },
        { metric: "Cross", label: "Platform execution" },
        { metric: "Fast", label: "Paced environment" },
      ],
      bullets: [
        "Supported integrated campaign execution across multiple client accounts in a high-volume agency environment.",
        "Managed content asset pipelines, ensuring on-time delivery and brand consistency across channels.",
        "Tracked campaign performance metrics and adapted messaging to each brand's unique channel mix.",
        "Collaborated cross-functionally with account managers and creative teams to meet client objectives.",
      ],
      coverImage: "/sva-cartzilla-cover.png",
      tools: ["Meta Business Suite", "Canva", "Google Analytics", "Asana", "Slack", "CapCut"],
    },
    "liquid-death": {
      tag: "Academic Project · Consumer Insights",
      title: "Liquid Death",
      period: "Jan – Mar 2025",
      role: "Consumer Insights & Brand Positioning",
      bgColor: "#2d0606",
      accentColor: "#e05050",
      coverImage: "/liquid-death-cover.webp",
      intro: "A deep-dive into consumer perception, competitive positioning, and what makes a water brand genuinely different.",
      overview: "This two-part project for MGT 209 analyzed Liquid Death's brand strategy, consumer perception, and advertising opportunities. Part 1 covered market research and consumer insights from 300+ survey responses. Part 2 developed a full advertising and promotion strategy rooted in Liquid Death's punk-rock, anti-corporate identity.",
      outcomes: [
        { metric: "300+", label: "Consumer responses analyzed" },
        { metric: "2", label: "Market segments identified" },
        { metric: "3", label: "Viral campaign concepts" },
      ],
      bullets: [
        "Analyzed 300+ consumer survey responses to identify two key market segments: brand-experience-driven consumers (Red Cluster) and functional-benefit consumers (Blue Cluster) prioritizing taste, health, and convenience.",
        "Mapped Liquid Death's competitive landscape against Dasani, SmartWater, Sparkling Ice, and LaCroix, identifying key positioning whitespace around brand personality and sustainability.",
        "Developed a consumer perception analysis comparing Liquid Death against competitors across five key purchase attributes: flavor, health, cost, convenience, and brand experience.",
        "Designed an advertising and promotion strategy built around Liquid Death's punk-rock identity, recommending campaigns like Thirst Murder Trials (viral challenge), Funeral for Plastic (IRL stunt), and social AR filters.",
        "Proposed influencer and brand collaboration framework targeting comedians, tattoo artists, underground musicians, and extreme sports athletes to reach both Gen Z and non-alcohol consumers at events.",
        "Recommended expansion strategy: increase retail presence at gas stations, airports, concert venues, and fitness centers while optimizing direct-to-consumer e-commerce.",
      ],
      tools: ["Google Sheets", "Tableau", "Excel", "Google Slides", "Survey Research"],
      downloads: [
        { label: "Advertising & Promotion Strategy", file: "/liquid-death-sub-report.pdf", type: "PDF" },
        { label: "Liquid Death: Consumer Insights", file: "/liquid-death-presentation.pptx", type: "PPTX" },
      ],
    },
    "quay-australia": {
      tag: "Academic Project · Integrated Marketing",
      title: "Quay Australia",
      period: "Jan – May 2022",
      role: "Gen Z Integrated Marketing Playbook",
      bgColor: "#0d1230",
      accentColor: "#7ecaef",
      intro: "A full go-to-market playbook built for a fashion-forward eyewear brand looking to connect with a Gen Z audience.",
      overview: "Conducted market research and social listening to build a comprehensive integrated marketing playbook for Quay Australia. The final deliverable covered channel strategy, influencer partnerships, audience segmentation, and measurable KPIs.",
      outcomes: [
        { metric: "Full", label: "Go-to-market playbook" },
        { metric: "Gen Z", label: "Audience framework" },
        { metric: "KPI", label: "Measurement model" },
      ],
      bullets: [
        "Conducted primary market research and social listening to understand Gen Z behavior and platform preferences.",
        "Built audience segmentation framework identifying primary and secondary target personas.",
        "Developed channel strategy spanning TikTok, Instagram, and influencer partnerships with specific activation plans.",
        "Defined measurable KPIs and a campaign measurement model to track effectiveness across channels.",
      ],
      coverImage: "/quay-cover.jpg",
      tools: ["Social Listening Tools", "Google Slides", "Excel", "Canva"],
    },
  };

  const study = studies[slug];
  if (!study) return null;

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero banner */}
      <div style={{
        background: study.bgColor, borderBottom: "2.5px solid #111",
        padding: isMobile ? "60px 20px 48px" : "72px 48px 64px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Cover image background */}
        {study.coverImage && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${study.coverImage})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.25,
          }} />
        )}
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              borderRadius: 6, padding: "7px 16px", cursor: "pointer",
              marginBottom: 40, transition: "color 150ms, background 150ms",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}>
            ← Back to Work
          </button>

          <div style={{
            display: "inline-block",
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: study.accentColor, marginBottom: 18,
            background: "rgba(255,255,255,0.08)", padding: "5px 14px",
            border: `2px solid ${study.accentColor}`, borderRadius: 4,
          }}>{study.tag}</div>

          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? 32 : "clamp(48px, 6vw, 80px)", fontWeight: 700,
            color: "white", letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: 20,
          }}>{study.title}</h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 16 : 20,
            color: "rgba(255,255,255,0.65)", lineHeight: 1.6, maxWidth: 600,
            marginBottom: 40,
          }}>{study.intro}</p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[study.role, study.period].map(label => (
              <div key={label} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.07)",
                padding: "8px 16px", borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.12)",
              }}>{label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics row */}
      <div style={{
        background: study.accentColor === "#ffd024" ? "#fffbea" : "#faf8f7",
        borderBottom: "2.5px solid #111",
        padding: isMobile ? "32px 20px" : "40px 48px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0 }}>
          {study.outcomes.map((o, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: isMobile ? "0 12px" : "0 32px",
              borderRight: i < study.outcomes.length - 1 ? "2px solid #e4dfdc" : "none",
            }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? 32 : 44, fontWeight: 700, color: "#1a1410",
                letterSpacing: "-0.04em", lineHeight: 1,
                marginBottom: 8,
              }}>{o.metric}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: "#8c7a70", fontWeight: 500,
              }}>{o.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "48px 20px" : "72px 48px" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#d42020", marginBottom: 16,
          }}>Overview</div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 17,
            color: "#4a3e36", lineHeight: 1.8,
          }}>{study.overview}</p>
        </div>

        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#d42020", marginBottom: 20,
          }}>What I Did</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {study.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0, width: 24, height: 24,
                  background: "#1e2a5e", borderRadius: 4,
                  border: "2px solid #111", boxShadow: "2px 2px 0 #111",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
                  color: "#ffd024", marginTop: 1,
                }}>0{i + 1}</div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                  color: "#4a3e36", lineHeight: 1.75, margin: 0,
                }}>{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#d42020", marginBottom: 16,
          }}>Tools & Platforms</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {study.tools.map(t => (
              <span key={t} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                color: "#1e2a5e", background: "#e0e4f5",
                padding: "7px 16px", borderRadius: 20,
                border: "1.5px solid #b8c2ea",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {study.siteUrl && (
          <div style={{ marginTop: 48 }}>
            <a
              href={study.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
                color: "white", background: study.accentColor,
                padding: "14px 28px", borderRadius: 10,
                border: "2.5px solid #111", boxShadow: "4px 4px 0 #111",
                textDecoration: "none",
                transition: "box-shadow 150ms, transform 150ms",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "6px 6px 0 #111"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "4px 4px 0 #111"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Visit thegrove.cloud ↗
            </a>
          </div>
        )}

        {study.downloads && study.downloads.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#d42020", marginBottom: 16,
            }}>Project Files</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {study.downloads.map((d, i) => (
                <a key={i} href={d.file} download style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px",
                  background: "#faf8f7", border: "2px solid #e4dfdc",
                  borderRadius: 12, textDecoration: "none",
                  transition: "border-color 150ms, box-shadow 150ms, transform 150ms",
                  boxShadow: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1e2a5e"; e.currentTarget.style.boxShadow = "4px 4px 0 #1e2a5e"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e4dfdc"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: d.type === "PDF" ? "#fff5f5" : "#e0e4f5",
                      border: "2px solid #e4dfdc",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700,
                      color: d.type === "PDF" ? "#d42020" : "#1e2a5e",
                      letterSpacing: "0.05em",
                    }}>{d.type}</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                      color: "#1a1410",
                    }}>{d.label}</div>
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                    color: "#1e2a5e", display: "flex", alignItems: "center", gap: 4,
                  }}>Download ↓</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {study.images && study.images.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#d42020", marginBottom: 20,
            }}>Project Visuals</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {study.images.map((img, i) => (
                <div key={i} style={{
                  border: "2.5px solid #111", borderRadius: 16,
                  overflow: "hidden", boxShadow: "4px 4px 0 #111",
                }}>
                  <img src={img.src} alt={img.caption}
                    style={{ width: "100%", display: "block" }} />
                  {img.caption && (
                    <div style={{
                      padding: "12px 18px", background: "#f5f2f0",
                      borderTop: "2px solid #e4dfdc",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                      color: "#6b5c52", lineHeight: 1.5,
                    }}>{img.caption}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {study.carousel && (
          <ImageCarousel
            title={study.carousel.title}
            subtitle={study.carousel.subtitle}
            slides={study.carousel.slides}
          />
        )}
      </div>
    </div>
  );
};

Object.assign(window, { CaseStudyDetail });

export default CaseStudyDetail