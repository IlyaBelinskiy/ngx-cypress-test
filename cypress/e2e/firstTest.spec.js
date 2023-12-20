/// <reference types="cypress" />

// describe();

// context();

describe('First test suite', () => {

    it('first test', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // By Tag name
        cy.get('input');

        // By ID 
        cy.get('#inputEmail1');

        // By Class value
        cy.get('.input-full-width');

        // By Attribute name
        cy.get('[fullwidth]');

        // By Attribute and value
        cy.get('[placeholder="Email"]');

        // By entire Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        // By two attributes
        cy.get('[placeholder="Email"][fullwidth]');
        
        // By tag, attribute, id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

        // By cypress test ID
        cy.get('[data-cy="imputEmail1"]');

    });

    it('second test', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // Theory

        //  get() - find elements on the page by locator globally;
        // find() - find child elements by locator;
        // contains() - find elements by HTML text and by text and locator;

        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');
        cy.contains('nb-card', 'Horizontal form').find('button');
        cy.contains('nb-card', 'Horizontal form').contains('Sign in');
        cy.contains('nb-card', 'Horizontal form').get('button');

        // cypress chains and DOM

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();
    });

    it('save subject of the command', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');

        // CAN'T DO THING LIKE THIS
        
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid');
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email');
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password');

        // Approach #1 Cypress Alias 

        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid');
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password');

        // Approach #2 Cypress then() method

        cy.contains('nb-card', 'Using the Grid').then( usingTheGridForm => {

            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email');
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password');

        });

    });

    it('extract text values', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        // 2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address');
            cy.wrap(labelText).should('contain', 'Email address');
        });

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address');
            cy.wrap(text).should('contain', 'Email address');
        });

        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address');

        // 4

        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.equal('label');
        });

        // 5 Invoke property 

        cy.get('#exampleInputEmail1').type('test@test.com');
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then( property => {
            expect(property).to.equal('test@test.com');
        });
    });

    it('radio buttons', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {

            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked');
            cy.wrap(radioButtons).eq(1).check({force: true});
            cy.wrap(radioButtons).eq(0).should('not.be.checked');
            cy.wrap(radioButtons).eq(2).should('be.disabled');
        });

    });

    it('checkboxes', () => {

        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        // cy.get('[type="checkbox"]').check({force: true});
        // cy.get('[type="checkbox"]').uncheck({force: true});
        cy.get('[type="checkbox"]').eq(0).click({force: true});
        cy.get('[type="checkbox"]').eq(1).check({force: true});

    });

    it('Date picker', () => {

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

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click(); 
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click();
            const dateForAssert = selectDayFromCurrent(400);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateForAssert);
            cy.wrap(input).should('have.value', dateForAssert);
        });
    });

    it('Lists and dropdowns', () => {
        cy.visit('/');

        // 1
        cy.get('nav nb-select').click();
        cy.get('.options-list').contains('Dark').click();
        cy.get('nav nb-select').should('contain', 'Dark');

    // When you use space it means that the locator AFTER space is a locator for child element.
    // So this expression would sound like that: "hey cypress, find for me tag with name thead and then withing this tag, find a child element [placeholder="Age"]"
    // The equivalent of this would be:
    // cy.get('thead').find('[placeholder="Age"]')
    // But, better to use the approach with space. 

        // 2
        cy.get('nav nb-select').then ( dropDown => {
            cy.wrap(dropDown).click();
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim();
                cy.wrap(listItem).click();
                cy.wrap(dropDown).should('contain', itemText);
                if (index < 3) {
                    cy.wrap(dropDown).click();
                };
            });

        });

    });

    it('Web tables', () => {

        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // 1 Get the row by text
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            // cy.wrap(tableRow).should('contain', '35');
            cy.wrap(tableRow).find('td').eq(6).should('have.text', '35'); // check for exact value
        });
