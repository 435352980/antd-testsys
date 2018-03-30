import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../actions/types';

const authReducer = (
	auth = {
		loading: false,
		user: {
			no: null,
			username: null,
			nickname: null,
			role: null,
			pdep: null,
			pdepno: null,
			email: null,
			phone: null
		},
		token: null
	},
	action
) => {
	const { type, result, error } = action;
	switch (type) {
		case LOGIN:
			return { ...auth, loading: true };
		case LOGIN_SUCCESS:
			return { ...auth, loading: false, user: result.data };
		case LOGIN_FAILED:
			return { ...auth, loading: false };
		case LOGOUT:
			return { login: false, loading: false };
		default:
			return auth;
	}
	return auth;
};

export default authReducer;
