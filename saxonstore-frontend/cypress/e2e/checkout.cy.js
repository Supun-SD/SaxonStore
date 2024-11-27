describe("Checkout Page Tests", () => {
    beforeEach(() => {
        // Use the session to preserve cart and navigate to checkout
        cy.addCartSession();
        cy.visit("http://localhost:3000/order-confirmation"); // Continue from where the session left off
    });
    it("should render all input fields and labels", () => {
        cy.contains("DELIVERY DETAILS").should("be.visible");
        cy.contains("First Name").should("be.visible");
        cy.contains("Last Name").should("be.visible");
        cy.contains("Address").should("be.visible");
        cy.contains("City").should("be.visible");
        cy.contains("Postal Code").should("be.visible");
        cy.contains("Phone *").should("be.visible");
        cy.contains("Note").should("be.visible");
        cy.contains("Return to cart").should("be.visible");
        cy.contains("Continue Checkout").should("be.visible");
    });
    it("should validate form inputs correctly and complete the checkout", () => {
        cy.get("button").contains("Continue Checkout").click();
        cy.contains("Required fields cannot be empty").should("be.visible");

        cy.get('[data-testid="order-first-name"]').type("John");
        cy.get('[data-testid="order-last-name"]').type("Doe");
        cy.get('[data-testid="order-address"]').type("2nd Mary lane,Aus");

        cy.get('[data-testid="oder-city"]').type("Colombo");
        cy.get('[data-testid="order-postal-code"]').type("123456");
        cy.get("button").contains("Continue Checkout").click();
        cy.url().should("include", "http://localhost:3000/checkout");
        cy.get('[data-testid="checkout-cod"]').click();
        cy.contains("Your order has been placed successfully").should("be.visible");

    });
    it("should validate whether firstname is empty ", () => {

        cy.get('[data-testid="order-first-name"]')
            .find('input')
            .clear();
        cy.get("button").contains("Continue Checkout").click();

        cy.contains("Required fields cannot be empty").should("be.visible");
    });

    it("should validate whether lastName is empty ", () => {

        cy.get('[data-testid="order-last-name"]')
            .find('input')
            .clear();
        cy.get("button").contains("Continue Checkout").click();

        cy.contains("Required fields cannot be empty").should("be.visible");
    });

    it("should validate whether address is empty ", () => {

        cy.get('[data-testid="order-address"]')
            .find('input')
            .clear();
        cy.get("button").contains("Continue Checkout").click();

        cy.contains("Required fields cannot be empty").should("be.visible");
    });
    it("should validate whether oder-city is empty ", () => {

        cy.get('[data-testid="oder-city"]')
            .find('input')
            .clear();
        cy.get("button").contains("Continue Checkout").click();

        cy.contains("Required fields cannot be empty").should("be.visible");
    });
    it("should validate whether order-postal-code is empty ", () => {

        cy.get('[data-testid="order-postal-code"]')
            .find('input')
            .clear();
        cy.get("button").contains("Continue Checkout").click();

        cy.contains("Required fields cannot be empty").should("be.visible");
    });



});
