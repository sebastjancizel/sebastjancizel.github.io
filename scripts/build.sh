#!/bin/bash
# Build script for production

echo "🏗️  Building site for production with uv..."

# Clean previous build
if [ -d "site" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf site
fi

# Build the site
echo "📦 Building MkDocs site..."
uv run mkdocs build --strict

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Site built to: site/"
    echo "📊 Site size:"
    du -sh site/
else
    echo "❌ Build failed!"
    exit 1
fi
