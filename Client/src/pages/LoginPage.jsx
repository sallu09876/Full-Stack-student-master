import React, { useState } from "react";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "../lib/cookie";
import { api } from "../../axios";

export const StudentLogin = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const navigate = useNavigate();

    // Navigate to signup
    const handleNavigate = () => {
        navigate("/signup");
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle login submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", loginData);
            const token = response.data.token;

            setCookie(token);
            console.log("COOKIE:", getCookie());

            toast.success("Login success");

            setTimeout(() => {
                navigate("/", { replace: true });
            }, 300);

        } catch (err) {
            toast.error(err.response?.data.message || err.message || "Login error");
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-card reverse">

                {/* Left Side */}
                <div className="auth-brand">
                    <h2>Welcome Back!</h2>
                    <p>
                        Pick up right where you left off. Your dashboard and courses are waiting.
                    </p>

                    <div className="status-box">
                        <span className="status-dot"></span>
                        <p>3 New assignments posted today</p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="auth-form">
                    <div className="form-header">
                        <h3>Login</h3>
                        <p>Access your student portal.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Student Email</label>
                            <div className="input-wrapper">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@university.edu"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="between">
                                <label>Password</label>
                                <a className="forgot">Forgot password?</a>
                            </div>

                            <div className="input-wrapper">
                                <Lock size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={loginData.rememberMe}
                                onChange={handleChange}
                            />
                            <span>Keep me logged in</span>
                        </div>

                        <button type="submit" className="auth-button">
                            <LogIn size={18} /> Sign In
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            New here?{" "}
                            <span onClick={handleNavigate}>
                                Create an account
                            </span>
                        </p>

                        <button
                            className="back-home"
                            onClick={() => navigate("/")}
                        >
                            <ArrowLeft size={14} /> Back to homepage
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
