import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        password: '',
        bio: '',
        is_private: false
    });

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Tombol Daftar diklik!");
        setErrors([]);

        fetch('http://127.0.0.1:8000/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                full_name: formData.full_name,
                password: formData.password,
                bio: formData.bio,
                is_private: formData.is_private
            })
        })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    throw data;
                }
                navigate('/login');

          
            })
            .catch(err => {
                if (err.errors) {
                    setErrors(Object.values(err.errors).flat());
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 card shadow p-4">
                    <h2 className="text-center text-success mb-4">Daftar Akun</h2>

                    {errors.length > 0 && (
                        <div className="alert alert-danger">
                            <ul className="mb-0">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nama Lengkap</label>
                            <input
                                type="text"
                                name="full_name"
                                className="form-control"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Bio</label>
                            <textarea
                                name="bio"
                                className="form-control"
                                value={formData.bio}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-check d-flex align-items-center gap-2 mb-3 text-start">
                            <input
                                type="checkbox"
                                name="is_private"
                                className="form-check-input mt-0"
                                id="is_private"
                                checked={formData.is_private}
                                onChange={handleChange}
                            />
                            <label className="form-check-label mb-0" htmlFor="is_private">
                                Akun Private
                            </label>
                        </div>

                        <button type="submit" className="btn btn-success w-100">Daftar</button>
                    </form>

                    <div className="text-center mt-3">
                        <small>Sudah punya akun? <Link to="/login">Login di sini</Link></small>
                    </div>
                </div>
            </div>
        </div>
    );
}