import React from 'react';
import { Switch, Route } from 'react-router';

const PageRouter = ({ routes = [], children, ...props }) => (
	<Switch>
		{routes.map(route => (
			<Route key={route.key} path={`/${route.key}`} component={route.component} />
		))}
		{/* 404页面 */}
		<Route component={() => <div>404</div>} />
	</Switch>
);

export default PageRouter;
