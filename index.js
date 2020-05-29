const config = require("./config.json");
const fs = require("fs");
const discord = require("discord.js");
var channel;
const client = new discord.Client();

var botInfo = {
  Token: "",
  channelID: "",
};

//sign in event
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//when it receives a message
client.on("message", (msg) => {
  //if it's a message from the bot
  if (msg.author.id == client.user.id) {
    return; //just ignore it
  }

  if (
    msg.channel.type == "text" && //if this is in a server
    msg.member.permissions.has("ADMINISTRATOR") && //and the user is an admin
    msg.content.startsWith("!setChannel") //and they use the command
  ) {
    msg.reply("channel has been set!");
    botInfo.channelID = msg.channel.id; //this sets the channelID
    var jsonString = JSON.stringify(botInfo);
    fs.writeFile("./config.json", jsonString, function () {
      console.log("channel Changed");
    });
    //this gets the channel object
    client.channels.fetch(botInfo.channelID).then((result) => {
      channel = result;
      console.log(channel);
    });
    return;
  }

  if (msg.content == "!help") {
    msg.reply(
      "You dm me your message and I repeat it in the pre-decided vent channel, use !help to repeat this message"
    );
    return;
  }

  //if it's in DMs
  if (msg.guild == null) {
    //send the message content to the channel
    channel.send(msg.content);
  }
});

botInfo.Token = config.Token;
botInfo.channelID = config.channelID;

//signs in as the bot
client.login(botInfo.Token);
//waits three seconds for sign in to finish and then gets the vent channel to post messages in
setTimeout(function () {
  client.channels.fetch(botInfo.channelID).then((result) => {
    channel = result;
    console.log(botInfo.channelID);
  });
}, 3000);
