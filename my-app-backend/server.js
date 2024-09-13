const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Cross-origin resource sharing
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// User Model
const User = mongoose.model('User', userSchema);

// POST route for adding a user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user', error });
    }
});

// GET route for fetching users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
//delete user with Id
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id; // Get the userId from URL parameters
    
    console.log("Inside delete server");
    console.log(`User ID to delete: ${userId}`); // Log the userId

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});


// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
