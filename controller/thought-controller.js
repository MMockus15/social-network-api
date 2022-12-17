const { Thought, User } = require("../models");

module.exports = {
  //get all thoughts

  //create thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ mesage: "No user with that ID" })
          : res.json({ message: "Thought has been added to user" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
