require('dotenv').config()

const GUILD = process.env.GUILD_ID
const CHANNEL = process.env.CHANNEL_ID
const TOKEN = process.env.BOT_TOKEN

module.exports = {
    GUILD,
    CHANNEL,
    TOKEN
}