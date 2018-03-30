import React from 'react';
import { render } from 'react-dom';
import { createStore, bindActionCreators, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { push, routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { Route, Switch, withRouter } from 'react-router';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import thunkMiddleware from './middleware/thunkMiddleware';
import setAxiosInterceptors from './middleware/setAxiosInterceptors';
import MainFrame from './containers/MainFrame';
import { auth, common } from './reducers';

const history = createHistory();

const rm = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initState = {};
try {
	const jwt = localStorage.getItem('auth-token');
	const user = jwtDecode(jwt);
	initState = { auth: { login: true, user } };
} catch (error) {
	console.log(error);
}

let store = createStore(
	combineReducers({ router: routerReducer, auth, common }),
	initState,
	composeEnhancers(applyMiddleware(rm, thunkMiddleware))
);

const Main = withRouter(MainFrame);

setAxiosInterceptors(() => {
	message.destroy();
	message.error('凭证过期，请重新登录!');
	store.dispatch({ type: 'LOGOUT' });
	store.dispatch(push('/login'));
});

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Main />
				</ConnectedRouter>
			</Provider>
		);
	}
}

render(<App />, document.getElementById('root'));
