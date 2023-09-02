const user = require("../models/user.model");
const Inventory = require("../models/inventory.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

module.exports.createNewuser = (req, res) => {
    user.create(req.body)
        .then((newCreateduser) => {
            return Inventory.create({ user_id: newCreateduser._id })
        })
        .then((newInventory) => {
            return user.findOneAndUpdate({_id: newInventory.user_id}, { inventory_id: newInventory._id })
        })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => res.status(500).json({ message: "no hemos podido crear la user", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
    user.findOne({ _id:  res.locals.user})
        .populate('list_ids', '_id title')
        .then((oneSingleUser) => res.json({ user: oneSingleUser }))
        .catch((err) =>
            res.json({ message: "no hemos podido encontrar la user", error: err }));
};

module.exports.updateExistingUser = (req, res) => {
    console.log("entro a updateuser")
    // if (res.locals.user===req.params.id){
    user.findOneAndUpdate({ _id: res.locals.user }, req.body, { new: true })
      .then((updatedUser) => res.json({ user: updatedUser }))
      .catch((err) =>res.json({ message: "no hemos podido ectualizar la user", error: err }));
    // }
  };
  
module.exports.logout = (_, res) => {
    try {
        return res.clearCookie("usertoken").json({msg:"token eliminado"})
    } catch (err){
        return res.status(403).json({msg:"usuario sin token", err})
    }
  }


module.exports.login = (req, res) => {
  console.log(req.body)
  const {email,password} = req.body
  user.findOne({ email })
      .then(user => {
          if (!user) {
              res.json({ msg: "No encontró usuario" });
          } else {
              bcrypt
                  .compare(password, user.password)
                  .then(passwordIsValid => {
                      if (passwordIsValid) {
                          console.log("Password Válido")
                          const secretKey = "cazuela";
                          const payload = {
                              _id: user._id
                          };
                          const myJWT = jwt.sign(payload, secretKey);
                          res.cookie("usertoken", myJWT, secretKey, { httpOnly: true }).json({id:payload, msg: "userToken creado" });
                          console.log("hola este es myJWT" ,myJWT)
                      } else {
                          console.log("Usuario inválido")
                          res.json({ msg: "password incorrecta" });
                      }
                  })
                  .catch(err => {
                      console.log("error invalido")
                      res.json({ msg: "invalid login attempt" })
                  });
          }
      })
      .catch(err => res.json(err));
};

