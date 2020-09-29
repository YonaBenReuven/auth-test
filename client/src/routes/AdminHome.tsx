import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { UserProvider } from '@hilma/auth';
import { provide } from '@hilma/tools';

import { Topbar } from '../components';
import { usePushLocation } from '../hooks';

import CustomersList from './CustomersList';
import CustomerListItem from './CustomerListItem';
import ItemsList from './ItemsList';
import ItemsListItem from './ItemsListItem';
import AddCustomer from './AddCustomer';
import AddItem from './AddItem';

interface AdminHomeProps extends RouteComponentProps { }

const AdminHome: React.FC<AdminHomeProps> = () => {

	usePushLocation('/customers');

	return (
		<div>
			<Topbar links={[{ to: '/customers', title: 'Customers' }, { to: '/items', title: 'Items' }]} />
			<Switch>
				<Route path="/customers/:customerId" component={CustomerListItem} />
				<Route path="/customers" component={CustomersList} />
				<Route path="/add-customer" component={AddCustomer} />
				<Route path="/items/:itemId" component={ItemsListItem} />
				<Route path="/items" component={ItemsList} />
				<Route path="/add-item" component={AddItem} />
			</Switch>
		</div>
	);
}

export default provide(
	[UserProvider, { input: '/api/admin/get-admin', onError: console.error }]
)(AdminHome);