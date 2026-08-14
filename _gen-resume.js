const PDFDocument = require('pdfkit');
const fs = require('fs');

const OUT = process.argv[2];
const NAVY = '#1e2a5e', RED = '#d42020', INK = '#1a1410', GRAY = '#6b5c52', BODY = '#4a3e36';

const doc = new PDFDocument({ size: 'LETTER', margins: { top: 48, bottom: 48, left: 54, right: 54 } });
doc.pipe(fs.createWriteStream(OUT));
const L = doc.page.margins.left;
const R = doc.page.width - doc.page.margins.right;
const W = R - L;

function sectionTitle(t) {
  if (doc.y > doc.page.height - 120) doc.addPage();
  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(RED).text(t.toUpperCase(), L, doc.y, { characterSpacing: 1.2 });
  const y = doc.y + 3;
  doc.moveTo(L, y).lineTo(R, y).lineWidth(1.2).strokeColor('#e4dfdc').stroke();
  doc.moveDown(0.6);
}

function entry(org, role, period, bullets) {
  if (doc.y > doc.page.height - 110) doc.addPage();
  const top = doc.y;
  doc.font('Helvetica-Bold').fontSize(11).fillColor(INK).text(org, L, top, { width: W - 150, continued: false });
  doc.font('Helvetica').fontSize(9).fillColor(GRAY).text(period, L, top + 1, { width: W, align: 'right' });
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(RED).text(role, L, doc.y + 1);
  doc.moveDown(0.3);
  (bullets || []).forEach(b => {
    if (doc.y > doc.page.height - 80) doc.addPage();
    const by = doc.y;
    doc.font('Helvetica').fontSize(9.5).fillColor(NAVY).text('•', L, by, { width: 12 });
    doc.font('Helvetica').fontSize(9.5).fillColor(BODY).text(b, L + 14, by, { width: W - 14, lineGap: 1.5 });
    doc.moveDown(0.25);
  });
  doc.moveDown(0.5);
}

function skillRow(cat, items) {
  if (doc.y > doc.page.height - 70) doc.addPage();
  const y = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(NAVY).text(cat, L, y, { width: 92 });
  doc.font('Helvetica').fontSize(9.5).fillColor(BODY).text(items, L + 100, y, { width: W - 100, lineGap: 1.5 });
  doc.moveDown(0.5);
}

// ── Header ──
doc.font('Helvetica-Bold').fontSize(30).fillColor(INK).text('Ash Lacap', L, doc.page.margins.top);
doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('(she/her)', { oblique: true });
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(9.5).fillColor(NAVY)
  .text('ashleynlacap@gmail.com   |   linkedin.com/in/ash-lacap   |   ashlacap.com   |   Greater Los Angeles, CA');
const hy = doc.y + 6;
doc.moveTo(L, hy).lineTo(R, hy).lineWidth(2).strokeColor(INK).stroke();
doc.moveDown(1);

// ── Summary ──
doc.font('Helvetica').fontSize(10).fillColor(BODY).text(
  'Marketing associate with 4+ years of hands-on experience planning and executing integrated campaigns across social, content, influencer, and email channels for consumer-facing brands. Comfortable working with performance data to monitor results, adjust plans, and report findings to stakeholders. Strong cross-functional collaborator with experience managing timelines across multiple concurrent projects. MBA candidate at UC Riverside concentrating in Marketing and Business Analytics.',
  { width: W, lineGap: 2 }
);
doc.moveDown(0.5);

sectionTitle('Core Competencies');
doc.font('Helvetica').fontSize(9.5).fillColor(BODY).text(
  'Integrated Marketing Campaigns  ·  Omnichannel Execution  ·  Campaign Planning  ·  Consumer Insights  ·  Performance Analytics  ·  KPI Tracking  ·  Cross-Functional Collaboration  ·  Social Media Marketing  ·  Influencer Marketing  ·  Email & Content Strategy  ·  Stakeholder Communication  ·  Brand Messaging',
  { width: W, lineGap: 2 });
doc.moveDown(0.5);

sectionTitle('Experience');
entry('VALOBANNERS', 'Brand Marketing Associate · Remote', 'Dec 2020 – Dec 2023', [
  'Developed and executed integrated campaigns across social, influencer, and community channels, defining target audiences, messaging frameworks, and KPIs, then monitoring daily performance via TikTok Analytics and Meta Business Suite to drive a 25% increase in monthly sales.',
  'Managed influencer partnerships end to end: coordinating outreach, briefing creators, tracking deliverables, and producing performance reports across multiple concurrent campaigns.',
  'Grew brand audience by 103% and engagement by 58% through audience-informed campaign planning, creative iteration, and cross-platform execution across TikTok, Instagram, and Discord.',
  'Analyzed content performance weekly to identify top-performing formats and inform future creative direction, consistently improving click-through and save rates.',
  'Collaborated with the product team to align campaign messaging with new drops and seasonal releases, ensuring consistency across all touchpoints.',
]);
entry('Social View Agency', 'Social Media Intern · Remote', 'Aug 2025 – Nov 2025', [
  "Supported integrated campaign execution across multiple client accounts in a fast-paced agency environment, managing content assets and adapting messaging to each brand's channel mix.",
  'Tracked campaign KPIs across clients using Meta Business Suite and platform-native analytics tools, surfacing weekly insights to account managers.',
  'Assisted in building content calendars, writing captions, and coordinating asset delivery between creative and client teams on tight turnarounds.',
  'Contributed to client strategy decks by compiling competitive research and social listening findings.',
]);
entry('H&R Block', 'Social Media Strategist (Contract) · Remote', 'Oct 2022 – Apr 2023', [
  'Planned and managed on-brand content across social channels during peak tax season, developing a content cadence that balanced educational, promotional, and community-driven posts.',
  'Monitored performance data daily and refined posting frequency and content mix to improve reach and audience engagement over the campaign window.',
  "Ensured brand voice consistency across all published content in alignment with H&R Block's national guidelines.",
]);

