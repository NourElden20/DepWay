# User Guide

## Getting Started

### 1. First Time Setup

#### Create GitHub Personal Access Token
1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Click "Generate new token" > "Generate new token (classic)"
3. Give it a name like "Dockerization Platform"
4. Select scopes: `repo`, `user`
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)

#### Create Docker Hub Account
1. Go to [Docker Hub](https://hub.docker.com)
2. Sign up for a free account
3. Note your username
4. Login to Docker on your machine: `docker login`

### 2. Initial Configuration

#### GitHub Authentication
1. Open the application
2. Go to the "الرئيسية" (Home) tab
3. Enter your GitHub Personal Access Token
4. Click "تسجيل الدخول" (Login)
5. You should see a welcome message with your name

#### Docker Hub Configuration
1. Enter your Docker Hub username
2. The system will validate the username format
3. Make sure you're logged into Docker: `docker login`

#### Port Configuration
1. Set the ports you want to use for your projects
2. Default ports are suggested based on project type
3. You can add/remove ports as needed

## Using the Platform

### 1. Viewing Projects

#### Access Projects Tab
1. Click on "المشاريع" (Projects) in the navigation
2. Click "تحديث المشاريع" (Update Projects) to fetch your GitHub repositories
3. Use the search bar to find specific projects
4. Filter by programming language

#### Project Information
Each project card shows:
- Project name
- Description
- Programming language
- Last updated date
- "Dockerize" button

### 2. Dockerizing Projects

#### Select a Project
1. Click on any project card
2. Review the project details
3. Click "Dockerize" button

#### Dockerization Process
The system will automatically:
1. Analyze the project structure
2. Create an appropriate Dockerfile
3. Build the Docker image
4. Push to Docker Hub
5. Clean up temporary files

#### Monitor Progress
- Watch the progress bar
- Check the status messages
- View the generated Dockerfile
- See the final image name

### 3. Managing Docker Resources

#### View Docker Status
1. Go to "Docker" tab
2. View running containers
3. Check available images
4. Monitor resource usage

#### Container Management
- **Start Container**: Click the green "تشغيل" (Start) button
- **Stop Container**: Click the red "إيقاف" (Stop) button
- **View Logs**: Check container status and ports

#### Image Management
- View all Docker images
- See image sizes and creation dates
- Check image tags and repositories

### 4. Statistics and Monitoring

#### View Statistics
1. Go to "الإحصائيات" (Statistics) tab
2. See total projects, images, and containers
3. Monitor active containers
4. Track usage over time

#### Real-time Updates
- Statistics update automatically
- Refresh data manually if needed
- View detailed breakdowns

## Advanced Features

### 1. Custom Port Configuration

#### Adding Ports
1. Go to "الرئيسية" (Home) tab
2. In the "إدارة المنافذ" (Port Management) section
3. Click "إضافة منفذ" (Add Port)
4. Enter the port number (1000-65535)

#### Removing Ports
1. Click the red "حذف" (Delete) button next to any port
2. You must keep at least one port

#### Port Suggestions
Common port mappings:
- **3000**: React, Next.js, Node.js
- **8000**: Python Flask, Django
- **8080**: Java Spring Boot, Vue.js
- **5000**: Python Flask (default)
- **80**: HTTP (production)
- **443**: HTTPS (production)

### 2. Project Analysis

#### Supported Languages
The platform automatically detects:
- **JavaScript/TypeScript**: Node.js, React, Vue, Angular
- **Python**: Flask, Django, FastAPI
- **Java**: Spring Boot, Maven, Gradle
- **Ruby**: Rails, Sinatra
- **PHP**: Laravel, Symfony
- **Go**: Gin, Echo
- **Rust**: Actix, Rocket

#### Automatic Dockerfile Generation
The system creates optimized Dockerfiles based on:
- Project structure analysis
- Package manager detection
- Framework identification
- Best practices implementation

### 3. Docker Hub Integration

#### Image Naming
Images are named as: `your-username/project-name`
- Username from Docker Hub configuration
- Project name from GitHub repository

#### Automatic Push
- Images are automatically pushed to Docker Hub
- Tags are set to "latest" by default
- You can pull images from anywhere: `docker pull your-username/project-name`

### 4. Troubleshooting

#### Common Issues

**GitHub Token Issues**
- Ensure token has correct permissions
- Check token hasn't expired
- Verify token format (starts with `ghp_`)

**Docker Hub Issues**
- Make sure you're logged in: `docker login`
- Check username format (lowercase, no spaces)
- Verify Docker Hub account is active

**Port Conflicts**
- Check if ports are already in use
- Use different port numbers
- Stop conflicting services

**Build Failures**
- Check project structure
- Ensure all dependencies are listed
- Verify Docker is running

#### Getting Help

**Check Logs**
1. Go to "Docker" tab
2. View container logs
3. Check for error messages

**Reset Configuration**
1. Clear browser storage
2. Re-enter GitHub token
3. Re-configure Docker Hub

**Contact Support**
- Check the "الدليل" (Tutorial) tab
- Review error messages
- Contact the development team

## Best Practices

### 1. Project Preparation

#### Before Dockerizing
- Ensure your project has a clear entry point
- List all dependencies in package files
- Test your project locally first
- Remove unnecessary files

#### Project Structure
- Keep source code in root directory
- Use standard package managers
- Include proper documentation
- Follow language-specific conventions

### 2. Security Considerations

#### Token Management
- Use minimal required permissions
- Rotate tokens regularly
- Don't share tokens
- Use environment variables

#### Docker Security
- Keep base images updated
- Use specific image tags
- Scan images for vulnerabilities
- Limit container privileges

### 3. Performance Optimization

#### Image Size
- Use multi-stage builds
- Remove unnecessary files
- Use Alpine Linux base images
- Optimize layer caching

#### Container Resources
- Set memory limits
- Configure CPU limits
- Monitor resource usage
- Use health checks

## Tips and Tricks

### 1. Efficient Workflow

#### Batch Operations
- Process multiple projects
- Use consistent naming
- Organize by project type
- Keep track of configurations

#### Automation
- Set up CI/CD pipelines
- Use webhooks for updates
- Automate deployments
- Monitor changes

### 2. Advanced Usage

#### Custom Dockerfiles
- Override automatic generation
- Add custom configurations
- Include additional services
- Optimize for production

#### Integration
- Connect with other tools
- Use API endpoints
- Automate workflows
- Monitor deployments

### 3. Maintenance

#### Regular Updates
- Update base images
- Refresh dependencies
- Monitor security updates
- Test compatibility

#### Monitoring
- Track resource usage
- Monitor performance
- Check error logs
- Update configurations

## FAQ

### Q: Can I use this with private repositories?
A: Yes, as long as your GitHub token has access to private repos.

### Q: What if my project uses a database?
A: The platform can detect database dependencies and create docker-compose files.

### Q: Can I customize the generated Dockerfiles?
A: Yes, you can modify the Dockerfiles after generation.

### Q: Is there a limit on project size?
A: Large projects may take longer to process, but there's no hard limit.

### Q: Can I use this offline?
A: No, the platform requires internet access for GitHub and Docker Hub.

### Q: What happens to my data?
A: All data is stored locally and in your GitHub/Docker Hub accounts.

### Q: Can I use this for commercial projects?
A: Yes, the platform is open source and free to use.

### Q: How do I update the platform?
A: Pull the latest changes and restart the application.

### Q: Can I contribute to the project?
A: Yes, contributions are welcome! Check the GitHub repository.

### Q: Where can I get help?
A: Check the tutorial tab, documentation, or contact the development team.
