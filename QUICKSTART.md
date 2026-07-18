# Quick Start Guide

## 🚀 Start Your Full-Stack App in 5 Minutes

### Step 1: Install Dependencies

**Option A: Using script (fastest)**
```bash
npm run install-all
```

**Option B: Manual**
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### Step 2: Setup Environment Variables

**Backend** - Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/chai-and-backend
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=chai_super_secret_key_2024
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=chai_refresh_secret_2024
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
PORT=8000
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### Step 3: Start Development Servers

**All-in-one:**
```bash
npm run dev
```

Or separately:
```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

### Step 4: Open in Browser

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000

---

## 🐳 Using Docker (Easier!)

### Prerequisites
- Install [Docker](https://docs.docker.com/get-docker/)

### Run Everything
```bash
docker-compose up -d
```

### Stop Everything
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

---

## ✅ First Steps in App

1. **Register** at http://localhost:3000/register
2. **Login** with your credentials
3. **Upload a video** - Click "Upload" in header
4. **Browse videos** - Go to "Feed"
5. **Interact** - Like, comment, tweet, create playlists!

---

## 📁 What's Where

```
chai-and-backend/
├── backend/          ← Express API server
├── frontend/         ← React web app
├── docker-compose.yml ← Docker setup
├── SETUP.md          ← Detailed setup
├── DEPLOYMENT.md     ← Deploy to production
└── README.md         ← Full documentation
```

---

## 🔧 Troubleshooting

**Port 3000 or 8000 already in use?**
- Change PORT in backend/.env
- Edit port in frontend/vite.config.js

**MongoDB not running?**
- Start with: `mongod` (if installed locally)
- Or use Docker: `docker-compose up mongodb`

**API errors?**
- Check backend logs: `npm run dev:backend`
- Check frontend console (F12)
- Verify .env files

**CORS errors?**
- Ensure CORS_ORIGIN matches frontend URL
- Check backend is running

---

## 📚 Learn More

- [Full Setup Guide](./SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Backend API Docs](./backend/README.md)
- [Frontend Guide](./frontend/README.md)

---

## 🎯 Next Steps

- Customize branding
- Add more features
- Deploy to production
- Invite users

**Happy coding! 🍵**
