/*

	Here I define functions to be used in my routes

*/
// Bring in the user model
const User = require("../models/users");
const config = require("../config/database");
const rounds = process.env.DATABASE || config.rounds;
// Load dependencies
const bcrypt = require("bcryptjs");

const getRegister = (req, res) => { };

const register = (req, res) => {
	if (!req.body.name||!req.body.password||!req.body.email){
		res.status(400);
	 res.json({
			status:false,
			message:"incomplete User Data"
		})
	}else{
		const { name, email, password } = req.body;
		var passwordhash
		// Check if the mail is taken already, we want unique mails only
		User.findOne({ email },function (err, user) {
			if (err) throw err;
			if (!user) {
				// Password validation
				if (password.length >= 8) {
					// Salt and hash passoword here
					bcrypt.genSalt(rounds, (err, salt) => {
						bcrypt.hash(password, salt, (err, hash) => {
							passwordhash = hash;
						});
					});
		
					// Commit the authenticated and validated user to memory
					const credentials = [name, email, passwordhash];
					const user = new User(credentials);
					user.save();
					// Start session ish
					req.session.status = true;
		
					res.json({
						status:true,
						message:"user added successfully"
					})
				}else{
					res.status(401)
					res.json({
						status:false,
						message:"invalid password"
					})
				}
			}else{
				res.status(402)
				res.json({
					status:false,
					message:"duplicate user"
				})
			}
		});
	}
	
};

const getLogin = (req, res) => { };

const login = (req, res) => {
	const { email, password } = req.body;
	if(!email||!password){
		res.status(400)
		res.json({
			status:false,
			message:"incomplete login data"
		})
	}
	// Checks if the user exists
	User.findOne({ email }, function (err, user) {
		if (user) {
			// Check for correct password
			bcrypt.compare(password, user.passwordhash, function (err, stats) {
				if (stats) {
					// Start session ish
					req.session.status = true;
					req.session.email = email;
					res.json({
						status:true,
						message:"user logged in successfully"
					})
				}
			});
	
			// Render page finally
		}else{
			res.status(401)
			res.json({
				status:false,
				message:"incorrect username or password"
			})
		}
	});
	
};

module.exports.login=login;
module.exports.register=register;