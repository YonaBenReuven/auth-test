import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useLogout, useUser } from '@hilma/auth';

import { Admin, Customer } from '../types';

export interface TopbarProps {
	links?: Array<{ to: string, title: string }>;
}

const Topbar: React.FC<TopbarProps> = ({ links = [] }) => {

	const user = useUser<(Customer & Admin) | null>();
	const logout = useLogout();

	const classes = useStyles();

	return (
		<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
					Hello {user?.adminName || user?.customerName || ''}
				</Typography>
				<nav>
					{links.map(link => (
						<Link key={link.title} variant="button" color="textPrimary" href={`#${link.to}`} className={classes.link}>
							{link.title}
						</Link>
					))}
				</nav>
				<Button onClick={logout} color="primary" variant="outlined" className={classes.link}>Logout</Button>
			</Toolbar>
		</AppBar>
	);
}

const useStyles = makeStyles(theme => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},

	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},

	toolbar: {
		flexWrap: 'wrap',
	},

	toolbarTitle: {
		flexGrow: 1,
	},

	link: {
		margin: theme.spacing(1, 1.5),
		textDecoration: 'none',
	}
}));

export default Topbar;