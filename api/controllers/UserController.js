/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: (req, res) => {
		User.create(req.body).exec((err, user) => {
			if (err) {
				return res.json(err.status, {message: err})
			}

			if (!user) {
				return res.json(400, {message: "Can not create user"})
			}

			return res.json(200, {
				user: user,
				token: webtoken.issue({id: user.id, email: user.email})
			})

		})
	}

};
