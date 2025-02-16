import React, { useState } from 'react';

const Entry = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
        <span data-testid="toDoEntry">{props.text}</span>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
        <button data-testid="renameButton">Rename</button>
    </div>
  );
};

export default Entry;


