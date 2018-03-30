import { FETCH_RANKING, FETCH_RANKING_SUCCESS, FETCH_RANKING_FAILED } from '../actions/types';

const rankingReducer = (ranking = { ranking: [], loading: false }, action) => {
	const { type, result, error } = action;
	switch (type) {
		case FETCH_RANKING:
			return { ...ranking, loading: true };
		case FETCH_RANKING_SUCCESS:
			return { ...ranking, loading: false, ranking: result.data };
		case FETCH_RANKING_FAILED:
			return { ...ranking, loading: false };
		default:
			return ranking;
	}
	return ranking;
};

export default rankingReducer;
