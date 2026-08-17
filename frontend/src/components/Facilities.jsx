import library from "../assets/images/facilities/library.jpg";
import computerLab from "../assets/images/facilities/computer-lab.jpg";
import scienceLab from "../assets/images/facilities/science-lab.jpg";
import playground from "../assets/images/facilities/playground.jpg";
import transport from "../assets/images/facilities/transport.jpg";
import security from "../assets/images/facilities/security.jpg";
import swimmingPool from "../assets/images/facilities/swimming-pool.jpg";

function Facilities() {
  const facilities = [
    {
      image: library,
      title: "Library",
      description:
        "A rich collection of books to inspire reading, imagination and learning."
    },
    {
      image: computerLab,
      title: "Computer Lab",
      description:
        "Modern computers and technology to develop digital skills."
    },
    {
      image: scienceLab,
      title: "Science Lab",
      description:
        "Hands-on experiments that make science exciting and practical."
    },
    {
      image: playground,
      title: "Playground",
      description:
        "A safe outdoor space for sports, games and physical activities."
    },
    {
      image: transport,
      title: "School Transport",
      description:
        "Safe and comfortable school buses with trained drivers and attendants."
    },
    {
      image: security,
      title: "CCTV Security",
      description:
        "A secure campus with CCTV surveillance for student safety."
    },
    {
      image: swimmingPool,
      title: "Swimming Pool",
      description:
        "Safe swimming activities with proper supervision and trained instructors."
    }
  ];

  return (
    <section className="facilities-section">

      <div className="container">

        {/* Section Heading */}
        <div className="text-center mb-5">

          <h5 className="text-warning fw-bold">
            OUR FACILITIES
          </h5>

          <h2 className="display-5 fw-bold">
            World-Class Learning Environment
          </h2>

          <p className="lead">
            We provide modern facilities that help children
            learn, explore and grow.
          </p>

        </div>

        {/* Facilities Cards */}
        <div className="row">

          {facilities.map((facility, index) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={index}
            >

              <div className="facility-card">

                <img
                  src={facility.image}
                  alt={facility.title}
                  className="facility-image"
                />

                <div className="facility-content">

                  <h4>
                    {facility.title}
                  </h4>

                  <p>
                    {facility.description}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Facilities;
