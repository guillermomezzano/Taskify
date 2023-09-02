const ListController = require("../controllers/list.controller");

module.exports = app => {
  app.get("/api/list/:id", ListController.findOneSingleList);
  app.get("/api/user/:user_id/list/all", ListController.findAllLists);
  app.post("/api/list/new", ListController.createNewList);
  app.delete("/api/list/delete/:id", ListController.deleteAnExistingList);
  app.put("/api/list/update/:id", ListController.updateExistingList);
};
