const webdict = require('webdict');

const makeCommand = method => {
    return (bot, msg, args) => {
        if (args.length < 1) {
            throw 'S\'il vous plaît fournir un mot pour rechercher !';
        }

        const parsed = bot.utils.parseArgs(args, ['e']);
        const word = parsed.leftover.join(' ');

        webdict(method, word).then(res => {
            let result;
            if (!res || !res.definition || !res.definition[0]) {
                result = 'Aucun résultat trouvé.';
            } else {
                result = res.definition[0];
            }

            if (parsed.options.e) {
                msg.channel.send(result);
                return;
            }

            msg.delete();
            msg.channel.send({
                embed: bot.utils.embed(`:book: ${word}`, result)
            });
        });
    };
};

module.exports = [
    {
        run: makeCommand('dictionary'),
        info: {
            name: 'dictionary',
            aliases: ['dict'],
            usage: 'dictionary <word>',
            description: 'Cherche un mot dans le dictionnaire.'
        }
    },
    {
        run: makeCommand('urbandictionary'),
        info: {
            name: 'urban',
            usage: 'urban <word>',
            description: 'Regarde un mot dans le dictionnaire urbain.'
        }
    }
];
