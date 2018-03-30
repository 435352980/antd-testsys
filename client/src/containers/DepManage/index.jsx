import React from 'react';
import { connect } from 'react-redux';
import { Button, Layout, Modal, Table, message } from 'antd';
import DepAddModal from './DepAddModal';
import axios from 'axios';
import { API_PORT } from '../../config';
import ADD_DEP from '../../graphql/dep/addDep';
import DELETE_DEP from '../../graphql/dep/deleteDep';
import GET_DEP from '../../graphql/dep/getDep';

const Content = Layout.Content;

@connect(state => ({ common: state.common }))
export default class DepManage extends React.Component {
	state = {
		dep: [],
		showAddModal: false
	};

	async addItem(dep) {
		const result = await axios.post(`${API_PORT}/api`, { query: ADD_DEP, variables: dep });
		message.destroy();
		if (result.data.data.addDep === 'ok') {
			message.success('添加成功!');
		} else {
			message.error('添加失败!');
		}
		this.getDep();
	}

	async getDep() {
		const result = await axios.post(`${API_PORT}/api`, { query: GET_DEP, variables: {} });
		this.setState({ dep: result.data.data.getDep });
	}

	async deleteDep(record) {
		const result = await axios.post(`${API_PORT}/api`, {
			query: DELETE_DEP,
			variables: { no: record.no }
		});
		if (result.data.data.deleteDep === 'ok') {
			message.success('删除成功!');
		} else {
			message.error('删除失败!');
		}
		this.getDep();
	}

	componentDidMount() {
		this.getDep();
	}

	render() {
		const common = this.props.common || [];
		const user = common.user || [];
		const columns = [
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record, index) => (
					<Button icon="delete" onClick={() => this.deleteDep(record)} />
				)
			},
			{ title: '部门名称', dataIndex: 'name' },
			{ title: '部门编号', dataIndex: 'no' },
			{ title: '部门类别', dataIndex: 'cat' },
			{ title: '部门负责人', dataIndex: 'manager' },
			{ title: '部门电话', dataIndex: 'phone' },
			{ title: '部门地址', dataIndex: 'address' }
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
							添加部门
						</Button>
					)}
					size="small"
					rowKey={record => record.no}
					bordered
					columns={columns}
					dataSource={this.state.dep}
					locale={{ emptyText: '暂无数据' }}
				/>
				<DepAddModal
					setVisiable={() => this.setState({ showAddModal: false })}
					handleAdd={values => this.addItem(values)}
					user={user}
					visiable={this.state.showAddModal}
				/>
			</Content>
		);
	}
}
