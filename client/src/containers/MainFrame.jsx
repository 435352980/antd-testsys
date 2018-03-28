import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { push } from 'react-router-redux';
import { Layout } from 'antd';
import Login from './Login';
import DdMap from './GdMap';
import PageMenu from '../components/PageMenu';
import * as config from '../config';
import GdMap from './GdMap';
import Vouch from './Vouch';

const Header = Layout.Header;
const Content = Layout.Content;
const { MENU_DOC, MENU_SETTING } = config;

@connect(state => ({ auth: state.auth }), dispatch => ({ dispatch }))
export default class MainFrame extends React.Component {
	componentWillMount() {}
	render() {
		//console.log(this.props.children);
		return (
			<Layout style={{ minHeight: '100%', minWidth: 1024 }}>
				<Header
					style={{
						display: 'flex',
						flexDirection: 'row',
						top: 0,
						width: '100%',
						background: '#fff',
						zIndex: 1
					}}
				>
					<span style={{ float: 'left', fontSize: '2em', marginRight: 50 }}>测试系统</span>
					<PageMenu
						style={{ flex: 1 }}
						menuDoc={MENU_DOC}
						menuSetting={MENU_SETTING}
						onSelect={key => this.props.dispatch(push(key))}
					/>
					<ul>
						<li
							className="ant-menu-item"
							style={{ float: 'left', padding: '0 4px' }}
							onClick={() => this.props.dispatch(push('login'))}
						>
							登录
						</li>
						<li
							className="ant-menu-item"
							style={{ float: 'right', padding: '0 4px' }}
							onClick={() => this.props.dispatch(push('/signin'))}
						>
							注册
						</li>
					</ul>
				</Header>
				<Layout>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/gdMap" component={GdMap} />
						<Route path="/vouch" component={Vouch} />
						<Route component={() => <div>404</div>} />
					</Switch>
				</Layout>
			</Layout>
		);
	}
}
