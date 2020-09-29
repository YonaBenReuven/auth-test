import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAsyncEffect } from '@hilma/tools';
import { useAuthFetch } from '@hilma/auth';

import { Item } from '../types';
import { StoreItem } from '../components';
import { useMoney } from '../hooks';

interface StoreProps extends RouteComponentProps { }

const Store: React.FC<StoreProps> = () => {
	const [items, setItems] = useState<Item[]>([]);

	const authFetch = useAuthFetch();

	const classes = useStyles();
	const [money, setMoney] = useMoney();

	useAsyncEffect(async () => {
		try {
			const items = await authFetch('/api/customer/get-not-bought');
			setItems(items);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const onBuy = useCallback(async (id: number) => {
		try {
			await authFetch(`/api/customer/buy-item/${id}`, {
				method: "POST"
			});
			const item = items.find(item => item.id === id);
			setMoney(money => money !== null ? money - (item?.price ?? 0) : null);
			setItems(items => items.filter(item => item.id !== id));
		} catch (error) {
			console.error(error);
		}
	}, [authFetch, items]);

	return (
		<main>
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
						Store {money}$
            			</Typography>
				</Container>
			</div>
			<Container className={classes.cardGrid} maxWidth="md">
				<Grid container spacing={4}>
					{items.map(item => (
						<StoreItem
							key={item.id}
							canBuy
							item={item}
							onClick={onBuy}
						/>
					))}
				</Grid>
			</Container>
		</main>
	);
}

export default Store;

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},

	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
}));