// ============================================================
// 3. EMBEDDING JAVASCRIPT EXPRESSIONS IN JSX: { }
// Using curly braces to display dynamic data, compute values,
// set dynamic attributes, style objects, conditions, and lists
// ============================================================
// Core rule: Inside JSX, curly braces `{ ... }` open a "window" back
// into JavaScript. You can place ANY JavaScript EXPRESSION inside `{ }`.
//
// Expression vs Statement:
//   - EXPRESSION (ALLOWED in `{}`): produces a value
//       variables, math (`a + b`), ternary (`a ? b : c`), `&&`, `??`,
//       function calls (`fn()`), array `.map()`, template literals.
//   - STATEMENT (NOT ALLOWED in `{}`): performs an action without returning a value
//       `if / else`, `for`, `while`, `switch`, `const x = 5`.


const user = {
    firstName: "Rohan",
    lastName: "Mehta",
    role: "Frontend Learner",
    avatarUrl: "https://api.dicebear.com/9.x/initials/svg?seed=RM",
    avatarSize: 72,
    isOnline: true,
    unreadNotifications: 0,
    bio: null,
};

const cartItems = [
    { id: 1, name: "Mechanical Keyboard", price: 80, qty: 1 },
    { id: 2, name: "USB-C Cable", price: 15, qty: 2 },
    { id: 3, name: "Desk Mat", price: 25, qty: 1 },
];

function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
}


// ============================================================
// 1. WHERE CURLY BRACES WORK IN JSX
// ============================================================
// You can use `{ }` in TWO places:
//   1. As TEXT content directly inside a JSX tag:  <h1>{user.firstName}</h1>
//   2. As an ATTRIBUTE value right after `=`:      src={user.avatarUrl}
//
// PITFALL: Never wrap `{ }` in quotes for attributes!
//   BAD:  <img src="{user.avatarUrl}" />   -> literal string "{user.avatarUrl}"!
//   GOOD: <img src={user.avatarUrl} />     -> evaluates the JS variable!

function DynamicTextAndAttributes() {
    return (
        <section>
            {/* Dynamic text: variables, template literals, and method calls */}
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <p>Role: {user.role.toUpperCase()}</p>

            {/* Dynamic attributes: use `{}` INSTEAD of quotes */}
            <img
                className="avatar"
                src={user.avatarUrl}
                alt={`Profile photo of ${user.firstName}`}
                width={user.avatarSize}
                height={user.avatarSize}
            />
        </section>
    );
}


// ============================================================
// 2. ARITHMETIC, FUNCTION CALLS, & DERIVED VALUES
// ============================================================
function CartSummary() {
    // Tip: Complex calculations are often cleaner when computed BEFORE `return`
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxRate = 0.1;

    return (
        <section>
            <h2>Cart Summary ({cartItems.length} items)</h2>
            <p>Subtotal: {formatPrice(subtotal)}</p>
            <p>Tax (10%): {formatPrice(subtotal * taxRate)}</p>
            <p>
                <strong>Total: {formatPrice(subtotal * (1 + taxRate))}</strong>
            </p>
        </section>
    );
}


// ============================================================
// 3. CONDITIONAL EXPRESSIONS & LIST RENDERING IN JSX
// ============================================================
function ConditionsAndLists() {
    return (
        <section>
            {/* 3A. Ternary operator: pick between two outcomes */}
            <p>Status: {user.isOnline ? "Online" : "Offline"}</p>

            {/* 3B. Nullish coalescing (??): fallback for null / undefined */}
            <p>Bio: {user.bio ?? "No bio added yet."}</p>

            {/* 3C. Logical AND (&&): render something OR nothing */}
            {/* GOTCHA: Use `> 0`, NEVER `user.unreadNotifications && ...` because
                `0 && ...` evaluates to `0`, which React renders as text "0"! */}
            {user.unreadNotifications > 0 && (
                <span>{user.unreadNotifications} unread notifications</span>
            )}

            {/* 3D. Rendering lists with .map() (always include a unique `key`) */}
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} x{item.qty} — {formatPrice(item.price * item.qty)}
                    </li>
                ))}
            </ul>
        </section>
    );
}


// ============================================================
// 4. "DOUBLE CURLIES" `{{ }}`: INLINE STYLES & JS OBJECTS
// ============================================================
// `style={{ ... }}` is NOT special syntax — it is simply a regular JS object
// `{ backgroundColor: "#1e293b", color: "#f8fafc" }` placed inside JSX `{ }`.
//
// Inline style rules in JSX:
//   - Property names are camelCase (`backgroundColor`, `fontSize`, `borderRadius`).
//   - Plain numbers for dimension properties (like `padding: 16`) default to `px`.

function InlineStylesExample() {
    // You can also define the style object as a variable for cleaner JSX:
    const badgeStyle = {
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        backgroundColor: user.isOnline ? "#16a34a" : "#64748b",
        color: "#ffffff",
        fontSize: 12,
    };

    return (
        <div
            style={{
                backgroundColor: "#0f172a",
                color: "#f8fafc",
                padding: 16,
                borderRadius: 12,
            }}
        >
            <h3>Styled with JS Objects</h3>
            <span style={badgeStyle}>{user.isOnline ? "Online" : "Offline"}</span>
        </div>
    );
}


// ============================================================
// 5. WHAT REACT RENDERS vs IGNORES vs CRASHES ON
// ============================================================
function RenderingRulesNote() {
    const emptyValue = null;
    const isHidden = false;

    return (
        <section>
            {/* Strings and numbers (including 0) ARE rendered: */}
            <p>Rendered string & number: {"React"} {19} / Zero renders too: {0}</p>

            {/* Booleans (true/false), null, and undefined are IGNORED (render nothing): */}
            <p>Ignored values produce nothing here: {true}{isHidden}{emptyValue}{undefined}</p>

            {/* PITFALL — CRASH: You CANNOT render a plain JS object directly!
                BAD:  <p>{user}</p>        -> Error: Objects are not valid as a React child!
                GOOD: <p>{user.firstName}</p>  or  <pre>{JSON.stringify(user, null, 2)}</pre>
            */}
        </section>
    );
}


export {
    DynamicTextAndAttributes,
    CartSummary,
    ConditionsAndLists,
    InlineStylesExample,
    RenderingRulesNote,
};

export default function EmbeddingExpressionsDemo() {
    return (
        <main>
            <DynamicTextAndAttributes />
            <CartSummary />
            <ConditionsAndLists />
            <InlineStylesExample />
            <RenderingRulesNote />
        </main>
    );
}


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Syntax / Case                | Behavior in JSX
// -----------------------------|-----------------------------------------------------
// `{variable}`, `{a + b}`      | Evaluates JS expression and displays the result.
// `src={url}` (no quotes!)     | Passes JS value as attribute (`src="{url}"` is wrong).
// `style={{ color: "red" }}`   | JS style object inside JSX curlies (camelCase keys).
// `cond ? A : B`               | Inline if/else expression inside JSX.
// `count > 0 && <Tag />`       | Conditional render (always convert numbers to boolean).
// `true / false / null / undef`| Ignored by React (renders nothing).
// `{plainObject}`              | CRASHES! Render specific fields (`{obj.name}`) instead.
// `if (...) {}` / `for (...)`  | Syntax error inside `{}` — statements aren't allowed.
