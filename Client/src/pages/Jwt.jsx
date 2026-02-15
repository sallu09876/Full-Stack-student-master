import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Jwt.css";

export const Jwt = () => {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [verifyStatus, setVerifyStatus] = useState(null); // 'success' | 'error' | null
    const navigate = useNavigate();

    const handleJWT = async () => {
        setIsLoading(true);
        setVerifyStatus(null);
        try {
            const response = await axios.get("http://localhost:8000/auth/create-token");
            const newToken = response.data.token;
            setToken(newToken);
            localStorage.setItem("token", newToken);
            console.log("👍🏻 TOKEN CREATED:", newToken);
        } catch (error) {
            console.error("❌ Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const verifyToken = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return setVerifyStatus('error');

        try {
            const response = await axios.get("http://localhost:8000/auth/verify-token", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setVerifyStatus('success');
            alert(`Verified! Expires in: ${response.data.session_expires_in}s`);
            console.log("✅ TOKEN VERIFICATION SUCCESS");
            console.log("⏳ SESSION EXPIRES IN:", response.data.session_expires_in, "seconds");
        } catch (error) {
            console.error("❌ Error verifying token:", error);
            alert("Failed to verify token. Check server logs.");
        }
    };

    const copyToClipboard = () => {
        if (!token) return;
        navigator.clipboard.writeText(token);
        alert("Token copied to clipboard!");
    };

    return (
        <div className="jwt-container">
            <div className="jwt-panel">
                <header className="panel-header">
                    <button className="back-btn" onClick={() => navigate("/")}>←</button>
                    <div className="panel-title">
                        <h2>JWT Debugger</h2>
                        <span className="live-indicator">Live Lab</span>
                    </div>
                </header>

                <div className="panel-body">
                    <section className="control-section">
                        <div className="info-text">
                            <h3>Authentication Flow</h3>
                            <p>Generate a stateless token to authorize secure API requests.</p>
                        </div>
                        <button
                            className={`action-btn primary ${isLoading ? 'loading' : ''}`}
                            onClick={handleJWT}
                            disabled={isLoading}
                        >
                            {isLoading ? "Generating..." : "Generate New Token"}
                        </button>
                    </section>

                    <section className="terminal-section">
                        <div className="terminal-header">
                            <span>Access Token (Base64)</span>
                            {token && <button onClick={copyToClipboard} className="copy-btn">Copy</button>}
                        </div>
                        <div className="terminal-window">
                            <code>{token || "System ready. Generate token to begin..."}</code>
                        </div>
                    </section>

                    <section className="verify-section">
                        <button className="action-btn outline" onClick={verifyToken}>
                            Verify Integrity
                        </button>

                        {verifyStatus === 'success' && (
                            <div className="status-msg success">✓ Signature Verified & Active</div>
                        )}
                        {verifyStatus === 'error' && (
                            <div className="status-msg error">✕ Invalid or Expired Token</div>
                        )}
                    </section>
                </div>

                <footer className="panel-footer">
                    Connected to: <span className="port-tag">localhost:8000</span>
                </footer>
            </div>
        </div>
    );
};