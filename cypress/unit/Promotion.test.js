const axios = require("axios");

describe('promotion', () => {

    it('should collect the coupons', async() => {
        const getConnectionToken = await axios.post('http://localhost:3000/login', {
            email: process.env.TEST_CONNECTION_MAIL,
            password: btoa(process.env.TEST_CONNECTION_PASSWORD)
        })
        // Get token
        const promotions = await axios.get('http://localhost:3000/promotions', {
            headers: {'X-JWT': `${getConnectionToken.data.data.jwt.token}`},
        })
        console.log(promotions.data.code)
        expect(promotions.data.code).toEqual(200);
    });
});