const authService = require('./auth-service');
const logger = require('../../services/logger.service');

async function login(req, res) {
	const { email, password } = req.body;
	try {
		const user = await authService.login(email, password);
		req.session.user = user;
		res.json(user);
	} catch (err) {
		res.status(401).send({ error: err });
	}
}

async function signup(req, res) {
	try {
		const { email, password, fullName, imgUrl, isAdmin } = req.body;
		await authService.signup(email, password, fullName, imgUrl, isAdmin);
		const user = await authService.login(email, password);
		req.session.user = user;
		res.json(user);
	} catch (err) {
		res.status(500).send({ error: 'Could not signup user, please try again later.' });
	}
}

async function logout(req, res) {
	try {
		req.session.destroy();
		res.send({ message: 'Logged out successfully' });
	} catch (err) {
		res.status(500).send({ error: err });
	}
}

module.exports = {
	login,
	signup,
	logout
};
