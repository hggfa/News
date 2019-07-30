exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'Vous devez spécifier les éléments à rechercher!';
    }

    let query = args.join(' ');

    await msg.channel.send(`:arrows_counterclockwise: Searching the last \`100\` messages for \`${query}\``);

    const messages = await msg.channel.fetchMessages({ limit: 100, before: msg.id });

    const results = messages.filter(it => it.cleanContent.toLowerCase().indexOf(query.toLowerCase()) != -1)
        .sort((a, b) => (a.editedTimestamp || a.createdTimestamp) - (b.editedTimestamp || b.createdTimestamp));

    if (results.length < 1) {
        throw 'No results found.';
    }

    const output = results
        .map(message => `${formatDate(message.createdAt)} ${message.author.username}: ${message.content}`)
        .join('\n');

    msg.delete();
    bot.utils.sendLarge(
        msg.channel,
        output.replace(/`/g, '\u200b`'),
        {
            prefix: '\`\`\`log\n',
            suffix: '\n```',
            delay: 10,
            cutOn: '\n'
        }
    );
};

function formatDate(date) {
    return `[${_(date.getDay())}/${_(date.getMonth())}/${_(date.getYear() - 100)}] [${_(date.getHours())}:${_(date.getMinutes())}:${_(date.getSeconds())}]`;
}

function _(number) {
    return number < 10 ? '0' + number : '' + number;
}

exports.info = {
    name: 'search',
    usage: 'search <#> <text>',
    description: 'Recherche un certain nombre de messages pour un texte'
};
