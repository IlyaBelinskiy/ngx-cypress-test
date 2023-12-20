/// <reference types="cypress" />
/// <reference types="../support/commands.d.ts" />

describe('shadow dom', () => {

    it('access shadow dom', () => {
        cy.visit('https://radogado.github.io/shadow-dom-demo/');

        cy.get('#app')
            .find('#container')
            .should('contain', 'Dynamically generated content');
    });

});

// .shadow()