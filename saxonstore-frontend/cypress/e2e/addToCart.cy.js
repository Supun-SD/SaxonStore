describe("Product Details Page Tests", () => {
    before(() => {
        // Log in and save the session
        cy.loginSession(); // Use the shared login session

    });

    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });



    it("should navigate to the first product details page and perform tests", () => {
        // Wait for the New Arrivals API to load
        cy.intercept("GET", "/api/v1/product/filter/newArrivals").as("getNewArrivals");
        cy.wait("@getNewArrivals");

        // Click the first product card
        cy.get("[data-testid=new-arrivals-grid]")
            .find("[data-testid=product-card-67]")
            .first()
            .click()
            .then(() => {
                cy.log("Product card clicked.");
            });

        // selecting the color and product size and adding to the cart
        cy.get("[data-testid=product-color-select]")
            .should('exist')
            .and('be.visible')
            .click()
            .then(() => cy.log("Color selected"));

        cy.get("[data-testid=product-size-select]")
            .should('exist')
            .and('be.visible')
            .first()
            .click()
            .then(() => cy.log("Size selected"));

        cy.get("[data-testid=add-to-cart-button]")
            .should('exist')
            .and('be.visible')
            .click()
            .then(() => cy.log("Add to Cart button clicked"));

        cy.contains("button", "CHECKOUT").should("be.visible").click();

    })




});
