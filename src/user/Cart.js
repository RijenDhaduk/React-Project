import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Userauth from './Userauth';
import checkUserLogin from './Userauth'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {

    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [total,setTotal] = useState(0);

    const AllCart = () => {
        axios.get(`http://localhost:8000/carts?userId=${Userauth().id}`)
            .then((res) => {
                setCart(res.data)
            }).catch((err) => {
                return false
            })
    }

    const ondelete = async (id) => {
        let deleteData = await axios.delete(`http://localhost:8000/carts/${id}`)
        toast.success("Product successfully Deleted",);
        AllCart();
    }

    const onqtyChange = (id, Qty) => {
        const updatedCartItems = cart.map(item => {
            if (item.id === id) {
                if(Qty >= 0){
                    return { ...item, qty: parseInt(Qty) };
                }
            }
            return item;
        });
        let data = updatedCartItems.map((item) => {
            if (item.id == id) {
                axios.patch(`http://localhost:8000/carts/${item.id}`, {
                    qty: item.qty,
                }).then((res) => {
                    toast.success("Product successfully Updated");
                    AllCart();
                }).catch((err) => {
                    return false
                })
            }
            return item;
        })
        setCart(data);
    }

    const AllTotal = () => {
        let Total = 0;
        cart.forEach((val) => {
            Total += val.price * val.qty;
        })
        setTotal(Total)
    }

    useEffect(() => {
        if (!checkUserLogin()) {
            alert("Please Login");
            navigate('/login');
        }
        AllCart();
        AllTotal();
    }, [cart])

    return (
        <>
            <div className='container'>
                <h2 className='text-center p-4'>Cart</h2>
                <div className='row justify-content-evenly'>
                    <>
                        <table>
                            <thead className='border-2 border-start-0 border-end-0 text-center ' style={{ height: "50px", borderColor: "#aaaaaa85" }}>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Data And Time</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Remove</th>
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
                                                    <td style={{ width: "100px" }}>
                                                        <input type='number' value={val.qty} onChange={(e) => onqtyChange(val.id, e.target.value)} style={{ width: "100px" }} ></input>
                                                    </td>
                                                    <td style={{ width: "100px" }}>${val.qty * val.price}</td>
                                                    <td style={{ width: "100px" }}>
                                                        <button onClick={() => ondelete(val.id, val.userId)} style={{ borderColor: "#aaaaaa85", borderStyle: "solid", width: "40px", height: "40px" }} className='rounded-3'><i className="bi bi-trash3"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                            </tbody>
                            <tfoot>
                                <tr className='border-3 border-start-0 border-end-0 text-center'>
                                    <td></td>
                                    <td className='h3'>Total</td>
                                    <td></td><td></td>
                                    <td className='h5'>${total}</td>
                                </tr>
                            </tfoot>
                        </table>
                        {/* <table>
                            <tbody>
                                <tr>
                                    <td style={{width:"200px"}}>Cart Subtotal</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style={{width:"200px"}}>Shipping</td>
                                    <td>Free Shipping</td>
                                </tr>
                                <tr>
                                    <td style={{width:"200px"}} >Total</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table> */}
                    </>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Cart