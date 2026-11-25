// ============================================================
// DATA EXTRACTION (DESTRUCTURING & REST) AND COPYING (SPREAD)
// Essential JavaScript concepts for React (props, state, immutability)
// ============================================================


// ============================================================
// 1. DATA EXTRACTION: DESTRUCTURING
// ============================================================
// Destructuring lets us unpack values from arrays or properties from
// objects into distinct variables cleanly, instead of accessing them one by one.

// ------------------------------------------------------------
// 1A. Array Destructuring (Position-based)
// ------------------------------------------------------------
// Values are extracted based on their index/position in the array.

const colors = ["red", "green", "blue"];

// Without destructuring:
// const firstColor = colors[0];
// const secondColor = colors[1];

// With destructuring:
const [firstColor, secondColor, thirdColor] = colors;
console.log(firstColor, secondColor, thirdColor); // "red" "green" "blue"

// Skipping elements using commas:
const [primary, , tertiary] = colors;
console.log(primary, tertiary); // "red" "blue"

// Default values (used only if the extracted value is undefined):
const scores = [95];
const [mathScore, scienceScore = 0] = scores;
console.log(mathScore, scienceScore); // 95 0

// Swapping two variables easily without a temporary variable:
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// React note: useState() returns an array [value, setter], which we always destructure:
// const [count, setCount] = useState(0);


// ------------------------------------------------------------
// 1B. Object Destructuring (Property Name-based)
// ------------------------------------------------------------
// Values are extracted by matching the exact property key name (order does not matter).

const user = {
    name: "Aarav",
    age: 22,
    role: "Frontend Developer",
    address: {
        city: "Bengaluru",
        country: "India",
    },
};

// Basic extraction:
const { name, age } = user;
console.log(name, age); // "Aarav" 22

// Renaming variables (alias) using `originalKey: newVariableName`:
const { name: userName, role: jobTitle } = user;
console.log(userName, jobTitle); // "Aarav" "Frontend Developer"

// Default values (fallback if the property does not exist or is undefined):
const { theme = "dark" } = user;
console.log(theme); // "dark"

// Renaming + Default value together:
const { isAdmin: adminStatus = false } = user;
console.log(adminStatus); // false

// Nested object destructuring:
const {
    address: { city, country },
} = user;
console.log(city, country); // "Bengaluru" "India"
// Note: `address` itself is NOT created as a variable here — only `city` and `country` are.


// ------------------------------------------------------------
// 1C. Destructuring in Function Parameters (Very common in React!)
// ------------------------------------------------------------
// Instead of accepting a `props` object and writing `props.title`, `props.price`,
// we destructure directly inside the parameter list.

function displayProduct({ title, price, inStock = true }) {
    console.log(`${title} - $${price} (In stock: ${inStock})`);
}

displayProduct({ title: "Mechanical Keyboard", price: 120 });
// Output: "Mechanical Keyboard - $120 (In stock: true)"

// React component example:
// function UserCard({ name, role }) {
//     return <h2>{name} - {role}</h2>;
// }


// ------------------------------------------------------------
// 1D. Rest Operator (...) for Collecting Remaining Data
// ------------------------------------------------------------
// The rest operator (...) gathers the "rest" of the elements/properties
// into a new array or object. It must always be placed LAST.

// Rest with arrays:
const numbers = [10, 20, 30, 40, 50];
const [firstNum, secondNum, ...remainingNums] = numbers;
console.log(firstNum, secondNum); // 10 20
console.log(remainingNums);       // [30, 40, 50]

// Rest with objects (great for excluding specific keys without mutating the original):
const { age: removedAge, ...userWithoutAge } = user;
console.log(removedAge);     // 22
console.log(userWithoutAge); // { name: "Aarav", role: "Frontend Developer", address: { ... } }

