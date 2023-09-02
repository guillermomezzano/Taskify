const userController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.post("/api/user/new", userController.createNewuser);
  app.post("/api/login", userController.login);
  app.put("/api/user/update/:id",authenticate,userController.updateExistingUser);
  app.get("/api/user/",authenticate,userController.findOneSingleUser);
  app.get("/api/logout",authenticate,userController.logout);
};
