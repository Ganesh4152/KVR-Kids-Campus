import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "/api";

const emptyTeacher = {
  employeeId: "",
  firstName: "",
  lastName: "",
  fullName: "",
  gender: "",
  dateOfBirth: "",
  qualification: "",
  specialization: "",
  experienceYears: "",
  mobile: "",
  alternateMobile: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  village: "",
  mandal: "",
  district: "",
  state: "",
  country: "India",
  pincode: "",
  joiningDate: "",
  designation: "",
  department: "",
  classId: "",
  section: "",
  salary: "",
  status: "ACTIVE",
};

function Teachers() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyTeacher);

  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================================
  // LOAD TEACHERS
  // =========================================================

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE}/teachers`);

      if (!response.ok) {
        throw new Error(
          `Unable to load teachers (${response.status})`
        );
      }

      const data = await response.json();

      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load teachers error:", err);

      setError(
        err.message || "Unable to load teachers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredTeachers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return teachers;
    }

    return teachers.filter((teacher) => {
      return (
        String(teacher.fullName || "")
          .toLowerCase()
          .includes(value) ||
        String(teacher.employeeId || "")
          .toLowerCase()
          .includes(value) ||
        String(teacher.mobile || "")
          .toLowerCase()
          .includes(value) ||
        String(teacher.email || "")
          .toLowerCase()
          .includes(value) ||
        String(teacher.designation || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [teachers, search]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTeachers.length / entriesPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * entriesPerPage;

  const endIndex =
    startIndex + entriesPerPage;

  const displayedTeachers =
    filteredTeachers.slice(
      startIndex,
      endIndex
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entriesPerPage]);

  // =========================================================
  // FORM
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...emptyTeacher,
    });
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const openEditModal = (teacher) => {
    setEditingId(teacher.id);

    setForm({
      employeeId: teacher.employeeId || "",
      firstName: teacher.firstName || "",
      lastName: teacher.lastName || "",
      fullName: teacher.fullName || "",
      gender: teacher.gender || "",
      dateOfBirth: teacher.dateOfBirth
        ? teacher.dateOfBirth.substring(0, 10)
        : "",
      qualification: teacher.qualification || "",
      specialization: teacher.specialization || "",
      experienceYears:
        teacher.experienceYears ?? "",
      mobile: teacher.mobile || "",
      alternateMobile:
        teacher.alternateMobile || "",
      email: teacher.email || "",
      addressLine1:
        teacher.addressLine1 || "",
      addressLine2:
        teacher.addressLine2 || "",
      village: teacher.village || "",
      mandal: teacher.mandal || "",
      district: teacher.district || "",
      state: teacher.state || "",
      country: teacher.country || "India",
      pincode: teacher.pincode || "",
      joiningDate: teacher.joiningDate
        ? teacher.joiningDate.substring(0, 10)
        : "",
      designation:
        teacher.designation || "",
      department:
        teacher.department || "",
      classId:
        teacher.classId ?? "",
      section:
        teacher.section || "",
      salary:
        teacher.salary ?? "",
      status:
        teacher.status || "ACTIVE",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingId(null);
    setForm({
      ...emptyTeacher,
    });
  };

  // =========================================================
  // SAVE
  // =========================================================

  const saveTeacher = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.employeeId.trim()) {
        throw new Error(
          "Employee ID is required."
        );
      }

      if (!form.firstName.trim()) {
        throw new Error(
          "First name is required."
        );
      }

      if (!form.fullName.trim()) {
        throw new Error(
          "Full name is required."
        );
      }

      if (!form.joiningDate) {
        throw new Error(
          "Joining date is required."
        );
      }

      if (!form.mobile.trim()) {
        throw new Error(
          "Mobile number is required."
        );
      }

      const payload = {
        ...form,

        experienceYears:
          form.experienceYears === ""
            ? null
            : Number(form.experienceYears),

        classId:
          form.classId === ""
            ? null
            : Number(form.classId),

        salary:
          form.salary === ""
            ? null
            : Number(form.salary),
      };

      const url = editingId
        ? `${API_BASE}/teachers/${editingId}`
        : `${API_BASE}/teachers`;

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text =
          await response.text();

        throw new Error(
          text ||
            `Server returned ${response.status}`
        );
      }

      const savedTeacher =
        await response.json();

      if (editingId) {
        setTeachers((previous) =>
          previous.map((teacher) =>
            teacher.id === editingId
              ? savedTeacher
              : teacher
          )
        );

        setSuccess(
          "Teacher updated successfully."
        );
      } else {
        setTeachers((previous) => [
          ...previous,
          savedTeacher,
        ]);

        setSuccess(
          "Teacher added successfully."
        );
      }

      setShowModal(false);
      setEditingId(null);
      setForm({
        ...emptyTeacher,
      });
    } catch (err) {
      console.error(
        "Save teacher error:",
        err
      );

      setError(
        err.message ||
          "Unable to save teacher."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const deleteTeacher = async (teacher) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${
          teacher.fullName ||
          "this teacher"
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_BASE}/teachers/${teacher.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Delete failed (${response.status})`
        );
      }

      setTeachers((previous) =>
        previous.filter(
          (item) =>
            item.id !== teacher.id
        )
      );

      setSuccess(
        `${
          teacher.fullName ||
          "Teacher"
        } deleted successfully.`
      );
    } catch (err) {
      console.error(
        "Delete teacher error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete teacher."
      );
    }
  };

  // =========================================================
  // CSV DOWNLOAD
  // =========================================================

  const downloadCSV = () => {
    if (teachers.length === 0) {
      setError(
        "There are no teachers to download."
      );
      return;
    }

    const headers = [
      "ID",
      "Employee ID",
      "Full Name",
      "Gender",
      "Email",
      "Mobile",
      "Designation",
      "Department",
      "Date of Joining",
      "Qualification",
      "Specialization",
      "Experience Years",
      "Salary",
      "Status",
    ];

    const rows = teachers.map(
      (teacher) => [
        teacher.id ?? "",
        teacher.employeeId ?? "",
        teacher.fullName ?? "",
        teacher.gender ?? "",
        teacher.email ?? "",
        teacher.mobile ?? "",
        teacher.designation ?? "",
        teacher.department ?? "",
        teacher.joiningDate ?? "",
        teacher.qualification ?? "",
        teacher.specialization ?? "",
        teacher.experienceYears ?? "",
        teacher.salary ?? "",
        teacher.status ?? "",
      ]
    );

    const escapeCSV = (value) => {
      const text = String(value ?? "");

      return `"${text.replace(
        /"/g,
        '""'
      )}"`;
    };

    const csv = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map(escapeCSV).join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "KVR-Kids-Campus-Teachers.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setSuccess(
      "Teacher CSV downloaded successfully."
    );
  };

  // =========================================================
  // DISPLAY HELPERS
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parts =
      date.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const formatSalary = (salary) => {
    if (
      salary === null ||
      salary === undefined ||
      salary === ""
    ) {
      return "-";
    }

    return `₹ ${Number(salary).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const statusBadge = (status) => {
    if (status === "ACTIVE") {
      return (
        <span className="badge bg-success">
          ACTIVE
        </span>
      );
    }

    if (status === "INACTIVE") {
      return (
        <span className="badge bg-secondary">
          INACTIVE
        </span>
      );
    }

    return (
      <span className="badge bg-dark">
        {status || "-"}
      </span>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff 0%, #fff4e6 50%, #fcecff 100%)",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          background:
            "linear-gradient(90deg, #0d6efd, #6f42c1)",
          padding: "16px 0",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="text-white">
            <h4 className="mb-0 fw-bold">
              👩‍🏫 Teachers
            </h4>

            <small>
              KVR Kids Campus Administration
            </small>
          </div>

          <button
            className="btn btn-light fw-bold"
            onClick={() =>
              navigate(
                "/admin/dashboard"
              )
            }
          >
            ← Dashboard
          </button>
        </div>
      </nav>

      {/* CONTENT */}

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              👩‍🏫 Teacher Management
            </h2>

            <p className="text-muted mb-0">
              Manage school teaching staff
            </p>
          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-success btn-lg fw-bold"
              onClick={downloadCSV}
            >
              ⬇ Download CSV
            </button>

            <button
              className="btn btn-primary btn-lg fw-bold"
              onClick={openAddModal}
            >
              + Add Teacher
            </button>

          </div>

        </div>

        {/* ALERTS */}

        {error && (
          <div className="alert alert-danger">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            ✅ {success}
          </div>
        )}

        {/* MAIN CARD */}

        <div className="card border-0 shadow-sm">

          <div className="card-body p-4">

            {/* TOP CONTROLS */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <strong>
                  Total Teachers:{" "}
                  {teachers.length}
                </strong>
              </div>

              <div
                style={{
                  minWidth: "330px",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, employee ID..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />
              </div>

            </div>

            {/* TABLE */}

            {loading ? (
              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                />

                <div className="mt-3">
                  Loading teachers...
                </div>

              </div>
            ) : filteredTeachers.length ===
              0 ? (

              <div className="text-center py-5">

                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  👩‍🏫
                </div>

                <h4 className="fw-bold mt-3">
                  No teachers found
                </h4>

                <p className="text-muted">
                  {search
                    ? "Try another search."
                    : "Add your first teacher."}
                </p>

                {!search && (
                  <button
                    className="btn btn-primary"
                    onClick={
                      openAddModal
                    }
                  >
                    + Add Teacher
                  </button>
                )}

              </div>
            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-light">

                    <tr>

                      <th>ID</th>

                      <th>
                        Employee ID
                      </th>

                      <th>
                        Teacher
                      </th>

                      <th>
                        Designation
                      </th>

                      <th>
                        Department
                      </th>

                      <th>
                        Date of Joining
                      </th>

                      <th>
                        Salary
                      </th>

                      <th>
                        Phone
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {displayedTeachers.map(
                      (teacher) => (

                        <tr
                          key={
                            teacher.id
                          }
                        >

                          <td>
                            {
                              teacher.id
                            }
                          </td>

                          <td className="fw-bold">
                            {
                              teacher.employeeId ||
                              "-"
                            }
                          </td>

                          <td>

                            <div className="fw-bold">
                              {
                                teacher.fullName ||
                                `${teacher.firstName || ""} ${
                                  teacher.lastName || ""
                                }`
                              }
                            </div>

                            <small className="text-muted">
                              {
                                teacher.email ||
                                "-"
                              }
                            </small>

                          </td>

                          <td>
                            {
                              teacher.designation ||
                              "-"
                            }
                          </td>

                          <td>
                            {
                              teacher.department ||
                              "-"
                            }
                          </td>

                          <td>
                            {formatDate(
                              teacher.joiningDate
                            )}
                          </td>

                          <td className="fw-semibold">
                            {formatSalary(
                              teacher.salary
                            )}
                          </td>

                          <td>
                            {
                              teacher.mobile ||
                              "-"
                            }
                          </td>

                          <td>
                            {statusBadge(
                              teacher.status
                            )}
                          </td>

                          <td>

                            <div className="d-flex gap-2">

                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  openEditModal(
                                    teacher
                                  )
                                }
                              >
                                ✏️ Edit
                              </button>

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteTeacher(
                                    teacher
                                  )
                                }
                              >
                                🗑️ Delete
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

            {/* FOOTER / PAGINATION */}

            {!loading &&
              filteredTeachers.length >
                0 && (

                <div className="d-flex justify-content-between align-items-center mt-4">

                  <div className="d-flex align-items-center gap-2">

                    <span>
                      Show
                    </span>

                    <select
                      className="form-select"
                      style={{
                        width: "80px",
                      }}
                      value={
                        entriesPerPage
                      }
                      onChange={(
                        event
                      ) =>
                        setEntriesPerPage(
                          Number(
                            event.target
                              .value
                          )
                        )
                      }
                    >
                      <option value="5">
                        5
                      </option>

                      <option value="10">
                        10
                      </option>

                      <option value="25">
                        25
                      </option>

                      <option value="50">
                        50
                      </option>
                    </select>

                    <span>
                      entries
                    </span>

                  </div>

                  <div className="text-muted">

                    Showing{" "}
                    {startIndex + 1} to{" "}
                    {Math.min(
                      endIndex,
                      filteredTeachers.length
                    )}{" "}
                    of{" "}
                    {
                      filteredTeachers.length
                    }{" "}
                    entries

                  </div>

                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-outline-secondary"
                      disabled={
                        safeCurrentPage ===
                        1
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.max(
                              1,
                              page - 1
                            )
                        )
                      }
                    >
                      «
                    </button>

                    <button
                      className="btn btn-primary"
                    >
                      {
                        safeCurrentPage
                      }
                    </button>

                    <button
                      className="btn btn-outline-secondary"
                      disabled={
                        safeCurrentPage >=
                        totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.min(
                              totalPages,
                              page + 1
                            )
                        )
                      }
                    >
                      »
                    </button>

                  </div>

                </div>

              )}

          </div>

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.55)",
            zIndex: 1050,
            overflowY: "auto",
            padding: "30px",
          }}
        >

          <div
            className="card border-0 shadow-lg mx-auto"
            style={{
              maxWidth: "1000px",
              borderRadius: "18px",
            }}
          >

            <div className="card-header bg-primary text-white p-4">

              <div className="d-flex justify-content-between align-items-center">

                <h4 className="mb-0 fw-bold">
                  {editingId
                    ? "✏️ Edit Teacher"
                    : "👩‍🏫 Add Teacher"}
                </h4>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={
                    closeModal
                  }
                />

              </div>

            </div>

            <form
              onSubmit={saveTeacher}
            >

              <div className="card-body p-4">

                <div className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Employee ID *
                    </label>

                    <input
                      type="text"
                      name="employeeId"
                      className="form-control"
                      value={
                        form.employeeId
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      First Name *
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={
                        form.firstName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={
                        form.lastName
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={
                        form.fullName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-bold">
                      Gender
                    </label>

                    <select
                      name="gender"
                      className="form-select"
                      value={
                        form.gender
                      }
                      onChange={
                        handleChange
                      }
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
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-bold">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={
                        form.status
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="ACTIVE">
                        ACTIVE
                      </option>

                      <option value="INACTIVE">
                        INACTIVE
                      </option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-control"
                      value={
                        form.dateOfBirth
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Joining Date *
                    </label>

                    <input
                      type="date"
                      name="joiningDate"
                      className="form-control"
                      value={
                        form.joiningDate
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Mobile *
                    </label>

                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={
                        form.mobile
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Qualification
                    </label>

                    <input
                      type="text"
                      name="qualification"
                      className="form-control"
                      placeholder="B.Ed / M.Ed"
                      value={
                        form.qualification
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Specialization
                    </label>

                    <input
                      type="text"
                      name="specialization"
                      className="form-control"
                      value={
                        form.specialization
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Experience (Years)
                    </label>

                    <input
                      type="number"
                      name="experienceYears"
                      className="form-control"
                      min="0"
                      value={
                        form.experienceYears
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={
                        form.email
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Designation
                    </label>

                    <input
                      type="text"
                      name="designation"
                      className="form-control"
                      placeholder="Teacher"
                      value={
                        form.designation
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Department
                    </label>

                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      value={
                        form.department
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Salary
                    </label>

                    <input
                      type="number"
                      name="salary"
                      className="form-control"
                      min="0"
                      step="0.01"
                      value={
                        form.salary
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-bold">
                      Address
                    </label>

                    <input
                      type="text"
                      name="addressLine1"
                      className="form-control"
                      placeholder="Address"
                      value={
                        form.addressLine1
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                </div>

              </div>

              <div className="card-footer bg-white p-4">

                <div className="d-flex justify-content-end gap-2">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={
                      closeModal
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary fw-bold"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Teacher"
                      : "Save Teacher"}
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Teachers;