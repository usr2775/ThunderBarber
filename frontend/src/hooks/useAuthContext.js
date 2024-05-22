import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom hook to access the authentication context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    // Throw an error if the hook is not used within the AuthContextProvider
    if (!context) throw Error('useAuthContext must be used within an AuthContextProvider');
    return context;
};
