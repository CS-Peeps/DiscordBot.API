exports.ping = async (msg, client) => {
	// Calculates ping between sending a msg and editing it, giving a nice round-trip latency.
	// The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
	const m = await msg.channel.send("Ping?");
	m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.say = (msg, args) => {
	msg.channel.send(args.join(' '));
};

exports.kick = async (msg, args) => {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    if(!msg.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return msg.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // msg.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    if(!member)
      return msg.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return msg.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => msg.reply(`Sorry ${msg.author} I couldn't kick because of : ${error}`));
    msg.reply(`${member.user.tag} has been kicked by ${msg.author.tag} because: ${reason}`);
};

exports.ban = async (msg, args) => {
	// Most of this command is identical to kick, except that here we'll only let admins do it.
	// In the real world mods could ban too, but this is just an example, right? ;)
	if(!msg.member.roles.some(r=>["Administrator"].includes(r.name)) )
	  return msg.reply("Sorry, you don't have permissions to use this!");

	let member = msg.mentions.members.first();
	if(!member)
	  return msg.reply("Please mention a valid member of this server");
	if(!member.bannable) 
	  return msg.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

	let reason = args.slice(1).join(' ');
	if(!reason) reason = "No reason provided";

	await member.ban(reason)
	  .catch(error => msg.reply(`Sorry ${msg.author} I couldn't ban because of : ${error}`));
	msg.reply(`${member.user.tag} has been banned by ${msg.author.tag} because: ${reason}`);
};

exports.purge = async (msg, args) => {
    // This command removes all msgs from all users in the channel, up to 100.

    if(!msg.member.roles.some(r=>["admin", "moderator"].includes(r.name)))
	  return msg.reply("Sorry, you don't have permissions to use this!");
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return msg.reply("Please provide a number between 2 and 100 for the number of msgs to delete");
    
    // So we get our msgs, and delete them. Simple enough, right?
    const fetched = await msg.channel.fetchMessages({limit: deleteCount});
    msg.channel.bulkDelete(fetched)
      .catch(error => msg.reply(`Couldn't delete msgs because of: ${error}`));
}

