exports.run = async (bot, msg, args) => {
    let parsed = bot.utils.parseArgs(args, ['o']);

    if (parsed.options.o) {
        return msg.channel.send(':stopwatch: Ping').then(m => {
            let time = msg.editedTimestamp - msg.createdTimestamp;
            bot.utils.playAnimation(m, 500, [
                ':stopwatch: __P__ing',
                ':stopwatch: __Pi__ng',
                ':stopwatch: __Pin__g',
                ':stopwatch: __Ping__',
                `:stopwatch: ***Pong!*** \`${time}ms\``
            ]);
        });
    }

    await msg.channel.send(':thinking: Ping');

    const delay = msg.editedTimestamp - msg.createdTimestamp;

    (await msg.channel.send(`:stopwatch: Pong! \`${delay}ms\``)).delete(9000);
};

exports.info = {
    name: 'ping',
    usage: 'ping [-o]',
    description: 'Pings the bot',
    options: [
        {
            name: '-o',
            usage: '-o',
            description: 'Affiche l\'ancien message ping (animé)'
        }
    ]
};
