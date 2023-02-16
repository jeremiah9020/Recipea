const express = require('express')
const router = express.Router()
const auth = require('../auth_middleware')


// authentication endpoint
router.get("/authorized", auth, (req, res) => {
  res.json({ message: "You are authorized to access me" });
});

module.exports = router