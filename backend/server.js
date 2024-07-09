const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const remindersFile = path.join(__dirname, 'reminders.json');

// Helper function to read reminders from file
const readReminders = () => {
  if (!fs.existsSync(remindersFile)) {
    return [];
  }
  const data = fs.readFileSync(remindersFile, 'utf8');
  return JSON.parse(data);
};

const writeReminders = (reminders) => {
  fs.writeFileSync(remindersFile, JSON.stringify(reminders, null, 2));
};

app.get('/api/reminders', (req, res) => {
  const reminders = readReminders();
  res.json(reminders);
});

app.post('/api/reminders', (req, res) => {
  const reminders = readReminders();
  const newReminder = {
    id: Date.now().toString(),
    ...req.body,
  };
  reminders.push(newReminder);
  writeReminders(reminders);
  res.status(201).json(newReminder);
});

app.delete('/api/reminders/:id', (req, res) => {
  const reminders = readReminders();
  const filteredReminders = reminders.filter((reminder) => reminder.id !== req.params.id);
  writeReminders(filteredReminders);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
