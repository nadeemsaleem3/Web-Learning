const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res)=> {
    res.send("Assalam O Alaikom, Dunya Walo");
});

app.listen(port, ()=> {
    console.log(`App is Listening on port: ${port}`);
});