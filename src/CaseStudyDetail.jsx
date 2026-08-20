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

const CaseStudyDetail = ({ slug, onBack, backLabel = "Back to Work" }) => {
  const isMobile = useWindowWidth() < 768;
  const studies = {
    valobanners: {
      tag: "Marketing Analyst · LiveOps · Gaming",
      title: "VALOBANNERS",
      period: "May 2022 – Aug 2024",
      role: "Data Analyst, LiveOps · Valorant Merchandising · Remote",
      bgColor: "#141b42",
      accentColor: "#ffd024",
      intro: "Turning player behavior data into product decisions for a Valorant merchandising and LiveOps operation.",
      overview: "As Data Analyst on the LiveOps team, I built the analytics infrastructure that told the team what to build and price next. I tracked core game and merchandise KPIs, ran a rigorous A/B testing program, and translated player behavior into feature and roadmap decisions, from battle pass structures to seasonal merchandise drops.",
      outcomes: [
        { metric: "+18%", label: "YoY ARPU growth" },
        { metric: "+25%", label: "Player retention" },
        { metric: "95%", label: "Data accuracy" },
      ],
      bullets: [
        "Built Mixpanel and Tableau dashboards tracking 15+ core game KPIs (retention cohorts, ARPU, churn rate, event performance, economy health), enabling the LiveOps team to identify optimization opportunities and implement data-driven feature adjustments.",
        "Wrote SQL queries to extract player behavior data and built Python scripts to automate weekly performance analysis; identified engagement trends and monetization opportunities that informed 8+ feature optimizations, reducing decision cycles by 40% and contributing to 18% YoY ARPU growth.",
        "Designed and executed A/B tests on battle pass reward structures and in-game events, analyzing player behavior data to improve retention by 25% and ARPU by 18%, informing product roadmap decisions for senior leadership.",
        "Collaborated with design and product teams to implement game telemetry tracking, establishing data collection standards and validation processes; improved data accuracy by 95% and enabled 12+ rigorous A/B tests monthly that previously lacked reliable validation infrastructure.",
        "Designed and executed A/B tests for seasonal merchandise drop campaigns, analyzing customer behavior data to improve follower retention by 25% and ARPU by 18%, informing product roadmap decisions for senior leadership.",
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
      tools: ["SQL", "Python", "Mixpanel", "Tableau", "A/B Testing", "Game Telemetry"],
      images: [
        { src: "/valobanners-banners.gif", caption: "Product lineup: physical Valorant-inspired banners available in multiple map themes." },
        { src: "/valobanners-shop.png", caption: "E-commerce experience and order flow across desktop and mobile." },
      ],
    },
    samsung: {
      tag: "Business Intelligence · Agency",
      title: "Social View Agency",
      period: "Aug 2025 – Nov 2025",
      role: "Business Intelligence MBA Intern · Remote",
      bgColor: "#1a1410",
      accentColor: "#7ecaef",
      intro: "A data-first agency internship: turning SQL and Tableau into conversion lift across multiple client campaigns.",
      overview: "As Business Intelligence MBA Intern at Social View Agency, I owned the analytics behind client campaign optimization. I designed and executed A/B tests, built automated performance dashboards, and translated raw campaign data into recommendations that account managers could act on faster.",
      outcomes: [
        { metric: "+13%", label: "User conversion (A/B)" },
        { metric: "12+", label: "Campaign KPIs tracked" },
        { metric: "50%", label: "Faster optimization decisions" },
      ],
      bullets: [
        "Designed and executed A/B tests using SQL query analysis and Tableau dashboards, identifying optimization opportunities that improved user conversion by +13%.",
        "Scaled the successful A/B testing framework and formats across multiple campaigns, demonstrating the ability to translate data insights into repeatable, actionable strategies.",
        "Built automated Tableau dashboards tracking 12+ campaign performance KPIs (conversion rate, engagement rate, cost-per-action, user acquisition cost).",
        "Wrote SQL queries to extract daily performance data and identify trends, enabling account managers to accelerate optimization decisions by 50%.",
      ],
      coverImage: "/sva-cartzilla-cover.png",
      tools: ["SQL", "Tableau", "A/B Testing", "Meta Business Suite", "Google Analytics"],
    },
    "hr-block": {
      tag: "Data Analyst · Performance Marketing",
      title: "H&R Block",
      period: "Sep 2021 – Apr 2022",
      role: "Data Analyst · Contract · Remote",
      bgColor: "#006940",
      accentColor: "#5ec8a0",
      coverImage: "/hr-block-logo.webp",
      intro: "Performance analytics during peak tax season: BigQuery, SQL, and statistical A/B testing that moved acquisition costs the right direction.",
      overview: "As a contract Data Analyst supporting H&R Block's peak-season marketing, I built the data extraction and monitoring pipelines behind campaign optimization, then ran statistical A/B tests on messaging that measurably lowered acquisition costs and raised conversion.",
      outcomes: [
        { metric: "−22%", label: "Cost-per-acquisition" },
        { metric: "+68%", label: "YoY conversion rate" },
        { metric: "−15%", label: "Cost-per-lead" },
      ],
      bullets: [
        "Designed and executed BigQuery queries and SQL schemas to extract campaign and user behavior data at scale.",
        "Built automated Python monitoring scripts that identified optimization opportunities, improving cost-per-acquisition by 22% and maintaining an 8–12% click-through rate during peak seasons.",
        "Designed and executed A/B tests on email and landing page messaging using statistical analysis.",
        "Translated test results into actionable recommendations, improving cost-per-lead by 15% and conversion rate by 68% YoY.",
      ],
      tools: ["BigQuery", "SQL", "Python", "A/B Testing", "Statistical Analysis"],
    },
    agsm: {
      tag: "Leadership · Marketing & PR",
      title: "AGSM Student Association",
      period: "May 2025 – Jun 2026",
      role: "Director of Marketing & Public Relations · Riverside, CA",
      bgColor: "#1e2a5e",
      accentColor: "#7ecaef",
      coverImage: "/agsm-cover.png",
      intro: "Rebuilt the content strategy for UCR's graduate business school association, lifting engagement and event turnout 40%.",
      overview: "As Director of Marketing & Public Relations for the UCR AGSM Student Association, I rebuilt the content strategy across social, email, and PR channels, led a team of 10+ student volunteers, and owned content production end to end, no agency or outside support.",
      outcomes: [
        { metric: "40%", label: "Engagement & turnout lift" },
        { metric: "10+", label: "Volunteers led" },
        { metric: "5+", label: "Content disciplines owned" },
      ],
      bullets: [
        "Rebuilt the association's content strategy across social, email, and PR channels, resulting in a 40% increase in engagement and event turnout through sharper audience targeting and more deliberate channel selection.",
        "Led a team of 10+ student volunteers by overseeing all timelines, metrics, and deliverables while ensuring brand consistency across projects, achieving a unified visual and messaging identity.",
        "Owned short-form video production, graphic design, merchandising, and publishing cadence end to end to achieve a consistent content presence without an agency or outside support.",
        "Presented campaign strategy and results to faculty leadership on a recurring basis, demonstrating impact through data.",
      ],
      tools: ["Meta Business Suite", "Canva", "Adobe Premiere Pro", "CapCut", "Email Marketing", "Google Slides"],
    },
    "hot-wheels": {
      tag: "Marketing Analytics · Academic",
      title: "Hot Wheels Racing Game",
      period: "Jan – Mar 2025",
      role: "MGT 257: Marketing Strategy · UC Riverside",
      bgColor: "#4a4a4a",
      accentColor: "#ffd11a",
      coverImage: "/hot-wheels-logo.jpg",
      intro: "A data-driven monetization and retention strategy for a Hot Wheels racing game, built on player segmentation and forecasted ARPU.",
      overview: "For MGT 257: Marketing Strategy, I designed the analytics behind a Hot Wheels racing game's live-service model. I surveyed players, segmented them by behavior, and forecasted the ARPU impact of tailored battle pass pricing, then validated each recommendation with retention cohorts and engagement curves.",
      outcomes: [
        { metric: "3", label: "Player segments modeled" },
        { metric: "ARPU", label: "Forecasted by cohort" },
        { metric: "Data", label: "Validated pricing strategy" },
      ],
      bullets: [
        "Designed and distributed player surveys, analyzing behavioral data to identify distinct player segments and the engagement drivers behind each.",
        "Developed targeted monetization strategies for each player cohort (casual, whale, seasonal), matching pricing and offers to how each group actually plays and spends.",
        "Forecasted ARPU impact across cohorts to recommend tailored battle pass pricing, quantifying the revenue trade-offs of each pricing tier before launch.",
        "Built retention cohorts and engagement curves to validate the recommendations, grounding the strategy in projected player behavior rather than assumption.",
      ],
      tools: ["Survey Design", "Player Segmentation", "ARPU Forecasting", "Retention Cohorts", "Tableau", "Excel"],
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
            ← {backLabel}
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