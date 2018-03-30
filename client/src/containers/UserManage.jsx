import React from 'react';
import { Button, Layout, Table } from 'antd';

const Content = Layout.Content;

export default class UserManage extends React.Component {
	state = {
		user: []
	};

	render() {
		const columns = [
			{ title: '登录名', dataIndex: 'username' },
			{ title: '用户名', dataIndex: 'nickname' },
			{ title: '用户类别', dataIndex: 'role' },
			{ title: '邮箱', dataIndex: 'email' },
			{ title: '电话', dataIndex: 'phone' }
		];

		return (
			<Content style={{ padding: '25px 15px' }}>
				<Table
					title={() => (
						<Button
							type="primary"
							size="large"
							icon="plus-circle-o"
							onClick={() => console.log('新建')}
						>
							添加用户
						</Button>
					)}
					columns={columns}
					dataSource={this.state.user}
					locale={{ emptyText: '暂无数据' }}
				/>
			</Content>
		);
	}
}
