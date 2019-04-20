import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get( `/`, (request, response) => {
    response.sendFile('./build/index.html', {root: __dirname })
})
app.get('/', function(req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/" + "./css/main.css");
  });


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
})