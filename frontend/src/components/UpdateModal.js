import React from "react";
import AppointmentForm from "./AppointmentForm";

// Defining the UpdateModal component
const UpdateModal = ({ appointment }) => {
    // State to control the visibility of the modal
    const [showModal, setShowModal] = React.useState(false);
    // Accessing appointment context and authentication context using custom hooks

    // Rendering the UpdateModal component with conditional rendering for modal visibility
    return (
        <>
            {/* Button to trigger the modal */}
            <button
                className="btn btn-success"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Actualizar Cita
            </button>
            {/* Modal content */}
            {showModal ? (
                <div
                    className="modal fade show"
                    id="updateModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="updateModalLabel"
                    aria-hidden="true"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateModalLabel">Actualizar Cita</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Render the AppointmentForm component */}
                                <AppointmentForm appointment={appointment} />
                            </div>
                            <div className="modal-footer">
                                {/* Button to close the modal */}
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

// Exporting the UpdateModal component as default
export default UpdateModal;
