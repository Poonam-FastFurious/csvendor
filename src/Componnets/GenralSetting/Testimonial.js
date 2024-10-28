import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../config";

import Swal from "sweetalert2";

function Testimonial() {
  const [modalVisible, setModalVisible] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  // Function to handle showing the modal
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          Baseurl + "/api/v1/testimonial/alltestimonial"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTestimonials(data.data); // Assuming response.data is an array of testimonials
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Handle error (show error message, retry logic, etc.)
      }
    };

    fetchTestimonials();
  }, []);
  console.log(testimonials);
  const handleAddClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rating", rating);
    formData.append("email", email);
    formData.append("photoUrl", photoUrl);
    formData.append("message", message);

    setLoading(true); // Start loader

    try {
      const response = await fetch(Baseurl + "/api/v1/testimonial/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Testimonial added successfully", {
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
            setName("");
            setRating("");
            setEmail("");
            setPhotoUrl("");
            setMessage("");

            handleCloseModal();
          },
        });
      } else {
        throw new Error("Testimonial creation failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Testimonial creation failed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };
  const deleteTestimonial = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this testimonial!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(Baseurl + "/api/v1/testimonial/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }), // Pass the id of the testimonial to delete in the request body
        });

        if (!response.ok) {
          throw new Error("Failed to delete testimonial");
        }

        // After successful deletion, fetch testimonials again to update the list

        // Show success message
        Swal.fire("Deleted!", "Your testimonial has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      Swal.fire("Error", "Failed to delete testimonial.", "error");
    }
  };
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Testimonial</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">CharanSparsh</Link>
                      </li>
                      <li className="breadcrumb-item active">Testimonial</li>
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
                        <h5 className="card-title mb-0">Testimonial</h5>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex gap-1 flex-wrap">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleAddClick}
                          >
                            <i className="ri-file-download-line align-bottom me-1"></i>
                            Add Testimonial
                          </button>
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

                  <div
                    className="mt-2"
                    style={{ marginTop: "25px", backgroundColor: "white" }}
                  >
                    <table className="table table-striped align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Customer Email</th>
                          <th scope="col"> Name</th>
                          <th scope="col"> Message</th>
                          <th scope="col">Rating</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonials.map((test, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{test.email}</td>
                            <td>{test.name}</td>
                            <td> {test.message}</td>
                            <td>{test.rating}</td>

                            <td>
                              <div className="hstack gap-3 flex-wrap">
                                <Link
                                  className="link-danger fs-15"
                                  onClick={() => deleteTestimonial(test._id)}
                                >
                                  <i className="ri-delete-bin-line"></i>
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
            {modalVisible && (
              <div
                className="modal fade show"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header bg-light p-3">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add Testimonial
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseModal}
                      ></button>
                    </div>
                    <form className="tablelist-form" onSubmit={handleSubmit}>
                      <div className="modal-body">
                        <input type="hidden" id="id-field" />
                        <div className="mb-3">
                          <label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            name
                          </label>
                          <input
                            type="text"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter Title"
                            required=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            Please enter a coupon name.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email-field" className="form-label">
                            rating
                          </label>
                          <input
                            type="number"
                            id="email-field"
                            className="form-control"
                            placeholder="Enter code"
                            required=""
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            Please enter a tax.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email-field" className="form-label">
                            email
                          </label>
                          <input
                            type="email"
                            id="email-field"
                            className="form-control"
                            placeholder="Enter email"
                            required=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            Please enter a email.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email-field" className="form-label">
                            photoUrl
                          </label>
                          <input
                            type="file"
                            id="email-field"
                            className="form-control"
                            placeholder="Enter Discount"
                            required=""
                            onChange={handlePhotoUrlChange}
                          />
                          <div className="invalid-feedback">
                            Please enter a photoUrl.
                          </div>
                        </div>
                        <div>
                          <label htmlFor="status-field" className="form-label">
                            message
                          </label>
                          <textarea
                            className="form-control"
                            name="status-field"
                            id="status-field"
                            required=""
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                          >
                            {loading && (
                              <span className="spinner-border spinner-border-sm me-1"></span>
                            )}
                            {loading ? "Loading..." : "Submit"}
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
    </>
  );
}

export default Testimonial;
