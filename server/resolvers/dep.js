import { Dep } from '../model';
import getSeqCode from '../lib/getSeqCode';

export const depMutation = {
	async addDep(root, dep, context) {
		const seqCode = await getSeqCode('dep');
		const no = 'DEP' + (Array(8).join('0') + seqCode).slice(-8);
		await new Dep({ no, ...dep }).save();
		return 'ok';
	},
	async deleteDep(root, { no }, context) {
		await Dep.remove({ no });
		return 'ok';
	}
};
export const depQuery = {
	async getDep(root, {}, context) {
		return await Dep.find({}, { _id: 0 });
	}
};
