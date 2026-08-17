import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080/api/classes";

function Classes() {

  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    className: "",
    section: "A",
    academicYear: "2026-2027",
    classTeacher: "",
    roomNumber: "",
    capacity: 40,
    ageFrom: "",
    ageTo: "",
    status: "ACTIVE"
  });


  // =========================================================
  // LOAD CLASSES
  // =========================================================

  const loadClasses = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load classes");
      }

      const data = await response.json();

      setClasses(data);

    } catch (err) {

      console.error(err);

      setError(
        "Unable to connect to the backend."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    loadClasses();
  }, []);


  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };


  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {

    setForm({
      className: "",
      section: "A",
      academicYear: "2026-2027",
      classTeacher: "",
      roomNumber: "",
      capacity: 40,
      ageFrom: "",
      ageTo: "",
      status: "ACTIVE"
    });

    setEditingId(null);

    setShowForm(false);

  };


  // =========================================================
  // ADD / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.className.trim()) {

      setError(
        "Please enter class name."
      );

      return;

    }


    const payload = {

      className: form.className,

      section: form.section,

      academicYear: form.academicYear,

      classTeacher: form.classTeacher,

      roomNumber: form.roomNumber,

      capacity: Number(form.capacity),

      ageFrom: form.ageFrom
        ? Number(form.ageFrom)
        : null,

      ageTo: form.ageTo
        ? Number(form.ageTo)
        : null,

      status: form.status

    };


    try {

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId
        ? "PUT"
        : "POST";


      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );


      if (!response.ok) {

        throw new Error(
          "Unable to save class"
        );

      }


      setMessage(
        editingId
          ? "Class updated successfully."
          : "Class added successfully."
      );


      resetForm();

      await loadClasses();


    } catch (err) {

      console.error(err);

      setError(
        "Unable to save class."
      );

    }

  };


  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (schoolClass) => {

    setForm({

      className:
        schoolClass.className || "",

      section:
        schoolClass.section || "A",

      academicYear:
        schoolClass.academicYear ||
        "2026-2027",

      classTeacher:
        schoolClass.classTeacher || "",

      roomNumber:
        schoolClass.roomNumber || "",

      capacity:
        schoolClass.capacity || 40,

      ageFrom:
        schoolClass.ageFrom || "",

      ageTo:
        schoolClass.ageTo || "",

      status:
        schoolClass.status || "ACTIVE"

    });


    setEditingId(schoolClass.id);

    setShowForm(true);


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // =========================================================
  // ACTIVATE / DEACTIVATE
  // =========================================================

  const toggleStatus = async (schoolClass) => {

    try {

      const action =
        schoolClass.status === "ACTIVE"
          ? "deactivate"
          : "activate";


      const response = await fetch(
        `${API_URL}/${schoolClass.id}/${action}`,
        {
          method: "PUT"
        }
      );


      if (!response.ok) {

        throw new Error(
          "Unable to change status"
        );

      }


      setMessage(
        schoolClass.status === "ACTIVE"
          ? "Class deactivated."
          : "Class activated."
      );


      await loadClasses();


    } catch (err) {

      console.error(err);

      setError(
        "Unable to change class status."
      );

    }

  };


  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this class?"
    );


    if (!confirmed) {
      return;
    }


    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE"
        }
      );


      if (!response.ok) {

        throw new Error(
          "Unable to delete class"
        );

      }


      setMessage(
        "Class deleted successfully."
      );


      await loadClasses();


    } catch (err) {

      console.error(err);

      setError(
        "Unable to delete class."
      );

    }

  };


  // =========================================================
  // VIEW STUDENTS FOR CLASS
  // =========================================================

  const getStudentsUrl = (schoolClass) => {

    const classId = schoolClass.id;

    const className =
      schoolClass.className || "";

    const section =
      schoolClass.section || "";

    return (
      `/admin/students?classId=${encodeURIComponent(classId)}` +
      `&className=${encodeURIComponent(className)}` +
      `&section=${encodeURIComponent(section)}`
    );

  };


  // =========================================================
  // PAGE
  // =========================================================

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(135deg, #eef7ff 0%, #fff4e6 50%, #f4efff 100%)"
      }}
    >


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar navbar-dark bg-primary shadow">

        <div className="container">

          <Link
            to="/admin/dashboard"
            className="navbar-brand fw-bold"
          >
            🏫 KVR Kids Campus
          </Link>


          <Link
            to="/admin/dashboard"
            className="btn btn-light"
          >
            ← Dashboard
          </Link>

        </div>

      </nav>


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="container py-5">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="d-flex justify-content-between align-items-center mb-4"
        >

          <div>

            <h1 className="fw-bold text-primary">
              🏫 Classes
            </h1>

            <p className="text-muted mb-0">
              Manage school classes, sections,
              teachers and academic years.
            </p>

          </div>


          <button
            className="btn btn-warning fw-bold shadow-sm"
            onClick={() => {

              if (showForm) {

                resetForm();

              } else {

                setShowForm(true);

              }

            }}
          >

            {showForm
              ? "✖ Close"
              : "➕ Add Class"}

          </button>

        </div>


        {/* =====================================================
            ALERTS
        ===================================================== */}

        {message && (

          <div
            className="alert alert-success shadow-sm"
          >

            ✅ {message}

          </div>

        )}


        {error && (

          <div
            className="alert alert-danger shadow-sm"
          >

            ❌ {error}

          </div>

        )}


        {/* =====================================================
            ADD / EDIT FORM
        ===================================================== */}

        {showForm && (

          <div className="card border-0 shadow-lg mb-5">

            <div className="card-header bg-primary text-white">

              <h5 className="mb-0 fw-bold">

                {editingId
                  ? "✏️ Edit Class"
                  : "➕ Add New Class"}

              </h5>

            </div>


            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="row g-3">


                  <div className="col-md-4">

                    <label className="form-label fw-bold">
                      Class Name *
                    </label>

                    <input
                      type="text"
                      name="className"
                      className="form-control"
                      placeholder="Example: 1st Class"
                      value={form.className}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-2">

                    <label className="form-label fw-bold">
                      Section *
                    </label>

                    <input
                      type="text"
                      name="section"
                      className="form-control"
                      value={form.section}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-3">

                    <label className="form-label fw-bold">
                      Academic Year *
                    </label>

                    <input
                      type="text"
                      name="academicYear"
                      className="form-control"
                      placeholder="2026-2027"
                      value={form.academicYear}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  <div className="col-md-3">

                    <label className="form-label fw-bold">
                      Capacity
                    </label>

                    <input
                      type="number"
                      name="capacity"
                      className="form-control"
                      value={form.capacity}
                      onChange={handleChange}
                      min="1"
                    />

                  </div>


                  <div className="col-md-4">

                    <label className="form-label fw-bold">
                      Class Teacher
                    </label>

                    <input
                      type="text"
                      name="classTeacher"
                      className="form-control"
                      placeholder="Teacher name"
                      value={form.classTeacher}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="col-md-3">

                    <label className="form-label fw-bold">
                      Room Number
                    </label>

                    <input
                      type="text"
                      name="roomNumber"
                      className="form-control"
                      placeholder="Room 101"
                      value={form.roomNumber}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="col-md-2">

                    <label className="form-label fw-bold">
                      Age From
                    </label>

                    <input
                      type="number"
                      name="ageFrom"
                      className="form-control"
                      value={form.ageFrom}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="col-md-2">

                    <label className="form-label fw-bold">
                      Age To
                    </label>

                    <input
                      type="number"
                      name="ageTo"
                      className="form-control"
                      value={form.ageTo}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="col-md-3">

                    <label className="form-label fw-bold">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={form.status}
                      onChange={handleChange}
                    >

                      <option value="ACTIVE">
                        ACTIVE
                      </option>

                      <option value="INACTIVE">
                        INACTIVE
                      </option>

                    </select>

                  </div>


                  <div className="col-12">

                    <button
                      type="submit"
                      className="btn btn-success me-2 fw-bold"
                    >

                      {editingId
                        ? "💾 Update Class"
                        : "💾 Save Class"}

                    </button>


                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

        )}


        {/* =====================================================
            CLASS LIST
        ===================================================== */}

        <div className="card border-0 shadow-lg">

          <div className="card-header bg-white py-3">

            <div className="d-flex justify-content-between">

              <h5 className="mb-0 fw-bold">
                📚 Class List
              </h5>


              <span className="badge bg-primary">
                {classes.length} Classes
              </span>

            </div>

          </div>


          <div className="card-body p-0">

            {loading ? (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                />

                <p className="mt-3 text-muted">
                  Loading classes...
                </p>

              </div>

            ) : classes.length === 0 ? (

              <div className="text-center py-5">

                <div style={{ fontSize: "50px" }}>
                  🏫
                </div>

                <h5>
                  No classes found
                </h5>

                <p className="text-muted">
                  Add your first class.
                </p>

              </div>

            ) : (

              <div className="table-responsive">

                <table
                  className="table table-hover align-middle mb-0"
                >

                  <thead className="table-primary">

                    <tr>

                      <th>#</th>

                      <th>Class</th>

                      <th>Section</th>

                      <th>Academic Year</th>

                      <th>Teacher</th>

                      <th>Room</th>

                      <th>Capacity</th>

                      <th>Status</th>

                      <th>Actions</th>

                    </tr>

                  </thead>


                  <tbody>

                    {classes.map(
                      (schoolClass, index) => (

                        <tr
                          key={schoolClass.id}
                        >

                          <td className="fw-bold">
                            {index + 1}
                          </td>


                          {/* =================================================
                              CLICK CLASS NAME → STUDENTS
                          ================================================= */}

                          <td>

                            <Link
                              to={getStudentsUrl(schoolClass)}
                              className="fw-bold text-primary text-decoration-none"
                              title={`View students in ${schoolClass.className}`}
                            >

                              <span
                                style={{
                                  cursor: "pointer"
                                }}
                              >

                                🎓 {schoolClass.className}

                              </span>

                            </Link>

                            <div
                              className="small text-muted mt-1"
                            >
                              View students →
                            </div>

                          </td>


                          <td>

                            <span
                              className="badge bg-info text-dark"
                            >

                              {schoolClass.section}

                            </span>

                          </td>


                          <td>
                            {schoolClass.academicYear}
                          </td>


                          <td>
                            {schoolClass.classTeacher || "-"}
                          </td>


                          <td>
                            {schoolClass.roomNumber || "-"}
                          </td>


                          <td>

                            <span
                              className="badge bg-secondary"
                            >

                              {schoolClass.capacity || 0}

                            </span>

                          </td>


                          <td>

                            {schoolClass.status === "ACTIVE" ? (

                              <span
                                className="badge bg-success"
                              >
                                ACTIVE
                              </span>

                            ) : (

                              <span
                                className="badge bg-danger"
                              >
                                INACTIVE
                              </span>

                            )}

                          </td>


                          {/* =================================================
                              ACTIONS
                          ================================================= */}

                          <td>

                            <div className="d-flex gap-2">


                              {/* VIEW STUDENTS */}

                              <Link
                                to={getStudentsUrl(schoolClass)}
                                className="btn btn-sm btn-outline-info"
                                title="View Students"
                              >
                                👨‍🎓
                              </Link>


                              {/* EDIT */}

                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  handleEdit(schoolClass)
                                }
                                title="Edit Class"
                              >
                                ✏️
                              </button>


                              {/* ACTIVATE / DEACTIVATE */}

                              <button
                                className={
                                  schoolClass.status === "ACTIVE"
                                    ? "btn btn-sm btn-outline-warning"
                                    : "btn btn-sm btn-outline-success"
                                }
                                onClick={() =>
                                  toggleStatus(schoolClass)
                                }
                                title={
                                  schoolClass.status === "ACTIVE"
                                    ? "Deactivate Class"
                                    : "Activate Class"
                                }
                              >

                                {schoolClass.status === "ACTIVE"
                                  ? "⏸"
                                  : "▶"}

                              </button>


                              {/* DELETE */}

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDelete(
                                    schoolClass.id
                                  )
                                }
                                title="Delete Class"
                              >
                                🗑️
                              </button>


                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>


        {/* =====================================================
            INFORMATION CARD
        ===================================================== */}

        <div className="card border-0 shadow-sm mt-4">

          <div className="card-body">

            <div className="row text-center">

              <div className="col-md-4">

                <div
                  style={{
                    fontSize: "35px"
                  }}
                >
                  🎓
                </div>

                <h6 className="fw-bold">
                  Click Class Name
                </h6>

                <p className="text-muted small mb-0">
                  Open students belonging to that class.
                </p>

              </div>


              <div className="col-md-4">

                <div
                  style={{
                    fontSize: "35px"
                  }}
                >
                  👨‍🎓
                </div>

                <h6 className="fw-bold">
                  Student Management
                </h6>

                <p className="text-muted small mb-0">
                  Add and manage students by class.
                </p>

              </div>


              <div className="col-md-4">

                <div
                  style={{
                    fontSize: "35px"
                  }}
                >
                  📊
                </div>

                <h6 className="fw-bold">
                  Student Records
                </h6>

                <p className="text-muted small mb-0">
                  Attendance, fees and marks can be managed
                  from the student records.
                </p>

              </div>

            </div>

          </div>

        </div>


      </div>

    </div>

  );

}

export default Classes;