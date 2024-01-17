import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const AdminLayout = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('checkAdminLogin');
        navigate('/');
    }
    return (
        <>
            <div>
                <header className="d-flex">
                    <div className="col-2 bg text-center">
                        <NavLink to={'/admin'} className="navbar-brand">
                            <img src="https://www.novexluggage.com/wp-content/uploads/2023/08/Flipkart-logo.png" style={{ width: "130px" }} />
                        </NavLink>
                    </div>
                    <div className="col-10 bg1 d-flex align-items-centr justify-content-between">
                        <div className="bars d-flex align-items-center">
                            <div className="text-white ps-4 pe-3">
                                <svg width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x={22} y={11} width={4} height={4} rx={2} fill="#fff" />
                                    <rect x={11} width={4} height={4} rx={2} fill="#fff" />
                                    <rect x={22} width={4} height={4} rx={2} fill="#fff" />
                                    <rect x={11} y={11} width={4} height={4} rx={2} fill="#fff" />
                                    <rect x={11} y={22} width={4} height={4} rx={2} fill="#fff" />
                                    <rect width={4} height={4} rx={2} fill="#fff" />
                                    <rect y={11} width={4} height={4} rx={2} fill="#fff" />
                                    <rect x={22} y={22} width={4} height={4} rx={2} fill="#fff" />
                                    <rect y={22} width={4} height={4} rx={2} fill="#fff" />
                                </svg>
                            </div>
                            <p className="text-white fs-4">Dashboard</p>
                        </div>
                        <div className="icon d-flex align-items-center ">
                            <div className="subicon mx-1"><a href="#"><i className="fa-solid fa-magnifying-glass" /></a></div>
                            <div className="subicon mx-1"><a href="#"><i className="bi bi-grid" /></a></div>
                            <div className="subicon mx-1"><a href="#"><i className="fa-solid fa-moon" /></a></div>
                            <div className="subicon mx-1"><a href="#"><i className="bi bi-fullscreen" /></a></div>
                            <div className="subicon mx-1"><a href="#"><i className="bi bi-chat-left" /></a></div>
                            <div className="subicon mx-1"><a href="#" ><i className="bi bi-gear" /></a></div>
                            <div className="subicon mx-1"><Link to={'/admin'} onClick={ () => logout()} style={{color:"#A098AE"}}><i class="bi bi-box-arrow-right"></i></Link></div>
                            <div className="subicon ms-1 me-4 position-relative" id="btnlos">
                                <img src="img/user.jpg" className="w-100 rounded-1 " alt />
                            </div>
                        </div>
                    </div>
                </header>
                <section className="menu d-flex bg">
                    <div className="col-2 vh-100 bg position-fixed" >
                        <ul className="px-4 pt-3">
                            <Link to={'/admin/dashboard'} className="text-white text-decoration-none">
                                <li className="text-white bg2 rounded-3 my-2">
                                    <i className="fa-solid fa-house ps-4 pe-3 py-3" />Dashboard
                                </li>
                            </Link>
                            <Link to={'/admin/user'} className="text-white text-decoration-none">
                                <li className="text-white bg2 rounded-3 my-2">
                                <i className="fa-solid fa-user ps-4 pe-3 py-3" />User
                                </li>
                            </Link>
                            <Link to={'/admin/slider'} className="text-white text-decoration-none d-flex align-items-center " >
                                <li className="text-white bg2 rounded-3 my-2 " style={{height:"25px"}}>
                                <i className="bi bi-sliders ps-4 pe-3 py-3"></i>Slider
                                </li>
                            </Link>
                            <Link to={'/admin/category'} className="text-white text-decoration-none">
                                <li className=" bg2 rounded-3 my-2">
                                    <i class="fas fa-list-alt ps-4 pe-3 py-3"></i>
                                    Category
                                </li>
                            </Link>
                            <Link to={'/admin/product'} className="text-white text-decoration-none">
                                <li className=" bg2 rounded-3 my-2">
                                    <i className="fab fa-product-hunt ps-4 pe-3 py-3" aria-hidden="true"></i>
                                    Product
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="col-10 bg3 h-100 ms-auto bgL"  >
                        <Outlet />
                    </div>
                </section>
            </div>

        </>
    )
}

export default AdminLayout;