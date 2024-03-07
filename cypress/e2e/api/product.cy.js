

describe('Product API Tests', () => {
    let authToken;
    let productId;

    it('Should retrieve a list of products', () => {
      cy.request('GET', 'https://online-apotheke-v1-api.onrender.com/api/v1/product')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.be.an('array').and.to.have.length.gt(0); 
        });
    });

    before(() => {
      cy.request('POST', 'https://online-apotheke-v1-api.onrender.com/api/v1/auth/login', {
        email: "admin@gmail.com",
        password: "Lippetal@23",
      }).then((response) => {
        authToken = response.body.token; 
      });
  
    });
  
    it('Should create a new product', () => {
      const productData = {
        name: 'BUSCOPAN',
        brand: 'Sanofi-Aventis Deutschland GmbH Gb',
        manufacturer: 'Sanofi-Aventis Deutschland GmbH Gb',
        pzn: 161996,
        image: 'https://cdn8.apopixx.de/1000/web_schraeg/00161996.jpg',
        distributionForm: 'Tablet',
        packageSize: '100',
        illness: 'Rachen',
        manufacturerCountry: 'Deutschland',
        type: 'Arzneimittel',
        discount: true,
        activeIngredient: 'Xylometazolin hydrochlorid',
        dosage: 'Die empfohlene Dosis beträgt Bei Schulkindern und Erwachsenen können Sie bis zu 3-mal täglich 1 Sprühstoß in jede Nasenöffnung einbringen. Überschreiten Sie nicht die empfohlene Dosierung und die Anwendungsdauer!    Dauer der Anwendung Wenden Sie das Präparat ohne ärztlichen Rat nicht länger als 7 Tage an. Eine erneute Anwendung sollte erst nach einer Pause von mehreren Tagen erfolgen. Zur Anwendungsdauer bei Kindern sollte grundsätzlich der Arzt befragt werden.',
        sideEffects: 'Wie alle Arzneimittel kann auch dieses Arzneimittel Nebenwirkungen haben, die aber nicht bei jedem auftreten müssen. Bei den Häufigkeitsangaben zu Nebenwirkungen werden folgende Kategorien zugrunde gelegt: Sehr häufig: kann mehr als 1 von 10 Behandelten betreffen Häufig: kann bis zu 1 von 10 Behandelten betreffen Gelegentlich: kann bis zu 1 von 100 Behandelten betreffen Selten: kann bis zu 1 von 1000 Behandelten betreffen Sehr selten: kann bis zu 1 von 10 000 Behandelten betreffen Nicht bekannt: Häufigkeit auf Grundlage der verfügbaren Daten nicht abschätzbar',
        pregnancyNotification: 'Während der Schwangerschaft und Stillzeit besteht für das Arzneimittel keine Anwendungsbeschränkung.',
        price: 18.99,
        expirationDate: '02/25',
        applicationMethod: 'Nehmen Sie die Dragées unzerkaut mit ausreichend Flüssigkeit ein.',
        description: 'Das Arzneimittel ist ein krampflösendes Mittel (Spasmolytikum). Die Dragées werden angewendet zur Behandlung von leichten bis mäßig starken Krämpfen des Magen-Darm Traktes, sowie zur Behandlung krampfartiger Bauchschmerzen beim Reizdarmsyndrom.'
      };
  
      cy.request({
        method: 'POST',
        url: 'https://online-apotheke-v1-api.onrender.com/api/v1/product',
        body: productData,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        productId = response.body.data._id
        expect(response.status).to.eq(201);
        expect(response.body.data).to.be.an("object");
      });
    });
  
      it('Should retrieve a single product', () => {
        cy.request({
          method: 'GET',
          url: `https://online-apotheke-v1-api.onrender.com/api/v1/product/${productId}`,
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.be.an('object');
        });
      });
  
      it('Should update an existing product', () => {
        const updatedProductData = {
          name: 'BUSCOPAN updated',
        brand: 'Sanofi-Aventis Deutschland GmbH Gb',
        manufacturer: 'Sanofi-Aventis Deutschland GmbH Gb',
        pzn: 161996,
        image: 'https://cdn8.apopixx.de/1000/web_schraeg/00161996.jpg',
        distributionForm: 'Tablet',
        packageSize: '100',
        illness: 'Rachen',
        manufacturerCountry: 'Deutschland',
        type: 'Arzneimittel',
        discount: true,
        activeIngredient: 'Xylometazolin hydrochlorid',
        dosage: 'Die empfohlene Dosis beträgt Bei Schulkindern und Erwachsenen können Sie bis zu 3-mal täglich 1 Sprühstoß in jede Nasenöffnung einbringen. Überschreiten Sie nicht die empfohlene Dosierung und die Anwendungsdauer!    Dauer der Anwendung Wenden Sie das Präparat ohne ärztlichen Rat nicht länger als 7 Tage an. Eine erneute Anwendung sollte erst nach einer Pause von mehreren Tagen erfolgen. Zur Anwendungsdauer bei Kindern sollte grundsätzlich der Arzt befragt werden.',
        sideEffects: 'Wie alle Arzneimittel kann auch dieses Arzneimittel Nebenwirkungen haben, die aber nicht bei jedem auftreten müssen. Bei den Häufigkeitsangaben zu Nebenwirkungen werden folgende Kategorien zugrunde gelegt: Sehr häufig: kann mehr als 1 von 10 Behandelten betreffen Häufig: kann bis zu 1 von 10 Behandelten betreffen Gelegentlich: kann bis zu 1 von 100 Behandelten betreffen Selten: kann bis zu 1 von 1000 Behandelten betreffen Sehr selten: kann bis zu 1 von 10 000 Behandelten betreffen Nicht bekannt: Häufigkeit auf Grundlage der verfügbaren Daten nicht abschätzbar',
        pregnancyNotification: 'Während der Schwangerschaft und Stillzeit besteht für das Arzneimittel keine Anwendungsbeschränkung.',
        price: 18.99,
        expirationDate: '02/25',
        applicationMethod: 'Nehmen Sie die Dragées unzerkaut mit ausreichend Flüssigkeit ein.',
        description: 'Das Arzneimittel ist ein krampflösendes Mittel (Spasmolytikum). Die Dragées werden angewendet zur Behandlung von leichten bis mäßig starken Krämpfen des Magen-Darm Traktes, sowie zur Behandlung krampfartiger Bauchschmerzen beim Reizdarmsyndrom.'
        };
    
        cy.request({
          method: 'PUT',
          url: `https://online-apotheke-v1-api.onrender.com/api/v1/product/${productId}`,
          body: updatedProductData,
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(202);
          expect(response.body.data).to.be.an("object");
          // Add assertions for updated product data if needed
        });
      });
      
    it('Should delete an existing product', () => {
      cy.request({
        method: 'DELETE',
        url: `https://online-apotheke-v1-api.onrender.com/api/v1/product/${productId}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(204);
        // Add assertions for successful deletion if needed
      });
    });
  
    
  });