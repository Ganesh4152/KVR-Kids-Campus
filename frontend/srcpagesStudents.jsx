import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:8080/api/students";

function Students() {
  const [searchParams] = useSearchParams();

  const classId = searchParams.get("classId");
  const className = searchParams.get("className");
  const section = searchParams.get("section");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD STUDENTS
  // =========================================================

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      let url = API_URL;

      if (classId) {
        url = `${API_URL}/class/${classId}`;
      }

      console.log("Loading students from:", url);

      const response = await fetch(url);

      console.log("Student API status:", response.status);

      if (!response.ok) {
        throw new Error(
          `Student API returned HTTP ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Students API response:", data);

      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.warn(
          "Student API did not return an array:",
          data
        );

        setStudents([]);
      }
    } catch (err) {
      console.error("Student loading error:", err);

      setError(
        "Unable to load students. Please make sure the Spring Boot backend is running."
      );

      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD WHEN CLASS ID CHANGES
  // =========================================================

  useEffect(() => {
    loadStudents();
  }, [classId]);

  // =========================================================
  // HELPER FUNCTIONS
  // =========================================================

  const getStudentName = (student) => {
    if (!student) {
      return "-";
    }

    if (student.studentName) {
      return student.studentName;
    }

    if (student.name) {
      return student.name;
    }

    const firstName = student.firstName || "";
    const lastName = student.lastName || "";

    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || "-";
  };

  const getAdmissionNumber = (student) => {
    return (
      student?.admissionNo ||
      student?.admissionNumber ||
      student?.studentId ||
      "-"
    );
  };

  const getRollNumber = (student) => {
    return (
      student?.rollNo ||
      student?.rollNumber ||
      "-"
    );
  };

  const getGender = (student) => {
    return student?.gender || "-";
  };

  const getAcademicYear = (student) => {
    return (
      student?.academicYear ||
      "2026-2027"
    );
  };

  const getStatus = (student) => {
    return (
      student?.status ||
      student?.studentStatus ||
      "ACTIVE"
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
      ===================================================== */}

      <nav
        style={{
          background:
            "linear-gradient(90deg, #0d6efd, #6f42c1)",
          padding: "16px 0",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="container d-flex justify-content-between align-items-center"
        >
          <Link
            to="/admin/dashboard"
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            🏫 KVR Kids Campus
          </Link>

          <Link
            to="/admin/classes"
            className="btn btn-light fw-bold"
          >
            ← Back to Classes
          </Link>
        </div>
      </nav>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="container py-5">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="d-flex justify-content-between align-items-center mb-4"
          style={{
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#0d6efd",
                fontWeight: "800",
                marginBottom: "8px",
              }}
            >
              👨‍🎓 Students
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "#555",
                marginBottom: 0,
              }}
            >
              {className
                ? `Students in ${className}`
                : "Manage school students"}
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "12px 20px",
              borderRadius: "30px",
              boxShadow:
                "0 3px 12px rgba(0,0,0,0.1)",
              fontWeight: "700",
              color: "#0d6efd",
            }}
          >
            👥 {students.length} Students
          </div>
        </div>

        {/* ===================================================
            SELECTED CLASS INFORMATION
        =================================================== */}

        {classId && (
          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(90deg, #0d6efd, #6610f2)",
                color: "white",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <h4
                    className="mb-1"
                    style={{
                      fontWeight: "800",
                    }}
                  >
                    🎓 {className || "Selected Class"}
                  </h4>

                  <div>
                    Class ID: {classId}

                    {section &&
                      section !== "-" && (
                        <>
                          {" "}
                          | Section: {section}
                        </>
                      )}
                  </div>
                </div>

                <div>
                  <span className="badge bg-warning text-dark fs-6">
                    {students.length} Students
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="alert alert-danger shadow-sm">
            <div className="fw-bold mb-2">
              ⚠️ Unable to load students
            </div>

            <div>{error}</div>

            <button
              type="button"
              className="btn btn-danger btn-sm mt-3"
              onClick={loadStudents}
            >
              🔄 Try Again
            </button>
          </div>
        )}

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <div
            className="card border-0 shadow-sm text-center p-5"
            style={{
              borderRadius: "18px",
            }}
          >
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{
                width: "3rem",
                height: "3rem",
              }}
            />

            <h5 className="fw-bold">
              Loading students...
            </h5>

            <p className="text-muted mb-0">
              Please wait while we fetch student information.
            </p>
          </div>
        )}

        {/* ===================================================
            NO STUDENTS
        =================================================== */}

        {!loading &&
          !error &&
          students.length === 0 && (
            <div
              className="card border-0 shadow-sm text-center p-5"
              style={{
                borderRadius: "18px",
                background: "white",
              }}
            >
              <div
                style={{
                  fontSize: "70px",
                }}
              >
                🎒
              </div>

              <h3 className="fw-bold mt-3">
                No Students Found
              </h3>

              <p className="text-muted">
                {classId
                  ? `There are no students assigned to ${
                      className || "this class"
                    } yet.`
                  : "There are no students available yet."}
              </p>

              {classId && (
                <div className="mt-3">
                  <Link
                    to="/admin/classes"
                    className="btn btn-primary fw-bold"
                  >
                    ← Back to Classes
                  </Link>
                </div>
              )}
            </div>
          )}

        {/* ===================================================
            STUDENT LIST
        =================================================== */}

        {!loading &&
          !error &&
          students.length > 0 && (
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >
              {/* TABLE HEADER */}

              <div
                className="card-header"
                style={{
                  background: "white",
                  padding: "20px",
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <h4 className="fw-bold mb-0">
                    📋 Student List
                  </h4>

                  <span className="badge bg-primary fs-6">
                    {students.length} Students
                  </span>
                </div>
              </div>

              {/* TABLE */}

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">

                  <thead
                    style={{
                      background: "#dbeafe",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        #
                      </th>

                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Admission No
                      </th>

                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Student Name
                      </th>

                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Roll No
                      </th>

                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Gender
                      </th>

                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Academic Year
                      </th>

                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Status
                      </th>

                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map(
                      (student, index) => {
                        const status =
                          getStatus(student);

                        const isActive =
                          String(status).toUpperCase() ===
                          "ACTIVE";

                        return (
                          <tr
                            key={
                              student.id ||
                              student.studentId ||
                              index
                            }
                          >
                            {/* NUMBER */}

                            <td className="fw-bold">
                              {index + 1}
                            </td>

                            {/* ADMISSION NUMBER */}

                            <td>
                              <span
                                className="fw-bold text-primary"
                              >
                                {getAdmissionNumber(
                                  student
                                )}
                              </span>
                            </td>

                            {/* STUDENT NAME */}

                            <td>
                              <div
                                style={{
                                  fontWeight: "700",
                                  color: "#212529",
                                }}
                              >
                                🎓{" "}
                                {getStudentName(
                                  student
                                )}
                              </div>
                            </td>

                            {/* ROLL NUMBER */}

                            <td>
                              {getRollNumber(
                                student
                              )}
                            </td>

                            {/* GENDER */}

                            <td>
                              {getGender(student)}
                            </td>

                            {/* ACADEMIC YEAR */}

                            <td>
                              {getAcademicYear(
                                student
                              )}
                            </td>

                            {/* STATUS */}

                            <td>
                              {isActive ? (
                                <span className="badge bg-success">
                                  ACTIVE
                                </span>
                              ) : (
                                <span className="badge bg-danger">
                                  {String(status).toUpperCase()}
                                </span>
                              )}
                            </td>

                            {/* ACTION */}

                            <td>
                              {student.id ? (
                                <Link
                                  to={`/admin/students/${student.id}`}
                                  className="btn btn-sm btn-outline-primary"
                                  title="View Student"
                                >
                                  👁️
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary"
                                  disabled
                                >
                                  👁️
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* ===================================================
            INFORMATION CARD
        =================================================== */}

        <div
          className="card border-0 shadow-sm mt-4"
          style={{
            borderRadius: "18px",
          }}
        >
          <div className="card-body">
            <div className="row text-center">

              <div className="col-md-4 mb-3 mb-md-0">
                <div
                  style={{
                    fontSize: "40px",
                  }}
                >
                  🎓
                </div>

                <h6 className="fw-bold">
                  Selected Class
                </h6>

                <p className="text-muted small mb-0">
                  {className
                    ? `${className}${
                        section &&
                        section !== "-"
                          ? ` - Section ${section}`
                          : ""
                      }`
                    : "All Students"}
                </p>
              </div>

              <div className="col-md-4 mb-3 mb-md-0">
                <div
                  style={{
                    fontSize: "40px",
                  }}
                >
                  👨‍🎓
                </div>

                <h6 className="fw-bold">
                  Student Records
                </h6>

                <p className="text-muted small mb-0">
                  Students are loaded directly
                  from the Spring Boot backend.
                </p>
              </div>

              <div className="col-md-4">
                <div
                  style={{
                    fontSize: "40px",
                  }}
                >
                  📊
                </div>

                <h6 className="fw-bold">
                  Student Management
                </h6>

                <p className="text-muted small mb-0">
                  Attendance, fees and marks can
                  be connected to these records.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Students;