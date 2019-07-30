const ascii = `
\`\`\`
  _______   _________    _________   ,        ,
 /              |       /            |        |
|               |      |             |        |
|               |      |             |        |
 \\_____,        |      |  _______,   |________|
        \\       |      |         |   |        |
         |      |      |         |   |        |
         |      |      |         |   |        |
  ______/   ____|____   \\________|   |        |
\u200b
\`\`\`
`;

exports.run = function (bot, msg) {
    msg.channel.send(ascii);
};

exports.info = {
    name: 'sigh',
    usage: 'sigh',
    description: 'Texte de soupir dramatique'
};
