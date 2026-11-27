// ============================================================
// 2. JSX (JavaScript XML) & ITS CORE RULES
// Writing HTML-like markup inside JavaScript files
// ============================================================
// Core rule: JSX looks like HTML, but it is stricter because it compiles
// directly into JavaScript function calls (creating React element objects).
//
// The 3 Golden Rules of JSX:
//   1. Return a SINGLE root element.
//   2. Close ALL tags (including self-closing tags).
//   3. Use camelCase for most attributes (and JSX equivalents for JS keywords).


// ============================================================
// 1. RULE 1: RETURN A SINGLE ROOT ELEMENT
// ============================================================
// A JavaScript function can only return ONE value — so you cannot return
// two sibling JSX tags side-by-side without wrapping them.
//
// BAD (Syntax Error — adjacent JSX elements must be wrapped):
//   function Broken() {
//       return (
//           <h1>Title</h1>
//           <p>Subtitle</p>
//       );
//   }

// --- 1A. Option A: Wrap in a container element (adds a real <div> to the DOM) ---
function WrappedWithDiv() {
    return (
        <div className="hero">
            <h1>Welcome to JSX</h1>
            <p>Both elements live inside one parent div.</p>
        </div>
    );
}

// --- 1B. Option B: Wrap in a Fragment `<>...</>` (NO extra DOM node!) ---
// Fragments group multiple elements cleanly without polluting the HTML tree
// (super useful inside <table>, <ul>, or flex/grid layouts).
function WrappedWithFragment() {
    return (
        <>
            <h2>Using a React Fragment</h2>
            <p>No extra wrapper div is created in the browser DOM.</p>
        </>
    );
}

// Note: When rendering a Fragment inside `.map()` and you need a `key`,
// use the explicit `<Fragment key={...}>` syntax imported from "react":
//   import { Fragment } from "react";
//   items.map((item) => <Fragment key={item.id}>...</Fragment>)


// ============================================================
// 2. RULE 2: CLOSE ALL TAGS
// ============================================================
// In regular HTML, tags like <img>, <input>, <br>, <hr> can stay unclosed.
// In JSX, EVERY tag must be explicitly closed — void tags MUST end with `/>`.

function ProperlyClosedTags() {
    return (
        <section>
            <img
                src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                width={100}
            />
            <br />
            <hr />
            <input type="text" placeholder="Type your name..." />
            <ul>
                <li>Every opening tag has a matching closing tag</li>
                <li>Self-closing tags always end with /&gt;</li>
            </ul>
        </section>
    );
}


// ============================================================
// 3. RULE 3: camelCase ATTRIBUTES & RESERVED JS KEYWORDS
// ============================================================
// Because JSX turns into JavaScript objects, attribute names become JS keys:
//   - Hyphens aren't allowed in plain JS identifiers -> use camelCase.
//   - Reserved JS words (`class`, `for`) have special JSX names.
//
// Common HTML -> JSX conversions:
//   HTML         | JSX
//   -------------|------------
//   class        | className
//   for          | htmlFor
//   onclick      | onClick
//   onchange     | onChange
//   tabindex     | tabIndex
//   readonly     | readOnly
//   maxlength    | maxLength
//   stroke-width | strokeWidth
//
// EXCEPTIONS (keep hyphens for historical/spec reasons):
//   - `aria-*` attributes (e.g. `aria-label`, `aria-hidden`)
//   - `data-*` attributes (e.g. `data-testid`, `data-user-id`)

function JsxAttributesExample() {
    return (
        <form className="signup-form" data-testid="signup-form">
            <label htmlFor="email-input" className="form-label">
                Email Address
            </label>
            <input
                id="email-input"
                type="email"
                tabIndex={1}
                maxLength={80}
                readOnly={false}
                aria-label="Email Address"
                placeholder="you@example.com"
            />
            <button type="submit" className="btn-primary">
                Subscribe
            </button>
        </form>
    );
}


// ============================================================
// 4. COMMENTS INSIDE JSX
// ============================================================
// Inside JSX markup, standard `//` or `/* */` comments are treated as text!
// Wrap block comments inside curly braces: `{/* your comment */}`

function JsxCommentsExample() {
    return (
        <div>
            {/* This is a valid JSX comment — invisible in the rendered HTML */}
            <p>Only this paragraph is visible on screen.</p>
            {/*
                Multi-line JSX comments
                work the exact same way!
            */}
        </div>
    );
}


// ============================================================
// 5. UNDER THE HOOD: WHAT JSX COMPILES TO
// ============================================================
// You write JSX:
//   <h1 className="title">Hello React</h1>
//
// Vite / Babel compiles it into plain JavaScript:
//   jsx("h1", { className: "title", children: "Hello React" })
//
// Which returns a lightweight plain JS object (a React Element):
//   { type: "h1", props: { className: "title", children: "Hello React" }, ... }


export {
    WrappedWithDiv,
    WrappedWithFragment,
    ProperlyClosedTags,
    JsxAttributesExample,
    JsxCommentsExample,
};

export default function JsxRulesDemo() {
    return (
        <main>
            <WrappedWithDiv />
            <WrappedWithFragment />
            <ProperlyClosedTags />
            <JsxAttributesExample />
            <JsxCommentsExample />
        </main>
    );
}


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Rule                | HTML                         | JSX
// --------------------|------------------------------|------------------------------
// Root element        | Multiple roots allowed       | Single root (or `<>...</>`)
// Self-closing tags   | `<img src="...">`, `<br>`    | `<img src="..." />`, `<br />`
// CSS class           | `class="card"`               | `className="card"`
// Label binding       | `for="email"`                | `htmlFor="email"`
// Multi-word attrs    | `tabindex`, `maxlength`      | `tabIndex`, `maxLength`
// Exceptions          | `aria-label`, `data-id`      | `aria-label`, `data-id` (same!)
// Comments in markup  | `<!-- comment -->`           | `{/* comment */}`
