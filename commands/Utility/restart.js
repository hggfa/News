exports.run = async (bot, msg) => {
    await msg.channel.send(':wave: Restarting. Bye!');
    process.exit(42);
};

exports.info = {
    name: 'restart',
    usage: 'restart',
    description: 'Redémarre le bot'
};
