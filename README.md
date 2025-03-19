# 📧 Angular Messages App

## 🚀 Project Overview
The **Angular Messages App** is a web application built with **Angular 19**, **NgRx**, **Angular Material**, and **Firebase**. Users can submit messages via a form, store them in **Firestore**, and view them in a **Material Table**.

## 🎯 Features
- ✅ **Standalone Components** - Using Angular 16+ Standalone API.
- ✅ **Lazy-Loaded Messages Module**.
- ✅ **NgRx for State Management** (Actions, Reducers, Effects, Selectors).
- ✅ **Firebase Firestore Integration** - Messages stored in Firestore.
- ✅ **Material UI** - Modern design with Angular Material.
- ✅ **Loading Indicator & Snackbar** - Feedback for users.
- ✅ **Firestore Data Fetching & Sorting** - Messages sorted by date.
- ✅ **Manual Subscription Support** - Alternative to `| async` in templates.
- ✅ **Deployed on Firebase Hosting**.

---

## 🛠️ Technologies Used
| Technology         | Purpose                         |
|-------------------|--------------------------------|
| **Angular 19**   | Frontend Framework             |
| **Angular Material** | UI Components & Styling |
| **NgRx**         | State Management (Actions, Reducers, Effects) |
| **Firebase Firestore** | NoSQL Database for Messages |
| **Firebase Hosting** | Deployment Platform |
| **RxJS**         | Reactive Programming |
| **SCSS**         | Styling |

---

## 🔧 Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo/angular-messages-app.git
cd angular-messages-app
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Firebase**
- Go to [Firebase Console](https://console.firebase.google.com/).
- Create a new project.
- Enable **Firestore Database** in Firestore settings.
- Enable **Firebase Hosting**.
- Copy your Firebase config settings and update `environment.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### **4️⃣ Start the Development Server**
```bash
npm start
```
- The app will be available at: **`http://localhost:4200/`**

---

## 🚀 How to Use
### **1️⃣ Submitting a Message**
- Click the `New Message` button.
- Fill out the form (Email & Message).
- Click `Submit` (Message is saved in Firestore).

### **2️⃣ Viewing Messages**
- Messages are displayed in a **Material Table**.
- Table columns: **ID, Email, Message (trimmed), Date**.
- Messages are **sorted chronologically**.

### **3️⃣ Handling Loading & Feedback**
- While submitting, a **spinner** appears.
- After submission, a **Snackbar** notification appears.

---

## 🌎 Deployment (Firebase Hosting)
### **1️⃣ Build the Project**
```bash
npm run build
```

### **2️⃣ Deploy to Firebase Hosting**
```bash
firebase login
firebase init
firebase deploy
```
- The app will be live at [Angular Messages APP](https://angular-messages-app.web.app/)

---


## 🎯 Future Improvements
✅ Add **Authentication (Login & Signup)** using Firebase Auth.

---

## 👨‍💻 Author
Developed by **Nzhdeh Barseghyan**  
📌 GitHub: [Nzhdeh](https://github.com/Nzhdeh-esterox)
---

## 📝 License
This project is **MIT licensed**. Feel free to use, modify, and share!
