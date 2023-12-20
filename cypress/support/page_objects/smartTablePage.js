
class SmartTablePage{

    /**
     * This method will update the person's age in the Smart Table by entering his first name
     * @param {string} firstName 
     * @param {string} age 
     */
    updateAgeByFirstName(firstName, age) {
        cy.get('tbody').contains('tr', firstName).then( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').eq(6).should('have.text', age); // check for exact value
        });
    };
    /**
     * This method will add a new record with person's full name to the Smart Table
     * @param {string} firstName 
     * @param {string} lastName 
     */
    addNewRecordWithFirstAndLastName(firstName, lastName) {
        cy.get('thead .nb-plus').click();
        cy.get('thead tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName);
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName);
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', firstName);
            cy.wrap(tableColumns).eq(3).should('contain', lastName);
        });
    };
    /**
     * This methid will delete a row by index
     * @param {number} index 
     */
    deleterowByIndex(index) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    };
};

export const onSmartTablePage = new SmartTablePage();
