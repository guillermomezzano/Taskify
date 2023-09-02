const InventoryController = require("../controllers/inventory.controller");

module.exports = app => {
  app.get("/api/inventories/", InventoryController.findAllInventories);
  app.get("/api/inventory/:id", InventoryController.findOneSingleInventory);
  app.post("/api/inventory/new", InventoryController.createNewInventory);
  app.put("/api/inventory/update/:id", InventoryController.updateExistingInventory);
  app.delete("/api/inventory/delete/:id", InventoryController.deleteAnExistingInventory);
};
