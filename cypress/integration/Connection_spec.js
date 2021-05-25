// eslint-disable-next-line no-undef,no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// eslint-disable-next-line no-undef
describe('Connection', () => {

  function login(){
    cy.visit(`${Cypress.env('TEST_URL')}/login`);
    cy.get('input[name="email"]').type(Cypress.env('TEST_CONNECTION_MAIL'))
    cy.get('input[name="password"]').type(Cypress.env('TEST_CONNECTION_PASSWORD'))
    cy.get('button').click()
  }

  function logout(){
    cy.get('#logout').click()
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${Cypress.env('TEST_URL')}/login`)
    });
  }

  it('should register', function() {
    cy.visit(`${Cypress.env('TEST_URL')}/login`);
    cy.get('#register').click()
    cy.get('input[name="email"]').type(Cypress.env('TEST_CONNECTION_MAIL'))
    cy.get('input[name="fistname"]').type('test')
    cy.get('input[name="password"]').type(Cypress.env('TEST_CONNECTION_PASSWORD'))
    cy.get('input[name="password_confirm"]').type(Cypress.env('TEST_CONNECTION_PASSWORD'))
    cy.get('button').click()
    cy.get('#successRegister').should('be.visible')
  });


  it('should not register, the user already exists', function() {
    cy.visit(`${Cypress.env('TEST_URL')}/login`);
    cy.get('#register').click()
    cy.get('input[name="email"]').type(Cypress.env('TEST_CONNECTION_MAIL'))
    cy.get('input[name="fistname"]').type('test')
    cy.get('input[name="password"]').type(Cypress.env('TEST_CONNECTION_PASSWORD'))
    cy.get('input[name="password_confirm"]').type(Cypress.env('TEST_CONNECTION_PASSWORD'))
    cy.get('button').click()
    cy.get('#errorRegister').should('be.visible')
  });

  it('should login', function() {
    login()
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${Cypress.env('TEST_URL')}/`)
    });
    logout()
  });

  it('should display qrcode scanner', function() {
    login()
    cy.get('#qrcodeScanner').click()
    cy.get('#StreamBarcodeReader').should('be.visible');
    logout()
  });

  it('should logout', function() {
    login()
    logout()
  });
});
