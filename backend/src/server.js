import express from 'express'
import { db, connectToDb } from db.js;

//loading credentials
const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);
admin.initializeApp({
    credentials: admin.credentials.cert(credentials),
});

//fake db for now
let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comment: []
}, {
    name: 'learn-node',
    upvotes: 0,
    comment: []
}, {
    name: 'mongodb',
    upvotes: 0,
    comment: []
}]

//creating a new express app for the project
const app = express();
app.use(express.json());

//get method
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    //if article exist send it, if doesn't exist send 404
    if (article) {
        res.json(article)
    } else {
        res.sendStatus(404).send('Article not found !')
    }


    res.json(article);
})

//create an upvote endpoint with mongodb
app.put('/api/articles/:name/upvote', async (req, res) => {

    //what artciles need to be upvote
    const { name } = req.params;

    //find the artcile with that name
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send('That article doesn\'t exist');
    }

});

//making commenting possible with mongodb
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    //find the article with that name in db.js
    //make a query to db
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comment);
    } else {
        res.send('That article doesn\'t exist')
    }
})

//make the express listen using connectToDb class
connectToDb(() => {
    const PORT = app.listen(8000, () => {
        console.log('Server is listening on', PORT)
    })
})
