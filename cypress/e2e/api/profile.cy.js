describe('Profile API Tests', () => {
    let authToken;
    let profileId;

    before(() => {
      // Login as admin or user who can access profile
      cy.request('POST', 'https://online-apotheke-v1-api.onrender.com/api/v1/auth/login', {
        email: "admin@gmail.com",
        password: "Lippetal@23",
      }).then((response) => {
        authToken = response.body.token;
        profileId = response.body.id
      });
    });

    it('Should retrieve a user profile', () => {
      cy.request({
        method: 'GET',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/profile/${profileId}`, 
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
      });
    });

    it('Should create a new user profile', () => {
      const profileData = {
        userId : profileId,
        address:"any adress"
      };
  
      cy.request({
        method: 'POST',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/profile`,
        body: profileData,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it('Should update an existing user profile', () => {
      const updatedProfileData = {
        // Add updated profile
      };
  
      cy.request({
        method: 'PUT',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/profile/${profileId}`,
        body: updatedProfileData,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(202);
        expect(response.body.data).to.be.an("object");
      });
    });

    it('Should delete an existing user profile', () => {
      cy.request({
        method: 'DELETE',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/profile/${profileId}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
});
