import React from 'react';
import { connect } from 'react-redux';
import { Button, Layout, Table, message } from 'antd';
import WhAddModal from './WhAddModal';
import axios from 'axios';
import { API_PORT } from '../../config';
import ADD_WH from '../../graphql/wh/addWh';
import DELETE_WH from '../../graphql/wh/deleteWh';
import GET_WH from '../../graphql/wh/getWh';

const Content = Layout.Content;

@connect(state => ({ common: state.common }))
export default class WhManage extends React.Component {
	state = {
		wh: [],
		showAddModal: false
	};

	async addItem(wh) {
		const result = await axios.post(`${API_PORT}/api`, { query: ADD_WH, variables: wh });
		message.destroy();
		if (result.data.data.addWh === 'ok') {
			message.success('添加成功!');
		} else {
			message.error('添加失败!');
		}
		this.getWh();
	}

	async getWh() {
		const result = await axios.post(`${API_PORT}/api`, { query: GET_WH, variables: {} });
		this.setState({ wh: result.data.data.getWh });
	}

	async deleteWh(record) {
		const result = await axios.post(`${API_PORT}/api`, {
			query: DELETE_WH,
			variables: { no: record.no }
		});
		if (result.data.data.deleteWh === 'ok') {
			message.success('删除成功!');
		} else {
			message.error('删除失败!');
		}
		this.getWh();
	}

	componentDidMount() {
		this.getWh();
	}

	render() {
		const common = this.props.common || {};
		const dep = common.dep || [];
		const user = common.user || [];
		const columns = [
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record, index) => (
					<Button icon="delete" onClick={() => this.deleteWh(record)} />
				)
			},
			{ title: '仓库名称', dataIndex: 'name' },
			{ title: '仓库编号', dataIndex: 'no' },
			{ title: '仓库类别', dataIndex: 'cat' },
			{ title: '归属部门', dataIndex: 'pname' },
			{ title: '归属部门编号', hide: true, dataIndex: 'pno' },
			{ title: '仓库负责人', dataIndex: 'manager' },
			{ title: '负责人编号', dataIndex: 'managerno' },
			{ title: '仓库电话', dataIndex: 'phone' },
			{ title: '仓库地址', dataIndex: 'address' }
		];

		return (
			<Content style={{ margin: '25px 15px', padding: '25px 15px', background: '#fff' }}>
				<Table
					title={() => (
						<Button
							type="primary"
							size="large"
							icon="plus-circle-o"
							onClick={() => this.setState({ showAddModal: !this.state.showAddModal })}
						>
							添加仓库
						</Button>
					)}
					size="small"
					columns={columns}
					rowKey={record => record.no}
					bordered
					dataSource={this.state.wh}
					locale={{ emptyText: '暂无数据' }}
				/>
				<WhAddModal
					dep={dep}
					user={user}
					setVisiable={() => this.setState({ showAddModal: false })}
					handleAdd={values => this.addItem(values)}
					visiable={this.state.showAddModal}
				/>
			</Content>
		);
	}
}
