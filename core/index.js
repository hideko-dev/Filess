const { client } = require('./client')
const express = require('express')
const app = express()
const cors = require('cors')
const { TOKEN } = require('./enviroments')
const routes = require('./routes')
const Port = 1000;

app.use(express.json(), cors())

app.use('/', routes)

client.once('ready', () => {
    console.log('Bot is ready!');
})

client.login(TOKEN);

app.listen(Port, () => {
    console.log(`Launch at http://localhost:${Port}`)
});