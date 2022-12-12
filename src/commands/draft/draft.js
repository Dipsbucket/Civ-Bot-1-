const { SlashCommandBuilder } = require("discord.js");

const draft = (players, bannedLeaders, leadersArray) => {  
  const maps = ["Mar Interior", "Pangeia", "Sete Mares", "Continentes"];
  const unavailableLeaders = [];
  const draftedLeaders = [];
  
  if (players === null) players = 8
  for (leader of bannedLeaders) {
    if (leader !== null)
    unavailableLeaders.push(leader);
  }
  
  const map = maps[Math.floor(Math.random() * maps.length)];
  const leadersSize = Math.floor(leadersArray.length / players);

  for (let i = 0; i < players; i++) {
    draftedLeaders.push([]);
    for (let j = 0; j < leadersSize; j++) {
      const leaderIndex = Math.floor(Math.random() * maps.length);
      draftedLeaders[i].push(leadersArray[leaderIndex]);
      console.log(draftedLeaders);
      leadersArray.splice(leaderIndex, 1);
    }
  }

  return {
    map,
    draftedLeaders,
  };
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("draft")
    .setDescription("Drafts a Civ VI game")
    .addIntegerOption((option) =>
      option
        .setName("players")
        .setDescription("Number of players")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("ban-1")
        .setDescription("1st leader to ban")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("ban-2")
        .setDescription("2nd leader to ban")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("ban-3")
        .setDescription("3rd leader to ban")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    let leaders = require("../../data/leaders.json");

    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const players = interaction.options.getInteger("players");
    const ban1 = interaction.options.getInteger("ban-1");
    const ban2 = interaction.options.getInteger("ban-2");
    const ban3 = interaction.options.getInteger("ban-3");

    console.log(draft(players, [ban1, ban2, ban3], leaders));

    newMessage = "aa";

    await interaction.editReply({
      content: newMessage,
    });
  },
};
