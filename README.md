# 🎓 School Attendance Management System – Backend

This is a Node.js + Express.js backend for managing a school system with Grades, Classes (under each grade), and Students (under each class), using Firebase Realtime Database.

---

## 🚀 Technologies Used

- **Backend**: Node.js + Express.js
- **Database**: Firebase Realtime Database
- **Validation**: express-validator
- **Testing**: Jest + Supertest
- **Environment**: dotenv
- **Project Structure**: Modular (controllers, routes, services, validations, tests)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone  https://github.com/amashamaduwanthi/attendance-system-backend.git
cd school-attendance-system-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a file named `firebaseConfig.js` with the following:

```js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://attendance-system-be1b9-default-rtdb.firebaseio.com"
});

const db = admin.database();
module.exports = db;
```

> ✅ Make sure `serviceAccountKey.json` is in your `.gitignore`.

---

### 4. Environment Configuration

Create a `.env` file in the root directory with the necessary variables if needed (e.g., port).

```env
PORT=5000
```

---

### 5. Run the Server

```bash
npm start
```

Server runs on `http://localhost:5000`

---

### 6. Run Integration Tests

```bash
npm test
```

Uses Jest and Supertest for testing all major routes.

---

## 📁 Folder Structure

```
├── controllers/
├── routes/
├── services/
├── tests/
├── utils/
├── validations/
├── app.js
├── server.js
├── firebaseConfig.js
├── serviceAccountKey.json
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 📡 API Endpoints

### 🔹 Grades

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | `/api/grades/`        | Add a grade          |
| GET    | `/api/grades/`        | List all grades      |
| PUT    | `/api/grades/:gradeId`| Update a grade       |
| DELETE | `/api/grades/:gradeId`| Delete a grade       |

### 🔹 Classes

| Method | Endpoint                               | Description          |
|--------|----------------------------------------|----------------------|
| POST   | `/api/grades/:gradeId/classes`         | Add a class          |
| GET    | `/api/grades/:gradeId/classes`         | List classes in grade|
| PUT    | `/api/grades/:gradeId/classes/classId` | Update a class       |
| DELETE | `/api/grades/:gradeId/classes/classId` | Delete a class       |

### 🔹 Students

| Method | Endpoint                                                  | Description         |
|--------|-----------------------------------------------------------|---------------------|
| POST   | `/api/grades/:gradeId/classes/classId/students`           | Add a student       |
| GET    | `/api/grades/:gradeId/classes/classId/students`           | List students       |
| PUT    | `/api/grades/:gradeId/classes/classId/students/studentId` | Update a student    |
| DELETE | `/api/grades/:gradeId/classes/classId/students/studentId`              | Delete a student    |

---

---

**🧠 Maintainer:** [Amasha Maduwathi](github.com/amashamaduwanthi/attendance-system-backend.git)

---

## 🎥 Demo Video

📺 [Watch the Demo](https://drive.google.com/file/d/1ka7BpeerSVqxcLCfHZVp6KT6RRjwExIs/view?usp=sharing)