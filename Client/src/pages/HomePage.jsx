import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, deleteCookie } from "../lib/cookie";
import "../styles/HomePage.css";

export const HomePage = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Handle Navbar transparency on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        deleteCookie();
        navigate("/login");
    };

    useEffect(() => {
        const token = getCookie();
        if (!token) navigate("/login", { replace: true });
    }, [navigate]);

    return (
        <div className="app-container">
            <nav className={`nav-glass ${scrolled ? "scrolled" : ""}`}>
                <div className="nav-content">
                    <div className="brand">
                        <div className="logo-sq">S</div>
                        <span>Student<b>Master</b></span>
                    </div>
                    <div className="nav-actions">
                        {/* <span className="user-status">System Active</span> */}
                        <button className="btn-logout" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </nav>

            <main className="hero-section">
                <div className="hero-grid">
                    <div className="hero-main">
                        <div className="status-pill">● Secure Environment</div>
                        <h1>Manage Students with <span className="gradient-text">JSON Web Token.</span></h1>
                        <p>A professional-grade MERN stack implementation featuring ironclad JWT authentication and real-time data management.</p>

                        <div className="cta-group">
                            <button className="btn-primary" onClick={() => navigate("/jwt")}>
                                Launch Console
                            </button>
                            {/* <button className="btn-secondary">View Documentation</button> */}
                        </div>

                        <div className="hero-stats">
                            <div className="stat-item"><b>99.9%</b> <span>Uptime</span></div>
                            <div className="stat-item"><b>12ms</b> <span>Latency</span></div>
                            <div className="stat-item"><b>AES-256</b> <span>Encryption</span></div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="visual-card">
                            <div className="card-top">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="card-body">
                                <div className="code-line"><span>GET</span> /api/auth/verify</div>
                                <div className="code-line success"><span>200</span> OK - Token Valid</div>
                                <div className="code-line"><span>POST</span> /api/student/update</div>
                                <div className="shimmer-block"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <section className="features-bento">
                <div className="feature-item large">
                    <div className="icon-box">🔐</div>
                    <h3>JWT Architecture</h3>
                    <p>Stateless authentication using industry-standard tokens for maximum security.</p>
                </div>
                <div className="feature-item">
                    <div className="icon-box">🚀</div>
                    <h3>High Speed</h3>
                    <p>Optimized MERN architecture for instant responses.</p>
                </div>
                <div className="feature-item">
                    <div className="icon-box">📂</div>
                    <h3>Database</h3>
                    <p>Seamless MongoDB integration for student records.</p>
                </div>
            </section>

            <footer className="simple-footer">
                <p>&copy; 2026 StudentMaster System. All protocols secured.</p>
            </footer>
        </div>
    );
};