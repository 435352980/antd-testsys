import { FETCH_RANKING, FETCH_RANKING_SUCCESS, FETCH_RANKING_FAILED } from './types';
import { API_PORT } from '../config';

export const getRanking = (param = {}) => ({
	types: [ FETCH_RANKING, FETCH_RANKING_SUCCESS, FETCH_RANKING_FAILED ],
	promise: client => client.post(`${API_PORT}/ranking`, param)
});
