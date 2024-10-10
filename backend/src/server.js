import express from 'express'

//fake db for now
let articlesInfo = [{
    name: 'learn-react',
    upvotes:0,
}, {
    name: 'learn-node',
    upvotes:0,
}, {
    name: 'mongodb',
    upvotes:0,
}]

//creating a new express app for the project
const app = express();
app.use(express.json());

//create an upvode endpoint
app.put('/api/articles/:name/upvote', (req,res) => {

})

//make the express listen
const PORT = app.listen(8000, () => {
    console.log('Server is listening on', PORT)
})