import { Link } from 'react-router-dom';

export default function UserProfile() {
    const usersList = ['@davidnaista', '@superipey', '@lukicenturi', '@_erik3010', '@asawgi', '@irfnmaulaa'];

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/homepage">Facegram</Link>
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/my-profile">@tomsgat</Link>
                        <Link className="nav-link" to="/">Logout</Link>
                    </div>
                </div>
            </nav>

            <main className="mt-5">
                <div className="container py-5">
                    <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <h5 className="mb-0">Lay Christian</h5>
                                <span>@laychristian92</span>
                            </div>
                            <small className="mb-0 text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, error!
                            </small>
                        </div>
                        <div>
                            <Link to="/user-profile-following" className="btn btn-primary w-100 mb-2">
                                Follow
                            </Link>
                            <div className="d-flex gap-3">
                                <div>
                                    <div className="profile-label"><b>5</b> posts</div>
                                </div>
                                <div className="profile-dropdown">
                                    <div className="profile-label"><b>100</b> followers</div>
                                    <div className="profile-list">
                                        <div className="card">
                                            <div className="card-body">
                                                {usersList.map((user, idx) => (
                                                    <div className="profile-user" key={idx}>
                                                        <Link to="/user-profile-private">{user}</Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-dropdown">
                                    <div className="profile-label"><b>100</b> following</div>
                                    <div className="profile-list">
                                        <div className="card">
                                            <div className="card-body">
                                                {usersList.map((user, idx) => (
                                                    <div className="profile-user" key={idx}>
                                                        <Link to="/user-profile-private">{user}</Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        {[1, 2, 3].map((item) => (
                            <div className="col-md-4" key={item}>
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="card-images mb-2">
                                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" className="w-100" />
                                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" className="w-100" />
                                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" className="w-100" />
                                        </div>
                                        <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}