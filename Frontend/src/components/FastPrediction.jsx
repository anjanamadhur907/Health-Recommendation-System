import { useEffect, useRef } from "react";
import img from "../../public/FastPrediction.jpeg"
import "../App.css";
import { FaBolt } from "react-icons/fa";

function FastPrediction() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        const section = sectionRef.current;
        if (section) {
            const cards = section.querySelectorAll('.section-card');
            cards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.15}s`;
                observer.observe(card);
            });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="feature-section" ref={sectionRef}>
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <img 
                                src={img} 
                                alt="Fast Prediction" 
                                className="feature-img" 
                                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <div className="section-icon">
                                <FaBolt style={{ color: '#f59e0b' }} />
                            </div>
                            <h1 className="section-title">⚡ Fast Prediction ⚡</h1>
                            <p className="section-subtitle">
                                Our system is designed to provide fast and efficient health predictions within seconds. 
                                By analyzing the symptoms you enter, it quickly compares them with a wide range of known 
                                conditions and identifies the most relevant possibilities. This saves your time and 
                                gives you a quick understanding of what might be happening in your body.
                            </p>
                            <div className="mt-3 d-flex gap-3 flex-wrap">
                                <div className="stat-item">
                                    <span className="stat-number text-gradient">Seconds</span>
                                    <span className="stat-label">Response Time</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number text-gradient">99%</span>
                                    <span className="stat-label">Accuracy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FastPrediction;