const Discord = require("discord.js"),
send = require('quick.hook');
const got = require('got');
const cheerio = require('cheerio');

exports.run = async (bot, msg, args) => {
msg.delete().catch(O_o=>{});

  
const sayMessage = args.join(" ");
        
        
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`**${sayMessage}**`)
 
        send(msg.channel, help_embed, {
        name: 'Tatouniké',
        icon: 'https://vignette.wikia.nocookie.net/csydes-test/images/9/94/Tatsumaki_%28Tatsu%29.png/revision/latest?cb=20170401082421'
    })
       
      
}



exports.info = {
    name: '!',
    usage: '! <message>',
    description: 'ecrit dans un embed'
};
