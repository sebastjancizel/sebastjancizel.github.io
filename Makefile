# Makefile for Material MkDocs site

.PHONY: help setup dev build clean install serve deploy sync

# Default target
help:
	@echo "Available commands:"
	@echo "  setup    - Set up the development environment with uv"
	@echo "  sync     - Sync dependencies using uv"
	@echo "  install  - Install dependencies (fallback to pip)"
	@echo "  dev      - Start development server with hot reload"
	@echo "  serve    - Start development server"
	@echo "  build    - Build the site for production"
	@echo "  clean    - Clean build artifacts"
	@echo "  deploy   - Deploy to GitHub Pages"

# Set up development environment with uv
setup:
	@chmod +x scripts/setup.sh
	@./scripts/setup.sh

# Sync dependencies using uv (preferred)
sync:
	@echo "📦 Syncing dependencies with uv..."
	uv sync

# Install dependencies (fallback to pip)
install:
	@echo "📦 Installing dependencies with pip (fallback)..."
	pip install -r requirements.txt

# Start development server
dev:
	@chmod +x scripts/dev.sh
	@./scripts/dev.sh

# Alternative serve command
serve: dev

# Build for production
build:
	@chmod +x scripts/build.sh
	@./scripts/build.sh

# Clean build artifacts
clean:
	rm -rf site/
	rm -rf .cache/
	find . -type d -name __pycache__ -delete
	find . -type f -name "*.pyc" -delete

# Deploy to GitHub Pages (manual deployment)
deploy: build
	@echo "🚀 Deploying to GitHub Pages..."
	@echo "📝 Make sure to push your changes to trigger the GitHub Action"
	@echo "🔗 GitHub Action will automatically deploy from master/main branch"
