// ============================================================
// ASYNC DATA: Promises, async/await, fetch(), & localStorage
// Essential JavaScript concepts for React (API calls, loading/error
// states, and persisting client-side data in the browser)
// ============================================================


// ============================================================
// 1. WHY ASYNC JAVASCRIPT MATTERS
// ============================================================
// JavaScript is single-threaded (executes one thing at a time).
// Slow operations — like fetching data from an API or waiting on a timer —
// run ASYNCHRONOUSLY so they don't freeze the browser UI while waiting.


// ============================================================
// 2. PROMISES
// ============================================================
// A Promise represents the eventual result of an asynchronous operation.
//
// A Promise is always in one of 3 states:
//   1. pending   -> still running (initial state)
//   2. fulfilled -> succeeded (called `resolve(value)`)
//   3. rejected  -> failed    (called `reject(error)`)
// Once settled (fulfilled or rejected), a Promise's state can never change.

// --- 2A. Creating a Promise (Simulating an API call) ---
function fakeFetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Aarav", role: "Developer" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 50); // simulates 50ms network delay
    });
}

// --- 2B. Consuming a Promise with .then() / .catch() / .finally() ---
function promiseChainDemo() {
    return fakeFetchUser(1)
        .then((user) => {
            console.log("Promise resolved:", user.name); // "Promise resolved: Aarav"
            return user.role; // whatever you return is passed to the next .then()
        })
        .then((role) => {
            console.log("Chained .then() received role:", role); // "Developer"
        })
        .catch((error) => {
            // Catches any rejection from any step above
            console.error("Promise failed:", error.message);
        })
        .finally(() => {
            // Runs whether the promise succeeded OR failed (great for stopping loading spinners!)
            console.log("Promise .finally() always runs");
        });
}


// ============================================================
// 3. ASYNC / AWAIT (Modern, Cleaner Syntax for Promises)
// ============================================================
// `async/await` is syntactic sugar built on top of Promises.
// It makes asynchronous code read top-to-bottom like synchronous code.
//
// Key Rules:
//   - Adding `async` before a function makes it ALWAYS return a Promise.
//   - `await` pauses execution INSIDE that `async` function until the Promise settles.
//   - Always wrap `await` calls in `try / catch / finally` to handle rejections safely.

// --- 3A. Basic async / await with try / catch / finally ---
async function loadUser(userId) {
    try {
        const user = await fakeFetchUser(userId);
        console.log("async/await loaded:", user);
    } catch (error) {
        console.log("async/await caught error:", error.message);
    } finally {
        console.log("Done attempting to load user", userId);
    }
}

// --- 3B. Parallel vs Sequential Requests (Performance Tip!) ---
// BAD (Sequential — waits for #1 to finish before starting #2):
//   const user1 = await fakeFetchUser(1); // waits 50ms
//   const user2 = await fakeFetchUser(2); // waits another 50ms (100ms total)
//
// GOOD (Parallel — starts both at the same time with Promise.all!):
async function loadMultipleUsers() {
    // Promise.all resolves when ALL promises succeed, or rejects if ANY one fails.
    const [user1, user2] = await Promise.all([
        fakeFetchUser(1),
        fakeFetchUser(2),
    ]);
    console.log("Loaded in parallel:", user1.id, user2.id); // 1 2

    // Tip: Use `Promise.allSettled([...])` when you want results of all requests
    // even if some of them fail!
    const results = await Promise.allSettled([
        fakeFetchUser(1),
        fakeFetchUser(-1), // this one rejects
    ]);
    console.log(
        "allSettled statuses:",
        results.map((r) => r.status)
    ); // ["fulfilled", "rejected"]
}


// ============================================================
// 4. BROWSER API: fetch() — MAKING HTTP REQUESTS
// ============================================================
// `fetch(url, options)` is the built-in API for requesting data from servers.
// It returns a Promise and involves TWO awaits:
//   1. `const res = await fetch(url)` -> gets the HTTP Response (status, headers).
//   2. `const data = await res.json()` -> reads & parses the JSON body.
//
// CRITICAL GOTCHA:
//   `fetch()` ONLY rejects on NETWORK failures (offline, DNS failure, CORS block).
//   HTTP errors like 404 (Not Found) or 500 (Server Error) do NOT throw!
//   You MUST manually check `if (!response.ok)` and throw an error yourself.

// --- 4A. GET Request (Fetching data) ---
async function fetchPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");

        // Always check response.ok (true for HTTP status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json(); // parse JSON body
        return posts;
    } catch (error) {
        console.error("Failed to fetch posts:", error.message);
        return [];
    }
}

