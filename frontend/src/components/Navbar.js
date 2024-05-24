import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../images/logotipo.png";

// Defining the Navbar component
const Navbar = () => {
    // Accessing logout function from useLogout hook and user data from useAuthContext hook
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [activeButton, setActiveButton] = useState("");

    // Function to handle logout
    const handleLogout = () => {
        logout();
    };

    // Rendering the Navbar component with conditional rendering for logged-in and logged-out states
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="ThunderBarber" className="navbar-logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Citas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/HairCare">
                                Salud capilar
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/HairStyles">
                                Peinados
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/CalendarPage">
                                Calendar
                            </Link>
                        </li>
                    </ul>
                    {/* Conditional rendering for logged-in and logged-out states */}
                    {user ? (
                        <div className="d-flex align-items-center">
                            <span className="me-3">{user.email}</span>
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-3">
                                <Link
                                    className={`nav-link btn ${activeButton === "login"
                                        ? "btn-secondary text-white"
                                        : "btn-outline-secondary"
                                        }`}
                                    to="/login"
                                    onClick={() => setActiveButton("login")}
                                >
                                    Acceso
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link
                                    className={`nav-link btn ${activeButton === "signup"
                                        ? "btn-secondary text-white"
                                        : "btn-outline-secondary"
                                        }`}
                                    to="/signup"
                                    onClick={() => setActiveButton("signup")}
                                >
                                    Registro
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

// Exporting the Navbar component as default
export default Navbar;
