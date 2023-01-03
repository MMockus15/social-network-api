const { Thought, User } = require("../models");

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((dbThoughts) => res.json(dbThoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "No thought with that id",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //create new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ message: "Thought has been added to user" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //update single thought
  updateSingleThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ mesage: "No user thought that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete single thought
  deleteSingleThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ mesage: "No thought with that ID" })
          : res.json({ message: "Thought has been deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //create reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ mesage: "No thought with that ID" })
          : res.json({ message: "reaction has been added to thought" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "No thought with that id",
            })
          : res.json({ message: "reation has been removed from user" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
