// server.js

const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'Cle123@';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret', // clé secrète pour les sessions
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 24 // 1 jour
  }
}));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'easyswap', 
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});
app.post('/signup', (req, res) => {
  const { email, password, age, status } = req.body;

  if (!email || !password || !age || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Insert user into database
  const sql = 'INSERT INTO users (email, password, age, status) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, hashedPassword, age, status], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Fonction pour générer un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
};


// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Email non trouvé' });
    }

    const user = results[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = generateToken(user);
    res.json({ token, user });
  });
});

// Profil (accès sécurisé)
app.get('/profile', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    db.query('SELECT id, email, age, status FROM users WHERE id = ?', [decoded.id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json(results[0]);
    });
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
});

// Route pour mettre à jour le profil utilisateur
app.post('/update-profile', (req, res) => {
  const token = req.headers['authorization'];

  // Vérification de la présence du token
  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }

  let userId;

  try {
    const decoded = jwt.verify(token, secretKey);
    userId = decoded.id; // Récupérer l'ID de l'utilisateur à partir du token
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }

  const { email, age, password } = req.body;

  // Validation des données
  if (!email || !age) {
    return res.status(400).json({ error: 'L\'email et l\'âge sont obligatoires' });
  }

  // Préparer la requête SQL
  let sql = 'UPDATE users SET email = ?, age = ? WHERE id = ?';
  const values = [email, age, userId];

  // Si un mot de passe est fourni, le hacher
  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    sql = 'UPDATE users SET email = ?, age = ?, password = ? WHERE id = ?';
    values.push(hashedPassword);
  }

  // Exécution de la requête
  db.post(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur de mise à jour', err);
      return res.status(500).json({ error: 'Erreur interne' });
    }
    res.json({ success: true, message: 'Profil mis à jour avec succès' });
  });
});



// API pour récupérer toutes les catégories
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});
// API pour rechercher une catégorie par titre
app.get('/api/categories/search', (req, res) => {
  const searchQuery = req.query.title; // Récupère le titre de la requête

  if (!searchQuery) {
      return res.status(400).json({ error: 'Title query parameter is required' });
  }

  // Requête SQL pour chercher une catégorie selon le titre
  db.query('SELECT * FROM categories WHERE title LIKE ?', [`%${searchQuery}%`], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});
const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers sont stockés
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Vous pouvez personnaliser le nom du fichier ici
  },
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ storage: storage });
// API pour créer un nouveau produit avec image
app.post('/api/products', upload.single('image'), (req, res) => {
  const { title, description, category_id, user_id, price } = req.body;
  const image = req.file ? req.file.filename.replace(/\\/g, '/') : null; // Remplace les backslashes par des slashes

  const newProduct = { title, description, category_id, image, user_id, price };

  db.query('INSERT INTO products SET ?', newProduct, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, ...newProduct });
  });
});



// Route pour récupérer les produits avec ou sans filtrage par category_id
app.get('/api/products', (req, res) => {
  const { category_id } = req.query;  // On récupère le category_id depuis la requête

  let sql = 'SELECT * FROM products'; // Requête par défaut sans filtrage
  const params = [];

  // Si category_id est spécifié, on ajoute un filtrage
  if (category_id) {
    sql += ' WHERE category_id = ?';
    params.push(category_id);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});




// API pour récupérer les détails d'un produit par ID pour showdetail
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results[0]);
  });
});

// API pour récupérer les produits d'un utilisateur par son ID
app.get('/api/products/user/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query('SELECT * FROM products WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'No products found for this user' });
    res.json(results);
  });
});


// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
