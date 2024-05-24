// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from './components/Navbar';
import HairCare from "./pages/HairCare";
import HairStyle from "./pages/HairStyles";
import CalendarPage from "./pages/CalendarPage";

function App() {
    // Access user data from the authentication context
    const { user } = useAuthContext();
    
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="p-5 m-auto">
                    <Routes>
                        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/CalendarPage" element={user ? <CalendarPage /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                        <Route path="/haircare" element={<HairCare />} />
                        <Route path="/hairstyles" element={<HairStyle />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
