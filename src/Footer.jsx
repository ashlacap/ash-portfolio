// Footer component
const Footer = ({ onNavigate }) =>
<footer style={{
  background: '#0d1230',
  borderTop: '2.5px solid #111',
  padding: '56px 48px 40px'
}}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
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
            Gen Z marketing. Social strategy. Community-first campaigns.
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: 56 }}>
          <div>
            <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#3a4ea8', marginBottom: 16
          }}>Navigate</div>
            {[['Work', 'work'], ['About', 'about'], ['Resume', 'resume']].map(([label, page]) =>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
  </footer>;


Object.assign(window, { Footer });

export default Footer