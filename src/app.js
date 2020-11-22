require("dotenv").config()
const express = require("express")
const Discord = require("discord.js")

// utils
const util = require("util")
const getDiscord = require("./utils/getDiscord")

// init stuff
const client = new Discord.Client({ fetchAllMembers: true })
const app = express()

// middlewares
app.use(express.json())

app.post("/", async (req, res) => {
  const body = req.body

  // Getting the Discord Username from The message
  const username_full = getDiscord(body.message)[0]

  // we get the username and discriminator
  const [username, discriminator] = username_full.split("#")
  // console.log(username, discriminator)

  // Guils
  let channels = client.guilds.cache.get("779729051891138590")

  // channels.members.cache.forEach((member) => console.log(member.user))
  // find the user
  const user = channels.members.cache.find((member) => {
    return (
      member.user.username == username &&
      member.user.discriminator == discriminator
    )
  })

  // const userId = user.id

  // we get the role
  const role = channels.roles.cache.find((role) => {
    return role.name == "EVA-01"
  })

  // now we set the role to the user
  // console.log(role)
  user.roles.add(role.id.toString())

  // we send a msg after all
  client.channels.cache
    .get("779813860314972180")
    // .send(`${username_full} `)
    .send(`${username_full} is now ${role.name} role`)

  res.send("OK")
})

client.login(process.env.DISCORD_TOKEN)
app.listen(process.env.PORT || 5000, () => {
  console.log(`UwU on ${process.env.PORT || 5000}`)
})
