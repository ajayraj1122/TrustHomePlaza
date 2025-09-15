
       🏠 TrustHomePlaza - Real Estate Marketplace

A comprehensive real estate platform that revolutionizes how you buy, sell, and rent properties. Built with React, Node.js, Express, and MongoDB, featuring secure authentication, advanced search filters, and an intuitive user interface.

leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.

Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.

Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.

🌟 Features

 🔐 Authentication & Security
Google OAuth Integration - Seamless sign-in with Google accounts
Email/Password Authentication - Traditional login system
Secure User Profiles - Personal account management
Protected Routes - Secure access to user-specific features

 🏡 Property Management
Create Listings - Add properties with detailed information
Image Upload System - Support for multiple high-quality images
Property Types - Support for both sale and rental properties
Offer Management - Special pricing and discount features
Property Features - Bedrooms, bathrooms, parking, furnished status

🔍 Advanced Search & Filtering
Smart Search - Find properties by location, type, and features
Filter Options - Sort by price, type (rent/sale), amenities
Real-time Results - Instant property listing updates
Location-based Search - Search by specific areas and neighborhoods

📱 User Experience
Responsive Design - Perfect experience across all devices
Interactive Image Galleries - Swiper-based property showcases
Auto-sliding Gallery** - Beautiful home page with property highlights
User Dashboard - Manage personal listings and profile
Direct Communication - Contact property owners directly

🎨 Modern UI/UX
Clean Interface - Modern, intuitive design
Smooth Animations - Enhanced user interactions
Professional Layout - Real estate industry-focused design
Mobile-First - Optimized for mobile devices

📸 Screenshots

Authentication System [Sign Up] 

Secure user registration with email and Google OAuth

[Sign In] 
Multiple authentication options for user convenience

Property Search & Listings [Search Results]


Advanced filtering and search capabilities

[Property Grid]

Clean property listing grid with detailed information














 Property Details [Property Detail]

 Comprehensive property information with image gallery

User Dashboard [User Profile]

 User profile management and settings














 [User Listings]

Personal property listing management

Property Creation [Create Listing]

Intuitive property listing creation interface

[Home Page]

Beautiful landing page with featured properties

[Recent Properties]






Showcasing recent offers, rentals, and sales

About Page

Company information and platform details

🚀 Tech Stack
 
 Frontend
- React 18 - Modern JavaScript framework
- React Router - Client-side routing
- Redux Toolkit - State management
- Tailwind CSS - Utility-first CSS framework
- Swiper - Touch slider for image galleries
- React Icons - Icon library

 Backend
- Node.js - JavaScript runtime
- Express.js - Web application framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- Multer - File upload middleware
- JWT - JSON Web Tokens for authentication

 Authentication
- Firebase Authentication - Google OAuth integration
- bcryptjs - Password hashing
- jsonwebtoken - JWT token management

 File Storage
- Local File System - Image storage with proper URL handling
- Multer - File upload processing

Firebase Setup
1. Create a Firebase project
2. Enable Google Authentication
3. Add your domain to authorized domains
4. Configure Firebase in `client/src/firebase.js`

 5. Run the Application
 bash
 Development mode (runs both client and server)
 npm run dev

 Production build
 npm run build
 npm start

The application will be available at `https://trusthomeplaza.onrender.com`







 📁 Project Structure

TrustHomePlaza/
├── client/                  React frontend
│   ├── src/
│   │   ├── components/      Reusable React components
│   │   ├── pages/           Page components
│   │   ├── redux/           Redux store and slices
│   │   └── firebase.js      Firebase configuration
├── api/                     Express backend
│   ├── controllers/         Route controllers
│   ├── models/             MongoDB models
│   ├── routes/             API routes
│   └── middleware/         Custom middleware
├── uploads/                File storage
│   └── listings/           Property images
└── package.json            Dependencies and scripts
```

 🔧 API Endpoints

 Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/google` - Google OAuth

 Listings
- `GET /api/listing/get` - Get all listings (with filters)
- `GET /api/listing/get/:id` - Get single listing
- `POST /api/listing/create` - Create new listing
- `PUT /api/listing/update/:id` - Update listing
- `DELETE /api/listing/delete/:id` - Delete listing

 Users
- `GET /api/user/:id` - Get user profile
- `PUT /api/user/update/:id` - Update user profile
- `DELETE /api/user/delete/:id` - Delete user account

 🌐 Features In Detail

 Property Search
- Text Search: Search by property name, description, or location
- Type Filter: Filter by sale or rental properties
- Price Range: Set minimum and maximum price limits
- Amenities: Filter by parking, furnished status
- Offer Filter: Find properties with special offers

 Image Management
- Multiple Upload: Support for up to 6 images per property
- Image Optimization: Automatic image processing and optimization
- Default Images: Fallback system for missing images
- Gallery View: Swiper-based image galleries

 User Dashboard
- Profile Management: Update personal information
- Listing Management: Create, edit, and delete property listings
- Authentication: Secure login/logout functionality

 👥 Authors

 Mansi Srivastava and Ajay Raj

 🙏 Acknowledgments

- React community for excellent documentation
- Firebase for authentication services
- Unsplash for high-quality property images
- MongoDB for robust database solutions


TrustHomePlaza - Making real estate transactions accessible to everyone! 🏠✨
