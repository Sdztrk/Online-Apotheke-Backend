describe('User API Tests', () => {
    let authToken;
    let userId;

    before(() => {
        cy.request('POST', 'https://online-apotheke-v1-api.onrender.com/api/v1/auth/login', {
          email: "admin@gmail.com",
          password: "Lippetal@23",
        }).then((response) => {
          authToken = response.body.token; 
        });
      });

    it('Should retrieve a list of users', () => {
      cy.request({
        method: 'GET',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/users`,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
    })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.be.an('array').and.to.have.length.gt(0); 
        });
    });


  
    it('Should create a new user', () => {
      const userData = {
        name: 'testuser123',
        email: 'testuser123@example.com',
        password: 'Test@123'
      };
  
      cy.request({
        method: 'POST',
        url: 'https://online-apotheke-v1-api.onrender.com/api/v1/users',
        body: userData,
        failOnStatusCode: false
      }).then((response) => {
        userId = response.body.data._id
        expect(response.status).to.eq(201);
        expect(response.body.data).to.be.an("object");
      });
    });
  
    it('Should retrieve a single user', () => {
      cy.request({
        method: 'GET',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/users/${userId}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('object');
      });
    });
  
    it('Should update an existing user', () => {
      const updatedUserData = {
        username: 'updateduser',
        email: 'updateduser@example.com',
      };
  
      cy.request({
        method: 'PUT',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/users/${userId}`,
        body: updatedUserData,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(202);
        expect(response.body.data).to.be.an("object");
      });
    });
  
    it('Should delete an existing user', () => {
      cy.request({
        method: 'DELETE',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/users/${userId}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
});
