const Inventory = require("../models/inventory.model");

module.exports.findAllInventories = (req, res) => {
  Inventory.find()
    .then(allInventories => res.json({ Inventories: allInventories }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleInventory = (req, res) => {
	Inventory.findOne({ _id: req.params.id })
		.then(oneSingleInventory => res.json({ Inventory: oneSingleInventory }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewInventory = (req, res) => {
  Inventory.create(req.body)
    .then(newlyCreatedInventory => res.json({ Inventory: newlyCreatedInventory }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingInventory = (req, res) => {
  Inventory.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedInventory => res.json({ Inventory: updatedInventory }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingInventory = (req, res) => {
  Inventory.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
