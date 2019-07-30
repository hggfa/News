exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît fournir un préfix pour définir !';
    }

    const prefix = args.join(' ');
    bot.managers.config.set('prefix', prefix);
    // No point trying to delete this message, the bot will be
    // rebooting before we have a chance to.
    msg.channel.send('Préfix, redémarrage ! :ok_hand:');
};

exports.info = {
    name: 'prefix',
    usage: 'prefix <new prefix>',
    description: 'Définit le préfixe du Bot'
};
