const cors = require('cors');
const express = require('express');

const data = require('../data/task.recording.json');

const app = express();
app.use(cors());
app.options('*', cors());

const port = 3030;

app.get('/api/v1/events', (req, res) => {
    // console.log(data)
    res.json(data);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})