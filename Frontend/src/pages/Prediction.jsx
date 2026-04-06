import { useEffect, useState, useRef } from "react";
import axios from "axios";
import API from "../components/API/API"; 
import { toast } from "react-toastify";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaStethoscope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Prediction() {
    const navigate = useNavigate();

    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const res = await axios.get(API.GET_SYMPTOMS);
                setSymptoms(res.data);
            } catch (err) {
                toast.error("Failed to load symptoms");
            }
        };

        fetchSymptoms();
    }, []);

    const toggleSymptom = (symptom) => {
        if (selectedSymptoms.includes(symptom.symptom_name)) {
            setSelectedSymptoms(
                selectedSymptoms.filter((s) => s !== symptom.symptom_name)
            );
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom.symptom_name]);
        }
    };

    const handlePredict = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return toast.warning("Please login first");
        }

        if (selectedSymptoms.length === 0) {
            return toast.warning("Select at least one symptom");
        }

        setLoading(true);
        setResults([]); 
        
        try {
            const res = await axios.post(
                API.SMART_PREDICT,
                { symptoms: selectedSymptoms },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.results && res.data.results.length > 0) {
                setResults(res.data.results);
                toast.success("Prediction completed");
            } else {
                toast.info("No matching disease found");
            }
        } catch (err) {
            toast.error("Prediction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prediction-page">
            <div className="prediction-header">
                <button onClick={() => navigate("/")} className="exit-btn">
                    ← Back to Home
                </button>
                <h1>
                    <FaStethoscope className="header-icon" />
                    Health Prediction System
                </h1>
            </div>

            <div className="container">
                <div className="selected-symptoms-section">
                    <h3>Selected Symptoms ({selectedSymptoms.length})</h3>
                    {selectedSymptoms.length === 0 ? (
                        <p className="no-selection">Click on symptoms below to select them</p>
                    ) : (
                        <div className="selected-tags">
                            {selectedSymptoms.map((s, i) => (
                                <span
                                    key={i}
                                    className="selected-tag"
                                    onClick={() =>
                                        setSelectedSymptoms(selectedSymptoms.filter((sym) => sym !== s))
                                    }
                                >
                                    {s} <MdClose size={14} />
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="symptoms-grid-section">
                    <h3>Select Your Symptoms</h3>
                    <p className="section-hint">Click on symptoms that you are currently experiencing</p>
                    
                    <div className="symptoms-grid">
                        {symptoms.map((symptom) => (
                            <button
                                key={symptom.symptom_id}
                                onClick={() => toggleSymptom(symptom)}
                                className={`symptom-chip ${
                                    selectedSymptoms.includes(symptom.symptom_name) ? "selected" : ""
                                }`}
                            >
                                {selectedSymptoms.includes(symptom.symptom_name) && (
                                    <FaCheckCircle className="check-icon" />
                                )}
                                {symptom.symptom_name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="predict-section">
                    <button
                        className="predict-button"
                        onClick={handlePredict}
                        disabled={loading || selectedSymptoms.length === 0}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Analyzing Symptoms...
                            </>
                        ) : (
                            <>
                                <FaStethoscope />
                                Predict Disease
                            </>
                        )}
                    </button>
                </div>

                {results.length > 0 && (
                    <div className="results-section">
                        <h2>
                            <span className="result-icon">🔍</span>
                            Prediction Results
                        </h2>
                        
                        <div className="results-grid">
                            {results.map((res, idx) => (
                                <div key={idx} className="result-card-new">
                                    <div className="result-header">
                                        <h3>{res.disease_name}</h3>
                                        <div className="match-percentage">
                                            {res.match_percentage}% Match
                                        </div>
                                    </div>
                                    
                                    <div className="result-stats">
                                        <div className="stat">
                                            <span className="stat-label">Difficulty</span>
                                            <span className="stat-value">{res.difficulty_level}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Recovery</span>
                                            <span className="stat-value">{res.recovery_days}</span>
                                        </div>
                                    </div>

                                    <div className="remedies">
                                        <div className="remedy-section">
                                            <h4>🏠 Home Remedies</h4>
                                            <ul>
                                                {res.remedies?.home_remedy
                                                    ? res.remedies.home_remedy.split(",").map((item, i) => (
                                                        <li key={i}>{item.trim()}</li>
                                                    ))
                                                    : <li className="na-text">Not Available</li>}
                                            </ul>
                                        </div>

                                        <div className="remedy-section">
                                            <h4>🌿 Ayurvedic Medicines</h4>
                                            <ul>
                                                {res.remedies?.ayurvedic_medicine
                                                    ? res.remedies.ayurvedic_medicine.split(",").map((item, i) => (
                                                        <li key={i}>{item.trim()}</li>
                                                    ))
                                                    : <li className="na-text">Not Available</li>}
                                            </ul>
                                        </div>

                                        <div className="remedy-section">
                                            <h4>💊 Allopathic Medicines</h4>
                                            <ul>
                                                {res.remedies?.medicine
                                                    ? res.remedies.medicine.split(",").map((item, i) => (
                                                        <li key={i}>{item.trim()}</li>
                                                    ))
                                                    : <li className="na-text">Not Available</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prediction;