const tool = require('../../tool.js');
const prefix = '!';

exports.run = (bot, message) => {
let args = message.content.split (' ').slice(1);
var argresult = args.join(' '); 

if(message.content.startsWith(`!suppr`)) {
  message.delete().catch(O_o=>{});
    //if (!msg.member.hasPermissions('MANAGE_MESSAGES'))
        //return msg.channel.send('Vous n\'avez pas la permissions de supprimer les messages ');
    let args = message.content.split(/\s+/);
    let amount;
    if(args.length > 1){
        amount = parseInt(args[1]);
    }

    if(amount < 1 || amount > 500)
        return message.channel.send(`Donner moi un montant de message a supprimer entre 1 et 500`);


    let options = tool.parseOptions(message.content);

    let botOption = options.long.includes('bots');
    let userOption = options.long.includes('user');
    let filterOption = options.long.includes('filter');
    let silentOption = options.short.includes('s') || options.long.includes('silent');
    let pinOption = options.short.includes('p') || options.long.includes('pinned');

    let name;
    let nickname;
    let stringToFilter;
    if (amount) {
        try {
            if (userOption) {
                name = tool.parseOptionArg('user', message.content);// !prune 10 --user
                if (!name)
                    throw 'args';
            }

            if (filterOption) {
                stringToFilter = tool.parseOptionArg('filter', message.content);
                if (!stringToFilter)
                    throw 'args';
            }
            processAmount(amount, 0);
        } catch (err) {
            if (err.msg == 'err')
                message.channel.send(`Desoler, je ne peut pas supprimer vos message. `);
            else //err.message == 'args'
                message.channel.send(`Syntax invalide. Faite ${tool.wrap('!aide suppr')}.`)
        }
    }
    function processAmount(amount, prunedAmount) {
        let fetchAmount;
        if (amount > 100)
            fetchAmount = 100;
        else if (amount > 1)
            fetchAmount = amount;
        else
            fetchAmount = 2; 

        message.channel.fetchMessages({
            limit: fetchAmount,
            before: message.id
        }).then(messages => {
            if (amount == 1) 
                messages.delete(messages.lastKey());
            amount -= 100;

            if (options.long.length > 0 || options.short.length > 0) {
                messages = messages.filter(msg => {
                    if (msg.member.nickname) {
                        nickname = msg.member.nickname.toLowerCase();
                    }

                    let botPass = botOption ? msg.author.bot : true;
                    let userPass = userOption ? msg.author.username.toLowerCase() ==
                        name || nickname == name : true;
                    let filterPass = filterOption ? msg.content.toLowerCase()
                        .indexOf(stringToFilter) >= 0 : true;
                    let pinnedPass = pinOption ? !msg.pinned : true;

                    return botPass && userPass && filterPass &&
                        pinnedPass;
                  
                });
            }

            if (messages.size >= 2) {
                message.channel.bulkDelete(messages, true).then(deleted => {
                    nextCall(deleted.size);
                }).catch(() => {
                    //all messages that were to be bulk deleted are older than 2 weeks
                    nextCall(0);
                });
            } else if (messages.size == 1) {
                messages.first().delete().then(deleted => {
                    nextCall(1);
                });
            } else {
                nextCall(0);
            }
        }).catch(err => {
            throw 'err';
        });

        function nextCall(deletedSize) {
            prunedAmount += deletedSize;
            if (amount > 0) {
                setTimeout(() => {
                    processAmount(amount, prunedAmount);
                }, 1000);
            } else { 
                if (silentOption) {
                    message.delete();
                } else {
                    message.channel.send(`  ${tool.wrap(prunedAmount)} messages supprimer.`);
                  
                }
            }
        }
    }

}
  
}

exports.info = {
    name: 'suppr',
    usage: 'suppr <nombre>',
    description: 'supprime un nombre de message',
    
};
