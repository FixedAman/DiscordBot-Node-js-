const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  MessageFlags,
} = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildExpressions,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();

//** */ load the command folder
const foldersPath = path.join(__dirname, "commands");
//** checking the command folder */
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //** if both functionalities are available then function will execute  */
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property. `
      );
    }
  }
}

client.once(Events.ClientReady, (readyclient) => {
  console.log(`Bot is ready Logged in as  ${readyclient.user.tag} `);
});

client.on("messageCreate", (message) => {
  if (message.content === "!hello") {
    message.reply("Dustu jah !");
  }
});
// setting interaction
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command !",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
  console.log(interaction);
});
// fixing something 
client.login(process.env.BOT_TOKEN);
