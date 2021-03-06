export const API_PORT = 'http://localhost:3000';

export const MENU_DOC = `
manager{ depManage whManage } 
report{ vouch ranking } echarts gdMap 
`;

export const MENU_SETTING = [
	{
		key: 'report',
		name: '业务/报表',
		icon: 'table'
	},
	{
		key: 'vouch',
		name: '调拨业务'
	},
	{
		key: 'ranking',
		name: '排名信息'
	},
	{
		key: 'echarts',
		name: 'echarts',
		icon: 'pie-chart'
	},
	{
		key: 'gdMap',
		name: '高德地图',
		icon: 'global'
	},
	{
		key: 'manager',
		name: '管理',
		icon: 'appstore'
	},
	{
		key: 'userManage',
		name: '用户管理'
	},
	{
		key: 'depManage',
		name: '部门管理'
	},
	{
		key: 'whManage',
		name: '仓库管理'
	}
];
