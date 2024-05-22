import React, { useEffect, useState } from "react";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import AppointmentDetails from "../components/AppointmentDetails";
import AppointmentForm from "../components/AppointmentForm";
import "react-big-calendar/lib/css/react-big-calendar.css";



const Home = () => {
    // Accessing the appointments context and user authentication context
    const { appointments, dispatch } = useAppointmentsContext();
    const { user } = useAuthContext();
    // State variables to manage barber and selected date
    const [barber, setBarber] = useState("");

    // Effect to fetch data when the component mounts or user changes
    useEffect(() => {
        // Function to fetch data asynchronously
        const fetchData = async () => {
            try {
                // Fetch user data based on email
                const response = await fetch("/api/user/" + user.email);
                const userData = await response.json();
                if (!response.ok) throw new Error(userData.error);

                // Set barber from user data
                setBarber(userData.barber);

                // Determine endpoint based on barber existence
                const endpoint = barber ? `/api/appointments/barber/${barber}` : "/api/appointments";
                // Fetch appointments data with authentication token
                const appointmentsResponse = await fetch(endpoint, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const appointmentsData = await appointmentsResponse.json();
                if (!appointmentsResponse.ok) throw new Error(appointmentsData.error);

                // Dispatch fetched appointments data to context
                dispatch({ type: "SET_APPOINTMENTS", payload: appointmentsData });
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        // Check if user is authenticated before fetching data
        if (user) fetchData();
    }, [dispatch, user, barber]); // Depend on dispatch, user, and barber state variables

    // Function to handle date change in the calendar


    return (
        <div className="container-fluid py-5" style={{ background: "#f9fafb" }}>
            <div className="container">
                <h2 className="text-center text-xl font-bold mb-4">Tus Citas:</h2>
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        {appointments &&
                            appointments.map((appointment) => (
                                <AppointmentDetails appointment={appointment} key={appointment._id} />
                            ))}
                    </div>
                    <div className="col-md-4">
                        {!barber && <AppointmentForm />}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
