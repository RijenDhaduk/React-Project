import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='pt-5'>
        <div style={{ backgroundColor: "white" }} className='d-flex py-5'>
          <div className='col-3 ps-3 py-4 text-center'>
            <NavLink to={'/'} >
              <img src="./img/pngwing.com.png" style={{ width: "200px" }} />
            </NavLink>
          </div>
          <div className='col-2'>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={'/'} className="nav-link active fs-6" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/product'} className="nav-link  fs-6" aria-current="page">Product</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/cart'} className="nav-link  fs-6" aria-current="page">Cart</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/profile'} className="nav-link  fs-6" aria-current="page">Profile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/register'} className="nav-link  fs-6" aria-current="page">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/login'} className="nav-link  fs-6" aria-current="page">Login</NavLink>
              </li>
            </ul>
          </div>
          <div className='col-2'>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item py-2">
                Careers
              </li>
              <li className="nav-item py-2">
                Become a supplier
              </li>
              <li className="nav-item py-2">
                Hall of Fame
              </li>
              <li className="nav-item py-2">
                Sitemap
              </li>
              <li className="nav-item py-2">
                Legal and Policies
              </li>
              <li className="nav-item py-2">
                Meesho Tech Blog
              </li>
              <li className="nav-item py-2">
                Notices and Returns
              </li>
            </ul>
          </div>
          <div className='col-5 pe-5'>
            <h5>Contact Us</h5>
            <p>Fashnear Technologies Private Limited,
              CIN: U74900KA2015PTC082263
              06-105-B, 06-102, (138 Wu) Vaishnavi Signature, No. 78/9, Outer Ring Road, Bellandur, Varthur Hobli, Bengaluru-560103, Karnataka, India
              E-mail address: query@meesho.com
              © 2015-2023 Meesho.com</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer