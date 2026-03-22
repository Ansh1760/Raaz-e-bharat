# Raaz-e-Bharat | राज़-ए-भारत

A full-stack MERN news platform with YouTube video integration, article management, and a secure admin panel.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- YouTube Data API v3 key (optional — demo data shown without it)

---

## ⚙️ Environment Setup

### Backend (`server/.env`)
Edit `server/.env` and fill in:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/raaz-e-bharat  # or your Atlas URI
JWT_SECRET=your_random_secret_here
YOUTUBE_API_KEY=your_youtube_api_v3_key              # get from console.cloud.google.com
CLIENT_URL=http://localhost:5173
```

---

## 🖥️ Running the Project

### 1. Backend
```bash
cd server
npm install
npm run dev
```
Server runs at: http://localhost:5000

### 2. Create Admin User (run once)
```bash
# In a browser or curl, call:
POST http://localhost:5000/api/auth/seed
```
Or use:
```bash
curl -X POST http://localhost:5000/api/auth/seed
```
Default credentials: **admin / admin123**

### 3. Frontend
```bash
cd client
npm install
npm run dev
```
App runs at: http://localhost:5173

---

## 📁 Project Structure

```
raz-e-bharat/
├── server/
│   ├── src/
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js      # Login, seed admin
│   │   │   ├── articleController.js   # Article CRUD
│   │   │   └── youtubeController.js   # YouTube API proxy
│   │   ├── middleware/auth.js     # JWT middleware
│   │   ├── models/
│   │   │   ├── User.js           # Admin user model
│   │   │   └── Article.js        # Article model
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── articles.js
│   │   │   └── youtube.js
│   │   └── index.js              # Express server entry
│   ├── public/uploads/           # Uploaded article images
│   ├── .env                      # Environment variables
│   └── package.json
│
└── client/
    ├── src/
    │   ├── api/axios.js          # Axios instance + interceptors
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── VideoCard.jsx
    │   │   ├── ArticleCard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── VideoPlayer.jsx
    │   │   ├── ArticleDetail.jsx
    │   │   ├── AdminLogin.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/favicon.svg
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🌐 API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | /api/health | Public | Health check |
| POST | /api/auth/login | Public | Admin login |
| POST | /api/auth/seed | Public | Create default admin |
| GET | /api/auth/me | Private | Get admin profile |
| GET | /api/articles | Public | Get articles (paginated) |
| GET | /api/articles/:id | Public | Get single article |
| POST | /api/articles | Admin | Create article |
| PUT | /api/articles/:id | Admin | Update article |
| DELETE | /api/articles/:id | Admin | Delete article |
| GET | /api/youtube/videos | Public | Get YouTube videos |

---

## 🎥 YouTube Integration

The app uses YouTube Data API v3 to fetch long-form videos (>1 minute) from the Raaz-e-Bharat channel. Without an API key, demo videos are shown automatically.

To enable real videos:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable **YouTube Data API v3**
3. Create an API key
4. Add it to `server/.env` as `YOUTUBE_API_KEY`

---

## 🔐 Admin Panel

- URL: http://localhost:5173/admin/login
- Default: `admin` / `admin123`
- Features: Create, edit, delete articles with image upload

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Routing | React Router v6 |
| HTTP | Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Upload | Multer |
| Notifications | React Hot Toast |
