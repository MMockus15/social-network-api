const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateSingleThought,
  deleteSingleThought,
  createReaction,
  deleteReaction,
} = require("../../controller/thought-controller");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:id
router
  .route("/:id")
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteSingleThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  
  // /api/thoughts/:thoughtId/reactions/:reactionId
  router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;
