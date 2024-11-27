describe("Product Details Page Tests", () => {
    before(() => {
        // Log in and save the session
        cy.session("user-session", () => {
            cy.visit("http://localhost:3000/sign-in");

            // Enter email and password
            cy.get('input[placeholder="Enter your email"]').type('wijesekarathinuri@gmail.com');
            cy.get('input[placeholder="Enter your password"]').type('abcd@1234');

            // Submit the form
            cy.contains('Log In').click();

            // Ensure login was successful
            cy.url().should("not.include", "/sign-in");


        });
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

        // Wait for navigation to complete
        cy.location("pathname", { timeout: 15000 }).should("include", "/products/");

        // Perform assertions on product details
        cy.get("[data-testid=product-title]").should("exist");
        cy.get("[data-testid=product-price]").should("exist");

        // selecting the color and product size and addding to the cart
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

    })




});
