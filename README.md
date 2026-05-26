# 🚀 Next.js Firebase Dashboard

A modern full-stack dashboard application built using **Next.js**, **Firebase Authentication**, **Firestore Database**, and **Tailwind CSS**.

---

# ✨ Features

✅ Landing Page
✅ Google Authentication using Firebase
✅ User Signup & Login
✅ Protected Dashboard
✅ Firestore Database Integration
✅ Responsive Dashboard UI
✅ Form Submission & Data Storage
✅ Fetch & Display Firestore Data
✅ Dummy Payment Page
✅ UPI / Debit Card / Credit Card Payment UI
✅ Logout Functionality
✅ Environment Variables Setup
✅ Tailwind CSS Styling

---

# 🛠️ Tech Stack

| Technology      | Usage                     |
| --------------- | ------------------------- |
| ⚛️ Next.js      | Frontend Framework        |
| 🔥 Firebase     | Authentication & Database |
| 🎨 Tailwind CSS | Styling                   |
| 📄 Firestore    | NoSQL Database            |
| ⚡ React.js      | UI Components             |
| 💻 JavaScript   | Programming Language      |

---

# 📁 Project Structure

```bash
app/
 ├── login/
 ├── signup/
 ├── dashboard/
 ├── form/
 ├── payment/

components/

firebase/
 └── config.js

public/

.env.local
```

---

# 🔥 Firebase Features

## 🔐 Authentication

* Email/Password Authentication
* Google Authentication
* Protected Routes

## 📄 Firestore Database

* Store User Details
* Store Form Data
* Store Dashboard Data

---

# 🌍 Environment Variables

Create a `.env.local` file in the root folder.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

---

# 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 🏠 Landing Page

The application contains a modern landing page with:

✅ Hero Section
✅ Continue with Google Button
✅ Responsive Design
✅ Navigation to Dashboard

---

# 🔐 Authentication Flow

## Google Login

* User clicks:
  `Continue with Google`
* Firebase Google popup opens
* User authenticates with Google
* User details stored in Firestore
* User redirected to Dashboard

Stored User Data:

* UID
* Display Name
* Email
* Photo URL
* Created At

---

# 📊 Dashboard Features

✅ Sidebar Navigation
✅ Top Navbar
✅ Welcome User Section
✅ Logout Button
✅ Responsive UI

---

# 📝 Form Page

Route:

```bash
/form
```

Form Fields:

* Full Name
* Email
* Phone Number
* Age
* Address

Submitted data is stored inside Firestore collection:

```bash
usersData
```

---

# 💳 Dummy Payment Page

Route:

```bash
/payment
```

Payment Options:

* ✅ UPI
* ✅ Debit Card
* ✅ Credit Card

Features:

* Dummy Payment Flow
* Success Message
* Responsive Payment UI
* Frontend-only Payment Simulation

---

# 🗂️ Firestore Collections

## 👥 users

Stores:

* UID
* Display Name
* Email
* Photo URL
* Created At

---

## 📄 usersData

Stores:

* Form Details
* User Information
* Timestamp

---

# 🔒 Route Protection

✅ Unauthenticated users cannot access Dashboard
✅ Firebase Authentication based protection

---

# 🚀 Future Improvements

* 🌙 Dark Mode
* ✏️ Edit/Delete Firestore Data
* 📈 Charts & Analytics
* 👤 User Profile Management
* ☁️ Firebase Hosting Deployment
* 🛡️ Admin Panel

---

# 👨‍💻 Author

Hitesh Kumar S
