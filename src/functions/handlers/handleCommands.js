const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolders = fs.readdirSync("./src/commands");
    for (const folder of commandsFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.data) {
          client.commands.set(command.data.name, command);
          client.commandArray.push(command.data.toJSON());
        } else {
          console.log(
            `[WARNING] Command ../../commands/${folder}/${file} is not defined.\n`
          );
        }
      }
    }

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    try {
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: client.commandArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
