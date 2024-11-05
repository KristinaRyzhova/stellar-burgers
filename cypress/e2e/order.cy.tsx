const orderUrl = 'http://localhost:4000/';

describe('доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit(orderUrl);
  });
});

describe('E2E Stellar-burger order test', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.visit(orderUrl);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Добавление ингредиентов и создание заказа', function () {
    // проверяем, что ингредиенты отсутствуют
    cy.get('[data-cy=burger-constructor-bun-top]').should('not.exist');
    cy.get('[data-cy=burger-constructor-main-ingredients] li').should(
      'have.length',
      0
    );
    cy.get('[data-cy=burger-constructor-bun-bottom]').should('not.exist');

    // добавляем ингредиенты
    cy.contains('Краторная булка N-200i').parents('li').find('button').click();
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

    // нажимаем кнопку оформления заказа
    cy.get('[data-cy=burger-constructor-submit]')
      .contains('Оформить заказ')
      .should('exist')
      .click();

    //Проверка открытия модального окна и номера заказа после успешного создания заказа
    cy.get('[data-cy=order-number]').contains('58734').should('exist');

    //Тест закрытия модального окна заказа по крестику
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');

    //Тест закрытия модального окна заказа по оверлей
    cy.get(`[data-cy='modal-overlay']`).click({ force: true });
    cy.get('#modals').should('be.empty');

    //Проверка очищения конструктора от ингредиентов
    cy.get('[data-cy=burger-constructor-bun-top]').should('not.exist');
    cy.get('[data-cy=burger-constructor-main-ingredients] li').should(
      'have.length',
      0
    );
    cy.get('[data-cy=burger-constructor-bun-bottom]').should('not.exist');
  });
});
