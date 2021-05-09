/* ============================================================================================================================================================== /
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "ping Received");
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://seeds-discord-bot.glitch.me/`);
}, 280000);

*/

/* ============================================================================================================================================================== */

const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");

/* ============================================================================================================================================================== */

const config = require("./config.json");
bot.prefix = config.prefix;
bot.developers = config.developers;
bot.devPerms = config.devPerms;

/* ============================================================================================================================================================== */

function emoji(id) {
  return bot.emojis.get(id).toString();
}
/* ============================================================================================================================================================== */

bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
  });
  console.log(`Loaded ${jsFiles.length} commands.`);
  bot.commandNum = jsFiles.length;
});

/* =======================================================================================================================================    */

bot.errMsg = message => {
  message.channel.send(
    "**Error 404: Please enter command properly. Syntax Error in command**"
  );
};
bot.permMsg = message => {
  message.channel.send("You do not have permission to do this command");
};

/* =======================================================================================================================================    */

String.prototype.capitalize = function(allWords) {
  if (allWords)
    return this.split(/ +/g)
      .map(str => str.charAt(0).toUpperCase() + str.toLowerCase().substring(1))
      .join(" ");
  else return this.toLowerCase().charAt() + this.toLowerCase(0).substring(1);
};

/* ============================================================================================================================================================== */

const guild = bot.guilds.get("722537361480613950");

bot.on("message", message => {
  const prefix = bot.prefix;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    let args = message.content
      .substring(prefix.length)
      .trim()
      .split(/ +/g);
    let cmd = bot.commands.get(args[0].toLowerCase());
    if (cmd) cmd.run(bot, message, args);
  }
});

/* ============================================================================================================================================================== */

bot.on("ready", () => {
  bot.guild = bot.guilds.get("722537361480613950");
  let readyembed = new Discord.RichEmbed()
    .setTitle("Bot Refresh!")
    .setColor(`RANDOM`)
    .setFooter("Bot", bot.user.displayAvatarURL)
    .setTimestamp();
  bot.channels.get("DISCORD_TEXT_CHANNEL_ID")
  const guild = bot.guilds.get("722537361480613950");
  bot.user.setActivity("Working", {
    type: "WATCHING"
  });
  bot.user.setStatus("Online");
});

bot.on("disconnect", function(event) {
  console.log("FAILED_TO_CONNECT");
});

/* ============================================================================================================================================================== */

bot.login(process.env.DISCORD_TOKEN);
console.log("Bot is Online!");

/* ============================================================================================================================================================== */