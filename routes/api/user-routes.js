const router = require("express").Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  deleteFriend,
} = require("../../controller/user-controller");

// /api/users
router.route("/").get(getUser).post(createUser);

// /api/users/:id
router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteSingleUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(deleteFriend);

module.exports = router;
