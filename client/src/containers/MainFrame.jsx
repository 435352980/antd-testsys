import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { push } from 'react-router-redux';
import { Layout, Button } from 'antd';
import PageMenu from '../components/PageMenu';
import Login from './Login';
import SignIn from './SignIn';
import DdMap from './GdMap';
import GdMap from './GdMap';
import Vouch from './Vouch';
import UserManage from './UserManage';
import DepManage from './DepManage';
import WhManage from './WhManage';
import * as config from '../config';
import { getCommonData } from '../actions/common';
import { jwt2h, jwt6s } from '../actions/auth';

const Header = Layout.Header;
const Content = Layout.Content;
const { MENU_DOC, MENU_SETTING } = config;

@connect(
	state => ({ auth: state.auth }),
	dispatch => ({ dispatch, ...bindActionCreators({ getCommonData, jwt2h, jwt6s }, dispatch) })
)
export default class MainFrame extends React.Component {
	componentWillMount() {
		this.props.getCommonData();
	}
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
						<Route
							exact
							path="/"
							component={() => {
								return (
									<div>
										<Button onClick={() => this.props.jwt2h()}>token2小时过期</Button>
										<Button onClick={() => this.props.jwt6s()}>token6秒过期</Button>
									</div>
								);
							}}
						/>
						<Route path="/login" component={Login} />
						<Route path="/signin" component={SignIn} />
						<Route path="/gdMap" component={GdMap} />
						<Route path="/vouch" component={Vouch} />
						<Route path="/userManage" component={UserManage} />
						<Route path="/depManage" component={DepManage} />
						<Route path="/whManage" component={WhManage} />
						<Route component={() => <div>404</div>} />
					</Switch>
				</Layout>
			</Layout>
		);
	}
}
