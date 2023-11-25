const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require('pg');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

const pool = new pg.Pool({
  user: 'juan',
  host: 'localhost',
  database: 'login',
  password: '2702',
  port: 5432,
});
app.use(express.static('imagenes'));
app.use(express.static('videos'));
app.use(express.static('js'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secreto', resave: true, saveUninitialized: true }));

app.use(express.json());

const carrito = [];

app.post('/agregar-al-carrito', (req, res) => {
  const { destino, precio } = req.body;
  carrito.push({ destino, precio });
  res.json({ message: 'Agregado al carrito' });
});

app.get('/carrito', (req, res) => {
    res.sendFile(__dirname + '/carrito.html');
});  
  app.get('/obtener-carrito', (req, res) => {
    res.json(carrito);
});
  

  
  
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/registro', (req, res) => {
  res.sendFile(__dirname + '/registro.html');
});

app.post('/registro', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );

    req.session.userId = result.rows[0].id;
    res.redirect('/index');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el registro.');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const isValidPassword = await bcrypt.compare(password, result.rows[0].password);

      if (isValidPassword) {
        req.session.userId = result.rows[0].id;
        return res.redirect('/index');
      } else {
        return res.status(401).send('Contraseña incorrecta');
      }
    } else {
      return res.status(404).send('Usuario no encontrado. <a href="/registro">Registrarse</a>');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el login.');
  }
});

app.get('/index', (req, res) => {
  if (req.session.userId) {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.redirect('/login');
  }
});
app.get('/Destinos', (req, res) => {
    res.sendFile(__dirname + '/Destinos.html');
});
app.get('/acerca', (req, res) => {
    res.sendFile(__dirname + '/acerca.html');
});
app.get('/alaska', (req, res) => {
    res.sendFile(__dirname + '/alaska.html');
});
app.get('/ciudad', (req, res) => {
    res.sendFile(__dirname + '/ciudad.html');
});
app.get('/colombia', (req, res) => {
    res.sendFile(__dirname + '/colombia.html');
});
app.get('/contacto', (req, res) => {
    res.sendFile(__dirname + '/contacto.html');
});
app.get('/estilo', (req, res) => {
    res.sendFile(__dirname + '/estilo.css');
});
app.get('/estilol', (req, res) => {
    res.sendFile(__dirname + '/estilol.css');
});
app.get('/hawaii', (req, res) => {
    res.sendFile(__dirname + '/hawaii.html');
});
app.get('/holanda', (req, res) => {
    res.sendFile(__dirname + '/holanda.html');
});
app.get('/islandia', (req, res) => {
    res.sendFile(__dirname + '/islandia.html');
});
app.get('/italia', (req, res) => {
    res.sendFile(__dirname + '/italia.html');
});
app.get('/mexico', (req, res) => {
    res.sendFile(__dirname + '/mexico.html');
});
app.get('/nomina', (req, res) => {
    res.sendFile(__dirname + '/nomina.html');
});
app.get('/reserva', (req, res) => {
    res.sendFile(__dirname + '/Reserva.html');
});
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
