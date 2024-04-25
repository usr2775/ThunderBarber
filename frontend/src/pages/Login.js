import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center font-weight-bold">Login</h3>
                            <form onSubmit={handleSubmit}>
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
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                            {error && <div className="alert alert-danger mt-4">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;