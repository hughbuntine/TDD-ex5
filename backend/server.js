const express = require('express');
const app = express();
const port = 3001;

// A simple route to test the backend
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
