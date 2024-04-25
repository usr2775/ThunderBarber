// AppointmentForm.js
import React, { useState, useEffect } from "react";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { DatePicker, TimePicker } from "antd";

const AppointmentForm = ({ appointment }) => {
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  const [appointee, setAppointee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [barber, setBarber] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user/' + user.email);
      const json = await response.json();

      if (response.ok) {
        setAppointee(json.firstName + " " + json.lastName);
      }
    };
    if (user) {
      fetchUser();
    }
  }, [user]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Usted debe estar conectado");
      return;
    }

    if (barber === "") {
      setError("Por favor seleccione un peluquero");
      return;
    }

    const appointmentData = { appointee, date, barber };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        body: JSON.stringify(appointmentData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo crear la cita");
      }

      const json = await response.json();

      setError(null);
      setAppointee("");
      setDate("");
      setTime("");
      setBarber("");

      alert("Nueva cita agregada:", json.date);
      console.log("Nueva cita agregada:", json);
      dispatch({ type: "CREATE_APPOINTMENT", payload: json });
      // window.location.reload(); <-- Esto se eliminó
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!user) {
      setError("Usted debe estar conectado");
      return;
    }

    if (barber === "") {
      setError("Por favor seleccione un peluquero");
      return;
    }

    const updatedAppointment = { appointee, date, barber };

    try {
      const response = await fetch('./api/appointments/' + appointment._id, {
        method: 'PATCH',
        body: JSON.stringify(updatedAppointment),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar la cita");
      }

      const json = await response.json();
      dispatch({ type: 'UPDATE_APPOINTMENT', payload: json });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="container  py-3 px-4 bg-light shadow-lg " onSubmit={appointment ? handleUpdateSubmit : handleCreateSubmit}>
      <h3 className="text-xl font-bold mb-4">Reservar cita</h3>

      <div className="mb-3">
        <DatePicker
          className="time-date"
          format="DD-MM-YYYY"
          value={date}
          onChange={(date) => setDate(date)}
        />
      </div>
      <div className="mb-3">
        <TimePicker
          format="HH mm"
          className="time-date"
          minuteStep={30}
          value={time}
          onChange={(time) => setTime(time)}
        />
      </div>
      <div className="mb-3">
        <select
          id="barbers"
          onChange={(e) => setBarber(e.target.value)}
          value={barber}
          required="required"
          className="form-control"
        >
          <option value="">Select Barber</option>
          <option value="Raz">Alexi</option>
          <option value="Tav">Santiago</option>
          <option value="Ali">Adrian</option>
          <option value="Negassi">Garrido</option>
        </select>
      </div>

      <button className="btn btn-primary">Reservar una Cita</button>
      {error && <div className="mt-3 p-2 bg-danger text-white">{error}</div>}
    </form>
  );
};

export default AppointmentForm;
