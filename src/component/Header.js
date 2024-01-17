import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    let data = JSON.parse(localStorage.getItem('checkUserLogin'));
    console.log(data);

    const logout = () => {
        localStorage.removeItem('checkUserLogin');
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
                <div className="container-fluid">
                    <NavLink to={'/'} className="navbar-brand">
                        <img src="https://www.novexluggage.com/wp-content/uploads/2023/08/Flipkart-logo.png" style={{ width: "130px" }} />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link active fs-6" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/product'} className="nav-link active fs-6" aria-current="page">Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/login' className="nav-link active " aria-current="page" >Login</NavLink>
                            </li>
                            {!data ? (<>
                                <li className="nav-item">
                                    <NavLink to='/register' className="nav-link active  " aria-current="page" >Register</NavLink>
                                </li>
                            </>) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink to={'/cart'} className="nav-link active fs-6" aria-current="page">Cart</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={'/profile'} className="nav-link active fs-6" aria-current="page">Profile</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink onClick={() => logout()} className="nav-link active  " aria-current="page" >Logout</NavLink>
                                    </li>
                                </>
                            )
                            }
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header