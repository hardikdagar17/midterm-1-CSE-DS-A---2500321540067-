const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.redirect('/products');
});


let products = [
  { id: 201, name: 'Wireless Mouse', price: 599, category: 'Electronics' }
];

// 1. CREATE: Add a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// 2. READ: Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// 3. READ: Get a single product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 4. UPDATE: Update an existing product
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    res.json({ message: 'Product updated successfully', product });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 5. DELETE: Remove a product by ID
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
