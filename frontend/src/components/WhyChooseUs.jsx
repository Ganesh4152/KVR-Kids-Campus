import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBus,
  FaLaptopCode,
  FaFutbol,
  FaMusic
} from "react-icons/fa";

function WhyChooseUs() {

  const features = [
    {
      icon: <FaChalkboardTeacher size={50} />,
      title: "Smart Classrooms",
      description:
        "Interactive smart classrooms with digital teaching tools."
    },
    {
      icon: <FaUserGraduate size={50} />,
      title: "Experienced Teachers",
      description:
        "Dedicated and experienced teachers who inspire every child."
    },
    {
      icon: <FaBus size={50} />,
      title: "Safe Transport",
      description:
        "GPS-enabled buses with trained drivers and attendants."
    },
    {
      icon: <FaLaptopCode size={50} />,
      title: "Digital Learning",
      description:
        "Modern computer labs and technology-driven education."
    },
    {
      icon: <FaFutbol size={50} />,
      title: "Sports & Activities",
      description:
        "Indoor and outdoor sports to build confidence and teamwork."
    },
    {
      icon: <FaMusic size={50} />,
      title: "Music & Dance",
      description:
        "Creative programs to develop talent and self-expression."
    }
  ];

  return (
    <section className="why-section">

      <div className="container">

        <div className="text-center mb-5">

          <h5 className="text-warning fw-bold">
            WHY CHOOSE US
          </h5>

          <h2 className="display-5 fw-bold">
            Why Choose KVR Kids Campus?
          </h2>

          <p className="lead">
            We provide a safe, joyful and inspiring environment where
            children learn, grow and succeed.
          </p>

        </div>

        <div className="row">

          {features.map((feature, index) => (

            <div className="col-lg-4 col-md-6 mb-4" key={index}>

              <div className="feature-card">

                <div className="feature-icon">

                  {feature.icon}

                </div>

                <h4>

                  {feature.title}

                </h4>

                <p>

                  {feature.description}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;
