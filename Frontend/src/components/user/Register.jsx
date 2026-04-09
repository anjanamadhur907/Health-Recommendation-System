import { useState } from "react";
import axios from "axios";
import API from "../API/API";
import { toast } from "react-toastify";

function Register({ close, goToLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [age, setAge] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 4) {
            newErrors.password = "Password must be at least 4 characters";
        }
        
        if (!age.trim()) {
            newErrors.age = "Age is required";
        } else if (isNaN(age) || parseInt(age) < 1 || parseInt(age) > 150) {
            newErrors.age = "Please enter a valid age";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await axios.post(API.REGISTER, {
                name,
                email,
                password,
                age: parseInt(age)
            });

            toast.success("Registration successful! Please login.");
            goToLogin();

        } catch (err) {
            if (err.response?.data?.error) {
                setErrors({ form: err.response.data.error });
                toast.error(err.response.data.error);
            } else {
                setErrors({ form: "Registration failed. Please try again." });
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="modal-title">Create Account</h2>
            <form onSubmit={handleSubmit}>
                {errors.form && (
                    <div className="form-error-message">{errors.form}</div>
                )}
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrors({ ...errors, name: "", form: "" });
                        }}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: "", form: "" });
                        }}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="password-input-wrapper">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: "", form: "" });
                            }}
                        />
                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Age</label>
                    <input 
                        type="number" 
                        placeholder="Enter your age" 
                        className={`form-input ${errors.age ? 'input-error' : ''}`}
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value);
                            setErrors({ ...errors, age: "", form: "" });
                        }}
                    />
                    {errors.age && <span className="error-text">{errors.age}</span>}
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                </button>
                <p className="switch-text">
                    Already have an account?
                    <a href="#" onClick={(e) => { e.preventDefault(); goToLogin(); }}>
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Register;