// To have strict assertion you can use should('have.text', '25')
// But be aware, that you need to provide the exact locator for the tag where your text is located. 
// Also with strict assertion the leading and trailing spaces are also accounted in the assertion

        // 2 Get the row by index
        cy.get('thead .nb-plus').click();
        cy.get('thead tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('John');
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Doe');
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });
        // cy.get('tbody tr').first().should('contain', 'John' );
        // cy.get('tbody tr').first().should('contain', 'Doe' );
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'John');
            cy.wrap(tableColumns).eq(3).should('contain', 'Doe');
        });

        // 3 Get each row validation
        const age = [20, 30, 40, 200];

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500);
            cy.get('tbody tr').each( tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found');
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age);
                };
            });
        });
    });

    it('tooltip', () =>{

        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
        cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    });

    it.only('dialog box', () => {

        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click(); 

        // 1
        // cy.get('tbody tr').first().find('.nb-trash').click();
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?');
        // });

        // 2
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('.nb-trash').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', () => false);
    })

//     cy.get('tbody tr').first().find('.nb-trash').click();
//     cy.on('window:confirm', () => {
//         return false
//       });
// })

});

// describe('First test suite', () => {

//     describe('suite section', () => {

//         beforeEach('Login', () => {
//             // repeat for every test
//         });

//         it('first test', () => {
//             // put the code of the test
//         });
    
//         it('second test', () => {
//             // put the code of the test
//         });

//     });

//     it('first test', () => {
//         // put the code of the test
//     });

//     it('fecond test', () => {
//         // put the code of the test
//     });

//     it('third test', () => {
//         // put the code of the test
//     });

// });

// describe('Second test suite', () => {

//     it('first test', () => {
//         // put the code of the test
//     });

//     it('second test', () => {
//         // put the code of the test
//     });

//     it('third test', () => {
//         // put the code of the test
//     });

// });

// it() - is a single test
// describe() - can have multiple it()-s, so can be considered as test suite
// spec - is just the test file where you keep your tests, 
// so you can group your tests/test suites by files depends on your business needs.

// Yes, callback definition is confusing
// Call back function is a function that passed as an argument in another function.
// When we use then() command, the arument inside of then() is technically a callback function.
// Read here the general explanation: https://www.w3schools.com/js/js_callback.asp


// Delete node_modules folder
// Clean npm cache with "npm cache clean --force"
// Then install dependencies again "npm install --force"

// Hm... this sounds correct...

// Try to uninstall angular cli with "npm uninstall -g @angular/cli"

// Then delete local node_modules folder, clean npm cache with "npm cache clean --force". 
// Restart computer. Install dependencies again with "npm install --force" then run "npm start"


// Artem — Instructor
// Answer
// 1 upvote
// 2 months ago

// Yes, you understand this correctly.

// To better go through this concept you can go to JavaScript fundamentals section into the "Conditions" lesson to refresh your knowledge.

// Why this example in the class can be confusing, is because we used NOT statement.
// It means that the condition is evaluated as "true" if the evaluation is NOT successful.

// what we are saying there is: "If the calendar does NOT have the expected month OR calendar does NOT have the expected year, then go to next month, otherwise select the date in the calendar"

// So when the expected month and year is displayed what happens:
// 1. Is the expected month not displayed? No it's not (it IS displayed), so it's false.
// 2. Is the expected year not displayed? No it's not (it IS displayed), so it's false as well
// Result: Else statement is executed, and date is selected

// When we use OR operator, in order for the condition to go to ELSE, all expressions should be evaluated as FALSE.

// Another example. When the expected month is displayed but year is not what happens:
// 1. Is the expected month not displayed? No it's not (it IS displayed), so it's false.
// 2. Is the expected year not displayed? Yes it's not (it is NOT displayed), so it's true.
// Result: code goes to IF statement to select next month, because one of two expressions evaluated as TRUE

// The result will not be the same.
// cy.get(x).contains(y) - yields the DOM item that contains (hosts) text 'y', and it's a child DOM item in relation to 'x'
// cy.contains(x, y) - yields the DOM item 'x' that contains text 'y'. No matter how deep text 'y' is located in the DOM tree.
// let me know if this explanation is clear


// "app actions" approach requires deeper knowledge of JavaScript and the application under test, so you can headlessly interact with the state of the application, modifying it without interacting with UI.

// I know cypress very well but not well enough to use app actions approach, and even more, I think it's not really needed. It gives you some gain in test execution time, but increases the complexity of the framework and maintainability. And the problem here, when somebody after you will maintain the framework, it will be hard for them to figure out what is doing what.
// So designing framework, think about simplicity in mid as well. So somebody after you will be able to keep it running and not just discard (how often this happens) and start everything from scratch.

