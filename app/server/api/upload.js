const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const fs = require('fs');
const sanitize = require('sanitize-filename');

router.post('/image', (req, res, next) => {
    // console.log(req.body);
    if (req.body.uuid)
    {
        const filename = __dirname + '/../images/' + sanitize(req.body.uuid);
        fs.writeFile(filename, req.body.data, (err) => {
            if (err) console.log(err)
        });
    }
})

router.get('/:id', (req, res, next) => {
    let uuid = `${req.params.id}`;
    console.log(uuid);
    if (uuid)
    {
        const filename = __dirname + '/../images/' + sanitize(uuid);
        const data = fs.readFileSync(filename)
        res.json(data);
    }
    else
    {
        res.send('fail');
    }
})

module.exports = router;