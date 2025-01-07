// Create a program that calculates the type of a variable dynamically. For example, given let x = 42;, return "number".

function getType(variable) {
    return typeof variable;
}
console.log(getType(42)); // "number"

// Write a function that accepts multiple arguments of different types and groups them into an object {strings: [], numbers: [], booleans: []}.

function groupByType(...args) {
    return args.reduce((acc, arg) => {
        const type = typeof arg;
        if (!acc[type]) acc[type] = [];
        acc[type].push(arg);
        return acc;
    }, {});
}
console.log(groupByType(1, "hello", true, 42, "world"));

// Implement a function that checks if a year is a leap year using conditional statements.

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
console.log(isLeapYear(2024)); // true

// Write a program that returns the greatest of three numbers using the ternary operator.

const greatest = (a, b, c) => a > b ? (a > c ? a : c) : (b > c ? b : c);
console.log(greatest(5, 12, 9)); // 12

// Write a program to reverse a string without using built-in methods.

function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
console.log(reverseString("hello")); // "olleh"

// Implement a function to count the frequency of each character in a string.

function charFrequency(str) {
    return str.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
}
console.log(charFrequency("banana"));

// Convert a traditional function to an equivalent arrow function that finds the square of a number.

const square = num => num * num;
console.log(square(5)); // 25

// Implement an arrow function that filters out numbers less than 10 from an array.

const filterNumbers = arr => arr.filter(num => num >= 10);
console.log(filterNumbers([4, 10, 15, 2])); // [10, 15]

// Write a function that merges two arrays without duplicates.

function mergeArrays(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}
console.log(mergeArrays([1, 2], [2, 3])); // [1, 2, 3]

// Create a nested object and implement a function to deeply clone it.

const deepClone = obj => JSON.parse(JSON.stringify(obj));
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);

// Experiment with hoisting by writing a program that declares and initializes variables in different orders and explain the output.

console.log(x); // undefined // Hoisting example
var x = 5;

// Write a higher-order function that takes another function as an argument and executes it.

function execute(fn) {
    fn();
}
execute(() => console.log("Hello!"));

// Write a script that demonstrates the temporal dead zone using let and const.

console.log(x); // ReferenceError // Temporal Dead Zone
let x = 10;

// Create a Person class with properties name, age, and a method to display their details.

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    display() {
        return `${this.name}, ${this.age}`;
    }
}

// Implement a function that calculates the area of a rectangle, with default values for length and breadth.

function area(length = 1, breadth = 1) {
    return length * breadth;
}

// Write a function to sort an array of numbers using Array.prototype.sort.

console.log([5, 3, 8].sort((a, b) => a - b)); // [3, 5, 8]

// Implement a date formatter using Date object methods.

const formatDate = date => date.toISOString().split('T')[0];
console.log(formatDate(new Date()));

// Clone an object using both shallow and deep cloning techniques and explain the difference.

const shallowClone = { ...original };
const deepClone1 = JSON.parse(JSON.stringify(original));

// Create a circular reference in an object and observe how garbage collection handles it.

let obj = {};
obj.self = obj; // Circular reference

// Write a program that throws a custom error if the input is not a string.

function validateString(input) {
    if (typeof input !== "string") throw new Error("Not a string!");
}

// Implement a try-catch-finally block to handle errors in a division operation.

try {
    let result = 10 / 0;
} catch (e) {
    console.error(e);
} finally {
    console.log("I always exedute");
}

// Write a script to add a new list item to a <ul> dynamically.

const ul = document.querySelector("ul");
const li = document.createElement("li");
li.textContent = "New Item";
ul.appendChild(li);

// Create a function to delete all child elements of a <div>.

const div = document.querySelector("div");
div.innerHTML = '';

// Write a code to toggle the background color of a button on click.

button.addEventListener("click", () => {
    document.body.classList.toggle("bg-toggle");
});

// Implement a function that applies a CSS class to all paragraphs on a webpage.

document.querySelectorAll("p").forEach(p => p.classList.add("highlight"));

// Create a button that logs a message when clicked and stops logging after 5 clicks.

let count = 0;
button.addEventListener("click", () => {
    if (count < 5) console.log("Clicked");
    count++;
});

// Implement event delegation to handle clicks on dynamically added elements.

document.body.addEventListener("click", e => {
    if (e.target.classList.contains("dynamic")) console.log("Dynamic clicked");
});

// Write a code that minimizes reflow by batching DOM updates.

const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    fragment.appendChild(div);
}
document.body.appendChild(fragment);

// Write a code that demonstrates the cost of inline styles on performance.

div.style.color = "red";
div.style.backgroundColor = "blue";

// Write a code that uses setTimeout, Promise, and console.log to demonstrate the event loop.

console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// Implement a function that returns a promise to simulate an API call that resolves after 2 seconds.

const fetchData = () => new Promise(resolve => setTimeout(() => resolve("Data"), 2000));

// Chain multiple promises to fetch user data and their associated posts.

fetchUser().then(user => fetchPosts(user.id)).then(posts => console.log(posts));

// Write an async function to fetch data from a public API and display it on a webpage.

async function fetchData() {
    const response = await fetch("https://api.example.com");
    const data = await response.json();
    console.log(data);
}

// Implement error handling in an async function that fetches data from a broken API link.

async function fetchData1() {
    try {
        const response = await fetch("invalid-url");
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

// Write a closure to create a counter function with increment and decrement methods.

function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
    };
}

// Implement a function that creates private variables and exposes public methods to interact with them.

function createPerson(name) {
    let _name = name;
    return {
        getName: () => _name,
        setName: newName => _name = newName,
    };
}