
class FormLayoutsPage{

    /**
     * This method will submit Inline form
     * @param {string} fullName 
     * @param {string} email
     */
    submitInlineFormWithNameAndEmail(fullName, email) {
            cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(fullName);
            cy.wrap(form).find('[placeholder="Email"]').type(email);
            cy.wrap(form).find('[type="checkbox"]').check({force: true});
            cy.wrap(form).submit();
        });
    };
    /**
     * This method will submit Basic form
     * @param {string} email 
     * @param {string} password
     */
    submitBasicFormWithEmailAndPassword(email, password) {
            cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email);
            cy.wrap(form).find('[placeholder="Password"]').type(password);
            cy.wrap(form).find('[type="checkbox"]').check({force: true});
            cy.wrap(form).submit();
        }); 
    };
};

export const onFormLayoutsPage = new FormLayoutsPage();
