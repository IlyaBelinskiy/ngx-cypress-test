/// <reference types="cypress" />
/// <reference types="../support/commands.d.ts" />

describe('JSON objects', () => {

    it('JSON objects', () => {

        cy.openHomePage();

        const simpleObject = { "key1": "value1", "key2": "value2" };
        
        const simpleArrayOfValues = [ "one", "two", "three" ];
        
        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}];
        
        const typesOfData = { "string": "this is a string", "number": 10, "boolean": true };
        
        const mix = {
            "FirstName": "Artem",
            "LastName": "Bondar",
            "Age": 35,
            "isMarried": false,
            "Students": [
                {
                    "firstName": "Sarah",
                    "lastName": "Connor"
                }, 
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }

        console.log(simpleObject.key2); // Dot notation
        console.log(simpleObject["key2"]); // Brackets notation
        console.log(simpleArrayOfValues[1]);
        console.log(arrayOfObjects[2].key3);
        console.log(mix.LastName);
        console.log(mix.Age);
        console.log(mix.isMarried);
        console.log(mix.Students[0].firstName);
        console.log(mix["Students"][1]["firstName"]);
        const lastNameOfSecondStudent = mix["Students"][1]["lastName"];
        console.log(lastNameOfSecondStudent);
    });
});


// As an advice for the future, when you don't know when the failure is, the simplest way to find it is to comment the latest code from the end line by line.
// Comment one line, run the code. Does not work? 
// Comment one more line.. Does now work?
// One more.. and so on. 
// Eventually, you will come to the point when it works, and then slowly add line by line (block by block) and execute again. 
// This is how you always can find the area in the code where the problems are. 
// Then just inspect that area carefully.