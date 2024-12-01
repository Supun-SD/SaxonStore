// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.Commands.add("loginSession", () => {
    cy.session("user-session", () => {
        cy.visit("http://localhost:3000/sign-in");

        // Enter email and password
        cy.get('input[placeholder="Enter your email"]').type('wijesekarathinuri@gmail.com');
        cy.get('input[placeholder="Enter your password"]').type('abcd@1234');

        // Submit the form
        cy.contains("Log In").click();

        // Ensure login was successful
        cy.url().should("not.include", "/sign-in");
    });
});

Cypress.Commands.add("addCartSession", () => {
    cy.session("add-cart-session", () => {
        cy.visit("http://localhost:3000/sign-in");

        cy.get('input[placeholder="Enter your email"]').type("wijesekarathinuri@gmail.com");
        cy.get('input[placeholder="Enter your password"]').type("abcd@1234");
        cy.contains("Log In").click();
        cy.url().should("not.include", "/sign-in");

        cy.visit("http://localhost:3000/");
        cy.intercept("GET", "/api/v1/product/filter/newArrivals").as("getNewArrivals");
        cy.wait("@getNewArrivals");

        cy.get("[data-testid=new-arrivals-grid]")
            .find("[data-testid=product-card-67]")
            .first()
            .click();

        cy.get("[data-testid=product-color-select]").should("be.visible").click();
        cy.get("[data-testid=product-size-select]").should("be.visible").first().click();
        cy.get("[data-testid=add-to-cart-button]").should("be.visible").click();

        cy.contains("button", "CHECKOUT").should("be.visible").click();

        // Assert we are on the checkout page
        cy.url().should("include", "/order-confirmation");
    });
});
