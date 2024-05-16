
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";

const AppointmentForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useAppointmentsContext();
  const [appointee, setAppointee] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [barber, setBarber] = useState("");
  const [error, setError] = useState(null);

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
      alert("Nueva cita agregada: " + json.date);
      console.log("Nueva cita agregada:", json);
      dispatch({ type: "CREATE_APPOINTMENT", payload: json });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="container py-3 px-4 bg-light shadow-lg" onSubmit={handleCreateSubmit}>
      <h3 className="text-xl font-bold mb-4">Reservar cita</h3>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={appointee}
          onChange={(e) => setAppointee(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          placeholder="Fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
          <option value="">Seleccione un barbero</option>
          <option value="Alexi">Alexi</option>
          <option value="Santiago">Santiago</option>
          <option value="Adrian">Adrian</option>
          <option value="Garrido">Garrido</option>
        </select>
      </div>
      <button className="btn btn-primary">Reservar una cita</button>
      {error && <div className="mt-3 p-2 bg-danger text-white">{error}</div>}
    </form>
  );
};

export default AppointmentForm;
