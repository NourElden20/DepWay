# Contributing to Dockerization Platform

Thank you for your interest in contributing to the Dockerization Platform! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project follows a code of conduct that we expect all contributors to follow. Please be respectful, inclusive, and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js 14+
- Docker 20+
- Git 2.0+
- GitHub account

### Development Setup

1. **Fork the Repository**
   ```bash
   # Fork the repository on GitHub
   # Then clone your fork
   git clone https://github.com/your-username/dockerization-platform.git
   cd dockerization-platform
   ```

2. **Install Dependencies**
   ```bash
   # Backend dependencies
   npm install
   
   # Frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Start Development Server**
   ```bash
   # Terminal 1: Backend
   npm run dev
   
   # Terminal 2: Frontend
   cd client
   npm start
   ```

## Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

- **Bug Fixes**: Fix existing issues
- **Feature Additions**: Add new functionality
- **Documentation**: Improve documentation
- **Testing**: Add or improve tests
- **Performance**: Optimize performance
- **UI/UX**: Improve user interface
- **Translation**: Add language support

### Before Contributing

1. **Check Existing Issues**: Look for existing issues or discussions
2. **Create an Issue**: For significant changes, create an issue first
3. **Discuss Changes**: Get feedback before implementing large changes
4. **Follow Guidelines**: Read and follow all contributing guidelines

## Pull Request Process

### 1. Create a Branch

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Changes

- Write clean, readable code
- Follow the coding standards
- Add tests for new functionality
- Update documentation as needed
- Test your changes thoroughly

### 3. Commit Changes

```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### 4. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

### 5. PR Requirements

- **Title**: Clear, descriptive title
- **Description**: Detailed description of changes
- **Tests**: Include test results
- **Screenshots**: For UI changes
- **Documentation**: Update relevant docs
- **Breaking Changes**: Note any breaking changes

## Issue Reporting

### Before Creating an Issue

1. **Search**: Check if the issue already exists
2. **Reproduce**: Ensure you can reproduce the issue
3. **Gather Info**: Collect relevant information
4. **Check Versions**: Verify you're using the latest version

### Issue Template

When creating an issue, please include:

```markdown
## Bug Report / Feature Request

### Description
Brief description of the issue or feature request.

### Steps to Reproduce (for bugs)
1. Step 1
2. Step 2
3. Step 3

### Expected Behavior
What you expected to happen.

### Actual Behavior
What actually happened.

### Environment
- OS: [e.g., Windows 10, macOS 12, Ubuntu 20.04]
- Node.js Version: [e.g., 16.14.0]
- Docker Version: [e.g., 20.10.7]
- Browser: [e.g., Chrome 91, Firefox 89]

### Additional Context
Any additional information, screenshots, or logs.
```

## Coding Standards

### JavaScript/Node.js

```javascript
// Use const/let instead of var
const myVariable = 'value';

// Use arrow functions
const myFunction = () => {
  return 'result';
};

// Use template literals
const message = `Hello ${name}!`;

// Use async/await
const fetchData = async () => {
  try {
    const response = await api.getData();
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### React Components

```jsx
// Use functional components
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState('');
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  return (
    <div>
      <h1>{prop1}</h1>
      <p>{prop2}</p>
    </div>
  );
};

export default MyComponent;
```

### CSS/Styling

```css
/* Use BEM methodology */
.component {
  /* Base styles */
}

.component__element {
  /* Element styles */
}

.component--modifier {
  /* Modifier styles */
}

/* Use CSS variables */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### File Naming

- **Components**: PascalCase (e.g., `MyComponent.js`)
- **Utilities**: camelCase (e.g., `apiUtils.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)
- **Styles**: kebab-case (e.g., `my-component.css`)

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

```javascript
// Example test
describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = render(<MyComponent prop="value" />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should handle user interaction', () => {
    const mockFn = jest.fn();
    const wrapper = render(<MyComponent onClick={mockFn} />);
    
    wrapper.find('button').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### Test Requirements

- **Unit Tests**: Test individual functions/components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Coverage**: Maintain >80% test coverage

## Documentation

### Code Documentation

```javascript
/**
 * Fetches user repositories from GitHub API
 * @param {string} token - GitHub Personal Access Token
 * @param {Object} options - Additional options
 * @param {number} options.perPage - Number of repos per page
 * @param {string} options.sort - Sort order (created, updated, pushed)
 * @returns {Promise<Array>} Array of repository objects
 */
const fetchUserRepos = async (token, options = {}) => {
  // Implementation
};
```

### README Updates

- Update installation instructions
- Add new features to feature list
- Update configuration examples
- Add troubleshooting steps

### API Documentation

- Document new endpoints
- Update request/response examples
- Add error codes and messages
- Include authentication requirements

## Development Workflow

### Daily Development

1. **Start the day**: Pull latest changes
2. **Create branch**: For your feature/fix
3. **Develop**: Write code and tests
4. **Test**: Run tests and manual testing
5. **Commit**: Write good commit messages
6. **Push**: Push your changes
7. **PR**: Create pull request

### Code Review Process

1. **Self Review**: Review your own code first
2. **Request Review**: Ask for specific reviewers
3. **Address Feedback**: Respond to review comments
4. **Update PR**: Make requested changes
5. **Merge**: After approval, merge the PR

### Release Process

1. **Version Bump**: Update version numbers
2. **Changelog**: Update CHANGELOG.md
3. **Tag Release**: Create git tag
4. **Deploy**: Deploy to production
5. **Announce**: Announce the release

## Getting Help

### Resources

- **Documentation**: Check the docs/ folder
- **Issues**: Search existing issues
- **Discussions**: Use GitHub Discussions
- **Community**: Join our community channels

### Contact

- **Email**: Contact the maintainers
- **GitHub**: Open an issue
- **Discord**: Join our Discord server
- **Twitter**: Follow us on Twitter

## Recognition

### Contributors

All contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation
- Community acknowledgments

### Types of Recognition

- **Code Contributors**: Code changes and improvements
- **Documentation**: Documentation improvements
- **Testing**: Test coverage and quality
- **Community**: Community support and engagement
- **Translation**: Language support and localization

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Thank You

Thank you for contributing to the Dockerization Platform! Your contributions help make the project better for everyone.

---

**Happy Contributing! 🚀**
