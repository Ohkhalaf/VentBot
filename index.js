const discord = require("discord.js");
var channel;
const client = new discord.Client();

const channelID = "Id for vent channel";

//sign in event
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//when it receives a message
client.on("message", (msg) => {
  //if it's in DMs
  if (msg.guild == null) {
    //send the message content to the channel
    channel.send(msg.content);
  }
});

//signs in as the bot
client.login("Token");
//waits three seconds for sign in to finish and then gets the vent channel to post messages in
setTimeout(function () {
  client.channels.fetch(channelID).then((result) => {
    channel = result;
    console.log(channel);
  });
}, 3000);
