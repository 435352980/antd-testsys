import React from 'react';
import { Layout, Row, Col, Card, Form, Button, Icon, Dropdown, Menu, Modal, message } from 'antd';
import axios from 'axios';
import { API_PORT } from '../../config';
import VouchHeader from './VouchHeader';
import VouchItemsTable from './VouchItemsTable';
import VouchPrint from './VouchPrint';
import AddModal from './AddModal';
import CREATE_VOUCH from '../../graphql/vouch/createVouch';
import DELETE_VOUCH from '../../graphql/vouch/deleteVouch';
import SAVE_VOUCH from '../../graphql/vouch/saveVouch';
import EDIT_VOUCH from '../../graphql/vouch/editVouch';
import GET_VOUCH_CODES from '../../graphql/vouch/getVouchCodes';
import GET_VOUCH_INFO from '../../graphql/vouch/getVouchInfo';
import ADD_VOUCH_ITEM from '../../graphql/vouch/addVouchItem';
import UPDATE_VOUCH_ITEM from '../../graphql/vouch/updateVouchItem';
import DELETE_VOUCH_ITEM from '../../graphql/vouch/deleteVouchItem';

const Content = Layout.Content;
const confirm = Modal.confirm;

const buttonProps = {
	type: 'primary',
	ghost: true,
	style: { borderColor: 'transparent' }
};

export default class Vouch extends React.Component {
	state = {
		products: [],
		vouchCodes: [],
		vouchHeader: {},
		vouchItems: [],
		index: 0,
		isEditItem: false,
		loading: false,
		showAddModal: false,
		showSearchModal: false,
		createModalVisiable: false,
		printType: 1
	};

	componentDidMount() {
		this.getVouchCodes();
	}

	//获取单号列表
	getVouchCodes = async () => {
		const result = await axios.post(`${API_PORT}/api`, {
			query: GET_VOUCH_CODES,
			variables: {}
		});
		const vouchCodes = result.data.data.getVouchCodes || [];
		this.setState({ vouchCodes }, () => this.getVouchInfo(this.state.vouchCodes[this.state.index]));
	};

	//获取单据详情，并更新页面索引
	getVouchInfo = async code => {
		if (!code) {
			return;
		}
		const vouchCodes = this.state.vouchCodes;
		const result = await axios.post(`${API_PORT}/api`, {
			query: GET_VOUCH_INFO,
			variables: { code }
		});
		this.setState({
			index: vouchCodes.findIndex(item => item === code),
			...result.data.data.getVouchInfo
		});
	};

	//服务端新建单据，完毕后返回单号，客户端根据单号同步单据，插入本地缓存单据号列表
	createVouch = async maker => {
		const result = await axios.post(`${API_PORT}/api`, {
			query: CREATE_VOUCH,
			variables: { maker }
		});
		let newVouchCodes = [ ...this.state.vouchCodes ];
		newVouchCodes.splice(this.state.index, 0, result.data.data.createVouch);
		this.setState(
			{
				vouchCodes: newVouchCodes
			},
			() => this.getVouchInfo(this.state.vouchCodes[this.state.index])
		);
	};

	deleteVouch = async () => {
		const index = this.state.index;
		const vouchCodes = this.state.vouchCodes || [];
		const vouchHeader = this.state.vouchHeader || {};
		const result = await axios.post(`${API_PORT}/api`, {
			query: DELETE_VOUCH,
			variables: { code: vouchHeader.code }
		});
		message.destroy();
		if (result.data.data.deleteVouch === 'ok') {
			message.success(`单据${vouchHeader.code}删除单据成功!`);
			const indexType = getIndexType(index, vouchCodes.length);
			let newVouchCodes = vouchCodes.filter(code => code !== vouchHeader.code);
			//index处于中间或末尾时，删除操作后索引需要前移一项
			let newIndex = indexType === 'in' || indexType === 'last' ? index - 1 : 0;
			this.setState(
				{
					vouchCodes: newVouchCodes,
					index: newIndex,
					vouchHeader: { code: newVouchCodes[newIndex] }
				},
				() => this.getVouchInfo(newVouchCodes[newIndex])
			);
		} else {
			message.error('删除单据失败!');
		}
	};

