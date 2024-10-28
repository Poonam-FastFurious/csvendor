/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../config";

function Transaction() {
  const [transactions, setTransactions] = useState([]);

  // 10 items per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/payments/");
        const data = await response.json();
        if (data.success) {
          setTransactions(data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  // Filter transactions based on search criteria
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Transactions</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">CharanSparsh</Link>
                      </li>
                      <li className="breadcrumb-item active">Transactions</li>
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
                        <h5 className="card-title mb-0">Transactions</h5>
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
                              placeholder="Search by email..."
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
                          <th scope="col">Customer Email</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Transaction ID</th>
                          <th scope="col">Order Status</th>
                          <th scope="col">Payment Status</th>
                          <th scope="col">Payment date</th>
                          <th scope="col">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{transaction.user?.email}</td>
                            <td>{transaction.user?.fullName}</td>
                            <td>{transaction.paymentID}</td>
                            <td>Pending</td>
                            <td>
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </td>
                            <td>{transaction.status}</td>
                            <td>{transaction.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <nav className="my-4 mx-2">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                           
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from(
                          {
                            length: Math.ceil(
                              transactions.length / itemsPerPage
                            ),
                          },
                          (_, index) => (
                            <li
                              key={index}
                              className={`page-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                               
                              >
                                {index + 1}
                              </button>
                            </li>
                          )
                        )}
                        <li
                          className={`page-item ${
                            currentPage ===
                            Math.ceil(transactions.length / itemsPerPage)
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                          
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav> */}
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

export default Transaction;
