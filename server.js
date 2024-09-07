const express = require('express');
const app = express();

// Define the port variable before using it
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define your routes here
app.post('/signup', (req, res) => {
  const { name, age } = req.body;

  if (typeof name !== 'string' || typeof age !== 'number') {
    return res.status(400).send('Invalid input');
  }

  if (age > 17) {
    res.send(`Welcome ${name}`);
  } else {
    res.send('Sorry, you are underage');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
