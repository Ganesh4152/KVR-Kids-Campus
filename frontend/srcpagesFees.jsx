import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMoneyBillWave,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import "../styles/fees.css";

const API_URL = "http://localhost:8080/api/fees";

function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadFees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      setFees(response.data);
    } catch (err) {
      console.error("Failed to load fees:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load fee records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  const filteredFees = fees.filter((fee) => {
    const searchText = search.toLowerCase();

    return (
      String(fee.id || "").includes(searchText) ||
      String(fee.studentId || "").includes(searchText) ||
      String(fee.admissionNo || "").toLowerCase().includes(searchText) ||
      String(fee.studentName || "").toLowerCase().includes(searchText)
    );
  });

  const totalFee = filteredFees.reduce(
    (sum, fee) => sum + Number(fee.totalFee || 0),
    0
  );

  const paidFee = filteredFees.reduce(
    (sum, fee) => sum + Number(fee.paidFee || 0),
    0
  );

  const pendingFee = filteredFees.reduce(
    (sum, fee) => sum + Number(fee.pendingFee || 0),
    0
  );

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  return (
    <div className="fees-page">

      {/* HEADER */}
      <div className="fees-header">
        <div>
          <div className="fees-title-row">
            <FaMoneyBillWave className="fees-title-icon" />

            <div>
              <h1>Fee Management</h1>

              <p>
                Manage student fees, payments and pending amounts
              </p>
            </div>
          </div>
        </div>

        <button
          className="btn btn-light shadow-sm"
          onClick={loadFees}
          disabled={loading}
        >
          <FaSyncAlt
            className={loading ? "spin-icon" : ""}
          />{" "}
          Refresh
        </button>
      </div>

      <div className="container-fluid py-4">

        {/* SUMMARY CARDS */}
        <div className="row g-4 mb-4">

          <div className="col-md-4">
            <div className="fee-summary-card total-card">
              <span>Total Fee</span>
              <strong>{formatCurrency(totalFee)}</strong>
              <small>
                {filteredFees.length} fee record(s)
              </small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="fee-summary-card paid-card">
              <span>Paid Fee</span>
              <strong>{formatCurrency(paidFee)}</strong>
              <small>
                Amount collected
              </small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="fee-summary-card pending-card">
              <span>Pending Fee</span>
              <strong>{formatCurrency(pendingFee)}</strong>
              <small>
                Amount remaining
              </small>
            </div>
          </div>

        </div>

        {/* SEARCH */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">

            <div className="fees-search">

              <FaSearch />

              <input
                type="text"
                className="form-control"
                placeholder="Search by student name, admission number or student ID..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* TABLE */}
        <div className="card border-0 shadow-sm">

          <div className="card-header bg-white border-0 py-3">

            <h5 className="mb-0 fw-bold">
              Fee Records
            </h5>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Admission No</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Academic Year</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Pending</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5"
                    >
                      Loading fee records...
                    </td>
                  </tr>

                ) : filteredFees.length === 0 ? (

                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-5 text-muted"
                    >
                      No fee records found.
                    </td>
                  </tr>

                ) : (

                  filteredFees.map((fee) => (

                    <tr key={fee.id}>

                      <td>
                        #{fee.id}
                      </td>

                      <td>
                        <strong>
                          {fee.admissionNo || "-"}
                        </strong>
                      </td>

                      <td>
                        {fee.studentName || "-"}
                      </td>

                      <td>
                        {fee.className || fee.classId || "-"}
                      </td>

                      <td>
                        {fee.academicYear || "-"}
                      </td>

                      <td>
                        {formatCurrency(fee.totalFee)}
                      </td>

                      <td className="text-success fw-bold">
                        {formatCurrency(fee.paidFee)}
                      </td>

                      <td className="text-danger fw-bold">
                        {formatCurrency(fee.pendingFee)}
                      </td>

                      <td>

                        {Number(fee.pendingFee || 0) === 0 ? (

                          <span className="badge bg-success">
                            PAID
                          </span>

                        ) : (

                          <span className="badge bg-warning text-dark">
                            PENDING
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Fees;
