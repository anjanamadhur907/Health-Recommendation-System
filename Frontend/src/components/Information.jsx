import { useEffect, useRef } from "react";
import img from "../../public/Information.jpeg"
import "../App.css";
import { FaInfoCircle } from "react-icons/fa";

function Information() {
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
                                alt="Information" 
                                className="feature-img" 
                                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <div className="section-icon">
                                <FaInfoCircle style={{ color: '#6366f1' }} />
                            </div>
                            <h1 className="section-title">💡 Information About</h1>
                            <h1 className="section-title">System 💡</h1>
                            <p className="section-subtitle">
                                This Smart Health Recommendation System is designed to help users get a quick idea 
                                about their health condition based on symptoms. It combines simple logic with structured 
                                data to provide meaningful suggestions. The goal is not to replace doctors, but to give 
                                users a basic understanding of possible health issues and guide them with initial remedies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;