const authMiddleware = require('./auth')
const User = require('../models/User') 

/** 
 * @param {Array} permissions 
 */
module.exports = (permissions) => {
    return function(req, res, next) {
        authMiddleware(req, res, async function() { 
            const id = req.user.id
            try {
                const user = await User.findByPk(id)

                let permitted = false
                if (user.permission) {
                    const permission = JSON.parse(user.permission)
                    for (let checkPerm of permissions) {
                        let permissionPassed = false
                        for (let perm of permission) {
                            let foundPermission = true
                            for (let property in checkPerm) {
                                if (!perm.hasOwnProperty(property) || perm[property] !== checkPerm[property]) {
                                    foundPermission = false
                                    break
                                }
                            } 
                            if (foundPermission) {
                                permissionPassed = true
                                break
                            }
                        }
                        if (!permissionPassed) break
                        permitted = true
                    }
                    if (permitted) {
                         next();
                    }
                }
                
                if (!permitted) {
                    return res.status(403).json({msg:"Insufficient permissions."});
                }
            } catch (e) {
                return res.status(500).json({msg:"Internal error."});
            }
        });
    }
}

