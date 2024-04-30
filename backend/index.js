const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = 3001;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(__dirname + '/images'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cheeses data stored in Backend
const cheeses = [
  { id: 1, name: "American Cheese", price: 20, color: "Yellow", image: "/images/American-Cheese.jpg"  },
  { id: 2, name: "Brie", price: 25, color: "Cream", image: "/images/brie.jpg" },
  { id: 3, name: "Mozzarella", price: 30, color: "White", image: "/images/mozzarella.jpg"},
  { id: 4, name: "Gouda", price: 35, color: "Yellow", image: "/images/gouda.jpg" },
  { id: 5, name: "Camembert", price: 40, color: "Pale Yellow", image: "/images/camembert.jpg" },
];

// Send cheeses data to Frontend
app.get('/cheeses', (req, res) => {
  res.json(cheeses);
});

// Add a cheese data
app.post('/cheeses', (req, res) => {
  const newCheese = req.body;

  // Assign a ID to cheese
  newCheese.id = cheeses.length + 1; 

  cheeses.push(newCheese);
  if (newCheese.color === "string" || newCheese.color.length === 0 || newCheese.image.length === 0 || newCheese.image === "string") {
    res.status(404).send({message: "Invalid input"})
  } else {
    res.status(201).json({ message: "Cheese added successfully", cheese: newCheese });
  }
});

// Update a cheese data
app.put('/cheeses/:id', (req, res) => {
  const cheeseId = parseInt(req.params.id);
  const updatedData = req.body;

  // Find the cheese to update
  const index = cheeses.findIndex(c => c.id === cheeseId);

  if (index === -1) {
      res.status(404).json({ message: "Cheese not found" });
  } else {
      // Update the cheese data:
      cheeses[index] = { ...cheeses[index], ...updatedData };
      res.status(200).json({ message: "Cheese updated successfully" });
  }
});

// Delete cheese data
app.delete('/cheeses/:id', (req, res) => {
  const cheeseId = parseInt(req.params.id);

  // Find the index of the cheese to delete
  const index = cheeses.findIndex(c => c.id === cheeseId);

  if (index === -1) {
      res.status(404).send({ message: "Cheese not found" });
  } else {
      cheeses.splice(index, 1);
      res.status(200).send({ message: "Cheese deleted successfully" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Use for unit test
module.exports = app;