const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // SVG overlay for background, typography, badges, and layout
  const svgContent = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Main Gradient -->
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070B14" />
        <stop offset="50%" stop-color="#0F172A" />
        <stop offset="100%" stop-color="#091322" />
      </linearGradient>

      <!-- Glow Gradients -->
      <radialGradient id="tealGlow" cx="20%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#14B8A6" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#14B8A6" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="blueGlow" cx="80%" cy="70%" r="60%">
        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
      </radialGradient>

      <!-- Text Gradient -->
      <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="60%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#14B8A6" />
      </linearGradient>

      <!-- Glass Card Gradient -->
      <linearGradient id="glassBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14B8A6" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.15" />
      </linearGradient>

      <clipPath id="portraitClip">
        <rect x="680" y="55" width="450" height="520" rx="24" />
      </clipPath>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGradient)" />
    <rect width="${width}" height="${height}" fill="url(#tealGlow)" />
    <rect width="${width}" height="${height}" fill="url(#blueGlow)" />

    <!-- Grid Pattern overlay -->
    <g opacity="0.05" stroke="#FFFFFF" stroke-width="1">
      <path d="M 0 90 L 1200 90 M 0 180 L 1200 180 M 0 270 L 1200 270 M 0 360 L 1200 360 M 0 450 L 1200 450 M 0 540 L 1200 540" />
      <path d="M 150 0 L 150 630 M 300 0 L 300 630 M 450 0 L 450 630 M 600 0 L 600 630 M 750 0 L 750 630 M 900 0 L 900 630 M 1050 0 L 1050 630" />
    </g>

    <!-- Decorative Top Line Accent -->
    <rect x="0" y="0" width="${width}" height="6" fill="#14B8A6" />

    <!-- LEFT CONTENT AREA -->
    <!-- Eyebrow Pill -->
    <g transform="translate(80, 75)">
      <rect x="0" y="0" width="380" height="36" rx="18" fill="#14B8A6" fill-opacity="0.15" stroke="#14B8A6" stroke-opacity="0.4" stroke-width="1" />
      <circle cx="20" cy="18" r="4" fill="#14B8A6" />
      <text x="34" y="23" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="700" fill="#14B8A6" letter-spacing="1">BSIT GRADUATE • GPA 1.53 • PRESIDENT'S LISTER</text>
    </g>

    <!-- Main Name Title -->
    <text x="80" y="185" font-family="'Inter', system-ui, sans-serif" font-size="56" font-weight="900" fill="url(#nameGradient)" letter-spacing="-1">Lloyd Jernell Loteriña</text>

    <!-- Subtitle / Role -->
    <text x="80" y="230" font-family="'Inter', system-ui, sans-serif" font-size="26" font-weight="700" fill="#E2E8F0">Frontend Developer &amp; UI/UX Specialist</text>

    <!-- Description Paragraph -->
    <text x="80" y="275" font-family="'Inter', system-ui, sans-serif" font-size="17" font-weight="400" fill="#94A3B8">Crafting responsive web applications, intuitive interfaces,</text>
    <text x="80" y="300" font-family="'Inter', system-ui, sans-serif" font-size="17" font-weight="400" fill="#94A3B8">and award-winning capstone software with modern web tech.</text>

    <!-- Tech Stack Chips -->
    <g transform="translate(80, 345)">
      <!-- Chip 1 -->
      <rect x="0" y="0" width="110" height="34" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
      <text x="55" y="22" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC" text-anchor="middle">React 19</text>

      <!-- Chip 2 -->
      <rect x="122" y="0" width="125" height="34" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
      <text x="184.5" y="22" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC" text-anchor="middle">Tailwind CSS</text>

      <!-- Chip 3 -->
      <rect x="259" y="0" width="120" height="34" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
      <text x="319" y="22" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC" text-anchor="middle">JavaScript</text>

      <!-- Chip 4 -->
      <rect x="391" y="0" width="165" height="34" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
      <text x="473.5" y="22" font-family="'Inter', system-ui, sans-serif" font-size="14" font-weight="600" fill="#F8FAFC" text-anchor="middle">Python &amp; Supabase</text>
    </g>

    <!-- Key Highlights / Achievements -->
    <g transform="translate(80, 420)">
      <!-- Highlight 1 -->
      <rect x="0" y="0" width="270" height="50" rx="12" fill="#0F172A" fill-opacity="0.8" stroke="url(#glassBorder)" stroke-width="1" />
      <text x="20" y="23" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="800" fill="#14B8A6" letter-spacing="1">1ST PLACE STCIEERD</text>
      <text x="20" y="40" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="500" fill="#CBD5E1">Regional R&amp;D Awardee</text>

      <!-- Highlight 2 -->
      <rect x="285" y="0" width="270" height="50" rx="12" fill="#0F172A" fill-opacity="0.8" stroke="url(#glassBorder)" stroke-width="1" />
      <text x="305" y="23" font-family="'Inter', system-ui, sans-serif" font-size="12" font-weight="800" fill="#14B8A6" letter-spacing="1">PUP LOPEZ CAMPUS</text>
      <text x="305" y="40" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="500" fill="#CBD5E1">Batch Academic Awardee</text>
    </g>

    <!-- Bottom Footer Brand Badge -->
    <g transform="translate(80, 520)">
      <rect x="0" y="0" width="555" height="48" rx="24" fill="#0A0F1D" stroke="#1E293B" stroke-width="1.5" />
      <circle cx="28" cy="24" r="12" fill="#14B8A6" />
      <path d="M 24 24 L 27 27 L 33 21" stroke="#0A0F1D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <text x="50" y="29" font-family="'Inter', system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">Interactive Portfolio</text>
      <text x="535" y="29" font-family="'Inter', system-ui, sans-serif" font-size="15" font-weight="700" fill="#14B8A6" text-anchor="end">Explore Selected Works ↗</text>
    </g>

    <!-- RIGHT PORTRAIT CONTAINER FRAME -->
    <g clip-path="url(#portraitClip)">
      <rect x="680" y="55" width="450" height="520" rx="24" fill="#0D1527" />
      <circle cx="905" cy="300" r="190" fill="#14B8A6" fill-opacity="0.18" />
    </g>
    <rect x="680" y="55" width="450" height="520" rx="24" fill="none" stroke="url(#glassBorder)" stroke-width="2" />
  </svg>
  `;

  // Scale portrait image nicely
  const portraitResized = await sharp('public/assets/lj2.0.png')
    .resize({ width: 450, height: 520, fit: 'cover', position: 'top' })
    .toBuffer();

  // Create rounded mask for portrait
  const maskSvg = Buffer.from(`
    <svg width="450" height="520">
      <rect x="0" y="0" width="450" height="520" rx="24" fill="#FFF"/>
    </svg>
  `);

  const roundedPortrait = await sharp(portraitResized)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const svgBuffer = Buffer.from(svgContent);

  // Composite background with portrait inserted BEFORE border
  await sharp(svgBuffer)
    .composite([
      {
        input: roundedPortrait,
        top: 55,
        left: 680
      }
    ])
    .png()
    .toFile('public/assets/og-image.png');

  console.log('Successfully generated public/assets/og-image.png!');
}

createOgImage().catch(console.error);
