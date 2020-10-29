import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { provide } from '@hilma/tools';
import { UserProvider } from '@hilma/auth';

import { usePushLocation } from '../hooks';
import { Topbar } from '../components';
import { MoneyProvider } from '../context';

import Store from './Store';
import MyItems from './MyItems';

interface CustomerHomeProps extends RouteComponentProps { }

const CustomerHome: React.FC<CustomerHomeProps> = () => {

	usePushLocation('/store');

	return (
		<div>
			<Topbar links={[{ to: '/store', title: 'Store' }, { to: '/my-items', title: 'My Items' }]} />
			<Switch>
				<Route path="/store" component={Store} />
				<Route path="/my-items" component={MyItems} />
			</Switch>
		</div>
	);
}

export default provide(
	[UserProvider, { url: '/api/customer/get-customer', onError: console.error }],
	MoneyProvider
)(CustomerHome);