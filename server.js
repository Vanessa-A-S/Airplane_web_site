const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/flight_booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const reservationSchema = new mongoose.Schema({
    userEmail: String,
    destination: String,
    datetime: Date
});

const User = mongoose.model('User', userSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);

// Routes pour gérer les utilisateurs et les réservations

// Route pour le login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Route pour réserver
app.post('/reserve', async (req, res) => {
    const { userEmail, destination, datetime } = req.body;
    const reservation = new Reservation({ userEmail, destination, datetime });
    await reservation.save();
    res.status(200).send('Reservation successful');
});

// D'autres routes pour voir, changer et annuler les réservations

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});