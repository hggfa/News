exports.run = (bot, msg, args) => {
    const parsed = bot.utils.parseArgs(args, ['c:']);

    if (parsed.leftover.length < 1) {
        throw 'Vous devez mettre quelque chose à dire !';
    }

    let channel = msg.channel;
    if (parsed.options.c) {
        const id = parsed.options.c.match(/\d{18}/)[0];

        if (!id) {
            throw 'Canal non valide!';
        }

        channel = bot.channels.get(id);
        if (!channel) {
            throw 'Ce canal n\'a pas pu être trouvé!';
        }
    }

    msg.delete();
    channel.send(parsed.leftover.join(' '));
};

exports.info = {
    name: 'say',
    usage: 'say <message>',
    description: 'Dit le message que vous avez mis. Utile pour les raccourcis.',
    options: [
        {
            name: '-c',
            usage: '-c <channel|channel ID>',
            description: 'Spécifie un canal spécifique pour envoyer le message'
        }
    ]
};
