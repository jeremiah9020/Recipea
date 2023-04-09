const jwt = require("jsonwebtoken");
const User = require('../models/User')
async function verify(token) {
  const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
  const user = await decodedToken;
  return user
}

module.exports = async (req, res, next) => {
  try { 
    if (req.headers.authorization) {
      req.user = await verify(req.headers.authorization.split(" ")[1])
    } else {
      req.user = await verify(req.cookies.access_token)
    }    

    const user = await User.findOne({where:{id: req.user.id}})
    if (user) {
      next();
    } else {
      res.cookie('access_token', 'loggedout', { httpOnly: true, sameSite: "strict" })
      res.cookie('refresh_token', 'loggedout', { httpOnly: true, sameSite: "strict" })
      res.status(401).json({ error: new Error("Invalid request!")});
    }
    
  } catch (error) {
    try {
      req.user = await verify(req.cookies.refresh_token)
      const user = await User.findOne({where:{id: req.user.id}})
      if (user) {
        const access_token = jwt.sign(
          {id: req.user.id, username: req.user.username},
          "RANDOM-TOKEN",
          { expiresIn: "5m" }
        );
        const refresh_token = jwt.sign(
          {id: req.user.id, username: req.user.username},
          "RANDOM-TOKEN",
          { expiresIn: "30d" }
        )
        res.cookie('access_token',access_token,{httpOnly:true, expires: new Date(Date.now() + 5*60*1000), sameSite: "strict"})
        res.cookie('refresh_token',refresh_token,{httpOnly:true, expires: new Date(Date.now() + 30*2460*60*1000), sameSite: "strict"})
        next();
      } else {
        res.cookie('access_token', 'loggedout', { httpOnly: true, sameSite: "strict" })
        res.cookie('refresh_token', 'loggedout', { httpOnly: true, sameSite: "strict" })
        res.status(401).json({ error: new Error("Invalid request!")});
      }
    }
    catch (err) {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  }
};