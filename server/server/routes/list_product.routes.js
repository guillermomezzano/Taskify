const ListProductController = require("../controllers/list_product.controller");

module.exports = app => {
  app.get("/api/list/:list_id/product/all", ListProductController.findAllListProducts);
  app.get("/api/list/:list_id/product/:id", ListProductController.findOneSingleListProduct);
  app.post("/api/list/:list_id/product/new", ListProductController.createNewListProduct);
  app.put("/api/list/:list_id/product/update/:id", ListProductController.updateExistingListProduct);
  app.delete("/api/list/:list_id/product/delete/:id", ListProductController.deleteAnExistingListProduct);

  // Routes for check and un-check individual list products
  app.put("/api/list_product/:id/check", ListProductController.checkListProduct);
  app.put("/api/list_product/:id/uncheck", ListProductController.uncheckListProduct);
};
