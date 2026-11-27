// ============================================================
// 1. REACT COMPONENTS
// Building blocks of a React UI: functional components, naming rules,
// nesting/composition, reusability, and common pitfalls
// ============================================================
// Core rule: A React component is simply a JavaScript function that
// returns JSX markup describing what should appear on the screen.
//
// Note (React 17+ / React 19): With modern bundlers like Vite, you do NOT
// need `import React from "react"` just to write JSX (automatic JSX runtime).


// ============================================================
// 1. DEFINING A COMPONENT
// ============================================================
// Component names MUST start with a CAPITAL letter (PascalCase).
//   - `<WelcomeBanner />` -> React treats this as YOUR component.
//   - `<welcomeBanner />` -> React treats lowercase tags as built-in HTML tags!

// --- 1A. Function declaration (most common in React docs) ---
function WelcomeBanner() {
    return (
        <header>
            <h1>Learning React</h1>
            <p>Components let you split the UI into independent, reusable pieces.</p>
        </header>
    );
}

// --- 1B. Arrow function (concise & also widely used) ---
const Footer = () => {
    return (
        <footer>
            <small>Built with React functional components</small>
        </footer>
    );
};

// --- 1C. Single-line vs multi-line return ---
// Single-line return does NOT need parentheses:
function Divider() {
    return <hr />;
}

// Multi-line return MUST be wrapped in parentheses `(...)`!
// PITFALL: Without parentheses, JavaScript inserts a semicolon right after `return`
// and your component returns `undefined` (ignoring all markup on the lines below):
//
//   BAD:
//   function Broken() {
//       return
//           <h1>This line is NEVER reached!</h1>;
//   }
//
//   GOOD:
function StatusBadge() {
    return (
        <span className="badge">
            Active
        </span>
    );
}


// ============================================================
// 2. COMPOSING & REUSING COMPONENTS
// ============================================================
// You build complex UIs by nesting smaller components inside larger ones,
// just like LEGO bricks. Once defined, a component can be reused anywhere.

function UserAvatar() {
    return (
        <img
            src="https://api.dicebear.com/9.x/initials/svg?seed=RM"
            alt="User avatar"
            width={48}
            height={48}
        />
    );
}

function ProfileCard() {
    return (
        <article className="profile-card">
            <UserAvatar />
            <h2>Developer Profile</h2>
            <StatusBadge />
        </article>
    );
}

// Reusing `<ProfileCard />` multiple times inside a parent component:
function TeamGallery() {
    return (
        <section>
            <h2>Team Members</h2>
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
        </section>
    );
}


// ============================================================
// 3. CRITICAL PITFALL: NEVER DEFINE A COMPONENT INSIDE ANOTHER COMPONENT
// ============================================================
// BAD — DO NOT DO THIS:
//
// function Parent() {
//     // Every time Parent re-renders, a brand-new Child function is created!
//     // React unmounts the old Child and mounts a new one, wiping out its state.
//     function Child() {
//         return <p>I lose my state on every parent render!</p>;
//     }
//     return <Child />;
// }
//
// GOOD — ALWAYS define every component at the top level of the file,
// and pass data down using props (covered in 04_Props.jsx).


// ============================================================
// 4. EXPORTING COMPONENTS (Named vs Default)
// ============================================================
// - Named exports: export multiple helper components from one file.
//     import { StatusBadge, ProfileCard } from "./01_Components";
// - Default export: export the main component of the file (max 1 per file).
//     import ComponentsDemo from "./01_Components";

export { WelcomeBanner, StatusBadge, ProfileCard, TeamGallery, Footer };

export default function ComponentsDemo() {
    return (
        <main>
            <WelcomeBanner />
            <Divider />
            <TeamGallery />
            <Divider />
            <Footer />
        </main>
    );
}


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Concept                | Rule / Takeaway
// -----------------------|----------------------------------------------------------
// What is a component?   | A JS function that returns JSX markup.
// Naming convention      | MUST start with a capital letter (PascalCase, e.g. `Card`).
// Multi-line return      | Wrap JSX in `return ( ... );` so JS doesn't auto-end return.
// Composition            | Nest small components inside parent components; reuse freely.
// Top-level definition   | Never declare a component inside another component.
