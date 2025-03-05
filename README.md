# 🎁 GiftBloom – E-Commerce Gifting Platform  

## 📌 Overview  
GiftBloom is a **MERN-stack** e-commerce platform designed for seamless and personalized gifting. It enables users to browse, filter, and purchase gifts online with secure payments, while administrators can manage products, orders, and user activities through a dedicated dashboard.  

## 🚀 Features  
### **User Features**  
- 🔹 **User Authentication** (Signup/Login with JWT)  
- 🔹 **Product Filtering & Searching** (By category, price, occasion, etc.)  
- 🔹 **Shopping Cart & Checkout** (Add/remove items, order summary)  
- 🔹 **Secure Payment Integration** (Stripe)  
- 🔹 **Order Tracking & History**  
- 🔹 **Wishlist Management**  
- 🔹 **User Profile & Address Management**  

### **Admin Features**  
- 🛍️ **Product Management** (Add, edit, delete, categorize)  
- 📦 **Order Management** (View, update order status)  
- 📊 **Dashboard with Analytics** (Track sales, orders, and revenue)  

## 🏗️ Tech Stack  
| **Technology** | **Usage** |  
|--------------|------------|  
| **React.js** | Frontend UI |  
| **Node.js & Express.js** | Backend API |  
| **MongoDB** | Database |  
| **JWT (JSON Web Tokens)** | Authentication |  
| **Redux** | State Management |  
| **Tailwind CSS** | Styling |  
| **Stripe API** | Payment Integration |  
| **Multer** | Image Uploads |  
| **Cloudinary** | Image Hosting |  

## 🛠️ Installation & Setup  
1️⃣ **Clone the Repository:**  
```sh
git clone https://github.com/yourusername/GiftBloom.git
cd GiftBloom
```

2️⃣ **Install Dependencies:**  
- **Backend:**  
```sh
cd backend
npm install
```
- **Frontend:**  
```sh
cd frontend
npm install
```

3️⃣ **Set Up Environment Variables:**  
- Create a `.env` file in the backend folder and add:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4️⃣ **Run the Project:**  
- Start the **backend server**:  
```sh
cd backend
npm start
```
- Start the **frontend server**:  
```sh
cd frontend
npm start
```
- Open `http://localhost:3000/` in your browser.  


## 🤝 Contributing  
Feel free to fork this repository and submit pull requests! Contributions are welcome to enhance features, fix bugs, and improve performance.  

