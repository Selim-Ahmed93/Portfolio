# Portfolio Backend API

A production-deployed backend for my personal developer portfolio, built to handle contact form submissions, store messages securely, and send real-time email notifications.

This backend transforms my portfolio from a static website into a full-stack application with database integration and third-party email service communication.

## 🚀 Live Application

- **Portfolio:** https://portfolio-puce-eight-63.vercel.app/
- **Backend API:** https://portfolio-t1ah.onrender.com/
- **GitHub Repository:** https://github.com/Selim-Ahmed93/Portfolio

## ✨ Key Features

- **RESTful API:** Built with Express.js to handle contact form submissions.
- **MongoDB Integration:** Stores visitor messages using MongoDB Atlas and Mongoose.
- **Email Notifications:** Integrates the Brevo Transactional Email API to send email notifications.
- **Input Validation:** Validates required fields, data types, empty values, and email formats.
- **Error Handling:** Handles database and email delivery errors gracefully.
- **CORS Configuration:** Restricts API access to the portfolio frontend origin.
- **Environment Variables:** Keeps API keys and database credentials outside the source code.
- **Cloud Deployment:** Backend hosted on Render and integrated with the Vercel frontend.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| Brevo API | Transactional email delivery |
| Dotenv | Environment variable management |
| Git & GitHub | Version control |
| Render | Backend deployment |
| Vercel | Frontend deployment |

## ⚙️ How the Backend Works

The contact form follows a complete backend workflow:

1. A visitor fills out the contact form on my portfolio.
2. The frontend sends a POST request to the Express.js API.
3. The backend validates the submitted information.
4. Valid contact information is stored in MongoDB Atlas.
5. The backend communicates with the Brevo API using HTTPS.
6. Brevo sends an email notification to my configured email address.
7. The API returns a JSON response indicating whether the submission and email notification were successful.
8. The frontend displays a success or error notification to the visitor.

### Application Flow

```text
Portfolio Contact Form
         |
         v
   Express.js API
         |
         v
   Input Validation
         |
         v
    MongoDB Atlas
         |
         v
     Brevo API
         |
         v
  Email Notification
         |
         v
   JSON API Response
         |
         v
  Frontend Toast Message
```

## 📡 API Documentation

### Submit Contact Message

**Endpoint:**
```http
POST /api/contact
```

**Production URL:**
```text
https://portfolio-t1ah.onrender.com/api/contact
```

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project."
}
```

**Successful Response:**
```json
{
  "message": "Contact information submitted successfully",
  "emailSent": true
}
```

**Validation Response:**
```json
{
  "message": "All fields are required"
}
```

The `emailSent` property indicates whether the email notification was successfully sent. Contact information is saved independently, so a temporary email delivery failure does not discard a submitted message.

## 💻 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Selim-Ahmed93/Portfolio.git
```

### 2. Navigate to the Backend Directory

```bash
cd Portfolio/Portfolio-BackEnd
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_verified_sender_email
BREVO_API_KEY=your_brevo_api_key
```

Replace the placeholder values with your own credentials.

**Important:** Never commit your `.env` file or expose your API keys in a public repository.

### 5. Start the Development Server

```bash
npm start
```

The backend will run at:

```text
http://localhost:5000
```

## 🔐 Security & Reliability

- Sensitive credentials are managed through environment variables.
- API requests are validated before database operations.
- Database operations use asynchronous error handling.
- Email delivery errors are handled separately from contact submission.
- CORS is configured for the deployed portfolio frontend.
- The Brevo API key is restricted to transactional email permissions.

## 📁 Backend Structure

```text
Portfolio-BackEnd/
│
├── config/
│   ├── db.js
│   └── mail.js
│
├── models/
│   └── contact.js
│
├── routes/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## 🎯 What This Project Demonstrates

Through this backend integration, I gained practical experience in:

- Designing and implementing REST APIs.
- Connecting a Node.js application to MongoDB Atlas.
- Integrating third-party transactional email services.
- Handling asynchronous operations and errors.
- Managing environment variables and API credentials.
- Connecting a deployed frontend with a separately hosted backend.
- Testing APIs locally and verifying production functionality.

---

**Developed by Md. Selim Ahmed**  
Full Stack Web Developer | MERN Stack

[GitHub](https://github.com/Selim-Ahmed93) · [LinkedIn](https://www.linkedin.com/in/selim-ahmed93) · [Portfolio](https://portfolio-puce-eight-63.vercel.app/)
