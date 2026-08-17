import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";
const STUDENT_API = `${API_BASE}/students`;
const CLASS_API = `${API_BASE}/classes`;

const DEFAULT_PASSWORD = "student123";

const EMPTY_FORM = {
  admissionNo: "",
  rollNo: "",
  firstName: "",
  lastName: "",
  fullName: "",
  gender: "Male",
  dateOfBirth: "",
  bloodGroup: "",
  aadhaarNumber: "",
  classId: "",
  admissionDate: "",
  academicYear: "2026-2027",

  fatherName: "",
  motherName: "",
  guardianName: "",
  parentMobile: "",
  alternateMobile: "",
  parentEmail: "",
  occupation: "",
  annualIncome: "",

  addressLine1: "",
  addressLine2: "",
  village: "",
  mandal: "",
  district: "",
  state: "",
  country: "India",
  pincode: "",

  busRequired: false,
  busRoute: "",
  pickupPoint: "",

  feeCategory: "Monthly",
  totalFee: "",
  paidFee: "",
  pendingFee: "",
  scholarship: "",

  hostelRequired: false,
  medicalCondition: "",
  allergies: "",

  emergencyContactName: "",
  emergencyContactNumber: "",

  previousSchool: "",
  tcNumber: "",

  remarks: "",
  status: "ACTIVE",
};

