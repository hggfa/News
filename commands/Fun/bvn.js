const figlet = require('figlet');

exports.run = (bot, msg, args) => {
    // -l -- List all fonts
    // -f <font> -- Set font
    const parsed = bot.utils.parseArgs(args, ['l', 'f:']);

     if (msg.content === '!bvn' ) {
    msg.delete().catch(O_o=>{});
       /*
    msg.guild.createRole({name: 'BOSS', color: 'RED'})
       msg.channel.send(` \`\`\`css\nRôle [ BOSS ] couleur [ RED ] crée !!\n\`\`\``)
    msg.guild.createRole({name: 'GARS-SUR', color: 'BLUE'})
       msg.channel.send(` \`\`\`css\nRôle [ GARS-SUR ] couleur [ BLUE ] crée !!\n\`\`\``)
*/


       
       msg.guild.createChannel("╔═════ஜ۞ஜ═════╗", "voice")
.then(channel => {
    let zincGrab = msg.guild.members.get(msg.author.id);
    if (zincGrab) channel.overwritePermissions(msg.author.id, {CONNECT: true});
    channel.overwritePermissions(bot.user.id, {CONNECT: true});
    channel.overwritePermissions(msg.guild.defaultRole, {CONNECT: false});
    //channel.setTopic(`Stuff here`);
    //channel.send(`Setup info message`);
   msg.channel.send(` \`\`\`css\nChannel [ ╔═════ஜ۞ஜ═════╗ ] type [ VOCAL ] crée !!\n\`\`\``)
});

 msg.guild.createChannel(`► ══   BIENVENUE   ══ ◄`, "voice")
.then(channel => {
    let zincGrab = msg.guild.members.get(msg.author.id);
    if (zincGrab) channel.overwritePermissions(msg.author.id, {CONNECT: true});
    channel.overwritePermissions(bot.user.id, {CONNECT: true});
    channel.overwritePermissions(msg.guild.defaultRole, {CONNECT: false});
    //channel.setTopic(`Stuff here`);
    //channel.send(`Setup info message`);
   msg.channel.send(` \`\`\`css\nChannel [ ► ══   BIENVENUE   ══ ◄ ] type [ VOCAL ] crée !!\n\`\`\``)
});
       
       
       
   msg.guild.createChannel("╚═════ஜ۞ஜ═════╝", "voice")
.then(channel => {
    let zincGrab = msg.guild.members.get(msg.author.id);
    if (zincGrab) channel.overwritePermissions(msg.author.id, {CONNECT: true});
    channel.overwritePermissions(bot.user.id, {CONNECT: true});
    channel.overwritePermissions(msg.guild.defaultRole, {CONNECT: false});
    //channel.setTopic(`Stuff here`);
    //channel.send(`Setup info message`);
     msg.channel.send(` \`\`\`css\nChannel [ ╚═════ஜ۞ஜ═════╝ ] type [ VOCAL ] crée !!\n\`\`\``)
});


    

}
};

exports.info = {
    name: 'bvn',
    usage: 'bvn',
    description: 'créer une banniere de guild',

};
