# Chai & Backend - Frontend

A modern React frontend for the Chai & Backend social media platform.

## Features

- User Authentication (Login/Register)
- Video Feed
- Video Upload
- User Profiles
- Comments & Likes
- Playlists
- Tweet Support
- Subscriptions

## Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:8000/api/v1
```

### Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # Reusable components
├── pages/           # Page components
├── store/           # Zustand stores
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## Technologies Used

- React 18
- React Router v6
- Axios for API calls
- Zustand for state management
- Tailwind CSS for styling
- Vite for build tooling

## API Integration

The frontend connects to the backend API at `/api/v1`. Make sure the backend is running on `http://localhost:8000`.

## License

ISC
