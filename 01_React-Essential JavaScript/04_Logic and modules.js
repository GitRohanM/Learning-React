// ============================================================
// LOGIC AND MODULES
// Ternary Operators, Logical Short-Circuiting (&&), & ES Modules (import/export)
// Essential JavaScript concepts for React (conditional rendering & file structure)
// ============================================================


// ============================================================
// 1. TERNARY OPERATOR (condition ? valueIfTrue : valueIfFalse)
// ============================================================
// A compact inline alternative to `if / else`.
// Why it's essential in React:
//   JSX `{ ... }` only accepts EXPRESSIONS (code that produces a value),
//   NOT statements like `if / else`. The ternary operator IS an expression!

// --- 1A. Basic ternary ---
const age = 20;

// With if/else (statement):
// let status;
// if (age >= 18) { status = "Adult"; } else { status = "Minor"; }

// With ternary (expression — cleaner and works with `const`):
const accessStatus = age >= 18 ? "Adult" : "Minor";
console.log(accessStatus); // "Adult"

// --- 1B. Ternary inside template literals (great for dynamic CSS classes in React) ---
const isDarkMode = true;
const buttonClass = `btn ${isDarkMode ? "btn-dark" : "btn-light"}`;
console.log(buttonClass); // "btn btn-dark"

const itemCount = 1;
console.log(`You have ${itemCount} ${itemCount === 1 ? "item" : "items"}.`);
// "You have 1 item."

// --- 1C. Chained (nested) ternaries ---
// Works for 2-3 conditions, but avoid deep nesting because it hurts readability!
const score = 85;
const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : "F";
console.log(grade); // "B"

// Tip: For many conditions, prefer a helper function or an object lookup:
const roleLabels = {
    admin: "Administrator",
    editor: "Content Editor",
    viewer: "Read-Only User",
};
const currentRole = "editor";
console.log(roleLabels[currentRole] ?? "Guest"); // "Content Editor"

// --- React JSX Example (Choose between Component A or Component B) ---
// function Greeting({ isLoggedIn }) {
//     return (
//         <div>
//             {isLoggedIn ? <h1>Welcome back!</h1> : <button>Sign In</button>}
//         </div>
//     );
// }


// ============================================================
// 2. LOGICAL SHORT-CIRCUITING (&&, plus || and ??)
// ============================================================
// First, remember JavaScript's FALSY values (there are only 7 core ones):
//   false, 0, -0, "", null, undefined, NaN
// Everything else is TRUTHY — including [], {}, "0", "false", and negative numbers!

// ------------------------------------------------------------
// 2A. Logical AND (&&) — "If left is truthy, return right"
// ------------------------------------------------------------
// How short-circuiting works:
//   - If left is FALSY  -> stops immediately ("short-circuits") and returns LEFT.
//   - If left is TRUTHY -> evaluates and returns RIGHT.

const isLoggedIn = true;
const isAdmin = false;

console.log(isLoggedIn && "Show Dashboard"); // "Show Dashboard" (left is truthy -> returns right)
console.log(isAdmin && "Show Admin Panel");  // false            (left is falsy  -> short-circuits!)

// Guarding execution (the function only runs if the left side is truthy):
const hasPermission = true;
hasPermission && console.log("Action permitted!"); // Logs: "Action permitted!"

const isMuted = false;
isMuted && console.log("This will never run");     // Skipped completely!

// --- React JSX Example (Render something OR render nothing) ---
// Use `&&` when there is NO "else" branch:
//   {hasUnreadMessages && <span className="badge">New!</span>}
// (React ignores `false`, `null`, and `undefined` in JSX and renders nothing.)

// --- CRITICAL REACT GOTCHA: NEVER put a number directly on the left of &&! ---
const notifications = 0;

// BUG in React JSX:
//   `0 && "You have notifications"` returns `0` (NOT `false`)!
//   React DOES render the number `0` onto the screen as literal text "0"!
console.log(notifications && "You have notifications"); // 0  <-- BUG in JSX!

// FIX: Convert the left side into an explicit boolean (`> 0` or `Boolean(...)`):
console.log(notifications > 0 && "You have notifications"); // false <-- SAFE in JSX!

// ------------------------------------------------------------
// 2B. Quick Companion Operators: Logical OR (||) & Nullish Coalescing (??)
// ------------------------------------------------------------
// Often used alongside `&&` for fallback/default values in React props & UI.

// Logical OR (||): returns RIGHT if LEFT is ANY falsy value (false, 0, "", null, undefined).
const userName = "";
console.log(userName || "Anonymous"); // "Anonymous"

