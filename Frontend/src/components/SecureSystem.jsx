import { useEffect, useRef } from "react";
import img from "../../public/SecureSystem.jpeg"
import "../App.css";
import { FaShieldAlt } from "react-icons/fa";

function SecureSystem() {
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
                                alt="Secure System" 
                                className="feature-img" 
                                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <div className="section-icon">
                                <FaShieldAlt style={{ color: '#3b82f6' }} />
                            </div>
                            <h1 className="section-title">🔐 Secure System 🔐</h1>
                            <p className="section-subtitle">
                                We understand that health-related information is personal and sensitive. That's why our 
                                system is built with a focus on security and privacy. Your data is handled carefully and 
                                is not shared with any third parties. We ensure that all interactions remain safe, allowing 
                                you to use the platform with confidence. Your trust is important to us, and we are committed 
                                to maintaining a secure and reliable experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecureSystem;