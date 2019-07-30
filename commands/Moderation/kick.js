const got = require('got');
const cheerio = require('cheerio');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît @mention un utilisateur.';
    }
    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("Vous n'avez pas la permission **KICK** !!");
    const username = args[0];
    let reason = args.slice(1).join(' ');
    let user = msg.mentions.users.first(); 
    msg.guild.member(user).kick();
    msg.delete();
    return msg.channel.send({
        embed: bot.utils.embed('', '', [
            {
                name: 'Action',
                value: `Kick`
            },
            {
                name: 'Utilisateur Kick',
                value: username
            },
            {
                name: 'Raison',
                value: `${reason}`
            },
            {
                name: '-------------------------',
                value: `KICK effectué par :`
            },
            {
                name: 'Administrateur',
                value: `${msg.author.username}`
            }
        ], { thumbnail: `${msg.guild.iconURL}` })
    });
};



exports.info = {
    name: 'kick',
    usage: 'kick <user>',
    description: 'kick un utilisateur'
};
