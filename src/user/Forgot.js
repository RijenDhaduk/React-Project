import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        let emailData = JSON.parse(localStorage.getItem('checkUserLogin'))
        if(emailData.email === email){
            toast.success("Successfully Forget");
            navigate('/otp');
            setEmail("");
        }else{
            toast.error("Email is not valid");
            setEmail("");
        }
    }

    return (
        <>
            <div className='pt-5'>
                <div className='container d-flex justify-content-center'>
                    <div className='col-6 bg-white rounded-4'>
                        <h1 className='text-center pt-5'>User Forgot</h1>
                        <div className='row p-5'>
                            <form className='fs-5'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                                    <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Forgot