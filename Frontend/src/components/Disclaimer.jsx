import { useEffect, useRef } from "react";
import img from "../../public/disclaimer.jpeg"
import "../App.css";
import { FaExclamationTriangle } from "react-icons/fa";

function Disclaimer() {
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
                                alt="Disclaimer" 
                                className="feature-img" 
                                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card disclaimer-card">
                            <div className="section-icon">
                                <FaExclamationTriangle style={{ color: '#fca5a5' }} />
                            </div>
                            <h1 className="section-title disclaimer-title">⚠️ Disclaimer ⚠️</h1>
                            <p className="section-subtitle">
                                This system does not provide 100% accurate medical diagnosis. The results are based on 
                                symptom matching and should be used only for informational purposes. It is designed to 
                                save your time and give you a basic idea of what disease might be possible. You can use 
                                this information to understand your condition better, but it should not replace professional 
                                medical advice. In case of serious symptoms, always consult a qualified doctor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Disclaimer;