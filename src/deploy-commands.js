const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
require("dotenv").config();

const commands = [];
const commandsFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));
// load every command
for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/)commands ");
    await rest.put(Routes.applicationCommand(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
