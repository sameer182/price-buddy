const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const port = 3000;
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sameerlimbu',
  database: 'comparison',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Handle GET request to retrieve all guitar data
app.get('/api/data/guitar', (req, res) => {
  const query = 'SELECT * FROM guitar';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Handle GET request to retrieve details of a specific product by productId
app.get('/api/data/products/:productId', (req, res) => {
  const productId = req.params.productId;
  console.log('Received productId:', productId); 
  const query = `
    SELECT guitar.*, comparison.price, comparison.url
    FROM guitar
    LEFT JOIN comparison ON guitar.id = comparison.guitar_id
    WHERE guitar.id = ?
  `;
  connection.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Handle GET request to retrieve product details based on guitarId (query parameter)
app.get('/api/data/products', (req, res) => {
  const guitarId = req.query.guitar_id;
  console.log('Received guitarId:', guitarId); 
  const query = `
    SELECT guitar.*, comparison.price, comparison.url
    FROM guitar
    LEFT JOIN comparison ON guitar.id = comparison.guitar_id
    WHERE guitar.id = ?
  `;
  
  // Execute the SQL query with productId as a parameter
  connection.query(query, [guitarId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Set app port
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
