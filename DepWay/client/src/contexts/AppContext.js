import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  githubToken: '',
  dockerHubUsername: '',
  ports: [3000],
  activeTab: 'home',
  loading: false,
  error: null
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_GITHUB_TOKEN: 'SET_GITHUB_TOKEN',
  SET_DOCKER_HUB_USERNAME: 'SET_DOCKER_HUB_USERNAME',
  SET_PORTS: 'SET_PORTS',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET: 'RESET'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SET_GITHUB_TOKEN:
      return { ...state, githubToken: action.payload };
    case ActionTypes.SET_DOCKER_HUB_USERNAME:
      return { ...state, dockerHubUsername: action.payload };
    case ActionTypes.SET_PORTS:
      return { ...state, ports: action.payload };
    case ActionTypes.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    setGithubToken: (token) => dispatch({ type: ActionTypes.SET_GITHUB_TOKEN, payload: token }),
    setDockerHubUsername: (username) => dispatch({ type: ActionTypes.SET_DOCKER_HUB_USERNAME, payload: username }),
    setPorts: (ports) => dispatch({ type: ActionTypes.SET_PORTS, payload: ports }),
    setActiveTab: (tab) => dispatch({ type: ActionTypes.SET_ACTIVE_TAB, payload: tab }),
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    reset: () => dispatch({ type: ActionTypes.RESET })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
