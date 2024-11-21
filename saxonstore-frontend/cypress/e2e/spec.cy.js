describe('Home Page', () => {
  it('should load the home page correctly', () => {
    cy.visit('http://localhost:3000'); // assuming your React app runs on this port
    cy.contains('NEW ARRIVALS');
  })
});
