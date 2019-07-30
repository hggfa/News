const snekfetch = require("snekfetch");
exports.run = async (bot, msg, args) => {
msg.delete().catch(O_o=>{}); 
if (!args[0]) { return msg.channel.send(":x: Que voulez-vous publier sur Hastebin ?") }
	 snekfetch.post("https://hastebin.com/documents").send(args.slice(0).join(" ")).then(body => {
            msg.channel.send(":white_check_mark: Texte envoyé à Hastebin à cette URL : https://hastebin.com/" + body.body.key);
        });
}

exports.info = {
    name: 'haste',
    usage: 'haste <code>',
    description: 'Upload du code sur hastebin'
};

