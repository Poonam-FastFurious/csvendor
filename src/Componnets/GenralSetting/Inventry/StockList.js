/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../config";

function StockList() {
  const [products, setProducts] = useState([]);

  const [searchEmail, setSearchEmail] = useState("");
  const [searchDate, setSearchDate] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/Product/products");
        const data = await response.json();
        if (data.success) {
          const vendorId = localStorage.getItem("vendorId");
       

          // Filter products based on vendorId
          const vendorProducts = data.data.filter(
            (product) => product.vendor.id === vendorId
          );
          setProducts(vendorProducts);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchProduct();
  }, []);
  // Filter transactions based on search criteria

  // Change page

  // Handle search input changes
  const handleEmailChange = (event) => {
    setSearchEmail(event.target.value);
  };

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
  };
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Stock Inventory List</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">Charansparsh</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        Stock Inventory List
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="orderList">
                  <div className="card-header border-0">
                    <div className="row align-items-center gy-3">
                      <div className="col-sm">
                        <h5 className="card-title mb-0">
                          Stock Inventory List
                        </h5>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex gap-1 flex-wrap">
                          <button
                            className="btn btn-soft-danger"
                            id="remove-actions"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border border-dashed border-end-0 border-start-0">
                    <form>
                      <div className="row g-3">
                        <div className="col-xxl-5 col-sm-6">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search by productname "
                              value={searchEmail}
                              onChange={handleEmailChange}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xxl-2 col-sm-6">
                          <div>
                            <input
                              type="date"
                              data-provider="flatpickr"
                              data-date-format="d M, Y"
                              data-multiple-date="true"
                              className="form-control"
                              data-range-date="true"
                              id="demo-datepicker"
                              placeholder="Select date"
                              value={searchDate}
                              onChange={handleDateChange}
                            />
                          </div>
                        </div>

                        <div className="col-xxl-1 col-sm-4">
                          <div>
                            <button
                              type="button"
                              className="btn btn-success w-100"
                            >
                              <i className="ri-equalizer-fill me-1 align-bottom"></i>
                              Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className="mt-2"
                    style={{ marginTop: "25px", backgroundColor: "white" }}
                  >
                    <table className="table  table-striped align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Products</th>
                          <th scope="col">Category</th>
                          <th scope="col">Date Added</th>
                          <th scope="col">Stock In</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody class="list form-check-all">
                        {products.map((pro, index) => (
                          <tr key={index}>
                            <td class="email">
                              <img
                                className="avatar-xs rounded-circle"
                                src={pro.image}
                                alt=""
                              ></img>
                            </td>
                            <td class="phone">{pro._id}</td>
                            <td class="phone">{pro.categories}</td>
                            <td class="date">{pro.createdAt}</td>
                            <td class="date">{pro.stocks}</td>
                            <td className="status">
                              {pro.stocks > 0 ? (
                                <span className="badge bg-success-subtle text-success text-uppercase">
                                  In Stock
                                </span>
                              ) : (
                                <span className="badge bg-danger-subtle text-danger text-uppercase">
                                  Out of Stock
                                </span>
                              )}
                            </td>
                            <td>
                              <div className="hstack gap-3 flex-wrap">
                                <Link
                                  to={`/editProduct/${pro._id}`}
                                  className="link-success fs-15"
                                >
                                  <i className="ri-edit-2-line"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockList;
