const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle signup
app.post('/signup', (req, res) => {
  const { name, age } = req.body;

  if (typeof name !== 'string' || typeof age !== 'number') {
    return res.status(400).send('Invalid input');
  }

  if (age < 18) {
    res.send(`Welcome ${name}`);
  } else {
    res.send('Sorry, you are underage');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
