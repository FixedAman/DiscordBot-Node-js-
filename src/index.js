const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
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

// loading Commands
const commandsFiles = fs
  .readdirSync("./src/commands/utility")
  .filter((file) => file.endsWith(".js"));
for (const file of commandsFiles) {
  const command = require(`./commands/utility/${file}`);
  client.commands.set(command.data.name, command);
}
// load events
const foldersPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(foldersPath)
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(path.join(eventPath, file));
  // event will trigger when it will be called
  client.on(event.name, (...args) => event.execute(...args, client));
  console.log("event occured");
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
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.BOT_TOKEN);
