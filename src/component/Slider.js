import axios from "axios";
import { useEffect, useState } from "react";

const Slider = () => {

    const [slider,setSlider] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/slider`)
        .then((res)=>{  
            setSlider(res.data);
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    },[])

    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {
                    slider.map((item) => {
                        return (
                            <div className="carousel-item active" key={item.id}>
                                <img style={{ objectPosition: "center" }} src={item.image} className="d-block w-100" alt="..." />
                            </div>
                        )
                    })
                }


            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )

}
export default Slider;