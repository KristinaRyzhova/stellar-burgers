describe('Тестирование создания заказа  stellar-burger', () => {
  const testUrl = 'http://localhost:4000';

  beforeEach(function () {
    cy.setCookie('accessToken', '12345');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' });
    cy.visit(testUrl);
  });

  afterEach(function () {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Проверяем, что ингредиенты отсутствуют', () => {
    cy.get('[data-cy=empty-bun-top]').contains('Выберите булки');
    //cy.get('[data-cy=empty-main-ingredients]').contains('Выберите начинку');
    //cy.get('[data-cy=empty-bun-bottom]').contains('Выберите булки');
  });

  it('Добавляем ингредиенты в заказ', () => {
    cy.contains('Краторная булка N-200i').parents('li').find('button').click();
    /* cy.contains('Филе Люминесцентного тетраодонтимформа')
      .parents('li')
      .find('button')
      .click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .click(); */
  });

  it('проверяем, что ингредиенты добавились', () => {
    cy.get('[data-cy=burger-constructor-bun-top]')
      .find('span')
      .contains('Краторная булка N-200i')
      .should('exist')
      .and('be.visible');
    /* cy.get('[data-cy=burger-constructor-main-ingredients]')
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
      .and('be.visible'); */
  });

  /* it('Нажимаем кнопку "Оформить заказ" и проверяем, что ингредиенты добавились', () => {
    cy.get('button').contains('Оформить заказ').click();
  }); */

  /* it('Проверяем, что пользователь овторизовался', () => {
    cy.wait('@getUser'); // Ждем ответа на запрос пользователя
    cy.get('[data-cy="userName"]').contains('Кристина').should('exist');
  }); */
});
