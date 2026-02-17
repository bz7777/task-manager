# ✅ Task Manager — Full-Stack App

A beginner-friendly full-stack task manager built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 📁 Project Structure

```
task-manager/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # TaskForm, TaskList, TaskItem
│   │   ├── api.js        # All fetch() calls to the backend
│   │   ├── App.jsx       # Root component with state management
│   │   └── main.jsx      # React entry point
│   ├── index.html
│   └── vite.config.js
│
├── server/               # Express backend
│   ├── models/
│   │   └── Task.js       # Mongoose schema/model
│   ├── routes/
│   │   └── tasks.js      # REST API route handlers
│   ├── index.js          # Express server entry point
│   └── .env.example      # Environment variable template
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

### 1. Clone and enter the project

```bash
git clone <your-repo-url>
cd task-manager
```

---

### 2. Set up the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017/taskmanager
PORT=5000
```

Start the server:

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

The API will be available at **http://localhost:5000**

---

### 3. Set up the Frontend (Client)

Open a new terminal tab:

```bash
cd client
npm install
npm run dev
```

The app will open at **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Route          | Description          |
|--------|----------------|----------------------|
| GET    | /tasks         | Get all tasks        |
| POST   | /tasks         | Create a new task    |
| PUT    | /tasks/:id     | Update a task        |
| DELETE | /tasks/:id     | Delete a task        |

### Example request (POST /tasks)

```json
POST http://localhost:5000/tasks
Content-Type: application/json

{
  "title": "Buy groceries"
}
```

---

## 🛠 Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React 18, Vite 5    |
| Styling   | CSS Modules         |
| Backend   | Node.js, Express 4  |
| Database  | MongoDB, Mongoose 8 |

---

## 🧪 Testing the API manually

You can use [Postman](https://www.postman.com/) or `curl`:

```bash
# Get all tasks
curl http://localhost:5000/tasks

# Create a task
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn React"}'

# Mark as complete (replace ID with a real one)
curl -X PUT http://localhost:5000/tasks/64abc123 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:5000/tasks/64abc123
```
