// Storage service for managing local and session storage
class StorageService {
  constructor() {
    this.storage = localStorage;
    this.sessionStorage = sessionStorage;
  }

  // Local storage methods
  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting localStorage item:', error);
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue;
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing localStorage item:', error);
      return false;
    }
  }

  clear() {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Session storage methods
  setSessionItem(key, value) {
    try {
      this.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting sessionStorage item:', error);
      return false;
    }
  }

  getSessionItem(key, defaultValue = null) {
    try {
      const item = this.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting sessionStorage item:', error);
      return defaultValue;
    }
  }

  removeSessionItem(key) {
    try {
      this.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
      return false;
    }
  }

  clearSession() {
    try {
      this.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }

  // Application-specific storage methods
  setUser(user) {
    return this.setItem('user', user);
  }

  getUser() {
    return this.getItem('user');
  }

  setGithubToken(token) {
    return this.setItem('githubToken', token);
  }

  getGithubToken() {
    return this.getItem('githubToken');
  }

  setDockerHubUsername(username) {
    return this.setItem('dockerHubUsername', username);
  }

  getDockerHubUsername() {
    return this.getItem('dockerHubUsername');
  }

  setPorts(ports) {
    return this.setItem('ports', ports);
  }

  getPorts() {
    return this.getItem('ports', [3000]);
  }

  setActiveTab(tab) {
    return this.setItem('activeTab', tab);
  }

  getActiveTab() {
    return this.getItem('activeTab', 'home');
  }

  setTheme(theme) {
    return this.setItem('theme', theme);
  }

  getTheme() {
    return this.getItem('theme', 'light');
  }

  setLanguage(language) {
    return this.setItem('language', language);
  }

  getLanguage() {
    return this.getItem('language', 'ar');
  }

  setSettings(settings) {
    return this.setItem('settings', settings);
  }

  getSettings() {
    return this.getItem('settings', {});
  }

  // Project-specific storage
  setProjectHistory(projects) {
    return this.setItem('projectHistory', projects);
  }

  getProjectHistory() {
    return this.getItem('projectHistory', []);
  }

  addProjectToHistory(project) {
    const history = this.getProjectHistory();
    const existingIndex = history.findIndex(p => p.id === project.id);
    
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    history.unshift(project);
    
    // Keep only last 10 projects
    if (history.length > 10) {
      history.splice(10);
    }
    
    return this.setProjectHistory(history);
  }

  removeProjectFromHistory(projectId) {
    const history = this.getProjectHistory();
    const filtered = history.filter(p => p.id !== projectId);
    return this.setProjectHistory(filtered);
  }

  // Container-specific storage
  setContainerHistory(containers) {
    return this.setItem('containerHistory', containers);
  }

  getContainerHistory() {
    return this.getItem('containerHistory', []);
  }

  addContainerToHistory(container) {
    const history = this.getContainerHistory();
    const existingIndex = history.findIndex(c => c.id === container.id);
    
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    history.unshift(container);
    
    // Keep only last 20 containers
    if (history.length > 20) {
      history.splice(20);
    }
    
    return this.setContainerHistory(history);
  }

  // Image-specific storage
  setImageHistory(images) {
    return this.setItem('imageHistory', images);
  }

  getImageHistory() {
    return this.getItem('imageHistory', []);
  }

  addImageToHistory(image) {
    const history = this.getImageHistory();
    const existingIndex = history.findIndex(i => i.id === image.id);
    
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    history.unshift(image);
    
    // Keep only last 15 images
    if (history.length > 15) {
      history.splice(15);
    }
    
    return this.setImageHistory(history);
  }

  // Search history
  setSearchHistory(searches) {
    return this.setItem('searchHistory', searches);
  }

  getSearchHistory() {
    return this.getItem('searchHistory', []);
  }

  addSearchToHistory(search) {
    const history = this.getSearchHistory();
    const existingIndex = history.findIndex(s => s === search);
    
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }
    
    history.unshift(search);
    
    // Keep only last 20 searches
    if (history.length > 20) {
      history.splice(20);
    }
    
    return this.setSearchHistory(history);
  }

  clearSearchHistory() {
    return this.setSearchHistory([]);
  }

  // Favorites
  setFavorites(favorites) {
    return this.setItem('favorites', favorites);
  }

  getFavorites() {
    return this.getItem('favorites', []);
  }

  addToFavorites(item) {
    const favorites = this.getFavorites();
    if (!favorites.find(f => f.id === item.id)) {
      favorites.push(item);
      return this.setFavorites(favorites);
    }
    return true;
  }

  removeFromFavorites(itemId) {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => f.id !== itemId);
    return this.setFavorites(filtered);
  }

  isFavorite(itemId) {
    const favorites = this.getFavorites();
    return favorites.some(f => f.id === itemId);
  }

  // Export/Import data
  exportData() {
    const data = {
      user: this.getUser(),
      githubToken: this.getGithubToken(),
      dockerHubUsername: this.getDockerHubUsername(),
      ports: this.getPorts(),
      activeTab: this.getActiveTab(),
      theme: this.getTheme(),
      language: this.getLanguage(),
      settings: this.getSettings(),
      projectHistory: this.getProjectHistory(),
      containerHistory: this.getContainerHistory(),
      imageHistory: this.getImageHistory(),
      searchHistory: this.getSearchHistory(),
      favorites: this.getFavorites(),
      exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.user) this.setUser(data.user);
      if (data.githubToken) this.setGithubToken(data.githubToken);
      if (data.dockerHubUsername) this.setDockerHubUsername(data.dockerHubUsername);
      if (data.ports) this.setPorts(data.ports);
      if (data.activeTab) this.setActiveTab(data.activeTab);
      if (data.theme) this.setTheme(data.theme);
      if (data.language) this.setLanguage(data.language);
      if (data.settings) this.setSettings(data.settings);
      if (data.projectHistory) this.setProjectHistory(data.projectHistory);
      if (data.containerHistory) this.setContainerHistory(data.containerHistory);
      if (data.imageHistory) this.setImageHistory(data.imageHistory);
      if (data.searchHistory) this.setSearchHistory(data.searchHistory);
      if (data.favorites) this.setFavorites(data.favorites);
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData() {
    this.clear();
    this.clearSession();
    return true;
  }

  // Get storage usage
  getStorageUsage() {
    let totalSize = 0;
    
    for (let key in this.storage) {
      if (this.storage.hasOwnProperty(key)) {
        totalSize += this.storage[key].length;
      }
    }
    
    return {
      size: totalSize,
      sizeFormatted: this.formatBytes(totalSize),
      items: Object.keys(this.storage).length
    };
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export default new StorageService();
