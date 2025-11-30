import axios from 'axios';
import { GITHUB_CONFIG } from '../utils/constants';

class GitHubService {
  constructor() {
    this.baseURL = GITHUB_CONFIG.API_BASE;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
  }

  // Get authenticated headers
  getHeaders() {
    return {
      'Authorization': `token ${this.token}`,
      'Accept': 'application/vnd.github.v3+json'
    };
  }

  // Get user information
  async getUser() {
    try {
      const response = await axios.get(`${this.baseURL}/user`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get user repositories
  async getRepos(options = {}) {
    try {
      const params = {
        sort: 'updated',
        per_page: 100,
        ...options
      };
      
      const response = await axios.get(`${this.baseURL}/user/repos`, {
        headers: this.getHeaders(),
        params
      });
      
      return response.data.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        language: repo.language,
        clone_url: repo.clone_url,
        default_branch: repo.default_branch,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        private: repo.private,
        archived: repo.archived,
        disabled: repo.disabled
      }));
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository details
  async getRepo(owner, repo) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository contents
  async getRepoContents(owner, repo, path = '') {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/contents/${path}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository contents: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository languages
  async getRepoLanguages(owner, repo) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/languages`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository languages: ${error.response?.data?.message || error.message}`);
    }
  }

  // Search repositories
  async searchRepos(query, options = {}) {
    try {
      const params = {
        q: query,
        sort: 'updated',
        per_page: 30,
        ...options
      };
      
      const response = await axios.get(`${this.baseURL}/search/repositories`, {
        headers: this.getHeaders(),
        params
      });
      
      return {
        total_count: response.data.total_count,
        items: response.data.items.map(repo => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          language: repo.language,
          clone_url: repo.clone_url,
          default_branch: repo.default_branch,
          updated_at: repo.updated_at,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          open_issues_count: repo.open_issues_count,
          private: repo.private,
          archived: repo.archived,
          disabled: repo.disabled
        }))
      };
    } catch (error) {
      throw new Error(`Failed to search repositories: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository branches
  async getRepoBranches(owner, repo) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/branches`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository branches: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository tags
  async getRepoTags(owner, repo) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/tags`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository tags: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository commits
  async getRepoCommits(owner, repo, options = {}) {
    try {
      const params = {
        per_page: 30,
        ...options
      };
      
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/commits`, {
        headers: this.getHeaders(),
        params
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository commits: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository issues
  async getRepoIssues(owner, repo, options = {}) {
    try {
      const params = {
        state: 'open',
        per_page: 30,
        ...options
      };
      
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/issues`, {
        headers: this.getHeaders(),
        params
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository issues: ${error.response?.data?.message || error.message}`);
    }
  }

  // Get repository pull requests
  async getRepoPullRequests(owner, repo, options = {}) {
    try {
      const params = {
        state: 'open',
        per_page: 30,
        ...options
      };
      
      const response = await axios.get(`${this.baseURL}/repos/${owner}/${repo}/pulls`, {
        headers: this.getHeaders(),
        params
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repository pull requests: ${error.response?.data?.message || error.message}`);
    }
  }

  // Validate token
  async validateToken(token) {
    try {
      this.setToken(token);
      await this.getUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get rate limit status
  async getRateLimit() {
    try {
      const response = await axios.get(`${this.baseURL}/rate_limit`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch rate limit: ${error.response?.data?.message || error.message}`);
    }
  }
}

export default new GitHubService();
