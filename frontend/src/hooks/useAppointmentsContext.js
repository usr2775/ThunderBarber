import { AppointmentsContext } from "../context/AppointmentsContext";
import { useContext } from "react";

export const useAppointmentsContext = () => {
    const context = useContext(AppointmentsContext)

    if (!context){
        throw Error('useAppointmentContext debe usarse dentro de un AppointmentContextProvider')
    }

    return context
}