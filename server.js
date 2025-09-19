const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve HTML & CSS

// Endpoint untuk menerima data order
app.post('/api/order', (req, res) => {
    const orderData = req.body;

    if (!orderData.name || !orderData.address || !orderData.phone || !orderData.items) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    // Tambah timestamp
    orderData.timestamp = new Date().toISOString();

    // Baca data orders yang sudah ada
    fs.readFile('orders.json', 'utf8', (err, data) => {
        let orders = [];
        if (!err && data) {
            orders = JSON.parse(data);
        }

        // Tambahkan order baru
        orders.push(orderData);

        // Simpan ulang ke file
        fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal menyimpan pesanan' });
            }
            res.json({ message: 'Pesanan berhasil disimpan!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
