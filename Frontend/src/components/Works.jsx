import { useEffect, useRef } from "react";
import img from "../../public/Works.jpeg"
import "../App.css";
import { FaBrain } from "react-icons/fa";

function Works() {
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
                                alt="How It Works" 
                                className="feature-img" 
                                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <div className="section-icon">
                                <FaBrain style={{ color: '#8b5cf6' }} />
                            </div>
                            <h1 className="section-title">🧠 How It Works 🧠</h1>
                            <p className="section-subtitle">
                                Using the system is simple and user-friendly. First, you enter the symptoms you are 
                                experiencing. The system then analyzes your input and matches it with its database of 
                                diseases and conditions. Based on this analysis, it generates a list of possible diseases 
                                along with a match percentage. You also receive information about recovery time, along with 
                                home remedies, Ayurvedic treatments, and basic medicines that may help. The entire process 
                                takes only a few seconds.
                            </p>
                            <div className="mt-3">
                                <div className="step-item">
                                    <span className="step-number">1</span>
                                    <span className="step-text">Enter your symptoms</span>
                                </div>
                                <div className="step-item">
                                    <span className="step-number">2</span>
                                    <span className="step-text">AI analyzes & matches</span>
                                </div>
                                <div className="step-item">
                                    <span className="step-number">3</span>
                                    <span className="step-text">Get results with remedies</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Works;