	saveVouch = async () => {
		const vouchHeader = this.state.vouchHeader;
		const result = await axios.post(`${API_PORT}/api`, {
			query: SAVE_VOUCH,
			variables: { ...vouchHeader }
		});
		message.destroy();
		if (result.data.data.saveVouch === 'ok') {
			message.success(`单据${vouchHeader.code}保存成功!`);
			this.getVouchInfo(vouchHeader.code);
		} else {
			message.error('保存单据失败!');
		}
	};

	editVouch = async () => {
		const vouchHeader = this.state.vouchHeader;
		const result = await axios.post(`${API_PORT}/api`, {
			query: EDIT_VOUCH,
			variables: { code: vouchHeader.code }
		});
		if (result.data.data.editVouch === 'ok') {
			this.getVouchInfo(vouchHeader.code);
		}
	};

	addItem = async values => {
		const vouchHeader = this.state.vouchHeader;
		const result = await axios.post(`${API_PORT}/api`, {
			query: ADD_VOUCH_ITEM,
			variables: { code: vouchHeader.code, ...values }
		});
		message.destroy();
		if (result.data.data.addVouchItem === 'ok') {
			message.success(`添加成功!`);
			this.getVouchInfo(vouchHeader.code);
		} else {
			message.error('添加失败!');
		}
	};

	updateItem = async item => {
		const vouchHeader = this.state.vouchHeader;
		const result = await axios.post(`${API_PORT}/api`, {
			query: UPDATE_VOUCH_ITEM,
			variables: { ...item }
		});
		message.destroy();
		if (result.data.data.updateVouchItem === 'ok') {
			message.success(`修改成功!`);
			this.getVouchInfo(vouchHeader.code);
		} else {
			message.error('修改失败!');
		}
	};

	deleteItem = async id => {
		const vouchHeader = this.state.vouchHeader;
		const result = await axios.post(`${API_PORT}/api`, {
			query: DELETE_VOUCH_ITEM,
			variables: { id }
		});
		message.destroy();
		if (result.data.data.deleteVouchItem === 'ok') {
			message.success(`删除成功!`);
			this.getVouchInfo(vouchHeader.code);
		} else {
			message.error('删除失败!');
		}
	};