sectionTitle('Ventures');
entry('THE GROVE', 'Co-Founder & Head of Data Infrastructure · Sole App Designer & Builder', 'Apr 2026 – Present', [
  'Co-founded an encrypted AI data pipeline for entertainment, gaming, and live events organizations with Maya Cohen, serving as the sole app designer and builder from day one.',
  'Designed and built the full product in React, integrating Google Gemini 2.5 Flash to power predictive asset generation with a confidence scoring engine that tells users exactly how production-ready their output is.',
  'Built a flexible ingestion layer accepting any file type (USD, FBX, audio stems, PDFs, CSVs) and cloud storage connections (OneDrive, SharePoint, Google Drive) with no reformatting required.',
  'Architected AES-256 encrypted asset transfer with provenance tracking, granular access control, and tamper-evident audit trails for secure inter-organizational collaboration.',
  'Developing YC application strategy targeting enterprise pilots at AEG, Riot Games, Tixr, FlyQuest, and XSolla.',
]);

sectionTitle('Leadership');
entry('UCR AGSM Student Association', 'Director of PR and Marketing · Riverside, CA', 'May 2025 – June 2026', [
  'Lead integrated marketing campaigns across email, social, and campus channels to promote graduate school events and programming.',
  'Present campaign strategy and post-event results to faculty leadership on a recurring basis, demonstrating impact through data.',
  'Increased event turnout by 40% through targeted outreach, improved messaging, and more strategic channel selection.',
  'Manage a small team of student volunteers, delegating tasks, reviewing content, and maintaining brand consistency across all outputs.',
]);

sectionTitle('Projects');
entry('Liquid Death', 'Consumer Insights & Brand Positioning', 'Jan – Mar 2025', [
  'Analyzed 300+ consumer survey responses to identify audience trends, brand perception gaps, and purchase intent signals across demographic segments.',
  'Developed data-driven brand positioning recommendations and a messaging strategy targeting younger consumer segments, grounded in competitive landscape analysis.',
  'Presented findings and strategic recommendations to faculty with supporting data visualizations built in Tableau and Google Slides.',
]);
entry('Quay Australia', 'Gen Z Integrated Marketing Playbook', 'Jan – May 2022', [
  'Conducted primary market research and social listening to map Gen Z behavior, platform preferences, and purchase decision patterns.',
  'Built a full go-to-market playbook covering channel strategy, influencer partnership framework, audience segmentation, and a measurable KPI model.',
  'Delivered the playbook as a client-facing presentation, receiving strong feedback on strategic clarity and research depth.',
]);

sectionTitle('Education');
entry('UC Riverside A. Gary Anderson Graduate School of Management', 'MBA, Marketing & Business Analytics', '2026', [
  'Concentrating in Marketing and Business Analytics. Active member of the AGSM Student Association, serving as Director of PR and Marketing.',
]);
entry('California State University, Northridge', 'BS, Marketing', '2022', [
  'Bachelor of Science in Marketing. Built foundational knowledge in consumer behavior, brand strategy, and integrated marketing communications.',
]);

sectionTitle('Skills');
skillRow('Marketing', 'Integrated Campaigns · Influencer Marketing · Email Marketing · Social Media Strategy · Content Planning · Brand Messaging · Omnichannel Execution');
skillRow('Partnerships', 'Influencer & Creator Partnerships · Partner Outreach · Brand Collaborations · Sponsorship Strategy · Creator Briefing · Deliverables Management · Contract & Rate Negotiation · Co-Marketing · Partner Reporting · Relationship Management');
skillRow('Analytics', 'Meta Business Suite · TikTok Analytics · Google Analytics · Tableau · Excel · Google Sheets · KPI Tracking · Performance Reporting');
skillRow('Tools', 'Canva · Adobe Premiere Pro · Photoshop · Notion · Asana · Slack · PowerPoint · Google Slides · CapCut');
skillRow('Platforms', 'TikTok · Instagram · YouTube · LinkedIn · Twitter/X · Reddit · Discord');

doc.end();
console.log('PDF written to', OUT);
