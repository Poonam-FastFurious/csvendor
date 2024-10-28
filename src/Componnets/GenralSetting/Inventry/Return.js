import React from "react";
import { Link } from "react-router-dom";

function Return() {
  return (
    <div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Returns Items</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">Charansparsh</Link>
                      </li>
                      <li className="breadcrumb-item active">Returns Items</li>
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
                        <h5 className="card-title mb-0">Returns Items</h5>
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
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="listjs-table" id="customerList">
                            <div class="row g-4 mb-3">
                              <div class="col-sm">
                                <div class="d-flex justify-content-sm-end"></div>
                              </div>
                            </div>

                            <div class="table-responsive table-card mt-3 mb-1">
                              <table
                                class="table align-middle table-nowrap"
                                id="customerTable"
                              >
                                <thead class="table-light">
                                  <tr>
                                    <th class="sort" data-sort="customer_name">
                                      Id
                                    </th>
                                    <th class="sort" data-sort="email">
                                      Customer
                                    </th>{" "}
                                    <th class="sort" data-sort="email">
                                      Items
                                    </th>
                                    <th class="sort" data-sort="phone">
                                      Return Date
                                    </th>
                                    <th class="sort" data-sort="date">
                                      Total
                                    </th>
                                    <th class="sort" data-sort="action">
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="list form-check-all">
                                  <tr>
                                    <td class="id">
                                      <a
                                        href="#kl"
                                        class="fw-medium link-primary"
                                      >
                                        #VZ2101
                                      </a>
                                    </td>
                                    <td class="customer_name">Rahul </td>
                                    <td class="email">Painting</td>
                                    <td class="date">06 Apr, 2021</td>
                                    <td class="phone">Rs 5656</td>

                                    <td>
                                      <div class="d-flex gap-2">
                                        <div class="edit">
                                          <button class="btn btn-sm btn-success edit-item-btn">
                                            Edit
                                          </button>
                                        </div>
                                        <div class="remove">
                                          <button class="btn btn-sm btn-danger remove-item-btn">
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div class="noresult" style={{ display: "none" }}>
                                <div class="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 class="mt-2">Sorry! No Result Found</h5>
                                  <p class="text-muted mb-0">
                                    We've searched more than 150+ Orders We did
                                    not find any orders for you search.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="d-flex justify-content-end">
                              <div class="pagination-wrap hstack gap-2">
                                <a
                                  class="page-item pagination-prev disabled"
                                  href="#;"
                                >
                                  Previous
                                </a>
                                <ul class="pagination listjs-pagination mb-0"></ul>
                                <a
                                  class="page-item pagination-next"
                                  href="#e23ui"
                                >
                                  Next
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Return;
