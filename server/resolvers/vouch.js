import moment from 'moment';
import { Vouch, VouchItem } from '../model';
import getSeqCode from '../lib/getSeqCode';
import { jsonField, toJsDate } from '../lib/util';

export const createVouch = async (root, { maker }, context) => {
	const seqCode = await getSeqCode('vouch', true);
	//console.log('单号增量值:', (Array(4).join('0') + seqCode).slice(-4));
	const code = moment().format('YYYYMMDD') + (Array(4).join('0') + seqCode).slice(-4);
	await Vouch({ code, maker, crtdate: new Date(moment().format('YYYY-MM-DD')), state: 0 }).save();
	console.log(`创建单据:${code}`);
	return code;
};

export const getVouchCodes = async (
	root,
	{ code, from, to, state, maker, odep, idep, owh, iwh },
	context
) => {
	let result = await Vouch.find(
		{
			...jsonField('code', code),
			...jsonField('crtdate', {
				...jsonField('$gte', toJsDate(from)),
				...jsonField('$lte', toJsDate(to))
			}),
			...jsonField('state', state),
			...jsonField('maker', maker),
			...jsonField('odep', odep),
			...jsonField('idep', idep),
			...jsonField('owh', owh),
			...jsonField('iwh', iwh)
		},
		{ code: 1, _id: 0 }
	).sort({ crtdate: -1 });
	//console.log(result.map(item => item.code));
	return result.map(item => item.code);
};

export const getVouchInfo = async (root, { code }, context) => {
	return {
		vouchHeader: await Vouch.findOne({ code }).sort({ crtdate: -1, code: -1 }),
		vouchItems: await VouchItem.find({ code }).sort({ id: -1 })
	};
};

export const deleteVouch = async (root, { code }, context) => {
	if (!code) {
		return '单据不存在!';
	}
	await Vouch.remove({ code });
	await VouchItem.remove({ code });
	return 'ok';
};

export const saveVouch = async (root, vouchHeader, context) => {
	const { code } = vouchHeader;
	if (!code) {
		return '单据不存在!';
	}
	await Vouch.update({ code }, { $set: { ...vouchHeader, state: 1 } });
	return 'ok';
};

export const editVouch = async (root, { code }, context) => {
	if (!code) {
		return '单据不存在!';
	}
	await Vouch.update({ code }, { $set: { state: 0 } });
	return 'ok';
};

export const addVouchItem = async (root, { code, cat, model, color, qty, price }, context) => {
	if (!code) {
		return '单据不存在!';
	}
	const sameItem = await VouchItem.findOne({ code, cat, model, color, price });
	if (sameItem) {
		await VouchItem.update({ code, cat, model, color, price }, { $set: { qty: sameItem.qty + qty } });
		return 'ok';
	}
	const id = await getSeqCode('vouchItem');
	await VouchItem({ id, code, cat, model, color, qty, price }).save();
	return 'ok';
};

export const deleteVouchItem = async (root, { id }, context) => {
	if (!id) {
		return '明细不存在!';
	}
	await VouchItem.remove({ id });
	return 'ok';
};

export const updateVouchItem = async (root, { id, cat, model, color, qty, price }, context) => {
	if (!id) {
		return '明细不存在!';
	}
	await VouchItem.update({ id }, { $set: { id, cat, model, color, qty, price } });
	return 'ok';
};

export const getVouchItems = async (root, { code }, context) => {
	if (!code) {
		return null;
	}
	return await VouchItem.find({ code }, { _id: 0 });
};
