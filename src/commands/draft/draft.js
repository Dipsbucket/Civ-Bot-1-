const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const draft = (players, bannedLeaders, leadersArray) => {
  const maps = ["Mar Interior", "Pangeia", "Sete Mares", "Continentes"];
  const unavailableLeaders = [];
  const draftedLeaders = [];

  if (players === null) players = 8;

  const map = maps[Math.floor(Math.random() * maps.length)];
  const leadersSize = Math.floor(leadersArray.length / players);

  for (let i = 0; i < players; i++) {
    draftedLeaders.push([]);
    for (let j = 0; j < leadersSize; j++) {
      const leaderIndex = Math.floor(Math.random() * maps.length);
      draftedLeaders[i].push(leadersArray[leaderIndex]);
      leadersArray.splice(leaderIndex, 1);
    }
  }

  return {
    map,
    draftedLeaders,
  };
};

const draftDisplay = (map, bannedLeaders, draftArray) => {
  let banString = "Líders banidos: ";
  if (bannedLeaders.length != 0) {
    for (i in bannedLeaders) {
      banString += bannedLeaders[i];
    }
    if (i != bannedLeaders.length - 1) banString += ", ";
    else banString += ".";
  } else {
    banString += "nenhum.";
  }

  let draftStringArray = [];
  for (i in draftArray) {
    draftStringArray.push([""]);
    for (j in draftArray[i]) {
      draftStringArray[i] +=
        draftArray[i][j].Emoji +
        " " +
        draftArray[i][j].Name +
        " | " +
        draftArray[i][j].Civilizacao;
      if (j != draftArray[i].length - 1) draftStringArray[i] += "\n";
    }
  }

  const draftEmbed = new EmbedBuilder()
    .setColor("#012b06")
    .setTitle("Game Draft")
    .setDescription(banString + "\n" + "Mapa: " + map)
    .addFields({ name: "Jogador 1:", value: draftStringArray[0] || "Jogador fora do jogo"})
    .addFields({ name: "Jogador 2:", value: draftStringArray[1] || "Jogador fora do jogo"})
    .addFields({ name: "Jogador 3:", value: draftStringArray[2] || "Jogador fora do jogo"})
    .addFields({ name: "Jogador 4:", value: draftStringArray[3] || "Jogador fora do jogo"})
    .addFields({ name: "Jogador 5:", value: draftStringArray[4] || "Jogador fora do jogo"})
    .addFields({ name: "Jogador 6:", value: draftStringArray[5] || "Jogador fora do jogo"})
    .addFields({ name: "Jogador 7:", value: draftStringArray[6] || "Jogador fora do jogo"})
    .addFields({ name: "Jogador 8:", value: draftStringArray[7] || "Jogador fora do jogo" })
    .addFields({ name: "Jogador 9:", value: draftStringArray[8] || "Jogador fora do jogo" })
    .addFields({ name: "Jogador 10:", value: draftStringArray[9] || "Jogador fora do jogo" });

  return draftEmbed;
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
    const ban1 = interaction.options.getString("ban-1");
    const ban2 = interaction.options.getString("ban-2");
    const ban3 = interaction.options.getString("ban-3");

    const bans = [ban1, ban2, ban3];
    const bannedLeaders = (unavailableLeaders = []);
    for (const leader of bans) {
      if (leader !== null) bannedLeaders.push(leader);
    }

    const draftResult = draft(players, bans, leaders);
    const embed = draftDisplay(
      draftResult.map,
      bannedLeaders,
      draftResult.draftedLeaders
    );

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
