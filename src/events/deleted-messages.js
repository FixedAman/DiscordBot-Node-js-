// if admin delete anyones message then this will show
const { EmbedBuilder } = require("discord.js");
const { AuditLogEvent, Events } = require("discord.js");
// where your audit logs
const AUDIT_LOG_CHANNEL_ID = "1408855106610397244";
module.exports = {
  name: Events.GuildAuditLogEntryCreate,
  async execute(auditLog, client) {
    if (auditLog.action !== AuditLogEvent.MessageDelete) return;
    // all events occuring
    const { executorId, targetId, extra, guild } = auditLog;
    const logChannel = guild.channels.cache.get(AUDIT_LOG_CHANNEL_ID);
    if (!logChannel) return;
    try {
      const executor = await client.users.fetch(executorId);
      const target = await client.users.fetch(targetId);
      // ignore if userDeleted own message
      if (executor.id === target.id) return;
      const embed = new EmbedBuilder()
        .setColor(0xff9900)
        .setTitle("🛡️ Moderaator deleted a message")
        .addFields(
          {
            name: "Moderator",
            value: executor.tag,
            inline: true,
          },
          {
            name: "User",
            value: target.tag,
            inline: true,
          },
          {
            name: "Channel",
            value: `<#${extra?.channel?.id}>`,
            inline: true,
          }
        )
        .setTimestamp();
      logChannel.send({ embed: [embed] });
    } catch (error) {
      console.log("Error fetching audit log users ", error);
    }
  },
};
