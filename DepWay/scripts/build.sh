#!/bin/bash

# Dockerization Platform Build Script
echo "🏗️ Building Dockerization Platform..."

# Build frontend
echo "📦 Building frontend..."
cd client
npm run build
cd ..

# Create production build
echo "📦 Creating production build..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "🚀 To run in production:"
echo "   npm start"
echo ""
echo "🐳 To run with Docker:"
echo "   docker-compose up --build"
