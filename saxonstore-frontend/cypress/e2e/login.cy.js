describe("login page", () => {
    beforeEach(()=>{
        cy.visit("http://localhost:3000/sign-in")
    })

    it('should render the login form correctly', () => {
        cy.contains('LOG IN').should('be.visible');
        cy.get('input[placeholder="Enter your email"]').should('be.visible');
        cy.get('input[placeholder="Enter your password"]').should('be.visible');
        cy.contains('Forgot your password?').should('be.visible');
        cy.contains('Log In').should('be.visible');
    });

    it('should show validation errors for invalid input', () => {
        cy.get('input[placeholder="Enter your email"]').type('invalid-email');
        cy.get('input[placeholder="Enter your password"]').type('12');
        cy.contains('Log In').click();
        cy.get('input[placeholder="Enter your email"]').then(($input) => {
            const validationMessage = $input[0].validationMessage;
            expect(validationMessage).to.eq("Please include an '@' in the email address. 'invalid-email' is missing an '@'."); // Update message for your locale/browser

        })
        });

    it('should navigate to the forgot password page', () => {
        cy.contains('Forgot your password?').click();
        cy.url().should('include', '/forgot-password');
    });

    it('should navigate to the registration page', () => {
        cy.contains('Register here').click();
        cy.url().should('include', '/sign-up');
    });

    it('should successfully log in a user', () => {
        // Intercept the login API request
        cy.intercept('POST', 'http://localhost:8080/api/v1/user/login', {
            statusCode: 200,
            body: {
                httpCode: 200,
                status: "SUCCESS",
                message: "Login successful",
                data: "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ3aWplc2VrYXJhdGhpbnVyaUBnbWFpbC5jb20iLCJ... (truncated for brevity)",
            },
        }).as('loginRequest');

        // Fill out the login form
        cy.get('input[placeholder="Enter your email"]').type('wijesekarathinuri@gmail.com');
        cy.get('input[placeholder="Enter your password"]').type('abcd@1234');

        // Submit the form
        cy.contains('Log In').click();

        // Wait for the login request and validate
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('status', 'SUCCESS');
            expect(interception.response.body).to.have.property('message', 'Login successful');
            expect(interception.response.body).to.have.property('data');
        });


    });

    it('should show an error message for invalid login', () => {
        // Intercept the login API request
        cy.intercept('POST', 'http://localhost:8080/api/v1/user/login', {
            statusCode: 200,
            body: {
                httpCode: 401,
                status: "FAILURE",
                message: "Invalid email or password",
                data: null,
            },
        }).as('loginRequest');

        // Fill out the login form
        cy.get('input[placeholder="Enter your email"]').type('wijesekarathinuri@gmail.com');
        cy.get('input[placeholder="Enter your password"]').type('abcd@1');

        // Submit the form
        cy.contains('Log In').click();

        // Wait for the login request and validate
        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('status', 'SUCCESS');
            expect(interception.response.body).to.have.property('message', 'Login successful');
            expect(interception.response.body).to.have.property('data');
        });


    })

})