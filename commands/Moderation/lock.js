const got = require('got');
const cheerio = require('cheerio');
const ms = require('ms');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît indiquez un temp en [ secondes ] ex: < 10s >.';
    }

    msg.delete().catch(O_o=>{});
      if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.sendMessage("Vous n'avez pas la permission **LOCK** !!");
      if (!bot.lockit) bot.lockit = [];
      let time = args.join(' ');
      let validUnlocks = ['release', 'unlock'];
      if (!time) return msg.reply('Vous devez définir une durée pour le verrouillage; en heures, minutes ou secondes');
    
      if (validUnlocks.includes(time)) {
        msg.channel.overwritePermissions(msg.guild.id, {
          SEND_MESSAGES: null
        }).then(() => {
          msg.channel.sendMessage('Verrouillage terminé');  '\u2713' + ' Bot chargé'
          clearTimeout(bot.lockit[msg.channel.id]);
          delete bot.lockit[msg.channel.id];
        }).catch(error => {
          console.log(error);
        });
      } else {
        msg.channel.overwritePermissions(msg.guild.id, {
          SEND_MESSAGES: false
        }).then(() => {
          msg.channel.sendMessage(`Canal verrouillé pour ${ms(ms(time), { long:true })}`).then(() => {
    
            bot.lockit[msg.channel] = setTimeout(() => {
              msg.channel.overwritePermissions(msg.guild.id, {
                SEND_MESSAGES: null
              }).then(msg.channel.sendMessage('Verrouillage terminé')).catch(console.error);
              delete bot.lockit[msg.channel.id];    
            }, ms(time));
    
          }).catch(error => {
            console.log(error);
          });
        });
    }
}

exports.info = {
    name: 'lock',
    usage: 'lock <temp en secondes>',
    description: 'lock un channel'
};
