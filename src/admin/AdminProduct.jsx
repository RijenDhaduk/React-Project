import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProduct = () => {

    const { id } = useParams()

    const [category, setCategory] = useState([]);
    const navigate = useNavigate()
    const [categoryname, setCategoryName] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [marketstatus, setMarketStatus] = useState("");
    const [status, setStatus] = useState("");
    const [isedit, setIsEdit] = useState("");

    const handleSubmit = () => {
        if (isedit) {
            axios.put(`http://localhost:8000/products/${isedit}`, {
                name: name,
                price: price,
                qty: qty,
                description: description,
                image: image,
                category: categoryname,
                marketstatus: marketstatus,
                status: status
            })
                .then((res) => {
                    toast.success("Category successfully Update");
                    setCategoryName("");
                    setName("");
                    setPrice("");
                    setQty("");
                    setDescription("");
                    setImage("");
                    setMarketStatus("");
                    setStatus("");
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        } else {
            axios.post(`http://localhost:8000/products`, {
                name: name,
                price: price,
                qty: qty,
                description: description,
                image: image,
                category: categoryname,
                marketstatus: marketstatus,
                status: status
            })
                .then((res) => {
                    toast.success("Product successfully Add");
                    setCategoryName("");
                    setName("");
                    setPrice("");
                    setQty("");
                    setDescription("");
                    setImage("");
                    setMarketStatus("");
                    setStatus("");
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
        }
    }

    const editData = () => {
        axios.get(`http://localhost:8000/products/${id}`)
            .then((res) => {
                setCategoryName(res.data.category);
                setName(res.data.name);
                setPrice(res.data.price);
                setQty(res.data.qty);
                setDescription(res.data.description);
                setImage(res.data.image);
                setMarketStatus(res.data.marketstatus);
                setStatus(res.data.status);
                setIsEdit(id);
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
        axios.get(`http://localhost:8000/category`)
            .then((res) => {
                setCategory(res.data)
            }).catch((err) => {
                return false;
            });
        editData();
    }, [])

    return (
        <div className="text-white d-flex justify-content-center">
            <div className="pt-2 col-12">
                <div className="mt-3 p-5 ">
                    <h1 className="text-center pb-4">Add Product</h1>
                    <div className="bg1 rounded-3 p-5">

                        <form >
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
                                        <select name="category" value={categoryname} onChange={(e) => setCategoryName(e.target.value)} style={{ height: "50px" }} id="category" className="form-control rounded-3 border-0 text-white  ">
                                            <option >--- Select Category ---</option>
                                            {
                                                category.map((item) => {
                                                    return (
                                                        <option value={item.name} style={{ height: "50px" }} className="P-5 ">{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ height: "50px" }} className="form-control rounded-3 border-0 text-white  " id="category" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Product Price</label>
                                        <input type="number" name="price"value={price} onChange={(e) => setPrice(e.target.value)} style={{ height: "50px" }} className="form-control rounded-3 border-0 text-white  " id="category" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Product Qty</label>
                                        <input type="number" name="qty" value={qty} onChange={(e) => setQty(e.target.value)} style={{ height: "50px" }} className="form-control rounded-3 border-0 text-white  " id="category" />
                                    </div>

                                    {
                                        isedit ? (
                                            <div className="md-3 d-flex justify-content-end pt-4">
                                                <button type="button" onClick={() => handleSubmit()} id="category" className="rounded-3 border-0 text-white" style={{ width: "250px", height: "40px" }} >Edit</button>
                                            </div>
                                        ) :
                                            (
                                                <div className="md-3 d-flex justify-content-end pt-4">
                                                    <button type="button" onClick={() => handleSubmit()} id="category" className="rounded-3 border-0 text-white" style={{ width: "250px", height: "40px" }} >Submit</button>
                                                </div>
                                            )
                                    }

                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Product Image Url</label>
                                        <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} style={{ height: "50px" }} className="form-control rounded-3 border-0 text-white  " id="category" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Product Description</label>
                                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ height: "50px" }} className="form-control rounded-3 border-0 text-white  " id="category" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Product Market Status</label>
                                        <select name="marketstatus" value={marketstatus} onChange={(e) => setMarketStatus(e.target.value)} style={{ height: "50px" }} className="form-control rounded-3 border-0 text-white  " id="category">
                                            <option value="">--- Select Market Status ---</option>
                                            <option value="trending">Trending</option>
                                            <option value="latest">Latest</option>
                                            <option value="upcomming">Upcomming</option>
                                            <option value="best">Best</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Status</label>
                                        <select onChange={(e) => setStatus(e.target.value)} value={status} style={{ height: "50px" }} className="form-control rounded-3 border-0 text-white  " id="category">
                                            <option value="">--- Select Status ---</option>
                                            <option value="instock">Instock</option>
                                            <option value="outstock">Outstock</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 pt-4">
                                        <NavLink to={`/admin/viewproduct`} className="text-white" style={{ textDecoration: "none" }}>
                                            <button id="category" className="rounded-3 border-0 text-white  me-4" style={{ width: "250px", height: "40px" }}>View Product</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}
export default AdminProduct;