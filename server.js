const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3005;
const [returnedNotes] = require('./db/db.json');

/*API Routes*/
//Return notes as json
app.get('/api/notes', (req,res) => {
    res.json(returnedNotes);
});

//
app.post('/api/notes',(re,res) => {

});

/* HTML Routes*/
//Return notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//Return index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
