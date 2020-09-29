import { useContext } from 'react';

import { MoneyContext } from '../context';

const useMoney = () => useContext(MoneyContext)!;

export default useMoney;