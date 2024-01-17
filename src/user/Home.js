import axios from "axios"
import { useEffect, useState } from "react"
import Slider from "../component/Slider";
import { Link } from "react-router-dom";

const Home = () => {

    const [product, setProduct] = useState([]);
    const [electronics, setElectronics] = useState([]);
    const [grocery, setGrocery] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [fashion, setFashion] = useState([]);

    const getAllData = async () => {
        let electronicsData = await axios.get(`http://localhost:8000/products?category=Electronics&marketstatus=best&status=instock`)
        // let ans =  alldata.data.filter((item)=>{ 
        //     return item.category === "eletronics";  
        // })
        setElectronics(electronicsData.data.slice(0, 4));

        let grocerydata = await axios.get(`http://localhost:8000/products?category=Grocery&marketstatus=best&status=instock`)
        setGrocery(grocerydata.data.slice(0, 4));

        let mobilesdata = await axios.get(`http://localhost:8000/products?category=Mobiles&marketstatus=best&status=instock`)
        setMobiles(mobilesdata.data.slice(0, 4));

        let bikesdata = await axios.get(`http://localhost:8000/products?category=Bikes&marketstatus=best&status=instock`)
        setBikes(bikesdata.data.slice(0, 4));

        let fashiondata = await axios.get(`http://localhost:8000/products?category=Fashion&marketstatus=best&status=instock`)
        setFashion(fashiondata.data.slice(0, 4));
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/products`)
            .then((res) => {
                setProduct(res.data);
            }).catch((err) => {
                return false;
            })
        getAllData();
    }, [])


    return (
        <>
            <Slider />
            <div className="container-fluid px-4 pt-4" >
                <div style={{ backgroundColor: "white" }} className="p-5 rounded-3">
                    <h2 className="pb-4 border-2 border-bottom">Best of Electronics</h2>
                    <div className="row">
                        {
                            electronics.map((val) => {
                                return (
                                    <div className="col-md-3 py-3 d-flex justify-content-center" key={val.id}>
                                        <Link to={`/product_details/${val.id}`} style={{ textDecoration: "none" }}>
                                            <div className="card" style={{ width: '18rem' }}>
                                                <img style={{ height: '200px', objectFit: 'contain' }} src={val.image} className="card-img-top p-4" alt="..." />
                                                <div className="card-body">
                                                    <hr />
                                                    <h5 className="card-title">{val.name}</h5>
                                                    <h5 className="card-title">Price :- {val.price}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="container-fluid px-4 pt-4" >
                <div style={{ backgroundColor: "white" }} className="p-5 rounded-3">
                    <h2 className="pb-4 border-2 border-bottom">Best of Grocery</h2>
                    <div className="row">
                        {
                            grocery.map((val) => {
                                return (
                                    <div className="col-md-3 py-3 d-flex justify-content-center"key={val.id}>
                                        <Link to={`/product_details/${val.id}`} style={{ textDecoration: "none" }}>
                                            <div className="card" style={{ width: '18rem' }}>
                                                <img style={{ height: '200px', objectFit: 'contain' }} src={val.image} className="card-img-top p-4" alt="..." />
                                                <div className="card-body">
                                                    <hr />
                                                    <h5 className="card-title">{val.name}</h5>
                                                    <h5 className="card-title">Price :- {val.price}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="container-fluid px-4 pt-4" >
                <div style={{ backgroundColor: "white" }} className="p-5 rounded-3">
                    <h2 className="pb-4 border-2 border-bottom">Best of Mobiles</h2>
                    <div className="row">
                        {
                            mobiles.map((val) => {
                                return (
                                    <div className="col-md-3 py-3 d-flex justify-content-center"key={val.id}>
                                        <Link to={`/product_details/${val.id}`} style={{ textDecoration: "none" }}>
                                            <div className="card" style={{ width: '18rem' }}>
                                                <img style={{ height: '200px', objectFit: 'contain' }} src={val.image} className="card-img-top p-4" alt="..." />
                                                <div className="card-body">
                                                    <hr />
                                                    <h5 className="card-title">{val.name}</h5>
                                                    <h5 className="card-title">Price :- {val.price}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="container-fluid px-4 pt-4" >
                <div style={{ backgroundColor: "white" }} className="p-5 rounded-3">
                    <h2 className="pb-4 border-2 border-bottom">Best of Bikes</h2>
                    <div className="row">
                        {
                            bikes.map((val) => {
                                return (
                                    <div className="col-md-3 py-3 d-flex justify-content-center"key={val.id}>
                                        <Link to={`/product_details/${val.id}`} style={{ textDecoration: "none" }}>
                                            <div className="card" style={{ width: '18rem' }}>
                                                <img style={{ height: '200px', objectFit: 'contain' }} src={val.image} className="card-img-top p-4" alt="..." />
                                                <div className="card-body">
                                                    <hr/>
                                                    <h5 className="card-title">{val.name}</h5>
                                                    <h5 className="card-title">Price :- {val.price}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="container-fluid px-4 pt-4" >
                <div style={{ backgroundColor: "white" }} className="p-5 rounded-3">
                    <h2 className="pb-4 border-2 border-bottom">Best of Fashion</h2>
                    <div className="row">
                        {
                            fashion.map((val) => {
                                return (
                                    <div className="col-md-3 py-3 d-flex justify-content-center"key={val.id}>
                                        <Link to={`/product_details/${val.id}`} style={{ textDecoration: "none" }}>
                                            <div className="card" style={{ width: '18rem' }}>
                                                <img style={{ height: '200px', objectFit: 'contain' }} src={val.image} className="card-img-top p-4" alt="..." />
                                                <div className="card-body">
                                                    <hr />
                                                    <h5 className="card-title">{val.name}</h5>
                                                    <h5 className="card-title">Price :- {val.price}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home