import { v4 as uuidv4 } from 'uuid';
import burgerConstructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient
} from '../burgerConstructorSlice/burgerConstructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

describe('тесты burgerConstructorSlice, проверяющие работу экшена добавления ингредиента, удаления ингредиента, изменения порядка ингредиентов в начинке', () => {
  it('тест, проверяющий добавление ингредиента', () => {
    const newIngredient = {
      _id: '123',
      type: 'sauce',
      name: 'Tomato Sauce',
      proteins: 5,
      fat: 1,
      carbohydrates: 4,
      calories: 50,
      price: 10,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url'
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          ...initialState.constructorItems.ingredients,
          { ...newIngredient, id: 'test-uuid' }
        ]
      }
    };

    expect(
      burgerConstructorReducer(initialState, addIngredient(newIngredient))
    ).toEqual(expectedState);
  });

  it('тест, проверяющий удаление ингредиента', () => {
    const initialIngredient = {
      _id: '123',
      type: 'sauce',
      name: 'Tomato Sauce',
      proteins: 5,
      fat: 1,
      carbohydrates: 4,
      calories: 50,
      price: 10,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url',
      id: 'test-uuid'
    };

    const modifiedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [initialIngredient]
      }
    };

    const expectedState = { ...initialState };

    expect(
      burgerConstructorReducer(
        modifiedState,
        removeIngredient(initialIngredient)
      )
    ).toEqual(expectedState);
  });

  it('тест, проверяющий перемещение интредиента вверх', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '1',
            type: 'sauce',
            name: 'Ketchup',
            proteins: 0,
            fat: 0,
            carbohydrates: 10,
            calories: 30,
            price: 5,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '1'
          },
          {
            _id: '2',
            type: 'vegetable',
            name: 'Lettuce',
            proteins: 1,
            fat: 0,
            carbohydrates: 2,
            calories: 5,
            price: 3,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '2'
          }
        ]
      }
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '2',
            type: 'vegetable',
            name: 'Lettuce',
            proteins: 1,
            fat: 0,
            carbohydrates: 2,
            calories: 5,
            price: 3,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '2'
          },
          {
            _id: '1',
            type: 'sauce',
            name: 'Ketchup',
            proteins: 0,
            fat: 0,
            carbohydrates: 10,
            calories: 30,
            price: 5,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '1'
          }
        ]
      }
    };

    expect(
      burgerConstructorReducer(initialStateWithIngredients, upIngredient(1))
    ).toEqual(expectedState);
  });

  it('тест, проверяющий перемещение интредиента вниз', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '1',
            type: 'sauce',
            name: 'Ketchup',
            proteins: 0,
            fat: 0,
            carbohydrates: 10,
            calories: 30,
            price: 5,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '1'
          },
          {
            _id: '2',
            type: 'vegetable',
            name: 'Lettuce',
            proteins: 1,
            fat: 0,
            carbohydrates: 2,
            calories: 5,
            price: 3,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '2'
          }
        ]
      }
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '2',
            type: 'vegetable',
            name: 'Lettuce',
            proteins: 1,
            fat: 0,
            carbohydrates: 2,
            calories: 5,
            price: 3,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '2'
          },
          {
            _id: '1',
            type: 'sauce',
            name: 'Ketchup',
            proteins: 0,
            fat: 0,
            carbohydrates: 10,
            calories: 30,
            price: 5,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url',
            id: '1'
          }
        ]
      }
    };

    expect(
      burgerConstructorReducer(initialStateWithIngredients, downIngredient(0))
    ).toEqual(expectedState);
  });
});
