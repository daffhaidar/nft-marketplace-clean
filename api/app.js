const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const initAppBootstrap = require('./utils/bootstrap');
const fileUpload = require('express-fileupload');

const app = express();

// config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Rute untuk menyajikan products.json dari api/data/products.json
app.get('/api/data/products.json', (req, res) => {
  // Mencoba path yang lebih eksplisit dari root proyek Vercel
  const filePath = path.resolve(process.cwd(), 'api', 'data', 'products.json'); 
  // console.log('Current __dirname:', __dirname); // Untuk debugging jika masih gagal
  // console.log('Current process.cwd():', process.cwd()); // Untuk debugging jika masih gagal
  // console.log('Attempting to read products.json from:', filePath); // Untuk debugging jika masih gagal

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading products.json:', err);
      // Mengirim pesan error yang lebih spesifik ke client bisa membantu debugging
      return res.status(500).json({ message: 'Error loading product data', error: err.message });
    }
    try {
      const jsonData = JSON.parse(data); // Memastikan ini JSON yang valid
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error('Error parsing products.json:', parseError);
      return res.status(500).json({ message: 'Error parsing product data', error: parseError.message });
    }
  });
});

const user = require('./routes/userRoute'); // Diaktifkan kembali
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const chat = require('./routes/chatRoute');
const wallet = require('./routes/walletRoute');

app.use('/api/v1', user); // Diaktifkan kembali
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', chat);
app.use('/api/v1', wallet);

// deployment
__dirname = path.resolve();
// initAppBootstrap() // Dikomentari untuk pengujian
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
// app.use(errorMiddleware);

module.exports = app;

// const errorPayment = require('./controllers/paymentController'); // Dikomentari untuk pengujian