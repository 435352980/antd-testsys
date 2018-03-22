import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { push } from 'react-router-redux';
import { Layout } from 'antd';
import Login from '../components/Login';
import PageMenu from '../components/PageMenu';
import * as config from '../config';

const Header = Layout.Header;
const Content = Layout.Content;
const { MENU_DOC, MENU_SETTING } = config;

@connect(state => ({ auth: state.auth }), dispatch => ({ dispatch }))
export default class MainFrame extends React.Component {
	componentWillMount() {}
	render() {
		console.log(this.props.children);
		return (
			<Layout style={{ height: '100%' }}>
				<Header
					style={{
						display: 'flex',
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						background: '#fff',
						fontSize: '2em'
					}}
				>
					<span style={{ float: 'left' }}>测试系统</span>
					<PageMenu
						menuDoc={MENU_DOC}
						menuSetting={MENU_SETTING}
						onSelect={key => this.props.dispatch(push(key))}
					/>
				</Header>
				<Content style={{ display: 'flex', flex: 1, marginTop: 64 }}>
					<Switch>
						<Route path="/login" component={Login} />
					</Switch>
				</Content>
			</Layout>
		);
	}
}
