import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ClassStudents() {

  const { classId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [className, setClassName] = useState("");

  useEffect(() => {
    loadStudents();
  }, [classId]);

  const loadStudents = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/students/class/${classId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load students (${response.status})`
        );
      }

      const data = await response.json();

      setStudents(data);

      /*
       * Get class name from the first student.
       * Later we can replace this with a dedicated
       * class API call.
       */
      if (data.length > 0) {

        setClassName(
          data[0].className ||
          data[0].classNameDisplay ||
          `Class ID ${classId}`
        );

      } else {

        setClassName(`Class ID ${classId}`);

      }

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load students. Please check whether the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff, #fff4e6, #fcecff)"
      }}
    >

      {/* Header */}

      <nav
        className="navbar navbar-dark shadow-sm"
        style={{
          background:
            "linear-gradient(90deg, #0d6efd, #6f42c1)"
        }}
      >

        <div className="container">

          <span className="navbar-brand fw-bold">
            🏫 KVR Kids Campus
          </span>

          <button
            className="btn btn-light fw-bold"
            onClick={() => navigate("/admin/classes")}
          >
            ← Classes
          </button>

        </div>

      </nav>


      {/* Page */}

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1
              className="fw-bold"
              style={{
                color: "#0d6efd"
              }}
            >
              👨‍🎓 Students
            </h1>

            <p className="text-muted mb-0">
              Students enrolled in {className}
            </p>

          </div>


          <Link
            to="/admin/classes"
            className="btn btn-outline-primary"
          >
            ← Back to Classes
          </Link>

        </div>


        {/* Error */}

        {error && (

          <div className="alert alert-danger shadow-sm">
            {error}
          </div>

        )}


        {/* Loading */}

        {loading && (

          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            >
            </div>

            <p className="mt-3 text-muted">
              Loading students...
            </p>

          </div>

        )}


        {/* Student list */}

        {!loading && !error && (

          <div className="card border-0 shadow-lg">

            <div
              className="card-header text-white d-flex justify-content-between align-items-center"
              style={{
                background:
                  "linear-gradient(90deg, #0d6efd, #6f42c1)"
              }}
            >

              <h4 className="mb-0">
                🎓 {className} — Student List
              </h4>

              <span className="badge bg-warning text-dark fs-6">
                {students.length} Students
              </span>

            </div>


            <div className="card-body p-0">

              {students.length === 0 ? (

                <div className="text-center py-5">

                  <div
                    style={{
                      fontSize: "60px"
                    }}
                  >
                    👨‍🎓
                  </div>

                  <h4 className="mt-3">
                    No students found
                  </h4>

                  <p className="text-muted">
                    No students are currently assigned
                    to this class.
                  </p>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead
                      style={{
                        background: "#dbeafe"
                      }}
                    >

                      <tr>

                        <th>#</th>

                        <th>Student ID</th>

                        <th>Roll No</th>

                        <th>Student Name</th>

                        <th>Gender</th>

                        <th>Academic Year</th>

                        <th>Status</th>

                        <th>Action</th>

                      </tr>

                    </thead>


                    <tbody>

                      {students.map((student, index) => (

                        <tr key={student.id}>

                          <td className="fw-bold">
                            {index + 1}
                          </td>

                          <td>

                            <span
                              className="badge bg-primary"
                            >
                              {student.admissionNo}
                            </span>

                          </td>

                          <td>
                            {student.rollNo || "-"}
                          </td>

                          <td>

                            <strong>
                              👦 {student.fullName}
                            </strong>

                          </td>

                          <td>
                            {student.gender || "-"}
                          </td>

                          <td>
                            {student.academicYear || "-"}
                          </td>

                          <td>

                            {student.status === "ACTIVE" ? (

                              <span className="badge bg-success">
                                ACTIVE
                              </span>

                            ) : (

                              <span className="badge bg-secondary">
                                {student.status}
                              </span>

                            )}

                          </td>

                          <td>

                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                navigate(
                                  `/admin/students/${student.id}`
                                )
                              }
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default ClassStudents;