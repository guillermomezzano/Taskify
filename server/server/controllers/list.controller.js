const List = require("../models/list.model");
const ListProduct = require("../models/list_product.model");
const User = require("../models/user.model");

const msgs = {
  success: "Ok",
  errors: {
    userNotFound: "User with author_id not found",
    listNotFound: "List id not found"
  }
}

module.exports.findOneSingleList = (req, res) => {
	List.findOne({ _id: req.params.id })
    .populate('product_ids')
		.then(oneSingleList => res.json({ List: oneSingleList }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findAllLists = (req, res) => {
  List.find({ author_id: req.params.user_id })
    .populate('product_ids', '_id product_id quantity isChecked')
    .then((allLists) => {
      res.json({ lists: allLists });
    })
    .catch((err) => { res.status(400).json({ error: err.message }) })
};

module.exports.createNewList = async (req, res) => {
  try {
    const user_id = req.body.author_id;
    const user = await User.exists({ _id: user_id });
    if (user) {
      const list = await List.create(req.body);
      await User.findOneAndUpdate({_id: user_id}, {$addToSet: { list_ids: [list._id] }});
      
      res.json(list);
    } else {
      throw new Error( msgs.errors.userNotFound );
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};

module.exports.updateExistingList = async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id });
    if (list) {
      const updated_list = await List.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (list.product_ids) {
        list.product_ids.forEach(product => {
          ListProduct.deleteOne({_id: product._id})
        });
      }
      
      res.json({ status: msgs.success });

    } else {
      throw new Error( msgs.errors.listNotFound );
    }
    
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};

module.exports.deleteAnExistingList = async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id });
    if (list) {
      await List.deleteOne({ _id: req.params.id });
      await User.findOneAndUpdate({_id: list.author_id}, {$pull: { list_ids: list._id }});
      
      res.json({ status: msgs.success });
    } else {
      throw new Error( msgs.errors.listNotFound );
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};
