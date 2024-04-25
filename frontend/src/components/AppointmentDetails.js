import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import UpdateModal from "./UpdateModal";

const AppointmentDetails = ({ appointment }) => {
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  const CheckIfPast = (inputDate) => {
    const currentDate = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < currentDate;
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("./api/appointments/" + appointment._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_APPOINTMENT", payload: json });
    }
  };

  const dateTime = new Date(appointment.date);

  return (
    <div className="bg-white rounded m-10 relative shadow-lg p-5 text-gray-800">
      <h4 className="text-xl text-sky-600">
        <strong>Fecha cita: </strong>
        {dateTime.toLocaleDateString()}
      </h4>
      <p>
        <strong>Tiempo: </strong>
        {dateTime.toLocaleTimeString()}
      </p>
      <p>
        <strong>Nombre : </strong>
        {appointment.appointee}
      </p>
      <p>
        <strong>Barbero seleccionado: </strong>
        {appointment.barber}
      </p>
      <span
        className="btn btn-danger absolute top-16 right-5 px-4 py-6 rounded shadow hover:bg-red-700"

        onClick={handleClick}
      >
        {CheckIfPast(dateTime) ? "Borrar" : "Cancelar"}
      </span>
      <UpdateModal appointment={appointment} />
    </div>
  );
};

export default AppointmentDetails;
