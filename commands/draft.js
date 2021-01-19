const { DiscordAPIError } = require("discord.js")

module.exports = {
    name: 'draft',
    description: "civ 6 drafting tool",
    execute(message, args, Leaders, Maps, pickedLeaders, aux,
        numberOfPlayers, bannedLeaders, Discord) {
        
        if(bannedLeaders[0] != "again" && numberOfPlayers != "reset"){
            
        const officialBannedLeaders  = [];
        

            for(var i in bannedLeaders) {
                for(var j in Leaders) {
                    if(Leaders[j].Name.toLowerCase() == bannedLeaders[i].toLowerCase()){ 
                        Leaders[j].Pick = true;
                        officialBannedLeaders.push(Leaders[j]);
                    }
                }
            }

            var banDescriptionTool = "Líderes banidos: ";
            for(var h in officialBannedLeaders) {
                banDescriptionTool = banDescriptionTool + officialBannedLeaders[h].Emoji + " " + officialBannedLeaders[h].Name + ", "; 
            }

            aux.push(Math.floor((50 - officialBannedLeaders.length)/numberOfPlayers) - 1);
            

            for(var a in pickedLeaders) {
                var ans = 0;
                if(a + 1 <= numberOfPlayers){                
                    while(ans < aux[0]){
                        var rnumb = Math.floor((Math.random() * 50) + 1);

                        if(Leaders[rnumb - 1].Pick == false) {
                            Leaders[rnumb - 1].Pick = true;
                            pickedLeaders[a].Líderes.push(Leaders[rnumb - 1].Emoji + " " + Leaders[rnumb - 1].Name + " | " + Leaders[rnumb - 1].Civilizacao)
                            ans = ans + 1;
                        }
                    }
                }
                if(a + 1 > numberOfPlayers) {
                    pickedLeaders[a].Líderes.push("Não participará");
                }

            }

            rnumb = Math.floor((Math.random() * 4) + 1);
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#8A2BE2')
            .setTitle('Draft')
            .setDescription(banDescriptionTool+ "\n" + "Mapa: " + Maps[rnumb - 1])
            .addFields(
                {name: 'Lauro:', value: pickedLeaders[0].Líderes},
                {name: 'Luis:', value: pickedLeaders[1].Líderes},
                {name: 'Ed:', value: pickedLeaders[2].Líderes},
                {name: 'Jogador 4:', value: pickedLeaders[3].Líderes},
                {name: 'Jogador 5:', value: pickedLeaders[4].Líderes},
                {name: 'Jogador 6:', value: pickedLeaders[5].Líderes},
                {name: 'Jogador 7:', value: pickedLeaders[6].Líderes},
                {name: 'Jogador 8:', value: pickedLeaders[7].Líderes},
            );

            message.channel.send(newEmbed);
        }
        else if(bannedLeaders[0] == "again"){
            for(var v in pickedLeaders[numberOfPlayers - 1].Líderes){
                for(var g in Leaders){
                    if(pickedLeaders[numberOfPlayers - 1].Líderes[v].includes(Leaders[g].Name + " | " + Leaders[g].Civilizacao)){
                        Leaders[g].Pick = false;
                    }
                }
            }
            pickedLeaders[numberOfPlayers - 1].Líderes.length = 0;
            var ans2 = 0;          
                while(ans2 < aux[0]){
                    var rnumb2 = Math.floor((Math.random() * 50) + 1);

                    if(Leaders[rnumb2 - 1].Pick == false) {
                        Leaders[rnumb2 - 1].Pick = true;
                        pickedLeaders[numberOfPlayers - 1].Líderes.push(Leaders[rnumb2 - 1].Emoji + " " + Leaders[rnumb2 - 1].Name + " | " + Leaders[rnumb2 - 1].Civilizacao)
                        ans2 = ans2 + 1;
                    }
                }
            const newnewEmbed = new Discord.MessageEmbed()
            .setColor('#8A2BE2')
            .setTitle("Redraft jogador " + numberOfPlayers)
            .setDescription(" ")
            .addFields(
                {name: 'Jogador ' + numberOfPlayers + ': ', value: pickedLeaders[numberOfPlayers - 1].Líderes}
            )
            
            message.channel.send(newnewEmbed);
            
        }
        else if(numberOfPlayers == "reset"){
            for(var y in Leaders)
                Leaders[y].Pick = false;
            for(var z in pickedLeaders){
                pickedLeaders[z].Líderes.length = 0;
            }

            message.channel.send("Draft resetado!");
        }
    } 

}