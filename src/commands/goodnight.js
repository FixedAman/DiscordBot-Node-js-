const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("goodnight")
    .setDescription("gives you a goodnight quote!"),
  async execute(interaction) {
    const messages = [
      "🌙 Good night! Sleep well and sweet dreams.",
      "Time to rest 😴. Have a peaceful night!",
      "Good night 🌌 Tomorrow is another chance to shine!",
      "Sleep tight, don’t let the bedbugs bite 🛏️",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.reply(randomMessage);
  },
};
