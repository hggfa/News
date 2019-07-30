const got = require('got');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît fournir une URL pour raccourcir!';
    }

    const url = args.join(' ');

    msg.delete();

    const res = await got(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    msg.channel.send({
        embed: bot.utils.embed('', '', [
            {
                name: 'Link',
                value: url
            },
            {
                name: 'Short URL',
                value: res.body
            }
        ])
    });

};

exports.info = {
    name: 'shorturl',
    aliases: ['short'],
    usage: 'shorturl <url>',
    description: 'Raccourcit une URL'
};
