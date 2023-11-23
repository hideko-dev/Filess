const express = require('express');
const multer = require('multer');
const { MessageAttachment } = require('discord.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
const { GUILD, CHANNEL } = require('./enviroments');
const { client } = require('./client');
const { db } = require('./database')
const crypto = require('crypto')

router.post('/upload', upload.single('file'), async (req, res) => {
    if (req.file.size > 25 * 1024 * 1024) {
        return res.status(400).send('File size must be less than 25MB');
    } else {
        const guild = await client.guilds.fetch(GUILD).catch(console.error);
        const channel = guild.channels.cache.get(CHANNEL);
        if (channel && req.file) {
            channel.send({
                files: [{
                    attachment: req.file.buffer,
                    name: req.file.originalname
                }]
            }).then(async (message) =>{
                const attachment = message.attachments.first();
                const original = new URL(attachment.url)
                const url = original.origin + original.pathname
                const id = crypto.randomBytes(4).toString('hex');
                if(attachment){
                    await db
                        .from('uploads')
                        .insert({
                            password: req.body.password,
                            filename: req.file.originalname,
                            fileurl: url,
                            id: id
                        })
                    res.status(200).json({
                        original: req.file.originalname,
                        url: url,
                        size: req.file.size,
                        password: req.body.password,
                        id: id
                    });
                }
            })
        }
    }
});

module.exports = router;