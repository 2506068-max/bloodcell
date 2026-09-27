const fs = require('fs');

let svg = fs.readFileSync('public/assets/heart_internal_cutaway.svg', 'utf8');

// Ensure viewBox is present for flawless responsive scaling
if (!svg.includes('viewBox=')) {
  svg = svg.replace('<svg ', '<svg viewBox="0 0 662.65 651.49" ');
}

// Version 1: Clean cutaway without text labels
const cleanSvg = svg.replace('id="layer7"', 'id="layer7" style="display:none"');
fs.writeFileSync('public/assets/heart_internal_clean.svg', cleanSvg, 'utf8');

// Also update the original with viewBox
fs.writeFileSync('public/assets/heart_internal_cutaway.svg', svg, 'utf8');

console.log('viewBox added & clean version updated!');
