import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import Todo from './models/Todo.js';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error: ', err));

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/todos', async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text });

  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);  // Ensure 201 is being returned
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("Fetched todos:", todos); // Log fetched todos
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err); // Log the full error
    res.status(500).json({ message: 'Error fetching todos' });
  }
});


app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



export default app;