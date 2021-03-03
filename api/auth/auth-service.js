const bcrypt = require('bcryptjs');
const userService = require('../user/user.service');
const saltRounds = 10;

async function login(email, password) {
	if (!email || !password) throw new Error('Email and Password are required!');
	const user = await userService.getByEmail(email);
	if (!user) return Promise.reject('Invalid email or password');
	const match = await bcrypt.compare(password, user.password);
	if (!match) return Promise.reject('Invalid email or password');
	delete user.password;
	return user;
}

async function signup(email, password, fullName, imgUrl, isAdmin) {
	if (!email || !password || !fullName) return Promise.reject('email, fullName and password are required!');
	const hash = await bcrypt.hash(password, saltRounds);
	return userService.add({ email, password: hash, fullName, imgUrl, isAdmin });
}

module.exports = {
	signup,
	login
};
