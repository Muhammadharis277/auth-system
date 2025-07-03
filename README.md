Auth System – Node.js, Express, TypeScript
This project implements a secure user authentication system using Node.js, Express, TypeScript, and MongoDB, with features like registration, login, profile management, password updates, and activity logging.

🚀 Features
✅ User Registration with:

Age validation (Must be at least 18)

Input validation and sanitization

Password hashing for security

✅ User Login with:

JWT (JSON Web Token) authentication

Secure token-based access to protected routes

✅ Profile Management:

Update profile information

Change password with secure verification

✅ Activity/Change Log:

Logs maintained for profile updates and password changes

User can view their activity history

✅ Full API built with:

Express.js and TypeScript

MongoDB with Mongoose ORM

JWT for authentication

Express-Validator for data validation

Sanitization to prevent malicious inputs

📂 Tech Stack
Backend: Node.js, Express.js, TypeScript

Database: MongoDB, Mongoose

Auth: JWT (JSON Web Token)

Validation: express-validator

Security: bcrypt for password hashing, sanitization for inputs

🛠️ Setup Instructions
Clone the repository:
git clone https://github.com/Muhammadharis277/auth-system.git
cd auth-system

Install dependencies:
npm install

Setup environment variables:
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the development server:
npx ts-node src/server.ts

📬 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register new user	No
POST	/api/auth/login	Login existing user	No
PUT	/api/users/profile	Update user profile	Yes (Bearer Token)
PUT	/api/users/password	Update user password	Yes (Bearer Token)
GET	/api/users/activity	Get user activity logs	Yes (Bearer Token)

✅ Requirements Completed
✔️ User Registration & Login
✔️ Profile & Password update
✔️ Activity/Changelog maintained
✔️ View Activity Log
✔️ Full input validation and sanitization
✔️ Age restriction (18+) on registration

⏳ Time Taken
Approximately 4-5 hours to complete and test all functionalities.

📝 Notes
You can use Postman or any API client to test endpoints
Frontend is optional (can be added with React, Tailwind)

