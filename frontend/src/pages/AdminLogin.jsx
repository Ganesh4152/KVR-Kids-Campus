import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid username or password.");
        return;
      }

      // Store logged-in admin information
      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem("adminLoggedIn", "true");

      // Go to admin dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Admin login error:", err);
      setError(
        "Unable to connect to the backend. Please make sure Spring Boot is running."
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
          "linear-gradient(135deg, #eef7ff, #fff4e6, #f8edff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >

        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #1565c0, #6a1b9a)",
            color: "white",
            textAlign: "center",
            padding: "35px 25px",
          }}
        >
          <div
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              background: "white",
              margin: "0 auto 15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "38px",
            }}
          >
            👨‍💼
          </div>

          <h2 className="fw-bold mb-2">
            Admin Login
          </h2>

          <div style={{ fontSize: "18px" }}>
            KVR Kids Campus
          </div>

          <div style={{ fontSize: "14px", marginTop: "5px" }}>
            Indian EM School - Vayalpadu
          </div>
        </div>

        {/* Login Form */}
        <div style={{ padding: "35px" }}>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Username */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                👤 Admin Username
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-bold">
                🔐 Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              className="btn btn-lg w-100 text-white fw-bold"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(90deg, #1976d2, #6a1b9a)",
                border: "none",
                borderRadius: "12px",
                padding: "13px",
              }}
            >
              {loading
                ? "Logging in..."
                : "🔐 Admin Login"}
            </button>

          </form>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link
              to="/"
              className="btn btn-outline-primary"
              style={{
                borderRadius: "10px",
                padding: "10px 25px",
              }}
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;