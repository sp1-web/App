const axios = require("axios");
describe('Promotion', () => {
    function login(){
        cy.visit(`${Cypress.env('TEST_URL')}/login`);
        cy.get('input[name="email"]').type(Cypress.env('TEST_ADMIN_CONNECTION_MAIL'))
        cy.get('input[name="password"]').type(Cypress.env('TEST_ADMIN_CONNECTION_PASSWORD'))
        cy.get('button').click()
    }

    function logout(){
        cy.get('#logout').click()
        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('TEST_URL')}/login`)
        });
    }

    it('should display promotion', async()=> {
        const getConnectionToken = await axios.post('http://localhost:3000/login', {
            email: Cypress.env('TEST_ADMIN_CONNECTION_MAIL'),
            password: btoa(Cypress.env('TEST_ADMIN_CONNECTION_PASSWORD'))
        })
        const promotions = await axios.get('http://localhost:3000/me/promotions', {
            headers: {'X-JWT': `${getConnectionToken.data.data.jwt.token}`},
        })
        login()
        if(promotions.data.data.length > 1){
            cy.get('li').should('not.have.length', 0)
        }
        logout()
    });
});