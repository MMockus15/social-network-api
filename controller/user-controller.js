const User = require('../models/user');

module.exports = {
	//get all users
	getUsers(req, res) {
		User.find()
		.select('-__v')
		.then((users) => res.json(users))
		.catch((err) => res.status(500).json(err));
},

//get single user by id
getSingleUser(req, res) {
	User.findOne({ _id: req.params.userId })
	.select('-__v')
	.populate('friends')
	.populate('thoughts')
	.then((user) => 
	!user
	? res.status(404).json({ mesage: "No user with that ID" })
	: res.json(user)
	)
	.catch((err) => res.status(500).json(err));
},

//create new user
creteUser(req, res) {
	User.create(req.body)
	.then((dbUserData) => res.json(dUserData))
	.catch((err) => res.status(500).json(err));
},
};