import { Link } from "react-router-dom";
import aboutHero from "../assets/images/about/about-hero.png";

function AboutHero() {
  return (
    <section className="about-hero">

      <div className="container">

        <div className="row align-items-center">

          {/* Left */}

          <div className="col-lg-6">

            <span className="about-badge">
              🏫 About Our School
            </span>

            <h1 className="about-title">
              Welcome to
              <br />
              <span>KVR Kids Campus</span>
            </h1>

            <h3 className="about-subtitle">
              Indian EM School
            </h3>

            <p className="about-description">

              KVR Kids Campus is committed to providing
              quality education with modern teaching methods,
              experienced faculty, digital classrooms,
              sports, arts, and value-based learning.

            </p>

            <div className="about-buttons">

              <Link
                to="/admissions"
                className="btn btn-warning btn-lg me-3"
              >
                Admissions Open
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-light btn-lg"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="col-lg-6 text-center">

            <img
              src={aboutHero}
              alt="About KVR Kids Campus"
              className="about-image img-fluid"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutHero;
