# Chai & Backend - Full Stack Application

A modern social media platform built with **Express.js** backend and **React** frontend.

## 📁 Project Structure

```
chai-and-backend/
├── backend/              # Express.js REST API
│   ├── src/
│   │   ├── app.js       # Express app configuration
│   │   ├── index.js     # Server entry point
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API routes
│   │   ├── middlewares/ # Auth & file upload
│   │   └── utils/       # Helper functions
│   ├── public/          # Static files
│   └── package.json
│
├── frontend/             # React application
│   ├── src/
│   │   ├── api/         # API clients
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # State management
│   │   ├── App.jsx      # Main app
│   │   └── main.jsx     # Entry point
│   ├── public/
│   ├── index.html
│   └── package.json
│
└── package.json         # Root configuration
```

## 🚀 Quick Start

### 1. Install All Dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

Or use the convenience script:

```bash
npm run install-all
```

### 2. Environment Setup

#### Backend Setup

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/chai-and-backend
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8000
```

#### Frontend Setup

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

### 3. Start Development Servers

**Option 1: Run both servers together**

```bash
npm run dev
```

This will start:
- Backend on `http://localhost:8000`
- Frontend on `http://localhost:3000`

**Option 2: Run servers separately**

Backend:
```bash
npm run dev:backend
```

Frontend:
```bash
npm run dev:frontend
```

## 🔑 Features

### Backend
- User Authentication (JWT)
- Video Upload & Management
- Comments System
- Likes & Reactions
- Tweets
- Playlists
- Subscriptions
- User Profiles
- Watch History

### Frontend
- User Registration & Login
- Video Feed
- Video Upload
- User Profiles
- Comments & Likes
- Responsive Design
- Real-time Notifications
- State Management with Zustand

## 🛠️ Technologies

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - File storage
- **Multer** - File upload
- **Bcrypt** - Password hashing
- **Nodemon** - Development server

### Frontend
- **React** - UI framework
- **React Router** - Routing
- **Axios** - HTTP client
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `POST /api/v1/users/refresh-token` - Refresh access token
- `GET /api/v1/users/current-user` - Get current user

### Video Endpoints
- `POST /api/v1/videos` - Upload video
- `GET /api/v1/videos/:videoid` - Get video details

### Comment Endpoints
- `GET /api/v1/comments/:videoid` - Get video comments
- `POST /api/v1/comments/:videoid` - Add comment
- `PATCH /api/v1/comments/:commentid` - Update comment
- `DELETE /api/v1/comments/:commentid` - Delete comment

### Like Endpoints
- `POST /api/v1/likes/toggle/v/:videoid` - Toggle video like
- `POST /api/v1/likes/toggle/c/:commentid` - Toggle comment like
- `POST /api/v1/likes/toggle/t/:tweetid` - Toggle tweet like

### Tweet Endpoints
- `POST /api/v1/tweets` - Create tweet
- `GET /api/v1/tweets` - Get all tweets
- `PATCH /api/v1/tweets/:tweetid` - Update tweet
- `DELETE /api/v1/tweets/:tweetid` - Delete tweet

### Playlist Endpoints
- `POST /api/v1/playlists` - Create playlist
- `GET /api/v1/playlists/:playlistid` - Get playlist details
- `POST /api/v1/playlists/:playlistid/add/:videoid` - Add video to playlist
- `DELETE /api/v1/playlists/:playlistid/remove/:videoid` - Remove video

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Backend generates access token (7 days) and refresh token (10 days)
3. Frontend stores access token in localStorage
4. Axios interceptor automatically adds token to all requests
5. When token expires, refresh endpoint is called automatically
6. User is logged out if refresh fails

## 📦 Build for Production

```bash
npm run build
```

This will:
- Build the backend
- Build the frontend (creates `frontend/dist` folder)
- You can then serve the dist folder with any web server

## 🐛 Troubleshooting

### Ports Already in Use

If port 8000 or 3000 is already in use, you can change them in:
- Backend: `backend/src/index.js`
- Frontend: `frontend/vite.config.js`

### CORS Issues

Make sure `CORS_ORIGIN` in backend `.env` matches your frontend URL.

### MongoDB Connection

Ensure MongoDB is running. Update `MONGODB_URI` in `.env` if using a different database.

### API Not Found

Make sure the backend is running on the correct port and the `VITE_API_URL` in frontend `.env` is correct.

## 📝 License

ISC

## 👤 Author

Shreyansh Pandey
