const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  findUserById,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id for Get one, Update(put), delete at specified id
router.route("/:id").get(findUserById);

module.exports = router;
