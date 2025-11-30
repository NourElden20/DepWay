// Application constants
export const APP_CONFIG = {
  NAME: 'Dockerization Platform',
  VERSION: '1.0.0',
  DESCRIPTION: 'منصة متكاملة لتحويل مشاريع GitHub إلى Docker containers',
  AUTHOR: 'Dockerization Team',
  LICENSE: 'MIT'
};

// API endpoints
export const API_ENDPOINTS = {
  REPOS: '/api/repos',
  REPO: '/api/repo',
  DOCKERIZE: '/api/dockerize',
  IMAGES: '/api/images',
  CONTAINERS: '/api/containers',
  START_CONTAINER: '/api/containers',
  STOP_CONTAINER: '/api/containers'
};

// GitHub configuration
export const GITHUB_CONFIG = {
  API_BASE: 'https://api.github.com',
  TOKEN_PATTERN: /^gh[po]_[a-zA-Z0-9]{36}$/,
  REQUIRED_SCOPES: ['repo', 'user']
};

// Docker configuration
export const DOCKER_CONFIG = {
  DEFAULT_PORTS: [3000, 8000, 8080, 5000],
  SUPPORTED_LANGUAGES: [
    'JavaScript',
    'TypeScript', 
    'Python',
    'Java',
    'Ruby',
    'PHP',
    'Go',
    'Rust',
    'C++',
    'C#'
  ]
};

// UI configuration
export const UI_CONFIG = {
  THEME: {
    PRIMARY: '#667eea',
    SECONDARY: '#764ba2',
    SUCCESS: '#28a745',
    DANGER: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8'
  },
  BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1200px'
  }
};

// Language colors for syntax highlighting
export const LANGUAGE_COLORS = {
  'JavaScript': '#f7df1e',
  'TypeScript': '#3178c6',
  'Python': '#3776ab',
  'Java': '#f89820',
  'Ruby': '#cc342d',
  'PHP': '#777bb4',
  'Go': '#00add8',
  'Rust': '#000000',
  'C++': '#00599c',
  'C#': '#239120',
  'HTML': '#e34c26',
  'CSS': '#1572b6',
  'Vue': '#4fc08d',
  'React': '#61dafb'
};

// Port suggestions by language/framework
export const PORT_SUGGESTIONS = {
  'JavaScript': [3000, 8000],
  'TypeScript': [3000, 8000],
  'Python': [8000, 5000],
  'Java': [8080, 9090],
  'Ruby': [3000, 4000],
  'PHP': [8000, 80],
  'Go': [8080, 3000],
  'Rust': [8080, 3000],
  'C++': [8080, 3000],
  'C#': [5000, 5001]
};

// Default Dockerfile templates
export const DOCKERFILE_TEMPLATES = {
  'JavaScript': `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
  
  'Python': `FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]`,
  
  'Java': `FROM openjdk:11-jre-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]`
};

export default {
  APP_CONFIG,
  API_ENDPOINTS,
  GITHUB_CONFIG,
  DOCKER_CONFIG,
  UI_CONFIG,
  LANGUAGE_COLORS,
  PORT_SUGGESTIONS,
  DOCKERFILE_TEMPLATES
};
