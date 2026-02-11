const client = require("..");

require("dotenv").config();
client.on("ready", async () => {
  const guild = client.guilds.cache.get(process.env.SERVER_ID);
  console.log(guild);
  if (guild) {
    return console.log("guild is  here");
  }
  const logChannel = guild.channels.cache.get("1408855106610397244");
  if (logChannel) {
    console.log(logChannel);
  }
  const log = await guild.fetchAuditLogs({
    limit: 1,
  });
  const entry = log.entries.first();
  if (!entry) return;
  logChannel.send(`Action:${entry.action}\nUser : ${entry.executor?.tag}`);
});
