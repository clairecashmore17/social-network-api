const router = require("express").Router();
const {
  addThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

//routes for adding thoughts
router.route("/:userId").post(addThought);

//route for removing thoughts
router.route("/:userId/:thoughtId").delete(deleteThought).put(addReaction);

//route for removing reactions
router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
