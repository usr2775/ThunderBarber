import { createContext, useReducer, useEffect } from "react";

// Creating a context for authentication
export const AuthContext = createContext();

// Reducer function for authentication state management
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_USER":
      return { user: action.payload };
    default:
      return state;
  }
};

// Provider component to wrap the children with the AuthContext.Provider
export const AuthContextProvider = ({ children }) => {
  // Using useReducer hook to manage state with authReducer
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Effect hook to check if user is logged in when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
