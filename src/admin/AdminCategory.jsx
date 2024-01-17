import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminCategory = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const [isedit, setIsEdit] = useState("");
    const handleSubmit = () => {
        if (isedit) {
            axios.put(`http://localhost:8000/category/${isedit}`, {
                name: category
            })
                .then((res) => {
                    toast.success("Category successfully Update");
                    setCategory("");
                    setIsEdit("");
                    getUser();
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        } else {
            axios.post(`http://localhost:8000/category`, {
                name: category
            })
                .then((res) => {
                    toast.success("Category successfully add");
                    setCategory("");
                    getUser();
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        }
    }
    const getUser = () => {
        axios.get(`http://localhost:8000/category`)
            .then((res) => {
                setCategoryData(res.data);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/category/${id}`)
            .then((res) => {
                toast.success("Category successfully delete");
                setCategory("");
                getUser();
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const editData = (id) => {
        axios.get(`http://localhost:8000/category/${id}`)
            .then((res) => {
                setCategory(res.data.category);
                setIsEdit(id)
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
        getUser();
    }, [])
    return (
        <center>
            <h2 className="text-white py-5">Admin Category page</h2>
            <div className="bg1 col-6 py-5 rounded-3">
                <table className="text-white " >
                    <tbody className="" >
                        <tr>
                            <td className="w-25">Category :-</td>
                            <td><input type="category" onChange={(e) => setCategory(e.target.value)} value={category} name="name" id="category" className="rounded-3 border-0 text-white  w-75" placeholder="Enter category" /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                {
                                    isedit ? (<input type="button" id="category" className="rounded-3 border-0 text-white " onClick={() => handleSubmit()} value="Edit" />) : (<input type="button" id="category" className="rounded-3 border-0 text-white " onClick={() => handleSubmit()} value="submit" />)
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br></br>
            <div className="bg1 py-3 my-5 col-10 text-white rounded-3" >

                <table className="" >
                    <tbody>
                        <tr>
                            <td >Id</td>
                            <td>Category</td>
                            <td>Action</td>
                        </tr>
                        {
                            categoryData.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>
                                            <button onClick={() => deleteData(val.id)} id="category" className="rounded-3 border-0 text-white  me-4" style={{ width: "100px", height: "40px" }}>Delete</button>
                                            <button onClick={() => editData(val.id)} id="category" className="rounded-3 border-0 text-white me-4" style={{ width: "100px", height: "40px" }}>Edit</button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </center>
    )
}
export default AdminCategory;