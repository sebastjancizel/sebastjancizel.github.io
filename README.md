# sebastjancizel.github.io

Personal website for Sebastjan Cizel.

**Live:** [sebastjancizel.github.io](https://sebastjancizel.github.io)

## Structure

```
├── index.html          # Homepage
├── about.html          # About page
├── css/style.css       # Styles
├── js/main.js          # Scripts
├── data/resume.json    # Resume data (rendered dynamically)
├── blog/               # Blog posts
└── assets/             # Images, PDF resume
```

## Development

No build step required. Open `index.html` in a browser or serve locally:

```bash
python -m http.server 8000
```

## Deployment

Pushes to `master` or `main` deploy automatically via GitHub Actions to GitHub Pages.
