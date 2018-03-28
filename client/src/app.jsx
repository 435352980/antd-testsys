import React from 'react';
import { render } from 'react-dom';
import { createStore, bindActionCreators, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { Route, Switch, withRouter } from 'react-router';
import MainFrame from './containers/MainFrame';

const history = createHistory();

const rm = routerMiddleware(history);

let store = createStore(combineReducers({ router: routerReducer }), {}, applyMiddleware(rm));

const Main = withRouter(MainFrame);

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
