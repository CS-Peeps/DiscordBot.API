const Discord = require('discord.js');
const client = new Discord.Client();

const system = require('./controllers/system');
const crypto = require('./controllers/crypto');
const steam = require('./controllers/steam');
const config = require('./config');

var prefix = '`';

var env = process.env.NODE_ENV || 'development';
if(env === 'development' || env === 'test') {
	prefix = 'd`';
}



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ game: { name: '\`help to get assistance', type: 0 } })
});


client.on('message', msg => {

	// Ignore other bot messages
	if(msg.author.bot) return;
	// Ignore message that does not start with prefix
	if(msg.content.indexOf(prefix) !== 0) return;

	const args = parseMessage(msg.content);
	const cmd = args.shift().toLowerCase();

	
	console.log("Command:", cmd);
	switch(cmd) {
		// system commands
		case 'ping': return system.ping(msg, client);
		case 'say': return system.say(msg, args);
		case 'kick': return system.kick(msg, args);
		case 'ban': return system.ban(msg, args);
		case 'purge': return system.purge(msg, args);
		
		// crypto commands
		// case 'price': return crypto.price(msg, args);
		// case 'priceusd': return crypto.priceusd(msg, args);

		// steam commands
		case 'link': return steam.link(msg, args);
		case 'get': return steam.get(msg);
		case 'remove': return steam.remove(msg);
		case 'shuffle': return steam.shuffle(msg, args);
	}


});

client.login(config.discord.botKey).catch( e => {
	console.log("Incorrect discord bot token");
});




const parseMessage = (msg) => {
	return args = msg.substring(prefix.length).split(' ');
};