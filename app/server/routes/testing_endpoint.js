const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// authentication endpoint
router.get("/authorized", auth, (req, res) => {
  res.json({ message: "You are authorized to access me" });
});

module.exports = router