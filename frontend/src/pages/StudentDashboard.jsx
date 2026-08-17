import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    try {
      const storedStudent = localStorage.getItem("student");
      const storedStudentData = localStorage.getItem("studentData");

      let student = null;

      if (storedStudent) {
        student = JSON.parse(storedStudent);
      } else if (storedStudentData) {
        student = JSON.parse(storedStudentData);
      }

      if (!student || !student.admissionNo) {
        localStorage.removeItem("student");
        localStorage.removeItem("studentData");
        localStorage.removeItem("studentLoggedIn");
        localStorage.removeItem("studentAdmissionNo");

        navigate("/student/login", { replace: true });
        return;
      }

      setStudentData(student);
    } catch (error) {
      console.error("Student session error:", error);

      localStorage.removeItem("student");
      localStorage.removeItem("studentData");
      localStorage.removeItem("studentLoggedIn");
      localStorage.removeItem("studentAdmissionNo");

      navigate("/student/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("studentData");
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("studentAdmissionNo");

    navigate("/student/login", {
      replace: true,
    });
  };

  const goToAdminLogin = () => {
    navigate("/admin/login");
  };

  if (!studentData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #eef7ff 0%, #fff4e6 50%, #fcecff 100%)",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          />

          <p className="mt-3 text-muted">
            Loading student dashboard...
          </p>
        </div>
      </div>
    );
  }

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
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">

            <div
              style={{
                color: "white",
                fontSize: "22px",
                fontWeight: "700",
              }}
            >
              🏫 KVR Kids Campus
            </div>

            <div className="d-flex gap-2">

              <button
                className="btn btn-light fw-bold"
                onClick={goToAdminLogin}
              >
                ⚙️ Admin Login
              </button>

              <button
                className="btn btn-warning fw-bold"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}

      <div className="container py-5">

        {/* WELCOME */}

        <div
          className="card border-0 shadow-lg mb-4"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(90deg, #0d6efd, #6f42c1)",
              color: "white",
              padding: "30px",
            }}
          >
            <div className="row align-items-center">

              <div className="col-md-8">

                <div
                  style={{
                    fontSize: "18px",
                    opacity: 0.9,
                  }}
                >
                  🎓 Student Portal
                </div>

                <h1 className="fw-bold mt-2 mb-2">
                  Welcome, {studentData.fullName || "Student"}
                </h1>

                <p className="mb-0">
                  KVR Kids Campus
                </p>

              </div>

              <div className="col-md-4 text-md-end mt-3 mt-md-0">

                <div
                  className="bg-white text-primary d-inline-block p-3"
                  style={{
                    borderRadius: "15px",
                  }}
                >
                  <div className="small">
                    Admission ID
                  </div>

                  <div className="fw-bold fs-5">
                    {studentData.admissionNo}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* STUDENT INFORMATION */}

        <div className="row g-4">

          {/* STUDENT */}

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <h5 className="fw-bold">
                  👨‍🎓 Student Details
                </h5>

                <hr />

                <p>
                  <strong>Name:</strong>{" "}
                  {studentData.fullName || "-"}
                </p>

                <p>
                  <strong>Admission ID:</strong>{" "}
                  {studentData.admissionNo || "-"}
                </p>

                <p>
                  <strong>Roll No:</strong>{" "}
                  {studentData.rollNo || "-"}
                </p>

                <p>
                  <strong>Gender:</strong>{" "}
                  {studentData.gender || "-"}
                </p>

                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {studentData.dateOfBirth
                    ? new Date(
                        studentData.dateOfBirth
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>
            </div>
          </div>

          {/* CLASS */}

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <h5 className="fw-bold">
                  🏫 Class Information
                </h5>

                <hr />

                <p>
                  <strong>Class:</strong>{" "}
                  {studentData.className ||
                    studentData.classId ||
                    "-"}
                </p>

                <p>
                  <strong>Section:</strong>{" "}
                  {studentData.section || "-"}
                </p>

                <p>
                  <strong>Academic Year:</strong>{" "}
                  {studentData.academicYear || "-"}
                </p>

                <p>
                  <strong>Admission Date:</strong>{" "}
                  {studentData.admissionDate
                    ? new Date(
                        studentData.admissionDate
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>
            </div>
          </div>

          {/* PARENT */}

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <h5 className="fw-bold">
                  👨‍👩‍👦 Parent Details
                </h5>

                <hr />

                <p>
                  <strong>Father:</strong>{" "}
                  {studentData.fatherName || "-"}
                </p>

                <p>
                  <strong>Mother:</strong>{" "}
                  {studentData.motherName || "-"}
                </p>

                <p>
                  <strong>Mobile:</strong>{" "}
                  {studentData.parentMobile || "-"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {studentData.parentEmail || "-"}
                </p>

              </div>
            </div>
          </div>

          {/* ATTENDANCE */}

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <h5 className="fw-bold">
                  📅 Attendance
                </h5>

                <hr />

                <p className="text-muted">
                  Attendance details will appear here.
                </p>

                <button
                  className="btn btn-primary"
                  disabled
                >
                  View Attendance
                </button>

              </div>
            </div>
          </div>

          {/* FEES */}

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <h5 className="fw-bold">
                  💰 Fees
                </h5>

                <hr />

                <p className="text-muted">
                  Pending fee details will appear here.
                </p>

                <button
                  className="btn btn-warning"
                  disabled
                >
                  View Fees
                </button>

              </div>
            </div>
          </div>

          {/* MARKS */}

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <h5 className="fw-bold">
                  📊 Marks Memo
                </h5>

                <hr />

                <p className="text-muted">
                  Examination marks will appear here.
                </p>

                <button
                  className="btn btn-success"
                  disabled
                >
                  View Marks
                </button>

              </div>
            </div>
          </div>

          {/* TEACHER */}

          <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">

                <h5 className="fw-bold">
                  👨‍🏫 Class Teacher
                </h5>

                <hr />

                <p className="text-muted">
                  Class teacher details will appear here.
                </p>

                <button
                  className="btn btn-info"
                  disabled
                >
                  View Teacher
                </button>

              </div>
            </div>
          </div>

        </div>

        {/* ADMIN DASHBOARD */}

        <div
          className="card border-0 shadow-lg mt-5"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="card-body text-center p-4">

            <h4 className="fw-bold">
              ⚙️ Administration
            </h4>

            <p className="text-muted">
              School administrators can manage students,
              classes and admissions from the Admin Dashboard.
            </p>

            <button
              className="btn btn-primary btn-lg fw-bold"
              onClick={goToAdminLogin}
            >
              ⚙️ Go to Admin Login
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;