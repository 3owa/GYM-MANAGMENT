const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
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
