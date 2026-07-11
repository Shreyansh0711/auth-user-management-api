# Chai & Backend - Express.js REST API

A robust REST API built with Express.js and MongoDB for a modern social media platform.

## Features

- 🔐 JWT Authentication
- 📹 Video Upload & Management
- 💬 Comments System
- 👍 Likes & Reactions
- 🐦 Tweets
- 📋 Playlists
- 🔔 Subscriptions
- 👤 User Profiles
- 📊 Watch History
- ☁️ Cloudinary Integration

## Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - File storage
- **Multer** - File upload middleware
- **Nodemon** - Development server

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/chai-and-backend
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=8000
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:8000`

## Project Structure

```
src/
├── app.js                  # Express configuration
├── index.js                # Server entry point
├── controllers/            # Business logic
│   ├── user.controller.js
│   ├── video.controller.js
│   ├── comment.controller.js
│   ├── like.controller.js
│   ├── tweet.controller.js
│   ├── playlist.controller.js
│   └── subscription.controller.js
├── models/                 # Database schemas
│   ├── user.model.js
│   ├── video.model.js
│   ├── comment.model.js
│   ├── like.model.js
│   ├── tweet.model.js
│   ├── playlist.model.js
│   └── subscription.model.js
├── routes/                 # API routes
├── middlewares/            # Auth, file upload
│   ├── auth.middleware.js
│   └── multer.middleware.js
├── utils/                  # Helper functions
│   ├── cloudinary.js
│   ├── apiresponse.js
│   ├── apierror.js
│   └── asynchandler.js
└── db/
    └── db.js               # Database connection
```

## API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `POST /api/v1/users/refresh-token` - Refresh token
- `GET /api/v1/users/current-user` - Get current user

### Users
- `GET /api/v1/users/channel/:username` - Get user channel
- `PATCH /api/v1/users/update-account` - Update account
- `PATCH /api/v1/users/avatar` - Update avatar
- `PATCH /api/v1/users/cover-image` - Update cover image
- `GET /api/v1/users/watch-history` - Get watch history

### Videos
- `POST /api/v1/videos` - Upload video
- `GET /api/v1/videos/:videoid` - Get video
- `DELETE /api/v1/videos/:videoid` - Delete video
- `PATCH /api/v1/videos/:videoid` - Update video

### Comments
- `GET /api/v1/comments/:videoid` - Get comments
- `POST /api/v1/comments/:videoid` - Add comment
- `PATCH /api/v1/comments/:commentid` - Update comment
- `DELETE /api/v1/comments/:commentid` - Delete comment

### Likes
- `POST /api/v1/likes/toggle/v/:videoid` - Toggle video like
- `POST /api/v1/likes/toggle/c/:commentid` - Toggle comment like
- `POST /api/v1/likes/toggle/t/:tweetid` - Toggle tweet like

### Tweets
- `POST /api/v1/tweets` - Create tweet
- `GET /api/v1/tweets` - Get tweets
- `PATCH /api/v1/tweets/:tweetid` - Update tweet
- `DELETE /api/v1/tweets/:tweetid` - Delete tweet

### Playlists
- `POST /api/v1/playlists` - Create playlist
- `GET /api/v1/playlists/:playlistid` - Get playlist
- `DELETE /api/v1/playlists/:playlistid` - Delete playlist

### Subscriptions
- `POST /api/v1/subscriptions/channel/:channelid` - Toggle subscribe
- `GET /api/v1/subscriptions/channels` - Get subscriptions

## Request/Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": {
    // response data
  },
  "message": "Success message",
  "success": true
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "success": false
}
```

## Authentication

Uses JWT tokens:
- **Access Token**: 7 days
- **Refresh Token**: 10 days

Include token in Authorization header:
```
Authorization: Bearer <access_token>
```

## Database Models

### User
- email (unique)
- password (hashed)
- username (unique)
- fullName
- avatar
- coverImage
- watchHistory
- createdAt

### Video
- title
- description
- videoFile
- thumbnail
- duration
- views
- isPublished
- owner
- createdAt

### Comment
- content
- video
- owner
- createdAt

### Tweet
- content
- owner
- createdAt

### Playlist
- name
- description
- videos
- owner
- createdAt

## File Upload

Uses Multer for local upload and Cloudinary for cloud storage.

**Limits:**
- Video: 100MB
- Image: 10MB

## Error Handling

All errors return proper HTTP status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Testing

Run tests with:
```bash
npm test
```

## Deployment

### Docker
```bash
docker build -t chai-backend .
docker run -p 8000:8000 chai-backend
```

### With Docker Compose
```bash
docker-compose up -d backend
```

## Security

- ✅ Password hashing with Bcrypt
- ✅ JWT authentication
- ✅ Input validation
- ✅ CORS enabled
- ✅ Rate limiting ready
- ✅ XSS protection ready

## Performance

- Pagination support
- Database indexing
- Cloudinary optimization
- Connection pooling

## License

ISC

## Author

Shreyansh Pandey
