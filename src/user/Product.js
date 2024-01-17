import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
  let Price_Range = [
    {
      "price_name": "₹0 - ₹2000",
      "id": 1
    }, {
      "price_name": "₹2000 - ₹5000",
      "id": 2
    }, {
      "price_name": "₹10000 - ₹20000",
      "id": 3
    }, {
      "price_name": "₹20000 - ₹50000",
      "id": 4
    }, {
      "price_name": "₹100000 - ₹500000",
      "id": 5
    }
  ];
  let Marketstatus = [
    {
      "name": "trending",
      "id": 1
    }, {
      "name": "latest",
      "id": 2
    }, {
      "name": "upcomming",
      "id": 3
    }, {
      "name": "best",
      "id": 4
    }
  ]
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [category_price, setCategory_price] = useState([]);
  const [sortData, setSortData] = useState("");

  const allProduct = () => {
    axios.get(`http://localhost:8000/products?_page=1&_limit=6`)
      .then((res) => {
        setProduct(res.data);
      }).catch((err) => {
        return false;
      });
  }

  const allCategory = () => {
    axios.get(`http://localhost:8000/category`)
      .then((res) => {
        setCategory(res.data);
      }).catch((err) => {
        return false;
      })
  }


  const categoryData = (category) => {
    if (category === "All") {
      allProduct();
    } else {
      axios.get(`http://localhost:8000/products?category=${category}`)
        .then((res) => {
          setProduct(res.data);
        }).catch((err) => {
          return false;
        })
    }
  }

  const CategoryPriceData = async (price) => {
    let record = await axios.get(`http://localhost:8000/products?price_gte=${price[0]}&price_lte=${price[1]}`)
    setProduct(record.data);
  }

  const MarketstatusData = (marketstatus) => {
    axios.get(`http://localhost:8000/products?marketstatus=${marketstatus}`)
      .then((res) => {
        setProduct(res.data);
      }).catch((err) => {
        return false;
      })
  }

  const handleSort = async (Sort) => {
    setSortData(Sort);
    if ("Low to High" === Sort) {
      let sort = await axios.get(`http://localhost:8000/products?_sort=price`);
      setProduct(sort.data)
    } else if ("High to Low" === Sort) {
      let sort = await axios.get(`http://localhost:8000/products?_sort=price&_order=desc`);
      setProduct(sort.data)
    } else if ("Reset" === Sort) {
      let sort = await axios.get(`http://localhost:8000/products`);
      setProduct(sort.data)
    }
  }

  const onpagination = async (ans) => {
    if (ans === "F") {
      let pagination = await axios.get(`http://localhost:8000/products?_page=1&_limit=6`);
      setProduct(pagination.data)
    } else if (ans === "M") {
      let pagination = await axios.get(`http://localhost:8000/products?_page=2&_limit=6`);
      setProduct(pagination.data)
    }
    else if (ans === "L") {
      let pagination = await axios.get(`http://localhost:8000/products?_page=3&_limit=6`);
      setProduct(pagination.data)
    }
  }

  const SearchData = async(e) => {
    let data = await axios.get(`http://localhost:8000/products?q=${e}`);
    setProduct(data.data)
  }

  useEffect(() => {
    allProduct();
    allCategory();
    setCategory_price(Price_Range);
  }, [])

  return (
    <>
      <div className='container py-5'>
        <div className='row'>
          <div className=' col-3 p-4 rounded-3' style={{ backgroundColor: "white" }} >
            <div className='border p-3 rounded-3'>
              <h5>Category</h5><hr />
              {
                category.map((val) => {
                  return (
                    <div className='d-flex py-2' key={val.name}>
                      <input type="radio" name='category' style={{ width: "20px", outline: "none", borderRadius: "0px" }} onClick={() => categoryData(val.name)} ></input>
                      <p className='my-0 ps-2 fs-5' style={{ display: "inline" }} onClick={() => categoryData(val.name)} >{val.name}</p>
                    </div>
                  )
                })
              }
              <div className='d-flex py-2'>
                <input type="radio" name='category' style={{ width: "20px", outline: "none" }} onClick={() => categoryData("All")} ></input>
                <p className='my-0 ps-2 fs-5' style={{ display: "inline" }} onClick={() => categoryData("All")} >All</p>
              </div>
            </div>
            <div className='border p-3 mt-4 rounded-3'>
              <h5>Price Range</h5><hr />
              {
                category_price.map((val) => {
                  return (
                    <div className='d-flex py-2' key={val.price_name}>
                      <input type="radio" name='category' style={{ width: "20px", outline: "none", borderRadius: "0px" }} onClick={() => CategoryPriceData(val.price_name.split(" - ").map(price => price.replace("₹", "")))} ></input>
                      <p name='category' className='my-0 ps-2 fs-5' style={{ display: "inline" }} onClick={() => CategoryPriceData(val.price_name.split(" - ").map(price => price.replace("₹", "")))} >{val.price_name}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className='border p-3 mt-4 rounded-3'>
              <h5>Marketstatus</h5><hr />
              {
                Marketstatus.map((val) => {
                  return (
                    <div className='d-flex py-2' key={val.name}>
                      <input type="radio" name='marketstatus' style={{ width: "20px", outline: "none", borderRadius: "0px" }} onClick={() => MarketstatusData(val.name)} ></input>
                      <p name='marketstatus' className='my-0 ps-2 fs-5' style={{ display: "inline" }} onClick={() => MarketstatusData(val.name)} >{val.name}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className=' col-9 px-1' >
            <div className='row justify-content-between'>
              <div className="accordion accordion-flush ms-3 mb-4 rounded-pill col-3 d-inline" style={{ width: "300px" }} id="accordionFlushExample">
                <div className="accordion-item rounded-pill " style={{ width: "300px" }} >
                  <h2 className="accordion-header position-relative rounded-pill" id="flush-headingOne">
                    <button className="accordion-button collapsed rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      Sort by :- {sortData}
                    </button>
                  </h2>
                  <div id="flush-collapseOne" style={{ zIndex: "111", backgroundColor: "white" }} className="accordion-collapse collapse position-absolute mt-2 rounded-3  p-3" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className='p-3 border rounded-3'>
                      <div className="accordion-body p-2" onClick={() => handleSort("Low to High")}>Price: Low to High </div>
                      <div className="accordion-body p-2" onClick={() => handleSort("High to Low")}>Price: High to low</div>
                      <div className="accordion-body p-2" onClick={() => handleSort("Reset")}>Price: Reset</div>
                    </div>
                  </div>
                </div>
              </div>
              <input type='text' onChange={(e) => SearchData(e.target.value)} className='rounded-pill bg-white d-inline border-0' id='Search' style={{ width: "300px" ,height:"53px" }} placeholder='Search...'/>
            </div>
            <div style={{ backgroundColor: "white" }} className='row py-4 px-2 ms-3 rounded-3'>
              {
                product.map((val, i) => {
                  return (
                    <div className="col-4 pb-4 px-3" key={val.name}>
                      <Link to={`/product_details/${val.id}`} style={{ textDecoration: "none" }}>
                        <div className="card ">
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
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {/* <li className="page-item"><a className="page-link" onClick={() => onpagination()}>Previous</a></li> */}
                  <li className="page-item"><a className="page-link" onClick={() => onpagination("F")}>1</a></li>
                  <li className="page-item"><a className="page-link" onClick={() => onpagination("M")}>2</a></li>
                  <li className="page-item"><a className="page-link" onClick={() => onpagination("L")}>3</a></li>
                  {/* <li className="page-item"><a className="page-link" onClick={() => onpagination()}>Next</a></li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product