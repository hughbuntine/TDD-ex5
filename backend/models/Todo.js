import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo; // This will allow the default import in app.js
