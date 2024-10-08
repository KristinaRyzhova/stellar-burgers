import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetUserOrders,
  selectorIsLoading,
  selectorOrders
} from '../../services/slices/feedsSlice/feedsSlice';
import React from 'react';
import { Preloader } from '../../components/ui/preloader/preloader';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectorOrders);
  const dispatch = useDispatch();
  const loading = useSelector(selectorIsLoading);

  useEffect(() => {
    dispatch(fetchGetUserOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  const MemoProfileOrdersUI = React.memo(ProfileOrdersUI);

  return <MemoProfileOrdersUI orders={orders} />;
};
