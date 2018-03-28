import React from 'react';
import ReactDOM from 'react-dom';

export default class GdMap extends React.Component {
	componentDidMount() {
		const mapEl = ReactDOM.findDOMNode(this);
		const searchEl = ReactDOM.findDOMNode(this.refs.search);
		const addressEl = ReactDOM.findDOMNode(this.refs.address);
		const lnglatEl = ReactDOM.findDOMNode(this.refs.lnglat);
		const onChange = this.props.onChange||function(){};

		AMap.plugin([ 'AMap.Marker', 'AMap.Geocoder', 'AMap.Autocomplete' ], function() {
			var map = new AMap.Map(mapEl, { resizeEnable: true });
			//搜索框
			let auto = new AMap.Autocomplete({ input: searchEl });
			//点标记
			let marker = new AMap.Marker({
				position: map.getCenter(),
				draggable: true,
				cursor: 'move',
				raiseOnDrag: true
			});
			marker.setMap(map);
			//转换
			let geocoder = new AMap.Geocoder();

			map.on('click', function(e) {
				const lng = e.lnglat.getLng();
				const lat = e.lnglat.getLat();

				map.setCenter(e.lnglat);
				marker.setPosition(e.lnglat);
				geocoder.getAddress(e.lnglat, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						onChange({ address: result.regeocode.formattedAddress, jd: lng, wd: lat });
						addressEl.value = result.regeocode.formattedAddress;
						lnglatEl.value = `经度:${lng} 纬度:${lat}`;
					} else {
						alert('获取位置信息失败!');
					}
				});
			});
			AMap.event.addListener(auto, 'select', e => {
				if (e.poi) {
					if (e.poi.location) {
						const { lng, lat } = e.poi.location;
						map.setZoom(15);
						map.setCenter(e.poi.location);
						marker.setPosition(e.poi.location);
						geocoder.getAddress(e.poi.location, function(status, result) {
							if (status === 'complete' && result.info === 'OK') {
								onChange({ address: result.regeocode.formattedAddress, jd: lng, wd: lat });
								addressEl.value = result.regeocode.formattedAddress;
								lnglatEl.value = `经度:${lng} 纬度:${lat}`;
							} else {
								alert('获取位置信息失败!');
							}
						});
					} else {
						alert('该范围暂无位置信息!');
					}
				}
			});
			AMap.event.addListener(marker, 'dragend', e => {
				const lng = e.lnglat.getLng();
				const lat = e.lnglat.getLat();

				map.setCenter(e.lnglat);
				geocoder.getAddress(e.lnglat, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						onChange({ address: result.regeocode.formattedAddress, jd: lng, wd: lat });
						addressEl.value = result.regeocode.formattedAddress;
						lnglatEl.value = `经度:${lng} 纬度:${lat}`;
					} else {
						alert('获取位置信息失败!');
					}
				});
			});
		});
	}

	render() {
		return (
			<div style={{ flex: '1', margin: '15px 0', background: '#fff' }}>
				<div
					style={{
						position: 'absolute',
						top: 5,
						right: 10,
						background: '#fff none repeat scroll 0 0',
						border: '1px solid #ccc',
						margin: '10px auto',
						padding: 6,
						zIndex: 1
					}}>
					<table>
						<tbody>
							<tr>
								<td>
									搜索:{' '}
									<input
										style={{ width: 400 }}
										ref="search"
										type="text"
										placeholder="请输入关键字进行搜索"
									/>
								</td>
							</tr>
							<tr>
								<td>
									地址: <input style={{ width: 400 }} ref="address" disabled />
								</td>
							</tr>
							<tr>
								<td>
									位置: <input style={{ width: 400 }} ref="lnglat" disabled />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
