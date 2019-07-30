const dateFormat = require('dateformat');

dateFormat('dddd, mmmm dS, yyyy, h:MM:ss TT');

exports.run = async (bot, msg) => {
    //Makes sure command is sent in a guild
    if (!msg.guild) {
        throw 'Cela ne peut être utilisé dans une guilde !';
    }

    //Makes sure user mentions a user to get info for
    if (msg.mentions.users.size < 1) {
        throw '@mention quelqu\'un pour trouver l\'info';
    }

    let user = msg.mentions.users.first();
    let member = msg.guild.member(user);

    if (!member) {
        throw 'Ce membre n\'a pas pu être trouvé !';
    }

    //How long ago the account was created
    const millisCreated = new Date().getTime() - user.createdAt.getTime();
    const daysCreated = millisCreated / 1000 / 60 / 60 / 24;

    //How long about the user joined the server
    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const daysJoined = millisJoined / 1000 / 60 / 60 / 24;

    // Slice off the first item (the @everyone)
    let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    if (roles.length < 1) roles = ['None'];

    let embed = bot.utils.embed(
        `${user.username}#${msg.mentions.users.first().discriminator}`,
        '***Ce message disparaîtra dans 60 secondes***',
        [
            {
                name: 'Status',
                value: `${user.presence.status[0].toUpperCase() + user.presence.status.slice(1)}`,
            },
            {
                name: 'Jeu',
                value: `${(user.presence.game && user.presence.game && user.presence.game.name) || 'Joue a rien.'}`,
            },
            {
                name: 'Crée en',
                value: `${dateFormat(user.createdAt)}`,
            },
            {
                name: 'Jours depuis la création',
                value: `${daysCreated.toFixed(0)}`,
            },
            {
                name: 'Rejoind en',
                value: `${dateFormat(member.joinedAt)}`,
            },
            {
                name: 'Jours depuis l`adhésion',
                value: `${daysJoined.toFixed(0)}`,
            },
            {
                name: 'Roles',
                value: `${roles.join(', ')}`,
                inline: false,
            },
        ],
        {
            inline: true,
            footer: `User ID: ${user.id}`,
            thumbnail: user.displayAvatarURL
        }
    );

    (await msg.channel.send({ embed })).delete(60000);
};

exports.info = {
    name: 'userinfo',
    usage: 'userinfo <user>',
    description: 'Affiche des informations sur un utilisateur'
};

