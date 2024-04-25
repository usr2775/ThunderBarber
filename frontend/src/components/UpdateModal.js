import React, { useState } from "react";
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
                Cambiar Cita
            </button>
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Actualizar Cita</h5>
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
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateModal;
