// Import required Firebase modules
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const express = require('express');

const app = express();
const port = 8015;

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy_RYVGY4pgMbH2es0L9q0hw1yALMorIY",
  authDomain: "gym-managment-90167.firebaseapp.com",
  databaseURL: "https://gym-managment-90167-default-rtdb.firebaseio.com",
  projectId: "gym-managment-90167",
  storageBucket: "gym-managment-90167.appspot.com",
  messagingSenderId: "646683815414",
  appId: "1:646683815414:web:9f0eec4f26868abef8ebd7",
  measurementId: "G-8ECMPW1BYH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

app.use(express.json());

app.post('/signup', (req, res) => {
  const { name, age } = req.body;

  console.log(`Received request with name: ${name}, age: ${age}`);

  if (typeof name !== 'string' || typeof age !== 'number') {
    return res.status(400).send('Invalid input');
  }

  if (age > 17) {
    set(ref(db, 'users/' + name), {
      name: name,
      age: age
    })
    .then(() => {
      res.send(`Welcome ${name}`);
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      res.status(500).send('Error saving user');
    });
  } else {
    res.send('Sorry, you are underage');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