	render() {
		const printMenu = (
			<Menu
				onClick={({ item, key, keyPath }) => {
					this.setState({ printType: key }, () => this.refs.printWrapper.refs.print.onPrint());
				}}>
				<Menu.Item key="1">针式无价格无合计24x14</Menu.Item>
				<Menu.Item key="2">针式有价格有合计24x14</Menu.Item>
				<Menu.Item key="3">A4有价格有合计</Menu.Item>
				<Menu.Item key="4">针式无价格有合计24x4</Menu.Item>
				<Menu.Item key="5">针式有价格有合计24x28</Menu.Item>
				<Menu.Item key="6">针式无价格有合计24x28</Menu.Item>
				{/* <Menu.Item key="7">针式珠宝24x14</Menu.Item> */}
			</Menu>
		);
		const vouchCodes = this.state.vouchCodes || [];
		const vouchHeader = this.state.vouchHeader || [];
		const vouchItems = this.state.vouchItems || [];
		let index = this.state.index;
		let indexType = getIndexType(index, vouchCodes.length);
		const editable = vouchHeader.state === 0 ? true : false;
		return (
			<Content style={{ padding: '25px 15px' }}>
				<Card
					title={
						<Row style={{ background: '#fff' }}>
							<Button
								{...buttonProps}
								icon="filter"
								onClick={() => this.setState({ showSearchModal: true })}>
								筛选
							</Button>
							<Button
								{...buttonProps}
								icon="plus-circle-o"
								onClick={() => this.createVouch('用户1')}>
								新建
							</Button>
							<Button
								{...buttonProps}
								disabled={!editable}
								icon="form"
								onClick={() => this.setState({ showAddModal: true })}>
								添加
							</Button>
							<Button
								{...buttonProps}
								disabled={!editable || this.state.isEditItem}
								icon="save"
								onClick={() => {
									const { code, crtdate, maker, odep, idep, owh, iwh } = vouchHeader;
									if (!code || !crtdate || !maker || !odep || !idep || !owh || !iwh) {
										message.destroy();
										return message.error('请先完善并保存单据信息!');
									}
									this.saveVouch();
								}}>
								保存
							</Button>
							<Button
								{...buttonProps}
								disabled={editable}
								icon="edit"
								onClick={() => this.editVouch()}>
								修改
							</Button>
							<Button
								{...buttonProps}
								icon="verticle-right"
								disabled={!indexType || indexType === 'first' || indexType === 'only'}
								onClick={() => this.getVouchInfo(vouchCodes[0])}>
								首张
							</Button>
							<Button
								{...buttonProps}
								icon="left"
								disabled={!indexType || indexType === 'first' || indexType === 'only'}
								onClick={() => this.getVouchInfo(vouchCodes[index - 1])}>
								上张
							</Button>
							<Button
								{...buttonProps}
								icon="right"
								disabled={!indexType || indexType === 'last' || indexType === 'only'}
								onClick={() => this.getVouchInfo(vouchCodes[index + 1])}>
								下张
							</Button>
							<Button
								{...buttonProps}
								icon="verticle-left"
								disabled={!indexType || indexType === 'last' || indexType === 'only'}
								onClick={() => this.getVouchInfo(vouchCodes[vouchCodes.length - 1])}>
								尾张
							</Button>
							<Button
								{...buttonProps}
								icon="reload"
								onClick={() => this.getVouchInfo(vouchCodes[index])}>
								刷新
							</Button>
							<Button
								{...buttonProps}
								disabled={!editable || this.state.isEditItem}
								icon="delete"
								onClick={() => {
									const deleteVouch = this.deleteVouch;
									confirm({
										title: '提示',
										content: '删除后无法恢复单据',
										okText: '取消',
										cancelText: '确定',
										onCancel() {
											deleteVouch();
										},
										onOk() {}
									});
								}}>
								删除
							</Button>

							<Dropdown overlay={printMenu}>
								<Button {...buttonProps} icon="printer">
									打印
								</Button>
							</Dropdown>
						</Row>
					}>
					<VouchHeader
						vouchHeader={vouchHeader}
						onChange={vouchHeader => this.setState({ vouchHeader })}
					/>
					<br />
					<VouchItemsTable
						disabled={!editable}
						vouchItems={vouchItems}
						handleUpdate={item => this.updateItem(item)}
						handleDelete={id => this.deleteItem(id)}
						setEditable={isEditItem => this.setState({ isEditItem })}
					/>
					<VouchPrint
						ref="printWrapper"
						printType={this.state.printType}
						header={vouchHeader}
						details={vouchItems}
					/>
				</Card>
				<AddModal
					setVisiable={() => this.setState({ showAddModal: false })}
					handleAdd={values => this.addItem(values)}
					visiable={this.state.showAddModal}
				/>
			</Content>
		);
	}
}

/**
 * 获取当前索引在数组中的位置信息
 * @param {*} index
 * @param {*} pageSize
 */
const getIndexType = (index, pageSize) => {
	if (pageSize === 0) {
		//无数据时无意义
		return false;
	}
	if (pageSize === 1) {
		return 'only'; //只有一张
	}
	if (index === 0) {
		return 'first'; //首张
	}
	if (index > 0 && index < pageSize - 1) {
		return 'in'; //中间
	} else if (index > 0 && index === pageSize - 1) {
		return 'last'; //尾张
	} else {
		return false;
	}
};
