import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
  state: "Telangana",
  country: "India",
  pincode: "",

  busRequired: false,
  busRoute: "",
  pickupPoint: "",

  remarks: ""
};

function AdmissionApplication() {

  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {

    const {
      name,
      value,
      type,
      checked
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox"
        ? checked
        : value
    }));
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setSubmitting(true);
    setSuccess(null);
    setError("");

    try {

      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to submit admission application."
        );
      }

      setSuccess(data);

      setForm(initialForm);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } catch (err) {

      setError(
        err.message ||
        "Something went wrong while submitting."
      );

    } finally {

      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #eef7ff, #fff4e6, #f4efff)"
        }}
      >

        <div className="container py-5">

          <div className="text-center mb-5">

            <h1 className="fw-bold">
              Admission Application
            </h1>

            <p className="text-muted">
              KMR Kids Campus
              <br />
              Academic Year 2027 – 2028
            </p>

          </div>

          {success && (
            <div className="alert alert-success shadow-sm">

              <h4 className="alert-heading">
                Application Submitted Successfully
              </h4>

              <p className="mb-2">
                Thank you for applying to KVR Kids Campus.
              </p>

              <strong>
                Application Number:
                {" "}
                {success.applicationNo}
              </strong>

              <div className="mt-3">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/")
                  }
                >
                  Back to Home
                </button>

              </div>

            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {!success && (
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-lg"
            >

              <div className="card-body p-4 p-lg-5">

                {/* =================================================
                    STUDENT
                ================================================= */}

                <h3 className="fw-bold mb-4">
                  👨‍🎓 Student Details
                </h3>

                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">
                      First Name *
                    </label>

                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Last Name
                    </label>

                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Gender
                    </label>

                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">
                        Select
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
                    <label className="form-label">
                      Applying For Class *
                    </label>

                    <select
                      name="applyingForClass"
                      value={form.applyingForClass}
                      onChange={handleChange}
                      className="form-select"
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
                    <label className="form-label">
                      Previous School
                    </label>

                    <input
                      name="previousSchool"
                      value={form.previousSchool}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                </div>

                <hr className="my-5" />

                {/* =================================================
                    PARENT
                ================================================= */}

                <h3 className="fw-bold mb-4">
                  👨‍👩‍👧 Parent / Guardian Details
                </h3>

                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">
                      Father Name *
                    </label>

                    <input
                      name="fatherName"
                      value={form.fatherName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Mother Name
                    </label>

                    <input
                      name="motherName"
                      value={form.motherName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Guardian Name
                    </label>

                    <input
                      name="guardianName"
                      value={form.guardianName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Parent Mobile *
                    </label>

                    <input
                      type="tel"
                      name="parentMobile"
                      value={form.parentMobile}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Alternate Mobile
                    </label>

                    <input
                      type="tel"
                      name="alternateMobile"
                      value={form.alternateMobile}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="parentEmail"
                      value={form.parentEmail}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                </div>

                <hr className="my-5" />

                {/* =================================================
                    ADDRESS
                ================================================= */}

                <h3 className="fw-bold mb-4">
                  📍 Address Details
                </h3>

                <div className="row g-3">

                  <div className="col-12">
                    <label className="form-label">
                      Address Line 1
                    </label>

                    <input
                      name="addressLine1"
                      value={form.addressLine1}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      Address Line 2
                    </label>

                    <input
                      name="addressLine2"
                      value={form.addressLine2}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Village
                    </label>

                    <input
                      name="village"
                      value={form.village}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      Mandal
                    </label>

                    <input
                      name="mandal"
                      value={form.mandal}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">
                      District
                    </label>

                    <input
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      State
                    </label>

                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Country
                    </label>

                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Pincode
                    </label>

                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                </div>

                <hr className="my-5" />

                {/* =================================================
                    TRANSPORT
                ================================================= */}

                <h3 className="fw-bold mb-4">
                  🚌 Transport
                </h3>

                <div className="form-check mb-3">

                  <input
                    type="checkbox"
                    name="busRequired"
                    checked={form.busRequired}
                    onChange={handleChange}
                    className="form-check-input"
                    id="busRequired"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="busRequired"
                  >
                    School bus required
                  </label>

                </div>

                {form.busRequired && (
                  <div className="row g-3">

                    <div className="col-md-6">

                      <label className="form-label">
                        Bus Route
                      </label>

                      <input
                        name="busRoute"
                        value={form.busRoute}
                        onChange={handleChange}
                        className="form-control"
                      />

                    </div>

                    <div className="col-md-6">

                      <label className="form-label">
                        Pickup Point
                      </label>

                      <input
                        name="pickupPoint"
                        value={form.pickupPoint}
                        onChange={handleChange}
                        className="form-control"
                      />

                    </div>

                  </div>
                )}

                <hr className="my-5" />

                {/* =================================================
                    REMARKS
                ================================================= */}

                <h3 className="fw-bold mb-4">
                  📝 Additional Information
                </h3>

                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Any additional information..."
                />

                <div className="d-flex justify-content-between mt-5">

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() =>
                      navigate("/admissions")
                    }
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Application"}
                  </button>

                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </>
  );
}

export default AdmissionApplication;