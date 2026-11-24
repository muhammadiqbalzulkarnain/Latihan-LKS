import {useState} from "react";
import {createPost} from "../helpers/fetch.js";

export default function CreatePost() {
    document.title = "Create Post";
    const [errors, setErrors] = useState([]);
    const username = window.localStorage.getItem("username");

    function submit(e) {
        e.preventDefault()

        const caption = e.target.caption.value
        const attachments = e.target.attachments.files

        createPost({caption, files: attachments}, username, setErrors)
    }

    return <>
        <main className="mt-5">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card">
                            <div
                                className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                <h5 className="mb-0">Create new post</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submit}>
                                    <div className="mb-2">
                                        <label htmlFor="caption">Caption</label>
                                        <textarea className="form-control" name="caption" id="caption" cols="30"
                                                  rows="3"></textarea>
                                        <p className={'text-danger'}>{errors?.['caption']?.[0]}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="attachments">Image(s)</label>
                                        <input type="file" className="form-control" id="attachments" name="attachments"
                                               multiple/>
                                        <p className={'text-danger'}>{errors?.['attachments']?.[0]}</p>
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
}