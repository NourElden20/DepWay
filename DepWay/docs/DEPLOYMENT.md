# Deployment Guide

## Prerequisites

### System Requirements
- Node.js 14+ 
- Docker 20+
- Git 2.0+
- 4GB RAM minimum
- 10GB free disk space

### Accounts Required
- GitHub account with Personal Access Token
- Docker Hub account
- (Optional) Cloud provider account for production deployment

## Local Development

### 1. Clone Repository
```bash
git clone https://github.com/your-username/dockerization-platform.git
cd dockerization-platform
```

### 2. Install Dependencies
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration
```bash
# Copy environment template
cp env.example .env

# Edit .env file with your configuration
nano .env
```

### 4. Start Development Server
```bash
# Start backend (Terminal 1)
npm run dev

# Start frontend (Terminal 2)
cd client
npm start
```

### 5. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Production Deployment

### Using Docker Compose

#### 1. Build and Deploy
```bash
# Build and start services
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

#### 2. Environment Variables
Create a `.env` file with production values:
```env
NODE_ENV=production
PORT=5000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
DOCKER_HUB_USERNAME=your_dockerhub_username
DOCKER_HUB_PASSWORD=your_dockerhub_password
```

### Using Docker

#### 1. Build Image
```bash
docker build -t dockerization-platform .
```

#### 2. Run Container
```bash
docker run -d \
  --name dockerization-app \
  -p 5000:5000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e NODE_ENV=production \
  dockerization-platform
```

### Cloud Deployment

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set GITHUB_CLIENT_ID=your_github_client_id
heroku config:set GITHUB_CLIENT_SECRET=your_github_client_secret

# Deploy
git push heroku main
```

#### AWS EC2
```bash
# Connect to EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Docker
sudo apt update
sudo apt install docker.io docker-compose

# Clone repository
git clone https://github.com/your-username/dockerization-platform.git
cd dockerization-platform

# Configure environment
cp env.example .env
nano .env

# Start services
docker-compose up -d
```

#### DigitalOcean App Platform
1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on push to main branch

## Configuration

### GitHub Setup
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token with scopes: `repo`, `user`
3. Copy token to `.env` file

### Docker Hub Setup
1. Create Docker Hub account
2. Login: `docker login`
3. Add credentials to `.env` file

### SSL/HTTPS (Production)
```bash
# Using Let's Encrypt
sudo apt install certbot
sudo certbot --nginx -d your-domain.com

# Or using Cloudflare
# Set SSL/TLS encryption mode to "Full"
```

## Monitoring

### Health Checks
```bash
# Check application health
curl http://localhost:5000/health

# Check Docker status
docker ps
docker-compose ps
```

### Logs
```bash
# Application logs
docker-compose logs -f

# Docker logs
docker logs dockerization-app
```

### Performance Monitoring
- Use tools like New Relic, DataDog, or built-in monitoring
- Monitor Docker resource usage
- Set up alerts for high CPU/memory usage

## Security

### Environment Variables
- Never commit `.env` files
- Use strong, unique tokens
- Rotate tokens regularly

### Docker Security
```bash
# Run containers as non-root user
docker run --user 1000:1000 your-image

# Limit container resources
docker run --memory=512m --cpus=1 your-image
```

### Network Security
- Use reverse proxy (nginx) for production
- Enable HTTPS
- Configure firewall rules
- Use VPN for sensitive deployments

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 PID
```

#### Docker Permission Denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Logout and login again
```

#### GitHub API Rate Limits
- Use authenticated requests
- Implement caching
- Consider GitHub App instead of Personal Access Token

#### Docker Hub Rate Limits
- Upgrade to paid plan
- Use private registry
- Implement image caching

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Docker debug
docker run --rm -it your-image /bin/sh
```

## Backup and Recovery

### Database Backup
```bash
# Backup Docker volumes
docker run --rm -v dockerization_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .
```

### Configuration Backup
```bash
# Backup configuration
tar czf config_backup.tar.gz .env docker-compose.yml
```

### Recovery
```bash
# Restore from backup
tar xzf config_backup.tar.gz
docker-compose up -d
```

## Scaling

### Horizontal Scaling
```yaml
# docker-compose.yml
services:
  app:
    deploy:
      replicas: 3
    ports:
      - "5000-5002:5000"
```

### Load Balancing
```nginx
# nginx.conf
upstream dockerization {
    server localhost:5000;
    server localhost:5001;
    server localhost:5002;
}

server {
    listen 80;
    location / {
        proxy_pass http://dockerization;
    }
}
```

## Maintenance

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

### Cleanup
```bash
# Remove unused images
docker image prune -a

# Remove unused containers
docker container prune

# Remove unused volumes
docker volume prune
```
