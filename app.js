const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => res.send('Hello from CI/CD!'));
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
