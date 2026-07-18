# Setup Instructions

## Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or cloud)
- Cloudinary account (for file uploads)

## Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 2: Environment Variables

### Backend (.env in `backend/` folder)
```
MONGODB_URI=mongodb://localhost:27017/chai-and-backend
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_secret_here
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=8000
```

### Frontend (.env in `frontend/` folder)
```
VITE_API_URL=http://localhost:8000/api/v1
```

## Step 3: Run Development Servers

### Option A: Run both together
```bash
npm run dev
```

### Option B: Run separately
**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

## Step 4: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api-docs (if Swagger is setup)

## Common Issues

### 1. Port 8000/3000 Already in Use
- Change PORT in backend/.env
- Change port in frontend/vite.config.js

### 2. MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI is correct
- For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

### 3. Cloudinary Upload Fails
- Verify Cloudinary credentials in .env
- Check file size limits
- Ensure multer config matches Cloudinary limits

### 4. CORS Errors
- Ensure CORS_ORIGIN in backend matches frontend URL
- Check if frontend is making requests to correct API URL

## Project Structure

```
root/
├── backend/          # Express server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── public/
│   └── package.json
│
├── frontend/         # React app
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
└── package.json      # Root config
```

## Next Steps

1. Create user account at http://localhost:3000/register
2. Upload a video
3. Interact with the platform (like, comment, subscribe)
4. Build and customize as needed

## Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

### Deploy
- Frontend dist folder to Vercel, Netlify, or any static host
- Backend to Heroku, Railway, or any Node.js hosting

## Support

Check individual README.md files in backend/ and frontend/ folders for more detailed documentation.
