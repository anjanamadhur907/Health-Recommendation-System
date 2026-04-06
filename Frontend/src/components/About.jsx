import { useEffect, useRef } from "react";
import "../App.css"
import { MdEmail } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

function About() {
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
            { threshold: 0.15 }
        );

        const section = sectionRef.current;
        if (section) {
            const cards = section.querySelectorAll('.section-card');
            cards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 0.2}s`;
                observer.observe(card);
            });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-section" ref={sectionRef}>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card about-card">
                            <h1>About Project</h1>
                            <ul className="about-list">
                                <li>
                                    <FaCheckCircle />
                                    <span>Smart Health Recommendation System</span>
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    <span>Predicts diseases based on symptoms</span>
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    <span>Fast prediction in seconds</span>
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    <span>Home remedies & Ayurvedic solutions</span>
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    <span>Basic medicine suggestions</span>
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    <span>Useful when doctor visit isn't possible</span>
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    <span>Easy to use & beginner-friendly</span>
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    <span>Full-stack development</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="section-card glass-card about-card">
                            <h1>About Me</h1>
                            <p className="section-subtitle">
                                Hi, I'm a passionate full-stack developer who loves building real-world projects.
                                I created this Smart Health Recommendation System to solve a common problem —
                                people often get confused while searching symptoms online.
                            </p>
                            <p className="section-subtitle">
                                This project helped me improve my skills in backend development,
                                database design, and smart logic building. I enjoy creating useful
                                and practical applications that make a difference.
                            </p>
                            <div className="contact-section">
                                <MdEmail size={20} color="#4f46e5" />
                                <span>Email - </span>
                                <a href="mailto:anjanamadhur907@gmail.com">anjanamadhur907@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="footer-text">
                    © {new Date().getFullYear()} SmartAyu. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default About;