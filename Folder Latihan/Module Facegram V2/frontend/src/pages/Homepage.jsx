import { Link } from 'react-router-dom';

export default function Homepage() {

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
                    <div className="row justify-content-between">
                        <div className="col-md-8">
                            <h5 className="mb-3">News Feed</h5>

                            <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                <h6 className="mb-0">Lay Christian</h6>
                                <small className="text-muted mx-5">5 days ago</small>
                            </div>
                            <div className="card-body">
                                <div className="card-images mb-2">
                                    <img src="posts/5898d0f58275e829008b4842.webp" alt="image" className="w-100" />
                                    <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" className="w-100" />
                                    <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" className="w-100" />
                                </div>
                                <p className="mb-0 text-muted">
                                    <b><Link to="/user-profile">laychristian92</Link></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?
                                </p>
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="request-follow mb-4">
                                <h6 className="mb-3">Follow Requests</h6>
                                <div className="request-follow-list">
                                    <div className="card mb-2">
                                        <div className="card-body d-flex align-items-center justify-content-between p-2">
                                            <Link to="/user-profile-private">@laychristian92</Link>
                                            <button className="btn btn-primary btn-sm">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="explore-people">
                                <h6 className="mb-3">Explore People</h6>
                                <div className="explore-people-list text-decoration-none">
                                    {['@davidnaista', '@superipey', '@lukicenturi', '@_erik3010', '@asawgi', '@irfnmaulaa'].map((user, idx) => (
                                        <div className="card mb-2" key={idx}>
                                            <div className="card-body p-2">
                                                <Link to="/user-profile-private">{user}</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}