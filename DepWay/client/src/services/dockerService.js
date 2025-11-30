import axios from 'axios';

class DockerService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || '';
  }

  // Dockerize a project
  async dockerizeProject(projectData) {
    try {
      const response = await axios.post(`${this.baseURL}/api/dockerize`, projectData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to dockerize project: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get Docker images
  async getImages() {
    try {
      const response = await axios.get(`${this.baseURL}/api/images`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Docker images: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get Docker containers
  async getContainers() {
    try {
      const response = await axios.get(`${this.baseURL}/api/containers`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Docker containers: ${error.response?.data?.error || error.message}`);
    }
  }

  // Start a container
  async startContainer(containerId) {
    try {
      const response = await axios.post(`${this.baseURL}/api/containers/${containerId}/start`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to start container: ${error.response?.data?.error || error.message}`);
    }
  }

  // Stop a container
  async stopContainer(containerId) {
    try {
      const response = await axios.post(`${this.baseURL}/api/containers/${containerId}/stop`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to stop container: ${error.response?.data?.error || error.message}`);
    }
  }

  // Remove a container
  async removeContainer(containerId) {
    try {
      const response = await axios.delete(`${this.baseURL}/api/containers/${containerId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to remove container: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get container logs
  async getContainerLogs(containerId, options = {}) {
    try {
      const params = {
        stdout: true,
        stderr: true,
        ...options
      };
      
      const response = await axios.get(`${this.baseURL}/api/containers/${containerId}/logs`, {
        params
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch container logs: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get container stats
  async getContainerStats(containerId) {
    try {
      const response = await axios.get(`${this.baseURL}/api/containers/${containerId}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch container stats: ${error.response?.data?.error || error.message}`);
    }
  }

  // Create a container
  async createContainer(containerData) {
    try {
      const response = await axios.post(`${this.baseURL}/api/containers`, containerData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create container: ${error.response?.data?.error || error.message}`);
    }
  }

  // Build Docker image
  async buildImage(buildData) {
    try {
      const response = await axios.post(`${this.baseURL}/api/images/build`, buildData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to build Docker image: ${error.response?.data?.error || error.message}`);
    }
  }

  // Remove Docker image
  async removeImage(imageId) {
    try {
      const response = await axios.delete(`${this.baseURL}/api/images/${imageId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to remove Docker image: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get Docker system info
  async getSystemInfo() {
    try {
      const response = await axios.get(`${this.baseURL}/api/system/info`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Docker system info: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get Docker system events
  async getSystemEvents() {
    try {
      const response = await axios.get(`${this.baseURL}/api/system/events`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Docker system events: ${error.response?.data?.error || error.message}`);
    }
  }

  // Pull Docker image
  async pullImage(imageName) {
    try {
      const response = await axios.post(`${this.baseURL}/api/images/pull`, { image: imageName });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to pull Docker image: ${error.response?.data?.error || error.message}`);
    }
  }

  // Push Docker image
  async pushImage(imageName) {
    try {
      const response = await axios.post(`${this.baseURL}/api/images/push`, { image: imageName });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to push Docker image: ${error.response?.data?.error || error.message}`);
    }
  }

  // Tag Docker image
  async tagImage(imageId, tag) {
    try {
      const response = await axios.post(`${this.baseURL}/api/images/${imageId}/tag`, { tag });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to tag Docker image: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get Docker networks
  async getNetworks() {
    try {
      const response = await axios.get(`${this.baseURL}/api/networks`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Docker networks: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get Docker volumes
  async getVolumes() {
    try {
      const response = await axios.get(`${this.baseURL}/api/volumes`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Docker volumes: ${error.response?.data?.error || error.message}`);
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await axios.get(`${this.baseURL}/api/health`);
      return response.data;
    } catch (error) {
      throw new Error(`Docker service is not available: ${error.message}`);
    }
  }
}

export default new DockerService();
