# Moon\* Application Architecture

## 📁 File Structure Overview

```
MoonAsterik/
│
├── index.html                  # Main HTML with navbar, footer, modals
│
├── styles/
│   └── main.css               # All CSS styles and variables
│
└── js/
    ├── app.js                 # 🎯 Main controller & event handlers
    ├── state.js               # 📦 Centralized state management
    ├── router.js              # 🧭 Routing & navigation logic
    │
    └── pages/                 # 📄 Page templates
        ├── landing.js         # Landing page
        ├── student-dashboard.js    # Student dashboard
        ├── company-dashboard.js    # Company dashboard
        └── other-pages.js     # Profile, Jobs, Applications, etc.
```

---

## 🔄 Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER ACTION                          │
│        (Click button, navigate, login, etc.)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                        app.js                                │
│                  (Event Handlers)                            │
│  • handleStudentClick()  • handleLogout()                    │
│  • handleEmployerClick() • navigate()                        │
│  • openLoginModal()      • closeAllModals()                  │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
             ▼                               ▼
┌────────────────────────┐      ┌───────────────────────────┐
│      state.js          │      │       router.js           │
│ (State Management)     │      │   (Navigation Logic)      │
│                        │      │                           │
│ • setLoggedIn()        │      │ • navigate(page)          │
│ • setUserType()        │      │ • renderPage()            │
│ • setCurrentPage()     │      │ • updateNavbar()          │
│ • getUserInfo()        │      │                           │
└────────────────────────┘      └───────────┬───────────────┘
                                            │
                                            ▼
                                ┌───────────────────────────┐
                                │    pages/*.js             │
                                │  (Page Templates)         │
                                │                           │
                                │ • landing()               │
                                │ • studentDashboard()      │
                                │ • companyDashboard()      │
                                │ • profile()               │
                                │ • jobs()                  │
                                │ • applications()          │
                                └───────────┬───────────────┘
                                            │
                                            ▼
                                ┌───────────────────────────┐
                                │      DOM UPDATE           │
                                │  mainContent.innerHTML    │
                                └───────────────────────────┘
```

---

## 🎭 Module Responsibilities

### **app.js** - The Conductor 🎼

```
Role: Coordinates everything
├── Initialize application
├── Set up event listeners
├── Handle user interactions
└── Delegate to other modules
```

### **state.js** - The Memory 🧠

```
Role: Remember everything
├── Store login status
├── Store user type
├── Store current page
├── Store user info
└── Provide getters/setters
```

### **router.js** - The Navigator 🧭

```
Role: Know where to go
├── Handle navigation
├── Render correct page
├── Update navbar
└── Manage page transitions
```

### **pages/\*.js** - The Artists 🎨

```
Role: Create beautiful pages
├── Generate HTML templates
├── Include dynamic data
├── Handle page-specific logic
└── Return ready-to-render HTML
```

---

## 🔌 Module Communication

### Global Exports

All modules export to `window` object for easy cross-module communication:

```javascript
window.app; // Main application controller
window.AppState; // State management
window.Router; // Routing logic
window.PageTemplates; // All page templates
```

### Example: Login Flow

```javascript
// 1. User clicks button
<button onclick="app.handleStudentClick()">

// 2. app.js handles it
handleStudentClick() {
  this.closeAllModals();                      // Close any open modals
  window.AppState.setUserType("student");     // Update state
  window.AppState.setLoggedIn(true);          // Update state
  window.AppState.setCurrentPage("dashboard"); // Update state
  this.updateNavbar();                         // Update UI
  this.renderPage();                           // Render new page
}

// 3. updateNavbar() delegates to Router
updateNavbar() {
  window.Router.updateNavbar();  // Router handles navbar logic
}

// 4. renderPage() delegates to Router
renderPage() {
  window.Router.renderPage();  // Router handles page rendering
}

// 5. Router gets template from PageTemplates
renderPage() {
  const template = window.PageTemplates.studentDashboard();
  mainContent.innerHTML = template;
}
```

---

## 📦 State Management

### State Object Structure

```javascript
AppState.state = {
  isLoggedIn: false, // Boolean: User logged in?
  userType: null, // String: 'student' | 'company' | null
  currentPage: "landing", // String: Current page identifier
  user: {
    name: "Alex", // Student name
    companyName: "TechStart Inc.", // Company name
  },
};
```

### State Access Pattern

```javascript
// ✅ DO: Use AppState methods
const isLoggedIn = window.AppState.isLoggedIn();
window.AppState.setUserType("student");

// ✅ ALSO OK: Direct state access (read-only)
const currentPage = window.AppState.state.currentPage;

// ❌ DON'T: Modify state directly
window.AppState.state.isLoggedIn = true; // Bad!
```

---

## 🧭 Routing System

### Page Routes

```javascript
Route          → Template Function
─────────────────────────────────────────
'landing'      → PageTemplates.landing()
'dashboard'    → PageTemplates.studentDashboard() or
                 PageTemplates.companyDashboard()
'profile'      → PageTemplates.profile()
'jobs'         → PageTemplates.jobs()
'applications' → PageTemplates.applications()
'post-job'     → PageTemplates['post-job']()
'manage-listings' → PageTemplates['manage-listings']()
'applicants'   → PageTemplates.applicants()
```

### Navigation Methods

```javascript
// Navigate to a page
app.navigate('jobs');           // From anywhere

// Router internal
Router.navigate('jobs');        // Direct router call

// What happens:
1. AppState.setCurrentPage('jobs')  // Update state
2. Router.renderPage()               // Render page
3. window.scrollTo(0, 0)             // Scroll to top
```

---

## 🎨 Page Template Pattern

### Template Function Structure

```javascript
const renderPageName = () => {
  // 1. Get state if needed
  const state = window.AppState.state;

  // 2. Return HTML string
  return `
    <div class="page-name">
      <h1>Page Title</h1>
      <p>Content using ${state.user.name}</p>
      <button onclick="app.someAction()">Action</button>
    </div>
  `;
};

// 3. Export to PageTemplates
window.PageTemplates = window.PageTemplates || {};
window.PageTemplates.pageName = renderPageName;
```

### Template Best Practices

```javascript
✅ DO:
- Use template literals for HTML
- Access state via window.AppState
- Use onclick handlers to call app methods
- Keep templates pure (no side effects)

❌ DON'T:
- Modify state inside templates
- Access DOM directly
- Include complex logic
- Forget to export
```

---

## 🔄 Initialization Sequence

```
1. index.html loads
   └─> HTML structure ready

2. Load scripts in order:
   ├─> state.js loads
   │   └─> window.AppState created
   │
   ├─> pages/*.js load
   │   └─> window.PageTemplates.* created
   │
   ├─> router.js loads
   │   └─> window.Router created
   │
   └─> app.js loads
       └─> window.app created

3. DOM ready event fires
   └─> app.init() called
       ├─> setupEventListeners()
       │   └─> Attach all event handlers
       │
       └─> renderPage()
           └─> Render landing page
```

---

## 🎯 Event Flow Examples

### Example 1: User Logs In as Student

```
Click "I'm a Student"
  → app.handleStudentClick()
    → closeAllModals()
    → AppState.setUserType('student')
    → AppState.setLoggedIn(true)
    → AppState.setCurrentPage('dashboard')
    → Router.updateNavbar()
      → Update navbar UI
    → Router.renderPage()
      → Get PageTemplates.studentDashboard()
      → Update mainContent.innerHTML
```

### Example 2: User Navigates to Jobs

```
Click "View All Jobs"
  → onclick="app.navigate('jobs')"
    → Router.navigate('jobs')
      → AppState.setCurrentPage('jobs')
      → Router.renderPage()
        → Get PageTemplates.jobs()
        → Update mainContent.innerHTML
      → window.scrollTo(0, 0)
```

### Example 3: User Logs Out

```
Click "Logout"
  → app.handleLogout()
    → AppState.setLoggedIn(false)
    → AppState.setUserType(null)
    → AppState.setCurrentPage('landing')
    → Router.updateNavbar()
      → Show login/signup buttons
    → Router.renderPage()
      → Get PageTemplates.landing()
      → Update mainContent.innerHTML
```

---

## 🛠️ Adding New Features

### Add a New Page

```
1. Create js/pages/my-new-page.js
2. Write template function
3. Export to window.PageTemplates
4. Add route in router.js
5. Add script tag in index.html
6. Add navigation button/link
```

### Add State Property

```
1. Add to state object in state.js
2. Create getter: getMyProperty()
3. Create setter: setMyProperty(value)
4. Export in window.AppState
```

### Add Event Handler

```
1. Add button in HTML: <button id="my-btn">
2. In app.setupEventListeners():
   document.getElementById('my-btn')
     .addEventListener('click', () => this.myHandler())
3. Create myHandler() method in app object
```

---

## 🐛 Debugging Tips

### Check State

```javascript
// In browser console:
console.log(window.AppState.state);
console.log(window.AppState.getCurrentPage());
console.log(window.AppState.getUserType());
```

### Check Available Templates

```javascript
// In browser console:
console.log(Object.keys(window.PageTemplates));
```

### Test Navigation

```javascript
// In browser console:
app.navigate("dashboard");
app.navigate("jobs");
```

### Check if Modules Loaded

```javascript
// In browser console:
console.log(window.app); // Should be object
console.log(window.AppState); // Should be object
console.log(window.Router); // Should be object
console.log(window.PageTemplates); // Should be object
```

---

## 📚 Summary

**The refactored architecture follows these principles:**

1. **Separation of Concerns** - Each file has one job
2. **Single Source of Truth** - State in one place
3. **Unidirectional Data Flow** - State → Router → Templates → DOM
4. **Global Communication** - Modules talk via window exports
5. **Event-Driven** - User actions trigger state changes
6. **Declarative Templates** - HTML strings from functions
7. **Centralized Routing** - All navigation through Router

This makes the code:

- ✅ Easy to understand
- ✅ Easy to maintain
- ✅ Easy to test
- ✅ Easy to extend
- ✅ Easy to debug
