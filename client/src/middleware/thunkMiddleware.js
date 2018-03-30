import axios from 'axios';

const createThunkMiddleware = extraArgument => ({ dispatch, getState }) => next => async action => {
	if (typeof action === 'function') {
		return action(dispatch, getState, extraArgument);
	}
	const { types, promise, afterSuccess, ...rest } = action;
	if (!promise) {
		return next(action);
	}
	const [ REQUEST, SUCCESS, FAILURE ] = types;
	next({ type: REQUEST });
	try {
		const result = await promise(axios);
		next({ ...rest, result, type: SUCCESS });
		if (afterSuccess) {
			afterSuccess(dispatch, getState, result);
		}
	} catch (error) {
		console.log(error)
		next({ ...rest, error, type: FAILURE });
	}
};

const thunk = createThunkMiddleware();
thunk.widthExtraArgument = createThunkMiddleware;

export default thunk;
