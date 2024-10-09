import express from 'express';

//creating a new express app for the project
const app = express();

app.get('/hello', (req,res) =>{
    res.send('Himasha, so pretty');
});

//make the express listen
const PORT = app.listen(8000, () => {
    console.log('Server is listening on', PORT)
})