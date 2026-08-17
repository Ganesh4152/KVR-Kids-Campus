import { Link } from "react-router-dom";
import { FaSchool } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">

      <div className="container">

        <Link className="navbar-brand fw-bold text-primary" to="/">
          <FaSchool className="me-2" />
          KVR Kids Campus

          <div
            style={{
              fontSize: "12px",
              color: "#666"
            }}
          >
            Indian EM School - Vayalpadu 517299
          </div>

        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/academics">
                Academics
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admissions">
                Admissions
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

          </ul>

          <Link
  className="btn btn-warning"
  to="/student/login"
>
  🎓 Student Login
</Link>

<Link
    to="/admin/login"
    className="btn btn-primary"
  >
    👨‍💼 Admin Login
  </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
