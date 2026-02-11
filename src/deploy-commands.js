const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const fs = require("node:fs");
const { REST, Routes } = require("discord.js");
const commands = [];

// ** grabbing all the command folders from the commands directory created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

//
for (const folder of commandFolders) {
  //** */ grabbing command files
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  // grab all the slash command
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING]The command at ${filePath} is missing a required "data" or "execute "`
      );
    }
  }
}
// ** preparing for discord
const rest = new REST().setToken(process.env.BOT_TOKEN);

// ** deploying those commands to the discord
(async () => {
  try {
    console.log(
      `started refreshing ${commands.length} application (/) commands`
    );
    console.log(__dirname);

    //** */ The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.SERVER_ID
      ),
      { body: commands }
    );
    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(`this is error : `, error);
  }
})();
