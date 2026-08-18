import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/admissions";

function Admissions() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Failed to load applications (${response.status})`
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
    id,
    status
  ) => {

    try {

      const response = await fetch(
        `${API_URL}/${id}/status?status=${status}`,
        {
          method: "PATCH"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to update application status."
        );
      }

      await loadApplications();

    } catch (err) {

      alert(
        err.message ||
        "Unable to update status."
      );
    }
  };

  const deleteApplication = async (id) => {

    const confirmed = window.confirm(
      "Delete this admission application?"
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
          "Unable to delete application."
        );
      }

      await loadApplications();

    } catch (err) {

      alert(
        err.message ||
        "Unable to delete application."
      );
    }
  };

  const badgeClass = (status) => {

    switch (status) {

      case "NEW":
        return "bg-primary";

      case "UNDER_REVIEW":
        return "bg-warning text-dark";

      case "APPROVED":
        return "bg-success";

      case "REJECTED":
        return "bg-danger";

      case "CONVERTED":
        return "bg-dark";

      default:
        return "bg-secondary";
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff, #fff4e6, #f4efff)"
      }}
    >

      <nav className="navbar navbar-dark bg-primary shadow-sm">

        <div className="container">

          <span className="navbar-brand fw-bold">
            🏫 KMR Kids Campus
          </span>

          <a
            href="/admin/dashboard"
            className="btn btn-light fw-bold"
          >
            ← Admin Dashboard
          </a>

        </div>

      </nav>

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1 className="fw-bold">
              📝 Admission Applications
            </h1>

            <p className="text-muted mb-0">
              Manage new admission applications
            </p>

          </div>

          <button
            className="btn btn-primary"
            onClick={loadApplications}
          >
            ↻ Refresh
          </button>

        </div>

        {loading && (
          <div className="card border-0 shadow-sm">

            <div className="card-body text-center p-5">

              <div
                className="spinner-border text-primary"
                role="status"
              />

              <p className="mt-3 mb-0">
                Loading applications...
              </p>

            </div>

          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          applications.length === 0 && (

            <div className="card border-0 shadow-sm">

              <div className="card-body text-center p-5">

                <div style={{ fontSize: "60px" }}>
                  📭
                </div>

                <h3 className="fw-bold mt-3">
                  No Applications
                </h3>

                <p className="text-muted">
                  No admission applications have been
                  submitted yet.
                </p>

              </div>

            </div>
          )}

        {!loading &&
          applications.length > 0 && (

            <div className="card border-0 shadow-lg">

              <div className="card-body p-0">

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                      <tr>

                        <th>
                          Application
                        </th>

                        <th>
                          Student
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
                          Status
                        </th>

                        <th>
                          Date
                        </th>

                        <th>
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {applications.map(
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

                              <span
                                className={`badge ${badgeClass(
                                  application.status
                                )}`}
                              >
                                {application.status}
                              </span>

                            </td>

                            <td>

                              {application.createdAt
                                ? new Date(
                                    application.createdAt
                                  ).toLocaleDateString()
                                : "-"}

                            </td>

                            <td>

                              <div className="d-flex gap-2">

                                <select
                                  className="form-select form-select-sm"
                                  value={application.status}
                                  onChange={(event) =>
                                    updateStatus(
                                      application.id,
                                      event.target.value
                                    )
                                  }
                                >

                                  <option value="NEW">
                                    New
                                  </option>

                                  <option value="UNDER_REVIEW">
                                    Under Review
                                  </option>

                                  <option value="APPROVED">
                                    Approved
                                  </option>

                                  <option value="REJECTED">
                                    Rejected
                                  </option>

                                  <option value="CONVERTED">
                                    Converted
                                  </option>

                                </select>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    deleteApplication(
                                      application.id
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

            </div>
          )}

      </div>

    </div>
  );
}

export default Admissions;