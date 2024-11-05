/* it('Проверяем, что ингредиенты отсутствуют', () => {
      cy.get('[data-cy=empty-bun-top]').contains('Выберите булки');
      cy.get('[data-cy=empty-main-ingredients]').contains('Выберите начинку');
      cy.get('[data-cy=empty-bun-bottom]').contains('Выберите булки');
    }); */

/* it('Добавляем ингредиенты в заказ', () => {
      cy.contains('Краторная булка N-200i')
        .parents('li')
        .find('button')
        .click();
      cy.contains('Филе Люминесцентного тетраодонтимформа')
        .parents('li')
        .find('button')
        .click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('li')
        .find('button')
        .click();
    }); */

/* it('проверяем, что ингредиенты добавились', () => {
      cy.get('[data-cy=burger-constructor-bun-top]')
        .find('span')
        .contains('Краторная булка N-200i')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy=burger-constructor-main-ingredients]')
        .find('li')
        .contains('Филе Люминесцентного тетраодонтимформа')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy=burger-constructor-main-ingredients]')
        .find('li')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy=burger-constructor-bun-bottom]')
        .find('span')
        .contains('Краторная булка N-200i')
        .should('exist')
        .and('be.visible');
    }); */

/* it('Нажимаем кнопку "Оформить заказ" и проверяем, что ингредиенты добавились', () => {
      cy.get('button').contains('Оформить заказ').click();

      cy.wait('@postOrder')
        .its('request.body')
        .should('deep.equal', {
          ingredients: [
            '645d69a5c3f7b9001cfa093b',
            '643d69a5c3f7b9001cfa093c',
            '645d69a5c3f7b9001cfa093e'
          ]
        });
    }); */

/* it('Проверка отображения модального окна с верным номером заказа при клике на кнопку оформления заказа', () => {
        //cy.get('#modals').should('be.empty');
        cy.get('[data-cy=ingredientId-643d69a5c3f7b9001cfa093c]').click();
        cy.get('#modals').should('be.not.empty');

        cy.get('button').contains('Оформить заказ').click();
        cy.get('#modals').should('exist');
        //cy.get('#modals').contains('57929');
      }); */

/* it('Проверка очистки конструктора бургера от добавленных ингредиентов', () => {
        cy.get('[data-cy=burger-constructor-bun-top]').should('not.exist');
        cy.get('[data-cy=burger-constructor-bun-bottom]').should('not.exist');
      }); */



















      import { accessToken, refreshToken } from '../fixtures/login.json';
const baseUrl = 'http://localhost:4000/';

describe('доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit(baseUrl);
  });
});

