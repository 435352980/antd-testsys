import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
//code, cat, model, color, qty, price
const FormItem = Form.Item;
const Option = Select.Option;

const formColStyle = {
	labelCol: { span: 5 },
	wrapperCol: { span: 15 }
};

class WhAddModal extends React.Component {
	clearData() {
		this.props.form.setFieldsValue({
			pname: null,
			pno: null,
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
			dep,
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
					<FormItem {...formColStyle} label="归属部门">
						{getFieldDecorator('pno', {})(
							<Select
								disabled={dep.length === 0}
								onChange={(value, option) => {
									setFieldsValue({ pname: option.props.pname });
								}}
							>
								{dep.map(info => (
									<Option key={info.no} value={info.no} pname={info.name}>
										{info.name}
									</Option>
								))}
							</Select>
						)}
					</FormItem>
					{getFieldDecorator('pname')(<Input hidden />)}
					<FormItem {...formColStyle} label="仓库名称">
						{getFieldDecorator('name', {
							rules: [ { required: true, message: '请输入仓库名称!' } ]
						})(<Input />)}
					</FormItem>
					<FormItem {...formColStyle} label="仓库类别">
						{getFieldDecorator('cat', {
							rules: [ { required: true, message: '请选择仓库类别!' } ]
						})(
							<Select>
								<Option key="saleWH" value="1">
									销售柜台
								</Option>
								<Option key="materialWh" value="2">
									材料仓
								</Option>
								<Option key="transWh" value="3">
									中转仓
								</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formColStyle} label="仓库负责人">
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
										key={'whManager' + info.no}
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
					<FormItem {...formColStyle} label="仓库电话">
						{getFieldDecorator('phone', {
							rules: [ { required: true, message: '请输入仓库电话!' } ]
						})(<Input />)}
					</FormItem>
					<FormItem {...formColStyle} label="仓库地址">
						{getFieldDecorator('address', {
							rules: [ { required: true, message: '请输入仓库地址!' } ]
						})(<Input />)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(WhAddModal);