function Students() {
  const [searchParams] = useSearchParams();

  const selectedClassId = searchParams.get("classId");
  const selectedClassName = searchParams.get("className");
  const selectedSection = searchParams.get("section");

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [classesLoading, setClassesLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState(
    selectedClassId || ""
  );
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);

  // =========================================================
  // LOAD CLASSES
  // =========================================================

  const loadClasses = async () => {
    try {
      setClassesLoading(true);

      const response = await fetch(CLASS_API);

      if (!response.ok) {
        throw new Error(`Classes API returned ${response.status}`);
      }

      const data = await response.json();

      setClasses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Classes API error:", err);
      setError(
        "Unable to load class information. Student data can still be viewed."
      );
    } finally {
      setClassesLoading(false);
    }
  };

  // =========================================================
  // LOAD STUDENTS
  // =========================================================

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      let url = STUDENT_API;

      if (selectedClassId) {
        url = `${STUDENT_API}/class/${selectedClassId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Students API returned ${response.status}`);
      }

      const data = await response.json();

      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Students API error:", err);

      setError(
        "Unable to load students. Please make sure Spring Boot is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
    loadClasses();
  }, [selectedClassId]);

  // =========================================================
  // CLASS NAME
  // =========================================================

  const getClassName = (student) => {
    const foundClass = classes.find(
      (schoolClass) =>
        Number(schoolClass.id) === Number(student.classId)
    );

    if (foundClass) {
      return foundClass.className;
    }

    if (
      student.className &&
      typeof student.className === "string"
    ) {
      return student.className;
    }

    if (
      selectedClassId &&
      Number(student.classId) === Number(selectedClassId)
    ) {
      return selectedClassName || `Class ${selectedClassId}`;
    }

    return student.classId
      ? `Class ID ${student.classId}`
      : "-";
  };

  // =========================================================
  // FILTER STUDENTS
  // =========================================================

  const filteredStudents = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !searchText ||
        String(student.admissionNo || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.rollNo || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.firstName || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.lastName || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.fullName || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.parentMobile || "")
          .toLowerCase()
          .includes(searchText);

      const matchesClass =
        !classFilter ||
        Number(student.classId) === Number(classFilter);

      const matchesStatus =
        statusFilter === "ALL" ||
        student.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    students,
    search,
    classFilter,
    statusFilter,
    classes,
    selectedClassId,
  ]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================================
  // OPEN ADD FORM
  // =========================================================

  const openAddForm = () => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    setEditingId(null);

    setForm({
      ...EMPTY_FORM,
      classId: selectedClassId || "",
      admissionDate: today,
      academicYear: "2026-2027",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  const openEditForm = (student) => {
    setEditingId(student.id);

    setForm({
      ...EMPTY_FORM,
      ...student,

      dateOfBirth: student.dateOfBirth
        ? String(student.dateOfBirth).substring(0, 10)
        : "",

      admissionDate: student.admissionDate
        ? String(student.admissionDate).substring(0, 10)
        : "",

      classId: student.classId || "",

      annualIncome:
        student.annualIncome ?? "",

      totalFee:
        student.totalFee ?? "",

      paidFee:
        student.paidFee ?? "",

      pendingFee:
        student.pendingFee ?? "",

      scholarship:
        student.scholarship ?? "",

      busRequired:
        Boolean(student.busRequired),

      hostelRequired:
        Boolean(student.hostelRequired),
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // =========================================================
  // SAVE STUDENT
  // =========================================================

  const saveStudent = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.admissionNo.trim()) {
        throw new Error(
          "Admission number is required."
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

      if (!form.classId) {
        throw new Error(
          "Please select a class."
        );
      }

      if (!form.dateOfBirth) {
        throw new Error(
          "Date of birth is required."
        );
      }

      if (!form.admissionDate) {
        throw new Error(
          "Admission date is required."
        );
      }

      if (!form.fatherName.trim()) {
        throw new Error(
          "Father name is required."
        );
      }

      if (!form.parentMobile.trim()) {
        throw new Error(
          "Parent mobile number is required."
        );
      }

      const payload = {
        ...form,

        password: DEFAULT_PASSWORD,

        classId: Number(form.classId),

        annualIncome:
          form.annualIncome === ""
            ? null
            : Number(form.annualIncome),

        totalFee:
          form.totalFee === ""
            ? 0
            : Number(form.totalFee),

        paidFee:
          form.paidFee === ""
            ? 0
            : Number(form.paidFee),

        pendingFee:
          form.pendingFee === ""
            ? 0
            : Number(form.pendingFee),

        scholarship:
          form.scholarship === ""
            ? 0
            : Number(form.scholarship),

        busRequired:
          Boolean(form.busRequired),

        hostelRequired:
          Boolean(form.hostelRequired),
      };

      const url = editingId
        ? `${STUDENT_API}/${editingId}`
        : STUDENT_API;

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            "Admission number already exists."
          );
        }

        const text =
          await response.text();

        throw new Error(
          text ||
            `Server returned ${response.status}`
        );
      }

      const savedStudent =
        await response.json();

      if (editingId) {
        setStudents((previous) =>
          previous.map((student) =>
            Number(student.id) ===
            Number(editingId)
              ? savedStudent
              : student
          )
        );

        setSuccess(
          "Student updated successfully."
        );
      } else {
        setStudents((previous) => [
          ...previous,
          savedStudent,
        ]);

        setSuccess(
          `Student added successfully. Login: ${savedStudent.admissionNo} / ${DEFAULT_PASSWORD}`
        );
      }

      setShowModal(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error(
        "Save student error:",
        err
      );

      setError(
        err.message ||
          "Unable to save student."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE STUDENT
  // =========================================================

  const deleteStudent = async (student) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to permanently delete ${
          student.fullName ||
          "this student"
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${STUDENT_API}/${student.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Delete failed (${response.status})`
        );
      }

      setStudents((previous) =>
        previous.filter(
          (item) =>
            Number(item.id) !==
            Number(student.id)
        )
      );

      setSuccess(
        `${
          student.fullName ||
          "Student"
        } deleted successfully.`
      );
    } catch (err) {
      console.error(
        "Delete student error:",
        err
      );

      setError(
        "Unable to delete student. Please try again."
      );
    }
  };

  // =========================================================
  // CSV HELPERS
  // =========================================================

  const csvValue = (value) => {
    const text =
      value === null ||
      value === undefined
        ? ""
        : String(value);

    return `"${text.replace(
      /"/g,
      '""'
    )}"`;
  };

  const downloadCSV = () => {
    if (filteredStudents.length === 0) {
      setError(
        "There are no students to download."
      );
      return;
    }

    const headers = [
      "Admission No",
      "Roll No",
      "Student Name",
      "Class",
      "Gender",
      "Date of Birth",
      "Academic Year",
      "Father Name",
      "Mother Name",
      "Parent Mobile",
      "Parent Email",
      "Status",
    ];

    const rows =
      filteredStudents.map(
        (student) => [
          student.admissionNo,
          student.rollNo,
          student.fullName,
          getClassName(student),
          student.gender,
          student.dateOfBirth
            ? String(
                student.dateOfBirth
              ).substring(0, 10)
            : "",
          student.academicYear,
          student.fatherName,
          student.motherName,
          student.parentMobile,
          student.parentEmail,
          student.status,
        ]
      );

    const csv = [
      headers.map(csvValue).join(","),
      ...rows.map((row) =>
        row.map(csvValue).join(",")
      ),
    ].join("\r\n");

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

    const date =
      new Date()
        .toISOString()
        .substring(0, 10);

    link.href = url;

    link.download =
      `KVR-Kids-Campus-Students-${date}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setSuccess(
      `${filteredStudents.length} student records downloaded as CSV.`
    );
  };

  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setClassFilter(
      selectedClassId || ""
    );
  };

  // =========================================================
  // STATUS BADGE
  // =========================================================

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

    if (status === "TRANSFERRED") {
      return (
        <span className="badge bg-warning text-dark">
          TRANSFERRED
        </span>
      );
    }

    if (status === "COMPLETED") {
      return (
        <span className="badge bg-primary">
          COMPLETED
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
  // PAGE
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff 0%, #fff4e6 50%, #fcecff 100%)",
      }}
    >
      {/* =====================================================
          NAVBAR
      ====================================================== */}

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
          <Link
            to="/admin/dashboard"
            className="text-white text-decoration-none"
            style={{
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            🏫 KVR Kids Campus
          </Link>

          <Link
            to="/admin/dashboard"
            className="btn btn-light fw-bold"
          >
            🏠 Admin Dashboard
          </Link>
        </div>
      </nav>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="container py-4">
        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h1
              className="fw-bold mb-1"
              style={{
                color: "#0d6efd",
              }}
            >
              👨‍🎓 Student Management
            </h1>

            <p className="text-muted mb-0">
              {selectedClassId
                ? `Students in ${
                    selectedClassName ||
                    `Class ${selectedClassId}`
                  }${
                    selectedSection &&
                    selectedSection !== "-"
                      ? ` - Section ${selectedSection}`
                      : ""
                  }`
                : "Manage all school students"}
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn btn-success fw-bold"
              onClick={downloadCSV}
            >
              📥 Download CSV
            </button>

            <button
              className="btn btn-warning fw-bold"
              onClick={openAddForm}
            >
              ➕ Add Student
            </button>
          </div>
        </div>

        {/* ALERTS */}

        {success && (
          <div className="alert alert-success shadow-sm">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="alert alert-danger shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-muted">
                  Total Students
                </div>

                <div
                  className="fw-bold text-primary"
                  style={{
                    fontSize: "32px",
                  }}
                >
                  {students.length}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-muted">
                  Filtered Students
                </div>

                <div
                  className="fw-bold text-success"
                  style={{
                    fontSize: "32px",
                  }}
                >
                  {filteredStudents.length}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-muted">
                  Login Password
                </div>

                <div
                  className="fw-bold text-danger"
                  style={{
                    fontSize: "24px",
                  }}
                >
                  {DEFAULT_PASSWORD}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FILTERS
        ====================================================== */}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-lg-5">
                <label className="form-label fw-bold">
                  🔎 Search Student
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Name, admission no, roll no or parent mobile"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="col-lg-3">
                <label className="form-label fw-bold">
                  🎓 Class
                </label>

                <select
                  className="form-select"
                  value={classFilter}
                  onChange={(event) =>
                    setClassFilter(
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    All Classes
                  </option>

                  {classes.map(
                    (schoolClass) => (
                      <option
                        key={schoolClass.id}
                        value={schoolClass.id}
                      >
                        {schoolClass.className}
                        {schoolClass.section &&
                        schoolClass.section !== "-"
                          ? ` - ${schoolClass.section}`
                          : ""}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="col-lg-2">
                <label className="form-label fw-bold">
                  Status
                </label>

                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                >
                  <option value="ALL">
                    All Status
                  </option>

                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="INACTIVE">
                    INACTIVE
                  </option>

                  <option value="TRANSFERRED">
                    TRANSFERRED
                  </option>

                  <option value="COMPLETED">
                    COMPLETED
                  </option>
                </select>
              </div>

              <div className="col-lg-2">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={resetFilters}
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            STUDENT TABLE
        ====================================================== */}

        <div className="card border-0 shadow-lg">
          <div
            className="card-header text-white d-flex justify-content-between align-items-center"
            style={{
              background:
                "linear-gradient(90deg, #0d6efd, #6f42c1)",
            }}
          >
            <h5 className="mb-0 fw-bold">
              📋 Student List
            </h5>

            <span className="badge bg-warning text-dark fs-6">
              {filteredStudents.length} Students
            </span>
          </div>

          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                />

                <p className="mt-3 text-muted">
                  Loading students...
                </p>
              </div>
            ) : filteredStudents.length ===
              0 ? (
              <div className="text-center py-5">
                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  🎒
                </div>

                <h4 className="mt-3">
                  No Students Found
                </h4>

                <p className="text-muted">
                  Try changing your filters
                  or add a new student.
                </p>

                <button
                  className="btn btn-warning fw-bold"
                  onClick={openAddForm}
                >
                  ➕ Add Student
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead
                    style={{
                      background: "#dbeafe",
                    }}
                  >
                    <tr>
                      <th>#</th>
                      <th>Admission No</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Roll No</th>
                      <th>Gender</th>
                      <th>Academic Year</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map(
                      (student, index) => (
                        <tr key={student.id}>
                          <td className="fw-bold">
                            {index + 1}
                          </td>

                          <td>
                            <span className="badge bg-primary">
                              {student.admissionNo}
                            </span>
                          </td>

                          <td>
                            <div className="fw-bold">
                              {student.fullName ||
                                `${student.firstName || ""} ${
                                  student.lastName || ""
                                }`.trim()}
                            </div>

                            {student.parentMobile && (
                              <small className="text-muted">
                                📱{" "}
                                {
                                  student.parentMobile
                                }
                              </small>
                            )}
                          </td>

                          <td>
                            <span className="badge bg-info text-dark">
                              {getClassName(
                                student
                              )}
                            </span>
                          </td>

                          <td>
                            {student.rollNo ||
                              "-"}
                          </td>

                          <td>
                            {student.gender ||
                              "-"}
                          </td>

                          <td>
                            {student.academicYear ||
                              "-"}
                          </td>

                          <td>
                            {statusBadge(
                              student.status
                            )}
                          </td>

                          <td>
                            <div
                              className="d-flex gap-2 flex-wrap"
                              style={{
                                minWidth: "150px",
                              }}
                            >
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                title="Edit Student"
                                onClick={() =>
                                  openEditForm(
                                    student
                                  )
                                }
                              >
                                ✏️ Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                title="Delete Student"
                                onClick={() =>
                                  deleteStudent(
                                    student
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
          </div>
        </div>

        {/* =====================================================
            LOGIN INFORMATION
        ====================================================== */}

        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <h5 className="fw-bold">
              🔐 Student Login Information
            </h5>

            <p className="mb-2">
              Every newly added student can
              login using:
            </p>

            <div className="alert alert-info mb-0">
              <strong>
                Username:
              </strong>{" "}
              Student Admission Number
              <br />

              <strong>
                Password:
              </strong>{" "}
              {DEFAULT_PASSWORD}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            background:
              "rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-scrollable"
            style={{
              maxWidth: "1200px",
            }}
          >
            <div className="modal-content">
              <div
                className="modal-header text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #0d6efd, #6f42c1)",
                }}
              >
                <h5 className="modal-title fw-bold">
                  {editingId
                    ? "✏️ Edit Student"
                    : "➕ Add New Student"}
                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                  disabled={saving}
                />
              </div>

              <form onSubmit={saveStudent}>
                <div className="modal-body">
                  <div className="alert alert-info">
                    🔐 Student login:
                    <strong>
                      {" "}
                      Admission Number
                    </strong>{" "}
                    /
                    <strong>
                      {" "}
                      {DEFAULT_PASSWORD}
                    </strong>
                  </div>

                  {/* BASIC DETAILS */}

                  <h6 className="fw-bold text-primary border-bottom pb-2">
                    👨‍🎓 Student Details
                  </h6>

                  <div className="row g-3 mb-4">
                    <div className="col-md-3">
                      <label className="form-label fw-bold">
                        Admission No *
                      </label>

                      <input
                        name="admissionNo"
                        className="form-control"
                        value={
                          form.admissionNo
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label fw-bold">
                        Roll No
                      </label>

                      <input
                        name="rollNo"
                        className="form-control"
                        value={form.rollNo}
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label fw-bold">
                        First Name *
                      </label>

                      <input
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

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Full Name *
                      </label>

                      <input
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

                    <div className="col-md-2">
                      <label className="form-label fw-bold">
                        Gender *
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
                        required
                      >
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

                    <div className="col-md-3">
                      <label className="form-label fw-bold">
                        Date of Birth *
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
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label fw-bold">
                        Blood Group
                      </label>

                      <input
                        name="bloodGroup"
                        className="form-control"
                        value={
                          form.bloodGroup
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="O+"
                      />
                    </div>
                  </div>

                  {/* CLASS */}

                  <h6 className="fw-bold text-primary border-bottom pb-2">
                    🎓 Class / Academic Details
                  </h6>

                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Class *
                      </label>

                      <select
                        name="classId"
                        className="form-select"
                        value={
                          form.classId
                        }
                        onChange={
                          handleChange
                        }
                        required
                      >
                        <option value="">
                          Select Class
                        </option>

                        {classes.map(
                          (schoolClass) => (
                            <option
                              key={
                                schoolClass.id
                              }
                              value={
                                schoolClass.id
                              }
                            >
                              {
                                schoolClass.className
                              }

                              {schoolClass.section &&
                              schoolClass.section !==
                                "-"
                                ? ` - ${schoolClass.section}`
                                : ""}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Admission Date *
                      </label>

                      <input
                        type="date"
                        name="admissionDate"
                        className="form-control"
                        value={
                          form.admissionDate
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Academic Year *
                      </label>

                      <input
                        name="academicYear"
                        className="form-control"
                        value={
                          form.academicYear
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* PARENTS */}

                  <h6 className="fw-bold text-primary border-bottom pb-2">
                    👪 Parent / Guardian Details
                  </h6>

                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Father Name *
                      </label>

                      <input
                        name="fatherName"
                        className="form-control"
                        value={
                          form.fatherName
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Mother Name
                      </label>

                      <input
                        name="motherName"
                        className="form-control"
                        value={
                          form.motherName
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Guardian Name
                      </label>

                      <input
                        name="guardianName"
                        className="form-control"
                        value={
                          form.guardianName
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Parent Mobile *
                      </label>

                      <input
                        name="parentMobile"
                        className="form-control"
                        value={
                          form.parentMobile
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Alternate Mobile
                      </label>

                      <input
                        name="alternateMobile"
                        className="form-control"
                        value={
                          form.alternateMobile
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold">
                        Parent Email
                      </label>

                      <input
                        type="email"
                        name="parentEmail"
                        className="form-control"
                        value={
                          form.parentEmail
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>
                  </div>

                  {/* ADDRESS */}

                  <h6 className="fw-bold text-primary border-bottom pb-2">
                    🏠 Address
                  </h6>

                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">
                        Address Line 1
                      </label>

                      <input
                        name="addressLine1"
                        className="form-control"
                        value={
                          form.addressLine1
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Address Line 2
                      </label>

                      <input
                        name="addressLine2"
                        className="form-control"
                        value={
                          form.addressLine2
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Village
                      </label>

                      <input
                        name="village"
                        className="form-control"
                        value={
                          form.village
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Mandal
                      </label>

                      <input
                        name="mandal"
                        className="form-control"
                        value={
                          form.mandal
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        District
                      </label>

                      <input
                        name="district"
                        className="form-control"
                        value={
                          form.district
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        State
                      </label>

                      <input
                        name="state"
                        className="form-control"
                        value={form.state}
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Country
                      </label>

                      <input
                        name="country"
                        className="form-control"
                        value={
                          form.country
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Pincode
                      </label>

                      <input
                        name="pincode"
                        className="form-control"
                        value={
                          form.pincode
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>
                  </div>

                  {/* TRANSPORT / HOSTEL */}

                  <h6 className="fw-bold text-primary border-bottom pb-2">
                    🚌 Transport / Hostel
                  </h6>

                  <div className="row g-3 mb-4">
                    <div className="col-md-3">
                      <div className="form-check mt-4">
                        <input
                          type="checkbox"
                          name="busRequired"
                          className="form-check-input"
                          checked={
                            form.busRequired
                          }
                          onChange={
                            handleChange
                          }
                        />

                        <label className="form-check-label fw-bold">
                          Bus Required
                        </label>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Bus Route
                      </label>

                      <input
                        name="busRoute"
                        className="form-control"
                        value={
                          form.busRoute
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Pickup Point
                      </label>

                      <input
                        name="pickupPoint"
                        className="form-control"
                        value={
                          form.pickupPoint
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <div className="form-check mt-4">
                        <input
                          type="checkbox"
                          name="hostelRequired"
                          className="form-check-input"
                          checked={
                            form.hostelRequired
                          }
                          onChange={
                            handleChange
                          }
                        />

                        <label className="form-check-label fw-bold">
                          Hostel Required
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* FEES */}

                  <h6 className="fw-bold text-primary border-bottom pb-2">
                    💰 Fee Details
                  </h6>

                  <div className="row g-3 mb-4">
                    <div className="col-md-3">
                      <label className="form-label">
                        Fee Category
                      </label>

                      <select
                        name="feeCategory"
                        className="form-select"
                        value={
                          form.feeCategory
                        }
                        onChange={
                          handleChange
                        }
                      >
                        <option value="Monthly">
                          Monthly
                        </option>

                        <option value="Quarterly">
                          Quarterly
                        </option>

                        <option value="Half-Yearly">
                          Half-Yearly
                        </option>

                        <option value="Yearly">
                          Yearly
                        </option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Total Fee
                      </label>

                      <input
                        type="number"
                        name="totalFee"
                        className="form-control"
                        value={
                          form.totalFee
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Paid Fee
                      </label>

                      <input
                        type="number"
                        name="paidFee"
                        className="form-control"
                        value={
                          form.paidFee
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Pending Fee
                      </label>

                      <input
                        type="number"
                        name="pendingFee"
                        className="form-control"
                        value={
                          form.pendingFee
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">
                        Scholarship
                      </label>

                      <input
                        type="number"
                        name="scholarship"
                        className="form-control"
                        value={
                          form.scholarship
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>
                  </div>

                  {/* OTHER */}

                  <h6 className="fw-bold text-primary border-bottom pb-2">
                    📝 Other Details
                  </h6>

                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">
                        Emergency Contact Name
                      </label>

                      <input
                        name="emergencyContactName"
                        className="form-control"
                        value={
                          form.emergencyContactName
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Emergency Contact Number
                      </label>

                      <input
                        name="emergencyContactNumber"
                        className="form-control"
                        value={
                          form.emergencyContactNumber
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Previous School
                      </label>

                      <input
                        name="previousSchool"
                        className="form-control"
                        value={
                          form.previousSchool
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        TC Number
                      </label>

                      <input
                        name="tcNumber"
                        className="form-control"
                        value={
                          form.tcNumber
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Medical Condition
                      </label>

                      <input
                        name="medicalCondition"
                        className="form-control"
                        value={
                          form.medicalCondition
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Allergies
                      </label>

                      <input
                        name="allergies"
                        className="form-control"
                        value={
                          form.allergies
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
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

                        <option value="TRANSFERRED">
                          TRANSFERRED
                        </option>

                        <option value="COMPLETED">
                          COMPLETED
                        </option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        Remarks
                      </label>

                      <textarea
                        name="remarks"
                        className="form-control"
                        rows="3"
                        value={
                          form.remarks
                        }
                        onChange={
                          handleChange
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success fw-bold"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "💾 Update Student"
                      : "💾 Save Student"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;