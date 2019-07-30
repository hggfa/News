const IMAGE_NAME = /\.(jpe?g|png|gif|webp)$/i;

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'Veuillez fournir une URL d\'image à envoyer.';
    }
    
    msg.delete();

    const url = args[0];
    let name;

    if (!IMAGE_NAME.test(url)) {
        name = 'image.png';
    }

    try {
        await msg.channel.send({
            file: {
                name,
                attachment: url
            }
        });
    } catch (ignore) {
        // Using throw inside of a catch doesn't work quite right
        return msg.error('Échec de l\'envoi de l\'image.');
    }
};

exports.info = {
    name: 'image',
    usage: 'image <url>',
    description: 'Envoie une image à partir d\'une URL'
};
