const Discord = require("discord.js");
const banMessage = "fuck uuuuu u have been banned";

exports.run = (bot, msg, args) => {

		const fs = require("fs");

      
      //msg.channel.send('JWLHJK')
  msg.delete().catch(O_o=>{}); 
 
 const sayMessage = args.join(" ");
        msg.delete().catch(O_o=>{});
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Code js:', ` \`\`\n\`\`\`js\n${sayMessage}\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`js\n${sayMessage}\n\`\`\` `)
        .addBlankField(true)
        .addField('Code cs:', ` \`\`\n\`\`\`cs\n# ${sayMessage}\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`cs\n# ${sayMessage}\n\`\`\` `)
        .addBlankField(true)
        .addField('Code css:', ` \`\`\n\`\`\`css\n${sayMessage}\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`css\n${sayMessage}\n\`\`\` `)
        .addBlankField(true)
        .addField('Code diff:', ` \`\`\n\`\`\`diff\n-${sayMessage}\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`diff\n-${sayMessage}\n\`\`\` `)
        .addBlankField(true)
        .addField('Code ini:', ` \`\`\n\`\`\`ini\n[ ${sayMessage} ]\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`ini\n[ ${sayMessage} ]\n\`\`\` `)
        .addBlankField(true)
        .addField('Code cpp:', ` \`\`\n\`\`\`cpp\n" ${sayMessage} "\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`cpp\n" ${sayMessage} "\n\`\`\` `)
        .addBlankField(true)
        .addField('Code fix:', ` \`\`\n\`\`\`fix\n${sayMessage}\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`fix\n${sayMessage}\n\`\`\` `)
        .addBlankField(true)
        .addField('Code tex:', ` \`\`\n\`\`\`tex\n$ ${sayMessage}\n\`\`\`\n\`\` `)
        .addField('Résultat:', ` \`\`\`tex\n$ ${sayMessage}\n\`\`\` `)
        msg.channel.send(help_embed);
  
	}

exports.info = {
    name: 'cod',
    usage: 'cod <message>',
    description: 'générateur de codbox',
    
};
