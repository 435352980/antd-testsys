import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
//code, cat, model, color, qty, price
const FormItem = Form.Item;
const Option = Select.Option;

const formColStyle = {
	labelCol: { span: 5 },
	wrapperCol: { span: 15 }
};

class AddModal extends React.Component {
	clearData() {
		this.props.form.setFieldsValue({
			cat: null,
			model: null,
			color: null,
			qty: null,
			price: null
		});
	}

	render() {
		const {
			visiable,
			setVisiable,
			handleAdd,
			form: { getFieldDecorator, validateFields, setFieldsValue }
		} = this.props;

		return (
			<Modal
				visible={visiable}
				title="添加明细"
				cancelText="取消"
				okText="确定"
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
						handleAdd(fieldsValue);
						this.clearData();
					})}>
				<Form>
					<FormItem {...formColStyle} label="产品类别">
						{getFieldDecorator('cat', { rules: [ { required: true, message: '请选择类别!' } ] })(
							<Select size="large">
								<Option value={'类别1'}>类别1</Option>
								<Option value={'类别2'}>类别2</Option>
								<Option value={'类别3'}>类别3</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formColStyle} label="产品型号">
						{getFieldDecorator('model', { rules: [ { required: true, message: '请选择类别!' } ] })(
							<Select size="large">
								<Option value={'型号1'}>型号1</Option>
								<Option value={'型号2'}>型号2</Option>
								<Option value={'型号3'}>型号3</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formColStyle} label="产品颜色">
						{getFieldDecorator('color')(
							<Select size="large" allowClear="true">
								<Option value={'颜色1'}>颜色1</Option>
								<Option value={'颜色2'}>颜色2</Option>
								<Option value={'颜色3'}>颜色3</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formColStyle} label="数量">
						{getFieldDecorator('qty', { rules: [ { required: true, message: '请输入数量!' } ] })(
							<InputNumber size="large" min={1} max={5000} step={1} style={{ width: '100%' }} />
						)}
					</FormItem>
					<FormItem {...formColStyle} label="零售单价">
						{getFieldDecorator('price', {
							rules: [
								{
									required: true,
									pattern: /^\d{1,5}\.?\d{0,2}$/,
									message: '单价输入有误'
								}
							]
						})(
							<Input
								onKeyDown={e => {
									const keyCode = e.keyCode;
									if (
										!(
											(keyCode >= 48 && keyCode <= 57) ||
											(keyCode >= 96 && keyCode <= 105) ||
											keyCode === 45 ||
											keyCode === 46 ||
											keyCode === 8 ||
											keyCode === 190 ||
											keyCode === 110 ||
											keyCode == 37 ||
											keyCode == 39
										)
									) {
										e.preventDefault();
									}
								}}
							/>
						)}
					</FormItem>
				</Form>
			</Modal>
		);
	}
}

export default Form.create()(AddModal);
