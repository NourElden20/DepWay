import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// GitHub API functions
export const githubAPI = {
  // Get user repositories
  getRepos: (token) => 
    axios.get(`${API_BASE_URL}/api/repos`, {
      headers: { token }
    }),

  // Get repository details
  getRepo: (owner, repo, token) =>
    axios.get(`${API_BASE_URL}/api/repo/${owner}/${repo}`, {
      headers: { token }
    }),

  // Get user info
  getUser: (token) =>
    axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })
};

// Docker API functions
export const dockerAPI = {
  // Dockerize a project
  dockerize: (data) =>
    axios.post(`${API_BASE_URL}/api/dockerize`, data),

  // Get Docker images
  getImages: () =>
    axios.get(`${API_BASE_URL}/api/images`),

  // Get containers
  getContainers: () =>
    axios.get(`${API_BASE_URL}/api/containers`),

  // Start container
  startContainer: (containerId) =>
    axios.post(`${API_BASE_URL}/api/containers/${containerId}/start`),

  // Stop container
  stopContainer: (containerId) =>
    axios.post(`${API_BASE_URL}/api/containers/${containerId}/stop`)
};

// Utility functions
export const utils = {
  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Get language color
  getLanguageColor: (language) => {
    const colors = {
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
    return colors[language] || '#6c757d';
  },

  // Validate GitHub token
  validateGitHubToken: (token) => {
    return /^ghp_[a-zA-Z0-9]{36}$/.test(token) || /^gho_[a-zA-Z0-9]{36}$/.test(token);
  },

  // Validate Docker Hub username
  validateDockerHubUsername: (username) => {
    return /^[a-z0-9_-]+$/.test(username) && username.length >= 3;
  },

  // Validate port number
  validatePort: (port) => {
    const num = parseInt(port);
    return num >= 1000 && num <= 65535;
  }
};

export default {
  githubAPI,
  dockerAPI,
  utils
};
