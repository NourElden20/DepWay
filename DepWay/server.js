// server.js - Complete Dockerization backend
// Copy this file to your project root (replace old server.js)

const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs-extra');
const { exec } = require('child_process');
const simpleGit = require('simple-git');
const Docker = require('dockerode');
const net = require('net');

const app = express();
const DEFAULT_PORTS_TO_TRY = [5000, 5001, 5002, 5003];
const PORT = process.env.PORT || null; // we'll find available if null

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// serve frontend build if exists (optional)
const clientBuildPath = path.join(__dirname, 'client', 'build');
if (fs.pathExistsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
}

const docker = new Docker(); // requires Docker daemon running locally
const GITHUB_API_BASE = 'https://api.github.com';

/* ------------------------- Utilities ------------------------- */

function log(...args) { console.log('[server]', ...args); }
function warn(...args) { console.warn('[server]', ...args); }
function errlog(...args) { console.error('[server]', ...args); }

async function findAvailablePort(preferred) {
  const ports = preferred ? [preferred].concat(DEFAULT_PORTS_TO_TRY) : DEFAULT_PORTS_TO_TRY;
  for (const p of ports) {
    try {
      await new Promise((resolve, reject) => {
        const tester = net.createServer()
          .once('error', () => reject(new Error('busy')))
          .once('listening', function() {
            tester.close(() => resolve());
          })
          .listen(p);
      });
      return p;
    } catch (_) {
      continue;
    }
  }
  // fallback random port
  return 0;
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function execCommand(cmd, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = exec(cmd, opts, (error, stdout, stderr) => {
      if (error) return reject({ error, stdout, stderr });
      resolve({ stdout, stderr });
    });
    // pipe output for debugging
    p.stdout && p.stdout.pipe(process.stdout);
    p.stderr && p.stderr.pipe(process.stderr);
  });
}

/* ------------------------- Analysis ------------------------- */

