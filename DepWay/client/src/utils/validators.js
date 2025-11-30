// Validation utility functions

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// GitHub token validation
export const isValidGitHubToken = (token) => {
  const tokenRegex = /^gh[po]_[a-zA-Z0-9]{36}$/;
  return tokenRegex.test(token);
};

// Docker Hub username validation
export const isValidDockerHubUsername = (username) => {
  const usernameRegex = /^[a-z0-9_-]+$/;
  return usernameRegex.test(username) && username.length >= 3 && username.length <= 30;
};

// Port number validation
export const isValidPort = (port) => {
  const num = parseInt(port);
  return !isNaN(num) && num >= 1000 && num <= 65535;
};

// Repository name validation
export const isValidRepoName = (name) => {
  const nameRegex = /^[a-zA-Z0-9._-]+$/;
  return nameRegex.test(name) && name.length >= 1 && name.length <= 100;
};

// Project name validation
export const isValidProjectName = (name) => {
  const nameRegex = /^[a-zA-Z0-9._-]+$/;
  return nameRegex.test(name) && name.length >= 1 && name.length <= 50;
};

// Password strength validation
export const getPasswordStrength = (password) => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  score = Object.values(checks).filter(Boolean).length;
  
  return {
    score,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
    checks
  };
};

// Phone number validation
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// IPv4 validation
export const isValidIPv4 = (ip) => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

// IPv6 validation
export const isValidIPv6 = (ip) => {
  const ipRegex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipRegex.test(ip);
};

// Domain validation
export const isValidDomain = (domain) => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
  return domainRegex.test(domain);
};

// File extension validation
export const isValidFileExtension = (filename, allowedExtensions) => {
  const extension = filename.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension);
};

// File size validation
export const isValidFileSize = (fileSize, maxSizeInBytes) => {
  return fileSize <= maxSizeInBytes;
};

// Image file validation
export const isValidImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  return isValidFileExtension(filename, imageExtensions);
};

// Code file validation
export const isValidCodeFile = (filename) => {
  const codeExtensions = [
    'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs',
    'html', 'css', 'scss', 'sass', 'less', 'json', 'xml', 'yaml', 'yml', 'md', 'txt'
  ];
  return isValidFileExtension(filename, codeExtensions);
};

// JSON validation
export const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

// Base64 validation
export const isValidBase64 = (str) => {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
};

// UUID validation
export const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Date validation
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// Age validation
export const isValidAge = (age) => {
  const num = parseInt(age);
  return !isNaN(num) && num >= 0 && num <= 150;
};

// Percentage validation
export const isValidPercentage = (percentage) => {
  const num = parseFloat(percentage);
  return !isNaN(num) && num >= 0 && num <= 100;
};

// Coordinate validation
export const isValidCoordinate = (lat, lng) => {
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  return !isNaN(latNum) && !isNaN(lngNum) && 
         latNum >= -90 && latNum <= 90 && 
         lngNum >= -180 && lngNum <= 180;
};

// Form validation
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    fieldRules.forEach(rule => {
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors[field] = rule.message || `${field} is required`;
        return;
      }
      
      if (value && rule.pattern && !rule.pattern.test(value)) {
        errors[field] = rule.message || `${field} format is invalid`;
        return;
      }
      
      if (value && rule.minLength && value.length < rule.minLength) {
        errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
        return;
      }
      
      if (value && rule.maxLength && value.length > rule.maxLength) {
        errors[field] = rule.message || `${field} must be no more than ${rule.maxLength} characters`;
        return;
      }
      
      if (value && rule.min && parseFloat(value) < rule.min) {
        errors[field] = rule.message || `${field} must be at least ${rule.min}`;
        return;
      }
      
      if (value && rule.max && parseFloat(value) > rule.max) {
        errors[field] = rule.message || `${field} must be no more than ${rule.max}`;
        return;
      }
      
      if (value && rule.custom && !rule.custom(value)) {
        errors[field] = rule.message || `${field} is invalid`;
        return;
      }
    });
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Common validation rules
export const commonRules = {
  email: [
    { required: true, message: 'البريد الإلكتروني مطلوب' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'البريد الإلكتروني غير صحيح' }
  ],
  password: [
    { required: true, message: 'كلمة المرور مطلوبة' },
    { minLength: 8, message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }
  ],
  githubToken: [
    { required: true, message: 'GitHub Token مطلوب' },
    { pattern: /^gh[po]_[a-zA-Z0-9]{36}$/, message: 'GitHub Token غير صحيح' }
  ],
  dockerHubUsername: [
    { required: true, message: 'Docker Hub username مطلوب' },
    { pattern: /^[a-z0-9_-]+$/, message: 'Docker Hub username يجب أن يحتوي على أحرف صغيرة وأرقام و _ و - فقط' },
    { minLength: 3, message: 'Docker Hub username يجب أن يكون 3 أحرف على الأقل' },
    { maxLength: 30, message: 'Docker Hub username يجب أن يكون 30 حرف على الأكثر' }
  ],
  port: [
    { required: true, message: 'المنفذ مطلوب' },
    { custom: (value) => isValidPort(value), message: 'المنفذ يجب أن يكون بين 1000 و 65535' }
  ],
  projectName: [
    { required: true, message: 'اسم المشروع مطلوب' },
    { pattern: /^[a-zA-Z0-9._-]+$/, message: 'اسم المشروع يجب أن يحتوي على أحرف وأرقام و . و _ و - فقط' },
    { minLength: 1, message: 'اسم المشروع مطلوب' },
    { maxLength: 50, message: 'اسم المشروع يجب أن يكون 50 حرف على الأكثر' }
  ]
};

export default {
  isValidEmail,
  isValidUrl,
  isValidGitHubToken,
  isValidDockerHubUsername,
  isValidPort,
  isValidRepoName,
  isValidProjectName,
  getPasswordStrength,
  isValidPhoneNumber,
  isValidCreditCard,
  isValidIPv4,
  isValidIPv6,
  isValidDomain,
  isValidFileExtension,
  isValidFileSize,
  isValidImageFile,
  isValidCodeFile,
  isValidJSON,
  isValidBase64,
  isValidUUID,
  isValidDate,
  isValidAge,
  isValidPercentage,
  isValidCoordinate,
  validateForm,
  commonRules
};
