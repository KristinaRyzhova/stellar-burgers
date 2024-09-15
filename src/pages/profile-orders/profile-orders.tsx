import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetUserOrders,
  selectorOrders
} from '../../services/slices/feedsSlice/feedsSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectorOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
