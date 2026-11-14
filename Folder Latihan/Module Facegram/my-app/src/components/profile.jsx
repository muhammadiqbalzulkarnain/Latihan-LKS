import { useState, useEffect } from 'react';

export default function Profile({ username }) {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!username || username === ':username') {
            setLoading(false);
            console.log(username)
            return;
        }

        const token = localStorage.getItem('token');

        fetch(`http://127.0.0.1:8000/api/v1/users/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setProfile(data.username);
            setPosts(data.posts || []);
            setIsFollowing(data.is_following);
            setLoading(false);
        })
        .catch(err => console.error("Gagal memuat profil:", err));
    }, [username]);

    const handleFollowToggle = () => {
        const token = localStorage.getItem('token');
        fetch(`http://127.0.0.1:8000/api/users/${profile.id}/follow`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setIsFollowing(data.isFollowing);
        });
    };

    if (loading) return <div className="text-center mt-5">Memuat profil...</div>;
    if (!profile) return <div className="alert alert-danger mt-4">Pengguna tidak ditemukan.</div>;

    return (
        <div className="container mt-4">
            {/* Bagian Informasi Profil */}
            <div className="card p-4 shadow-sm mb-4">
                <div className="row align-items-center">
                    <div className="col-md-3 text-center">
                        <div className="bg-secondary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '90px', height: '90px', fontSize: '2rem'}}>
                            {profile.username.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h3 className="mb-1">@{profile.username}</h3>
                        <p className="text-muted mb-1">{profile.full_name}</p>
                        <p className="mb-3">{profile.bio || 'Tidak ada bio.'}</p>
                        
                        <div className="d-flex gap-4 mb-3">
                            <div><strong>{posts.length}</strong> Postingan</div>
                            <div><strong>{profile.followers_count}</strong> Followers</div>
                            <div><strong>{profile.following_count}</strong> Following</div>
                        </div>

                        {/* Tombol Follow / Unfollow */}
                        <button onClick={handleFollowToggle} className={`btn ${isFollowing ? 'btn-outline-secondary' : 'btn-primary'}`}>
                            {isFollowing ? 'Unfollow' : (profile.is_private ? 'Request' : 'Follow')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bagian Postingan Pengguna */}
            <h4 className="fw-bold mb-3">Postingan</h4>
            {profile.is_private && !isFollowing ? (
                <div className="alert alert-warning">Akun ini bersifat privat. Ikuti akun ini untuk melihat postingannya.</div>
            ) : (
                posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="card mb-3 shadow-sm">
                            <div className="card-body">
                                <p className="card-text">{post.caption}</p>
                                <small className="text-muted">{new Date(post.created_at).toLocaleString()}</small>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">Belum ada postingan.</p>
                )
            )}
        </div>
    );
}