import {
  FaBrain,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaFlask,
  FaUsers,
  FaSeedling
} from "react-icons/fa";

const methods = [
  {
    icon: <FaBrain />,
    title: "Activity-Based Learning",
    description:
      "Students learn through engaging activities, storytelling, games, and hands-on experiences."
  },
  {
    icon: <FaLaptopCode />,
    title: "Smart Digital Classrooms",
    description:
      "Interactive smart boards, multimedia lessons, and digital content make learning enjoyable."
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Experienced Teachers",
    description:
      "Qualified teachers provide individual attention and encourage every child to excel."
  },
  {
    icon: <FaFlask />,
    title: "Practical Learning",
    description:
      "Science experiments, projects, and real-world activities help students understand concepts."
  },
  {
    icon: <FaUsers />,
    title: "Collaborative Learning",
    description:
      "Students work together through group discussions, teamwork, and leadership activities."
  },
  {
    icon: <FaSeedling />,
    title: "Personality Development",
    description:
      "We build communication, confidence, discipline, creativity, and leadership skills."
  }
];

function TeachingMethodology() {
  return (
    <section id="methodology"  className="methodology-section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-badge">
            📘 Teaching Methodology
          </span>

          <h2 className="section-title">
            Learning Beyond the Classroom
          </h2>

          <p className="section-subtitle">
            Our teaching approach inspires curiosity,
            creativity, confidence, and lifelong learning.
          </p>

        </div>

        <div className="row g-4">

          {methods.map((item, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <div className="method-card">

                <div className="method-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TeachingMethodology;
