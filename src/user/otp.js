import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Otp = () => {

    const navigate = useNavigate()
    const [otps,setOtp] = useState("");

    const Otp = () => {
        let userdata =  JSON.parse(localStorage.getItem('checkUserLogin'))
        let otp  = Math.floor(Math.random() * 1000);
        let obj = {
            otp : otp,
            email : userdata.email
        }
        localStorage.setItem("userotp", JSON.stringify(obj));
        toast.success("You OPT :-" + otp, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    const handleSubmit = () => {
        let otp =  JSON.parse(localStorage.getItem('userotp'))
        
        if(otp.otp === parseInt(otps)){
            toast.success("Successfully Otp ");
            navigate(`/newpassword`)
            return false
        }else{
            toast.error("OTP is not valid");
            return false
        }
    }
    useEffect(()=>{
        Otp()
    },[])

    return (
        <>
            <div className='pt-5'>
                <div className='container d-flex justify-content-center'>
                    <div className='col-6 bg-white rounded-4'>
                        <h1 className='text-center pt-5'>User Otp</h1>
                        <div className='row p-5'>
                            <form className='fs-5'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Otp</label>
                                    <input type="text" name='otp' onChange={(e) => setOtp(e.target.value)} value={otps} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
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

export default Otp