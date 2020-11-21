require("dotenv").config()
const express = require("express")
const Discord = require("discord.js")
const util = require("util")

const client = new Discord.Client()
const app = express()

app.post("/", async (req, res) => {
  const body = req.body

  const channel = client.channels.cache.get(process.env.CHANNEL_ID)

  const msg = `<@232909121639153665> <@490663251953188865> LOL ARABIA IS STREAMING U BITCHES QJKSJQKJQKj`.concat(
    "\n",
    "```json\n" + util.inspect(body, false, null) + "```"
  )

  channel.send(msg)

  res.send("OK")
})

client.login(process.env.DISCORD_TOKEN)
app.listen(process.env.PORT || 5000, () => {
  console.log(`UwU on ${process.env.PORT || 5000}`)
})
