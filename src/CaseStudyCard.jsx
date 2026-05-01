// Case Study Card component
import React, { useState, useEffect, useRef } from 'react'

const CaseStudyCard = ({ tag, title, description, bgColor, accentColor, onClick, featured, imageContent }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        border: '2.5px solid #111',
        borderRadius: featured ? 20 : 16,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? '8px 8px 0 #111' : '4px 4px 0 #111',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 200ms cubic-bezier(0.22,1,0.36,1), transform 200ms cubic-bezier(0.22,1,0.36,1)',
        flex: featured ? '1 1 100%' : '1 1 calc(50% - 10px)',
        minWidth: featured ? 'unset' : 280
      }}>
      {/* Image / Preview area */}
      <div style={{
        height: featured ? 260 : 200,
        background: bgColor || '#1e2a5e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '2.5px solid #111',
        position: 'relative', overflow: 'hidden'
      }}>
        {imageContent ||
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: featured ? 48 : 36, fontWeight: 700,
          color: 'rgba(255,255,255,0.12)',
          letterSpacing: '-0.04em', userSelect: 'none'
        }}>{title}</div>
        }
        {featured &&
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: '#ffd024', border: '2px solid #111',
          borderRadius: 4, padding: '4px 12px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#1a1410', boxShadow: '2px 2px 0 #111'
        }}>Featured</div>
        }
        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.18)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 200ms',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#ffd024', border: '2.5px solid #111',
            borderRadius: 8, padding: '10px 22px',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
            color: '#1a1410', boxShadow: '3px 3px 0 #111',
            transform: hovered ? 'scale(1)' : 'scale(0.9)',
            transition: 'transform 200ms cubic-bezier(0.34,1.56,0.64,1)'
          }}>View My Work →</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: featured ? '24px 28px' : '18px 20px' }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: accentColor || '#d42020', marginBottom: 8
        }}>{tag}</div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: featured ? 26 : 20, fontWeight: 700,
          color: '#1a1410', letterSpacing: '-0.025em',
          marginBottom: 8, lineHeight: 1.15
        }}>{title}</div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: featured ? 15 : 13, color: '#8c7a70',
          lineHeight: 1.65, marginBottom: 16
        }}>{description}</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
          color: '#1e2a5e',
          borderBottom: '1.5px solid currentColor',
          paddingBottom: 1
        }}>
          View My Work <span style={{ fontSize: 15 }}>→</span>
        </div>
      </div>
    </div>);

};

Object.assign(window, { CaseStudyCard });

export default CaseStudyCard