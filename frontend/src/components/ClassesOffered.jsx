import {
  FaBaby,
  FaChild,
  FaBook,
  FaSchool,
  FaUserGraduate,
  FaAward
} from "react-icons/fa";

const classes = [
  {
    icon: <FaBaby />,
    title: "Nursery",
    age: "Age: 3+ Years",
    description: "Fun-filled learning through play, music, stories, and activities."
  },
  {
    icon: <FaChild />,
    title: "LKG & UKG",
    age: "Age: 4–5 Years",
    description: "Strong foundation in language, numbers, creativity, and confidence."
  },
  {
    icon: <FaBook />,
    title: "Grade I – V",
    age: "Primary School",
    description: "Interactive learning with English, Mathematics, Science, and EVS."
  },
  {
    icon: <FaSchool />,
    title: "Grade VI – VIII",
    age: "Middle School",
    description: "Project-based learning with practical activities and teamwork."
  },
  {
    icon: <FaUserGraduate />,
    title: "Grade IX – X",
    age: "High School",
    description: "Board exam preparation, career guidance, and academic excellence."
  },
  {
    icon: <FaAward />,
    title: "Special Programs",
    age: "All Classes",
    description: "Sports, Yoga, Music, Dance, Art, Robotics, Coding, and Leadership."
  }
];

function ClassesOffered() {
  return (
    <section id="classes" className="classes-section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-badge">
            🎓 Classes Offered
          </span>

          <h2 className="section-title">
            From Nursery to Grade X
          </h2>

          <p className="section-subtitle">
            Every child learns at their own pace. Our curriculum supports
            academic excellence, creativity, and character development.
          </p>

        </div>

        <div className="row g-4">

          {classes.map((item, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >

              <div className="class-card">

                <div className="class-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

                <h6>{item.age}</h6>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ClassesOffered;
