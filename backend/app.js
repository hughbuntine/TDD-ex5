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
    res.json(todos);
  }
  catch (err) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
  }
);



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;