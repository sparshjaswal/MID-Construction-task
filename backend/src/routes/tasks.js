import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const [result] = await db.execute("SELECT * FROM tasks");
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Error fetching tasks", error: err });
  }
});

// POST new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .send({ message: "Title and description are required" });
    }
    const [result] = await db.execute(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.send({ message: "Task created", taskId: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res
        .status(400)
        .send({ message: "Task with the same title already exists" });
    } else {
      res.status(500).send({ message: "Error creating task", error: err });
    }
  }
});

// PUT update task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .send({ message: "Title and description are required" });
    }
    const [result] = await db.execute(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );
    if (!result.affectedRows) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.send({ message: "Task updated" });
  } catch (err) {
    res.status(500).send({ message: "Error updating task", error: err });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
    if (!result.affectedRows) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.send({ message: "Task deleted" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting task", error: err });
  }
});

export default router;
