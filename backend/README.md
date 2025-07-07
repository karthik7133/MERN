# Car Rental Booking System - Backend API

## 🚗 Overview
This is the backend API for the Car Rental Booking System built with Node.js, Express.js, and MongoDB.

## 🛠️ Tech Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure
```
backend/
├── models/          # Database models
│   ├── Car.js
│   ├── User.js
│   └── Booking.js
├── routes/          # API routes
│   ├── auth.js
│   ├── cars.js
│   ├── bookings.js
│   └── users.js
├── middleware/      # Custom middleware
│   └── auth.js
├── config/          # Configuration files
│   └── database.js
├── utils/           # Utility functions
│   └── seedData.js
├── .env            # Environment variables
├── server.js       # Main server file
└── package.json    # Dependencies
```

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   MONGODB_URI=mongodb+srv://chkarthik853:39KSkmvn8OHr1Ci2@cluster7.nj5plt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

3. **Start Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Add new car (Admin)

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:bookingId` - Get booking details
- `GET /api/bookings` - Get all bookings (Admin)

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update user profile

### Health Check
- `GET /api/health` - API health status

## 📊 Database Models

### Car Model
```javascript
{
  name: String,
  price: String,
  pricePerDay: Number,
  image: String,
  features: [String],
  description: String,
  rating: Number,
  reviews: Number,
  category: String,
  transmission: String,
  fuelType: String,
  seats: Number,
  availability: Boolean,
  location: String
}
```

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String,
  isActive: Boolean,
  lastLogin: Date
}
```

### Booking Model
```javascript
{
  user: ObjectId,
  car: ObjectId,
  bookingDetails: {
    name: String,
    email: String,
    phone: String,
    location: String,
    fromDate: Date,
    toDate: Date
  },
  paymentDetails: Object,
  totalAmount: Number,
  totalDays: Number,
  status: String,
  bookingId: String
}
```

## 🔐 Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware

## 🚀 Features
- ✅ MongoDB Atlas connection
- ✅ RESTful API design
- ✅ User authentication & authorization
- ✅ Car management system
- ✅ Booking management
- ✅ Error handling
- ✅ Data validation
- ✅ Security best practices

## 📝 API Response Format
```javascript
{
  "status": "success|error",
  "message": "Response message",
  "data": {}, // Response data
  "results": 0 // For list endpoints
}
```

## 🔍 Testing
Test the API using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all cars
curl http://localhost:5000/api/cars
```

## 🌟 Production Ready
This backend is designed to be production-ready with:
- Environment-based configuration
- Error handling middleware
- Security best practices
- Scalable architecture
- MongoDB Atlas cloud database