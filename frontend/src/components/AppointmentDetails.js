// Importing necessary modules and components
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import UpdateModal from "./UpdateModal";

// Defining the AppointmentDetails component which takes an appointment object as a prop
const AppointmentDetails = ({ appointment }) => {
  // Accessing appointment context and authentication context using custom hooks
  const { dispatch } = useAppointmentsContext();
  const { user } = useAuthContext();

  // Function to check if the appointment date is in the past
  const CheckIfPast = (inputDate) => {
    const currentDate = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < currentDate;
  };

  // Function to handle the click event for deleting an appointment
  const handleClick = async () => {
    // Checking if there's a logged-in user
    if (!user) {
      return;
    }
    // Sending a DELETE request to the API to delete the appointment
    const response = await fetch("./api/appointments/" + appointment._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    // If the request is successful, dispatching an action to delete the appointment
    if (response.ok) {
      dispatch({ type: "DELETE_APPOINTMENT", payload: json });
    }
  };

  // Converting the appointment date string to a Date object
  const dateTime = new Date(appointment.date);

  // Rendering the appointment details with conditional rendering for the delete/cancel button
  return (
    <div className="bg-white rounded m-10 mt-3 relative shadow-lg p-5 text-gray-800">
      <h4 className="text-xl text-sky-600">
        <strong>Appointment Date: </strong>
        {dateTime.toLocaleDateString()}
      </h4>
      <p>
        <strong>Time: </strong>
        {dateTime.toLocaleTimeString()}
      </p>
      <p>
        <strong>Name : </strong>
        {appointment.appointee}
      </p>
      <p>
        <strong>Selected Barber: </strong>
        {appointment.barber}
      </p>
      {/* Conditional rendering for delete/cancel button */}
      <span
        className="btn btn-danger mr-2 absolute top-16 right-5 px-4 py-6 rounded shadow hover:bg-red-700"
        onClick={handleClick}
      >
        {CheckIfPast(dateTime) ? "Delete" : "Cancel"}
      </span>
      {/* Render the UpdateModal component */}
      <UpdateModal appointment={appointment} />
    </div>
  );
};

// Exporting the AppointmentDetails component as default
export default AppointmentDetails;
