import { useState } from 'react';
import { User, Mail, Lock, GraduationCap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { api } from '../../axios';

export const StudentSignup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        studentId: '',
        password: '',
    });
    const redirect = useNavigate()

    const handleNavigate = () => {
        redirect("/login")
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/auth/signup`, formData);
            const token = response.data.token;
            document.cookie = `MSKEY=${token};`
            return toast.success("Account created successfully");
        } catch (err) {
            return toast.error(err.response?.data.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                {/* Left Side */}
                <div className="auth-brand">
                    <GraduationCap size={48} className="brand-icon" />
                    <h2>Join our Academic Community</h2>
                    <p>
                        Access your courses, track your progress, and connect with peers worldwide.
                    </p>

                    <div className="auth-quote">
                        "Education is the most powerful weapon which you can use to change the world."
                    </div>
                </div>

                {/* Right Side */}
                <div className="auth-form">
                    <div className="form-header">
                        <h3>Create Account</h3>
                        <p>Enter your details to register as a student.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-wrapper">
                                <User size={18} />
                                <input type="text" name="fullName" placeholder="John Doe" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Student Email</label>
                            <div className="input-wrapper">
                                <Mail size={18} />
                                <input type="email" name="email" placeholder="email@university.edu" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Student ID</label>
                            <input type="text" name="studentId" placeholder="ST-12345" onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} />
                                <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
                            </div>
                        </div>

                        <button className="auth-button">
                            Sign Up <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="auth-footer">
                        Already have an account?
                        <span onClick={handleNavigate}> Log in</span>
                    </p>
                </div>

            </div>
        </div>
    );

};
