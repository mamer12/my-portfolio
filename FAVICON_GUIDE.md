# Quick Favicon Setup

Run this command to generate favicons from your OG image:

```bash
# Install sharp for image processing
npm install -D sharp

# Or use online tool:
# https://realfavicongenerator.net/
```

Upload `public/og-image.jpg` to [RealFaviconGenerator](https://realfavicongenerator.net/) to generate:
- favicon.ico
- favicon-16x16.png  
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png

Place all generated files in the `public/` directory.
