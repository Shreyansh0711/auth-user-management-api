# MeTube 🎬

MeTube is a YouTube-inspired video sharing platform where users can upload, watch, like, comment, and manage videos. The project focuses on building a scalable backend with authentication, media handling, database optimization, and modern backend practices.

---

## 🚀 Features

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Access token and refresh token mechanism
- Secure password hashing using bcrypt
- Email verification system
- Forgot password and reset password functionality
- Google OAuth authentication
- HTTP-only cookie-based authentication

### 👤 User Features
- Update profile information
- Upload avatar and cover images
- View user profiles
- Track watch history

### 🎥 Video Features
- Upload videos
- Upload video thumbnails
- Watch videos
- Update video details
- Delete videos
- Publish/unpublish videos
- Track video views

### 💬 Social Features
- Like/unlike videos
- Comment on videos
- Like comments
- Create playlists
- Add/remove videos from playlists
- Tweet-like posts

### ⚡ Backend Features
- RESTful API architecture
- JWT authentication middleware
- Error handling middleware
- File upload handling using Multer
- Cloud media storage
- MongoDB aggregation pipelines
- Pagination support
- Redis caching integration

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- Passport.js
- Google OAuth 2.0

### Storage
- Cloudinary / ImageKit
- Multer

### Database & Caching
- MongoDB
- Redis

### Tools
- VS Code
- Postman
- Docker
- Git & GitHub

---

## 📁 Project Structure

```
MeTube/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── db/
│   └── index.js
│
├── public/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/MeTube.git
```

### Install Dependencies

```bash
npm install
```

### Create `.env` File

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAIL_USER=your_email
MAIL_PASSWORD=your_email_password

REDIS_URI=redis://localhost:6379

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server runs on:

```
http://localhost:8000
```

---

## 🔑 Authentication Flow

1. User registers with email and password.
2. Password is securely hashed before storing.
3. Email verification link is generated.
4. After login, server generates:
   - Access Token
   - Refresh Token
5. Refresh token is stored securely.
6. Access token is used for protected routes.

---

## 📌 API Endpoints

### User Routes

```
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/users/logout
GET    /api/v1/users/profile
PATCH  /api/v1/users/update-account
```

### Video Routes

```
POST   /api/v1/videos/upload
GET    /api/v1/videos/:videoId
PATCH  /api/v1/videos/:videoId
DELETE /api/v1/videos/:videoId
```

### Comment Routes

```
POST   /api/v1/comments/:videoId
GET    /api/v1/comments/:videoId
DELETE /api/v1/comments/:commentId
```

### Playlist Routes

```
POST   /api/v1/playlists
POST   /api/v1/playlists/add/:videoId
GET    /api/v1/playlists/:playlistId
```

---

## 🗄️ Database Models

### User
- Username
- Email
- Password
- Avatar
- Cover image
- Watch history
- Refresh token

### Video
- Title
- Description
- Video file
- Thumbnail
- Views
- Owner

### Comment
- Content
- Video reference
- Owner

### Playlist
- Name
- Description
- Videos

### Like
- Video/comment/tweet reference
- Liked user

---

## 🚀 Future Improvements

- Video recommendation system
- Real-time notifications
- Live streaming
- Chat system
- Advanced search
- Microservices architecture
- Kubernetes deployment

---

## 👨‍💻 Author

**Shreyansh Pandey**

GitHub: https://github.com/Shreyansh0711

LinkedIn: https://linkedin.com/in/shreyansh-pandey-54949730b

---

## ⭐ Support

If you like this project, consider giving it a star ⭐

<br><br>

<div align="center">
  <img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/0c7eb6ed-663b-4ce4-bfbd-18239a38ba1b" width="500">
</div>
