
import React, { useState } from 'react';

function Entry({ text, onComplete, onRename, taskId }) {
  const [isEditing, setIsEditing] = useState(false); // To toggle between viewing and editing the task
  const [newText, setNewText] = useState(text); // Store the new task text

  const handleRename = () => {
    if (newText !== text) {
      onRename(taskId, newText); // Call the onRename function passed from the parent
    }
    setIsEditing(false); // Exit editing mode after renaming
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <span data-testid="toDoEntry">{text}</span>
          <button data-testid="completeButton" onClick={onComplete}>Complete</button>
          <button data-testid="renameButton" onClick={() => setIsEditing(true)}>Rename</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleRename}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Entry;
