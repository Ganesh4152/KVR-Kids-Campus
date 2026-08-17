import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth/student-login";

function StudentLogin() {
  const navigate = useNavigate();

  const [admissionNo, setAdmissionNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const admissionId = admissionNo.trim();

    if (!admissionId) {
      setError("Please enter your Admission ID.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admissionNo: admissionId,
          password: password,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "Invalid Admission ID or password."
        );
      }

      if (!data.student) {
        throw new Error(
          "Login successful, but student information was not returned."
        );
      }

      /*
       * Clear old student session first.
       */
      localStorage.removeItem("student");
      localStorage.removeItem("studentData");
      localStorage.removeItem("studentLoggedIn");
      localStorage.removeItem("studentAdmissionNo");

      /*
       * Save the SAME key used by StudentDashboard.
       */
      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      localStorage.setItem(
        "studentLoggedIn",
        "true"
      );

      localStorage.setItem(
        "studentAdmissionNo",
        data.student.admissionNo || admissionId
      );

      /*
       * Also keep studentData for compatibility
       * with any existing code.
       */
      localStorage.setItem(
        "studentData",
        JSON.stringify(data.student)
      );

      /*
       * Go to dashboard.
       */
      navigate("/student/dashboard", {
        replace: true,
      });

    } catch (err) {
      console.error("Student login error:", err);

      setError(
        err.message || "Unable to login."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eef7ff 0%, #fff4e6 50%, #fcecff 100%)",
        padding: "30px",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "460px",
          borderRadius: "22px",
          overflow: "hidden",
        }}
      >

        {/* Header */}

        <div
          style={{
            background:
              "linear-gradient(90deg, #0d6efd, #6f42c1)",
            color: "white",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            🎓
          </div>

          <h2 className="fw-bold mb-2">
            Student Login
          </h2>

          <p className="mb-0">
            KVR Kids Campus
          </p>
        </div>

        {/* Form */}

        <div className="card-body p-4">

          {error && (
            <div className="alert alert-danger">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Admission ID */}

            <div className="mb-3">

              <label className="form-label fw-bold">
                Admission ID
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Example: KVR2026001"
                value={admissionNo}
                onChange={(e) =>
                  setAdmissionNo(e.target.value)
                }
                autoComplete="username"
                required
              />

            </div>

            {/* Password */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
                required
              />

            </div>

            {/* Login */}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 fw-bold"
              disabled={loading}
            >
              {loading
                ? "🔄 Logging in..."
                : "🔐 Student Login"}
            </button>

          </form>

          {/* Default password */}

          <div className="alert alert-info mt-4 mb-0">

            <div className="fw-bold">
              🔑 Student Login Details
            </div>

            <div className="small mt-2">
              Username: Admission ID
            </div>

            <div className="small">
              Password: student123
            </div>

          </div>

          {/* Admin Login */}

          <div className="text-center mt-4">

            <Link
              to="/admin/login"
              className="text-decoration-none"
            >
              ← Admin Login
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentLogin;