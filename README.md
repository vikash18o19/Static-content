# Markdown Single-Page Site (Vercel-ready)

A minimal, dependency-free (at build time) project that renders a local `content.md`
into a single HTML page using [Marked](https://marked.js.org/) and
[DOMPurify](https://github.com/cure53/DOMPurify) at runtime via CDN.

## Project Structure
```text
/
├── content.md   # Your content. Edit this file to update the page.
├── index.html   # The only page; loads and renders content.md
├── script.js    # Fetches + renders Markdown safely
└── styles.css   # Styling (dark/light mode aware)
```

## Local Preview
You can serve the folder locally with any static server, for example:
```bash
# Using Python 3
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy to Vercel
**Option 1: Drag-and-drop**
1. Zip the project folder (already provided) and upload at https://vercel.com/new
2. Vercel will detect a static project. No framework or build step needed.
3. Deploy.

**Option 2: CLI**
```bash
npm i -g vercel
vercel --prod
```

## Customization
- Change the site title: edit the `<title>` tag in `index.html`.
- Use your own Markdown file name: update the `fetch('content.md')` path in `script.js` to match.
- Add analytics or meta tags in `index.html` head.
