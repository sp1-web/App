import Quagga from 'quagga';
import { Decoder } from '@nuintun/qrcode';

describe('Qrcode', () => {
    function login() {
        cy.visit(`${Cypress.env('TEST_URL')}/login`);
        cy.get('input[name="email"]').type(Cypress.env('TEST_CONNECTION_MAIL'))
        cy.get('input[name="password"]').type(Cypress.env('TEST_CONNECTION_PASSWORD'))
        cy.get('button').click()
    }

    function logout() {
        cy.get('#logout').click()
        cy.location().should((loc) => {
            expect(loc.href).to.eq(`${Cypress.env('TEST_URL')}/login`)
        });
    }

    it('should display qrcode scanner', function () {
        login()
        cy.get('#qrcodeScanner').click()
        cy.get('#StreamBarcodeReader').should('be.visible');
        logout()
    });


    it.only('should decode qrcode', async() => {
        const qrcode = new Decoder();
        const token = await qrcode
            .scan('https://i.imgur.com/BoO1WVs.png')
        expect(token.data).equal("57F9D26A-E145-4F1D-9C12-DE7DAD3EA864");
    });


    // it.only('Read QR Code form Image', async() => {
    //     const Image = await cy.fixture('../fixtures/qr-tee-shirt-1.png');
    //     const plop = await new Decoder(Image);
    //     console.log(plop)
    //
    //     // const plop = await qrcode.scan('../fixtures/qr-tee-shirt-1.png')
    //     cy.log(plop)
    // })
});