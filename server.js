//import dependencies
import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// const pool = new Pool({
//   username: "carlgutierrez",
//   host: "localhost",
//   database: "tasks",
//   password: "password",
//   port: 5432,
// });

//bring in middleware
app.use(express.json());
app.use(express.static("dist"));
app.use(cors({ origin: "*" }));

//create routes
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch {
    console.error(err);
    res.status(500).send("Error: Unable to fetch tasks from database");
  }
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE ID = $1", [id]);
    if (result.rows === 0) {
      res.status(404).send("Error: unable to fetch task at the given id");
    } else {
      res.send(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: Unable to fetch task from the database");
  }
});

app.post("/tasks", async (req, res) => {
  const { task } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (task) VALUES($1) RETURNING *",
      [task]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: unable to create task in database");
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET task = $1 WHERE id = $2",
      [task, id]
    );
    if (result.row === 0) {
      res
        .status(404)
        .send("Error: unable to update task at the given id RETURNING *");
    } else {
      res.status(202).json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: unable to update task at the id in database");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows === 0) {
      res.status(404).send("Error: unable to delete task at ");
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Error: unable to delete task at the given id from database");
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
