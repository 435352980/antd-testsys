import mongoose from 'mongoose';

let vouchItemSchema = mongoose.Schema({
	id: { type: Number, unique: true },
	code: String,
	cat: String,
	model: String,
	color: String,
	qty: Number,
	price: Number
});

export default mongoose.model('VouchItem', vouchItemSchema, 'vouchitem');
