exports.init = bot => {
    this.storage = bot.storage('tags');
};

exports.run = async (bot, message, args) => {
    if (args.length < 1) {
        throw `Do \`${bot.config.prefix}help tag\` pour plus d'informations sur l'utilisation de cette commande.`;
    }

    const sub = args[0].toLowerCase();
    args = args.slice(1);

    if (sub === 'list') {
        const tags = this.storage.values
            .sort((a, b) => b.used - a.used);

        message.edit(`${tags.map(tag => `**${tag.name}** (${tag.used})`).join('\n')}`, { split: true });
    } else if (sub === 'add') {
        if (args.length < 2) {
            throw 'Vous devez fournir un nom de tag et le contenu du tag!';
        }

        let name = args[0];
        let contents = args.slice(1).join(' ');

        const tag = this.storage.get(name);
        if (tag) {
            throw 'Ce tag existe déjà !';
        }

        this.storage.set(name, { name, contents, used: 0 });
        this.storage.save();

        (await message.edit(`:white_check_mark: Le tag \`${name}\` est ajouté.`)).delete(5000);
    } else if (sub === 'delete') {
        if (args.length < 1) {
            throw 'Vous devez fournir un nom de tag à supprimer!';
        }

        const name = args[0];

        if (!this.storage.get(name)) {
            throw 'Ce tag n\'existe pas!';
        }

        this.storage.set(name);
        this.storage.save();

        (await message.edit(`:white_check_mark: Le tag \`${name}\` A été supprimée.`)).delete(5000);
    } else {
        const tag = this.storage.get(sub);

        if (!tag) {
            throw 'Ce tag n\'existe pas!';
        }

        message.edit(args.join(' ') + tag.contents);

        tag.used++;

        this.storage.set(sub, tag);
        this.storage.save();
    }
};

exports.info = {
    name: 'tag',
    usage: 'tag <name>|list|add <name> <content>|delete <name>',
    description: 'Gère vos tags'
};
