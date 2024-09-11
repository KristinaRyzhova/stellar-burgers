import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchFeeds,
  selectorOrders
} from '../../services/slices/feedsSlice/feedsSlice';
import { useDispatch } from '../../services/store';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectorOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetFeeds;
      }}
    />
  );
};
