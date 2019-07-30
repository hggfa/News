const got = require('got');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'Vous devez spécifier une heure de conversion';
    }

    let input = args.join(' ');
    let url = `https://api.duckduckgo.com/?q=${encodeURIComponent(input)}&format=json`;

    await msg.channel.send(':arrows_counterclockwise:  Loading conversion...');

    const res = await got(url, { json: true });

    if (!res || !res.body) {
        throw 'Impossible de charger les données de DDG.';
    }

    let data = res.body;

    let answer = data['Answer'];
    let message;

    if (data['AnswerType'] === 'timezone_converter') {
        msg.delete();

        let matches = input.match(/(.*?)\s*(to|in)\s*(.*)/);
        let prefix;

        if (matches) {
            prefix = matches[1];
        } else {
            prefix = input;
        }

        message = bot.utils.embed('', '', [
            {
                name: 'Timezone:',
                value: `${prefix} \u2794 ${answer}`
            }
        ]);

        msg.channel.send({ embed: message });
    } else {
        throw `No conversion found for ${input}`;
    }
};

exports.info = {
    name: 'timezone',
    usage: 'timezone <time> to <time>',
    description: 'convertit entre les fuseaux horaires, en utilisant les recherches DuckDuckGo'
};
