#!/bin/bash
# Development server script

echo "🚀 Starting MkDocs development server..."
echo "📝 Site will be available at: http://127.0.0.1:8000"
echo "🔄 Changes will be automatically reloaded"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

mkdocs serve --dev-addr=127.0.0.1:8000
