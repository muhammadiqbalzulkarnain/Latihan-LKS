import { useState, useEffect } from 'react';

export default function Beranda() {
    const [posts, setPosts] = useState([]);
    const [exploreUsers, setExploreUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(`token`);

        fetch('http://127.0.0.1:8000/api/v1/posts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data.posts || []);
                setLoading(false);
            })
            .catch(err => console.error("Gagal memuat feed:", err));

        fetch('http://127.0.0.1:8000/api/v1/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setExploreUsers(data.users || []));
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Memuat beranda...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Kolom Kiri: News Feed Postingan */}
                <div className="col-md-8">
                    <h4 className="mb-3 fw-bold">Beranda (News Feed)</h4>


                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary fw-bold">
                                        @{post.user.username}
                                    </h5>
                                    <p className="card-text">{post.caption}</p>

                                    {post.attachments && post.attachments.map((att, idx) => (
                                        <img key={idx} src={att.storage_path} alt="Attachment" className="img-fluid rounded mb-2" style={{ maxHeight: '300px' }} />
                                    ))}

                                    <small className="text-muted">
                                        {new Date(post.created_at).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-info">Belum ada postingan untuk ditampilkan.</div>
                    )}
                </div>

                {/* Kolom Kanan: Explore People */}
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h5 className="fw-bold mb-3">Explore People</h5>
                        {exploreUsers.length > 0 ? (
                            exploreUsers.map(user => (
                                <div key={user.id} className="d-flex justify-content-between align-items-center mb-2">
                                    <span>@{user.username}</span>
                                    <button className="btn btn-sm btn-outline-primary">Follow</button>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted small">Tidak ada pengguna lain.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}