exports.run = async (bot, msg, args) => {
    let channel = msg.channel;

    if (args.length < 1) {
        throw 'Vous devez fournir un ID de message';
    }

    if (!/^\d{18}$/.test(args[0])) {
        throw 'Vous devez fournir un ID de message valide.';
    }

    if (args[1] && /^<#\d{18}>$|^\d{18}$/.test(args[1])) {
        channel = bot.channels.get(args[1].replace(/[<#>]/g, ''));
    }

    if (!channel) {
        throw 'Ce canal n\'a pas pu être trouvé!';
    }

    const messages = await channel.fetchMessages({ around: args[0], limit: 1 });

    if (!messages || messages.size < 1) {
        throw 'Ce message n\'a pas pu être trouvé!';
    }

    let message = messages.first();

    let options = {
        timestamp: message.editedTimestamp || message.createdTimestamp,
        footer: false
    };

    let attachment = message.attachments.first();

    if (attachment && (attachment.width || attachment.height)) {
        options.image = attachment.url;
    }

    let field = '';

    if ((msg.guild || {}).id !== (channel.guild || {}).id) {
        field = `**in ${(channel.guild || { name: 'DMs' }).name} <#${channel.id}>:**`;
    } else if (channel.id !== msg.channel.id) {
        field = `**in <#${channel.id}>:**`;
    }

    msg.delete();
    msg.channel.send({
        embed: bot.utils.embed('', field + '\n\n' + message.toString(), [], options)
            .setAuthor(message.author.username, message.author.avatarURL)
    });
};

exports.info = {
    name: 'quote',
    usage: 'quote <id> [#channel | channel ID]',
    description: 'Cite le message avec l\'ID et la chaîne donnés.'
};
