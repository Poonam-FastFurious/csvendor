import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../config";

function Withdrwalrequest() {
  const [allwithdrwal, setAllwithdrwal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the access token from local storage
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(Baseurl + "/api/v1/Vendor/withdrawl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.data || "Failed to withdraw");
      }

      toast.success("Withdrawal request submitted successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          // Clear the form
          setAmount("");
          setShowModal(false);
          fetchcoupon(); // Refetch the tax list
        },
      });
    } catch (error) {
      console.log("Error fetching withdrawal request: " + error.message);
      toast.error(` ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchcoupon = async () => {
    const vendorId = localStorage.getItem("vendorId");

    try {
      setFetching(true);
      const response = await fetch(Baseurl + "/api/v1/Vendor/withdrawlall");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const vendorProducts = data.data.filter(
        (product) => product.vendorId === vendorId
      );
      setAllwithdrwal(vendorProducts);
    } catch (err) {
      console.log("Error fetching : ", "err.message");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchcoupon();
  }, []);

  const filteredCoupons = allwithdrwal.filter((coupon) =>
    coupon.amount.toString().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Withdrwal</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">CharanSparsh</Link>
                      </li>
                      <li className="breadcrumb-item active">Withdrwal</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="customerList">
                  <div className="card-header border-bottom-dashed">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm">
                        <div>
                          <h5 className="card-title mb-0">Withdrwal Report</h5>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex flex-wrap align-items-start gap-2 ">
                          <button
                            type="button"
                            className="btn btn-success add-btn"
                            id="create-btn"
                            onClick={() => setShowModal(true)}
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Withdrwal Req
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border-bottom-dashed border-bottom">
                    <form>
                      <div className="row g-3">
                        <div className="col-xl-3">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search by amount..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="table-responsive table-card mb-1">
                        <table
                          className="table align-middle"
                          id="customerTable"
                        >
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col" style={{ width: "50px" }}></th>
                              <th>Req Amount</th>
                              <th>Recived</th>
                              <th>Commision</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {filteredCoupons.length > 0 ? (
                              filteredCoupons.map((cou, index) => (
                                <tr key={index}>
                                  <th scope="row"></th>
                                  <td className="customer_name">
                                    {cou.amount}
                                  </td>
                                  <td className="customer_name">
                                    {cou.amount - cou.amount * 0.2}
                                  </td>
                                  <td className="customer_name">
                                20%
                                  </td>
                                  <td className="phone">{cou.status}</td>
                                </tr>
                              ))
                            ) : (
                              <tr></tr>
                            )}
                          </tbody>
                        </table>
                        {filteredCoupons.length === 0 && !fetching && (
                          <div className="noresult">
                            <div className="text-center">
                              <lord-icon
                                src="../../../msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "75px" }}
                              ></lord-icon>
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We've searched more than 150+ customers. We did
                                not find any customer for your search.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {showModal && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        aria-labelledby="exampleModalLabel"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header bg-light p-3">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Withdrwal Request
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                id="close-modal"
                                onClick={() => setShowModal(false)}
                              ></button>
                            </div>
                            <form
                              className="tablelist-form"
                              onSubmit={handleSubmit}
                            >
                              <div className="modal-body">
                                <div className="mb-3">
                                  <label
                                    htmlFor="customername-field"
                                    className="form-label"
                                  >
                                    Amount
                                  </label>
                                  <input
                                    type="number"
                                    id="customername-field"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                  />
                                  <div className="invalid-feedback"></div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => setShowModal(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="add-btn"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
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

export default Withdrwalrequest;
