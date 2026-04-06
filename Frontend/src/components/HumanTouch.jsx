import { useEffect, useRef } from "react";
import img from "../../public/HumanTouch.jpeg"
import "../App.css";
import { FaHandsHelping } from "react-icons/fa";

function HumanTouch() {
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
                                alt="Human Touch" 
                                className="feature-img" 
                                style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card">
                            <div className="section-icon">
                                <FaHandsHelping style={{ color: '#ec4899' }} />
                            </div>
                            <h1 className="section-title text-gradient-pink">❤️ Human Touch ❤️</h1>
                            <p className="section-subtitle">
                                This platform is especially useful in situations where you are unable to visit a doctor 
                                immediately. It helps you understand the possible condition you might be facing and 
                                suggests what you can do in the meantime. Whether it's home remedies, Ayurvedic options, 
                                or basic medicines, the system gives you guidance so you are not completely helpless.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HumanTouch;