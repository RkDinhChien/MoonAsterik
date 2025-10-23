// ===========================
// Application State Management
// ===========================

const appState = {
  isLoggedIn: false,
  userType: null, // 'student' or 'company'
  currentPage: "landing",
  user: {
    name: "Alex",
    companyName: "TechStart Inc.",
  },
};

// State getters
const getState = () => appState;

const isLoggedIn = () => appState.isLoggedIn;

const getUserType = () => appState.userType;

const getCurrentPage = () => appState.currentPage;

const getUserInfo = () => appState.user;

// State setters
const setLoggedIn = (status) => {
  appState.isLoggedIn = status;
};

const setUserType = (type) => {
  appState.userType = type;
};

const setCurrentPage = (page) => {
  appState.currentPage = page;
};

const setUserInfo = (info) => {
  appState.user = { ...appState.user, ...info };
};

// Export for use in other modules
window.AppState = {
  getState,
  isLoggedIn,
  getUserType,
  getCurrentPage,
  getUserInfo,
  setLoggedIn,
  setUserType,
  setCurrentPage,
  setUserInfo,
  // Direct access to state object
  state: appState,
};
