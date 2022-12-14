const connection = require('./config/connection');
const { User, Thought } = require('./models');
const userSeeds = require('.user-data');
const thoughtSeeds = require('./thought-data');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('connected');
	//remove existing data
	await User.deleteMany({});
	await Thought.deleteMany({});

	await User.collection.insertMany(userSeeds);
	console.log("User seeds working!");

	await Thought.collection.insertMany(thoughtSeeds);
	console.log("Thought seeds working!");
	
	process.exit;
});