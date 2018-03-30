import mongoose from 'mongoose';

let DepSchema = mongoose.Schema({
	name: String,
	no: String,
	cat: Number,
	manager: String,
	managerno: Number,
	phone: String,
	address: String
});

export default mongoose.model('Dep', DepSchema, 'dep');
