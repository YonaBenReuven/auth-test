import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Item } from '../types';

export interface StoreItemProps {
	onClick(id: number): void;
	item: Item;
	canBuy?: boolean;
}

const StoreItem: React.FC<StoreItemProps> = ({ item, onClick, canBuy = false }) => {

	const classes = useStyles();

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{item.itemName}
					</Typography>
					<Typography>
						{item.price}$
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" color="primary" onClick={() => onClick(item.id)}>
						{canBuy ? 'buy' : 'remove'}
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}

export default StoreItem;

const useStyles = makeStyles({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},

	cardContent: {
		flexGrow: 1,
	},
});