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

//authenticating
app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            res.sendStatus(400);
        }
    }

    next();
})

//get method
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    //if article exist send it, if doesn't exist send 404
    //enable one time upvoting by Id
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.include(uid);
        res.json(article)
    } else {
        res.sendStatus(404).send('Article not found !')
    }


    res.json(article);
})

app.use ((req,res,next) => {
    if(req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
})

//create an upvote endpoint with mongodb
app.put('/api/articles/:name/upvote', async (req, res) => {

    //what artciles need to be upvote
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });
    
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.include(uid)

        if (canUpvote) {
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid}
        });
    }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle)
    } else {
        res.send('That article doesn\'t exist');
    }
});

//making commenting possible with mongodb
app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist!');
    }
});

//make the express listen using connectToDb class
connectToDb(() => {
    const PORT = app.listen(8000, () => {
        console.log('Server is listening on', PORT)
    })
})
