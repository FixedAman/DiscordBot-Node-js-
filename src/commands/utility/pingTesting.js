const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("it will reply with pong !"),
  async execute(interaction) {
    await interaction.reply("Pong");
  },
};
