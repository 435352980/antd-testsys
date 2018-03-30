import mongoose from 'mongoose';

let whSchema = mongoose.Schema({
	pname: String,
	pno: String,
	name: String,
	no: String,
	cat: Number,
	manager: String,
	managerno: Number,
	phone: String,
	address: String
});

export default mongoose.model('Wh', whSchema, 'wh');
