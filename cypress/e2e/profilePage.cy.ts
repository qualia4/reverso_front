import {Addresses} from "../../src/api/Addresses";

describe('profile page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.intercept('POST', `${Addresses.REVERSO}/login`, {
      statusCode: 200,
      body: { message: 'Login successful' },
    }).as('loginRequest');
    cy.get('input[placeholder="Username"]').type('validuser');
    cy.get('input[placeholder="Password"]').type('validpass');
    cy.contains('Log In').click();
    cy.wait('@loginRequest');
  });

  it('displays the main menu', () => {
    cy.get('.page-title').should('have.text', 'Main Menu');
    cy.contains('Play PvP').should('be.visible');
    cy.contains('Play PvE').should('be.visible');
    cy.contains('Play Minimax PvE').should('be.visible');
    cy.contains('Show Stats').should('be.visible');
  });

  it('initiates PvP game', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/play`, {
      statusCode: 200,
      body: { lobbyId: '123', gameStarted: true },
    }).as('playRequest');

    cy.contains('Play PvP').click();
    cy.wait('@playRequest');
    cy.url().should('include', '/game');
  });

  it('initiates PvP game after waiting', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/play`, {
      statusCode: 200,
      body: { lobbyId: '123', gameStarted: false },
    }).as('playRequest');

    cy.intercept('GET', `${Addresses.REVERSO}/waitingForPlayer/123`, {
      statusCode: 200,
      body: { message: "success"}
    }).as('waitingRequest');

    cy.contains('Play PvP').click();
    cy.wait('@playRequest');
    cy.wait('@waitingRequest')
    cy.url().should('include', '/game');
  });

  it('initiates PvE game', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/play`, {
      statusCode: 200,
      body: { lobbyId: '123', gameStarted: true },
    }).as('playRequest');

    cy.contains('Play PvE').click();
    cy.wait('@playRequest');
    cy.url().should('include', '/game');
  });

  it('initiates MiniMax PvE game', () => {
    cy.intercept('POST', `${Addresses.REVERSO}/play`, {
      statusCode: 200,
      body: { lobbyId: '123', gameStarted: true },
    }).as('playRequest');

    cy.contains('Play Minimax PvE').click();
    cy.wait('@playRequest');
    cy.url().should('include', '/game');
  });

  it('shows statistics modal', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getUserInfo/validuser`, {
      statusCode: 200,
      body: {
        gamesPlayed: 10,
        gamesWon: 5,
        gamesLost: 4,
        draws: 1,
      },
    }).as('statsRequest');

    cy.contains('Show Stats').click();

    cy.wait('@statsRequest');
    cy.get('.modal').should('be.visible');
    cy.get('.statistics-title').should('contain', 'Statistics for validuser');
    cy.get('.statistic-value').eq(0).should('have.text', '10');
    cy.get('.statistic-value').eq(1).should('have.text', '5');
    cy.get('.statistic-value').eq(2).should('have.text', '4');
    cy.get('.statistic-value').eq(3).should('have.text', '1');
  });

  it('closes statistics modal', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getUserInfo/validuser`, {
      statusCode: 200,
      body: {
        gamesPlayed: 10,
        gamesWon: 5,
        gamesLost: 4,
        draws: 1,
      },
    }).as('statsRequest');

    cy.contains('Show Stats').click();
    cy.wait('@statsRequest');
    cy.get('.modal').should('be.visible');
    cy.contains('OK').click();
    cy.get('.modal').should('not.exist');
  });


})

export {};