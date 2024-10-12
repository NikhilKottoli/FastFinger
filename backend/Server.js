const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To allow requests from the frontend
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/FastFinger', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true }, // Unique email field
    password: { type: String, required: true }, // Password field
    WPM: Number,
    accuracy: Number
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

// Route to register a new user
app.post('/register', async (req, res) => {
    const { name, email, password, WPM = 0, accuracy = 0 } = req.body;

    const user = new User({ name, email, password, WPM, accuracy });
    try {
        await user.save();
    } catch (err) {
        return res.status(400).json({ message: 'Registration failed: ' + err.message });
    }
});

// Route to login a user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Successful login: send back user info (no token)
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                WPM: user.WPM,
                accuracy: user.accuracy,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});

// Route to get the current user's information (based on ID sent in request)
app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id; // Get the user's ID from the route parameter

    try {
        const user = await User.findById(userId).select('name email WPM accuracy'); // Select specific fields
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); // Respond with the user data
    } catch (err) {
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});


// Route to add user results (update WPM and accuracy)
// Route to add user results (update WPM and accuracy)
app.post('/add-user', async (req, res) => {
    const { email, WPM, accuracy, password, id } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            // If user does not exist, create a new one with a password
            if (!password) {
                return res.status(400).send('Password is required for new users.');
            }
            user = new User({
                email,
                WPM,
                accuracy,
                password, // Use the provided password
            });
        } else {
            // Update existing user's WPM and accuracy
            user.WPM = WPM;
            user.accuracy = accuracy;
        }

        await user.save();
        res.status(201).send('User added/updated successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Server error');
    }
});




// Route to fetch leaderboard data
app.get('/leaderboard', async (req, res) => {
    try {
        // Fetch and sort users by WPM in descending order
        const leaders = await User.find().sort({ WPM: -1 }).limit(5); // Sort by WPM in descending order
        
        // Add rank to each leader
        const rankedLeaders = leaders.map((leader, index) => ({
            rank: index + 1, // Add rank (starting from 1)
            name: leader.email,
            WPM: leader.WPM,
            accuracy: leader.accuracy
        }));
        
        res.json(rankedLeaders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Route to delete a user
app.delete('/delete-user', async (req, res) => {
    const { name } = req.body; // Expecting the name in the request body
    try {
        const result = await User.deleteOne({ name }); // Use User.findByIdAndDelete for ID
        if (result.deletedCount === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a root route
app.get('/', (req, res) => {
    res.send('Welcome to the FastFinger API!'); // Response message for root route
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
