import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaMoneyBillWave,
  FaSyncAlt,
  FaDownload,
  FaTimes,
} from "react-icons/fa";

const API_BASE_URL = "/api";

function Fees() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const [form, setForm] = useState({
    studentId: "",
    classId: "",
    academicYear: "2026-2027",
    schoolFee: "",
    busFee: "",
    paidFee: "",
    paymentDate: "",
    remarks: "",
  });

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);

      const [feesResponse, studentsResponse, classesResponse] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/fees`),
          axios.get(`${API_BASE_URL}/students`),
          axios.get(`${API_BASE_URL}/classes`),
        ]);

      setFees(feesResponse.data || []);
      setStudents(studentsResponse.data || []);
      setClasses(classesResponse.data || []);
    } catch (error) {
      console.error("Failed to load fee data:", error);

      alert(
        "Unable to load fee data. Please make sure the backend is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FORM HANDLING
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleStudentChange = (event) => {
    const studentId = event.target.value;

    const selectedStudent = students.find(
      (student) => String(student.id) === String(studentId)
    );

    setForm((previous) => ({
      ...previous,
      studentId,
      classId: selectedStudent?.classId || "",
    }));
  };

  const resetForm = () => {
    setForm({
      studentId: "",
      classId: "",
      academicYear: "2026-2027",
      schoolFee: "",
      busFee: "",
      paidFee: "",
      paymentDate: "",
      remarks: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.studentId) {
      alert("Please select a student.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        studentId: Number(form.studentId),
        classId: form.classId ? Number(form.classId) : null,
        academicYear: form.academicYear,
        schoolFee: Number(form.schoolFee || 0),
        busFee: Number(form.busFee || 0),
        paidFee: Number(form.paidFee || 0),
        paymentDate: form.paymentDate || null,
        remarks: form.remarks || "",
      };

      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/fees/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/fees`,
          payload
        );
      }

      alert(
        editingId
          ? "Fee updated successfully."
          : "Fee created successfully."
      );

      resetForm();
      await loadAllData();
    } catch (error) {
      console.error("Failed to save fee:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to save fee.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (fee) => {
    setEditingId(fee.id);

    setForm({
      studentId: fee.studentId || "",
      classId: fee.classId || "",
      academicYear: fee.academicYear || "2026-2027",
      schoolFee: fee.schoolFee ?? "",
      busFee: fee.busFee ?? "",
      paidFee: fee.paidFee ?? "",
      paymentDate: fee.paymentDate || "",
      remarks: fee.remarks || "",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fee record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/fees/${id}`
      );

      alert("Fee deleted successfully.");

      await loadAllData();
    } catch (error) {
      console.error("Failed to delete fee:", error);

      alert("Failed to delete fee record.");
    }
  };

  // =========================================================
  // HELPERS
  // =========================================================

  const getStudent = (studentId) => {
    return students.find(
      (student) => Number(student.id) === Number(studentId)
    );
  };

  const getClass = (classId) => {
    return classes.find(
      (schoolClass) =>
        Number(schoolClass.id) === Number(classId)
    );
  };

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredFees = fees.filter((fee) => {
    const student = getStudent(fee.studentId);
    const schoolClass = getClass(fee.classId);

    const text = `
      ${student?.fullName || ""}
      ${student?.admissionNo || ""}
      ${schoolClass?.className || ""}
      ${schoolClass?.section || ""}
      ${fee.academicYear || ""}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const handleSearch = () => {
    setSearch(searchText.trim());
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearch("");
  };

  // =========================================================
  // DOWNLOAD CSV
  // =========================================================

  const escapeCsvValue = (value) => {
    const stringValue = String(value ?? "");

    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  const handleDownload = () => {
    if (filteredFees.length === 0) {
      alert("There are no fee records available to download.");
      return;
    }

    const headers = [
      "S.No",
      "Student Name",
      "Admission Number",
      "Class",
      "Section",
      "Academic Year",
      "School Fee",
      "Bus Fee",
      "Total Fee",
      "Paid Fee",
      "Pending Fee",
      "Payment Date",
      "Remarks",
    ];

    const rows = filteredFees.map((fee, index) => {
      const student = getStudent(fee.studentId);
      const schoolClass = getClass(fee.classId);

      return [
        index + 1,
        student?.fullName || `Student #${fee.studentId}`,
        student?.admissionNo || "-",
        schoolClass?.className || "-",
        schoolClass?.section || "-",
        fee.academicYear || "-",
        Number(fee.schoolFee || 0),
        Number(fee.busFee || 0),
        Number(fee.totalFee || 0),
        Number(fee.paidFee || 0),
        Number(fee.pendingFee || 0),
        fee.paymentDate || "-",
        fee.remarks || "",
      ];
    });

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row.map(escapeCsvValue).join(",")
      )
      .join("\r\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    link.download = `KVR-Kids-Campus-Fees-${today}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // SUMMARY
  // =========================================================

  const totalFees = fees.reduce(
    (sum, fee) =>
      sum + Number(fee.totalFee || 0),
    0
  );

  const totalPaid = fees.reduce(
    (sum, fee) =>
      sum + Number(fee.paidFee || 0),
    0
  );

  const totalPending = fees.reduce(
    (sum, fee) =>
      sum + Number(fee.pendingFee || 0),
    0
  );

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff, #fff7ed, #f5f0ff)",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">
            🏫 KVR Kids Campus
          </span>

          <a
            href="/admin/dashboard"
            className="btn btn-light fw-bold"
          >
            ← Admin Dashboard
          </a>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">

        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

          <div>
            <h1 className="fw-bold mb-1">
              💰 Fee Management
            </h1>

            <p className="text-muted mb-0">
              Manage student fees, payments and pending amounts.
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap">

            {/* DOWNLOAD BUTTON */}

            <button
              className="btn btn-success fw-bold"
              onClick={handleDownload}
              disabled={loading || filteredFees.length === 0}
            >
              <FaDownload className="me-2" />
              Download
            </button>

            {/* REFRESH BUTTON */}

            <button
              className="btn btn-outline-primary"
              onClick={loadAllData}
              disabled={loading}
            >
              <FaSyncAlt className="me-2" />
              Refresh
            </button>

            {/* ADD FEE BUTTON */}

            <button
              className="btn btn-primary fw-bold"
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  setShowForm(true);
                }
              }}
            >
              <FaPlus className="me-2" />
              {showForm ? "Close" : "Add Fee"}
            </button>

          </div>
        </div>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="row g-4 mb-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-muted">
                  Total Fee
                </div>

                <h2 className="fw-bold text-primary mb-0">
                  {formatAmount(totalFees)}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-muted">
                  Total Paid
                </div>

                <h2 className="fw-bold text-success mb-0">
                  {formatAmount(totalPaid)}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-muted">
                  Total Pending
                </div>

                <h2 className="fw-bold text-danger mb-0">
                  {formatAmount(totalPending)}
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        {showForm && (
          <div className="card border-0 shadow-lg mb-4">

            <div className="card-header bg-primary text-white">
              <h5 className="mb-0 fw-bold">
                {editingId
                  ? "✏️ Update Fee"
                  : "➕ Add New Fee"}
              </h5>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  {/* Student */}

                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Student
                    </label>

                    <select
                      name="studentId"
                      value={form.studentId}
                      onChange={handleStudentChange}
                      className="form-select"
                      required
                    >
                      <option value="">
                        -- Select Student --
                      </option>

                      {students.map((student) => (
                        <option
                          key={student.id}
                          value={student.id}
                        >
                          {student.admissionNo} -{" "}
                          {student.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Class */}

                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Class
                    </label>

                    <select
                      name="classId"
                      value={form.classId}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">
                        -- Select Class --
                      </option>

                      {classes.map((schoolClass) => (
                        <option
                          key={schoolClass.id}
                          value={schoolClass.id}
                        >
                          {schoolClass.className} -{" "}
                          Section {schoolClass.section}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Academic Year */}

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Academic Year
                    </label>

                    <input
                      type="text"
                      name="academicYear"
                      value={form.academicYear}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {/* School Fee */}

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      School Fee
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="schoolFee"
                      value={form.schoolFee}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="0"
                    />
                  </div>

                  {/* Bus Fee */}

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Bus Fee
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="busFee"
                      value={form.busFee}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="0"
                    />
                  </div>

                  {/* Paid */}

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Paid Fee
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="paidFee"
                      value={form.paidFee}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="0"
                    />
                  </div>

                  {/* Payment Date */}

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Payment Date
                    </label>

                    <input
                      type="date"
                      name="paymentDate"
                      value={form.paymentDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {/* Remarks */}

                  <div className="col-md-4">
                    <label className="form-label fw-bold">
                      Remarks
                    </label>

                    <input
                      type="text"
                      name="remarks"
                      value={form.remarks}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Optional"
                    />
                  </div>

                </div>

                <div className="mt-4 d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-success fw-bold"
                    disabled={saving}
                  >
                    <FaMoneyBillWave className="me-2" />

                    {saving
                      ? "Saving..."
                      : editingId
                        ? "Update Fee"
                        : "Save Fee"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body">

            <div className="row g-2">

              <div className="col-md-9">

                <div className="input-group">

                  <span className="input-group-text">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by student name, admission number, class..."
                    value={searchText}
                    onChange={(event) =>
                      setSearchText(event.target.value)
                    }
                    onKeyDown={handleSearchKeyDown}
                  />

                </div>

              </div>

              {/* SEARCH BUTTON */}

              <div className="col-md-2">

                <button
                  type="button"
                  className="btn btn-primary w-100 fw-bold"
                  onClick={handleSearch}
                >
                  <FaSearch className="me-2" />
                  Search
                </button>

              </div>

              {/* CLEAR BUTTON */}

              <div className="col-md-1">

                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={handleClearSearch}
                  title="Clear Search"
                >
                  <FaTimes />
                </button>

              </div>

            </div>

            {search && (
              <div className="mt-2 text-muted small">
                Showing results for:
                <strong className="ms-1">
                  "{search}"
                </strong>

                <span className="ms-2">
                  ({filteredFees.length} records)
                </span>
              </div>
            )}

          </div>
        </div>

        {/* =====================================================
            FEE TABLE
        ===================================================== */}

        <div className="card border-0 shadow-lg">

          <div className="card-header bg-white py-3">

            <div className="d-flex justify-content-between align-items-center">

              <h5 className="fw-bold mb-0">
                Fee Records
              </h5>

              <div className="d-flex align-items-center gap-2">

                <span className="badge bg-primary">
                  {filteredFees.length} Records
                </span>

                {/* DOWNLOAD BUTTON */}

                <button
                  type="button"
                  className="btn btn-sm btn-outline-success"
                  onClick={handleDownload}
                  disabled={filteredFees.length === 0}
                  title="Download fee records"
                >
                  <FaDownload className="me-1" />
                  Download
                </button>

              </div>

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
                  Loading fee records...
                </p>

              </div>

            ) : filteredFees.length === 0 ? (

              <div className="text-center py-5">

                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  💰
                </div>

                <h5 className="fw-bold mt-3">
                  No fee records found
                </h5>

                <p className="text-muted">
                  Click "Add Fee" to create the first fee
                  record.
                </p>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>
                      <th>#</th>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Academic Year</th>
                      <th>School Fee</th>
                      <th>Bus Fee</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Pending</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredFees.map((fee, index) => {

                      const student =
                        getStudent(fee.studentId);

                      const schoolClass =
                        getClass(fee.classId);

                      return (

                        <tr key={fee.id}>

                          <td>
                            {index + 1}
                          </td>

                          <td>

                            <div className="fw-bold">
                              {student?.fullName ||
                                `Student #${fee.studentId}`}
                            </div>

                            <small className="text-muted">
                              {student?.admissionNo || "-"}
                            </small>

                          </td>

                          <td>

                            {schoolClass?.className ||
                              "-"}

                            {schoolClass?.section &&
                              schoolClass.section !== "-" && (

                                <small className="text-muted d-block">

                                  Section{" "}
                                  {schoolClass.section}

                                </small>

                              )}

                          </td>

                          <td>
                            {fee.academicYear}
                          </td>

                          <td>
                            {formatAmount(
                              fee.schoolFee
                            )}
                          </td>

                          <td>
                            {formatAmount(
                              fee.busFee
                            )}
                          </td>

                          <td className="fw-bold">
                            {formatAmount(
                              fee.totalFee
                            )}
                          </td>

                          <td className="text-success fw-bold">
                            {formatAmount(
                              fee.paidFee
                            )}
                          </td>

                          <td className="text-danger fw-bold">
                            {formatAmount(
                              fee.pendingFee
                            )}
                          </td>

                          <td>

                            <div className="d-flex gap-2">

                              <button
                                className="btn btn-sm btn-outline-primary"
                                title="Edit"
                                onClick={() =>
                                  handleEdit(fee)
                                }
                              >
                                <FaEdit />
                              </button>

                              <button
                                className="btn btn-sm btn-outline-danger"
                                title="Delete"
                                onClick={() =>
                                  handleDelete(fee.id)
                                }
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Fees;