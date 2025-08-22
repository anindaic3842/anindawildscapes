# Deployment Guide - Aninda Wildscapes

This guide covers various deployment options for the photography portfolio website.

## 🚀 Quick Deployment Options

### Option 1: Netlify (Frontend) + Railway (Backend)

#### Frontend on Netlify
1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the `frontend` folder as the base directory

2. **Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **Redirects Configuration**
   Create `frontend/public/_redirects`:
   ```
   /*    /index.html   200
   ```

#### Backend on Railway
1. **Deploy to Railway**
   - Go to [Railway](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Choose the `backend` folder

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=12001
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@anindawildscapes.com
   EMAIL_TO=contact@anindawildscapes.com
   CORS_ORIGINS=https://your-netlify-site.netlify.app
   ```

### Option 2: Vercel (Full-Stack)

#### Frontend
1. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`

2. **Build Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

#### Backend (Serverless Functions)
1. **Create API Routes**
   Move backend routes to `frontend/api/` folder
   
2. **Vercel Configuration**
   Create `frontend/vercel.json`:
   ```json
   {
     "functions": {
       "api/**/*.js": {
         "runtime": "nodejs18.x"
       }
     },
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "/api/$1"
       }
     ]
   }
   ```

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure Components**
   
   **Frontend (Static Site)**
   ```yaml
   name: frontend
   source_dir: /frontend
   github:
     repo: your-username/anindawildscapes
     branch: main
   build_command: npm run build
   output_dir: dist
   ```

   **Backend (Web Service)**
   ```yaml
   name: backend
   source_dir: /backend
   github:
     repo: your-username/anindawildscapes
     branch: main
   build_command: npm install
   run_command: npm start
   environment_slug: node-js
   instance_count: 1
   instance_size_slug: basic-xxs
   ```

3. **Environment Variables**
   Set in the DigitalOcean dashboard

## 🐳 Docker Deployment

### Docker Compose Setup

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:3001
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - EMAIL_SERVICE=gmail
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASS=${EMAIL_PASS}
      - EMAIL_FROM=${EMAIL_FROM}
      - EMAIL_TO=${EMAIL_TO}
    volumes:
      - ./backend/data:/app/data
```

### Frontend Dockerfile
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN mkdir -p data

EXPOSE 3001
CMD ["npm", "start"]
```

### Nginx Configuration
Create `frontend/nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 3000;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://backend:3001;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

## ☁️ AWS Deployment

### S3 + CloudFront (Frontend)
1. **Build and Upload**
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

2. **CloudFront Distribution**
   - Origin: S3 bucket
   - Default root object: index.html
   - Error pages: 404 → /index.html (200)

### EC2 (Backend)
1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - Security group: Allow HTTP (80), HTTPS (443), SSH (22)

2. **Setup Script**
   ```bash
   #!/bin/bash
   sudo apt update
   sudo apt install -y nodejs npm nginx
   
   # Clone repository
   git clone https://github.com/your-username/anindawildscapes.git
   cd anindawildscapes/backend
   
   # Install dependencies
   npm install
   
   # Setup PM2
   sudo npm install -g pm2
   pm2 start server.js --name "aninda-backend"
   pm2 startup
   pm2 save
   
   # Configure Nginx
   sudo tee /etc/nginx/sites-available/aninda-backend << EOF
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:12001;
           proxy_set_header Host \$host;
           proxy_set_header X-Real-IP \$remote_addr;
       }
   }
   EOF
   
   sudo ln -s /etc/nginx/sites-available/aninda-backend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 🔧 Environment Configuration

### Production Environment Variables

**Frontend (.env.production)**
```env
VITE_API_URL=https://api.anindawildscapes.com
VITE_SITE_URL=https://anindawildscapes.com
```

**Backend (.env.production)**
```env
NODE_ENV=production
PORT=12001

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=contact@anindawildscapes.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@anindawildscapes.com
EMAIL_TO=contact@anindawildscapes.com

# CORS
CORS_ORIGINS=https://anindawildscapes.com,https://www.anindawildscapes.com

# Security
SESSION_SECRET=your-super-secret-key
```

## 📊 Monitoring & Analytics

### Google Analytics
Add to `frontend/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring (Sentry)
```bash
npm install @sentry/react @sentry/node
```

## 🔒 SSL/HTTPS Setup

### Let's Encrypt (Certbot)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d anindawildscapes.com -d www.anindawildscapes.com
```

### Cloudflare (Recommended)
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable "Always Use HTTPS"
4. Set SSL/TLS mode to "Full (strict)"

## 🚀 Performance Optimization

### CDN Configuration
- Use Cloudflare or AWS CloudFront
- Enable Brotli compression
- Set appropriate cache headers

### Image Optimization
```bash
# Install sharp for image processing
npm install sharp

# Create optimized images
const sharp = require('sharp');
sharp('input.jpg')
  .resize(800, 600)
  .webp({ quality: 80 })
  .toFile('output.webp');
```

## 📈 SEO Optimization

### Meta Tags
Update `frontend/index.html`:
```html
<meta name="description" content="Aninda Wildscapes - Professional wildlife and nature photography portfolio">
<meta name="keywords" content="wildlife photography, nature photography, landscape photography">
<meta property="og:title" content="Aninda Wildscapes - Wildlife Photography">
<meta property="og:description" content="Capturing the raw beauty of nature through the lens">
<meta property="og:image" content="https://anindawildscapes.com/og-image.jpg">
<meta property="og:url" content="https://anindawildscapes.com">
```

### Sitemap
Create `frontend/public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://anindawildscapes.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://anindawildscapes.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://anindawildscapes.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

## 🔍 Testing Before Deployment

### Frontend Testing
```bash
cd frontend
npm run build
npm run preview
```

### Backend Testing
```bash
cd backend
npm test
npm run start
curl http://localhost:12001/api/health
```

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Create load test
artillery quick --count 10 --num 5 http://localhost:12001/api/health
```

## 📞 Support

If you encounter issues during deployment:
1. Check the logs for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Check firewall and security group settings
5. Contact support: contact@anindawildscapes.com

---

**Happy Deploying! 🚀**