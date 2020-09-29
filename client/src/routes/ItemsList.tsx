import React, { useState } from 'react';
import { Link, RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useAuthFetch } from '@hilma/auth';
import { useAsyncEffect } from '@hilma/tools';

import { Title } from '../components';
import { Item } from '../types';

interface ItemsListProps extends RouteComponentProps { }

const ItemsList: React.FC<ItemsListProps> = () => {
	const [items, setItems] = useState<Item[]>([]);

	const match = useRouteMatch();

	const authFetch = useAuthFetch();

	const classes = useStyles();

	useAsyncEffect(async () => {
		try {
			const items = await authFetch('/api/item/get-items');
			setItems(items);
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Title>Items</Title>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>Money</TableCell>
											<TableCell align="right">See more</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{items.map(item => (
											<TableRow key={item.id}>
												<TableCell>{item.itemName}</TableCell>
												<TableCell>{item.price}$</TableCell>
												<TableCell align="right">
													<Link key={item.id} to={`${match.url}/${item.id}`}>
														<IconButton>
															<InfoOutlinedIcon />
														</IconButton>
													</Link>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
								<Link to="/add-item">
									<Fab color="primary" aria-label="add" className={classes.fab}>
										<AddIcon />
									</Fab>
								</Link>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}

export default ItemsList;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},

	appBarSpacer: theme.mixins.toolbar,

	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},

	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},

	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		position: 'relative',
		paddingBottom: 70 + theme.spacing(2)
	},

	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));