import React from 'react';
import BigNumber from 'bignumber.js';
import Print from 'rc-print';
import style from '../../style.less';
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_HALF_EVEN, DECIMAL_PLACES: 2 });

export default class DtpTransVouchPrint extends React.Component {
	render() {
		const printType = this.props.printType;
		const header = this.props.header || {};
		const details = this.props.details || []; //数据
		const detailsSize = details.length; //总条数
		let limit = 10; //每页显示条数
		if (printType === '3' || printType === '5' || printType === '6') {
			//A4及24x28纸张打印数量增加到25条
			limit = 25;
		}
		if (printType === '7') {
			//珠宝每页固定一条
			limit = 1;
		}
		let showPrice = true; //是否显示单价
		if (printType === '1' || printType === '4' || printType === '6') {
			showPrice = false;
		}
		let showSum = true; //是否显示总计
		if (printType === '1') {
			showSum = false;
		}
		let totalSummary = new BigNumber(0); //总金额
		let totalQuantity = 0; //总数量
		if (details.length <= 0) {
			return (
				<Print ref="print">
					<div hidden />
				</Print>
			);
		}
		const pageSize = detailsSize % limit === 0 ? detailsSize / limit : parseInt(detailsSize / limit) + 1; //总页数
		let pages = []; //打印页面集合
		for (let item of details) {
			totalQuantity += item.qty;
			totalSummary = totalSummary.plus(new BigNumber(item.price).times(item.qty));
		}
		for (let pageNo = 1; pageNo <= pageSize; pageNo++) {
			//打印页处理
			let pageQuantity = 0; //小计数量
			let pageSummary = new BigNumber(0); //小计金额
			const pageInfo = details.filter(
				(item, index) => index + 1 > (pageNo - 1) * limit && index + 1 <= pageNo * limit
			);

			let trs = pageInfo.map((item, index) => {
				pageQuantity += item.qty;
				pageSummary = pageSummary.plus(new BigNumber(item.price).times(item.qty));
				return formatTr(header.code, (pageNo - 1) * limit + index + 1, item, showPrice);
			});
			trs = trs.concat(emptyTrs(header.code, limit - pageInfo.length));

			pages.push(
				<div key={header.code + 'page' + pageNo} className={style.printInfo}>
					{/*标题  */}
					<div
						style={{
							textAlign: 'center',
							fontWeight: 800,
							fontSize: 24,
							marginBottom: 10
						}}
					>
						调拨业务
					</div>
					{/*调拨表头信息  */}
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ flexGrow: 1 }}>收货单位：{header.iwh}</div>
						<div style={{ flexGrow: 1 }}>单据号：{header.code}</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ flexGrow: 1 }}>发货单位：{header.owh}</div>
						<div style={{ flexGrow: 1 }}>　日期：{header.crtdate}</div>
					</div>

					<table className={style.vouchTable}>
						<thead style={{ textAlign: 'center' }}>
							<tr>
								<th style={{ width: '5%' }}>行号</th>
								<th style={{ width: '20%' }}>存货编码</th>
								<th style={{ width: '20%' }}>规格型号</th>
								<th style={{ width: '10%' }}>颜色</th>
								<th style={{ width: '10%' }}>数量</th>
								<th style={{ width: '15%' }}>零售单价</th>
								<th style={{ width: '20%' }}>结算金额</th>
							</tr>
						</thead>

						<tbody>
							{/*循环部分  */}
							{trs}
							{/*小计部分  */}
							<tr>
								<td />
								<td>本页小计</td>
								<td />
								<td />
								<td>{pageQuantity}</td>
								<td />
								<td>{showPrice ? pageSummary.toFixed(2) : ''}</td>
							</tr>
							{/*总计部分  */}
							{showSum ? (
								<tr>
									<td />
									<td>总计</td>
									<td />
									<td />
									<td>{totalQuantity}</td>
									<td />
									<td>{showPrice ? totalSummary.toFixed(2) : ''}</td>
								</tr>
							) : (
								''
							)}
						</tbody>
					</table>
					{/*制单信息  */}
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ flexGrow: 1 }}>制单人：{header.maker}</div>
						<div style={{ flexGrow: 1 }}>
							第{pageNo}页/共{pageSize}页
						</div>
					</div>
				</div>
			);
		}
		return (
			<Print ref="print">
				<div hidden>{pages}</div>
			</Print>
		);
	}
}

//行格式化
const formatTr = (code, index, item, showPrice) => (
	<tr key={code + index}>
		<td>{index}</td>
		<td>{item.cat}</td>
		<td>{item.model}</td>
		<td>{item.color}</td>
		<td>{item.qty}</td>
		<td>{showPrice ? item.price : ''}</td>
		<td>{showPrice ? new BigNumber(item.price).times(item.qty).toFixed(2) : ''}</td>
	</tr>
);

const emptyTrs = (code, times) => {
	let result = [];
	for (let i = 0; i < times; i++) {
		result.push(
			<tr key={code + 'emp' + i}>
				<td />
				<td />
				<td />
				<td />
				<td />
				<td />
				<td />
			</tr>
		);
	}
	return result;
};
