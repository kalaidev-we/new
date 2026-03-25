<div align="center">
  <img src="https://via.placeholder.com/800x200?text=E-Commerce+Catalogue+Pro" alt="Project Banner" />
  <br />
  <br />
  
  [![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-16.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-Latest-white?style=for-the-badge&logo=three.js&logoColor=black)](https://threejs.org/)

  <h3>A Modern, Production-Ready MERN Stack E-Commerce Platform</h3>
  <p>Interactive 3D Product Canvas &bull; REST API &bull; Secure JWT Admin Dashboard</p>
</div>

---

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Seeding](#database-seeding)
- [API Reference](#-api-reference)
- [Admin Access](#-admin-access)
- [License](#-license)

---

## ✨ Features

### Customer Face
- **Interactive 3D Hero Canvas**: Built with `@react-three/fiber` to deliver a premium, modern feel.
- **Dynamic Catalogue**: Responsive product grids tailored for mobile, tablet, and desktop viewing.
- **Product Details**: Individual product pages detailing specifications, stock status, and dynamic rendering.

### Secure Admin Backoffice
- **JWT Authentication**: Encrypted, token-based verification for administrator sessions.
- **Dashboard Statistics**: Quick, realtime overview of platform health and total products.
- **Catalogue Management (CRUD)**: Create, Read, Update, and Delete products effortlessly via modal-driven interfaces.
- **Image Uploads**: Integrated `multer` constraints for persistent, safe backend file handling of product photos.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React (Vite), React Router DOM, Tailwind CSS |
| **3D Rendering** | Three.js, React Three Fiber, React Three Drei |
| **Backend** | Node.js, Express.js |
| **Database & ODM** | MongoDB, Mongoose |
| **Auth & Security** | JSON Web Tokens (JWT), BcryptJS, CORS |
| **State & Tools** | Axios, React Toastify, React Icons |

---

## 🏗 Architecture

```text
EcomStore/
├── backend/
│   ├── config/          # MongoDB Connection Logic
│   ├── controllers/     # Route Handlers
│   ├── middleware/      # JWT Protection & Multer Config
│   ├── models/          # Mongoose Schemas (Admin, Category, Product)
│   ├── routes/          # Express Routers
│   ├── uploads/         # Static Product Images Directory
│   ├── seeder.js        # Initial Database Population Script
│   └── server.js        # Application Entry Point
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI (Hero, Header, Footer)
    │   ├── pages/       # Next-Gen React Routing Views
    │   └── App.jsx      # Core React Router logic
    └── tailwind.config.js
```

---

## 🚀 Getting Started

Follow these steps to spin up the application gracefully on your local machine.

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16.0.0 or higher)
- **MongoDB** running locally or a MongoDB Atlas connection string.
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ecom-catalogue-pro.git
   cd ecom-catalogue-pro
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Setup the Frontend:**
   Open a new terminal window at the project root:
   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

In the `backend/` directory, create a `.env` file referencing the provided `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecom_catalogue
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### Database Seeding

Before starting the server for the first time, it is heavily recommended to inject the initial administration account and placeholder categories.

In your `backend/` terminal, run:

```bash
node seeder.js
```
*Outputs: `Seed Data Imported Successfully - Admin: username: admin / password: password123`*

### Firing up the Servers

**Backend:**
```bash
# Inside the backend/ directory
npm run dev
```

**Frontend:**
```bash
# Inside the frontend/ directory
npm run dev
```
*Your application will now be live at `http://localhost:5173/`*

---

## 🔌 API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Authenticate admin & get token |
| `GET` | `/api/products` | Public | Fetch all products |
| `GET` | `/api/products/:id` | Public | Fetch single product by ID |
| `POST` | `/api/products` | Private / Admin | Create a product via Multer formData |
| `PUT` | `/api/products/:id` | Private / Admin | Update a product |
| `DELETE` | `/api/products/:id` | Private / Admin | Restrict and delete product |
| `GET` | `/api/categories` | Public | Fetch available categories |

---

## 🛡 Admin Access

To access the backoffice:
1. Navigate to: `http://localhost:5173/admin/login`
2. Enter the seeded credentials:
   - **Username**: `admin`
   - **Password**: `password123`
3. Enjoy managing your E-Commerce platform!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">Made with ❤️ by an E-Commerce Enthusiast</p>
