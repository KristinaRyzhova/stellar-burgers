import { FC, useMemo } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectorOrders,
  selectorTotalOrders,
  selectorTodayOrders
} from '../../services/slices/feedsSlice/feedsSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(selectorOrders);
  const total = useSelector(selectorTotalOrders);
  const totalToday = useSelector(selectorTodayOrders);

  const readyOrders = useMemo(() => getOrders(orders, 'done'), [orders]);
  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), [orders]);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total: total, totalToday: totalToday }}
    />
  );
};
