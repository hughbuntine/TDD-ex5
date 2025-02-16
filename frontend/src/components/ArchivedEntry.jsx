import React, { useState } from 'react';

const ArchivedEntry = (props) => {

  return (
    <div>
        <span data-testid="ArchivedEntry">{props.text}</span>
    </div>
  );
};

export default ArchivedEntry;