// Rest in function parameters (collects any number of arguments into an array):
function sumAll(...nums) {
    return nums.reduce((total, n) => total + n, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10


// ============================================================
// 2. COPYING DATA (SPREAD OPERATOR, SHALLOW vs DEEP COPY)
// ============================================================

// ------------------------------------------------------------
// 2A. Why Regular Assignment (=) Does NOT Copy Objects/Arrays
// ------------------------------------------------------------
// Primitives (string, number, boolean) are copied by VALUE.
let num1 = 10;
let num2 = num1;
num2 = 99;
console.log(num1, num2); // 10 99 (independent)

// Objects and arrays are copied by REFERENCE (both variables point to the same memory).
const originalArr = [1, 2, 3];
const sameRefArr = originalArr; // NOT a copy — points to the exact same array!
sameRefArr.push(4);
console.log(originalArr); // [1, 2, 3, 4] <-- original got mutated!

// React note: Never mutate state directly! React checks object/array references
// to detect changes and trigger a re-render. Always create a new copy when updating state.


// ------------------------------------------------------------
// 2B. Shallow Copying with the Spread Operator (...)
// ------------------------------------------------------------
// Spread (...) expands elements of an array or properties of an object into a new one.

// --- Copying & Updating Arrays ---
const fruits = ["apple", "banana"];

// Create a copy:
const fruitsCopy = [...fruits];
fruitsCopy.push("mango");
console.log(fruits);     // ["apple", "banana"] (original stays untouched!)
console.log(fruitsCopy); // ["apple", "banana", "mango"]

// Adding elements while copying (immutable pattern used in React state):
const withStartAndEnd = ["kiwi", ...fruits, "orange"];
console.log(withStartAndEnd); // ["kiwi", "apple", "banana", "orange"]

// Merging multiple arrays:
const moreFruits = ["grape", "melon"];
const allFruits = [...fruits, ...moreFruits];
console.log(allFruits); // ["apple", "banana", "grape", "melon"]


// --- Copying & Updating Objects ---
const profile = { username: "dev_alex", level: 1, active: true };

// Create a copy:
const profileCopy = { ...profile };

// Copy and override/add properties (later keys overwrite earlier keys):
const updatedProfile = {
    ...profile,
    level: 2,          // overwrites `level` from `profile`
    verified: true,    // adds a new property
};
console.log(profile);        // { username: "dev_alex", level: 1, active: true }
console.log(updatedProfile); // { username: "dev_alex", level: 2, active: true, verified: true }

// Merging objects (if keys clash, the rightmost object wins):
const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { theme: "dark" };
const finalSettings = { ...defaults, ...userPrefs };
console.log(finalSettings); // { theme: "dark", fontSize: 14 }

// Alternative shallow-copy syntax:
// const copyObj = Object.assign({}, profile);
// const copyArr = fruits.slice();


// ------------------------------------------------------------
// 2C. Shallow Copy Caveat (Nested Objects / Arrays)
// ------------------------------------------------------------
// Spread (...) only copies ONE level deep (shallow copy).
// Nested objects/arrays inside are still shared by reference!

const student = {
    name: "Priya",
    marks: { math: 90, science: 85 },
};

const shallowStudent = { ...student };
shallowStudent.name = "Riya";    // Safe: top-level primitive, does NOT affect `student`
shallowStudent.marks.math = 100; // DANGER: `marks` is shared, so `student.marks.math` also becomes 100!

console.log(student.name);       // "Priya" (unchanged)
console.log(student.marks.math); // 100     (mutated accidentally!)

// Fixing nested updates immutably with spread (standard React state update pattern):
const safeUpdatedStudent = {
    ...student,
    marks: {
        ...student.marks, // copy the nested object too!
        math: 95,
    },
};
console.log(student.marks.math);            // 100 (unchanged)
console.log(safeUpdatedStudent.marks.math); // 95


// ------------------------------------------------------------
// 2D. Deep Copying (Copies All Nested Levels Completely)
// ------------------------------------------------------------
// A deep copy duplicates every nested object/array so nothing shares a reference.

const originalData = {
    team: "Core",
    members: [{ name: "Sam" }, { name: "Maya" }],
};

// Method 1: structuredClone() — Modern, built-in, recommended way
// Handles nested objects, arrays, Dates, Maps, Sets, etc. (Cannot clone functions).
const deepCopyModern = structuredClone(originalData);
deepCopyModern.members[0].name = "Changed";
console.log(originalData.members[0].name);   // "Sam" (completely untouched!)
console.log(deepCopyModern.members[0].name); // "Changed"

// Method 2: JSON.parse(JSON.stringify(...)) — Classic workaround
// Works for plain JSON data, but loses functions, undefined, Date objects (become strings), Maps/Sets.
const deepCopyJson = JSON.parse(JSON.stringify(originalData));
deepCopyJson.members[1].name = "Updated";
console.log(originalData.members[1].name); // "Maya" (untouched)
console.log(deepCopyJson.members[1].name); // "Updated"


// ============================================================
// QUICK SUMMARY: REST vs SPREAD (Same `...` syntax, opposite jobs!)
// ============================================================
// - REST   (`...`) -> PACKS remaining items into an array/object.
//                     Used on the LEFT side of `=` (destructuring) or in function parameters.
//                     Example: const [first, ...others] = arr;
//
// - SPREAD (`...`) -> UNPACKS/EXPANDS an array/object into individual items/properties.
//                     Used on the RIGHT side of `=` (copying/merging) or in function calls.
//                     Example: const copy = [...arr];
