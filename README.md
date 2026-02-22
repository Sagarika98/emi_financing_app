#EMI Financing Application

A full-stack EMI financing web application built with **React.js** (Frontend), **Node.js** (Backend), and **MongoDB** (Database). Users can view products with multiple EMI plans backed by mutual funds.

<img width="508" height="735" alt="image" src="https://github.com/user-attachments/assets/dd7285ac-eb3a-4060-81a0-61d89332b44a" />

<img width="510" height="739" alt="image" src="https://github.com/user-attachments/assets/634c01ac-b4cd-49d0-bf06-f7e498523925" />





#Table of Contents
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Seed Data](#-seed-data)
- [API Endpoints](#-api-endpoints)
- [Setup Instructions](#-setup-instructions)
- [Schema Used](#-features)

  
#Tech Stack
### Frontend (React.js)
├── React.js - UI library for building components
├── React Router - Navigation and routing
├── Axios - HTTP client for API calls
├── CSS3 - Styling with responsive design
└── React Hooks - State management (useState, useEffect)

### Backend (Node.js)
├── Node.js - JavaScript runtime environment
├── Express.js - Web framework for REST APIs
├── MongoDB - NoSQL database
├── Mongoose - ODM library for MongoDB
├── CORS - Cross-origin resource sharing
└── Dotenv - Environment variable management

### Database (MongoDB)
├── MongoDB Atlas - Cloud database
├── MongoDB Compass - Local database
└── Mongoose ODM - Schema modeling

## Project Structure
emi-financing-app/
│
├── 📁 backend/                          # Node.js Backend
│   ├── 📁 models/                       # MongoDB Schemas
│   │   ├── 📄 Product.js
│   │   └── 📄 EmiPlan.js
│   ├── 📄 server.js                      # Main server file
│   ├── 📄 seed.js                        # Database seed data
│   ├── 📄 package.json
│   └── 📄 .env
│
├── 📁 frontend/                         # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📄 ProductPage.js
│   │   │   └── 📄 ProductPage.css
│   │   ├── 📄 App.js
│   │   └── 📄 index.js
│   ├── 📁 public/
│   └── 📄 package.json
│
└── 📄 README.md

## 🗄️ Database Schema (MongoDB)

### 1. Product Collection (`models/Product.js`)

```javascript
const productSchema = {
  name: String,           // Product name (e.g., "iPhone 17 Pro")
  brand: String,          // Brand name (e.g., "Apple")
  slug: String,           // URL identifier (e.g., "iphone-17-pro")
  category: String,       // Product category (e.g., "smartphones")
  
  variants: [{
    color: String,        // Color option (e.g., "Silver")
    storage: String,      // Storage capacity (e.g., "256GB")
    ram: String,          // RAM size (e.g., "8GB")
    price: Number,        // Current selling price
    mrp: Number,          // Maximum retail price
    image: String         // Image filename (e.g., "iphone-silver.jpg")
  }]
}

### 2. EMI Plan Collection (`models/EmiPlan.js`)

```javascript
const emiPlanSchema = {
  productId: ObjectId,     // Reference to Product collection
  tenure: Number,          // EMI duration in months (3,6,12,24,36,48,60)
  monthlyAmount: Number,   // Monthly payment amount
  interestRate: String,    // Interest rate (0% or 10.5%)
  cashback: Number,        // Cashback amount (₹7500)
  totalAmount: Number      // Total payable amount
}
```

## 🌱 Seed Data

### Products (3 Products, 8 Variants)

```javascript
// iPhone 17 Pro - 3 variants
{
  name: "iPhone 17 Pro",
  brand: "Apple",
  slug: "iphone-17-pro",
  variants: [
    { color: "Silver", storage: "256GB", ram: "8GB", price: 127400, mrp: 134900 },
    { color: "Cosmic Orange", storage: "256GB", ram: "8GB", price: 127400, mrp: 134900 },
    { color: "Deep Blue", storage: "512GB", ram: "12GB", price: 147400, mrp: 154900 }
  ]
}

// Samsung S24 Ultra - 2 variants
{
  name: "Samsung S24 Ultra",
  brand: "Samsung",
  slug: "samsung-s24-ultra",
  variants: [
    { color: "Titanium Gray", storage: "512GB", ram: "12GB", price: 124999, mrp: 134999 },
    { color: "Phantom Black", storage: "512GB", ram: "12GB", price: 124999, mrp: 134999 }
  ]
}

// OnePlus 12 - 1 variant
{
  name: "OnePlus 12",
  brand: "OnePlus",
  slug: "oneplus-12",
  variants: [
    { color: "Emerald Green", storage: "256GB", ram: "12GB", price: 64999, mrp: 69999 }
  ]
}
```

## 📡 API Endpoints (Node.js + Express)

### Base URL
```
http://localhost:5000/api
```

### 1. Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "slug": "iphone-17-pro",
      "variants": [...]
    }
  ]
}
```

### 2. Get Single Product
```http
GET /api/products/:slug
```

**Example:** `GET /api/products/iphone-17-pro`

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "slug": "iphone-17-pro",
    "variants": [...]
  },
  "defaultVariant": {
    "color": "Silver",
    "storage": "256GB",
    "price": 127400
  },
  "emiPlans": [
    { "tenure": 3, "monthlyAmount": 42467, "interestRate": "0%", "cashback": 7500 },
    { "tenure": 6, "monthlyAmount": 21233, "interestRate": "0%", "cashback": 7500 },
    { "tenure": 12, "monthlyAmount": 10617, "interestRate": "0%", "cashback": 7500 },
    { "tenure": 24, "monthlyAmount": 5308, "interestRate": "0%", "cashback": 7500 },
    { "tenure": 36, "monthlyAmount": 3539, "interestRate": "10.5%", "cashback": 7500 },
    { "tenure": 48, "monthlyAmount": 2654, "interestRate": "10.5%", "cashback": 7500 },
    { "tenure": 60, "monthlyAmount": 2123, "interestRate": "10.5%", "cashback": 7500 }
  ]
}
```

### 3. Seed Database
```http
POST /api/seed
```

**Response:**
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "stats": {
    "products": 3,
    "emiPlans": 21
  }
}
```

---
###Setup and run instructions-
### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/emi-financing-app.git
cd emi-financing-app
```

### Step 2: Backend Setup (Node.js + MongoDB)

```bash
# Go to backend folder
cd backend

# Install Node.js dependencies
npm install express mongoose cors dotenv

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/emi_financing" > .env

# Seed MongoDB database
node seed.js

# Start Node.js server
npm start
```

✅ Backend running at: `http://localhost:5000`

### Step 3: Frontend Setup (React)

```bash
# Open new terminal
cd frontend

# Install React dependencies
npm install react-router-dom axios

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start React app
npm start
```

✅ Frontend running at: `http://localhost:3000`

---

