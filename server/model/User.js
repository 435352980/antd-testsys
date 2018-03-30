import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

let userSchema = mongoose.Schema({
	no: Number,
	username: String,
	nickname: String,
	password: String,
	role: String,
	pdep: String,
	pdepno: Number,
	email: String,
	phone: String
});

//加密密码
userSchema.pre('save', async function(next) {
	let user = this;
	if (user.isModified('password') || user.isNew) {
		try {
			let salt = await bcrypt.genSalt(10);
			let hash = await bcrypt.hash(user.password, salt);
			user.password = hash;
			return next();
		} catch (error) {
			return next(error);
		}
	}
	next();
});

export default mongoose.model('User', userSchema, 'user');
