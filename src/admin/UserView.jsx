import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UserView = () => {

    const { userId } = useParams();
    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const [cart, setCart] = useState([])

    const getUserDetails = () => {
        axios.get(`http://localhost:8000/users/${userId}`)
            .then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err);
                return false
            })
    }

    const getUserCartDetails = () => {
        axios.get(`http://localhost:8000/carts?userId=${userId}`)
            .then((res) => {
                setCart(res.data);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem('checkAdminLogin'));
        if (!admin) {
            navigate('/admin');
        }
        getUserDetails()
        getUserCartDetails()
    }, [])

    return (
        <div style={{ height: "100vh" }}>
            <dib className="text-white grid justify-content-center" >
                <div className='p-5 '>
                    <h5>User Id :- {user.id}</h5>
                    <h5>User Name :- {user.name}</h5>
                    <h5>User Email :- {user.email}</h5>
                </div>
                <div className='text-center col-12 '>
                    <h1>User Product</h1>
                    <div className=''>
                        <>
                            <table>
                                <thead className='border-2 border-start-0 border-end-0 text-center ' style={{ height: "50px", borderColor: "#aaaaaa85" }}>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Data And Time</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        cart.length === 0 ? (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className='text-cen'>
                                                    <h3 className='pt-5'>No Data Fou</h3>
                                                </td>
                                            </tr>
                                        ) : (
                                            cart.map((val) => {

                                                return (
                                                    <tr className='border-2 border-top-0 border-start-0 border-end-0 text-center' style={{ height: "140px", borderColor: "#aaaaaa85" }} key={val.id}>
                                                        <td style={{ width: "250px" }}>
                                                            <img src={val.image} style={{ width: "140px" }} />
                                                        </td>
                                                        <td style={{ width: "400px" }}>
                                                            <h4>{val.name}</h4>
                                                            <p>{val.category}</p>
                                                        </td>
                                                        <td>{val.data}</td>
                                                        <td style={{ width: "100px" }}>${val.price}</td>
                                                        <td style={{ width: "100px" }}>{val.qty}</td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </>
                    </div>
                </div>
            </dib>
        </div>
    )
}

export default UserView