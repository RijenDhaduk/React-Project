import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import checkUserLogin from './Userauth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {

    const navigate = useNavigate();

    const { productId } = useParams();
    const [product, setProduct] = useState({});

    const getSingleProduct = async () => {
        let single = await axios.get(`http://localhost:8000/products/${productId}`);
        setProduct(single.data);
    }

    const AddToCart = (productID) => {
        if (!checkUserLogin()) {
            alert("Please Login");
            navigate('/login');
        } else (
            // axios.get(`http://localhost:8000/carts/${productId}`)
            //     .then((res) => {
            //         if(!res) {
            //             alert('product already add in cart')
            //             navigate('/product');
            //             return false
            //         } else {
                        axios.get(`http://localhost:8000/products/${productId}`)
                            .then((res) => {
                                axios.post(`http://localhost:8000/carts`, {
                                    name: res.data.name,
                                    price: res.data.price,
                                    qty: res.data.qty,
                                    image: res.data.image,
                                    category: res.data.category,
                                    userId: checkUserLogin().id,
                                    data : new Date()
                                }).then((res) => {
                                    toast.success("Product successfully add");
                                }).catch((err) => {
                                    console.log(err);
                                    return false;
                                })
                                navigate('/cart');
                            }).catch((err) => {
                                return false;
                            })
                    // }

                // }).catch((err) => {
                //     return false
                // })


        )
    }

    useEffect(() => {
        getSingleProduct();
    }, [])

    return (
        <>
            <div className='p-5 '>
                <div className='container-fluid bg-white rounded-4' >
                    <h1 className='pt-3 text-center text-decoration-underline'>Product Details</h1>
                    <div className='row p-5'>
                        <div className='col-12 p-4' >
                            <div className='row justify-content-center'>
                                <div className="col-5 d-flex justify-content-center">
                                    <img src={product.image} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-7 ps-5">
                                    <div className="card-body ">
                                        <h5 className="card-title pb-3">Name :-<p className='d-inline'>{product.name}</p> </h5>
                                        <h5 className="card-title pb-3">Price :- <p className='d-inline'>{product.price}</p> </h5>
                                        <h5 className="card-title pb-3">Category :- <p className='d-inline'>{product.category}</p> </h5>
                                        <h5 className="card-title pb-3">qty :- <p className='d-inline'>{product.qty}</p> </h5>
                                        <h6 className="card-text pb-4">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</h6>
                                        <button onClick={() => AddToCart(product.id)} className='btn btn-success w-50'>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ProductDetails