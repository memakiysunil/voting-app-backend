# Voting Application Backend

## Overview

This project is a backend system for a secure voting application built using **Node.js, Express.js, and MongoDB**.
It allows users to register using their Aadhaar number, vote for candidates, and view election results.

The system enforces **one-person-one-vote** and includes **role-based access control** for administrators.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt for password hashing

---

## Features

### User Features

* User Registration with Aadhaar validation
* Secure Login using JWT
* One person can vote only once
* View candidate list
* View vote results

### Admin Features

* Add new candidates
* Update candidate information
* Delete candidates
* Manage election candidates

---

## Security Features

* Password hashing using bcrypt
* JWT based authentication
* Role-based authorization (Admin / Voter)
* Validation for Aadhaar number

---

## API Endpoints

### Authentication

POST /signup
POST /login

### Candidates

GET /candidates
POST /candidate
PUT /candidate/:candidateID
DELETE /candidate/:candidateID

### Voting

POST /vote/:candidateID

### Results

GET /vote/count

---

## Project Structure

```
config/
controllers/
middlewares/
models/
routes/
server.js
```

---

## Installation

Clone the repository: voting-app-backend

```
git clone https: https://github.com/memakiysunil/voting-app-backend.git
```

Install dependencies:

```
npm install
```

Create a `.env` file:

```
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run the server:

```
npm start
```

---

## Author

Sunil

 


