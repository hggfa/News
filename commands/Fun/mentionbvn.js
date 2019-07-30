const Discord = require("discord.js");
exports.run = function (bot, msg) {
    if (msg.mentions.users.size < 1) {
        throw '@mention la personne qui vien d\'arriver';
    }
    let user = msg.mentions.users.first();
    let output = msg.mentions.users.map(m => `**${m}** :gun:`).join('\n');
    let args = msg.content.split (' ').slice(1);
    let url = args[1]
    let img = args[2]
    
    msg.delete();
    msg.delete().catch(O_o=>{});
  
   var memberavatar = msg.author.avatarURL
          var membername = msg.author.username
             var mentionned = msg.mentions.users.first();
            var getvalueof;
            if(mentionned){
                var getvalueof = mentionned;
            } else {
                var getvalueof = msg.author;
            }
      
      
    var embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .addField(`${url || '𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐔𝐄 !!'}`, `${mentionned}`)
      .setThumbnail(`${img||user.displayAvatarURL}`)
    msg.channel.send({embed});
      
  
  

};

exports.info = {
    name: 'n',
    usage: 'n <user>',
    description: 'Mention de bienvenue'
};
