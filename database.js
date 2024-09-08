const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'auth-db1169.hstgr.io', // Database host (can be remote as well)
  user: 'u133314166_gym_managment', // Database username
  password: 'Gym_managment@1234567890', // Database password
  database: 'u133314166_gym_managment' // The database you want to connect to
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);
});

// Close the connection
// connection.end();
