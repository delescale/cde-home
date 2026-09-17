# Code de l’Escale

A retro-inspired landing page built with HTML, CSS, and vanilla JavaScript. The logo is composed of styled text and CSS shapes, with mouse-driven parallax and automatic dark mode.

## Local preview

Open `index.html` directly in your browser, or serve this directory with Python 3:

```sh
python3 -m http.server 8000
```

Visit [localhost:8000](http://localhost:8000). No dependencies or build step are required. Fonts are bundled locally, so the page also works offline.

## Features

- Responsive logo with a pink patterned triangle, yellow orbit, and pixel cursor.
- Parallax layers that follow the mouse and reset when it leaves.
- The logo's pixel cursor replaces the mouse pointer over the artwork and glides back into place on exit.
- Light and dark themes that follow the device preference.
- Reduced-motion support; touch input does not trigger parallax.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Logo markup and browser theme metadata |
| `styles.css` | Logo shapes, typography, responsive layout, themes, and motion styles |
| `parallax.js` | Pointer tracking and motion preference handling |
| `favicon.svg` | Simplified logo icon with light and dark backgrounds |
| `assets/` | Bundled fonts and their licenses |

## Deployment

The site can be hosted by any static web server. Publish `index.html`, `styles.css`, `parallax.js`, `favicon.svg`, and the `assets/` directory together.

For Cloudflare Pages, connect the GitHub repository and use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | Leave blank |
| Build output directory | `.` |

After deployment, add `delescale.com` through the Pages project's **Custom domains** settings.

## Font licenses

The bundled fonts use the SIL Open Font License. See [Goldman's license](assets/Goldman-OFL.txt) and [Racing Sans One's license](assets/OFL.txt).
