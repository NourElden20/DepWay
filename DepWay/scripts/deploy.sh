#!/bin/bash

# Dockerization Platform Deploy Script
echo "🚀 Deploying Dockerization Platform..."

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t dockerization-platform .

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Start new containers
echo "🚀 Starting new containers..."
docker-compose up -d

# Check if containers are running
echo "🔍 Checking container status..."
docker-compose ps

echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Application is available at: http://localhost:5000"
echo "📊 Check logs with: docker-compose logs -f"
echo "🛑 Stop with: docker-compose down"
