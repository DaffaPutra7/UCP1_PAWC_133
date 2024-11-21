const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Menampilkan daftar hewan
router.get('/', (req, res) => {
    db.query('SELECT * FROM animals', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching animals');
        }
        res.render('animals/index', { animals: results, layout: 'layouts/main-layout.ejs' });
    });
});

// Menampilkan form tambah hewan baru
router.get('/new', (req, res) => {
    res.render('animals/form', { layout: 'layouts/main-layout.ejs' });
});

// Menyimpan data hewan baru
router.post('/', (req, res) => {
    const { name, species, age } = req.body;
    db.query('INSERT INTO animals (name, species, age) VALUES (?, ?, ?)', [name, species, age], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving animal');
        }
        res.redirect('/animals');
    });
});

module.exports = router;