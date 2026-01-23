const inputs = {
  emailLogin: process.env.EMAIL_E2E,
  passwordLogin: process.env.PASSWORD_E2E,
}

describe('Login', () => {
  describe("Should not login with invalid credentials", () => {
    it("When I access the login page", () => {
      cy.visit('/login');
    })

    it("And then click on the sign in tab", () => {
      cy.get('#signin').click();
    })

    it("And fill the email field", () => {
      cy.get('#login-email').type(inputs.emailLogin);
    });

    it("And fill the password field", () => {
      cy.get('#password-left').type(inputs.passwordLogin);
    });

    it("And click on sign in button", () => {
      cy.get('#login-button').click();
    });

    it("Then I should stay on home page", () => {
      cy.location('pathname').should('eq', '/login');
    });
  })

  describe("Should login successully", () => {
    it("When I access the login page", () => {
      cy.visit('/login');
    })

    it("And then click on the sign in tab", () => {
      cy.get('#signin').click();
    })

    it("And fill the email field", () => {
      cy.get('#login-email').type(inputs.emailLogin);
    });

    it("And fill the password field", () => {
      cy.get('#password-left').type("invalid password");
    });

    it("And click on sign in button", () => {
      cy.get('#login-button').click();
    });

    it("Then I should be redirected succcessfully to home page", () => {
      cy.location('pathname').should('eq', '/');
    });
  })
})