const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path');
const apiRoute = path.resolve(process.cwd(), 'server/api');

// Use every api in the api folder
fs.readdirSync(apiRoute).forEach((file) => {
    let [currRouter,name] = require("../api/" + file.substring(0,file.length - 3))
    router.use(name,currRouter);
    console.log(name)
})  

module.exports = router;