const fs = require('fs'); // [cite: 1]

const width = 1920; // [cite: 1]
const height = 1080; // [cite: 1]
const gridSize = 40; // Reduced to 1/3 size for higher density [cite: 2]

// Helper function to generate randomized dark shades fading to black
function getTriangleColor(y, maxH) {
    let depth = y / maxH;
    if (depth > 1) depth = 1;

    // Base brightness (0-255). Lower = darker.
    const maxBrightness = 28; 
    const base = maxBrightness * Math.pow(1 - depth, 2); 

    // Random variation creates the "faceted" look
    const variation = 15 * (1 - depth) * Math.random();
    const val = Math.floor(base + variation);

    // Fade to pure black at bottom 20% of screen
    if (depth > 0.8) return '#000000';

    const hex = val.toString(16).padStart(2, '0');
    return `#${hex}${hex}${hex}`;
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="background-color: #000;">\n`;

svg += '  <g shape-rendering="crispEdges">\n'; // Optimization for many small polygons

for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
        // Alternate diagonal direction for a proper mesh [cite: 8, 10]
        const isEven = (x / gridSize + y / gridSize) % 2 === 0;
        const color1 = getTriangleColor(y, height);
        const color2 = getTriangleColor(y + gridSize, height);

        if (isEven) {
            // Pattern: \
            svg += `    <polygon points="${x},${y} ${x + gridSize},${y} ${x + gridSize},${y + gridSize}" fill="${color1}" stroke="${color1}" stroke-width="0.5" />\n`;
            svg += `    <polygon points="${x},${y} ${x},${y + gridSize} ${x + gridSize},${y + gridSize}" fill="${color2}" stroke="${color2}" stroke-width="0.5" />\n`;
        } else {
            // Pattern: /
            svg += `    <polygon points="${x + gridSize},${y} ${x},${y} ${x},${y + gridSize}" fill="${color1}" stroke="${color1}" stroke-width="0.5" />\n`;
            svg += `    <polygon points="${x + gridSize},${y} ${x + gridSize},${y + gridSize} ${x},${y + gridSize}" fill="${color2}" stroke="${color2}" stroke-width="0.5" />\n`;
        }
    }
}

svg += '  </g>\n';
svg += '</svg>';

fs.writeFileSync('public/bg-mesh.svg', svg);
console.log('Successfully generated dense low-poly mesh');