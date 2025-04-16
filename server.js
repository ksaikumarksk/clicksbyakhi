import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://ksaikumar0262:y9dLbn8YdqGUhbTf@cluster0.oksyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Schema & Model
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  oldPrice: Number,
  rating: Number,
  discount: Number,
  image: String,
  url: String,
});

const Product = mongoose.model("Product", productSchema);

// Routes
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to save product" });
  }
});

app.get("/api/products", async (_, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Start Server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
