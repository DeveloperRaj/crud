const express = require('express');
const router = express.Router();
const userModel = require('../models/UserModel');

/*
	@type			get
	@path			/users/
	@params		null
	@body			null
	@desc 			Gets all users from database
*/
router.get('/', async (req, res) => {
	
	try {

		const users = await userModel.find({});
		res.json({ msg: 'success', users });
	
	} catch(err) {

		console.log(err);
		res.json({ msg: 'err' });

	}

});

/*
	@type			get
	@path			/users/userId
	@params		id
	@body			null
	@desc 			Gets single user specified by id from database
*/
router.get('/:id', async (req, res) => {

	const id = req.params.id;
	
	try {

		const user = await userModel.find({ _id: id });
		res.json({ msg: 'success', user });
	
	} catch(err) {

		console.log(err);
		res.json({ msg: 'err' });

	}

});

/*
	@type			post
	@path			/users/add/
	@params		null
	@body			name, email, phone, gender, profilePic
	@desc			add new user to database
*/
router.post('/add', async (req, res) => {

	const { name, email, phone, gender } = req.body;

	try {

		const newUser = new userModel({ name, email, phone, gender });
		const user = await newUser.save();
		res.json({ msg: 'success', user });
	
	} catch(err) {

		console.log(err);
		res.json({ msg: 'err' });

	}

});

/*
	@type			post
	@path			/users/edit/userId
	@params		id
	@body			newName, newEmail, newPhone, newGender, newProfilePic
	@desc			edit user from database
*/
router.post('/edit/:id', async (req, res) => {
	
	const id = req.params.id;
	const { name, email, phone, gender } = req.body;

	try {

		const user = await userModel.findOne({ _id: id });
		if (user) {
			user.name = name;
			user.email = email;
			user.phone = phone;
			user.gender = gender;
			await user.save();
			res.json({ msg: 'success' })
		}

	} catch(err) {

		console.log(err);
		res.json({ msg: 'err' });

	}

});

/*
	@type			delete
	@path			/users/delete/userId
	@params		id
	@body			null
	@desc			delete user from database
*/
router.delete('/delete/:id', async (req, res) => {
	
	const id = req.params.id;

	try {

		await userModel.deleteOne({ _id: id });
		res.json({ msg: 'success' });
	
	} catch(err) {

		console.log(err);
		res.json({ msg: 'err' });

	}

});

module.exports = router;