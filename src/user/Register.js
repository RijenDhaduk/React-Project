import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios.post(`http://localhost:8000/users`, {
      name: name,
      email: email,
      password: password
    });
    toast.success("Successfully Register");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <div className='pt-5'>
        <div className='container d-flex justify-content-center'>
          <div className='col-6 bg-white rounded-4'>
            <h1 className='text-center pt-5'>User Register</h1>
            <div className='row p-5'>
              <form className='fs-5'>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                  <input type="email" name='name' onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                  <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="exampleInputPassword1" />
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

export default Register