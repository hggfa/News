function hasRole(member, roleName) {
    return member.roles.map(role => role.name.toLowerCase()).indexOf(roleName.toLowerCase()) > -1;
}

exports.run = async (bot, msg, args) => {
    if (!msg.guild || !msg.guild.members) {
        throw 'Vous devez exécuter cette commande depuis un serveur.';
    }

    let members = msg.guild.members.array().sort((a, b) => a.user.username.localeCompare(b.user.username));

    if (args.length > 0) {
        members = members.filter(member => hasRole(member, args[0]));
    }

    if (members.length < 1) {
        throw 'Aucun membre n\'a pu être trouvé.';
    }

    msg.delete();

    let users = members.map(m => `${m.user}${(m.user.bot ? ' [BOT]' : '')}`);
    const body = users.join('\n');

    if (body.length < 2000) {
        (await msg.channel.send({
            embed: bot.utils.embed('', body)
        })).delete(60000);
    } else {
        let raw = members.map(m => `${m.user.username}${m.user.bot ? ' [BOT]' : ''}`).join('\n');

        const { url } = await bot.utils.gistUpload(raw, 'txt');

        let trimmed = body.substr(0, 1500);
        trimmed = trimmed.slice(0, trimmed.lastIndexOf('\n'));

        msg.channel.send({
            embed: bot.utils.embed('', trimmed, [{ name: 'Full list', value: url }])
        });
    }
};

exports.info = {
    name: 'users',
    usage: 'users [role]',
    description: 'Liste tous les utilisateurs de votre serveur actuel'
};
