// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const playerCountAPI = "http://172.105.168.24:3001/info"

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
    setInterval(function() {
        axios.get(playerCountAPI).then(response => {
            const playerCount = (response.data.OnlinePlayers);
            client.user.setActivity(playerCount + ' Players On Server', { type: 'WATCHING' });
        })
        .catch(error => {
            console.log(error);
        });
    }, 300 * 1000)
});
client.login(token);
// Login to Discord with your client's token


