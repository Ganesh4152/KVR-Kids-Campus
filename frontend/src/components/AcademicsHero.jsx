import { Link } from "react-router-dom";
import heroImage from "../assets/images/academics/academics-hero.png";

function AcademicsHero() {
  return (
    <section id="hero" className="academics-hero">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">

            <span className="academics-badge">
              📚 Excellence in Education
            </span>

            <h1 className="academics-title">
              Academics at
              <br />
              <span>KVR Kids Campus</span>
            </h1>

            <p className="academics-description">
              We provide a strong academic foundation through
              experienced teachers, digital classrooms,
              practical learning, and activity-based education
              from Nursery to Grade X.
            </p>

            <Link
              to="/admissions"
              className="btn btn-warning btn-lg"
            >
              Apply for Admission
            </Link>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src={heroImage}
              alt="Academics"
              className="academics-image img-fluid"
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default AcademicsHero;
