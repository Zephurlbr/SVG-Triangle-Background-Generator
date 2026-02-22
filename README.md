# Low-Poly Background Generator

A simple Node.js script that generates a dark, faceted low-poly mesh background as an SVG file.

## Preview

![Preview](Preview/preview.png)

## Features

- Generates a 1920x1080 SVG with a dense triangle mesh
- Dark gradient fading to black at the bottom
- Faceted look with randomized color variations

## Usage

```bash
node scripts/generate-bg.js
```

Output: `public/bg-mesh.svg`

## Customization

Edit `scripts/generate-bg.js` to adjust:
- `width` / `height` - output dimensions
- `gridSize` - triangle density (lower = more triangles)
- `maxBrightness` - how bright the top area can be

## License

GPL-3.0
