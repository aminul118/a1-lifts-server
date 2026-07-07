# A1 Lifts & Engineering - Backend API

## Tech Stack

**Node.js, Express.js, TypeScript, MongoDB (Mongoose), Redis, Passport.js (Google OAuth & Local), Cloudinary (Multer), Nodemailer, PDFKit, Zod**

## Core Features

- **Scalable REST APIs:** Developed using **Express.js** and **TypeScript** with clean MVC architecture.
- **Advanced QueryBuilder:** Custom MongoDB utility that enables high-performance searching, dynamic filtering, field selection, sorting, and pagination.
- **Secure Authentication Pipeline:** Supports JWT credentials-login, session refresh, secure cookies, and **Google OAuth** integrated using **Passport.js**.
- **Redis-Backed OTP:** Temporary OTP generation and expiration matching verification requests using **Redis**.
- **Cloud Media Storage:** Direct media upload via **Multer** and **Cloudinary** integrations, complete with automatic asset deletion when a database product is deleted.
- **Nodemailer Notification dispatch:** Built-in mail services with custom HTML templates to handle auto-reply notifications to users and alert messages to administrators.
- **Graceful Shutdown:** Implemented process monitoring to handle server close events gracefully, disconnecting database pools and connections.

## API Route Schema (`/api/v1/`)

| Route        | Description                                                              | HTTP Methods            | Authentication |
| :----------- | :----------------------------------------------------------------------- | :---------------------- | :------------- |
| `/auth`      | Credential/OAuth login, logouts, session refreshes, and password updates | `POST`, `GET`           | Public / JWT   |
| `/user`      | User settings, profile updates, and role designations                    | `POST`, `GET`, `PATCH`  | JWT (RBAC)     |
| `/otp`       | Account confirmation OTP checks linked to Redis                          | `POST`                  | Public         |
| `/product`   | Product listings, category CRUD, and catalog items                       | `POST`, `GET`, `DELETE` | Public / Admin |
| `/blog`      | Blogging system, rich text content details, and thumbnail urls           | `POST`, `GET`, `DELETE` | Public / Admin |
| `/banner`    | Visual slide promotions configurations                                   | `POST`, `GET`, `DELETE` | Public / Admin |
| `/contact`   | Message query submissions with automated email alerts                    | `POST`, `GET`           | Public / Admin |
| `/subscribe` | Newsletter email listing registrations                                   | `POST`, `GET`           | Public / Admin |

## Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` or `.env` file in the server root and configure:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb+srv://...
   REDIS_URL=redis://...
   JWT_ACCESS_SECRET=...
   JWT_REFRESH_SECRET=...
   FRONTEND_URL=http://localhost:3000

   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...

   EMAIL_USER=...
   EMAIL_PASS=...
   ADMIN_EMAIL=...
   ADMIN_NAME=...
   ```

3. **Run Dev Server:**

   ```bash
   npm run dev
   ```

4. **Compile & Start Production Server:**
   ```bash
   npm run build
   npm start
   ```
