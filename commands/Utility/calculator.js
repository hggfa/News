const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw 'Vous devez fournir une équation à résoudre sur la calculatrice';
    }

    const question = args.join(' ');

    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        throw `Invalid math equation: ${err}`;
    }

    msg.delete();
    msg.channel.send({
        embed: bot.utils.embed('', stripIndents`
                **Equation:**\n\`\`\`\n${question}\n\`\`\`
                **Answer:**\n\`\`\`\n${answer}\n\`\`\`
                `)
    });
};

exports.info = {
    name: 'calc',
    usage: 'calc <equation>',
    aliases: ['calc', 'math'],
    description: 'Calcule n\'importe quelle équation mathématique',
};
