
function selectDayFromCurrent(day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
    let futureYear = date.getFullYear();
    let dateForAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
        if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
            if (day >= 0) {
                cy.get('[data-name="chevron-right"]').click();
              } else {
                cy.get('nb-calendar-pageable-navigation [data-name="chevron-left"]').click();
              }
            selectDayFromCurrent(day);
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
            };
        });
    return dateForAssert;
    };

class DatepickerPage{

    /**
     * This method will select date from Common Datepicker
     * @param {number} dayFromToday 
     */
    selectCommonDatepickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click();
        const dateForAssert = selectDayFromCurrent(dayFromToday);
        cy.wrap(input).invoke('prop', 'value').should('contain', dateForAssert);
        cy.wrap(input).should('have.value', dateForAssert);
        });
    };
    /**
     * This method will select range of dates date Datepicker With Range
     * @param {number} firstDay 
     * @param {number} secondDay 
     */
    selectDatepickerWithRangeFromToday(firstDay, secondDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
        cy.wrap(input).click();
        const dateForAssertFirst = selectDayFromCurrent(firstDay);
        const dateForAssertSecond = selectDayFromCurrent(secondDay);
        const rangeOfdatesForAssert = `${dateForAssertFirst} - ${dateForAssertSecond}`; // Concatenation: dateForAssertFirst+' - '+dateForAssertSecond
        cy.wrap(input).invoke('prop', 'value').should('contain', rangeOfdatesForAssert);
        cy.wrap(input).should('have.value', rangeOfdatesForAssert);
        });
    };
};

export const onDatepickerPage = new DatepickerPage();
