const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

// client.on('connect', () => {
//   console.log('Connected to Redis');
// });

app.get('/', async (req, res) => {
    try {
        const visits = await client.get('visits');
        res.send('Number of visits is ' + visits);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting visits');
    }
    // res.send('Hello World');
});

async function getConnectedClient(){
    try {
        await client.connect();
        console.log('Connected to Redis');
        app.listen(3000, () => {
            client.set('visits', 0);
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}
getConnectedClient();
