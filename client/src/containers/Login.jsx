import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Row, Col, Layout, Form, Input, Icon, Button, Checkbox } from 'antd';

import { hiddenWithLogin } from '../decorator';
import * as authAction from '../actions/auth';
import style from '../style.less';

const Header = Layout.Header;
const FormItem = Form.Item;
const Footer = Layout.Footer;

const FormItemStyle = { wrapperCol: { span: 18, offset: 3 } };

@connect(
	state => ({ auth: state.auth }),
	dispatch => ({ dispatch, ...bindActionCreators(authAction, dispatch) })
)
@hiddenWithLogin
class Login extends React.Component {
	render() {
		const { form: { getFieldDecorator, validateFields }, auth, login } = this.props;
		return (
			<Layout
				className={style.loginContent}
				style={{
					alignContent: 'center',
					justifyContent: 'center'
				}}
			>
				<Form
					onSubmit={e => {
						e.preventDefault();
						validateFields((err, values) => {
							if (err) {
								return console.log(err);
							}
							login(values);
						});
					}}
					style={{
						margin: '0 auto',
						width: 360,
						border: '1px solid #ededed',
						borderRadius: 3,
						boxShadow: '0 1px 3px rgba(0,0,0,.25)',
						backgroundColor: '#FFF',
						zIndex: 0
					}}
				>
					<Header
						style={{
							backgroundColor: '#fff',
							textAlign: 'center',
							fontSize: '1.2rem'
						}}
					>
						用户登录
					</Header>
					<FormItem {...FormItemStyle}>
						{getFieldDecorator('username', {
							rules: [ { required: true, message: '请输入账号!' } ]
						})(
							<Input
								size="large"
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="账号"
							/>
						)}
					</FormItem>
					<FormItem {...FormItemStyle}>
						{getFieldDecorator('password', {
							rules: [ { required: true, message: '请输入密码!' } ]
						})(
							<Input
								size="large"
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="密码"
							/>
						)}
					</FormItem>
					<FormItem {...FormItemStyle}>
						<Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
							登录
						</Button>
						没有账号？赶紧 <a onClick={() => this.props.dispatch(push('/signin'))}>注册</a> 一个吧
					</FormItem>
				</Form>
			</Layout>
		);
	}
}

export default Form.create()(Login);