describe('Тестирование приложения stellar-burger', () => {
  /*   describe('Тестирование конструктора бургеров', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      });
      cy.visit(baseUrl);
    });

    it('Должен добавлять ингредиент по клику на кнопку "Добавить"', () => {
      // проверяем, что ингредиенты отсутствуют
      cy.get('[data-cy=burger-constructor-bun-top]').should('not.exist');
      cy.get('[data-cy=burger-constructor-main-ingredients] li').should(
        'have.length',
        0
      );
      cy.get('[data-cy=burger-constructor-bun-bottom]').should('not.exist');

      // добавляем ингредиенты
      cy.contains('Краторная булка N-200i')
        .parents('li')
        .find('button')
        .click();
      cy.contains('Филе Люминесцентного тетраодонтимформа')
        .parents('li')
        .find('button')
        .click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('li')
        .find('button')
        .click();

      // проверяем, что ингредиенты добавились
      cy.get('[data-cy=burger-constructor-bun-top]')
        .find('span')
        .contains('Краторная булка N-200i')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy=burger-constructor-main-ingredients]')
        .find('li')
        .contains('Филе Люминесцентного тетраодонтимформа')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy=burger-constructor-main-ingredients]')
        .find('li')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist')
        .and('be.visible');
      cy.get('[data-cy=burger-constructor-bun-bottom]')
        .find('span')
        .contains('Краторная булка N-200i')
        .should('exist')
        .and('be.visible');
    });

    it('Тест открытия модального окна ингредиента', function () {
      // проверяем, что модальное окно отсутствует перед кликом
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy=ingredientId-643d69a5c3f7b9001cfa093c]').click();
      cy.get('#modals').should('be.not.empty');
      cy.get('#modals').should('contain', 'Краторная булка N-200i');
    });

    it('Тест закрытия модального окна ингредиента по крестику', function () {
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy=ingredientId-643d69a5c3f7b9001cfa093c]').click();
      cy.get('#modals').should('be.not.empty');
      cy.get('#modals').should('contain', 'Краторная булка N-200i');
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
    });

    it('Тест закрытия модального окна ингредиента по оверлей', function () {
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy=ingredientId-643d69a5c3f7b9001cfa093c]').click();
      cy.get('#modals').should('be.not.empty');
      cy.get('#modals').should('contain', 'Краторная булка N-200i');
      cy.get(`[data-cy='modal-overlay']`).click({ force: true });
      cy.get('#modals').should('be.empty');
    });

    it('Проверка отображения в модальном окне данных того ингредиента, по которому сделали клик', () => {
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy=ingredientId-643d69a5c3f7b9001cfa093c]').click();
      cy.get('#modals').should('be.not.empty');
      cy.get('.text_type_main-default').should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get('img').should(
        'have.attr',
        'src',
        'https://code.s3.yandex.net/react/code/bun-02.png'
      );
      cy.get('.text_type_digits-default').should('contain', '1255');
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('not.be.visible');
    });
  }); */

  describe('Проверка создания заказа и очистки конструктора', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      });
      cy.intercept('GET', 'api/login', { fixture: 'login.json' });
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/profile/orders', {
        fixture: 'order.json'
      });
      cy.setCookie('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      cy.visit(baseUrl);
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    });

    /* it('Проверяем, что пользователь овторизовался', () => {
      cy.get('[data-cy=userName]').contains('userName').should('exist');
    }); */

    it('Проверяем, что ингредиенты отсутствуют', () => {
      cy.get('[data-cy=empty-bun-top]').contains('Выберите булки');
      cy.get('[data-cy=empty-main-ingredients]').contains('Выберите начинку');
      cy.get('[data-cy=empty-bun-bottom]').contains('Выберите булки');
    });

    it('Добавляем ингредиенты в заказ', () => {
      cy.contains('Краторная булка N-200i')
        .parents('li')
        .find('button')
        .click();
      cy.contains('Филе Люминесцентного тетраодонтимформа')
        .parents('li')
        .find('button')
        .click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parents('li')
        .find('button')
        .click();
    });

    it('проверяем, что ингредиенты добавились', () => {
      // Проверяем, что ингредиенты были добавлены в конструктор
      cy.get('[data-cy=burger-constructor-bun-top]')
        .find('span')
        .contains('Краторная булка N-200i')
        .should('exist')
        .and('be.visible');

      cy.get('[data-cy=burger-constructor-main-ingredients]')
        .find('li')
        .contains('Филе Люминесцентного тетраодонтимформа')
        .should('exist')
        .and('be.visible');

      cy.get('[data-cy=burger-constructor-main-ingredients]')
        .find('li')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist')
        .and('be.visible');

      cy.get('[data-cy=burger-constructor-bun-bottom]')
        .find('span')
        .contains('Краторная булка N-200i')
        .should('exist')
        .and('be.visible');

      // Также можно проверить, что количество добавленных ингредиентов совпадает с ожидаемым
      cy.get('[data-cy=burger-constructor-main-ingredients] li').should(
        'have.length',
        2
      ); // 2 основных ингредиента добавлено, не считая булки
    });
  });
});



      /* it('Нажимаем кнопку "Оформить заказ" и проверяем, что ингредиенты добавились', () => {
      cy.get('button').contains('Оформить заказ').click();

      // Ждем запрос на создание заказа и проверяем данные
    });

    /* it('Проверка отображения модального окна с верным номером заказа при клике на кнопку оформления заказа', () => {}); */

    /* it('Проверка очистки конструктора бургера от добавленных ингредиентов', () => {
        cy.get('[data-cy=empty-bun-top]').contains('Выберите булки');
        cy.get('[data-cy=empty-main-ingredients]').contains('Выберите начинку');
        cy.get('[data-cy=empty-bun-bottom]').contains('Выберите булки');
      }); */
