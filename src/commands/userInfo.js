const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("User will get their User Info!")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Tag the user to get that user data")
        .setRequired(true)
    ),
  async execute(interaction) {
    // fetching user data from client
    const user = interaction.options.getUser("target");
    const member = interaction.guild.members.cache.get(user.id);
    console.log(user);
    // creating user Info
    const userInfo = {
      color: 0x0099ff,
      title: `User Info 🔍${user.username}`,
      thumbnail: {
        url: user.displayAvatarURL(),
      },
      fields: [
        {
          name: "Username",
          value: user.tag,
          inline: true,
        },
        {
          name: "User ID",
          value: user.id,
          inline: true,
        },
        {
          name: "Account Created",
          value: user.createdAt.toDateString(),
          inline: true,
        },
        {
          name: "Joined User ",
          value: member.joinedAt.toDateString(),
          inline: true,
        },
      ],
      timestamp: new Date(),
    };
    await interaction.reply({
      embeds: [userInfo],
    });
  },
};
