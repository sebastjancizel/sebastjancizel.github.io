#!/bin/bash
# Setup script for new environment

echo "🔧 Setting up Material MkDocs environment with uv..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3.8 or higher and try again."
    exit 1
fi

echo "🐍 Python version: $(python3 --version)"

# Check if uv is installed, if not, install it
if ! command -v uv &> /dev/null; then
    echo "📦 uv not found, installing uv..."
    if command -v brew &> /dev/null; then
        echo "🍺 Installing uv via Homebrew..."
        brew install uv
    elif command -v curl &> /dev/null; then
        echo "🌐 Installing uv via curl..."
        curl -LsSf https://astral.sh/uv/install.sh | sh
        # Add uv to PATH for current session
        export PATH="$HOME/.cargo/bin:$PATH"
    else
        echo "❌ Cannot install uv automatically. Please install uv manually:"
        echo "Visit: https://docs.astral.sh/uv/getting-started/installation/"
        exit 1
    fi
fi

echo "⚡ uv version: $(uv --version)"

# Sync dependencies using uv
echo "📦 Installing dependencies with uv..."
uv sync

echo "✅ Setup completed successfully!"
echo ""
echo "To start developing:"
echo "1. Start the development server: ./scripts/dev.sh"
echo "2. Or use: make dev"
echo ""
echo "Note: uv automatically manages the virtual environment for you!"
