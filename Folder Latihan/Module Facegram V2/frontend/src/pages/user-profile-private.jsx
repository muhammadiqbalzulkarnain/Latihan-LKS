import { Link } from 'react-router-dom';

export default function UserProfilePrivate() {
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
                                <h5 className="mb-0">David Naista</h5>
                                <span>@davidnaista</span>
                            </div>
                            <small className="mb-0 text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, error!
                            </small>
                        </div>
                        <div>
                            <Link to="/user-profile-requested" className="btn btn-primary w-100 mb-2">
                                Follow
                            </Link>
                            <div className="d-flex gap-3">
                                <div>
                                    <div className="profile-label"><b>5</b> posts</div>
                                </div>
                                <div className="profile-dropdown">
                                    <div className="profile-label"><b>100</b> followers</div>
                                </div>
                                <div className="profile-dropdown">
                                    <div className="profile-label"><b>32</b> following</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card py-4">
                        <div className="card-body text-center">
                            This account is private
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}