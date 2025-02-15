const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend is working yay!');
});

// Other backend routes can go here...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
