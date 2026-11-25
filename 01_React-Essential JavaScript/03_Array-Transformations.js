// ============================================================
// ARRAY TRANSFORMATIONS: .map(), .filter(), and .reduce()
// Essential JavaScript methods for React (rendering lists,
// updating/deleting state immutably, computing derived values)
// ============================================================
// Core rule: None of these methods mutate (change) the original array.
// They take a callback function and return a NEW value/array.

const products = [
    { id: 1, name: "Laptop", price: 1000, category: "tech", inStock: true },
    { id: 2, name: "Mouse", price: 25, category: "tech", inStock: true },
    { id: 3, name: "Desk Lamp", price: 45, category: "home", inStock: false },
    { id: 4, name: "Notebook", price: 10, category: "office", inStock: true },
];


// ============================================================
// 1. .map() — TRANSFORM EVERY ELEMENT
// ============================================================
// Syntax: array.map((element, index, array) => newElement)
// - Runs the callback on EVERY element in the array.
// - Always returns a NEW array of the EXACT SAME LENGTH.
// - Use when you want a 1-to-1 transformation of data.

// --- 1A. Basic transformation on primitives ---
const nums = [1, 2, 3, 4];
const doubled = nums.map((num) => num * 2);
console.log(nums);    // [1, 2, 3, 4] (original untouched)
console.log(doubled); // [2, 4, 6, 8]

// Using the optional `index` parameter:
const numberedList = ["HTML", "CSS", "JS"].map((skill, idx) => `${idx + 1}. ${skill}`);
console.log(numberedList); // ["1. HTML", "2. CSS", "3. JS"]

// --- 1B. Extracting or reshaping objects ---
// Extract only product names:
const productNames = products.map((product) => product.name);
console.log(productNames); // ["Laptop", "Mouse", "Desk Lamp", "Notebook"]

// Return new objects (wrap object literal in parentheses `({ ... })` for implicit return!):
const discountedProducts = products.map((product) => ({
    ...product,
    discountedPrice: product.price * 0.9,
}));
console.log(discountedProducts[0]);
// { id: 1, name: "Laptop", price: 1000, category: "tech", inStock: true, discountedPrice: 900 }

// --- 1C. Updating ONE item immutably (Classic React state update pattern!) ---
// Keep all items the same except the one matching the target `id`.
const updatedProducts = products.map((product) =>
    product.id === 2 ? { ...product, price: 30 } : product
);
console.log(products[1].price);        // 25 (original untouched)
console.log(updatedProducts[1].price); // 30 (updated in new array)

// --- Common Pitfall ---
// If you use `{}` curly braces in an arrow function, you MUST write `return`.
// Bad:  nums.map((n) => { n * 2 });         // returns [undefined, undefined, undefined, undefined]
// Good: nums.map((n) => { return n * 2; }); // or simply: nums.map((n) => n * 2)

// --- React Note ---
// In React, .map() is how we render lists in JSX (NOT .forEach(), because .forEach() returns undefined):
//   <ul>
//     {products.map((product) => (
//       <li key={product.id}>{product.name} - ${product.price}</li>
//     ))}
//   </ul>


// ============================================================
// 2. .filter() — KEEP ONLY MATCHING ELEMENTS
// ============================================================
// Syntax: array.filter((element, index, array) => booleanCondition)
// - Callback must return true (keep element) or false (drop element).
// - Returns a NEW array with length <= original length (returns [] if none match).
// - Does NOT modify the elements themselves — it only selects or excludes them.

// --- 2A. Basic filtering on primitives ---
const scores = [45, 82, 91, 60, 38, 75];
const passingScores = scores.filter((score) => score >= 60);
console.log(passingScores); // [82, 91, 60, 75]

// --- 2B. Filtering an array of objects ---
// Get only in-stock products:
const availableProducts = products.filter((product) => product.inStock);
console.log(availableProducts.map((p) => p.name)); // ["Laptop", "Mouse", "Notebook"]

// Combine multiple conditions (tech items under $500):
const affordableTech = products.filter(
    (product) => product.category === "tech" && product.price < 500
);
console.log(affordableTech); // [{ id: 2, name: "Mouse", price: 25, category: "tech", inStock: true }]

// Search filter (case-insensitive — very common for React search bars):
const searchQuery = "lap";
const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
);
console.log(searchResults.map((p) => p.name)); // ["Laptop"]

