const express = require('express');
const app = express();
const itemRouter = require('./routes/Item');
const likesRouter = require('./routes/Likes');
const {createUser, getUser} = require('./services/UserService');
const {createSession, getSession, deleteSession} = require('./services/Session');
const {batchProcessing} = require('./services/BatchProcessing');

app.use(express.json());

app.post('/createUser', async (req, res) => {
    const user = req.body;
    console.log(user);
    const id = await createUser(user);
    res.status(200).json({id});
});
app.use('/items', itemRouter);
app.use('/likes', likesRouter);

app.get('/getUser/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    console.log(user);
    res.status(200).json(user);
});

app.post('/login', async (req, res) => {
    const user = req.body;
    const existingUser = await getUser(user.id);
    if(!existingUser){
        return res.status(401).json({message: 'User not found'});
    }
    console.log(existingUser.password, user.password);
    if(existingUser.password !== user.password){
        return res.status(401).json({message: 'Invalid password'});
    }
    const id = await createSession(user);
    res.status(200).json({id});
});

app.get('/getSession/:id', async (req, res) => {
    const id = req.params.id;
    const session = await getSession(id);
    res.status(200).json(session);
});

app.delete('/deleteSession/:id', async (req, res) => {
    const id = req.params.id;
    await deleteSession(id);
    res.status(200).json({message: 'Session deleted'});
});

app.get('/batchProcessing', async (req, res) => {
    const results = await batchProcessing();
    res.status(200).json(results);
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


