require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { neon } = require("@neondatabase/serverless");

const app = express();
const PORT = process.env.PORT || 8000;
const data = neon(`${process.env.DATABASE_URL}`);

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const response = await data`SELECT * FROM products`;
    res.json(response);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/products", async (req, res) => {
  const { name, introduce, price, pic_url } = req.body;

  if (!name || !introduce || !price || !pic_url) {
    return res.status(400).json({ error: "ali neg ni bhgu bn" });
  }
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "zaawal too bh ystoi!" });
  }

  try {
    const response =
      await data`INSERT INTO products (name, introduce, price, pic_url)
    VALUES (${name}, ${introduce}, ${price}, ${pic_url})
    RETURNING *;`;
    res.status(201).json(response);
  } catch (error) {
    console.error("Error garlaa", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "product-in id bn" });
    }
  }
  res.status(500).json({ error: "Error garlaa" });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
