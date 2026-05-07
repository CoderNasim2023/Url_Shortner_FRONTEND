
Project: MERN Stack URL Shortener (urlify.co.in)
Tech Stack: MongoDB, Express.js, React (Vite), Node.js
Deployment: Frontend (Vercel), Backend (Render), Database (MongoDB Atlas)

═══════════════════════════════════════════════════════════════════
📋 TABLE OF CONTENTS
═══════════════════════════════════════════════════════════════════

1. Project Architecture Overview
2. Critical Issues Encountered & Solutions
3. Deep Technical Analysis
4. Interview Question Responses
5. Advanced Concepts Demonstrated
6. Performance Optimization Strategies

═══════════════════════════════════════════════════════════════════
🏗️ 1. PROJECT ARCHITECTURE OVERVIEW
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION ARCHITECTURE                   │
└─────────────────────────────────────────────────────────────┘

                    User Browser
                         │
                         ↓
              ┌──────────────────────┐
              │   urlify.co.in       │
              │   (Vercel CDN)       │
              │   - React Frontend   │
              │   - Static Assets    │
              └──────────┬───────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
    API Requests                   Short URL Access
    /api/*                         /:shortId
         │                               │
         ↓                               ↓
   ┌─────────────────────────────────────────┐
   │  url-shortner-backend-2l6c.onrender.com │
   │  (Render - Node.js/Express)              │
   │  - REST API Endpoints                    │
   │  - URL Redirect Logic                    │
   │  - JWT Authentication                    │
   └──────────────────┬──────────────────────┘
                      │
                      ↓
         ┌────────────────────────┐
         │  MongoDB Atlas         │
         │  (Cloud Database)      │
         │  - User Collection     │
         │  - URLs Collection     │
         └────────────────────────┘


KEY COMPONENTS:

Frontend (React + Vite):
  - Single Page Application (SPA)
  - React Router for client-side routing
  - Axios for HTTP requests with interceptors
  - Redux for state management
  - Tailwind CSS for styling

Backend (Node.js + Express):
  - RESTful API architecture
  - JWT-based authentication
  - MongoDB with Mongoose ORM
  - CORS configured for cross-origin requests
  - Rate limiting for security
  - Compression middleware for performance

Database (MongoDB Atlas):
  - Cloud-hosted NoSQL database
  - Collections: users, urls
  - Indexes on frequently queried fields

  Contributing
We welcome contributions from the community! If you find this project helpful, please give it a ⭐ star on GitHub.

How to Contribute
Report Issues: Open an issue for bugs, feature requests, or improvements.
Submit Pull Requests: Fork the repo, make changes, and submit a PR with a clear description.
Follow Guidelines: Use conventional commits, add tests for new features, and ensure code passes linting.
For major changes, please discuss in an issue first. Let's build something great together! 🚀
