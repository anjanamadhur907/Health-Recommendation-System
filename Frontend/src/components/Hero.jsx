import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeartbeat, FaBrain, FaShieldAlt } from "react-icons/fa";

function Hero({ user, setActiveModal }) {
    const navigate = useNavigate();

    const handlePredictClick = () => {
        if (!user) {
            toast.warning("Please login first");
            setActiveModal("login");
            return;
        }
        navigate("/predict");
    };

    return (
        <div className="hero-section">
            <div className="particles">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="particle" />
                ))}
            </div>
            
            <div className="glow-orb" style={{ top: '20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4), transparent)' }} />
            <div className="glow-orb" style={{ bottom: '20%', right: '10%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)', animationDelay: '2s' }} />

            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                Analyze Your Symptoms<br />
                                <span className="text-gradient">Get Instant Results</span>
                            </h1>
                            <p className="hero-subtitle">
                                AI-powered health prediction with remedies in seconds
                            </p>
                            <p className="hero-description">
                                The Health Recommendation System predicts possible diseases based on your selected symptoms. Get disease names, recovery time, and personalized remedies including home remedies, ayurvedic medicines, and allopathic treatments.
                            </p>
                            <div className="hero-input-wrapper">
                                <input 
                                    className="hero-input" 
                                    placeholder="Enter your symptoms..." 
                                />
                                <button 
                                    onClick={handlePredictClick}
                                    className="hero-btn"
                                >
                                    <span>Predict Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 d-none d-lg-block">
                        <div className="hero-visual">
                            <div className="floating-cards">
                                <div className="floating-card card-1">
                                    <FaHeartbeat className="card-icon" />
                                    <span>Heart Health</span>
                                </div>
                                <div className="floating-card card-2">
                                    <FaBrain className="card-icon" />
                                    <span>Mental Wellness</span>
                                </div>
                                <div className="floating-card card-3">
                                    <FaShieldAlt className="card-icon" />
                                    <span>Immune System</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;