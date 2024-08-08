const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let clients = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  console.log('Received tasks:', JSON.stringify(req.body.tasks, null, 2)); // Log the incoming tasks data
  tasks = req.body.tasks;
  res.json({ message: 'Tasks updated successfully' });

  // Notify clients about the update
  clients.forEach(client => client.res.write('data: update\n\n'));
});

app.delete('/tasks', (req, res) => {
  const taskId = req.body.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Task deleted successfully' });

  // Notify clients about the update
  clients.forEach(client => client.res.write('data: update\n\n'));
});

// SSE endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);

  req.on('close', () => {
    clients = clients.filter(client => client.id !== clientId);
  });

  res.write('data: connected\n\n');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
