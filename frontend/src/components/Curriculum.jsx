import {
  FaBaby,
  FaBookOpen,
  FaGraduationCap,
  FaLaptop,
  FaPalette,
  FaSchool
} from "react-icons/fa";

function Curriculum() {
  return (
    <section id="curriculum" className="curriculum-section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-badge">
            📚 Curriculum
          </span>

          <h2 className="section-title">
            Learning for Every Stage
          </h2>

          <p className="section-subtitle">
            Our curriculum is designed to help every child grow
            academically, creatively, physically, and socially.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-lg-4 col-md-6">
            <div className="curriculum-card">
              <FaBaby className="curriculum-icon" />
              <h4>Nursery & Pre-Primary</h4>
              <p>Play-based learning that develops creativity, language, and social skills.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="curriculum-card">
              <FaBookOpen className="curriculum-icon" />
              <h4>Primary School</h4>
              <p>Strong foundation in Mathematics, English, Science, and General Knowledge.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="curriculum-card">
              <FaSchool className="curriculum-icon" />
              <h4>Middle School</h4>
              <p>Activity-based learning with practical projects and teamwork.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="curriculum-card">
              <FaGraduationCap className="curriculum-icon" />
              <h4>High School</h4>
              <p>Board exam preparation, career guidance, and academic excellence.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="curriculum-card">
              <FaLaptop className="curriculum-icon" />
              <h4>Digital Learning</h4>
              <p>Smart classrooms with interactive technology and digital resources.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="curriculum-card">
              <FaPalette className="curriculum-icon" />
              <h4>Co-Curricular Activities</h4>
              <p>Music, dance, arts, sports, yoga, and cultural activities for all students.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Curriculum;
