console.log('hello world');

// window.alert("this is an alert");

// comments

document.getElementById("my-title").textContent = "novo titulo";

let age = 20;
let name = "Eduardo";

console.log("your name is " + name + " and is " + age + " years old.");

let count = 123;
count--;

console.log(count);

let unit = 5;
unit **= 2; // 5^2

console.log(unit);


// user input
// let username;
// username = window.prompt("whats your username");
// console.log(username);

// document.getElementById("my-para").textContent = "your username is " + username;

let username;

document.getElementById("my-submit").onclick = function() {
    username = document.getElementById("my-text").value;
    document.getElementById("my-title").textContent = "welcome, " + username;
}

// let age2 = window.prompt("how old are you?");
// age2 = Number(age2);  // convert to a number
// age += 1;
// console.log(age2, typeof age2);

let a = "something";
let b = "something";
let c = "something"; // id string is empty, conversion to boolean returns false

a = Number(a);
b = String(b);
c = Boolean(c);

console.log(a, typeof a);
console.log(b, typeof b);
console.log(c, typeof c);


// const -> variable that cant be changed

const PI = 3.14159; // constants in capital letters (exept strings)
let radius;
let circunference;

// radius = window.prompt("Enter the radius of a circle");
// radius = Number(radius);

// circunference = 2 * pi * radius;

document.getElementById("radius-submit").onclick = function() {
    radius = document.getElementById("radius-input").value;
    radius = Number(radius);
    circunference = 2 * PI * radius;
    console.log(circunference);
    let answer = document.getElementById("circle-answer").textContent;
    answer = answer.concat(circunference);
    document.getElementById("circle-answer").textContent = answer;
}

document.getElementById("clear-submit").onclick = function() {
    document.getElementById("circle-answer").textContent = "the circunference is: ";
}

