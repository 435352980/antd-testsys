import React from 'react';
import { render } from 'react-dom';
import { createStore, bindActionCreators, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import MainFrame from './containers/MainFrame';
import Login from './components/Login';

const history = createHistory();

const rm = routerMiddleware(history);

let store = createStore(combineReducers({ router: routerReducer }), {}, applyMiddleware(rm));

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MainFrame />
				</ConnectedRouter>
			</Provider>
		);
	}
}

render(<App />, document.getElementById('root'));
