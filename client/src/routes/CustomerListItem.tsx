import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import clsx from 'clsx';
import { useAuthFetch } from '@hilma/auth';
import { useAsyncEffect } from '@hilma/tools';

import { Customer } from '../types';

interface CustomerListItemProps extends RouteComponentProps { }

const CustomerListItem: React.FC<CustomerListItemProps> = () => {
	const [customer, setCustomer] = useState<Customer | null>(null);

	const history = useHistory();
	const params = useParams<{ customerId: string }>();

	const authFetch = useAuthFetch();

	const classes = useStyles();

	useEffect(() => {
		setCustomer(null);
	}, [params.customerId]);

	useAsyncEffect(async () => {
		try {
			if (customer) return;
			const data = await authFetch(`/api/customer/get-customers/${params.customerId}`);
			setCustomer(data);
		} catch (error) {
			console.error(error);
		}
	}, [customer]);

	const onMoneyClick = useCallback(async (operator: 'inc' | 'dec') => {
		try {
			await authFetch(`/api/customer/update-customer-money/${params.customerId}?operator=${operator}`, { method: "PATCH" });
			setCustomer(customer => customer ? ({
				...customer,
				money: operator === "dec" ? customer.money - 1000 : customer.money + 1000
			}) : null);
		} catch (error) {
			console.error(error);
		}
	}, [authFetch, params.customerId]);

	const onDeleteClick = useCallback(async () => {
		try {
			await authFetch(`/api/customer/delete-customer/${params.customerId}`, {
				method: "DELETE"
			});
			history.push('/customers');
		} catch (error) {
			console.error(error);
		}
	}, [params.customerId]);

	if (!customer) return null;

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h4" align="center" className={classes.title}>
					{customer.customerName}
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={4} className={clsx(classes.propertyTitle, classes.propertyValue)}>
						Name:
					</Grid>
					<Grid item xs={8} className={classes.propertyValue}>
						{customer.customerName}
					</Grid>
					<Grid item xs={4} className={clsx(classes.propertyTitle, classes.propertyValue)}>
						Username:
					</Grid>
					<Grid item xs={8} className={classes.propertyValue}>
						{customer.username}
					</Grid>
					<Grid item xs={4} className={clsx(classes.propertyTitle, classes.propertyValue)}>
						Money:
					</Grid>
					<Grid item xs={4} className={classes.propertyValue}>
						{customer.money}$
					</Grid>
					<Grid item xs={4} className={classes.propertyValue}>
						<IconButton onClick={() => onMoneyClick('dec')}>
							<RemoveCircleOutlinedIcon />
						</IconButton>
						<IconButton onClick={() => onMoneyClick('inc')}>
							<AddCircleOutlinedIcon />
						</IconButton>
					</Grid>
					<Grid item xs={4} className={clsx(classes.propertyTitle, classes.propertyValue)}>
						Items:
					</Grid>
					<Grid item xs={8} className={classes.propertyValue}>
						{customer.items.map(item => <Button key={item.id} variant="outlined">{item.itemName}</Button>)}
					</Grid>
				</Grid>
				<div className={classes.buttons}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={onDeleteClick}
					>
						Delete
				</Button>
				</div>
			</Paper>
		</main>
	);
}

export default CustomerListItem;

const useStyles = makeStyles(theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},

	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},

	title: {
		marginBottom: theme.spacing(6),
	},

	propertyTitle: {
		fontWeight: 'bold'
	},

	propertyValue: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap'
	},

	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},

	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));