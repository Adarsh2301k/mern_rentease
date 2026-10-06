# RentEase

RentEase is a full-stack rental marketplace where users can browse, list, manage, and order rentable items. The app supports both buyers and sellers, with user authentication, item management, cart functionality, and an admin review flow.

## Project Status

This project is currently in active development and is structured as a working MVP for local development and feature testing.

## Tech Stack

### Frontend
- React + Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React / React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Cloudinary for image uploads
- Multer for file handling

## Core Features

- User registration and login
- JWT-based protected routes
- Profile view and profile updates
- Add, update, delete, and browse items
- Category-based item filtering
- Cart and checkout flow
- Seller and buyer order management
- Admin item approval/rejection workflow
- Admin user management
- Cloudinary-powered image upload for items and profiles

## Folder Structure

```bash
rentase/
├── backend/
│   ├── controllers/
│   ├── libs/
│   ├── middleware/
│   ├── models/
│   ├── others/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── package-lock.json
├── rentease/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── Readme.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (18+ recommended)
- npm
- MongoDB instance or MongoDB Atlas connection string
- Cloudinary account for image storage

## Environment Setup

### Backend
Create a `.env` file inside the `backend` folder:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Do not commit your real secrets to version control.

## Run the Project

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Start the backend server

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:4000
```

### 3. Install frontend dependencies

```bash
cd ../rentease
npm install
```

### 4. Start the frontend app

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API Overview

The backend exposes REST APIs under the `/api` prefix:

- `/api/auth` - register, login, logout, profile, update profile
- `/api/items` - list items, add/update/delete items, admin approval flow
- `/api/cart` - cart operations
- `/api/orders` - order creation and status tracking

## Typical User Flow

1. Register or log in
2. Browse and filter available rental items
3. Add items to cart
4. Complete checkout
5. Manage profile and listed items
6. Admin can approve or reject listings

## Notes

- The frontend is configured to call the backend at `http://localhost:4000/api`.
- Cloudinary is used for item and profile image uploads.
- The application is designed as a local-development rental app and can be extended with payment integration, notifications, and improved admin dashboards.

## License

This project is currently used for educational and development purposes.

## Contributors

This project is maintained by the RentEase development team as an ongoing learning and product-building project.
