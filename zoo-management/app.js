require('dotenv').config(); // Memuat file .env

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mysql = require('mysql2');

// Koneksi database menggunakan variabel lingkungan dari .env
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Mengambil dari .env
    user: process.env.DB_USER, // Mengambil dari .env
    password: process.env.DB_PASSWORD, // Mengambil dari .env
    database: process.env.DB_NAME // Mengambil dari .env
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

// Set view engine dan lokasi views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Parse request body (untuk form)
app.use(express.urlencoded({ extended: true }));

// Route utama (Home)
app.get('/', (req, res) => {
    res.render('index', { layout: 'layouts/main-layout.ejs' });
});

// Gunakan routes animals
const animalsRouter = require('./routes/animals');
app.use('/animals', animalsRouter);

// Menjalankan server pada port yang diambil dari .env
const PORT = process.env.PORT || 4000; // Menggunakan PORT dari .env jika ada
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});