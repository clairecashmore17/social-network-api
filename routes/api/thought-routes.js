const router = require("express").Router();
const {
  addThought,
  deleteThought,
} = require("../../controllers/thought-controller");

//routes for adding thoughts
router.route("/:userId").post(addThought);

//route for removing thoughts
router.route("/:userId/:thoughtId").delete(deleteThought);

module.exports = router;
