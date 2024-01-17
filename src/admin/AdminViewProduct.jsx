import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AdminViewProduct = () => {
  const navigate = useNavigate()

  const [product, setProduct] = useState([]);
  const [marketstatus, setMarketStatus] = useState(["trending", "latest", "upcomming", "best"]);
  const [status, setStatus] = useState(["outstock", "instock"])

  const AllProduct = () => {
    axios.get(`http://localhost:8000/products`)
      .then((res) => {
        setProduct(res.data)
      }).catch((err) => {
        return false;
      });
  }

  const changeMarketStatus = (id, value) => {
    axios.patch(`http://localhost:8000/products/${id}`, {
      marketstatus: value
    }).then((res) => {
      toast.success(' Status successfully update!')
      AllProduct();
    }).catch((err) => {
      return false;
    });
  }

  const changeStatus = (id, value) => {
    axios.patch(`http://localhost:8000/products/${id}`, {
      status: value
    }).then((res) => {
      toast.success(' Status successfully update!')
      AllProduct();
    }).catch((err) => {
      return false;
    });
  }
  const ondelete = (id) => {
    axios.delete(`http://localhost:8000/products/${id}`)
      .then((res) => {
        toast.success(' Status successfully Delete!')
        AllProduct();
      }).catch((err) => {
        return false;
      });
  }

  useEffect(() => {
    let admin = JSON.parse(localStorage.getItem('checkAdminLogin'));
    if (!admin) {
      navigate('/admin');
    }
    AllProduct();
  }, [])
  return (
    <div className=" col-12 pt-2 text-white">
      <div className="mt-3 p-5 ">
        <h3 className="text-center">View Product</h3>
        <table className="m-0  " >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Market Status</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              product.map((val) => {
                return (
                  <tr >
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.price}</td>
                    <td>
                      <select onChange={(e) => changeMarketStatus(val.id, e.target.value)} className='form-control'>
                        <option value="">select market status</option>
                        {
                          marketstatus.map((item) => {
                            return (val.marketstatus === item ?
                              <option value={val.marketstatus} selected>{val.marketstatus}</option> :
                              <option>{item}</option>)
                          })
                        }
                      </select>
                    </td>
                    <td>
                      <select onChange={(e) => changeStatus(val.id, e.target.value)} className='form-control'>
                        <option>---select status</option>
                        {
                          status.map((item) => {
                            return (val.status === item ?
                              <option value={val.status} selected>{val.status}</option> :
                              <option>{item}</option>)
                          })
                        }
                      </select>
                    </td>
                    <td>
                      <NavLink to={`/admin/product/${val.id}`}>
                      <button style={{ borderColor: "#aaaaaa85", borderStyle: "solid", width: "40px", height: "40px" }} className='rounded-3 '><i class="bi bi-pencil-square"></i></button>
                      </NavLink>
                        <button onClick={() => ondelete(val.id)} style={{ borderColor: "#aaaaaa85", borderStyle: "solid", width: "40px", height: "40px" }} className='rounded-3 ms-3'><i class="bi bi-trash3"></i></button>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>

          <ToastContainer />
        </table>


      </div>

      <button className="btn btn-primary w-25 mt-5">
        <NavLink to={`/admin/product`} className="text-white">Add Product</NavLink>

      </button>
    </div>
  )
}

export default AdminViewProduct