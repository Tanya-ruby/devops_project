const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/eventsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  app.use(express.static('public'));

  app.use(express.static(__dirname + '/public'));


// Create a schema and model for the Event
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);

// Create a schema and model for the User
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  usn: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  section: { type: String, required: true },
  isAdmin: { type: String, default: '0' },
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

const User = mongoose.model('User', userSchema);




// Set up EJS as the view engine
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events', { events });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/users/addEvent', async (req, res) => {
  try {
    const userId = "64af1a2799a58a4f0dccb0f6"; // Replace with the actual user ID -- use the retrieved userID

    // no need since we already create session and check
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const eventId = req.body.eventId;

    // Push the selected event ID to the user's myEvents array
    user.myEvents.push(eventId);
    await user.save();

    res.redirect('/events'); // Redirect to the events page after successful signup
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
