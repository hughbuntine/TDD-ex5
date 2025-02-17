import React, { useEffect, useState } from 'react';
import Entry from './components/Entry';
import ArchivedEntry from './components/ArchivedEntry';

function App() {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const [tasks, setTasks] = useState([]); // State to hold tasks from DB
  const [completedTasks, setCompletedTasks] = useState([]); // State to hold completed tasks
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
      {tasks.length > 0 ? (
        tasks.map((task) => <Entry key={task._id} text={task.text} />)
      ) : (
        <p>No tasks found</p>
      )}

      <h3>COMPLETED</h3>
      <ArchivedEntry text={"walk the dog"} />
    </div>
  );
}

export default App;
