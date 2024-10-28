import React, { useEffect, useRef } from "react";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import ReusableTable from "../Molicule/Table";
import Noresult from "../Molicule/Noresult";
function Productreports() {
  const datepickerRef = useRef(null);

  useEffect(() => {
    // Initialize flatpickr with date range configuration
    Flatpickr(datepickerRef.current, {
      mode: "range",
      dateFormat: "d M, Y",
      onChange: (selectedDates) => {
        console.log(selectedDates); // Handle date changes
      },
    });
  }, []);
  const tableHeaders = [
    {
      content: (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkAll"
            value="option"
          />
        </div>
      ),
      style: { width: "25px" },
    },
    { content: "Date", className: "sort", dataSort: "date" },
    { content: "Name", className: "sort", dataSort: "name" },
    { content: "Store", className: "sort", dataSort: "warehouse" },
    { content: "Purchased Qty", className: "sort", dataSort: "purchased_qty" },
    {
      content: "Purchased Amount",
      className: "sort",
      dataSort: "purchased_amount",
    },
    { content: "Sold Qty", className: "sort", dataSort: "sold_qty" },
    { content: "Sold Amount", className: "sort", dataSort: "sold_amount" },
    { content: "Pr. Qty", className: "sort", dataSort: "pr_qty" },
    { content: "Pr. Amount", className: "sort", dataSort: "pr_amount" },
    { content: "Sr. Qty", className: "sort", dataSort: "sr_qty" },
    { content: "Sr. Amount", className: "sort", dataSort: "sr_amount" },
  ];

  const tableRows = [
    [
      {
        content: (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="checkAll"
              value="option1"
            />
          </div>
        ),
      },
      { content: "01 Jan 2024", className: "date" },
      { content: "China Apple", className: "name" },
      { content: "Store  1", className: "warehouse" },
      { content: "690", className: "purchased_qty" },
      { content: "$3641", className: "purchased_amount" },
      { content: "450", className: "sold_qty" },
      { content: "$6582", className: "sold_amount" },
      { content: "100", className: "pr_qty" },
      { content: "$1524", className: "pr_amount" },
      { content: "150", className: "sr_qty" },
      { content: "$2200", className: "sr_amount" },
    ],
    // Add more rows here as needed
  ];

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card" id="orderList">
                  <div class="card-header border-0">
                    <div class="row align-items-center gy-3">
                      <div class="col-sm">
                        <h5 class="card-title mb-0">Purchase Report</h5>
                      </div>
                      <div class="col-sm-auto">
                        <div class="d-flex gap-1 flex-wrap">
                          <button type="button" class="btn btn-info">
                            <i class="ri-file-download-line align-bottom me-1"></i>
                            Genrate report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body border border-dashed border-end-0 border-start-0">
                    <form>
                      <div class="row g-3">
                        <div class="col-xxl-5 col-sm-6">
                          <div class="search-box">
                            <input
                              type="text"
                              class="form-control search"
                              placeholder="Search for order ID, customer, order status or something..."
                            />
                            <i class="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div class="col-xxl-2 col-sm-6">
                          <div>
                            <input
                              type="text"
                              ref={datepickerRef}
                              className="form-control"
                              placeholder="Select date"
                            />
                          </div>
                        </div>

                        <div class="col-xxl-2 col-sm-4">
                          <div>
                            <select
                              class="form-control"
                              data-choices=""
                              data-choices-search-false=""
                              name="choices-single-default"
                              id="idStatus"
                            >
                              <option value="">Select Store </option>
                              <option value="all" selected="">
                                Store 1
                              </option>
                              <option value="Pending">Store 2</option>
                              <option value="Inprogress">Store 3</option>
                              <option value="Cancelled">Store 4</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-xxl-1 col-sm-4">
                          <div>
                            <button
                              type="button"
                              class="btn btn-success w-100"
                              onclick="SearchData();"
                            >
                              <i class="ri-equalizer-fill me-1 align-bottom"></i>
                              Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="card-body pt-0">
                    <div>
                      <ul
                        class="nav nav-tabs nav-tabs-custom nav-success mb-3"
                        role="tablist"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link active All py-3"
                            data-bs-toggle="tab"
                            id="All"
                            href="#home1"
                            role="tab"
                            aria-selected="true"
                          >
                            <i class="ri-store-2-fill me-1 align-bottom"></i>
                            All
                          </a>
                        </li>
                      </ul>

                      <div class="table-responsive table-card mb-1">
                        <ReusableTable
                          headers={tableHeaders}
                          rows={tableRows}
                        />
                        <Noresult />
                      </div>
                      <div class="d-flex justify-content-end">
                        <div class="pagination-wrap hstack gap-2">
                          <a
                            class="page-item pagination-prev disabled"
                            href="#df"
                          >
                            Previous
                          </a>
                          <ul class="pagination listjs-pagination mb-0"></ul>
                          <a class="page-item pagination-next" href="#d">
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
    </>
  );
}

export default Productreports;
