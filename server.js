const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin (insecure, use a specific origin in production)

  next();
});

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'Admin123!',
});

// Define a route to retrieve all users
app.get('/all', (req, res) => {
  connection.query('SELECT * FROM `user`', function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    res.status(200).json(results);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Replace 'index.html' with your actual HTML file path
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});
app.post('/add', (req, res) => {
  console.log('req', req);
  const { name, surname, email, password } = req.query; // req.query yerine req.body kullanıldı

  console.log('name', name);
  console.log('surname', surname);
  console.log('email', email);
  console.log('password', password);

  connection.query(
    'INSERT INTO user (name, surname, email, password) VALUES (?,?,?,?)',
    [name, surname, email, password],
    (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: 'Veritabanına veri eklenirken bir hata oluştu.' });
      }

      // İşlem başarılı, 200 OK yanıtı gönder
      res.sendStatus(200);
    }
  );
});
app.listen(port, () => {
  console.log(
    `app listening at http://app-service.default.svc.cluster.local${port}`
  );
});
