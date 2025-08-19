# Sebastjan Cizel's Personal Website

[![Deploy MkDocs to GitHub Pages](https://github.com/sebastjancizel/sebastjancizel.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/sebastjancizel/sebastjancizel.github.io/actions/workflows/deploy.yml)

A modern, content-focused personal website built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). This site serves as both a portfolio and a blog, focusing on machine learning, mathematics, and research.

🌐 **Live Site:** [sebastjancizel.github.io](https://sebastjancizel.github.io)

## ✨ Features

- **📱 Responsive Design** - Beautiful Material Design that works on all devices
- **✍️ Blog Integration** - Full-featured blog with RSS feeds, categories, and tags
- **🎨 Custom Animations** - Smooth animations and transitions for enhanced UX
- **🔍 Advanced Search** - Powerful search functionality across all content
- **🌓 Dark Mode** - Automatic dark/light mode switching
- **⚡ Fast Performance** - Static site generation for optimal speed
- **📊 SEO Optimized** - Social cards, meta tags, and search engine optimization
- **🧮 Math Support** - LaTeX/MathJax support for mathematical expressions

## 🛠️ Tech Stack

- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Static site generator with Material Design
- **[uv](https://docs.astral.sh/uv/)** - Fast Python package and project manager
- **[Python](https://python.org)** - Required for MkDocs and plugins
- **[GitHub Actions](https://github.com/features/actions)** - Automated deployment pipeline
- **[GitHub Pages](https://pages.github.com/)** - Free, reliable hosting

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- [uv](https://docs.astral.sh/uv/) - Fast Python package manager (automatically installed by setup script)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/sebastjancizel/sebastjancizel.github.io.git
   cd sebastjancizel.github.io
   ```

2. **Run the setup script**
   ```bash
   make setup
   ```
   Or manually:
   ```bash
   ./scripts/setup.sh
   ```
   This will automatically install uv (if needed) and sync all dependencies.

3. **Start the development server**
   ```bash
   make dev
   ```
   The site will be available at `http://127.0.0.1:8000`

   **Note:** uv automatically manages the virtual environment for you!

## 📝 Development Workflow

### Available Commands

| Command | Description |
|---------|-------------|
| `make setup` | Set up development environment with uv |
| `make sync` | Sync dependencies using uv (preferred) |
| `make dev` | Start development server with hot reload |
| `make build` | Build site for production |
| `make clean` | Clean build artifacts |
| `make install` | Install dependencies using pip (fallback) |

### Development Server
```bash
# Start development server
make dev

# Alternative using uv directly
uv run mkdocs serve
```

The development server features:
- 🔄 **Hot reload** - Changes are reflected immediately
- 📱 **Mobile preview** - Test responsive design
- 🔍 **Live search** - Search functionality works in development

### Building for Production
```bash
# Build the site
make build

# Output will be in the 'site/' directory
ls site/
```

## 📁 Project Structure

```
sebastjancizel.github.io/
├── 📄 mkdocs.yml              # Main configuration file
├── 📁 docs/                   # Main content directory
│   ├── 📄 index.md           # Homepage
│   ├── 📄 about.md           # About page
│   ├── 📄 research.md        # Research page
│   ├── 📄 portfolio.md       # Portfolio page
│   ├── 📁 assets/            # Images and static files
│   ├── 📁 stylesheets/       # Custom CSS
│   └── 📁 javascripts/       # Custom JavaScript
├── 📁 blog/                   # Blog content
│   ├── 📄 index.md           # Blog homepage
│   ├── 📄 .authors.yml       # Author information
│   └── 📁 posts/             # Blog posts
├── 📁 scripts/                # Development scripts
│   ├── 🔧 setup.sh           # Environment setup
│   ├── 🔧 dev.sh             # Development server
│   └── 🔧 build.sh           # Production build
├── 📁 .github/workflows/      # GitHub Actions
│   └── 📄 deploy.yml         # Deployment workflow
├── 📄 pyproject.toml          # Python project configuration & dependencies
├── 📄 requirements.txt        # Python dependencies (fallback)
├── 📄 Makefile               # Build commands
└── 📄 README.md              # This file
```

## ✍️ Content Management

### Writing Blog Posts

1. Create a new Markdown file in `blog/posts/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   date: 2025-01-19
   authors:
     - sebastjan
   categories:
     - Machine Learning
   tags:
     - research
     - tutorial
   ---
   
   # Your Post Title
   
   Your content here...
   ```

3. The post will automatically appear in the blog index

### Adding Pages

1. Create a new Markdown file in `docs/`
2. Add it to the navigation in `mkdocs.yml`:
   ```yaml
   nav:
     - Home: index.md
     - New Page: new-page.md
   ```

### Managing Assets

- **Images**: Place in `docs/assets/images/`
- **Documents**: Place in `docs/assets/files/`
- **Custom CSS**: Add to `docs/stylesheets/extra.css`
- **Custom JS**: Add to `docs/javascripts/`

## 🎨 Customization

### Theme Configuration

The site uses Material for MkDocs with custom styling. Key customization files:

- `mkdocs.yml` - Main configuration, theme settings, plugins
- `docs/stylesheets/extra.css` - Custom CSS and animations
- `docs/javascripts/mathjax.js` - Math rendering configuration

### Custom Animations

The site includes several custom animations defined in `extra.css`:
- **fadeInUp** - Content appearance animation
- **slideInLeft** - Navigation animation
- **float** - Profile picture hover effect

### Color Scheme

The site uses a custom purple color scheme:
- **Primary**: Deep Purple (#673ab7)
- **Light**: Purple (#9c27b0)
- **Dark**: Deep Purple (#512da8)

## 🚀 Deployment

### Automatic Deployment (Recommended)

The site automatically deploys via GitHub Actions when changes are pushed to the `master` or `main` branch.

**Setup Steps:**
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push changes to trigger deployment

### Manual Deployment

```bash
# Build the site
make build

# Deploy using GitHub CLI (if installed)
gh-pages -d site

# Or manually upload the 'site/' directory
```

## 🔧 Configuration

### Key Configuration Files

#### `mkdocs.yml`
Main configuration file containing:
- Site metadata
- Theme configuration
- Plugin settings
- Navigation structure
- Extensions and customizations

#### `pyproject.toml`
Main Python project configuration and dependencies using modern Python packaging standards:
```toml
[project]
dependencies = [
    "mkdocs-material>=9.5.0",
    "mkdocs-rss-plugin>=1.6.0", 
    "mkdocs-minify-plugin>=0.6.0",
    "pillow>=10.0.0",
    "cairosvg>=2.6.0",
]
```

#### `requirements.txt`
Fallback dependencies file for compatibility with older tools.

### Plugin Configuration

The site uses several MkDocs plugins:
- **Blog plugin** - Blog functionality with categories, tags, and RSS
- **RSS plugin** - Generate RSS feeds for blog posts
- **Search plugin** - Advanced search functionality
- **Minify plugin** - Optimize HTML output

## 📊 Performance & SEO

### Performance Features
- ⚡ Static site generation for fast loading
- 🗜️ Automatic HTML minification
- 📱 Responsive images and lazy loading
- 🔍 Efficient search indexing

### SEO Features
- 📋 Automatic meta tags generation
- 🔗 Social media cards
- 📄 Sitemap generation
- 🤖 Robots.txt
- 📊 Structured data markup

## 🤝 Contributing

### Making Changes

1. Create a feature branch
2. Make your changes
3. Test locally with `make dev`
4. Create a pull request

### Content Guidelines

- Use clear, descriptive headings
- Include alt text for images
- Follow Markdown best practices
- Test on mobile devices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

### Common Issues

**Build Errors:**
```bash
# Clean and rebuild
make clean
make build
```

**Development Server Issues:**
```bash
# Restart the server
Ctrl+C
make dev
```

**Python Environment Issues:**
```bash
# Clean and reinstall with uv
make clean
make setup
```

### Getting Help

- 📖 [Material for MkDocs Documentation](https://squidfunk.github.io/mkdocs-material/)
- ⚡ [uv Documentation](https://docs.astral.sh/uv/)
- 💬 [MkDocs Community](https://github.com/mkdocs/mkdocs/discussions)
- 📧 [Contact me](mailto:sebastjancizel@gmail.com) for specific questions

---

**Built with ❤️ using Material for MkDocs and ⚡ uv**
