import mongoose from 'mongoose';
import moment from 'moment';

let SeqSchema = mongoose.Schema({
	name: { type: String, unique: true },
	date: String,
	seq: Number
});

const SeqModel = mongoose.model('Seq', SeqSchema, 'seq');

/**
 * 获取自增号
 * @param {*} name 
 * @param {*} clearPerday 
 */
const getSeqCode = async (name, clearPerday = false) => {
	const seqObj = await SeqModel.findOneAndUpdate({ name }, { $inc: { seq: 1 } });

	if (!seqObj) {
		await new SeqModel({ name, seq: 1, date: moment().format('YYYY-MM-DD') }).save();
		return 1;
	}

	return clearPerday
		? seqObj.date === moment().format('YYYY-MM-DD') ? seqObj.seq + 1 : 1
		: seqObj.seq + 1;
};

export default getSeqCode;
