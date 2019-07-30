const Discord = require("discord.js"),
send = require('quick.hook');

exports.run = function (bot, msg) {
  msg.delete();
    msg.delete().catch(O_o=>{});
  
    if (msg.mentions.users.size < 1) {
        throw '@mention certaines personnes à tirer !';
    }

    let output = msg.mentions.users.map(m => `**${m}** :gun:`).join('\n');
    let args = msg.content.split (' ').slice(1);
    let url = args[1]
    let msgs = args[2]
    
    
  
   var memberavatar = msg.author.avatarURL
          var membername = msg.author.username
             var mentionned = msg.mentions.users.first();
            var getvalueof;
            if(mentionned){
                var getvalueof = mentionned;
            } else {
                var getvalueof = msg.author;
            }
      
            if(getvalueof.presence.status == 'online'){
              var status = "En ligne"; 
            }else {
              var status = "Hors ligne";
            }
  
  
  const embed = new Discord.RichEmbed()
        .setColor(0xE46525)
        .addField(':spy::skin-tone-3: Pseudo', msg.mentions.users.map(m => `**${m}**`).join('\n'))
        .addField(':camera_with_flash: Une photo de vous a été trouvé !!', msgs || 'Vous voilà sous votre plus beau jour')
        .setImage(url || 'https://data.photofunky.net/output/image/f/7/9/1/f7919b/photofunky.gif')
      

  
      send(msg.channel, embed, {
        name: 'TerminaBot',
        icon: 'https://avatarfiles.alphacoders.com/843/84300.png'
    })
  
}

exports.info = {
    name: 'shoot',
    usage: 'shoot <user>',
    description: 'Tire sur son amie !'
};
