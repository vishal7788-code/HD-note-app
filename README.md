# Notes App Backend

This repository contains the backend for the Notes App, providing APIs for user authentication, note creation, retrieval, and deletion. Built using Node.js, Typescript, Express, and MongoDB, the backend also includes JWT-based authentication and handles secure user sessions.

---

## Features

- **User Authentication**: Email and OTP-based signup/signin.
- **JWT Authorization**: Secure API access.
- **Notes Management**: Create, retrieve, and delete notes.
- **Error Handling**: Robust error handling for API requests.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. [Node.js](https://nodejs.org/) (v14 or higher)
2. [MongoDB](https://www.mongodb.com/try/download/community)
3. [npm](https://www.npmjs.com/)

---

## Getting Started

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
Install the required Node.js modules:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=8000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
SMTP_HOST=<your-smtp-host>
SMTP_PORT=<your-smtp-port>
SMTP_USER=<your-smtp-user>
SMTP_PASS=<your-smtp-password>
CLIENT_URL=http://localhost:3000
```

Replace the placeholders with your actual configuration.

### 4. Start the MongoDB Server
Ensure your MongoDB server is running locally or accessible through the provided connection string.

### 5. Run the Server
Start the development server using the following command:
```bash
npm run dev
```
The server will start on `http://localhost:3000` (or the port you specified in `.env`).

---

## API Endpoints

### Authentication

#### 1. Signup with Email
**POST** `/api/auth/signup`
```json
{
  "email": "user@example.com"
}
```
Response:
```json
{
  "success": true,
  "message": "OTP sent to email."
}
```

#### 2. Verify OTP and Sign In
**POST** `/api/auth/verify`
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
Response:
```json
{
  "success": true,
  "token": "<jwt-token>"
}
```

#### 3. Sign Out
**POST** `/api/auth/signout`

### Notes

#### 1. Create a Note
**POST** `/api/notes`
Headers:
```json
{
  "Authorization": "Bearer <jwt-token>"
}
```
Body:
```json
{
  "title": "Sample Note",
  "content": "This is a sample note."
}
```
Response:
```json
{
  "success": true,
  "note": {
    "_id": "note-id",
    "title": "Sample Note",
    "content": "This is a sample note."
  }
}
```

#### 2. Get All Notes
**GET** `/api/notes`
Headers:
```json
{
  "Authorization": "Bearer <jwt-token>"
}
```
Response:
```json
{
  "success": true,
  "notes": [
    { "_id": "note-id", "title": "Note 1", "content": "Content 1" },
    { "_id": "note-id", "title": "Note 2", "content": "Content 2" }
  ]
}
```

#### 3. Delete a Note
**DELETE** `/api/notes/:id`
Headers:
```json
{
  "Authorization": "Bearer <jwt-token>"
}
```
Response:
```json
{
  "success": true,
  "message": "Note deleted successfully."
}
```

---

## Development Scripts

- **Start Server**:
  ```bash
  npm run dev
  ```
- **Run Tests**:
  ```bash
  npm test
  ```
- **Lint Code**:
  ```bash
  npm run lint
  ```

---

## Folder Structure

```
backend
├── controllers       # API logic and handlers
├── middlewares       # Authentication and error handling
├── models            # Mongoose schemas
├── routes            # API routes
├── utils             # Helper functions
├── .env              # Environment variables
├── server.ts         # Entry point for the server
└── package.json      # Node.js dependencies and scripts
```

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your fork.
5. Submit a pull request.

---

## Contact

For any issues or inquiries, please contact:
- **Author**: Vishal Mishra
- **Email**: vm069713@gmail.com
