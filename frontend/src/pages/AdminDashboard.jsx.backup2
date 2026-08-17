import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "{}"
  );


  const handleLogout = () => {

    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoggedIn");

    navigate("/admin/login");
  };


  const cards = [
    {
      icon: "👨‍🎓",
      title: "Students",
      description: "Manage students",
      color: "primary",
      path: "/admin/students"
    },

    {
      icon: "🏫",
      title: "Classes",
      description: "Manage classes and sections",
      color: "success",
      path: "/admin/classes"
    },

    {
      icon: "👩‍🏫",
      title: "Teachers",
      description: "Manage teaching staff",
      color: "info",
      path: "/admin/teachers"
    },

    {
      icon: "📋",
      title: "Attendance",
      description: "Manage student attendance",
      color: "warning",
      path: "/admin/attendance"
    },

    {
      icon: "💰",
      title: "Fees",
      description: "Manage school fees",
      color: "danger",
      path: "/admin/fees"
    },

    {
      icon: "📊",
      title: "Marks",
      description: "Manage student marks",
      color: "secondary",
      path: "/admin/marks"
    },

    {
      icon: "📝",
      title: "Admissions",
      description: "Manage new admissions",
      color: "dark",
      path: "/admin/admissions"
    },

    {
      icon: "📈",
      title: "Reports",
      description: "View school reports",
      color: "primary",
      path: "/admin/reports"
    }
  ];


  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff, #fff4e6, #f4efff)"
      }}
    >

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="navbar navbar-dark bg-primary shadow-sm">

        <div className="container">

          <span className="navbar-brand fw-bold">
            🏫 KVR Kids Campus
          </span>


          <button
            className="btn btn-light fw-bold"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      <div className="container py-5">

        <div className="mb-5">

          <h1 className="fw-bold">
            👋 Welcome,{" "}
            {adminUser.fullName || "Admin"}
          </h1>

          <p className="text-muted">
            KVR Kids Campus Administration Dashboard
          </p>

        </div>


        {/* =====================================================
            ADMIN MENU
        ===================================================== */}

        <div className="row g-4">

          {cards.map((card) => (

            <div
              className="col-md-6 col-lg-3"
              key={card.title}
            >

              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  borderRadius: "18px"
                }}
                onClick={() =>
                  navigate(card.path)
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                  e.currentTarget.classList.add(
                    "shadow-lg"
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.classList.remove(
                    "shadow-lg"
                  );
                }}
              >

                <div className="card-body text-center p-4">

                  <div
                    style={{
                      fontSize: "45px"
                    }}
                  >
                    {card.icon}
                  </div>


                  <h5 className="fw-bold mt-3">

                    {card.title}

                  </h5>


                  <p className="text-muted mb-3">

                    {card.description}

                  </p>


                  <span
                    className={`badge bg-${card.color}`}
                  >
                    Open →
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;