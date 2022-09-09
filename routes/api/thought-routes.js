const router = require("express").Router();
const {
  addThought,
  deleteThought,
  addReaction,
  removeReaction,
  findAllThoughts,
  findOneThought,
  updateThought,
} = require("../../controllers/thought-controller");

//route to find all thoughts
router.route("/").get(findAllThoughts);
//route to find all thoughts
router.route("/:id").get(findOneThought).put(updateThought);
//routes for adding thoughts
router.route("/:userId").post(addThought);

//route for removing thoughts
router.route("/:userId/:thoughtId").delete(deleteThought).put(addReaction);

//route for removing reactions
router.route("/:userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
