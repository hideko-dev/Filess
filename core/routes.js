const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
const {isSafeSize, sendFileChannel, searchFileFromID} = require("./utils");

router.post('/endpoint', upload.single('file'), async (req, res) => {
    if (!isSafeSize(req)) {
        return res.status(400).send('File size must be less than 25MB');
    } else {
        await sendFileChannel(req, res)
    }
});

router.post('/download', upload.single('id'), async (req, res) => {
    const id = req.body.id;
    await searchFileFromID(req, res, id);
});

module.exports = router;