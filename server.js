const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;

//Return notes.html when using '/notes' in the route
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join, (__dirname, 'notes.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
