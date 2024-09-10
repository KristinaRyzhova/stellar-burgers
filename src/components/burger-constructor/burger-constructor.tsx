import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectorConstructorItems,
  selectorOrderModalData,
  selectorOrderRequest
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectorConstructorItems);
  const orderRequest = useSelector(selectorOrderRequest);
  const orderModalData = useSelector(selectorOrderModalData);

  /* const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const idIngredients = constructorItems.ingredients.map((item) => item._id);
    dispatch(
      sendOrder([
        constructorItems.bun._id,
        ...idIngredients,
        constructorItems.bun._id
      ])
    );
  }; */

  const onOrderClick = () => {};

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
