/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res) => {
		const email = req.param('email');
		const password = req.param('password');

		if (!email) {
			return res.json(400, {message: 'email is required'})
		}

		User.findOne({email: email}, (err, user) => {
			if (!user) {
				return res.json(403, {message: 'invalid email or password'})
			}

			User.comparePassword(password, user, function (err, valid) {

				if (err || !valid) {
					return res.json(403, {message: 'invalid email or password'});
				}

				return res.json({
					user: user,
					token: webtoken.issue({id: user.id, email: user.email})
				})
			})
		})
	}
};
