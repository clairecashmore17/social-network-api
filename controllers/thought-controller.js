const { Thought, User } = require("../models");

const thoughtController = {
  //find all thoughts
  findAllThoughts(req, res) {
    Thought.find({})

      .set("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //find one thought
  findOneThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .set("-__v")
      .then((dbThoughtData) => {
        //if there is no thought found with this id
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbThoughtData) => {
        //if there is no thought found at this id
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
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

  //reaction section

  //add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.thoughtId,
      },
      {
        $push: { reactions: body },
      },
      { new: true }
    )
      .then((dbUserData) => {
        // If there is no data found at the id
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  //remove a reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.thoughtId,
      },
      {
        $pull: { reactions: { reactionId: params.reactionId } },
      },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
