import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Defining the AppointmentForm component which takes an appointment object as a prop
const AppointmentForm = ({ appointment }) => {
  // Accessing appointment context and authentication context using custom hooks
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  // States for form fields and error handling
  const [appointee, setAppointee] = useState("");
  const [date, setDate] = useState("");
  const [barber, setBarber] = useState("");
  const [error, setError] = useState(null);

  // Effect hook to fetch user data and set initial values when user or appointment changes
  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const response = await fetch("/api/user/" + user.email);
        const json = await response.json();
        setAppointee(json.firstName + " " + json.lastName);
      };
      fetchUser();
    }
    if (appointment) {
      setBarber(appointment.barber);
    }
  }, [user, appointment]);


  // Function to handle form submission for creating a new appointment
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // Error handling for authentication and form fields
    if (!user) {
      setError("Usted debe estar conectado");
      return;
    }
    if (!barber) {
      setError("Seleccione un barbero");
      return;
    }

    // Creating appointment object and sending POST request to API
    const appointment = { appointee, date, barber };
    const response = await fetch("/api/appointments", {
      method: "POST",
      body: JSON.stringify(appointment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    // Handling response from server
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setDate("");
      setBarber("");
      dispatch({ type: "CREATE_APPOINTMENT", payload: json });
    }
  };

  // Function to handle form submission for updating an existing appointment
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Error handling for authentication and form fields
    if (!user) {
      setError("Usted debe estar conectado");
      return;
    }
    if (!barber) {
      setError("Seleccione un barbero");
      return;
    }

    // Creating updated appointment object and sending PATCH request to API
    const updatedAppointment = { appointee, date: date, barber };
    const response = await fetch("/api/appointments/" + appointment._id, {
      method: "PATCH",
      body: JSON.stringify(updatedAppointment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    // Handling response from server
    if (!response.ok) {
      setError(json.error);
    } else {
      dispatch({ type: "UPDATE_APPOINTMENT", payload: json });
    }
  };


  // Rendering the appointment form with conditional rendering for update or create mode
  return (
    <form
      className="mt-2 mx-auto p-5 bg-light border rounded shadow-lg"
      onSubmit={appointment ? handleUpdateSubmit : handleCreateSubmit}
    >
      <h3 className="text-center mb-4 ">Reservar cita</h3>
      {/* Date picker component */}
      <DatePicker
        showTime
        className="form-control mb-3"
        format="DD/MM/YYYY HH:mm"
        minuteStep={30}
        value={date ? dayjs(date) : null}
        onChange={(date) => setDate(date)}
      />
      {/* Barber selection dropdown */}
      <div className="mb-3">
        <label htmlFor="barbers" className="form-label">Barberos:</label>
        <select
          id="barbers"
          onChange={(e) => setBarber(e.target.value)}
          value={barber}
          required
          className="form-select"
          style={{ borderRadius: '0.35rem', borderColor: '#ced4da' }}
        >
          <option value="">Seleccionar barbero</option>
          <option value="Alexi">Alexi</option>
          <option value="Adrian">Adrian</option>
          <option value="Garrido">Garrido</option>
        </select>
      </div>

      {/* Submit button */}
      <button className="btn btn-secondary btn-block">Reservar </button>
      {/* Error message */}
      {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
    </form>
  );
};

// Exporting the AppointmentForm component as default
export default AppointmentForm;
