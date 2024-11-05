const baseUrl = 'http://localhost:4000/';

describe('доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit(baseUrl);
  });
});

describe('Тестирование приложения stellar-burger', () => {
  describe('Тестирование конструктора бургеров', () => {
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
  });
});
