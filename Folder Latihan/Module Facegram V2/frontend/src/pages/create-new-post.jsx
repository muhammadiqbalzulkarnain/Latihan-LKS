import { Link, useNavigate } from 'react-router-dom';

export default function CreateNewPost() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/my-profile');
    };

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
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Create new post</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label htmlFor="caption">Caption</label>
                                            <textarea className="form-control" name="caption" id="caption" cols="30" rows="3" required ></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="attachments">Image(s)</label>
                                            <input type="file" className="form-control" id="attachments" name="attachments" multiple required />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Share
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}