const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("goodmorning")
    .setDescription("gives you some good morning quote!"),
  async execute(interaction) {
    const messages = [
      "🌞 Good morning! Let today be amazing!",
      "Rise and shine! ✨ Great things are waiting for you today.",
      "Good morning! 🚀 Stay positive and keep grinding!",
      "☕ Good morning! Don’t forget to smile today 😁",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.reply(randomMessage);
  },
};
