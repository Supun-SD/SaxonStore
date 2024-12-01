describe("Sign Up Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/sign-up"); // Adjust the path as per your routing configuration
  });

  it("should render the sign-up form correctly", () => {
    cy.get("h2").contains("CREATE AN ACCOUNT").should("exist");
    cy.get("form").should("exist");
    cy.get("input#firstName").should("exist");
    cy.get("input#lastName").should("exist");
    cy.get("input#email").should("exist");
    cy.get("input#phone").should("exist");
    cy.get("input#password").should("exist");
    cy.get("input#confirmPassword").should("exist");
    cy.get("button[type='submit']").should("exist").contains("Sign Up");
  });

  it("should show validation errors for empty fields", () => {
    cy.get("button[type='submit']").click();
    cy.contains("First name is required").should("exist");
    cy.contains("Last name is required").should("exist");
    cy.contains("Invalid email address").should("exist");
    cy.contains("Password must be at least 8 characters long").should("exist");
  });

  it("should show validation error for invalid email", () => {
    cy.get("input#email").type("invalid-email");
    cy.get("button[type='submit']").click();
    cy.get("input#email").then(($input) => {
      const validationMessage = $input[0].validationMessage;
      expect(validationMessage).to.eq("Please include an '@' in the email address. 'invalid-email' is missing an '@'."); // Update message for your locale/browser
    });  });

  it("should show validation error for mismatched passwords", () => {
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("differentpassword");
    cy.get("button[type='submit']").click();
    cy.contains("Passwords must match").should("exist");
  });

  it("should show validation error for invalid phone number", () => {
    cy.get("input#phone").type("12345");
    cy.get("button[type='submit']").click();
    cy.contains("Phone number must be 9 digits").should("exist");
  });

  it("should show a success toast on successful form submission", () => {
    cy.intercept("POST", "user/createUser", {
      statusCode: 200,
      body: {
        data: {
          httpCode: 200,
          message: "User registered successfully.",
        },
      },
    }).as("register");

    // Fill out the form fields
    cy.get("input#firstName").type("John");
    cy.get("input#lastName").type("Doe");
    cy.get("input#email").type("john.doe@example.com");
    cy.get("input#phone").type("123456789");
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("password123");
    cy.get("button[type='submit']").click();

    // Wait for the API call
    cy.wait("@register");

    // Assert that the success toast appears
    cy.get("[data-testid='submit-toast']")
        .should("be.visible")
        .and("contain.text", "User registered successfully.");
  });

  it("should show an error toast when email already exists", () => {
    cy.intercept("POST", "/api/register", {
      statusCode: 400,
      body: {
        data: {
          httpCode: 400,
          message: "Email already exists.",
        },
      },
    }).as("register");

    // Fill out the form fields
    cy.get("input#firstName").type("John");
    cy.get("input#lastName").type("Doe");
    cy.get("input#email").type("john.doe@example.com");
    cy.get("input#phone").type("123456789");
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("password123");

    // Wait for the API call
    cy.wait("@register");
    cy.get("button[type='submit']").click();


    // Assert that the error toast appears
    cy.get("[data-testid='submit-toast']")
        .should("be.visible")
        .and("contain.text", "Email already exists.");
  });


  it("should navigate to the sign-in page when the link is clicked", () => {
    cy.contains("Log in here").click();
    cy.url().should("include", "/sign-in");
  });
});
