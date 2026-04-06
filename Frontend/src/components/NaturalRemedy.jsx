import { useEffect, useRef } from "react";
import img from "../../public/NaturalRemedies.jpeg"
import "../App.css";
import { FaLeaf } from "react-icons/fa";

function NaturalRemedy() {
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
                <div className="row align-items-center g-4 flex-lg-row-reverse">
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <img 
                                src={img} 
                                alt="Natural Remedies" 
                                className="feature-img" 
                                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <div className="section-icon">
                                <FaLeaf style={{ color: '#10b981' }} />
                            </div>
                            <h1 className="section-title text-gradient-green">🌿 Natural Remedies 🌿</h1>
                            <p className="section-subtitle">
                                Along with predicting possible health conditions, our system also provides useful home 
                                remedies and Ayurvedic suggestions. These remedies are based on natural ingredients and 
                                traditional practices that can help you feel better in mild conditions. Whether it's 
                                herbal solutions, simple home treatments, or lifestyle suggestions, the system guides 
                                you with options that are easy to follow and accessible.
                            </p>
                            <div className="mt-3 d-flex gap-2 flex-wrap">
                                <span className="badge-custom">Ayurvedic</span>
                                <span className="badge-custom">Herbal</span>
                                <span className="badge-custom">Homeopathy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NaturalRemedy;