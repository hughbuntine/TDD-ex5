import React, { useEffect, useState } from 'react';
import Entry from './components/Entry';
import ArchivedEntry from './components/ArchivedEntry';

function App() {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const [tasks, setTasks] = useState([]); // State to hold tasks from DB
  const [newTask, setNewTask] = useState(''); // State for adding new tasks

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetch(`${API_URL}/todos`) // Make sure this URL matches your backend API
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  // FUNCTION to handle adding new task
  function addTask() {
    const task = { text: newTask };

    fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]); // Update the state with the new task
        setNewTask(''); // Clear the input field
      })
      .catch((error) => console.error('Error adding task:', error));
  }

  function completeTask(id) {
    fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        const updatedTasks = tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Error completing task:', error));
  }

  // Function to rename a task
  function renameTask(id, newText) {
    fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT', // Use PUT for renaming, as it updates the task
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        const updatedTasks = tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Error renaming task:', error));
  }


  return (
    <div>
      <h1>TO-DO LIST</h1>
      <input
        type="text"
        value={newTask}
        placeholder="Add a new task"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      {/* Display all tasks */}
      <h3>Active Tasks</h3>
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <Entry
            key={task._id}
            text={task.text}
            taskId={task._id}
            onComplete={() => completeTask(task._id)}
            onRename={renameTask}
          />
        ))}

      {/* Display completed tasks */}
      <h3>Completed Tasks</h3>
      {tasks
        .filter((task) => task.completed)
        .map((task) => (
          <ArchivedEntry key={task._id} text={task.text} onComplete={() => completeTask(task._id)}/>
        ))}
    </div>
  );

}

export default App;
