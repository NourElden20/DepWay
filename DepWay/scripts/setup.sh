#!/bin/bash

# Dockerization Platform Setup Script
echo "🐳 Setting up Dockerization Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your configuration"
fi

# Create temp directory
echo "📁 Creating temp directory..."
mkdir -p temp

# Set permissions
echo "🔐 Setting permissions..."
chmod +x scripts/*.sh

echo "✅ Setup completed successfully!"
echo ""
echo "🚀 To start the application:"
echo "   npm run dev"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend will be available at: http://localhost:5000"
echo ""
echo "📚 Don't forget to:"
echo "   1. Configure your .env file"
echo "   2. Set up GitHub Personal Access Token"
echo "   3. Set up Docker Hub credentials"
echo "   4. Run 'docker login' to authenticate with Docker Hub"
