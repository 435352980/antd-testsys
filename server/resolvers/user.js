import { User } from '../model';

export const userQuery = {
	async getUser(root, {}, context) {
		return await User.find({}, { _id: 0 });
	}
};

export const userMutation = {
	async addUser(root, user, context) {
		const no = await getSeqCode('user');
		await new User({ no, ...user }).save();
		return 'ok';
	},
	async deleteUser(root, { no }, context) {
		await User.remove({ no });
		return 'ok';
	}
};
