describe('Home Page', () => {
  // beforeEach(() => {
  //   cy.visit('http://localhost:3000'); // Ensures each test starts from the correct base URL
  // });

  // it('should load the home page correctly', () => {
  //   cy.contains('NEW ARRIVALS');
  // });
  //
  // it('should load the slideshow in home page',()=>{
  //   cy.get('[data-testid="slide-show"]').should('exist');
  //   cy.get('[data-testid="home-container"]').should('exist');
  //   cy.get('[data-testid="new-arrivals-heading"]').should('exist');
  //
  //
  // })

  // it('should display new arrivals after fetching data from API', () => {
  //   // Intercept the API call for new arrivals and mock the response if needed
  //   cy.intercept('GET', '/api/products/new-arrivals', {
  //     statusCode: 200,
  //     body: [
  //       { id: 1, name: 'Product 1', price: '10.00' },
  //       { id: 2, name: 'Product 2', price: '20.00' }
  //     ],
  //   }).as('getNewArrivals');
  //
  //   // Visit the page that triggers the API call (replace with your actual URL)
  //   cy.visit('http://localhost:3000');
  //
  //   // Wait for the API response to ensure data is loaded
  //   cy.wait('@getNewArrivals');
  //
  //   // Verify the new arrivals grid exists
  //   cy.get('[data-testid="new-arrivals-grid"]').should('exist');
  //
  //   // Verify that at least one product card is displayed
  //   cy.get('[data-testid^="product-card-"]').should('have.length.greaterThan', 0);
  //
  //   // Optionally, verify the content of the first product card (name and price)
  //   cy.get('[data-testid="product-card-1"]').within(() => {
  //     cy.get('[data-testid="product-name"]').should('have.text', 'Product 1');
  //     cy.get('[data-testid="product-price"]').should('have.text', '10.00');
  //   });
  // });


  })
