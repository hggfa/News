exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        throw 'Vous devez entrer le texte à inverser !';
    }
    msg.channel.send(args.join(' ').split('').reverse().join(''));
};

exports.info = {
    name: 'reverse',
    usage: 'reverse <text>',
    description: 'Inverse le texte que vous entrez'
};
