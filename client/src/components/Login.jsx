import React from 'react';
import { Row, Col, Layout, Form, Input, Icon, Button, Checkbox } from 'antd';
import style from '../style.less';
const Header = Layout.Header;
const FormItem = Form.Item;
const Footer = Layout.Footer;

const FormItemStyle = { wrapperCol: { span: 18, offset: 3 } };

class Login extends React.Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Layout
				className={style.loginContent}
				style={{
					alignContent: 'center',
					justifyContent: 'center'
				}}
			>
				<Form
					onSubmit={(err, values) => {
						if (err) {
							return;
						}
						console.log(values);
					}}
					style={{
						margin: '0 auto',
						width: 360,
						border: '1px solid #ededed',
						borderRadius: 3,
						boxShadow: '0 1px 3px rgba(0,0,0,.25)',
						backgroundColor: '#FFF'
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
						{getFieldDecorator('userName', {
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
						<Button
							size="large"
							type="primary"
							htmlType="submit"
							style={{ width: '100%' }}
						>
							登录
						</Button>
						没有账号？赶紧 <a>注册</a> 一个吧
					</FormItem>
				</Form>
			</Layout>
		);
	}
}

export default Form.create()(Login);
