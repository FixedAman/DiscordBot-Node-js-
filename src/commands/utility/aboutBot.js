const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about_me")
    .setDescription("tell you about me!"),
  async execute(interaction) {
    const aboutEmbeds = new EmbedBuilder()
      .setColor(0xff00ff)
      .setTitle("💫 Spirit of RDX - Official Bot")
      .setDescription("Built it with care 💀")
      .addFields(
        {
          name: "🎥 YouTube Channel",
          value:
            "[Click Here](https://youtube.com/@rdxvibe6969?si=rbImeBvEhA9wjx3N)",
        },
        {
          name: "🌐 Official Server",
          value: "[Join Here](https://discord.gg/eYmSnf6M)",
        },
        { name: "⚙️ Framework", value: "Made with Discord.js" },
        {
          name: "🎬 Fun Fact",
          value: "I love video editing and helping communities grow!",
        }
      )
      .setFooter({ text: "Developed by A_man | Spirit of RDX " })
      .setTimestamp();
    await interaction.reply({ embeds: [aboutEmbeds] });
  },
};
