const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To allow requests from the frontend
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/FastFinger', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true }, // Unique email field
    password: { type: String, required: true }, // Password field
    WPM: Number,
    accuracy: Number,
    correctWords: { type: Number, default: 0 }, // Field to store correct words
    incorrectWords: { type: Number, default: 0 } // Field to store incorrect words
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


app.post('/add-user', async (req, res) => {
    const { email, WPM, accuracy, correctWords, incorrectWords } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            // Update existing user
            user.WPM = WPM;
            user.accuracy = accuracy;
            user.correctWords = correctWords; // Update correctWords
            user.incorrectWords = incorrectWords; // Update incorrectWords

            await user.save();
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            // Create a new user
            const newUser = new User({
                email,
                WPM,
                accuracy,
                correctWords,
                incorrectWords
            });
            await newUser.save();
            return res.status(201).json({ message: 'User added successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error: ' + err.message });
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


app.get('/api/stats/:id', async (req, res) => {
    const userId = req.params.id; // Get the user's ID from the route parameter

    try {
        // Find the user by ID
        const user = await User.findById(userId).select('WPM accuracy correctWords incorrectWords'); // Use 'incorrectWords'
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare the response with user-specific statistics
        res.json({
            totalUsers: 1, // This indicates you're fetching stats for one user
            averageWPM: user.WPM || 0, // Default to 0 if undefined
            averageAccuracy: user.accuracy || 0, // Default to 0 if undefined
            Correct: user.correctWords, // Default to 0 if undefined
            Wrong: user.incorrectWords // Use 'incorrectWords'
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: ' + err.message });
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
