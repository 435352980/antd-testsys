import { FETCH_COMMONDATA, FETCH_COMMONDATA_SUCCESS, FETCH_COMMONDATA_FAILED } from './types';
import { API_PORT } from '../config';
import GET_COMMON_DATA from '../graphql/common/getCommonData';

/**
 * 获取基础数据
 * @param {*} params 
 */
export const getCommonData = () => ({
	types: [ FETCH_COMMONDATA, FETCH_COMMONDATA_SUCCESS, FETCH_COMMONDATA_FAILED ],
	promise: client => client.post(`${API_PORT}/api`, { query: GET_COMMON_DATA })
});