// --- 2C. Deleting an item by ID immutably (Classic React state delete pattern!) ---
const idToRemove = 3;
const remainingProducts = products.filter((product) => product.id !== idToRemove);
console.log(remainingProducts.map((p) => p.id)); // [1, 2, 4]

// --- Common Pitfall ---
// .filter() only checks truthiness; it does NOT transform values.
// products.filter((p) => p.name) returns the whole product objects (because non-empty strings are truthy),
// NOT an array of names! Use .map() to extract/transform values.


// ============================================================
// 3. .reduce() — COMBINE INTO A SINGLE VALUE
// ============================================================
// Syntax: array.reduce((accumulator, currentValue, index, array) => nextAccumulator, initialValue)
// - `accumulator` (acc): carries the running result from the previous iteration.
// - `currentValue` (curr): the current array element being processed.
// - `initialValue`: starting value of `acc` (e.g., 0 for sums, {} for objects, [] for arrays).
// - Returns ANY single value: a number, string, boolean, object, or new array.

// --- 3A. Sum of numbers (with step-by-step trace) ---
const prices = [10, 20, 30, 40];
const total = prices.reduce((acc, curr) => {
    return acc + curr;
}, 0);
// Iteration 1: acc = 0,  curr = 10 -> returns 10
// Iteration 2: acc = 10, curr = 20 -> returns 30
// Iteration 3: acc = 30, curr = 30 -> returns 60
// Iteration 4: acc = 60, curr = 40 -> returns 100
console.log(total); // 100

// --- 3B. Shopping cart total (Classic React derived state!) ---
const cart = [
    { name: "Keyboard", price: 80, qty: 1 },
    { name: "Cable", price: 15, qty: 2 },
    { name: "Mousepad", price: 20, qty: 1 },
];

const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(cartTotal); // 130

// --- 3C. Finding the maximum value ---
const highestPrice = products.reduce(
    (max, product) => (product.price > max ? product.price : max),
    0
);
console.log(highestPrice); // 1000

// --- 3D. Building an object (Counting occurrences / Grouping) ---
// Count how many products exist in each category:
const categoryCounts = products.reduce((counts, product) => {
    const cat = product.category;
    counts[cat] = (counts[cat] || 0) + 1;
    return counts;
}, {}); // <-- initialValue is an empty object `{}`
console.log(categoryCounts); // { tech: 2, home: 1, office: 1 }

// Group products by category into an object of arrays:
const groupedByCategory = products.reduce((groups, product) => {
    const cat = product.category;
    if (!groups[cat]) {
        groups[cat] = [];
    }
    groups[cat].push(product.name);
    return groups;
}, {});
console.log(groupedByCategory); // { tech: ["Laptop", "Mouse"], home: ["Desk Lamp"], office: ["Notebook"] }

// --- Best Practice: ALWAYS pass `initialValue` ---
// If you omit `initialValue` and the array is empty (`[]`), .reduce() throws a TypeError!
// Passing `0`, `{}`, or `[]` makes it safe for empty arrays and guarantees the output type.
const emptySum = [].reduce((acc, n) => acc + n, 0);
console.log(emptySum); // 0 (no error!)


// ============================================================
// 4. CHAINING .filter(), .map(), AND .reduce()
// ============================================================
// Because .filter() and .map() return new arrays, we can chain them together cleanly.
// Tip: Put .filter() BEFORE .map() so you don't waste work transforming items you will drop!

// Example 1: Get formatted labels of all in-stock products
const inStockLabels = products
    .filter((product) => product.inStock)
    .map((product) => `${product.name} ($${product.price})`);
console.log(inStockLabels); // ["Laptop ($1000)", "Mouse ($25)", "Notebook ($10)"]

// Example 2: Total price of all in-stock "tech" products after a 10% discount
const discountedTechTotal = products
    .filter((product) => product.inStock && product.category === "tech") // keep Laptop & Mouse
    .map((product) => product.price * 0.9)                               // [900, 22.5]
    .reduce((sum, price) => sum + price, 0);                             // 922.5
console.log(discountedTechTotal); // 922.5


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Method      | Purpose                         | Return Value          | Mutates Original? | Common React Use Case
// ------------|---------------------------------|-----------------------|-------------------|---------------------------------------
// .map()      | Transform every item            | New array (same len)  | No                | Render JSX lists, update item in state
// .filter()   | Keep items passing a condition  | New array (<= len)    | No                | Search/filter UI, delete item in state
// .reduce()   | Fold array into one result      | Any single value      | No                | Cart totals, counts, grouping data
