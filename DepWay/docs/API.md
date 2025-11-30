# API Documentation

## Overview
The Dockerization Platform API provides endpoints for managing GitHub repositories, Docker containers, and project dockerization.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a GitHub Personal Access Token in the request headers:
```
Authorization: token YOUR_GITHUB_TOKEN
```

## Endpoints

### GitHub Integration

#### Get User Repositories
```http
GET /api/repos
```

**Headers:**
- `token`: GitHub Personal Access Token

**Response:**
```json
[
  {
    "id": 123456789,
    "name": "my-project",
    "full_name": "username/my-project",
    "description": "Project description",
    "language": "JavaScript",
    "clone_url": "https://github.com/username/my-project.git",
    "default_branch": "main",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Repository Details
```http
GET /api/repo/:owner/:repo
```

**Parameters:**
- `owner`: Repository owner
- `repo`: Repository name

**Headers:**
- `token`: GitHub Personal Access Token

**Response:**
```json
{
  "id": 123456789,
  "name": "my-project",
  "full_name": "username/my-project",
  "description": "Project description",
  "language": "JavaScript",
  "clone_url": "https://github.com/username/my-project.git",
  "default_branch": "main",
  "updated_at": "2024-01-01T00:00:00Z",
  "stargazers_count": 10,
  "forks_count": 5,
  "open_issues_count": 2
}
```

### Docker Management

#### Dockerize Project
```http
POST /api/dockerize
```

**Request Body:**
```json
{
  "repoUrl": "https://github.com/username/my-project.git",
  "projectName": "my-project",
  "ports": [3000, 8000],
  "dockerHubUsername": "my-dockerhub-username"
}
```

**Response:**
```json
{
  "success": true,
  "imageName": "my-dockerhub-username/my-project",
  "dockerfile": "FROM node:18-alpine\n...",
  "ports": [3000, 8000]
}
```

#### Get Docker Images
```http
GET /api/images
```

**Response:**
```json
[
  {
    "Id": "sha256:abc123...",
    "RepoTags": ["my-dockerhub-username/my-project:latest"],
    "Size": 104857600,
    "Created": 1640995200
  }
]
```

#### Get Containers
```http
GET /api/containers
```

**Response:**
```json
[
  {
    "Id": "container-id",
    "Names": ["/my-project"],
    "Image": "my-dockerhub-username/my-project:latest",
    "State": "running",
    "Status": "Up 2 hours",
    "Ports": [
      {
        "PrivatePort": 3000,
        "PublicPort": 3000,
        "Type": "tcp"
      }
    ]
  }
]
```

#### Start Container
```http
POST /api/containers/:id/start
```

**Parameters:**
- `id`: Container ID

**Response:**
```json
{
  "success": true
}
```

#### Stop Container
```http
POST /api/containers/:id/stop
```

**Parameters:**
- `id`: Container ID

**Response:**
```json
{
  "success": true
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "GitHub token required"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch repositories"
}
```

## Rate Limits
- GitHub API: 5000 requests per hour (authenticated)
- Docker Hub: 100 pulls per 6 hours (free tier)

## Examples

### Dockerize a Node.js Project
```bash
curl -X POST http://localhost:5000/api/dockerize \
  -H "Content-Type: application/json" \
  -d '{
    "repoUrl": "https://github.com/username/my-node-app.git",
    "projectName": "my-node-app",
    "ports": [3000],
    "dockerHubUsername": "my-dockerhub-username"
  }'
```

### Get User Repositories
```bash
curl -X GET http://localhost:5000/api/repos \
  -H "token: ghp_your_github_token"
```

### Start a Container
```bash
curl -X POST http://localhost:5000/api/containers/container-id/start
```
