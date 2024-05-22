import React, { useEffect, useState } from "react"; // Añadimos useState
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Localizer for moment.js
const localizer = momentLocalizer(moment);

// CalendarPage component
const CalendarPage = () => {
    // Accessing appointments context and user data using custom hooks
    const { appointments, dispatch } = useAppointmentsContext();
    const { user } = useAuthContext();
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // Effect hook to fetch user data and appointments data when user changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const response = await fetch("/api/user/" + user.email);
                const userData = await response.json();
                if (!response.ok) throw new Error(userData.error);

                // Fetch appointments data based on barber or all appointments
                const endpoint = userData.barber ? `/api/appointments/barber/${userData.barber}` : "/api/appointments";
                const appointmentsResponse = await fetch(endpoint, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const appointmentsData = await appointmentsResponse.json();
                if (!appointmentsResponse.ok) throw new Error(appointmentsData.error);

                // Dispatch action to set appointments
                dispatch({ type: "SET_APPOINTMENTS", payload: appointmentsData });
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        if (user) fetchData();
    }, [dispatch, user]);



    // Function to handle event selection
    const handleSelectEvent = (event) => {
        setSelectedAppointment(event);
    };

    // Rendering the CalendarPage component
    return (
        <div className="container-fluid py-5" style={{ background: "#f9fafb" }}>
            <div className="container">
                <h2 className="text-center text-xl font-bold mb-4">Calendario de Citas</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="calendar-container p-3 border rounded shadow-sm">
                            {/* React Big Calendar component */}
                            <Calendar
                                localizer={localizer}
                                events={appointments.map((appointment) => ({
                                    title: appointment.title,
                                    start: new Date(appointment.date),
                                    end: new Date(appointment.date),
                                    barber: appointment.barber // Add barber name to event
                                }))}
                                views={['month']}
                                defaultDate={new Date()}
                                onSelectEvent={handleSelectEvent}
                                style={{ height: 500 }}
                            />
                        </div>
                    </div>
                </div>
                {/* Display selected appointment details */}
                {selectedAppointment && (
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{selectedAppointment.title}</h5>
                                    <p className="card-text">Barbero: {selectedAppointment.barber}</p>
                                    <p className="card-text">Fecha: {moment(selectedAppointment.start).format("DD/MM/YYYY")}</p>
                                    <p className="card-text">Hora: {moment(selectedAppointment.start).format("HH:mm")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Exporting the CalendarPage component as default
export default CalendarPage;
