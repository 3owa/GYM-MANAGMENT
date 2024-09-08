// Import required Firebase modules
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, update } = require('firebase/database');
const express = require('express');
const { randomUUID } = require('crypto');

// Initialize Express app and port
const app = express();
const port = 9000;

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

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to format date as year/mm/dd
const formatDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// Route to get all users data
app.get('/users', async (req, res) => {
  try {
    const reference = ref(db, 'users');
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      res.status(404).send('No users found');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data: ' + error.message);
  }
});

// Route to get a specific user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const reference = ref(db, `users/${userId}`);
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Error retrieving user: ' + error.message);
  }
});

// Route to sign up a new user
app.post('/signup', async (req, res) => {
  const { name, age } = req.body;
  console.log(`Received request with name: ${name}, age: ${age}`);

  if (typeof name !== 'string' || typeof age !== 'number') {
    return res.status(400).send('Invalid input');
  }

  if (age > 17) {
    const userId = randomUUID();
    try {
      await set(ref(db, `users/${userId}`), {
        id: userId,
        name: name,
        age: age,
        signDate: formatDate()
      });
      res.send(`Welcome ${name}`);
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).send('Error saving user');
    }
  } else {
    res.send('Sorry, you are underage');
  }
});

// Route to update a specific user
app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = {};

  // Extract fields from the request body and add to updates object if they exist
  const { name, age, lastMonthPaid } = req.body;
  if (name) updates.name = name;
  if (age) updates.age = age;
  if (lastMonthPaid) updates.lastMonthPaid = lastMonthPaid;

  if (Object.keys(updates).length === 0) {
    return res.status(400).send('No valid fields to update');
  }

  try {
    await update(ref(db, `users/${userId}`), updates);
    res.send(`User with ID ${userId} updated successfully.`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
});

// Route to update the last month paid for a specific user
app.post('/users/paid/:userId', async (req, res) => {
  const userId = req.params.userId;
  const userRef = ref(db, `users/${userId}`);

  // Get the current date formatted as mm/dd
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const lastMonthPaid = `${month}/${day}`;

  try {
    await update(userRef, { lastMonthPaid });
    res.send(`User with ID ${userId} updated successfully.`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
