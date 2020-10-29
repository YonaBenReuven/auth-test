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
import Axios from 'axios';
import { useAsyncEffect } from '@hilma/tools';

import { Item } from '../types';

interface ItemListItemProps extends RouteComponentProps { }

const ItemListItem: React.FC<ItemListItemProps> = () => {
	const [item, setItem] = useState<Item | null>(null);

	const history = useHistory();
	const params = useParams<{ itemId: string }>();

	const classes = useStyles();

	useEffect(() => {
		setItem(null);
	}, [params.itemId]);

	useAsyncEffect(async () => {
		try {
			if (item) return;
			const { data } = await Axios.get(`/api/item/get-items/${params.itemId}`);
			setItem(data);
		} catch (error) {
			console.error(error);
		}
	}, [item]);

	const onPriceClick = useCallback(async (operator: 'inc' | 'dec') => {
		try {
			await Axios.patch(`/api/item/update-item-price/${params.itemId}?operator=${operator}`);
			setItem(item => item ? ({
				...item,
				price: operator === "dec" ? item.price - 1000 : item.price + 1000
			}) : null);
		} catch (error) {
			console.error(error);
		}
	}, [params.itemId]);

	const onDeleteClick = useCallback(async () => {
		try {
			await Axios.delete(`/api/item/delete-item/${params.itemId}`);
			history.push('/items');
		} catch (error) {
			console.error(error);
		}
	}, [params.itemId, history]);

	if (!item) return null;

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h4" align="center" className={classes.title}>
					{item.itemName}
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={4} className={clsx(classes.propertyTitle, classes.propertyValue)}>
						Name:
					</Grid>
					<Grid item xs={8} className={classes.propertyValue}>
						{item.itemName}
					</Grid>
					<Grid item xs={4} className={clsx(classes.propertyTitle, classes.propertyValue)}>
						Price:
					</Grid>
					<Grid item xs={4} className={classes.propertyValue}>
						{item.price}$
					</Grid>
					<Grid item xs={4} className={classes.propertyValue}>
						<IconButton onClick={() => onPriceClick('dec')}>
							<RemoveCircleOutlinedIcon />
						</IconButton>
						<IconButton onClick={() => onPriceClick('inc')}>
							<AddCircleOutlinedIcon />
						</IconButton>
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

export default ItemListItem;

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
		alignItems: 'center'
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