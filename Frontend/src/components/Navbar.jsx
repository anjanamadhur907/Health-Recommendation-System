import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { FaLeaf } from "react-icons/fa";

function Navbar({ setShowLogin, setShowRegister, user, setUser }) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    const handleAbout = () => {
        navigate("/");
        setTimeout(() => {
            const aboutSection = document.getElementById("about");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <nav className={`navbar-new ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link to="/" className="navbar-brand">
                    <span className="shine-text">SmartAyu</span>
                    <FaLeaf style={{ color: "#10b981", fontSize: "1.25rem" }} />
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="nav-link text-primary">
                        Home
                    </Link>

                    <button onClick={handleAbout} className="nav-link text-primary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        About
                    </button>

                    {user ? (
                        <>
                            <span className="welcome-text">
                                Welcome, {user.name}
                            </span>
                            <button
                                className="nav-btn nav-btn-outline"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="nav-btn nav-btn-outline"
                                onClick={() => setShowLogin()}
                            >
                                Login
                            </button>
                            <button
                                className="nav-btn nav-btn-primary"
                                onClick={() => setShowRegister()}
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;