// --- 4B. POST Request (Sending JSON data to a server) ---
async function createPost(newPost) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // "GET" (default), "POST", "PUT", "PATCH", "DELETE"
        headers: {
            "Content-Type": "application/json", // tell server we are sending JSON
        },
        body: JSON.stringify(newPost), // body must be a JSON string, not a raw JS object
    });

    if (!response.ok) {
        throw new Error(`Create failed! Status: ${response.status}`);
    }

    return await response.json();
}

// --- 4C. React Pattern: Fetching Data in useEffect ---
// Note: Do NOT make the useEffect callback itself `async` (`useEffect(async () => ...)` is invalid
// because async functions return a Promise, whereas useEffect expects a cleanup function or undefined).
//
// function PostsList() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const controller = new AbortController(); // cancels request if component unmounts
//
//         async function loadPosts() {
//             try {
//                 const res = await fetch("/api/posts", { signal: controller.signal });
//                 if (!res.ok) throw new Error(`HTTP ${res.status}`);
//                 const data = await res.json();
//                 setPosts(data);
//             } catch (err) {
//                 if (err.name !== "AbortError") setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }
//
//         loadPosts();
//         return () => controller.abort(); // cleanup on unmount
//     }, []);
// }


// ============================================================
// 5. BROWSER API: localStorage — PERSISTING DATA IN THE BROWSER
// ============================================================
// `localStorage` saves key-value pairs inside the user's browser.
// - Persists even after refreshing the page or closing/reopening the browser.
// - Synchronous (no await needed) and holds ~5–10 MB per domain (origin).
// - ONLY stores STRINGS! Objects & arrays MUST be converted with JSON.stringify / JSON.parse.
// - Security note: NEVER store passwords or sensitive secrets in localStorage (any JS can read it).
// - Companion API: `sessionStorage` has the exact same methods, but clears when the tab closes.

// --- 5A. Core localStorage Methods (Run in Browser environment) ---
// localStorage.setItem("theme", "dark");        // Save a string
// const theme = localStorage.getItem("theme");  // Read -> "dark" (or `null` if key doesn't exist)
// localStorage.removeItem("theme");             // Delete a single key
// localStorage.clear();                         // Delete ALL keys for this site

// --- 5B. Storing Objects & Arrays (JSON.stringify + JSON.parse) ---
// Because localStorage only accepts strings, serialize before saving and parse when reading:
const userSettings = { theme: "dark", fontSize: 16, tags: ["react", "js"] };

const serialized = JSON.stringify(userSettings);
console.log("Serialized for localStorage:", serialized);
// '{"theme":"dark","fontSize":16,"tags":["react","js"]}'

// In browser:
// localStorage.setItem("settings", serialized);
// const raw = localStorage.getItem("settings");
// const parsed = raw ? JSON.parse(raw) : { theme: "light" }; // safe fallback when null

const parsedBack = JSON.parse(serialized);
console.log("Parsed back into object:", parsedBack.theme, parsedBack.tags);
// "dark" ["react", "js"]

// --- 5C. React Pattern: Syncing State with localStorage ---
// function useThemeExample() {
//     // Lazy initializer: reads localStorage ONLY once on first render
//     const [theme, setTheme] = useState(() => {
//         return localStorage.getItem("theme") ?? "light";
//     });
//
//     // Whenever `theme` changes, persist it to localStorage
//     useEffect(() => {
//         localStorage.setItem("theme", theme);
//     }, [theme]);
// }


// ============================================================
// RUN THE LIVE ASYNC DEMOS IN ORDER
// ============================================================
async function runDemos() {
    console.log("\n--- Running Async Demos ---");
    await promiseChainDemo();
    await loadUser(1);  // succeeds
    await loadUser(-1); // triggers catch
    await loadMultipleUsers();
}

runDemos();


// ============================================================
// QUICK SUMMARY CHEAT SHEET
// ============================================================
// Concept         | Key Takeaway
// ----------------|-----------------------------------------------------------------------
// Promise         | 3 states: pending -> fulfilled (.then) OR rejected (.catch); .finally always runs.
// async / await   | Cleaner Promise syntax; always use try/catch/finally; use Promise.all for parallel calls.
// fetch()         | Needs 2 awaits (`fetch()` + `res.json()`); ALWAYS check `if (!res.ok)` for 404/500 errors.
// localStorage    | Browser key-value store (persists on reload); strings only -> JSON.stringify / JSON.parse.
