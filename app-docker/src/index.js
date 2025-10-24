const express = require("express");
const bodyParser = require("body-parser");
const { query, init } = require("./db");

const app = express();
app.use(bodyParser.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

// simple CRUD: create item, list items
app.post("/items", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  const result = await query("INSERT INTO items(name) VALUES($1) RETURNING *", [name]);
  res.status(201).json(result.rows[0]);
});

app.get("/items", async (req, res) => {
  const result = await query("SELECT * FROM items ORDER BY id");
  res.json(result.rows);
});

const port = process.env.PORT || 3000;

async function start() {
  await init();
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

if (require.main === module) {
  start().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = app; // for tests

