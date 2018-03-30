import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Card, Collapse, Input } from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const { TextArea } = Input;

const formColStyle = { labelCol: { span: 5 }, wrapperCol: { span: 16 } };

export default class VouchHeader extends React.Component {
	state = {
		vouchHeader: {},
		headerOpenKey: [ 'vouchHeader' ]
	};

	itemChange({ target: { id, value } }) {
		const vouchHeader = { ...this.state.vouchHeader, [id]: value };
		this.setState({ vouchHeader });
		this.props.onChange(vouchHeader);
	}

	componentWillReceiveProps(nextProps) {
		const { vouchHeader } = nextProps;
		this.setState({ vouchHeader });
	}

	render() {
		const dep = this.props.dep || [];
		const wh = this.props.wh || [];
		const { code, crtdate, state, maker, odep, idep, owh, iwh, remark } = this.state.vouchHeader;
		return (
			<Collapse
				activeKey={this.state.headerOpenKey}
				onChange={headerOpenKey => {
					this.setState({ headerOpenKey });
				}}
			>
				<Panel
					key="vouchHeader"
					header={`${this.state.headerOpenKey.length === 0
						? formatterInfoString(this.state.vouchHeader)
						: '表头信息'}`}
				>
					<Form layout="horizontal" style={{ margin: '0 auto', maxWidth: 1200 }}>
						<Row>
							<Col span={8}>
								<FormItem label={'单据号'} {...formColStyle}>
									<Input disabled value={code} />
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={'创建日期'} {...formColStyle}>
									<Input disabled value={crtdate} />
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={'单据状态'} {...formColStyle}>
									<Input disabled value={state} />
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem label={'制单人'} {...formColStyle}>
									<Input disabled value={maker} />
								</FormItem>
							</Col>

							<Col span={8}>
								<FormItem label={'转出部门'} {...formColStyle}>
									<Input
										id="odep"
										disabled={state !== 0}
										value={odep}
										onChange={e => this.itemChange(e)}
									/>
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={'转入部门'} {...formColStyle}>
									<Input
										id="idep"
										disabled={state !== 0}
										value={idep}
										onChange={e => this.itemChange(e)}
									/>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<FormItem label={'转出仓库'} {...formColStyle}>
									<Input
										id="owh"
										disabled={state !== 0}
										value={owh}
										onChange={e => this.itemChange(e)}
									/>
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem label={'转入仓库'} {...formColStyle}>
									<Input
										id="iwh"
										disabled={state !== 0}
										value={iwh}
										onChange={e => this.itemChange(e)}
									/>
								</FormItem>
							</Col>
							<Col span={8}>
								<FormItem {...formColStyle} label={'单据备注'}>
									<TextArea
										id="remark"
										disabled={state !== 0}
										value={remark}
										onChange={e => this.itemChange(e)}
									/>
								</FormItem>
							</Col>
						</Row>
					</Form>
				</Panel>
			</Collapse>
		);
	}
}

const formatterInfoString = header => {
	const { code, crtdate, state, maker, odep, idep, owh, iwh, remark } = header;
	return `
	单据号：${code ? code : ''} |
	创建日期：${crtdate ? crtdate : ''} |
	单据状态：${state ? state : ''} |
	制单人：${maker ? maker : ''} |
	转出部门：${odep ? odep : ''} |
	转入部门：${idep ? idep : ''} |
	转出仓库：${owh ? owh : ''} |
	转入仓库：${iwh ? iwh : ''}
	`;
};
