import heroBanner from "../assets/images/kvr-hero-banner.png";
import HeroDecorations from "./HeroDecorations";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">

      <HeroDecorations />

      <div className="container">

        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-lg-6">

<Link
  to="/admissions"
  className="hero-badge text-decoration-none"
>
  📢 Admissions Open 2027 - 2028
</Link>
            <h1 className="hero-title">
              Welcome To
              <br />
              <span>KVR Kids Campus</span>
            </h1>

            <h3 className="hero-subtitle">
              Indian EM School
            </h3>

            <p className="hero-description">
              Learning Today...<br />
              Leading Tomorrow...
              <br /><br />
              We provide quality education, activity-based learning,
              experienced teachers, modern classrooms, and joyful
              learning for every child.
            </p>

            <div className="hero-buttons">


<Link
  to="/admissions"
  className="btn btn-warning btn-lg me-3"
>
  Apply Now
</Link>

              <button className="btn btn-outline-light btn-lg">
                Explore Campus
              </button>
            </div>

            <div className="hero-stats">

              <div className="stat-card">
                <h2>500+</h2>
                <p>Students</p>
              </div>

              <div className="stat-card">
                <h2>40+</h2>
                <p>Teachers</p>
              </div>

              <div className="stat-card">
                <h2>15+</h2>
                <p>Years</p>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center">

            <img
              src={heroBanner}
              alt="Happy Kids"
              className="hero-image img-fluid"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
