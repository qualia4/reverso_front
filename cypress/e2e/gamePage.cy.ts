import {Addresses} from "../../src/api/Addresses";

describe('game page tests', () => {

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

    cy.intercept('POST', `${Addresses.REVERSO}/play`, {
      statusCode: 200,
      body: { lobbyId: '123', gameStarted: true },
    }).as('playRequest');

    cy.contains('Play PvE').click();
    cy.wait('@playRequest');
    cy.url().should('include', '/game');
  });

  it('displays the game board', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getGameInfo/123`, {
      statusCode: 200,
      body: {
        points: { validuser: 2, AI: 2 },
        field: [
          ['*', '*', '*', '*', '*', '*', '*', '*'],
          ['*', '*', '*', '*', '*', '*', '*', '*'],
          ['*', '*', '*', '*', '*', '*', '*', '*'],
          ['*', '*', '*', 'validuser', 'AI', '*', '*', '*'],
          ['*', '*', '*', 'AI', 'validuser', '*', '*', '*'],
          ['*', '*', '*', '*', '*', '*', '*', '*'],
          ['*', '*', '*', '*', '*', '*', '*', '*'],
          ['*', '*', '*', '*', '*', '*', '*', '*']
        ],
        currentPlayerName: 'validuser',
        gameEnded: false
      },
    }).as('getGameInfoRequest');

    cy.wait('@getGameInfoRequest');
    cy.get('.game-board').should('be.visible');
    cy.get('.game-cell').should('have.length', 64);
  });

  it('displays game stats', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getGameInfo/123`, {
      statusCode: 200,
      body: {
        points: { validuser: 2, AI: 2 },
        field: [['*']],
        currentPlayerName: 'validuser',
        gameEnded: false
      },
    }).as('getGameInfoRequest');

    cy.wait('@getGameInfoRequest');
    cy.get('.game-stats').should('be.visible');
    cy.get('.score-box').should('have.length', 2);
    cy.contains('Your turn').should('be.visible');
  });

  it('allows making a move', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getGameInfo/123`, {
      statusCode: 200,
      body: {
        points: { validuser: 2, AI: 2 },
        field: [
          ['*', '*', '*'],
          ['*', 'validuser', '*'],
          ['*', '*', '*']
        ],
        currentPlayerName: 'validuser',
        gameEnded: false
      },
    }).as('getGameInfoRequest');

    cy.intercept('POST', `${Addresses.REVERSO}/makeMove`, {
      statusCode: 200,
      body: { message: 'Move successful' },
    }).as('makeMoveRequest');

    cy.wait('@getGameInfoRequest');
    cy.get('[data-testid="cell-0-0"]').click();
    cy.wait('@makeMoveRequest');
  });

  it('displays chat section', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getChat/123`, {
      statusCode: 200,
      body: [
        { username: 'validuser', text: 'Hello', time: '12:00' },
        { username: 'AI', text: 'Hi there', time: '12:01' }
      ],
    }).as('getChatRequest');

    cy.wait('@getChatRequest');
    cy.get('.chat-section').should('be.visible');
    cy.get('.chat-messages p').should('have.length', 2);
  });

  it('displays game over modal when game ends', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getGameInfo/123`, {
      statusCode: 200,
      body: {
        points: { validuser: 5, AI: 3 },
        field: [['validuser']],
        currentPlayerName: 'validuser',
        gameEnded: true
      },
    }).as('getGameInfoRequest');

    cy.wait('@getGameInfoRequest');
    cy.get('.modal-content').should('be.visible');
    cy.contains('You won!').should('be.visible');
    cy.contains('Go to Profile').should('be.visible');
  });

  it('navigates back to profile when closing game over modal', () => {
    cy.intercept('GET', `${Addresses.REVERSO}/getGameInfo/123`, {
      statusCode: 200,
      body: {
        points: { validuser: 5, AI: 3 },
        field: [['validuser']],
        currentPlayerName: 'validuser',
        gameEnded: true
      },
    }).as('getGameInfoRequest');

    cy.wait('@getGameInfoRequest');
    cy.contains('Go to Profile').click();
    cy.url().should('include', '/profile');
  });

})

export {};