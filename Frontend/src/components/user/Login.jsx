import { useState } from "react";
import axios from "axios";
import API from "../API/API";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ close, goToRegister, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            let response = await axios.post(API.LOGIN, {
                email: email.trim().toLowerCase(),
                password
            });

            toast.success("Login successful!");

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setUser(response.data.user);
            close();

        } catch (error) {
            const serverErr = error.response?.data?.error;
            let errMsg = "Login failed. Please try again.";
            
            if (Array.isArray(serverErr)) {
                errMsg = serverErr.map(e => e.msg).join(", ");
            } else if (typeof serverErr === "string") {
                errMsg = serverErr;
            } else if (error.response?.status === 401) {
                errMsg = "Invalid email or password";
            }

            setErrors({ form: errMsg });
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="modal-title">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
                {errors.form && (
                    <div className="form-error-message">{errors.form}</div>
                )}
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
                            placeholder="Enter your password" 
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
                            {showPassword ? <FaEye color="white"/> : <FaEyeSlash color="white"/>}
                        </button>
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="switch-text">
                    Don't have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); goToRegister(); }}>
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Login;