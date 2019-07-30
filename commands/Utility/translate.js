const translate = require('google-translate-api');
const stripIndents = require('common-tags').stripIndents;

exports.run = async (bot, msg, args) => {
    let parsed = bot.utils.parseArgs(args, ['e', 'f:']);

    if (parsed.leftover.length < 2) {
        throw 'Vous devez fournir une langue et du texte à traduire !';
    }

    let lang = parsed.leftover[0];
    let input = parsed.leftover.slice(1).join(' ');

    await msg.edit(':arrows_counterclockwise: **Traduire votre texte...**');
    let res;

    try {
        res = await translate(input, { from: parsed.options.f, to: lang });
    } catch (e) {
        return msg.error(`Échec de la traduction: ${e.message}`);
    }

    if (parsed.options.e) {
        return msg.edit(res.text);
    }

    msg.delete();
    msg.channel.send({
        embed: bot.utils.embed('', stripIndents`
            **From:** __\`${parsed.options.f || '[auto]'}\`__
            **To:** __\`${lang}\`__

            **Input:**\n\`\`\`\n${input}\n\`\`\`
            **Output:**\n\`\`\`\n${res.text}\n\`\`\`
        `)
    });
};

exports.info = {
    name: 'translate',
    usage: 'translate <lang> <text>',
    description: 'Traduit le texte de / vers n\'importe quelle langue',
    options: [
        {
            name: '-e',
            description: 'Modifie votre message avec la traduction au lieu de montrer une traduction'
        },
        {
            name: '-f',
            usage: '-f <language>',
            description: 'Définit la langue `from`, c\'est` `auto` par défaut'
        }
    ]
};
