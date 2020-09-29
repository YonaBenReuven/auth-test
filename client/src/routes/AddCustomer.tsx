import React, { useState, useCallback } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useAuthFetch } from '@hilma/auth';

interface AddCustomerProps extends RouteComponentProps { }

const AddCustomer: React.FC<AddCustomerProps> = () => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	const authFetch = useAuthFetch();

	const classes = useStyles();

	const handleChange = (setState: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(event.target.value);
	}

	const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			await authFetch('/api/customer/create-customer', {
				method: "POST",
				body: JSON.stringify({ customerName: name, username, password })
			});
			history.push('/customers');
		} catch (error) {
			console.error(error);
		}
	}, [name, username, password, history]);

	return (
		<form onSubmit={handleSubmit} className={classes.layout}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h4" align="center">
					Add Customer
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							value={name}
							onChange={handleChange(setName)}
							required
							id="name"
							name="name"
							label="Name"
							fullWidth
							autoComplete="name"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={username}
							onChange={handleChange(setUsername)}
							required
							id="username"
							name="username"
							label="Username"
							fullWidth
							autoComplete="username"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={password}
							onChange={handleChange(setPassword)}
							required
							id="password"
							name="password"
							label="Password"
							fullWidth
							autoComplete="password"
						/>
					</Grid>
				</Grid>
				<div className={classes.buttons}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
					>
						Add
					</Button>
				</div>
			</Paper>
		</form>
	);
}

export default AddCustomer;

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

	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},

	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));