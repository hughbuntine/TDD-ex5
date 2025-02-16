import React from 'react';
import Entry from './components/Entry';
import ArchivedEntry from './components/ArchivedEntry';

function App() {
  const [newTask, setNewTask] = React.useState([]);

  // FUNCTIONS
  function addTask () {
    console.log(newTask);
  }

  return (
    <div>
      <h1>
        TO-DO LIST
      </h1>
      <input type="text" placeholder="Add a new task" onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={() => addTask()}>Add Task</button>
      <Entry text={"get groceries"}/> 
      <h3>
        COMPLETED
      </h3>
      <ArchivedEntry text={"walk the dog"}/>
    </div>
  );
}

export default App;
