import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: "Taro" },
  { id: 2, name: "Hanako" },
];

app.get("/api/users", (_req, res) => res.json(users));

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "Not Found" });
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  if (!name) return res.status(400).json({ message: "name is required" });

  const id = Math.max(...users.map((u) => u.id)) + 1;
  const newUser = { id, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
