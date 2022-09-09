const { Thought, User } = require("../models");

const thoughtController = {
  //add a thought about something
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          {
            _id: params.userId,
          },
          {
            $push: { thoughts: _id },
          },
          { new: true }
        );
      })
      .then((dbUserData) => {
        //check if no user with that id
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete a thought
  deleteThought({ params }, res) {
    //first delete from the though model
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        //now that we have pinpointed and removed the thought, must remove from the user
        return User.findOneAndUpdate(
          {
            _id: params.userId,
          },
          {
            // Use $pull to remove from the thought array
            $pull: { thoughts: params.thoughtId },
          },
          { new: true }
        );
      })
      .then((dbUserData) => {
        // if there is no user found with that id
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
