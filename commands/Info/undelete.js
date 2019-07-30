exports.run = function (bot, msg) {
    const user = msg.mentions.users.first();
    if (!user) {
        throw 'Merci de mentionner un utilisateur.';
    }

    const delmsg = bot.deleted.get(user.id);
    if (!delmsg) {
        throw 'Aucun message récemment supprimé trouvé';
    }

    bot.deleted.delete(user.id);

    msg.channel.send(`Message non supprimé de ${user.username} in ${delmsg.guild.name} | ${delmsg.channel.name}\n\`\`\`${delmsg.content}\`\`\``);
};

exports.info = {
    name: 'undelete',
    usage: 'undelete <mention of user>',
    description: 'Undelete messages'
};
