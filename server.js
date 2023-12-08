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

// Example API endpoint to fetch data from the database
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

// Example API endpoint to fetch data from the database
app.get('/api/data/products/:productId', (req, res) => {

  const productId = req.params.productId;
  const query = `
  SELECT guitar.*, comparison.price, comparison.url
  FROM guitar
  LEFT JOIN comparison ON guitar.id = comparison.guitar_id
  WHERE guitar.id = ?
`;
  connection.query(query, [productId],(err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

//--set app port--//
app.listen(port, () => {
    console.log("Server listening on port 3000...");
  });
