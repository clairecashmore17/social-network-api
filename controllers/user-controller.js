const { User } = require("../models");

const userController = {
  //all of our routing functions for a user

  //find all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //find one user
  findUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        //If there is no user found with this _id...
        if (!dbUserData) {
          res.status(404).json({ message: "There is no user with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //post a user(create a user)
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
