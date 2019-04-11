const {SteamUser} = require('../models/steamUser');
const config = require('../config');

const axios = require('axios');


exports.link = async (msg, args) => {
	const userId = msg.author.id;
	const username = msg.author.username;
	const steamAccount = args[0];

	if(steamAccount) {
		SteamUser.findByDiscordId(userId).then((account) => {
			if(!account) {
				saveAccount(msg, userId, steamAccount, username);
				console.log("create steam account");
			} else {
				updateAccount(msg, steamAccount, account);
				console.log("update steam account");
			}
		}).catch((e) => {
			console.log(e);
		});
	} else {
		msg.channel.send("No account given. Ex. `set <steamId>");
	}

};

exports.get = (msg) => {
	const userId = msg.author.id;
	SteamUser.findByDiscordId(userId).then((account) => {
		if(account) {
			msg.channel.send(`Your account is linked with the Steam account ${account.steamUsername} (${account.steamId})`);
		} else {
			msg.channel.send(`You don't have a Steam account linked with your Discord account.`);
		}
	}).catch((e) => {
		console.log(e);
		msg.channel.send(`Get Error: ${e}`);
	});
}

exports.remove = (msg) => {
	const userId = msg.author.id;
	SteamUser.remove({discordId: userId}).then((account) => {
		if(account) {
			msg.channel.send("Unlinked your steam accout");
		} else {
			msg.channel.send("No Steam account to unlink");
		}
	}).catch((e) => {
		console.log(e);
		msg.channel.send(`Remove Error: ${e}`);
	})
}

exports.shuffle = async (msg, args) => {
	var userIds = [msg.author.id];
	var steamIds = [];
	await SteamUser.findByDiscordId(userIds[0]).then((account) => {
		if(account) {
			steamIds.push(account.steamId);
		} else {
			msg.channel.send("You don't have your steam account linked");
		}
	}).catch((e) => {
		msg.channel.send(`Shuffle Error: ${e}`);
	});

	const Users = msg.mentions.users;

	for (let user of Users) {
		await SteamUser.findByDiscordId(user[0]).then((account) => {
			if(account) {
				steamIds.push(account.steamId);
			} else {
				msg.channel.send(`${user[1].username} does not have a Steam account linked`);
			}
		}).catch((e) => {
			msg.channel.send(`Shuffle Error: ${e}`);
		});
	}



	var list = [];

	for(let id of steamIds) {
		const games = await getGameIdList(id);
		if(list.length === 0) {
			list = games;
		} else {
			list = list.filter(val => games.includes(val));
		}
	}

	if(steamIds.length > 1) {
		if(list.length == 0) {
			msg.channel.send(`No games in common :(`);
			return;
		} else {
			msg.channel.send(`Number of games in common: ${list.length}`);
		}

	} else {
		msg.channel.send(`You have ${list.length} games`);
	}


	const gameNum = Math.floor(Math.random() * list.length);

	const name = await getGameName(list[gameNum]);

	msg.channel.send(`Random game to play: ${name}`);

}

const getSteamIdFromName = async (user) => {

	const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${config.steam.apiKey}&format=json&vanityurl=${user}`;
	return await axios.get(url).then(res => {
		return res.data.response.steamid;
	}).catch(err => {
		console.log(err);
		return null;
	});
}


const getSteamUser = async (user) => {

	const userid = await getSteamIdFromName(user);

	if(userid) {
		const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${config.steam.apiKey}&format=json&steamids=${userid}`;
		return await axios.get(url)
		.then(res => {
			return res.data.response.players[0];
		}).catch(err => {
			return err
		});
	} else {
		return null
	}
};

const getGameList = async (steamid) => {
	const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${config.steam.apiKey}&steamid=${steamid}&format=json`;
	return await axios.get(url).then(res => {
		return res.data.response.games;
	}).catch(err => {
		return err;
	})
}

const getGameIdList = async (steamid) => {
	const games = await getGameList(steamid);
	// console.log(games);
	return games.map(game => {
		// console.log(game)
		return game.appid;
	});
}

const saveAccount = async (msg, userId, steamAccount, username) => {
	msg.channel.send(`Pulling account from Steam...`);
	const steamInfo = await getSteamUser(steamAccount);
	if(steamInfo) {
		var user = new SteamUser({
			discordUser: username,
			discordId: userId,
			steamUsername: steamInfo.personaname,
			steamId: steamInfo.steamid
		});

		try {
			await user.save();
			msg.channel.send(`You discord account is now linked with the steam account ${user.steamUsername} (${user.steamId})`);
		} catch (e) {
			msg.channel.send(`Error: Database saving error`);
		}
	} else {
			msg.channel.send(`Error: Cannot find steam account`);
	}
}

const updateAccount = async (msg, steamAccount, account) => {
	msg.channel.send(`Pulling account from Steam...`);	
	const steamInfo = await getSteamUser(steamAccount);
	if(steamInfo) {
		try {
			const user = await SteamUser.findOneAndUpdate({_id: account._id}, {steamUsername: steamInfo.personaname, steamId: steamInfo.steamid}, {new:true});
			msg.channel.send(`You discord account is now linked with the steam account ${user.steamUsername} (${user.steamId})`);
		} catch(e) {
			msg.channel.send(`Error: Database saving error\n${e}`);		
		}
	} else {
		msg.channel.send(`Error: Cannot find steam account`);
	}
}

const getGameName = async (appid) => {

	const url = `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${config.steam.apiKey}&appid=${appid}`;
	return await axios.get(url).then(res => {
		return res.data.game.gameName;
	}).catch(err => {
		console.log(err);
	});
}

