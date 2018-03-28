import React from 'react';
import { push } from 'react-router-redux';
import { Menu, Icon } from 'antd';
import { buildRelationFromDoc } from '../lib/relation';

const SubMenu = Menu.SubMenu;

const PageMenu = ({ menuDoc, menuSetting, onSelect, style }) => {
	const relation = buildRelationFromDoc(menuDoc, menuSetting);
	return (
		<Menu
			mode="horizontal"
			style={{ lineHeight: '60px', ...style }}
			onSelect={({ key }) => onSelect(key)}>
			{formatMenuItems(relation)}
		</Menu>
	);
};

const formatMenuItems = configs =>
	configs.map(config => {
		const { key, name = key, icon, children } = config;
		if (children) {
			return (
				<SubMenu key={key} title={<MenuTitle {...config} name={name} />}>
					{formatMenuItems(children)}
				</SubMenu>
			);
		} else {
			return (
				<Menu.Item key={key}>
					{icon ? <Icon type={icon} /> : null}
					{name}
				</Menu.Item>
			);
		}
	});

const MenuTitle = ({ icon, name }) => {
	if (icon) {
		return (
			<span>
				<Icon type={icon} />
				<span>{name}</span>
			</span>
		);
	} else {
		return <span>{name}</span>;
	}
};

export default PageMenu;
