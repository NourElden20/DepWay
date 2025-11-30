// Application configuration
const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 30000,
    retries: 3
  },

  // GitHub Configuration
  github: {
    apiBase: 'https://api.github.com',
    tokenPattern: /^gh[po]_[a-zA-Z0-9]{36}$/,
    requiredScopes: ['repo', 'user'],
    rateLimit: {
      requests: 5000,
      window: 3600000 // 1 hour
    }
  },

  // Docker Configuration
  docker: {
    defaultPorts: [3000, 8000, 8080, 5000],
    supportedLanguages: [
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
    ],
    imageSizeLimit: 1000000000, // 1GB
    buildTimeout: 300000 // 5 minutes
  },

  // UI Configuration
  ui: {
    theme: {
      primary: '#667eea',
      secondary: '#764ba2',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    },
    breakpoints: {
      mobile: '768px',
      tablet: '1024px',
      desktop: '1200px'
    },
    animations: {
      duration: 300,
      easing: 'ease-in-out'
    }
  },

  // Storage Configuration
  storage: {
    keys: {
      user: 'user',
      githubToken: 'githubToken',
      dockerHubUsername: 'dockerHubUsername',
      ports: 'ports',
      activeTab: 'activeTab',
      theme: 'theme',
      language: 'language',
      settings: 'settings'
    },
    limits: {
      projectHistory: 10,
      containerHistory: 20,
      imageHistory: 15,
      searchHistory: 20,
      favorites: 50
    }
  },

  // Feature Flags
  features: {
    githubIntegration: true,
    dockerHubIntegration: true,
    portManagement: true,
    containerManagement: true,
    statistics: true,
    tutorials: true,
    search: true,
    favorites: true,
    export: true,
    import: true
  },

  // Development Configuration
  development: {
    debug: process.env.NODE_ENV === 'development',
    logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
    hotReload: process.env.NODE_ENV === 'development'
  },

  // Production Configuration
  production: {
    minify: true,
    compress: true,
    cache: true,
    analytics: false
  },

  // Security Configuration
  security: {
    tokenExpiry: 3600000, // 1 hour
    maxLoginAttempts: 5,
    lockoutDuration: 900000, // 15 minutes
    passwordMinLength: 8,
    sessionTimeout: 1800000 // 30 minutes
  },

  // Performance Configuration
  performance: {
    debounceDelay: 300,
    throttleDelay: 1000,
    cacheTimeout: 300000, // 5 minutes
    maxConcurrentRequests: 5,
    retryDelay: 1000
  },

  // Localization Configuration
  localization: {
    defaultLanguage: 'ar',
    supportedLanguages: ['ar', 'en'],
    fallbackLanguage: 'en',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currency: 'USD'
  },

  // Notification Configuration
  notifications: {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true
  },

  // Pagination Configuration
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    maxPageSize: 100
  },

  // Search Configuration
  search: {
    minQueryLength: 2,
    maxQueryLength: 100,
    debounceDelay: 300,
    maxResults: 100
  },

  // File Upload Configuration
  upload: {
    maxFileSize: 10485760, // 10MB
    allowedTypes: ['image/*', 'text/*', 'application/json'],
    maxFiles: 10
  },

  // Export/Import Configuration
  export: {
    maxDataSize: 10485760, // 10MB
    supportedFormats: ['json', 'csv'],
    compression: true
  },

  // Monitoring Configuration
  monitoring: {
    enabled: true,
    logErrors: true,
    trackPerformance: true,
    trackUsage: true,
    reportInterval: 60000 // 1 minute
  }
};

export default config;
