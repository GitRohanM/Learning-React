// ============================================================
// 6. REAL DOM & VIRTUAL DOM (Brief Guide)
// How React efficiently updates what you see on screen
// ============================================================


// ============================================================
// 1. WHAT IS THE REAL DOM?
// ============================================================
// The Real DOM (Document Object Model) is the browser's live tree of HTML nodes.
// - Updating it directly can force the browser to recalculate layout and repaint.
// - Rebuilding large parts of the Real DOM on every small change is slow and
//   can wipe out UI state (like text typed inside an <input>).


// ============================================================
// 2. WHAT IS THE VIRTUAL DOM?
// ============================================================
// The Virtual DOM is a lightweight JavaScript object copy of the UI kept in memory.
// JSX like `<h1>Hello</h1>` becomes a plain JS object:
//   { type: "h1", props: { children: "Hello" } }
//
// Creating and comparing JS objects in memory is much faster than touching the Real DOM.


// ============================================================
// 3. HOW REACT UPDATES THE UI (Trigger -> Render -> Commit)
// ============================================================
// 1. TRIGGER : Initial page load OR a state/prop update happens.
// 2. RENDER  : React calls your component, builds a new Virtual DOM tree, and
//              diffs (compares) it with the previous one ("Reconciliation").
// 3. COMMIT  : React patches ONLY the exact Real DOM nodes that actually changed!


// ============================================================
// 4. EXAMPLE: ONLY CHANGED NODES ARE UPDATED
// ============================================================
// Suppose `ClockPanel` re-renders every second with a new `time` prop.
// - React compares the old & new Virtual DOM.
// - Only the text inside `<h2>` changed -> React updates ONLY that text node.
// - The `<input>` didn't change -> React leaves it untouched, so whatever you
//   are typing stays intact!

export default function ClockPanel({ time = "10:00:00 AM" }) {
    return (
        <section>
            <h2>Current Time: {time}</h2>
            <input type="text" placeholder="Type here — won't reset on re-render!" />
        </section>
    );
}


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Aspect          | Real DOM                        | Virtual DOM (React)
// ----------------|---------------------------------|------------------------------------
// Where it lives  | Browser (actual HTML elements)  | Memory (lightweight JS objects)
// Update speed    | Slower (reflow & repaint cost)  | Fast (in-memory JS diffing)
// How it updates  | Directly mutates DOM nodes      | Diffs trees, commits minimal patch
// Unchanged nodes | Easy to accidentally recreate   | Left untouched (preserves UI state)
