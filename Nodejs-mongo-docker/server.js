// server.js
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();

const logDir = '/usr/src/app/logs';
const logPath = path.join(logDir, 'app.log');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB (docker-compose service name as hostname)
mongoose.connect('mongodb://mongo:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  log('Connected to MongoDB');
}).catch(err => {
  log('MongoDB connection error: ' + err);
});

// Mongoose schema and model
const DataSchema = new mongoose.Schema({ message: String });
const DataModel = mongoose.model('Data', DataSchema);

// Logger (console + file)
function log(msg) {
  const logMsg = new Date().toISOString() + ' - ' + msg;
  console.log(logMsg);
  fs.appendFileSync(logPath, logMsg + '\n');
}

// Health check route
app.get('/health', (req, res) => {
  res.send('Node.js + MongoDB App is running!');
});

// POST /save to save a message
app.post('/save', async (req, res) => {
  try {
    const { message } = req.body;
    const entry = new DataModel({ message });
    await entry.save();
    log('Saved message: ' + message);
    res.send('Saved!');
  } catch (err) {
    log('Error saving message: ' + err);
    res.status(500).send('Error saving message');
  }
});

// GET /messages to return all saved messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await DataModel.find({});
    res.json(messages);
  } catch (err) {
    log('Error fetching messages: ' + err);
    res.status(500).send('Error fetching messages');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});
