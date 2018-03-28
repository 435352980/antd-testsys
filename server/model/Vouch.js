import mongoose from 'mongoose';
import moment from 'moment';

const dateFormat = date => (date ? moment(date).format('YYYY-MM-DD') : null);

let VouchSchema = new mongoose.Schema({
	code: { type: String, unique: true },
	crtdate: { type: Date, get: dateFormat },
	state: Number,
	maker: String,
	odep: String,
	idep: String,
	owh: String,
	iwh: String,
	remark: String
});

export default mongoose.model('Vouch', VouchSchema, 'vouch');
