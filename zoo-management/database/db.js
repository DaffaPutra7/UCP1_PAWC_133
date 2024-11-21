const mysql = require('mysql2');

// Koneksi ke database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Ganti dengan password MySQL Anda jika ada
    database: 'zoo_management' // Nama database yang digunakan
});

// Cek koneksi
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;