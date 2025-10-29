import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ id: "", name: "", category: "", price: "" });
  const [id, setId] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: +form.id, price: +form.price }),
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult("Error adding product");
    }
  };

  const getProduct = async () => {
    if (!id) return alert("Enter ID");
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult("Error fetching product");
    }
  };

  return (
    <div>
      <h2>Product Catalogue</h2>

      <form onSubmit={addProduct}>
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <h4>Get Product by ID</h4>
      <input placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={getProduct}>Fetch Product</button>

      <pre>{result}</pre>
    </div>
  );
}
