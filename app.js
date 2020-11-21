const express = require("express")
const Discord = require("discord.js")

const client = new Discord.Client()
const app = express()

app.get("/", async (req, res) => {})

client.login(process.env.DISCORD_TOKEN)
app.listen(process.env.PORT || 5000, () => {
  console.log(`UwU on ${process.env.PORT || 5000}`)
})
