const got = require('got');
const cheerio = require('cheerio');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît @mention un utilisateur.';
    }
    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("Vous n'avez pas la permission **BAN** !!");
    const username = args[0];
    let reason = args.slice(1).join(' ');
    let user = msg.mentions.users.first(); 
    msg.guild.ban(user, 2);
    msg.delete();
    return msg.channel.send({
        embed: bot.utils.embed('', '', [
            {
                name: 'Action',
                value: `Ban`
            },
            {
                name: 'Utilisateur Ban',
                value: username
            },
            {
                name: 'Raison',
                value: `${reason}`
            },
            {
                name: '-------------------------',
                value: `BAN effectué par :`
            },
            {
                name: 'Administrateur',
                value: `${msg.author.username}`
            }
        ], { thumbnail: `${msg.guild.iconURL}` })
    });
};



exports.info = {
    name: 'ban',
    usage: 'ban <user>',
    description: 'ban un utilisateur'
};
