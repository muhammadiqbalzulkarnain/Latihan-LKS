import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors([]);

        fetch('http://127.0.0.1:8000/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) {
                throw data;
            }
            
            localStorage.setItem('token', data.token);
            navigate('/'); 
        })
        .catch(err => {
            
            if (err.errors) {
                let errorList = [];
                Object.values(err.errors).forEach(messages => {
                    errorList.push(...messages);
                });
                setErrors(errorList);
            } else {
                setErrors([err.message || 'Login gagal. Periksa kembali data Anda.']);
            }
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <div className="card shadow p-4">
                <h3 className="text-center mb-4 fw-bold text-primary">Login Facegram</h3>
                
                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="mb-0 ps-3">
                            {errors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={(e) => setUserName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <p className="text-center mt-3 small text-muted">
                    Belum punya akun? <Link to="/register">Daftar di sini</Link>
                </p>
            </div>
        </div>
    );
}