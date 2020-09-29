import React, { useEffect, useState, createContext } from 'react';
import { useUser } from '@hilma/auth';

import { Customer, Money } from '../types';

export const MoneyContext = createContext<[Money, React.Dispatch<React.SetStateAction<Money>>] | null>(null);

const MoneyProvider: React.FC = ({ children }) => {
	const moneyTuple = useState<Money>(null),
		[, setMoney] = moneyTuple;

	const user = useUser<Customer | null>();

	useEffect(() => {
		setMoney(user?.money ?? null);
	}, [user]);

	return (
		<MoneyContext.Provider value={moneyTuple}>
			{children}
		</MoneyContext.Provider>
	);
}

export default MoneyProvider;