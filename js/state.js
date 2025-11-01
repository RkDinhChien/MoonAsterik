// ===========================
// Application State Management with LocalStorage
// ===========================

const appState = {
  isLoggedIn: false,
  userType: null, // 'student' or 'company'
  currentPage: 'landing',
  user: {
    name: 'Alex',
    companyName: 'TechStart Inc.',
  },
  profile: {
    // Basic Information
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: null,
    
    // Visibility Settings
    visibility: 'public', // 'public' or 'recruiter'
    
    // Skills
    skills: [],
    // Example: [{ name: 'JavaScript', level: 'advanced' }, ...]
    
    // Education
    education: [],
    // Example: [{ school: 'ABC University', degree: "Bachelor's", field: 'Computer Science', 
    //            gpa: '3.5/4.0', startDate: '2021-09', endDate: '2025-06', current: false }, ...]
    
    // Experience
    experience: [],
    // Example: [{ title: 'Software Intern', company: 'Tech Corp', location: 'HCMC', 
    //            type: 'internship', startDate: '2024-06', endDate: '2024-09', 
    //            current: false, description: 'Developed web applications...' }, ...]
    
    // Portfolio Links
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    behanceUrl: '',
    
    // CV/Resume
    cvFile: null
    // Example: { name: 'resume.pdf', size: 245632, type: 'application/pdf', lastModified: 1698765432000 }
  }
};

// LocalStorage keys
const STORAGE_KEYS = {
  APP_STATE: 'jobfair_app_state',
  USER_PROFILE: 'jobfair_user_profile',
  PREFERENCES: 'jobfair_preferences'
};

// ===========================
// State Management Functions
// ===========================

// Load state from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEYS.APP_STATE);
    const savedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.assign(appState, parsedState);
    }
    
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      appState.profile = { ...appState.profile, ...parsedProfile };
    }
    
    console.log('State loaded from localStorage');
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
};

// Save state to localStorage
const saveState = () => {
  try {
    // Save main app state (without profile to keep it separate)
    const stateToSave = {
      isLoggedIn: appState.isLoggedIn,
      userType: appState.userType,
      currentPage: appState.currentPage,
      user: appState.user
    };
    localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify(stateToSave));
    
    // Save profile separately for better organization
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(appState.profile));
    
    console.log('State saved to localStorage');
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      alert('Storage limit exceeded. Please remove some data or contact support.');
    }
  }
};

// Clear all stored data
const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.APP_STATE);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    console.log('State cleared from localStorage');
  } catch (error) {
    console.error('Error clearing state from localStorage:', error);
  }
};

// ===========================
// State Getters
// ===========================

const getState = () => appState;
const isLoggedIn = () => appState.isLoggedIn;
const getUserType = () => appState.userType;
const getCurrentPage = () => appState.currentPage;
const getUserInfo = () => appState.user;
const getProfile = () => appState.profile;

// ===========================
// State Setters
// ===========================

const setLoggedIn = (status) => {
  appState.isLoggedIn = status;
  saveState();
};

const setUserType = (type) => {
  appState.userType = type;
  saveState();
};

const setCurrentPage = (page) => {
  appState.currentPage = page;
  // Don't save on every page change to reduce localStorage writes
};

const setUserInfo = (info) => {
  appState.user = { ...appState.user, ...info };
  saveState();
};

const updateProfile = (profileData) => {
  appState.profile = { ...appState.profile, ...profileData };
  saveState();
};

const resetProfile = () => {
  appState.profile = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: null,
    visibility: 'public',
    skills: [],
    education: [],
    experience: [],
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    behanceUrl: '',
    cvFile: null
  };
  saveState();
};

// ===========================
// Profile Completion Helper
// ===========================

const calculateProfileCompletion = () => {
  const profile = appState.profile;
  let completed = 0;
  let total = 10;
  
  if (profile.fullName) completed++;
  if (profile.email) completed++;
  if (profile.phone) completed++;
  if (profile.bio && profile.bio.length > 20) completed++;
  if (profile.avatar) completed++;
  if (profile.skills && profile.skills.length >= 3) completed++;
  if (profile.education && profile.education.length > 0) completed++;
  if (profile.experience && profile.experience.length > 0) completed++;
  if (profile.githubUrl || profile.linkedinUrl || profile.portfolioUrl) completed++;
  if (profile.cvFile) completed++;
  
  return Math.round((completed / total) * 100);
};

// ===========================
// Export API
// ===========================

// Export for use in other modules
window.AppState = {
  // Getters
  getState,
  isLoggedIn,
  getUserType,
  getCurrentPage,
  getUserInfo,
  getProfile,
  
  // Setters
  setLoggedIn,
  setUserType,
  setCurrentPage,
  setUserInfo,
  updateProfile,
  resetProfile,
  
  // Storage operations
  loadState,
  saveState,
  clearState,
  
  // Helpers
  calculateProfileCompletion,
  
  // Direct access to state object (use with caution)
  state: appState
};

// ===========================
// Initialize on Load
// ===========================

// Load saved state when the script loads
if (typeof window !== 'undefined') {
  loadState();
  
  // Auto-save before page unload
  window.addEventListener('beforeunload', () => {
    saveState();
  });
  
  // Handle storage events (sync across tabs)
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEYS.APP_STATE || e.key === STORAGE_KEYS.USER_PROFILE) {
      loadState();
      // Re-render if router is available
      if (window.Router && window.Router.renderPage) {
        window.Router.renderPage();
      }
    }
  });
}
