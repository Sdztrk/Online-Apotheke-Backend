describe('Authentication API Tests', () => {
    let authToken;

    it('Should register a new user', () => {
        const userData = {
            name: "user12345",
            email: "user12345@gmail.com",
            password: "Lippetal@23"
        };

        cy.request({
            method: 'POST',
            url: 'https://online-apotheke-v1-api.onrender.com/api/auth/register',
            body: userData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
            expect(response.body.token).to.exist;
        });
    });

    it('Should login an existing user', () => {
        const loginData = {
            email: "user12345@gmail.com",
            password: "Lippetal@23"
        };

        cy.request({
            method: 'POST',
            url: 'https://online-apotheke-v1-api.onrender.com/api/auth/login',
            body: loginData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
            expect(response.body.token).to.exist;
            authToken = response.body.token;
        });
    });


    it('Should update user password', () => {
        const newPasswordData = {
            newPassword:"Lippetal@234"
        };

        cy.request({
            method: 'PUT',
            url: 'https://online-apotheke-v1-api.onrender.com/api/auth/password',
            body: newPasswordData,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
        });
    });

    it('Should logout the user', () => {
        cy.request({
            method: 'ALL',
            url: 'https://online-apotheke-v1-api.onrender.com/api/auth/logout',
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.be.true;
        });
    });
});
