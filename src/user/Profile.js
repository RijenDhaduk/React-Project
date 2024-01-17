import axios from "axios"
import { useEffect, useState } from "react"

const Profile = () => {

    const [profile,setProduct] = useState("");
    const [cart,setCart] = useState([]);

    const user = () => {
        let data = JSON.parse(localStorage.getItem('checkUserLogin'))
        setProduct(data)
    }

    const product = async() => {
        let record = JSON.parse(localStorage.getItem('checkUserLogin'));
        let productDtat = await axios.get(`http://localhost:8000/carts?userId=${record.id}`)
        setCart(productDtat.data);
    }
    
    useEffect(()=>{
        product()
        user()
    },[])

    return (
        <div className="container  py-5 "> 
            <div className="row bg-white">
                <h1 className="text-center py-5">User Profile</h1>
                <div className="pb-5  border-2 border-top-0 border-start-0 border-end-0 text-center">
                    <h5>User Name :-<span>{profile.name}</span></h5>
                    <h5 className="py-2">User Email :-<span>{profile.email}</span></h5>
                    <h5>User Password :-<span>{profile.password}</span></h5>
                </div>
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
                                                        <p  style={{ width: "100px" }} >{val.qty}</p>
                                                    </td>
                                                    
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
        </div>
    )
}

export default Profile