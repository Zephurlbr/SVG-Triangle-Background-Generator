# Triangle Background Generator

A simple script that generates a faceted mesh background as an SVG file.

## Preview

![Preview](Preview/preview.png)

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
