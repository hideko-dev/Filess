const {client} = require("./client");
const {GUILD, CHANNEL} = require("./enviroments");
const crypto = require("crypto");
const {db} = require("./database");
const mime = require('mime-types');

function isSafeSize(req) {
    return req.file.size <= 25 * 1024 * 1024;
}

function formatFileSize(sizes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = sizes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return size.toFixed(2) + ' ' + units[unitIndex];
}

async function sendFileChannel(req, res){
    const file = req.file;
    const body = req.body;
    const guild = await client.guilds.fetch(GUILD).catch(console.error);
    const channel = guild.channels.cache.get(CHANNEL);
    const name = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const extension = name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2);
    const mimeType = mime.lookup(extension);
    const type = mimeType.split('/')[0];
    if (channel && file) {
        channel.send({
            files: [{
                attachment: file.buffer,
                name: name
            }]
        }).then(async (message) =>{
            const attachment = message.attachments.first();
            const original = new URL(attachment.url)
            const url = original.origin + original.pathname
            const id = crypto.randomBytes(4).toString('hex');
            const size = formatFileSize(file.size);
            const returnData = {
                id,
                name,
                url,
                size,
                extension,
                type
            }
            if(attachment){
                await db.from('contents').insert(returnData)
                res.status(200).json(returnData);
            }
        })
    }
}

async function searchFileFromID(req, res, id){
    const { data  } = await db.from('contents')
        .select('*')
        .eq('id', id)
    res.json(data[0])
}

module.exports = {
    isSafeSize,
    sendFileChannel,
    searchFileFromID
}