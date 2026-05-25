# 🚀 Next.js Firebase Dashboard

A modern full-stack dashboard application built using **Next.js**, **Firebase Authentication**, **Firestore Database**, and **Tailwind CSS**.

---

# ✨ Features

✅ User Signup Authentication
✅ User Login Authentication
✅ Firebase Email/Password Authentication
✅ Firestore Database Integration
✅ Protected Dashboard
✅ Responsive Dashboard UI
✅ Form Submission & Data Storage
✅ Fetch & Display Firestore Data
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

```bash id="om38lf"
app/
 ├── login/
 ├── signup/
 ├── dashboard/

components/

firebase/
 └── config.js

public/

.env.local
```

---

# 🔥 Firebase Setup

## 1️⃣ Create Firebase Project

Go to Firebase Console and create a new project.

---

## 2️⃣ Enable Authentication

* Open Authentication
* Go to Sign-in method
* Enable Email/Password Authentication

---

## 3️⃣ Enable Firestore Database

* Open Firestore Database
* Create Database
* Select Test Mode

---

# 🌍 Environment Variables

Create a `.env.local` file in the root folder.

```env id="y0v6jq"
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

---

# ⚙️ Firebase Configuration

Create:

```bash id="n7lc0x"
firebase/config.js
```

Configure:

* 🔐 Firebase Authentication
* 📄 Firestore Database
* 🚀 Firebase App Initialization

---

# 📦 Installation

Clone the repository:

```bash id="c4ql8f"
git clone <repository-url>
```

Install dependencies:

```bash id="puhmt2"
npm install
```

---

# ▶️ Run Development Server

```bash id="m1izs7"
npm run dev
```

Open:

```bash id="jlwm1o"
http://localhost:3000
```

---

# 🔐 Authentication Flow

## 📝 Signup

User enters:

* 📧 Email
* 🔒 Password

### Signup Process

* Credentials stored in Firebase Authentication
* Additional user data stored in Firestore

---

## 🔓 Login

* User logs in using Email & Password
* Redirected to Dashboard after successful authentication

---

# 📊 Dashboard Features

✅ Sidebar Navigation
✅ Top Navbar
✅ Welcome User Section
✅ Logout Button
✅ Responsive UI

---

# 🧾 Firestore Form

The dashboard contains a form with:

* 👤 Full Name
* 📧 Email
* 📱 Phone Number
* 🎂 Age
* 🏠 Address

Submitted data is stored inside Firestore collection:

```bash id="l8vhob"
usersData
```

---

# 🗂️ Firestore Collections

## 👥 users

Stores:

* Full Name
* Email
* Mobile Number
* UID
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
✅ Protected routes implemented using Firebase Authentication

---

# 👨‍💻 Author

Hitesh Kumar S
