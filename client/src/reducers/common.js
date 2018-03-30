import { FETCH_COMMONDATA, FETCH_COMMONDATA_SUCCESS, FETCH_COMMONDATA_FAILED } from '../actions/types';

/**
 * 获取公共信息
 * @param {*} common 
 * @param {*} action 
 */
const commonReducer = (common = { loading: false, dep: [], wh: [], user: [] }, action) => {
	const { type, result } = action;
	switch (type) {
		case FETCH_COMMONDATA:
			return { ...common, loading: true };
		case FETCH_COMMONDATA_SUCCESS:
			return { ...common, loading: false, ...result.data.data };
		case FETCH_COMMONDATA_FAILED:
			return { ...common, loading: false };
		default:
			return common;
	}
	return common;
};

export default commonReducer;
