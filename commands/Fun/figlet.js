const figlet = require('figlet');

exports.run = (bot, msg, args) => {
    // -l -- List all fonts
    // -f <font> -- Set font
    const parsed = bot.utils.parseArgs(args, ['l', 'f:']);

    if (parsed.options.l) {
        bot.utils.gistUpload(figlet.fontsSync().join('\n'), 'txt').then(({ url }) => {
            if (!url) {
                return msg.error('Échec de la mise en ligne de la liste des polices !');
            }

            msg.edit({
                embed: bot.utils.embed('Polices disponibles', `Une liste de polices disponibles peut être trouvée [here](${url}).`)
            }).then(m => m.delete(5000));
        });
        return;
    }

    if (parsed.leftover.length < 1) {
        throw 'Vous devez fournir du texte à rendre !';
    }

    const options = {};

    if (parsed.options.f) {
        options.font = parsed.options.f;
    }

    msg.delete();

    const input = parsed.leftover.join(' ');
    msg.channel.send(`\`\`\`\n${figlet.textSync(input, options)}\n\`\`\``);
};

exports.info = {
    name: 'figlet',
    usage: 'figlet <text>',
    description: 'Rend le texte ASCII fantaisie',
    options: [
        {
            name: '-f',
            usage: '-f <font>',
            description: 'Définit la police à utiliser'
        },
        {
            name: '-l',
            description: 'Liste toutes les polices disponibles'
        }
    ]
};
