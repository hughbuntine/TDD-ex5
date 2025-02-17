import React, { useState } from 'react';

const ArchivedEntry = ({text, onComplete}) => {

  return (
    <div>
        <span data-testid="ArchivedEntry">{text}</span>
        <button onClick={onComplete}>Undo</button>

    </div>
  );
};

export default ArchivedEntry;