// recursive search helper (finds first file match)
async function findFileRecursive(dir, filename) {
  try {
    const files = await fs.readdir(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      const stat = await fs.stat(full);
      if (stat.isDirectory()) {
        const found = await findFileRecursive(full, filename);
        if (found) return found;
      } else if (f === filename) {
        return full;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

async function analyzeProject(projectDir) {
  const analysis = {
    language: 'Unknown',
    framework: 'Unknown',
    hasPackageJson: false,
    hasRequirements: false,
    hasPomXml: false,
    hasComposerJson: false,
    hasGemfile: false,
    hasDockerfile: false,
    hasMultipleServices: false,
    suggestedPorts: [3000, 8000],
    startCommand: null,
    notes: []
  };

  try {
    // prefer recursive detection to handle nested client/
    const pkgPath = await findFileRecursive(projectDir, 'package.json');
    const reqPath = await findFileRecursive(projectDir, 'requirements.txt');
    const pomPath = await findFileRecursive(projectDir, 'pom.xml');
    const compPath = await findFileRecursive(projectDir, 'composer.json');
    const gemPath = await findFileRecursive(projectDir, 'Gemfile');
    const indexPath = await findFileRecursive(projectDir, 'index.html');
    const dockerfilePath = await findFileRecursive(projectDir, 'Dockerfile');
    const composePath = await findFileRecursive(projectDir, 'docker-compose.yml');

    if (dockerfilePath) analysis.hasDockerfile = true;
    if (composePath) analysis.hasMultipleServices = true;

    if (pkgPath) {
      analysis.hasPackageJson = true;
      analysis.language = 'JavaScript';
      const pkg = await fs.readJson(pkgPath).catch(() => ({}));
      const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
      const relativePkg = path.relative(projectDir, pkgPath);

      // detect React inside monorepo (client/)
      if (deps.react || /(^|\/)client\/package.json$/.test(relativePkg)) {
        // if server.js exists in root treat as fullstack
        if (await fs.pathExists(path.join(projectDir, 'server.js'))) {
          analysis.framework = 'Fullstack (React + Node)';
          analysis.startCommand = 'node server.js';
          analysis.suggestedPorts = [5000];
        } else {
          analysis.framework = 'React';
          analysis.startCommand = 'npm start';
          analysis.suggestedPorts = [3000];
        }
      } else if (deps.express) {
        analysis.framework = 'Express';
        analysis.startCommand = pkg.scripts?.start || 'node server.js';
        analysis.suggestedPorts = [8000, 3000];
      } else if (deps.vue) {
        analysis.framework = 'Vue';
        analysis.startCommand = 'npm run serve';
        analysis.suggestedPorts = [8080];
      } else {
        analysis.framework = 'Node.js';
        analysis.startCommand = pkg.scripts?.start || 'node index.js';
        analysis.suggestedPorts = [3000];
      }
    } else if (reqPath) {
      analysis.hasRequirements = true;
      analysis.language = 'Python';
      analysis.framework = 'Flask/Django (auto)';
      analysis.startCommand = 'python app.py';
      analysis.suggestedPorts = [8000, 5000];
    } else if (pomPath) {
      analysis.hasPomXml = true;
      analysis.language = 'Java';
      analysis.framework = 'Spring Boot';
      analysis.startCommand = 'java -jar target/*.jar';
      analysis.suggestedPorts = [8080];
    } else if (compPath) {
      analysis.hasComposerJson = true;
      analysis.language = 'PHP';
      analysis.framework = 'Laravel / PHP';
      analysis.startCommand = 'php -S 0.0.0.0:8000';
      analysis.suggestedPorts = [8000];
    } else if (gemPath) {
      analysis.hasGemfile = true;
      analysis.language = 'Ruby';
      analysis.framework = 'Rails';
      analysis.startCommand = 'bundle exec rails server';
      analysis.suggestedPorts = [3000];
    } else if (indexPath) {
      analysis.language = 'Static';
      analysis.framework = 'HTML/CSS/JS';
      analysis.startCommand = 'nginx';
      analysis.suggestedPorts = [80];
    } else {
      // fallback: check top-level extensions
      const topFiles = await fs.readdir(projectDir).catch(() => []);
      const hasHtml = topFiles.some(f => f.endsWith('.html'));
      const hasJs = topFiles.some(f => f.endsWith('.js'));
      const hasPy = topFiles.some(f => f.endsWith('.py'));
      if (hasHtml && !hasJs && !hasPy) {
        analysis.language = 'Static';
        analysis.framework = 'HTML Site';
        analysis.startCommand = 'nginx';
        analysis.suggestedPorts = [80];
      } else if (hasJs) {
        analysis.language = 'JavaScript';
        analysis.framework = 'Node.js (auto)';
        analysis.startCommand = 'node index.js';
        analysis.suggestedPorts = [3000];
      } else {
        analysis.language = 'Generic';
        analysis.framework = 'Unknown';
        analysis.startCommand = 'echo "Manual start required"';
        analysis.suggestedPorts = [8000];
      }
    }
  } catch (err) {
    errlog('analyzeProject error:', err);
    analysis.notes.push(`analyze error: ${err.message}`);
  }

  return analysis;
}

/* ---------------------- Dockerfile generator ---------------------- */

function generateDockerfile(analysis, ports) {
  const port = ports ? ports[0] : analysis.suggestedPorts[0];

  if (analysis.language === 'Static' || analysis.framework === 'HTML/CSS/JS') {
    return `# Static HTML/CSS/JS Website
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;
  }

  if (analysis.language === 'JavaScript' && analysis.hasPackageJson) {
    return `# Node.js App
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${port}
CMD ["${analysis.startCommand || 'npm start'}"]`;
  }

  return `# Generic
FROM ubuntu:20.04
WORKDIR /app
COPY . .
EXPOSE ${port}
CMD ["echo","Custom start command required"]`;


  // Python
  if (analysis.language === 'Python') {
    return `# Python App
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt || true
COPY . .
EXPOSE ${port}
CMD ["sh", "-c", "${analysis.startCommand || 'python app.py'}"]`;
  }

  // Java
  if (analysis.language === 'Java') {
    return `# Java App
FROM openjdk:11-jre-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE ${port}
CMD ["java", "-jar", "app.jar"]`;
  }

  // PHP (Apache)
  if (analysis.language === 'PHP') {
    return `# PHP App (Apache)
FROM php:8.0-apache
WORKDIR /var/www/html
COPY . .
EXPOSE ${port}
CMD ["apache2-foreground"]`;
  }

  // Generic fallback
  return `# Generic App (manual)
FROM ubuntu:20.04
WORKDIR /app
COPY . .
EXPOSE ${port}
CMD ["sh", "-c", "${analysis.startCommand || 'echo \\"No start command found\\"'}"]`;
}

/* ---------------------- Build & Push helpers ---------------------- */

async function buildDockerImage(projectDir, imageName) {
  log('Building Docker image:', imageName);
  try {
    const { stdout, stderr } = await execCommand(`docker build -t ${imageName} ${projectDir}`);
    log('Build stdout:', stdout ? stdout.toString().slice(0, 1000) : '');
    return stdout;
  } catch (e) {
    errlog('docker build failed:', e.stderr || e);
    throw new Error('docker build failed: ' + (e.stderr || (e.error && e.error.message) || e));
  }
}

async function pushToDockerHub(imageName) {
  log('Pushing image to Docker Hub:', imageName);
  try {
    const { stdout, stderr } = await execCommand(`docker push ${imageName}`);
    log('Push stdout:', stdout ? stdout.toString().slice(0, 1000) : '');
    return stdout;
  } catch (e) {
    errlog('docker push failed:', e.stderr || e);
    throw new Error('docker push failed: ' + (e.stderr || (e.error && e.error.message) || e));
  }
}

/* ---------------------- Endpoints ---------------------- */

// Analyze repo endpoint (clone -> analyze -> cleanup)
app.post('/api/analyzeRepo', async (req, res) => {
  const { repoUrl, projectName } = req.body || {};
  if (!repoUrl || !projectName) {
    return res.status(400).json({ success: false, error: 'repoUrl and projectName are required' });
  }

  const tempDir = path.join(__dirname, 'temp', `analyze_${Date.now()}_${projectName}`);
  await fs.ensureDir(tempDir);

  log('Cloning for analysis:', repoUrl, '->', tempDir);

  try {
    const git = simpleGit();
    // clone with timeout (60s)
    await Promise.race([
      git.clone(repoUrl, tempDir),
      (async () => { await timeout(60000); throw new Error('git clone timeout'); })()
    ]);

    // retry analysis up to 3 times
    let analysis = null;
    for (let i = 0; i < 3; i++) {
      analysis = await analyzeProject(tempDir);
      if (analysis && analysis.language && analysis.language !== 'Unknown') break;
      warn('analysis retry', i + 1);
      await timeout(800);
    }

    if (!analysis || !analysis.language) {
      throw new Error('Analysis failed or returned Unknown');
    }

    res.json({ success: true, analysis });
  } catch (e) {
    errlog('analyzeRepo error:', e);
    res.status(500).json({ success: false, error: e.message || String(e) });
  } finally {
    // cleanup
    try { await fs.remove(tempDir); } catch (_) {}
  }
});

// Dockerize endpoint (clone -> analyze -> generate Dockerfile -> build -> push -> cleanup)
app.post('/api/dockerize', async (req, res) => {
  const { repoUrl, projectName, ports, dockerHubUsername } = req.body;

  console.log('[server] 🚀 Starting dockerize process for', projectName);

  try {
    // --- STEP 1: Clone ---
    const projectDir = path.join(__dirname, 'temp', projectName);
    console.log('[server] 📁 Cloning repo into:', projectDir);
    await fs.ensureDir(projectDir);

    const git = simpleGit();
    await git.clone(repoUrl, projectDir);
    console.log('[server] ✅ Repo cloned');

    // --- STEP 2: Analyze ---
    const analysis = await analyzeProject(projectDir);
    console.log('[server] 🔍 Project analysis result:', analysis);

    // --- STEP 3: Generate Dockerfile ---
    const dockerfile = generateDockerfile(analysis, ports);
    await fs.writeFile(path.join(projectDir, 'Dockerfile'), dockerfile);
    console.log('[server] 🧾 Dockerfile created');

    // --- STEP 4: Build image ---
    const imageName = `${dockerHubUsername}/${projectName.toLowerCase()}`;
    console.log('[server] 🐳 Building Docker image:', imageName);
    await buildDockerImage(projectDir, imageName);
    console.log('[server] ✅ Docker image built successfully');

    // --- STEP 5: Push image ---
    console.log('[server] 📤 Pushing image to Docker Hub...');
    await pushToDockerHub(imageName);
    console.log('[server] ✅ Image pushed successfully');

    // --- STEP 6: Cleanup ---
    await fs.remove(projectDir);
    console.log('[server] 🧹 Cleaned temp folder');

    res.json({
      success: true,
      message: 'Dockerization completed successfully!',
      imageName,
      ports: ports || analysis.suggestedPorts,
      dockerfile
    });
  } catch (error) {
    console.error('[server ❌ ERROR during dockerize]:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack
    });
  }
});


/* ---------------------- Docker info endpoints ---------------------- */
// ---------------- GET GitHub Repositories (robust) ----------------
app.get('/api/repos', async (req, res) => {
  try {
    // support both headers: Authorization: token XXX  OR token: XXX
    let token = null;
    if (req.headers.authorization) {
      // Authorization: token <token>  OR Bearer <token>
      const parts = req.headers.authorization.split(' ');
      token = parts.length === 2 ? parts[1] : req.headers.authorization;
    }
    if (!token && req.headers.token) token = req.headers.token;
    // fallback to env token if you want (optional)
    if (!token && process.env.GITHUB_TOKEN) token = process.env.GITHUB_TOKEN;

    if (!token) {
      // give helpful error to front-end
      return res.status(401).json({ error: 'GitHub token required in header "Authorization" or "token"' });
    }

    // call GitHub API (paginated first page)
    const response = await axios.get(`${GITHUB_API_BASE}/user/repos`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      },
      params: {
        per_page: 100,
        sort: 'updated'
      },
      timeout: 15000
    });

    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      language: repo.language,
      clone_url: repo.clone_url,
      default_branch: repo.default_branch,
      private: repo.private,
      updated_at: repo.updated_at,
      stargazers_count: repo.stargazers_count
    }));

    return res.json(repos);
  } catch (e) {
    console.error('Error in /api/repos:', e.response?.status, e.response?.data || e.message);
    // Propagate helpful message
    const status = e.response?.status || 500;
    const message = e.response?.data?.message || e.message || 'Failed to fetch repos';
    return res.status(status).json({ error: message });
  }
});

// List images
app.get('/api/images', async (req, res) => {
  try {
    const images = await docker.listImages();
    res.json(images);
  } catch (e) {
    errlog('listImages error:', e);
    res.status(500).json({ error: e.message || String(e) });
  }
});

// List containers
app.get('/api/containers', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (e) {
    errlog('listContainers error:', e);
    res.status(500).json({ error: e.message || String(e) });
  }
});

// Start container
app.post('/api/containers/:id/start', async (req, res) => {
  try {
    const c = docker.getContainer(req.params.id);
    await c.start();
    res.json({ success: true });
  } catch (e) {
    errlog('start container error:', e);
    res.status(500).json({ error: e.message || String(e) });
  }
});

// Stop container
app.post('/api/containers/:id/stop', async (req, res) => {
  try {
    const c = docker.getContainer(req.params.id);
    await c.stop();
    res.json({ success: true });
  } catch (e) {
    errlog('stop container error:', e);
    res.status(500).json({ error: e.message || String(e) });
  }
});

/* ---------------------- Serve React if exists ---------------------- */
if (fs.pathExistsSync(clientBuildPath)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

/* ---------------------- Start server ---------------------- */

(async () => {
  try {
    const preferred = process.env.PORT ? parseInt(process.env.PORT, 10) : null;
    const selectedPort = await findAvailablePort(preferred) || 5000;
    app.listen(selectedPort, () => log(`🚀 Server running on port ${selectedPort}`));
  } catch (e) {
    errlog('Failed to start server:', e);
    process.exit(1);
  }
})();
