const express=require('express');
const cors=require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let products = [];

app.get("/", (req, res) => {
  res.send("Product catalogue API is running ✅");
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.post("/products", (req, res) => {
  const { id, name, category, price } = req.body;
  if (!id || !name || !category || !price)
    return res.status(400).json({ message: "All fields are required" });

  if (products.some((p) => p.id === id))
    return res.status(400).json({ message: "Product with this ID already exists" });

  const newProduct = { id, name, category, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
