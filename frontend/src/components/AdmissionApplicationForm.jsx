import { useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/admissions";

const initialForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  applyingForClass: "",
  previousSchool: "",

  fatherName: "",
  motherName: "",
  guardianName: "",
  parentMobile: "",
  alternateMobile: "",
  parentEmail: "",

  addressLine1: "",
  addressLine2: "",
  village: "",
  mandal: "",
  district: "",
  state: "",
  country: "India",
  pincode: "",

  busRequired: false,
  remarks: ""
};

function AdmissionApplicationForm({ onClose }) {

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(null);

    try {

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to submit admission application."
        );
      }

      setSuccess(data);

      setForm(initialForm);

    } catch (err) {

      setError(
        err.message ||
        "Unable to submit admission application."
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div
      className="modal d-block admission-modal-overlay"
      style={{
        background: "rgba(0,0,0,0.65)",
        zIndex: 1050
      }}
    >

      <div className="modal-dialog modal-xl admission-modal-dialog">

        <div className="modal-content border-0 shadow-lg admission-modal-content">

          {/* =====================================================
              MODAL HEADER
              HEADER STAYS AT TOP
              ===================================================== */}

          <div className="modal-header bg-primary text-white admission-modal-header">

            <div>
              <h4 className="modal-title fw-bold mb-1">
                Admission Application
              </h4>

              <small>
                KVR Kids Campus
              </small>
            </div>

            {/* TOP RIGHT CLOSE BUTTON */}

            <button
              type="button"
              className="btn btn-light admission-close-btn"
              onClick={onClose}
              disabled={loading}
              aria-label="Close admission application"
              title="Close"
            >
              <FaTimes />
            </button>

          </div>


          {/* =====================================================
              FORM
              IMPORTANT:
              FORM IS NOW THE FLEX CONTAINER
              ===================================================== */}

          <form
            onSubmit={handleSubmit}
            className="admission-modal-form"
          >

            {/* =================================================
                SCROLLABLE FORM BODY
                ONLY THIS AREA SCROLLS
                ================================================= */}

            <div className="modal-body p-4 admission-modal-body">

              {success && (
                <div className="alert alert-success">

                  <h5 className="fw-bold">
                    Application Submitted Successfully
                  </h5>

                  <p className="mb-1">
                    Your application number is:
                  </p>

                  <strong className="fs-4">
                    {success.applicationNo}
                  </strong>

                  <p className="mt-2 mb-0">
                    Please keep this number for future
                    communication with the school.
                  </p>

                </div>
              )}


              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}


              {/* =================================================
                  CHILD DETAILS
              ================================================= */}

              <h5 className="fw-bold border-bottom pb-2 mb-4">
                👦 Child Details
              </h5>

              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    First Name *
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Date of Birth *
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Gender *
                  </label>

                  <select
                    name="gender"
                    className="form-select"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>
                </div>


                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Applying For Class *
                  </label>

                  <select
                    name="applyingForClass"
                    className="form-select"
                    value={form.applyingForClass}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Class
                    </option>

                    <option value="Nursery">
                      Nursery
                    </option>

                    <option value="LKG">
                      LKG
                    </option>

                    <option value="UKG">
                      UKG
                    </option>

                    <option value="Grade I">
                      Grade I
                    </option>

                    <option value="Grade II">
                      Grade II
                    </option>

                    <option value="Grade III">
                      Grade III
                    </option>

                    <option value="Grade IV">
                      Grade IV
                    </option>

                    <option value="Grade V">
                      Grade V
                    </option>

                    <option value="Grade VI">
                      Grade VI
                    </option>

                    <option value="Grade VII">
                      Grade VII
                    </option>

                    <option value="Grade VIII">
                      Grade VIII
                    </option>

                    <option value="Grade IX">
                      Grade IX
                    </option>

                    <option value="Grade X">
                      Grade X
                    </option>

                  </select>
                </div>


                <div className="col-12">

                  <label className="form-label fw-semibold">
                    Previous School
                  </label>

                  <input
                    type="text"
                    name="previousSchool"
                    className="form-control"
                    value={form.previousSchool}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* =================================================
                  PARENT DETAILS
              ================================================= */}

              <h5 className="fw-bold border-bottom pb-2 mt-5 mb-4">
                👨‍👩‍👧 Parent / Guardian Details
              </h5>

              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Father Name *
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    className="form-control"
                    value={form.fatherName}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Mother Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    className="form-control"
                    value={form.motherName}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Guardian Name
                  </label>

                  <input
                    type="text"
                    name="guardianName"
                    className="form-control"
                    value={form.guardianName}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Parent Mobile *
                  </label>

                  <input
                    type="tel"
                    name="parentMobile"
                    className="form-control"
                    value={form.parentMobile}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Alternate Mobile
                  </label>

                  <input
                    type="tel"
                    name="alternateMobile"
                    className="form-control"
                    value={form.alternateMobile}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="parentEmail"
                    className="form-control"
                    value={form.parentEmail}
                    onChange={handleChange}
                  />
                </div>

              </div>


              {/* =================================================
                  ADDRESS
              ================================================= */}

              <h5 className="fw-bold border-bottom pb-2 mt-5 mb-4">
                📍 Address
              </h5>

              <div className="row g-3">

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Address Line 1 *
                  </label>

                  <input
                    type="text"
                    name="addressLine1"
                    className="form-control"
                    value={form.addressLine1}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Address Line 2
                  </label>

                  <input
                    type="text"
                    name="addressLine2"
                    className="form-control"
                    value={form.addressLine2}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-4">
                  <label className="form-label">
                    Village
                  </label>

                  <input
                    type="text"
                    name="village"
                    className="form-control"
                    value={form.village}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-4">
                  <label className="form-label">
                    Mandal
                  </label>

                  <input
                    type="text"
                    name="mandal"
                    className="form-control"
                    value={form.mandal}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-4">
                  <label className="form-label">
                    District
                  </label>

                  <input
                    type="text"
                    name="district"
                    className="form-control"
                    value={form.district}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-6">
                  <label className="form-label">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-3">
                  <label className="form-label">
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={form.country}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-md-3">
                  <label className="form-label">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>

              </div>


              {/* =================================================
                  OTHER INFORMATION
              ================================================= */}

              <h5 className="fw-bold border-bottom pb-2 mt-5 mb-4">
                🚌 Other Information
              </h5>

              <div className="form-check mb-3">

                <input
                  type="checkbox"
                  name="busRequired"
                  className="form-check-input"
                  id="busRequired"
                  checked={form.busRequired}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label"
                  htmlFor="busRequired"
                >
                  School Bus Required
                </label>

              </div>


              <div>

                <label className="form-label fw-semibold">
                  Remarks / Message
                </label>

                <textarea
                  name="remarks"
                  className="form-control"
                  rows="4"
                  value={form.remarks}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* =================================================
                FOOTER
                REMAINS VISIBLE
                ================================================= */}

            <div className="modal-footer admission-modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >

                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <FaPaperPlane className="me-2" />
                    Submit Application
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AdmissionApplicationForm;