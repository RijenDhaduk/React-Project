import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {

  const navigate = useNavigate()


  const [usercnt, setUserCnt] = useState(0);
  const [categorycnt, setCategory] = useState(0);
  const [productcnt, setProduct] = useState(0);
  const [slidercnt, setSlider] = useState(0);


  useEffect(() => {
    let admin = JSON.parse(localStorage.getItem('checkAdminLogin'));
    if (!admin) {
      navigate('/admin');
    }

    axios.get(`http://localhost:8000/users`).then((res) => {
      setUserCnt(res.data.length)
    }).catch((err) => {
      console.log(err);
      return false
    })

    axios.get(`http://localhost:8000/category`).then((res) => {
      setCategory(res.data.length)
    }).catch((err) => {
      console.log(err);
      return false
    })

    axios.get(`http://localhost:8000/products`).then((res) => {
      setProduct(res.data.length)
    }).catch((err) => {
      console.log(err);
      return false
    })
    axios.get(`http://localhost:8000/slider`).then((res) => {
      setSlider(res.data.length)
    }).catch((err) => {
      console.log(err);
      return false
    })
  }, [])

  return (
    <>
      <div className='vh-100'>

        <div className='d-flex'>
          <div className="box bg1 m-5 rounded-3 text-white-50 text-center fs-3 p-3">
            <a className="d-block text-white-50 text-decoration-none d-block"><i className="fa-solid fa-user pe-3 " />User</a>
            <span className="fs-5" id="user">{usercnt}</span>
          </div>
          <div className="box bg1 m-5 rounded-3 text-white-50 text-center fs-3 p-3">
            <a className="d-block text-white-50 text-decoration-none d-block"><i class="bi bi-card-checklist pe-3"></i>Category</a>
            <span className="fs-5" id="user">{categorycnt}</span>
          </div>
          <div className="box bg1 m-5 rounded-3 text-white-50 text-center fs-3 p-3">
            <a className="d-block text-white-50 text-decoration-none d-block"><i class="bi bi-cart pe-3"></i>Products</a>
            <span className="fs-5" id="user">{productcnt}</span>
          </div>
          <div className="box bg1 m-5 rounded-3 text-white-50 text-center fs-3 p-3">
            <a className="d-block text-white-50 text-decoration-none d-block"><i class="bi bi-sliders pe-3"></i>Slider</a>
            <span className="fs-5" id="user">{slidercnt}</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminDashboard