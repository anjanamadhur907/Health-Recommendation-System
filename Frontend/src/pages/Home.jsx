import { useState, useEffect } from "react";
import About from "../components/About";
import Disclaimer from "../components/Disclaimer";
import FastPrediction from "../components/FastPrediction";
import Hero from "../components/Hero";
import HumanTouch from "../components/HumanTouch";
import Information from "../components/Information";
import NaturalRemedy from "../components/NaturalRemedy";
import Navbar from "../components/Navbar";
import SecureSystem from "../components/SecureSystem";
import Works from "../components/Works";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

function Home() {
    const [activeModal, setActiveModal] = useState(null);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setActiveModal(null);
            }
        };
        
        if (activeModal) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [activeModal]);

    return (
        <>
            {activeModal === "login" && (
                <div className="modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) setActiveModal(null);
                }}>
                    <div className="modal-box">
                        <button className="close-btn" onClick={() => setActiveModal(null)}>
                            ✕
                        </button>
                        <Login
                            close={() => setActiveModal(null)}
                            goToRegister={() => setActiveModal("register")}
                            setUser={setUser} 
                        />
                    </div>
                </div>
            )}

            {activeModal === "register" && (
                <div className="modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) setActiveModal(null);
                }}>
                    <div className="modal-box">
                        <button className="close-btn" onClick={() => setActiveModal(null)}>
                            ✕
                        </button>
                        <Register
                            close={() => setActiveModal(null)}
                            goToLogin={() => setActiveModal("login")}
                            setUser={setUser}
                        />
                    </div>
                </div>
            )}

            <Navbar
                setShowLogin={() => setActiveModal("login")}
                setShowRegister={() => setActiveModal("register")}
                user={user}        
                setUser={setUser}   
            />

            <Hero user={user} setActiveModal={setActiveModal}/>
            <FastPrediction />
            <div className="divider" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)' }} />
            <NaturalRemedy />
            <div className="divider" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)' }} />
            <SecureSystem />
            <div className="divider" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)' }} />
            <Works />
            <div className="divider" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)' }} />
            <Information />
            <div className="divider" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)' }} />
            <HumanTouch />
            <div className="divider" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)' }} />
            <Disclaimer />
            <About />
        </>
    );
}

export default Home;