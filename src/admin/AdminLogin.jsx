import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        let users = await axios.get(`http://localhost:8000/users?email=${email}&password=${password}&role=admin`);
        if (users.data.length === 0) {
            toast.error("Email and Password not valid");
            navigate('/admin');
            return false;
        }
        toast.success("Successfully Login");
        localStorage.setItem('checkAdminLogin', JSON.stringify(users.data[0]));
        setEmail("");
        setPassword("");
        navigate('/admin/dashboard');
    }

    return (
        <>
            <div className='pt-5'>
                <div className='container d-flex justify-content-center'>
                    <div className='col-6 bg-white rounded-4'>
                        <h1 className='text-center pt-5'>Admin Login</h1>
                        <div className='row p-5'>
                            <form className='fs-5'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                                    <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className='mb-3 text-end'>
                                    <Link to={`/forgot`} className='h6 text-danger' style={{ textDecoration: "none" }}>Forgot Password ?</Link>
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

export default AdminLogin;