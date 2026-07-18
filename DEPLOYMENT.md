# Deployment Guide - Chai & Backend

## Local Deployment with Docker Compose

### Prerequisites
- Docker (https://docs.docker.com/get-docker/)
- Docker Compose

### Quick Start

1. **Clone/Extract the project**
```bash
cd chai-and-backend
```

2. **Set environment variables**
Create a `.env` file in the root directory for Cloudinary credentials:
```env
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. **Run with Docker Compose**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- MongoDB: localhost:27017 (admin/password)

5. **Stop containers**
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Rebuild Images
```bash
docker-compose build --no-cache
docker-compose up -d
```

---

## Production Deployment

### Option 1: Deploy to Heroku

#### Backend Deployment
```bash
heroku login
heroku create chai-backend
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set CLOUDINARY_NAME=your_name
# ... set other env vars
git push heroku main
```

#### Frontend Deployment
```bash
heroku create chai-frontend
heroku config:set VITE_API_URL=https://chai-backend.herokuapp.com/api/v1
git push heroku main
```

### Option 2: Deploy to Railway

1. Connect GitHub repository
2. Create 3 projects:
   - Backend (Node.js + MongoDB)
   - Frontend (Node.js + Static)
   - MongoDB

3. Set environment variables in Railway dashboard
4. Deploy!

### Option 3: Deploy to AWS

#### Using EC2
```bash
# SSH into EC2 instance
ssh -i key.pem ec2-user@your-instance

# Install Docker & Docker Compose
sudo yum update
sudo yum install docker -y
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone <your-repo>
cd chai-and-backend

# Run Docker Compose
docker-compose up -d
```

#### Using ECS + RDS
- Create RDS MongoDB instance
- Create ECS cluster
- Push Docker images to ECR
- Deploy containers

### Option 4: Deploy to DigitalOcean App Platform

1. Push code to GitHub
2. Create App in DigitalOcean
3. Connect repository
4. Configure services:
   - Backend (Node.js)
   - Frontend (Static Site)
5. Set environment variables
6. Deploy!

---

## Vercel + Backend Deployment

### Frontend on Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Update VITE_API_URL to production backend URL
```

### Backend on Railway/Render/Heroku
1. Commit to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy!

---

## Environment Variables for Production

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/chai-and-backend
CORS_ORIGIN=https://yourdomain.com
JWT_SECRET=super_secret_key_change_this
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=refresh_secret_change_this
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
PORT=8000
```

### Frontend (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com/api/v1
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt with Nginx

1. Install Nginx
2. Install Certbot
```bash
sudo apt-get install certbot python3-certbot-nginx
```

3. Configure Nginx
4. Generate SSL certificate
```bash
sudo certbot certonly --nginx -d yourdomain.com
```

5. Update Docker Compose to use SSL

---

## Database Backup

### MongoDB Atlas Automated Backup
- Enable in cluster settings
- Configure retention period

### Manual Backup
```bash
# Backup
mongodump --uri="mongodb://user:password@host:27017/chai-and-backend" --out=./backup

# Restore
mongorestore ./backup
```

---

## Performance Optimization

1. **Enable Gzip compression** in backend
2. **Caching strategy** for videos
3. **CDN for static assets** (Cloudinary)
4. **Database indexing**
5. **Image optimization**
6. **Lazy loading** in frontend
7. **Production build** with minification

---

## Monitoring & Logging

### Application Performance Monitoring
- New Relic
- Datadog
- Sentry (error tracking)

### Logging
- LogRocket
- Papertrail
- ELK Stack

### Uptime Monitoring
- Pingdom
- StatusPage.io
- UptimeRobot

---

## Scaling

### Horizontal Scaling
- Load balancer (Nginx, HAProxy)
- Multiple backend instances
- Database replication

### Vertical Scaling
- Increase server resources
- Better database tier

### Caching
- Redis for sessions
- Cloudflare for CDN

---

## Security Checklist

- [ ] Change all default credentials
- [ ] Enable HTTPS/SSL
- [ ] Set strong JWT secrets
- [ ] Enable rate limiting
- [ ] Set CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Enable MongoDB authentication
- [ ] Regular security updates
- [ ] Backup strategy in place
- [ ] Monitor logs for suspicious activity
- [ ] Use Cloudinary for file storage (not server)

---

## Troubleshooting

### Container won't start
```bash
docker-compose logs
```

### MongoDB connection failed
- Check MONGODB_URI
- Ensure MongoDB is running
- Check credentials

### Frontend can't reach API
- Check VITE_API_URL
- Ensure backend is running
- Check CORS settings
- Check firewall rules

### Deployment issues
- Check environment variables
- Review logs
- Test locally first
- Verify dependencies

---

Need help? Check the main README.md for more information!
