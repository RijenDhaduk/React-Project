import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSlider = () => {
    const navigate = useNavigate()

    const [silder, setSilder] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const [isedit, setIsEdit] = useState("");

    const handleSubmit = () => {
        if (isedit) {
            axios.put(`http://localhost:8000/slider/${isedit}`, {
                image: silder
            })
                .then((res) => {
                    toast.success("slider successfully Update");
                    setSilder("");
                    setIsEdit("");
                    getUser();
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        } else {
            axios.post(`http://localhost:8000/slider`, {
                image: silder
            }).then((res) => {
                toast.success("slider successfully add");
                setSilder("");
                getUser();
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }
    }
    const getUser = () => {
        axios.get(`http://localhost:8000/slider`)
            .then((res) => {
                setCategoryData(res.data);
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const deleteData = (id) => {
        axios.delete(`http://localhost:8000/slider/${id}`)
            .then((res) => {
                toast.success("slider successfully delete");
                setSilder("");
                getUser();
            }).catch((err) => {
                console.log(err);
                return false;
            })
    }
    const editData = (id) => {
        axios.get(`http://localhost:8000/slider/${id}`)
            .then((res) => {
                setSilder(res.data.image);
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
            <h2 className="text-white py-5">Admin Slider page</h2>
            <div className="bg1 col-6 py-5 rounded-3">
                <table className="text-white " >
                    <tbody className="" >
                        <tr>
                            <td className="w-25">Category :-</td>
                            <td><input type="text" onChange={(e) => setSilder(e.target.value)} value={silder} name="image" id="category" className="rounded-3 border-0 text-white  w-75" placeholder="Enter silder url" /></td>
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
                                        <td>{val.image}</td>
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

export default AdminSlider