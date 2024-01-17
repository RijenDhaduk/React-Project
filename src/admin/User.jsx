import { useState ,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState([]);

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem('checkAdminLogin'));
        if (!admin) {
            navigate('/admin');
        }
        axios.get(`http://localhost:8000/users`)
            .then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }, [])

    return (
        <center className='vh-100'>
            <table className="text-white ">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((val) => {
                            return (
                                <tr>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td>
                                        <Link to={`/admin/userview/${val.id}`}>
                                            <button id="category" className="rounded-3 border-0 text-white  me-4" style={{ width: "200px", height: "40px" }}>View Product</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </center>
    )
}

export default User