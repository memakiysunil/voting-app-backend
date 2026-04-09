# 🗳️ Voting Application Backend

## Overview

A secure backend system for an online voting application built using **Node.js, Express.js, and MongoDB**.

Users can register with their Aadhaar number, login securely, and cast their vote. The system strictly enforces **one-person-one-vote** rule and provides **role-based access control** for administrators.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| bcrypt | Password hashing |
| dotenv | Environment variables |
| Helmet | HTTP Security Headers |

---

## ✨ Features

### 👤 User Features
- Register using Aadhaar number (12-digit validation)
- Secure login with JWT token
- Cast vote — only once per user
- View list of candidates
- View election results

### 🔐 Admin Features
- Add new candidates
- Update candidate information
- Delete candidates
- View vote count (sorted by votes)

---

## 🔒 Security Features
- Passwords hashed using **bcrypt**
- **JWT** based authentication & protected routes
- **Role-based authorization** — Admin / Voter
- Aadhaar number uniqueness validation
- Centralized error handling middleware
- **Helmet.js** — Secures HTTP headers to prevent common web attacks

---

## 📁 Project Structure

```
voting-app-backend/
├── config/          # Database configuration
├── controllers/     # Business logic
├── middlewares/     # Auth & role middlewares
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── server.js        # Application entry point
└── app.js           # Express app setup
```

---

## 🚀 API Endpoints

### Authentication
```
POST /user/signup             → Register new user
POST /user/login              → Login & get JWT token
GET  /user/profile            → Get logged-in user profile
PUT  /user/profile/password   → Update password
```

### Candidates
```
GET    /candidate                → Get all candidates
POST   /candidate                → Add candidate (Admin only)
PUT    /candidate/:candidateID   → Update candidate (Admin only)
DELETE /candidate/:candidateID   → Delete candidate (Admin only)
```

### Voting & Results
```
POST /candidate/vote/:candidateID → Cast vote (Voter only)
GET  /candidate/vote/count        → View results (Admin only)
```

---

## ⚙️ Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/memakiysunil/voting-app-backend.git
cd voting-app-backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file**
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

**4. Run the server**
```bash
# Development
npm run dev

# Production
npm start
```

---

## 🏗️ Architecture

This project follows **MVC (Model-View-Controller)** pattern:

- **Model** — MongoDB schemas using Mongoose
- **Controller** — Business logic for each feature
- **Routes** — API endpoint definitions
- **Middlewares** — JWT auth + Admin role check + Error handler

---

## 👨‍💻 Author

**Sunil Memakiya**

GitHub: [@memakiysunil](https://github.com/memakiysunil)

---

## 📄 License

ISC