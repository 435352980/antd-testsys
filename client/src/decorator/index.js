import React from 'react';
import { push } from 'react-router-redux';
import { Layout } from 'antd';
const Content = Layout.Content;

/**
 * 页面组件声明，自带页面样式
 * @param {*} Component 
 */
export const page = Component => props => (
	<Content style={{ margin: '25px 15px', background: '#fff' }}>
		<Component {...props} />
	</Content>
);

/**
 * 期望用户登陆后不可见的页面
 * @param {*} Component 
 */
export const hiddenWithLogin = Component =>
	class extends React.Component {
		componentWillMount() {
			const { auth, redirect } = this.props;
			if (auth && auth.login) {
				redirect('/');
			}
		}
		render() {
			return <Component {...this.props} />;
		}
	};

/**
 * 期望用户登录状态才可见的页面
 * @param {*} Component 
 */
export const showWithLogin = Component =>
	class extends React.Component {
		componentWillMount() {
			const { auth, redirect } = this.props;
			if (!auth || !auth.login) {
				redirect('/login');
			}
		}
		render() {
			return <Component {...this.props} />;
		}
	};
