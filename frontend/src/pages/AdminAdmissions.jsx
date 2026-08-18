import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/admissions";

function AdminAdmissions() {

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");


  const loadApplications = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          "Unable to load admission applications."
        );
      }

      const data = await response.json();

      setApplications(data);

    } catch (err) {

      setError(
        err.message ||
        "Unable to load admission applications."
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {
    loadApplications();
  }, []);


  const updateStatus = async (
    application,
    status
  ) => {

    const action =
      status === "APPROVED"
        ? "approve"
        : "reject";

    const remarks = window.prompt(
      `Enter admin remarks for ${status}:`,
      ""
    );

    if (remarks === null) {
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/${application.id}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            adminRemarks: remarks
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to ${action} application.`
        );
      }

      await loadApplications();

    } catch (err) {

      window.alert(
        err.message ||
        "Operation failed."
      );
    }
  };


  const deleteApplication = async (
    application
  ) => {

    const confirmed =
      window.confirm(
        `Delete application ${application.applicationNo}?`
      );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/${application.id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete application."
        );
      }

      await loadApplications();

    } catch (err) {

      window.alert(
        err.message ||
        "Delete failed."
      );
    }
  };


  const filteredApplications =
    filter === "ALL"
      ? applications
      : applications.filter(
          (application) =>
            application.status === filter
        );


  const pendingCount =
    applications.filter(
      (application) =>
        application.status === "PENDING"
    ).length;

  const approvedCount =
    applications.filter(
      (application) =>
        application.status === "APPROVED"
    ).length;

  const rejectedCount =
    applications.filter(
      (application) =>
        application.status === "REJECTED"
    ).length;


  const statusBadge = (status) => {

    if (status === "APPROVED") {
      return "bg-success";
    }

    if (status === "REJECTED") {
      return "bg-danger";
    }

    return "bg-warning text-dark";
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff, #fff4e6, #f4efff)"
      }}
    >

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar navbar-dark bg-primary shadow-sm">

        <div className="container">

          <span className="navbar-brand fw-bold">
            🏫 KMR Kids Campus
          </span>


          <button
            className="btn btn-light fw-bold"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            ← Admin Dashboard
          </button>

        </div>

      </nav>


      <div className="container py-5">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1 className="fw-bold mb-1">
              📝 Admissions
            </h1>

            <p className="text-muted mb-0">
              Manage admission applications
            </p>

          </div>

          <button
            className="btn btn-outline-primary"
            onClick={loadApplications}
          >
            Refresh
          </button>

        </div>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="row g-3 mb-4">

          <div className="col-md-4">

            <div className="card border-0 shadow-sm">
              <div className="card-body">

                <small className="text-muted">
                  Pending
                </small>

                <h2 className="fw-bold text-warning">
                  {pendingCount}
                </h2>

              </div>
            </div>

          </div>


          <div className="col-md-4">

            <div className="card border-0 shadow-sm">
              <div className="card-body">

                <small className="text-muted">
                  Approved
                </small>

                <h2 className="fw-bold text-success">
                  {approvedCount}
                </h2>

              </div>
            </div>

          </div>


          <div className="col-md-4">

            <div className="card border-0 shadow-sm">
              <div className="card-body">

                <small className="text-muted">
                  Rejected
                </small>

                <h2 className="fw-bold text-danger">
                  {rejectedCount}
                </h2>

              </div>
            </div>

          </div>

        </div>


        {/* =================================================
            FILTER
        ================================================= */}

        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body">

            <div className="d-flex flex-wrap gap-2">

              {[
                ["ALL", "All"],
                ["PENDING", "Pending"],
                ["APPROVED", "Approved"],
                ["REJECTED", "Rejected"]
              ].map(([value, label]) => (

                <button
                  key={value}
                  type="button"
                  className={
                    filter === value
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() =>
                    setFilter(value)
                  }
                >
                  {label}
                </button>

              ))}

            </div>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            />

            <p className="mt-3 text-muted">
              Loading applications...
            </p>

          </div>

        ) : filteredApplications.length === 0 ? (

          <div className="card border-0 shadow-sm">

            <div className="card-body text-center p-5">

              <div style={{ fontSize: "60px" }}>
                📭
              </div>

              <h4 className="fw-bold mt-3">
                No Applications
              </h4>

              <p className="text-muted">
                No admission applications found.
              </p>

            </div>

          </div>

        ) : (

          <div className="card border-0 shadow-sm">

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">

                  <tr>

                    <th>
                      Application
                    </th>

                    <th>
                      Child
                    </th>

                    <th>
                      Class
                    </th>

                    <th>
                      Parent
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Date
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

                  {filteredApplications.map(
                    (application) => (

                      <tr key={application.id}>

                        <td>

                          <strong>
                            {application.applicationNo}
                          </strong>

                        </td>


                        <td>

                          <strong>
                            {application.firstName}{" "}
                            {application.lastName || ""}
                          </strong>

                        </td>


                        <td>
                          {application.applyingForClass}
                        </td>


                        <td>
                          {application.fatherName}
                        </td>


                        <td>
                          {application.parentMobile}
                        </td>


                        <td>
                          {application.applicationDate}
                        </td>


                        <td>

                          <span
                            className={`badge ${statusBadge(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>

                        </td>


                        <td>

                          <div className="d-flex flex-wrap gap-1">

                            {application.status ===
                              "PENDING" && (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success"
                                  onClick={() =>
                                    updateStatus(
                                      application,
                                      "APPROVED"
                                    )
                                  }
                                >
                                  Approve
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    updateStatus(
                                      application,
                                      "REJECTED"
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            )}


                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deleteApplication(
                                  application
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminAdmissions;