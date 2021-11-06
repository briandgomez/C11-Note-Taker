const fs = require('fs');
const uniqid = require('uniqid');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3005;
const returnedNotes = require('./db/db.json');
const { match } = require('assert');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

/*API Routes*/
//Return notes as json
app.get('/api/notes', (req, res) => {
    res.json(returnedNotes);
});

//Saves note
app.post('/api/notes', (req, res) => {
    //onsole.log(req.body);
    req.body.id = uniqid();
    returnedNotes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(returnedNotes), (err, data) => {
        if (err) throw err;
    });
    res.json(returnedNotes);
});

//Delete specific note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const foundNote = returnedNotes.find(function (note) {
        if (note.id === id) {
            return note
        }
    });
    const index = returnedNotes.indexOf(foundNote);
    returnedNotes.splice(index,1);
    fs.writeFile('./db/db.json', JSON.stringify(returnedNotes), (err, data) => {
        if (err) throw err;
    });
    res.send('Note successfully deleted');
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
