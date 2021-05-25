const axios = require("axios");

describe('Delete', () => {

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    it('should delete user', async()=> {
        const login = await axios.post('http://localhost:3000/login', {
            email: process.env.TEST_CONNECTION_MAIL,
            password: btoa(process.env.TEST_CONNECTION_PASSWORD)
        })

        const id = parseJwt(login.data.data.jwt.token).id;
        const deleteUser = await axios.delete(`http://localhost:3000/users/${id}`, {
            headers: {'X-Tests-Token': process.env.SECRET_TOKEN_TEST}
        })
        expect(deleteUser.status).toEqual(200);
    });
});