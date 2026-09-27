const fs = require('fs');

function addViewBox(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('viewBox=')) {
    console.log(filePath, 'already has viewBox');
    return;
  }
  const widthMatch = content.match(/width="([\d.]+)"/);
  const heightMatch = content.match(/height="([\d.]+)"/);
  if (widthMatch && heightMatch) {
    const w = widthMatch[1];
    const h = heightMatch[1];
    content = content.replace('<svg', `<svg viewBox="0 0 ${w} ${h}"`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(filePath, 'added viewBox:', `0 0 ${w} ${h}`);
  }
}

addViewBox('public/assets/blood_vessels_diagram.svg');
addViewBox('public/assets/artery_histology.svg');
addViewBox('public/assets/vein_histology.svg');
addViewBox('public/assets/capillary_histology.svg');
addViewBox('public/assets/brain_sagittal.svg');
addViewBox('public/assets/kidney_structures.svg');
