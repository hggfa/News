exports.run = async (bot, msg) => {
    const user = msg.mentions.users.first();
    if (!user) {
        throw 'Veuillez mentionner l\'utilisateur à qui vous voulez l\'avatar.';
    }

    if (!user.avatarURL) {
        throw 'Cet utilisateur n\'a pas d\'avatar.';
    }

    msg.delete();
    (await msg.channel.send({
        embed: bot.utils.embed(`${user.username}'s Avatar`, `[Download](${user.avatarURL})`, [], { image: user.avatarURL })
    })).delete(30000);
};

exports.info = {
    name: 'avatar',
    usage: 'avatar <user>',
    description: 'Vous donne l\'avatar d\'un utilisateur'
};
