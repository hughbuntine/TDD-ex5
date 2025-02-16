import React, { useState } from 'react';

const Entry = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
        <button data-testid="renameButton">Rename</button>
        <span data-testid="toDoEntry">{props.text}</span>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
    </div>
  );
};

export default Entry;


