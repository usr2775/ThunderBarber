import { useContext } from "react";
import { AppointmentsContext } from "../context/AppointmentsContext";

// Custom hook to access the appointments context
export const useAppointmentsContext = () => {
    const context = useContext(AppointmentsContext);
    // Throw an error if the hook is not used within the AppointmentsContextProvider
    if (!context) throw Error('useAppointmentsContext must be used within an AppointmentsContextProvider');
    return context;
}; 
