import { message } from 'antd';
import { push } from 'react-router-redux';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './types';
import { getCommonData } from '../actions/common';
import { API_PORT } from '../config';

export const login = (params = {}) => ({
	types: [ LOGIN, LOGIN_SUCCESS, LOGIN_FAILED ],
	promise: client => client.post(`${API_PORT}/user/login`, { ...params }),
	afterSuccess: (dispatch, getState, result) => {
		const { data } = result;
		if (data && !data.login) {
			message.destroy();
			return message.error(data.message);
		}
		localStorage.setItem('auth-token', data.token);
		dispatch(push('/'));
	}
});

export const redirect = url => push(url);

/**
 * 测试用2小时过期
 */
export const jwt2h = () => ({
	types: [ 'JWT2H', 'JWT2H_SUCCESS', 'JWT2H_FAILED' ],
	promise: client => client.post(`${API_PORT}/jwt2h`)
});

/**
 * 测试用6秒过期
 */
export const jwt6s = () => ({
	types: [ 'JWT6S', 'JWT6S_SUCCESS', 'JWT6S_FAILED' ],
	promise: client => client.post(`${API_PORT}/jwt6s`)
});
