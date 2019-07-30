const path = require('path');
const chalk = require('chalk');
const didYouMean = require('didyoumean2');

class CommandManager {
    constructor(bot) {
        this.bot = bot;
        this._commands = [];
        this._categories = [];
    }

    _validateCommand(object) {
        if (typeof object !== 'object')
            return 'la configuration de la commande est invalide';
        if (typeof object.run !== 'function')
            return 'fonction d\'exécution est manquante';
        if (typeof object.info !== 'object')
            return 'L\'objet info est manquant';
        if (typeof object.info.name !== 'string')
            return 'objet info manque un champ de nom valide';
        return null;
    }

    loadCommands() {
        this._commands = [];
        this._categories = [];

        const bot = this.bot;

        const commandImports = bot.managers.dynamicImports.getImport('commands');
        Object.keys(commandImports).forEach(file => {
            let command = commandImports[file];
            let name = path.basename(file);

            if (command instanceof Array) {
                command.forEach((e, i) => this._validateAndLoad(e, file, `${name}.${i}`));
            } else {
                this._validateAndLoad(command, file, name);
            }
        });
    }

    _validateAndLoad(command, file, name) {
        let error = this._validateCommand(command);

        if (error) {
            return this.bot.logger.severe(`Échec du chargement '${name}': ${chalk.red(error)}`);
        }

        if (!command.category) {
            // TODO: Any better way to do this?
            let base = path.join(this.bot.managers.dynamicImports.base, 'commands');

            let category = 'Uncategorized';
            if (file.indexOf(path.sep) > -1) {
                category = path.dirname(path.relative(base, file))
                    .replace(new RegExp(path.sep.replace('\\', '\\\\'), 'g'), '/');
            }

            command.info.category = category + ` \`\`\`\n \`\`\` `;

            if (this._categories.indexOf(category) === -1)
                this._categories.push(category);
        }

        if (typeof command.init === 'function') {
            try {
                command.init(this.bot);
            } catch (err) {
                return this.bot.logger.severe(`Échec de l'initialisation '${name}':`, err);
            }
        }

        this._commands.push(command);
    }

    all(category) {
        return !category ? this._commands : this._commands.filter(c => c.info.category.toLowerCase() === category.toLowerCase());
    }

    categories() {
        return this._categories;
    }

    get(name) {
        return this.findBy('name', name)
            || this._commands.find(command => command.info.aliases instanceof Array && command.info.aliases.indexOf(name) > -1);
    }

    findBy(key, value) {
        return this._commands.find(c => c.info[key] === value);
    }

    handleCommand(msg, input) {
        const prefix = this.bot.config.prefix;
        if (!input.startsWith(prefix)) return;

        let split = input.substr(prefix.length).trim().split(' ');
        let base = split[0].toLowerCase();
        let args = split.slice(1);

        // Try to find a built in command first
        let command = this.get(base);

        if (command) {
            return this.execute(msg, command, args);
        } else {
            return this._handleShortcuts(msg, base, args);
        }

        // Temporarily disabled
    }

    _handleShortcuts(msg, name, shortcutArgs) {
        // If that fails, look for a shortcut
        const shortcut = this.bot.storage('shortcuts').get(name);

        if (!shortcut) {
            // If no shortcuts could be found either, try finding the closest command
            const maybe = didYouMean(name, this.all().map(c => c.info.name), {
                threshold: 5,
                thresholdType: 'edit-distance'
            });

            if (maybe) {
                return msg.edit(`:question: Vouliez-vous dire \`${this.bot.config.prefix}${maybe}\`?`).then(m => m.delete(5000));
            } else {
                return msg.edit(`:no_entry_sign: Aucune commande similaire à \`${this.bot.config.prefix}${name}\``)
                    .then(m => m.delete(5000));
            }
        }

        const commands = shortcut.command.split(';;');

        return Promise.all(
            commands.map(c => c.trim()).filter(c => c.length > 0).map(commandString => {
                const base = commandString.split(' ')[0].toLowerCase();
                const args = commandString.split(' ').splice(1).concat(shortcutArgs);

                const command = this.get(base);

                if (command) {
                    return this.execute(msg, command, args);
                } else {
                    return msg.edit(`:no_entry_sign: Le raccourci \`${shortcut.name}\` est mal configuré!`)
                        .then(m => m.delete(2000));
                }
            })
        );
    }

    async execute(msg, command, args) {
        msg.error = ((message, delay) => {
            if (message.message === 'Pas trouvé') {
                // Kinda sick of these :\
                return;
            }

            let displayMessage = message.message || message;

            this.bot.logger.severe(message);

            const discordOutput = `:x: ${displayMessage || 'Quelque chose a échoué!'}`;

            msg.edit(discordOutput)
                .then(m => m.delete(delay || 2000))
                .catch(() => {
                    msg.channel.send(discordOutput)
                        .then(m => m.delete(delay || 2000))
                        .catch(() => { /* We can't even show the error, so what now? */ });
                });
        }).bind(msg);

        try {
            return await command.run(this.bot, msg, args);
        } catch (err) {
            msg.error(err);
            return null;
        }
    }
}

module.exports = CommandManager;
