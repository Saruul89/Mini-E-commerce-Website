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

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, introduce, price, pic_url } = req.body;

  if (!name || !introduce || !price || !pic_url) {
    return res
      .status(400)
      .json({ error: "shaardlagatai talbariig oruulna uu" });
  }
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "zaawal too bh ystoi!" });
  }

  try {
    const response =
      await data`UPDATE products SET name = ${name}, introduce = ${introduce}, price =${price}, pic_url = ${pic_url} WHERE id = ${id}
  RETURNING *;`;

    if (response.length === 0) {
      return res.status(404).json({ error: "product oldsongui" });
    }

    res.json(response);
  } catch (error) {
    console.log("product update hiihed aldaa garlaa", error);
    res.status(500).json({ error: "server error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response =
      await data`DELETE FROM products WHERE id = ${id} RETURNING *;`;

    if (response.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
