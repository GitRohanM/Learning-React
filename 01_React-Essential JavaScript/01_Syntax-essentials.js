//var, let and const
//1
var a = 1; //Can be re-declared and Global and Function Scope Variable
var a = 10; // Will not give error (re-declaration is allowed) and overwrite the value of a

//2
let b = 1; //Cannot be re-declared and Block Scope Variable
// let b = 10      Gives error (re-declaration not allowed)
b = 20; //Updating is allowed

//3
const c = 20; //Cannot be re-declared and Block Scope Variable
              // must be initialized when declared
c = 80; //gives error because const variable can't update value



//Functions

//normal function
function greetings(){
    console.log("Hello")
}

//Arrow Function
const hello = () =>{
    console.log("Hello")
}

//template literal
const sum = `The sum of ${a} and ${b} is ${a+b}`; //interpolation