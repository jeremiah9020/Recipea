const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path');
const apiRoute = path.resolve(process.cwd(), 'server/api');

// Will use every file in the api folder as a router, and the route will be the name of the file
fs.readdirSync(apiRoute).forEach((file) => {
    let name = file.substring(0,file.length - 3)
    let importedRouter = require("../api/" + name)
    router.use('/' + name,importedRouter);
})  

module.exports = router;