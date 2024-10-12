import express from 'express'
import { MongoClient } from 'mongodb';

//fake db for now
let articlesInfo = [{
    name: 'learn-react',
    upvotes:0,
    comment:[]
}, {
    name: 'learn-node',
    upvotes:0,
    comment:[]
}, {
    name: 'mongodb',
    upvotes:0,
    comment:[]
}]

//creating a new express app for the project
const app = express();
app.use(express.json());

//get method
app.get('/api/articles/:name', async (req,res) => {
    const { name } = req.params;

    const client = new MongoClient('mongofb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-blog-db');

    const article = await db.collection('articles').findOne({name});
})

//create an upvode endpoint
app.put('/api/articles/:name/upvote', (req,res) => {
    //what artciles need to be upvote
    const { name } = req.params;
    //find the artcile with that name
    const article = articlesInfo.find(a => a.name === name);
    if(article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send('That article doesn\'t exist');
    }

});

//making commenting possible
app.post('/api/articles/:name/comments', (req,res)=> {
    const { name } = req.params;
    const { postedBy, text }=req.body;

    const article = articlesInfo.find(a=> a.name === name );

    if (article) {
        article.comment.push({ postedBy, text })
        res.send(article.comment);
    } else {
        res.send('That article doesn\'t exist')
    }
})

//make the express listen
const PORT = app.listen(8000, () => {
    console.log('Server is listening on', PORT)
})