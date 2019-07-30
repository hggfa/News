const got = require('got');
const cheerio = require('cheerio');

exports.run = (bot, msg) => {

if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("Vous n'avez pas la permission **ADMIN** !!");

    msg.delete();
    return msg.channel.send({
        embed: bot.utils.embed('', '', [
            {
                name: ':globe_with_meridians: Admin :globe_with_meridians: ',
                value: `-------------------------`
            },
            {
                name: 'Ban',
                value: `${bot.config.prefix}**ban** [@Mention] [Raison] --- *Ban un utilisateur*\n-------------`
            },
            {
                name: 'Kick',
                value: `${bot.config.prefix}**kick** [@Mention] [Raison] --- *Kick un utilisateur*\n-------------`
            },
            {
                name: 'Warn',
                value: `${bot.config.prefix}**warn** [@Mention] [Raison] --- *Warn un utilisateur*\n-------------`
            },
            {
                name: 'Purge',
                value: `${bot.config.prefix}**purge** [Nombre] --- *Supprime un certain nombre de messages*\n-------------`
            },
            {
                name: 'prune',
                value: `${bot.config.prefix}**prune** [Nombre] --- *Supprime un certain nombre de messages envoyés par vous*\n-------------`
            },
            {
                name: 'flush',
                value: `${bot.config.prefix}**flush** [Nombre] --- *Supprime un certain nombre de messages envoyés par des robots*\n-------------`
            },
            {
                name: 'Quote',
                value: `${bot.config.prefix}**quote** <id> [#channel | channel ID] --- *Cite le message avec l'ID et la chaîne donnés*\n-------------`
            },
            {
                name: 'Search',
                value: `${bot.config.prefix}**search** <#> [text] --- *Recherche un certain nombre de messages pour un texte*\n-------------`
            },
            {
                name: 'Lock',
                value: `${bot.config.prefix}**lock** [Nombre] --- *Lock un channel text selon le nombre de secondes. ex: <10s>*\n-------------`
            }
        ], { thumbnail: `${msg.guild.iconURL}` })

    })
};



exports.info = {
    name: 'admin',
    usage: 'admin',
    description: 'accéde au panel admin'
};
