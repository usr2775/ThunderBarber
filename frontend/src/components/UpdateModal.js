import React from "react";
import { useAppointmentsContext } from "../hooks/useAppointmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import AppointmentForm from "./AppointmentForm";

const UpdateModal = ({ appointment }) => {
    const [showModal, setShowModal] = React.useState(false);
    const { dispatch } = useAppointmentsContext();
    const { user } = useAuthContext();

    return (
        <>
            <button
                className="btn btn-success"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Change Appointment
            </button>
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
                                <h5 className="modal-title" id="updateModalLabel">Update Appointment</h5>
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
                                <AppointmentForm appointment={appointment} />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default UpdateModal;
