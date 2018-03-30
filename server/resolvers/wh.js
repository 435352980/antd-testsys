import { Wh } from '../model';
import getSeqCode from '../lib/getSeqCode';

export const whQuery = {
	async getWh(root, {}, context) {
		return await Wh.find({}, { _id: 0 });
	}
};

export const whMutation = {
	async addWh(root, wh, context) {
		const seqCode = await getSeqCode('wh');
		const no = 'WH' + (Array(8).join('0') + seqCode).slice(-8);
		await new Wh({ no, ...wh }).save();
		return 'ok';
	},
	async deleteWh(root, { no }, context) {
		await Wh.remove({ no });
		return 'ok';
	}
};
