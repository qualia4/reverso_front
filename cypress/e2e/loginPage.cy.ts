import {Addresses} from "../../src/api/Addresses";

describe('login page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('displays the login form', () => {
    cy.get('.login-container').should('be.visible');
    cy.get('.login-title').should('have.text', 'Login Page');
    cy.get('.login-form').should('be.visible');
  });

  it('allows user to enter username and password', () => {
    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('input[placeholder="Username"]').should('have.value', 'testuser');
    cy.get('input[placeholder="Password"]').should('have.value', 'password123');
  });

  it('displays error message on failed login', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/login`, {
      forceNetworkError: true
    }).as('loginRequest');

    cy.get('input[placeholder="Username"]').type('wronguser');
    cy.get('input[placeholder="Password"]').type('wrongpass');
    cy.contains('Log In').click();

    cy.wait('@loginRequest');
    cy.contains('Login failed. Wrong username or password').should('be.visible');
  });

  it('displays error message on failed registration', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/register`, {
      forceNetworkError: true
    }).as('registerRequest');

    cy.get('input[placeholder="Username"]').type('existinguser');
    cy.get('input[placeholder="Password"]').type('newpass');
    cy.contains('Register').click();

    cy.wait('@registerRequest');
    cy.contains('Register failed. Username already exists').should('be.visible');
  });

  it('navigates to profile page on successful login', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/login`, {
      statusCode: 200,
      body: { message: 'Login successful' },
    }).as('loginRequest');

    cy.get('input[placeholder="Username"]').type('validuser');
    cy.get('input[placeholder="Password"]').type('validpass');
    cy.contains('Log In').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/profile');
  });

  it('navigates to profile page on successful registration', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/register`, {
      statusCode: 200,
      body: { message: 'Registration successful' },
    }).as('registerRequest');

    cy.get('input[placeholder="Username"]').type('newuser');
    cy.get('input[placeholder="Password"]').type('newpass');
    cy.contains('Register').click();

    cy.wait('@registerRequest');
    cy.url().should('include', '/profile');
  });


})

export {};