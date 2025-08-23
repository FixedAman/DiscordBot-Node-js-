const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildExpressions,
  ],
});
client.commands = new Collection();

// loading Commands
const commandsFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}
// load events
const eventPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(path.join(eventPath, file));
}

client.once("ready", () => {
  console.log("Bot is ready ");
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
