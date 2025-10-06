const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies with a friendly greeting"),
  async execute(interaction) {
    const greetings = [
      `Hello commander ${interaction.user.username} 😁!`,
      `Hey ${interaction.user.username} , how it's going 😎?`,
      `Yo ${interaction.user.username} 👊 `,
      `Welcome Back ${interaction.user.username}! 💦`,
    ];
    const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
    await interaction.reply(randomReply);
  },
};
