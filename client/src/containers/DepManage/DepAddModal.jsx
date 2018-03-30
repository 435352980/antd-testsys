import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
//code, cat, model, color, qty, price
const FormItem = Form.Item;
const Option = Select.Option;

const formColStyle = {
	labelCol: { span: 5 },
	wrapperCol: { span: 15 }
};

class DepAddModal extends React.Component {
	clearData() {
		this.props.form.setFieldsValue({
			name: null,
			cat: null,
			manager: null,
			managerno: null,
			phone: null,
			address: null
		});
	}

	render() {
		const {
			visiable,
			setVisiable,
			handleAdd,
			user,
			form: { getFieldDecorator, validateFields, setFieldsValue }
		} = this.props;

		return (
			<Modal
				visible={visiable}
				title="添加明细"
				cancelText="取消"
				okText="确定"
				destroyOnClose={true}
				onCancel={() => {
					setVisiable();
					this.clearData();
				}}
				onOk={() =>
					validateFields((err, fieldsValue) => {
						if (err) {
							//console.log(err);
							return;
						}
						//转换类型
						fieldsValue['cat'] = fieldsValue['cat'] ? parseInt(fieldsValue['cat']) : null;
						handleAdd(fieldsValue);
						this.clearData();
					})}
			>
				<Form>
					<FormItem {...formColStyle} label="部门名称">
						{getFieldDecorator('name', {
							rules: [ { required: true, message: '请输入部门名称!' } ]
						})(<Input />)}
					</FormItem>
					<FormItem {...formColStyle} label="部门类别">
						{getFieldDecorator('cat', {
							rules: [ { required: true, message: '请选择部门类别!' } ]
						})(
							<Select>
								<Option key="purchaseDep" value="1">
									采购部
								</Option>
								<Option key="saleDep" value="2">
									销售部
								</Option>
								<Option key="repairDep" value="3">
									维修部
								</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formColStyle} label="部门负责人">
						{getFieldDecorator('managerno', {})(
							<Select
								allowClear={true}
								onChange={(value, option) => {
									setFieldsValue({
										manager: option.props.manager
									});
								}}
								disabled={user.length === 0}
							>
								{user.map(info => (
									<Option
										key={'depManager' + info.no}
										manager={info.nickname}
										value={info.no + ''}
									>
										{info.nickname}
									</Option>
								))}
							</Select>
						)}
					</FormItem>
					{getFieldDecorator('manager', {})(<Input hidden />)}
					<FormItem {...formColStyle} label="部门电话">
						{getFieldDecorator('phone', {
							rules: [ { required: true, message: '请输入部门电话!' } ]
						})(<Input />)}
					</FormItem>
					<FormItem {...formColStyle} label="部门地址">
						{getFieldDecorator('address', {
							rules: [ { required: true, message: '请输入部门地址!' } ]
						})(<Input />)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(DepAddModal);
