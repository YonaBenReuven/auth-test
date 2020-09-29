import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const usePushLocation = (path: string) => {
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/') history.push(path);
	}, []);
}

export default usePushLocation;