// Pitfall with || when `0` or `""` is a VALID value:
const stockCount = 0;
console.log(stockCount || "Out of stock"); // "Out of stock" (0 is treated as falsy!)

// Nullish Coalescing (??): returns RIGHT ONLY if LEFT is `null` or `undefined`.
console.log(stockCount ?? "Out of stock"); // 0 (0 is preserved!)
console.log(null ?? "Default value");      // "Default value"
console.log(undefined ?? "Default value"); // "Default value"


// ============================================================
// 3. ES MODULES (import / export)
// ============================================================
// ES Modules let you split JavaScript into separate, reusable files (modules).
// In React, almost every component, custom hook, and utility lives in its own file.
//
// Note: Top-level `import`/`export` syntax requires `"type": "module"` in package.json,
// a `.mjs` extension, or a bundler (Vite / Next.js / React). The examples below are
// commented out so this notes file stays directly runnable with `node`.

// ------------------------------------------------------------
// 3A. Named Exports & Imports (Multiple per file)
// ------------------------------------------------------------
// - A file can have MANY named exports.
// - Imports MUST use curly braces `{}` and match the EXACT exported name.
//
// --- File: utils/math.js ---
// export const PI = 3.14159;                  // Inline named export
// export function add(a, b) { return a + b; } // Inline named export
//
// const multiply = (a, b) => a * b;
// export { multiply };                        // Export list at bottom of file
//
// --- File: App.js ---
// import { PI, add } from "./utils/math.js";        // Exact names inside {}
// import { add as sum } from "./utils/math.js";     // Rename on import with `as`
// import * as math from "./utils/math.js";          // Namespace import -> math.add(2, 3), math.PI

// ------------------------------------------------------------
// 3B. Default Exports & Imports (Only ONE per file)
// ------------------------------------------------------------
// - A file can have AT MOST ONE default export (commonly used for the main React component).
// - Imports do NOT use curly braces `{}` and you can give it ANY local name.
//
// --- File: components/Button.jsx ---
// export default function Button({ label }) {
//     return <button>{label}</button>;
// }
//
// --- File: App.jsx ---
// import Button from "./components/Button.jsx";     // No curly braces!
// import PrimaryBtn from "./components/Button.jsx"; // Valid: can choose any name

// ------------------------------------------------------------
// 3C. Combining Default + Named Exports (Very common in React!)
// ------------------------------------------------------------
// A file can have ONE default export AND multiple named exports at the same time.
//
// --- File: components/Card.jsx ---
// export const CARD_PADDING = 16;          // Named export
// export function CardHeader() { ... }     // Named export
// export default function Card() { ... }   // Default export
//
// --- File: App.jsx ---
// import Card, { CARD_PADDING, CardHeader } from "./components/Card.jsx";
//
// Classic React library import example:
// import React, { useState, useEffect } from "react";

// ------------------------------------------------------------
// 3D. Re-exporting / Barrel Files (index.js)
// ------------------------------------------------------------
// Collects exports from multiple files into one clean entry point.
//
// --- File: components/index.js ---
// export { default as Button } from "./Button.jsx";
// export { default as Card } from "./Card.jsx";
//
// --- File: App.jsx ---
// import { Button, Card } from "./components"; // Cleaner single import!

// ------------------------------------------------------------
// 3E. Key Rules & Best Practices for ES Modules
// ------------------------------------------------------------
// 1. Local files MUST start with a relative path (`./` or `../`).
//    Bare names without `./` (e.g., `import { useState } from "react"`) look in `node_modules`.
// 2. Module scope: variables declared in a module are PRIVATE to that file unless exported.
// 3. Strict mode: ES Modules run in `"use strict"` mode automatically.
// 4. Static imports: `import` / `export` belong at the top level of the file (not inside `if` blocks),
//    which allows bundlers like Vite to "tree-shake" (remove unused code).


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// CONDITIONAL LOGIC IN JSX:
// - `cond ? A : B`  -> Choose between TWO outcomes (if/else expression).
// - `cond && A`     -> Render `A` if truthy, else nothing (guard numbers with `count > 0 && A`!).
// - `val || fallback` -> Fallback for ANY falsy value (0, "", false, null, undefined).
// - `val ?? fallback` -> Fallback ONLY for `null` or `undefined` (safe for 0 and "").
//
// ES MODULES:
// Export Type | Count per File | Import Syntax                   | Can Rename Directly?
// ------------|----------------|---------------------------------|------------------------------
// Named       | Unlimited      | import { name } from "./file"   | Only with `as` ({ a as b })
// Default     | Max 1          | import AnyName from "./file"    | Yes (pick any name directly)
