import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newpassword = () => {

    const navigate = useNavigate()

    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const handleSubmit = () => {
        let emaildata =  JSON.parse(localStorage.getItem('checkUserLogin'))
        if(password === confirmpassword){
            axios.patch(`http://localhost:8000/users/${emaildata.id}`,{
                password : password
            }).then((res)=>{
                localStorage.setItem('checkUserLogin',JSON.stringify(res.data));
                toast.success("Successfully Password Changed")
                navigate(`/login`);
            }).catch((err)=>{
                toast.error("Password update failed");
                return false;
            }) 
        }else{
            toast.error("Passwords do not match");
            return false;
        }

    }

    return (
        <>
            <div className='pt-5'>
                <div className='container d-flex justify-content-center'>
                    <div className='col-6 bg-white rounded-4'>
                        <h1 className='text-center pt-5'>User password</h1>
                        <div className='row p-5'>
                            <form className='fs-5'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
                                    <input type="text" name='Password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password</label>
                                    <input type="text" name='Confirm' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
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

export default Newpassword