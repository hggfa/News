const dateFormat = require('dateformat');

const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

exports.run = async (bot, msg) => {
    if (!msg.guild) {
        throw 'Cela ne peut être utilisé dans une guilde !';
    }

    const millis = new Date().getTime() - msg.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;

    const owner = msg.guild.owner.user || {};

    const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];

    let embed = bot.utils.embed(
        `${msg.guild.name}`,
        '***Ce message disparaîtra dans 60 secondes.***',
        [
            {
                name: 'Créé le',
                value: `${dateFormat(msg.guild.createdAt)}`,
            },
            {
                name: 'Jours depuis la création',
                value: `${days.toFixed(0)}`,
            },
            {
                name: 'Chaîne par défaut',
                value: `${msg.guild.defaultChannel || 'Général'}`,
            },
            {
                name: 'Region',
                value: `${msg.guild.region}`,
            },
            {
                name: 'Nombre de membres',
                value: `${msg.guild.members.filter(m => m.presence.status !== 'offline').size} / ${msg.guild.memberCount}`,
            },
            {
                name: 'Propriétaire',
                value: `${owner.username || 'None'}`,
            },
            {
                name: 'Salons texte',
                value: `${msg.guild.channels.filter(m => m.type === 'text').size}`,
            },
            {
                name: 'Salons voix',
                value: `${msg.guild.channels.filter(m => m.type === 'voice').size}`,
            },
            {
                name: 'Verification Level',
                value: `${verificationLevels[msg.guild.verificationLevel]}`,
            },
            {
                name: 'Roles',
                value: `${msg.guild.roles.size}`,
            },
            {
                name: 'Emojis',
                value: `${msg.guild.emojis.map(e=>e.toString()).join(" ") || 'Aucun'}`,
            },
        ],
        {
            inline: true,
            footer: `Guild ID: ${msg.guild.id}`
        }
    );

    if (msg.guild.iconURL != null) {
        embed.setThumbnail(`${msg.guild.iconURL}`);
    }

    (await msg.channel.send({ embed })).delete(60000);
};

exports.info = {
    name: 'serverinfo',
    usage: 'serverinfo',
    description: 'Affiche des informations sur le serveur dans lequel vous vous trouvez'
};
