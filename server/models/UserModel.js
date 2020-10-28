const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	gender: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('UserInfo', UserSchema, 'userinfo');