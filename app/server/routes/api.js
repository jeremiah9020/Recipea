const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path');
const apiRoute = path.resolve(process.cwd(), 'server/api');

// Use every api in the api folder
fs.readdirSync(apiRoute).forEach((file) => {
    const name = file.substring(0,file.length - 3)
    let importedRouter = require("../api/" + name)
    router.use(name,importedRouter);
})  

module.exports = router;