
/// <reference types="cypress" />
/// <reference types="../support/commands.d.ts" />

import { onDatepickerPage } from "../support/page_objects/datepickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.openHomePage();      
    });
    
    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage();
        navigateTo.datepickerPage();
        navigateTo.toasterPage();
        navigateTo.smartTablePage();
        navigateTo.tooltipPage();
    });

    it(' should submit Inline and Basic form and select tomorrow date in the calendar', {browser: ['!firefox', '!edge']}, () => {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem Bondar', 'test@test.com');
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password');
        navigateTo.datepickerPage();
        onDatepickerPage.selectCommonDatepickerDateFromToday(1);
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);
        navigateTo.smartTablePage();
        onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar');
        onSmartTablePage.updateAgeByFirstName('Artem', '35');
        onSmartTablePage.deleterowByIndex(1);
    });
});
