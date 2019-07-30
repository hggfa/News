'use strict';

const path = require('path');
const fse = require('fs-extra');
const Discord = require('discord.js');
const stripIndents = require('common-tags').stripIndents;
const chalk = require('chalk');
const Managers = require('./managers');

const bot = global.bot = exports.client = new Discord.Client();

bot.managers = {};

const logger = bot.logger = new Managers.Logger(bot);
logger.inject();

bot.managers.dynamicImports = global.dynamicImports = new Managers.DynamicImports(bot, __dirname);
bot.managers.dynamicImports.init();

const configManager = bot.managers.config = new Managers.Config(bot, __dirname, bot.managers.dynamicImports);

bot.config = global.config = configManager.load();

const pluginManager = bot.plugins = bot.managers.pluginManager = new Managers.Plugins(bot);
pluginManager.loadPlugins();

bot.storage = new Managers.Storage();

bot.managers.notifications = new Managers.Notifications(bot);

const commands = bot.commands = new Managers.CommandManager(bot);
const stats = bot.managers.stats = new Managers.Stats(bot);

bot.deleted = new Discord.Collection();

bot.setInterval(() => {
    bot.deleted.clear();
}, 7200000);

const settings = global.settings = {
    dataFolder: path.resolve(__dirname, 'data'),
    configsFolder: path.resolve(__dirname, 'data', 'configs')
};

if (!fse.existsSync(settings.dataFolder)) fse.mkdirSync(settings.dataFolder);
if (!fse.existsSync(settings.configsFolder)) fse.mkdirSync(settings.configsFolder);

Managers.Migrator.migrate(bot, __dirname);

let loaded = false;

bot.utils = global.utils = require('./utils');

bot.on('ready',(msg) => {

    commands.loadCommands();

    (title => {
        process.title = title;
        process.stdout.write(`\u001B] ${title}\u0007`);
    })(chalk.yellow('Bot By LarchitecT '));

    logger.info(stripIndents`Stats:

        ╔═════════════════════════════════╗
        ║-->  Bot Name : ${bot.user.username}
        ╟─────────────────────────────────╢
        ║-->  Prefix   : ${bot.config.prefix} 
        ╟─────────────────────────────────╢
        ║-->  Users    : ${bot.users.filter(user => !user.bot).size}
        ╟─────────────────────────────────╢
        ║-->  Bots     : ${bot.users.filter(user => user.bot).size}
        ╟─────────────────────────────────╢
        ║-->  Channels : ${bot.channels.size}
        ╟─────────────────────────────────╢
        ║-->  Guilds   : ${bot.guilds.size}
        ╚═════════════════════════════════╝`
    );

    stats.set('start-time', process.hrtime());



    logger.info(chalk.green('Prèt !'));

    loaded = true;

});


bot.on('message', msg => {
    stats.increment(`messages-${bot.user.id === msg.author.id ? 'sent' : 'received'}`);
  var mentionned = msg.mentions.users.first();
    if (msg.isMentioned(bot.user)) {
        stats.increment('mentions');

        console.log(`[MENTION] ${msg.author.username} | ${msg.guild ? msg.guild.name : '(DM)'} | #${msg.channel.name || 'N/A'}:\n${msg.cleanContent}`);
    }


   

    if (msg.guild && bot.config.blacklistedServers && bot.config.blacklistedServers.indexOf(msg.guild.id.toString()) > -1) {
        return;
    }
  

    return bot.commands.handleCommand(msg, msg.content);
  
  
});


process.on('exit', () => {
    bot.storage.saveAll();
    loaded && bot.destroy();
  
});

bot.on('error', console.error);
bot.on('warn', console.warn);

bot.on('disconnect', event => {
    if (event.code === 1000) {
        logger.info('Disconnected from Discord cleanly');
    } else if (event.code === 4004) {
        // Force the user to reconfigure if their token is invalid
        logger.severe(`Failed to authenticate with Discord. Please follow the instructions at ${chalk.green('https://github.com/RayzrDev/SharpBot#getting-your-user-token')} and re-enter your token by running ${chalk.green('yarn run config')}.`);
        process.exit(666);
    } else {
        logger.warn(`Disconnected from Discord with code ${event.code}`);
    }
});

process.on('uncaughtException', (err) => {
    let errorMsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}\/`, 'g'), './');
    logger.severe(errorMsg);
});

process.on('unhandledRejection', err => {
    logger.severe('Uncaught Promise error: \n' + err.stack);
});


bot.config && bot.login(bot.config.botToken);
