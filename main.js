const client = require('./connection');
const fs = require('fs');
import { Leaders, pickedLeaders } from './leaders.js'

const prefix = '!';
let aux = [];

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('CivFacilities is online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length);
    const messageArray = args.split(".");
    const command = messageArray[0].toLowerCase();

    if(command === 'draft'){
        const numberOfPlayers = messageArray[1];
        let i = 2;
        let j = 0;
        let bannedLeaders = [];
        while(messageArray[i] != undefined)
        {   
            bannedLeaders[j] = messageArray[i];
            j++;
            i++;
        }
        client.commands.get('draft').execute(message, args, Leaders, Maps, pickedLeaders, aux,
            numberOfPlayers, bannedLeaders, Discord)
    }
});

client.login(TOKEN);