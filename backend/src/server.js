import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";
import db from "./config/db.js";
import {WebSocketServer} from "ws";
const wss = new WebSocketServer({ port: 8080 });

const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Mount the tasks router
app.use("/tasks", tasksRouter);

// Define a global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Internal Server Error" });
});

// Assuming you have a function to fetch tasks from the database
const fetchTasks = async () => {
  // Your database query to fetch tasks
  const tasks = await db.query("SELECT * FROM tasks");
  return tasks;
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send the initial list of tasks to the client
  fetchTasks().then((tasks) => {
    ws.send(JSON.stringify({ type: "tasks", data: tasks }));
  });

  // Listen for updates from the database
  db.on("update", (update) => {
    if (update.table === "tasks") {
      fetchTasks().then((tasks) => {
        ws.send(JSON.stringify({ type: "tasks", data: tasks }));
      });
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
