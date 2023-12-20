/// <reference types="cypress" />

declare namespace Cypress {
    export interface Chainable {
        openHomePage(): Chainable;
    }
 }