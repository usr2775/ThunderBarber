import { createContext, useReducer } from "react";

// Creating a context for appointments
export const AppointmentsContext = createContext();

// Reducer function for appointments state management
export const appointmentsReducer = (state, action) => {
    switch (action.type) {
        case "SET_APPOINTMENTS":
            return { appointments: action.payload };
        case "CREATE_APPOINTMENT":
            return { appointments: [action.payload, ...state.appointments] };
        case "DELETE_APPOINTMENT":
            return { appointments: state.appointments.filter(a => a._id !== action.payload._id) };
        case "UPDATE_APPOINTMENT":
            return {
                appointments: state.appointments.map(a =>
                    a._id === action.payload._id ? action.payload : a
                )
            };
        default:
            return state;
    }
};

// Provider component to wrap the children with the AppointmentsContext.Provider
export const AppointmentsContextProvider = ({ children }) => {
    // Using useReducer hook to manage state with appointmentsReducer
    const [state, dispatch] = useReducer(appointmentsReducer, { appointments: [] });

    return (
        <AppointmentsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppointmentsContext.Provider>
    );
};
