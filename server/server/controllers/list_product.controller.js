const ListProduct = require("../models/list_product.model");
const List = require("../models/list.model");
const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");

const msgs = {
  success: "Ok",
  errors: {
    userNotFound: "User with author_id not found",
    listNotFound: "List id not found",
    minQuantity: "Wrong quantity",
    wrongParameters: "Wrong parameters"
  }
}

module.exports.createNewListProduct = (req, res) => {

  let flag = false;
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys.includes('product_name') && bodyKeys.includes('quantity')) {
    flag = true;

  } else {
    res.status(400).json( msgs.errors.wrongParameters )
  }

  if (flag) {
    let compoundData = {
      product_name: req.body.product_name,
      quantity: req.body.quantity
    };
  
    let listProductData = {
      product_id: undefined,
      list_id: req.params.list_id,
      quantity: compoundData.quantity
    };
  
    let productData = {
      name: compoundData.product_name
    };
  
    List.exists({ _id: req.params.list_id })
      .then((listExist) => {
        if (!listExist) {
          throw new Error( msgs.errors.listNotFound );
        }
      })
      .then(() => {
        return Product.findOne({ name: compoundData.product_name })
      })
      .then((product) => {
        if (product) {
          listProductData.product_id = product._id;
          return null
          
        } else {
          return Product.create(productData)
        }
      })
      .then((newProduct) => {
        if (newProduct) {
          listProductData.product_id = newProduct._id;
        }
      })
      .then(() => {
        if (compoundData.quantity < 1) {
          throw new Error( msgs.errors.minQuantity );
  
        } else {
          return ListProduct.create(listProductData);
        }
      })
      .then((newProduct) => {
        List.findOneAndUpdate({ _id: req.params.list_id}, {$addToSet: { product_ids: [newProduct._id] }})
          .catch((err) => { res.json(err) })

        return newProduct
      })
      .then((newProduct) => {
        res.json( {
          status: msgs.success,
          listProduct_id: newProduct._id
        })
      })
      .catch(err => res.status(400).json({ error: err.message }))
  }
};

module.exports.deleteAnExistingListProduct = (req, res) => {
  ListProduct.deleteOne({ _id: req.params.id })
    .then(() => {
      List.findOneAndUpdate({_id: req.params.list_id}, {$pull: { product_ids: req.params.id }})
        .catch((err) => { res.json(err) })
    })
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findAllListProducts = (req, res) => {
  ListProduct.find({list_id: req.params.list_id })
    .populate("product_id", "name")
    .then(allListProducts => res.json({ ListProducts: allListProducts }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleListProduct = (req, res) => {
  ListProduct.findOne({ _id: req.params.id })
    .then(oneSingleListProduct => res.json({ ListProduct: oneSingleListProduct }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingListProduct = (req, res) => {
  ListProduct.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedListProduct => res.json({ ListProduct: updatedListProduct }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.checkListProduct = (req, res) => {
  ListProduct.findOneAndUpdate({_id: req.params.id}, { $set: {isChecked: true} })
    .then((updatedProduct) => {
      const list_id = updatedProduct.list_id;
      // const user_id = List.findOne({  })

      // Inventory.findOneAndUpdate({ user_id })
    })
    .catch((err) => { res.json(err.message) })
};

module.exports.uncheckListProduct = (req, res) => {
  // pending
};
