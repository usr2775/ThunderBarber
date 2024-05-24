import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    // State variables to manage first name, last name, email, password, and loading/error states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(firstName, lastName, email, password);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center font-weight-bold">Registro</h3>
                            {/* Signup form */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Correo:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {/* Button to submit form */}
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                    disabled={isLoading}
                                >
                                    {/* Button text changes based on loading state */}
                                    {isLoading ? 'Registrarse...' : 'Registro'}
                                </button>
                            </form>
                            {/* Display error message if signup fails */}
                            {error && <div className="alert alert-danger mt-4">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
