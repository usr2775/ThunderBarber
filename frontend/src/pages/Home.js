import React, { useEffect, useState } from "react";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import AppointmentDetails from "../components/AppointmentDetails";
import AppointmentForm from "../components/AppointmentForm";

const Home = () => {
    const { appointments, dispatch } = useAppointmentsContext();
    const { user } = useAuthContext();
    const [barber, setBarber] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/user/" + user.email);
                const userData = await response.json();
                if (!response.ok) throw new Error(userData.error);

                setBarber(userData.barber);

                const endpoint = barber ? `/api/appointments/barber/${barber}` : "/api/appointments";
                const appointmentsResponse = await fetch(endpoint, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const appointmentsData = await appointmentsResponse.json();
                if (!appointmentsResponse.ok) throw new Error(appointmentsData.error);

                dispatch({ type: "SET_APPOINTMENTS", payload: appointmentsData });
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        if (user) fetchData();
    }, [dispatch, user, barber]);

    return (
        <div className="container-fluid py-5" style={{ background: "#f9fafb" }}>
            <div className="container">
                <h2 className="text-center text-xl font-bold mb-4">Tus Citas:</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
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
