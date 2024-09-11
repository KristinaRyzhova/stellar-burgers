import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import { selectorOrders } from '../../services/slices/feedsSlice/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectorOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
