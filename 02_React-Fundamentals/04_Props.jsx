// ============================================================
// 4. PROPS (PROPERTIES)
// Passing data from parent components to child components:
// destructuring, data types, defaults, `children`, spread, & immutability
// ============================================================
// Core rule: Props are the arguments you pass into a React component,
// just like passing arguments to a JavaScript function.
//   - Data flows ONE WAY: Parent -> Child (top-down).
//   - Props are READ-ONLY (immutable): a child must NEVER modify its own props!


// ============================================================
// 1. READING PROPS: `props` OBJECT vs DESTRUCTURING
// ============================================================

// --- 1A. Receiving the full `props` object ---
function GreetingBasic(props) {
    return (
        <p>
            Hello, {props.name}! Welcome to {props.course}.
        </p>
    );
}

// --- 1B. Destructuring props directly in the parameter list (Idiomatic React!) ---
// Cleaner and makes it obvious at a glance which props the component expects.
function ProductCard({ name, price, color, inStock, specs, tags, onBuy }) {
    return (
        <article className="product-card">
            <h3>{name}</h3>
            <p>Price: ₹{price.toLocaleString("en-IN")}</p>
            <p>Color: {color}</p>
            <p>Status: {inStock ? "In Stock" : "Out of Stock"}</p>
            <p>
                Specs: {specs.storage} / {specs.ram} RAM
            </p>
            <ul>
                {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
            {/* Event callback passed down from parent as a prop */}
            <button type="button" disabled={!inStock} onClick={() => onBuy(name)}>
                Buy Now
            </button>
        </article>
    );
}


// ============================================================
// 2. DEFAULT PROP VALUES
// ============================================================
// Assign default values directly while destructuring using `=`.
// IMPORTANT: Default values are ONLY used when the prop is missing OR `undefined`.
// Passing `null` or `0` will NOT trigger the default value!

function Badge({ label = "New", color = "#2563eb", count = 0 }) {
    return (
        <span
            style={{
                backgroundColor: color,
                color: "#ffffff",
                padding: "4px 10px",
                borderRadius: 6,
                marginRight: 8,
            }}
        >
            {label} {count > 0 && `(${count})`}
        </span>
    );
}


// ============================================================
// 3. THE SPECIAL `children` PROP (COMPOSITION / WRAPPERS)
// ============================================================
// Anything placed BETWEEN a component's opening and closing tags:
//   <Card title="Info"> ...anything here... </Card>
// is automatically received by `Card` as the `children` prop!
// This lets you build flexible wrapper/layout components (cards, modals, panels).

function Card({ title, children }) {
    return (
        <section
            style={{
                border: "1px solid #cbd5e1",
                borderRadius: 10,
                padding: 16,
                marginBottom: 16,
            }}
        >
            <h2>{title}</h2>
            <div className="card-body">{children}</div>
        </section>
    );
}


// ============================================================
// 4. FORWARDING PROPS WITH SPREAD SYNTAX (`...props`)
// ============================================================
// You can collect remaining props with rest (`...rest`) and forward them
// to an inner element using JSX spread (`{...rest}`).
//
// Tip from React docs: Use `{...props}` with restraint! It is great for thin
// wrapper components (like a custom `<PrimaryButton>`), but explicit props
// are easier to read and debug in most application components.

function PrimaryButton({ label, ...buttonProps }) {
    return (
        <button
            type="button"
            style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "8px 16px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
            }}
            {...buttonProps}
        >
            {label}
        </button>
    );
}


// ============================================================
// 5. PROPS ARE READ-ONLY (IMMUTABILITY RULE)
// ============================================================
// NEVER mutate a prop inside the child component:
//
//   BAD:
//   function DiscountedPrice(props) {
//       props.price = props.price * 0.9; // WRONG! Mutating props breaks React!
//       return <p>{props.price}</p>;
//   }
//
//   GOOD: Compute a new local variable from the prop instead:
function DiscountedPrice({ price, discountPercent = 10 }) {
    const finalPrice = price * (1 - discountPercent / 100);
    return (
        <p>
            Original: ₹{price} → After {discountPercent}% off: <strong>₹{finalPrice}</strong>
        </p>
    );
}
// Note: If a component needs to CHANGE data over time (like a counter or input),
// it must use State (`useState`), NOT mutate props.


// ============================================================
// 6. PUTTING IT ALL TOGETHER: PASSING ALL PROP TYPES FROM A PARENT
// ============================================================
const phoneCatalog = [
    {
        id: 1,
        name: "iPhone 16",
        price: 70000,
        color: "Blue",
        inStock: true,
        specs: { storage: "128GB", ram: "8GB" },
        tags: ["5G", "A18 Chip"],
    },
    {
        id: 2,
        name: "iPhone 17",
        price: 85000,
        color: "Silver",
        inStock: false,
        specs: { storage: "256GB", ram: "8GB" },
        tags: ["5G", "120Hz OLED"],
    },
];

export { GreetingBasic, ProductCard, Badge, Card, PrimaryButton, DiscountedPrice };

export default function PropsDemo() {
    function handleBuy(productName) {
        console.log(`Added "${productName}" to cart!`);
    }

    return (
        <main>
            {/* 1. Passing string props */}
            <GreetingBasic name="Rohan" course="React Fundamentals" />

            {/* 2. Passing different data types as props:
                   - Strings: quotes `"..."`
                   - Numbers, Booleans, Arrays, Objects, Functions: curly braces `{...}`
                   - Boolean shorthand: `inStock` alone is identical to `inStock={true}` */}
            <ProductCard
                name="Pixel 10"
                price={79999}
                color="Obsidian"
                inStock
                specs={{ storage: "256GB", ram: "12GB" }}
                tags={["5G", "AI Camera"]}
                onBuy={handleBuy}
            />

            {/* 3. Passing props dynamically from an array with .map() */}
            <Card title="Phone Catalog">
                {phoneCatalog.map((phone) => (
                    <ProductCard
                        key={phone.id}
                        name={phone.name}
                        price={phone.price}
                        color={phone.color}
                        inStock={phone.inStock}
                        specs={phone.specs}
                        tags={phone.tags}
                        onBuy={handleBuy}
                    />
                ))}
            </Card>

            {/* 4. Default prop values in action */}
            <Card title="Badges & Default Props">
                <Badge />                                   {/* uses all defaults */}
                <Badge label="Sale" color="#dc2626" count={3} />
                <Badge label="Draft" color={undefined} />   {/* undefined triggers default */}
            </Card>

            {/* 5. Composition via `children` + prop forwarding + derived value */}
            <Card title="Special Offer">
                <DiscountedPrice price={70000} discountPercent={15} />
                <PrimaryButton
                    label="Claim Offer"
                    aria-label="Claim 15% discount offer"
                    onClick={() => console.log("Offer claimed!")}
                />
            </Card>
        </main>
    );
}


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Pattern                           | Syntax / Example
// ----------------------------------|-----------------------------------------------------
// Pass string prop                  | `<Greeting name="Rohan" />`
// Pass number / bool / obj / fn     | `<Product price={70000} inStock onBuy={handleBuy} />`
// Read with destructuring           | `function Product({ name, price }) { ... }`
// Default value (missing/undefined) | `function Badge({ label = "New" }) { ... }`
// Nested JSX (`children`)           | `<Card><p>Hello</p></Card>` -> `function Card({ children })`
// Forward remaining props           | `function Btn({ label, ...rest }) { return <button {...rest}>{label}</button>; }`
// Immutability                      | NEVER mutate props; derive a new variable or use `useState`.
