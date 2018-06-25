// :::::::::::::::::::::::HOISTING::::::::::::::::::::::::::
// HOISTING with functions only works for function declarations.

// functions: 
// Function Declaration-1: 
    function calculateAge(year) {
        console.log(2018 - year);
    }
        calculateAge(1982); // function called after function declaration - Normal execution.

// Function Declaration-2: 
        calculateAge(1982); // function called before function declaration - Hoisting works. 

    function calculateAge(year) {
        console.log(2018 - year);
    }


// Function Expressions-1: 
       var retirement = function(year) {
           console.log(65 - (2018 - year));
       }
       
        retirement(1982); // function called after function expression - Normal execution.

// Function Expressions-2:
        retirement(1982); // function called before function expression - Hoisting doesn't work.
      
        var retirement = function(year) {
            console.log(65 - (2018 - year));
           }
        
/*
  A function expression is a function that is part of some other Javascript statement i.e,  the right-side of a variable assignment expression:

var myFunction = function () { // some code  } 

Great, with that in mind, lets think about what happens when the Javascript engine executes code.  First, it is important to note that Javascript execution happens in 2 phases:  the creation phase and the execution phase.  The creation phase starts when a new lexical environment (an internal Javascript mechanism used to keep track of the mappings between identifiers and values) is created.

Now, during the creation phase,  if we are creating a function environment, the implicit variable,  arguments , is created along with function params and their argument values--if we are not working in a function environment, this step is skipped.

If we're creating a global or a function environment, the current code is scanned for function declarations (defined as standalone functions with the function  keyword and a label), but not function expressions!

The current code is now scanned for variable declarations (variables declared with the var  keyword).  For each discovered variable, if the identifier does not already exist in the envioronment, the identifer is registered and its initial value is set to undefined .

Once the creation phase is finished, we begin executing code--it is during this phase that functions are invoked and the thread of execution enters that local function context (a new lexical environment is created for each and every new function execution context that is added to the stack; thus, the creation phase begins all over again for that envioronment).

Since identifiers are initially set to undefined  during the creation phase, you can see why a function expression like:  var myFunction = function () { // some code }   cannot be invoked before its definition in the source code.  Function expressions are created when the program execution reaches their definitions.

*/
        
// Variables:      
// Variables - 1:
    var age = 35;
    console.log(age); // Normal execution.

// Variables - 2:
    console.log(age); // undefined - Hoisting doesn't work.
    var age = 35;
/*

Important to realize on this.. that this is something just simply true of variable hoisting in general and can be simplified to this code:

Example: 
console.log(a)
var a = 'data'
console.log(a)
 
// This code above prints:
    undefined
    data
    
the reason for this is simply that hoisting of a variable created with var only hoists the declaration of a variable, not the assignment of something to it.
*/

//:::::::::::::::EXECUTION CONTEXT OBJECT::::::::::::::::::

// CREATION PHASE - 1: VARIABLE OBJECT(VO)
var age = 30; // variable declared in global execution context.
function foo() {
    console.log(age); // undefined - Hoisting doesn't work. 
    var age = 65; // variable declared in foo function execution context.
    console.log(age); // Normal execution in the console.
}
foo(); //  foo function called in variable execution context object. 

console.log(age); // variable called in global execution context.


// CREATION PHASE - 2: SCOPE CHAIN
// First scoping example:
    var a = 'Hello!';
    first();

    function first() {
        var b = 'Hi!';
        second();

        function second() {
            var c = 'Hey!';
            console.log(a + b + c);
        }
    }

// Example to show the differece between execution stack and scope chain:

    var a = 'Hello!'; // Global variable available all over the program by any function to use. 
    first();

    function first() { // this function has access to it's own variable as well as global variable above.
        var b = 'Hi!';  
        second();   

        function second() { // lexical function (a function within another function) has access to it's variables and variables outside this function scope and gobal scope variables too.  
            var c = 'Hey!';
            third()
        }
    }

    function third() {
        var d = 'Shashi';
       // console.log(a); // access to global variable.
       // console.log(b); // no access to another function variable. 
       // console.log(c); // no access to another function variable. 
       // console.log(d); // access to it's own variable. 
          console.log(a+d); // access to a combination of global and it's own variable. 
    }

// CREATION PHASE - 3 : "THIS" VARIABLE

/*
  1. Regular function call: The "this" keyword points at the global object. ( the window object, in the browser)
  2. Method call: The "this" variable points to the object that is calling the method. 
  3. The "this" keyword is not assigned a value until a function where it is defined is actually called/invoked. 
  */

  // console.log(this); // logs window object 

// Using "this" in function Example:
     calculateAge(1982);

     function calculateAge(year) {
         console.log(2018 - year);
         console.log(this);
     }

 // Using "this" in object Example:
    
     var shashi = {
         name: "Shashi",
         yearOfBirth: 1983,
         calculateAge: function () {
             console.log(this);
             console.log(2018 - this.yearOfBirth);
//
//             function innerFunction() {
//                 console.log(this);
//             }
//             innerFunction();
         }
     }

     shashi.calculateAge();


      var shisha = {
          name: "Shisha",
          yearOfBirth: 1988,
          };

shisha.calculateAge = shashi.calculateAge; // Borrowing method

shisha.calculateAge();








































