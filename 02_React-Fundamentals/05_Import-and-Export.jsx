// ============================================================
// 5. IMPORT & EXPORT COMPONENTS (Brief Guide)
// Splitting React components across files with ES Modules
// ============================================================
// Two export types in JavaScript/React:
//   - Default Export : at most ONE per file (usually the file's main component).
//   - Named Export   : UNLIMITED per file (great for helper components & utilities).


// ============================================================
// 1. NAMED EXPORTS (Multiple per file)
// ============================================================
// Export with `export` before the declaration.
// Import MUST use curly braces `{}` and match the exact name:
//   import { Avatar, StatusTag } from "./05_Import-and-Export";
//   import { StatusTag as Tag } from "./05_Import-and-Export"; // rename with `as`

export function Avatar({ name }) {
    return <span>[{name[0]}]</span>;
}

export function StatusTag({ text = "Active" }) {
    return <span>{text}</span>;
}


// ============================================================
// 2. DEFAULT EXPORT (Only ONE per file)
// ============================================================
// Export with `export default`.
// Import does NOT use `{}` and can be given ANY local name:
//   import UserProfile from "./05_Import-and-Export";
//   import MyProfile from "./05_Import-and-Export"; // valid!
//
// Tip: Always give default-exported components a real function name
// (avoid anonymous `export default () => {}`, which makes React DevTools harder to debug).

export default function UserProfile() {
    return (
        <article>
            <Avatar name="Rohan" />
            <h2>Rohan</h2>
            <StatusTag text="Learning React" />
        </article>
    );
}


// ============================================================
// 3. COMBINING BOTH IN ONE IMPORT
// ============================================================
// Default export comes FIRST (outside `{}`), named exports come inside `{}`:
//   import UserProfile, { Avatar, StatusTag } from "./05_Import-and-Export";
//
// Local files always start with `./` or `../`.
// Library imports have no `./`: `import { useState } from "react";`


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Type    | Max / File | Export Syntax                  | Import Syntax
// --------|------------|--------------------------------|-------------------------------------
// Default | 1          | `export default function A()`  | `import AnyName from "./file"`
// Named   | Unlimited  | `export function B()`          | `import { B } from "./file"`
// Both    | 1 + Many   | Both in the same file          | `import A, { B } from "./file"`
