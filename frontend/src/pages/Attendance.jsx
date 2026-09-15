import { useEffect, useState } from "react";

const API_BASE = "/api";

function Attendance() {

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [selectedClass, setSelectedClass] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  const [academicYear, setAcademicYear] =
    useState("2026-2027");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");


  // =========================================================
  // LOAD CLASSES
  // =========================================================

  useEffect(() => {

    loadClasses();

  }, []);


  // =========================================================
  // LOAD STUDENTS WHEN CLASS CHANGES
  // =========================================================

  useEffect(() => {

    if (selectedClass) {

      loadStudents();
      loadExistingAttendance();

    } else {

      setStudents([]);
      setAttendance({});
    }

  }, [
    selectedClass,
    selectedDate
  ]);


  // =========================================================
  // LOAD CLASSES
  // =========================================================

  async function loadClasses() {

    try {

      const response =
        await fetch(
          `${API_BASE}/classes`
        );

      if (!response.ok) {
        throw new Error(
          "Unable to load classes"
        );
      }

      const data =
        await response.json();

      setClasses(data);

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to load classes"
      );
    }
  }


  // =========================================================
  // LOAD ACTIVE STUDENTS
  // =========================================================

  async function loadStudents() {

    try {

      setLoading(true);

      const response =
        await fetch(
          `${API_BASE}/students/class/${selectedClass}/status/ACTIVE`
        );

      if (!response.ok) {
        throw new Error(
          "Unable to load students"
        );
      }

      const data =
        await response.json();

      setStudents(data);

      // Default every student to PRESENT
      const defaultAttendance = {};

      data.forEach(student => {

        defaultAttendance[student.id] =
          "PRESENT";

      });

      setAttendance(
        defaultAttendance
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to load students"
      );

    } finally {

      setLoading(false);
    }
  }


  // =========================================================
  // LOAD EXISTING ATTENDANCE
  // =========================================================

  async function loadExistingAttendance() {

    try {

      const response =
        await fetch(
          `${API_BASE}/attendance/class/${selectedClass}/date/${selectedDate}`
        );

      if (!response.ok) {
        return;
      }

      const data =
        await response.json();

      setAttendance(previous => {

        const updated = {
          ...previous
        };

        data.forEach(record => {

          updated[record.studentId] =
            record.status;

        });

        return updated;
      });

    } catch (error) {

      console.error(
        "Existing attendance could not be loaded",
        error
      );
    }
  }


  // =========================================================
  // CHANGE STATUS
  // =========================================================

  function changeStatus(
    studentId,
    status
  ) {

    setAttendance(previous => ({
      ...previous,
      [studentId]: status
    }));
  }


  // =========================================================
  // MARK ALL PRESENT
  // =========================================================

  function markAllPresent() {

    const updated = {};

    students.forEach(student => {

      updated[student.id] =
        "PRESENT";

    });

    setAttendance(updated);
  }


  // =========================================================
  // SAVE ATTENDANCE
  // =========================================================

  async function saveAttendance() {

    if (!selectedClass) {

      alert(
        "Please select a class"
      );

      return;
    }

    if (!students.length) {

      alert(
        "No students found"
      );

      return;
    }

    try {

      setLoading(true);
      setMessage("");

      const payload =
        students.map(student => ({

          studentId:
            student.id,

          classId:
            Number(selectedClass),

          attendanceDate:
            selectedDate,

          academicYear:
            academicYear,

          status:
            attendance[student.id] ||
            "PRESENT",

          remarks:
            ""

        }));


      console.log(
        "Attendance payload:",
        payload
      );


      const response =
        await fetch(
          `${API_BASE}/attendance/bulk`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(payload)
          }
        );


      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
          "Failed to save attendance"
        );
      }


      await response.json();

      setMessage(
        "Attendance saved successfully!"
      );

    } catch (error) {

      console.error(error);

      setMessage(
        `Failed to save attendance: ${error.message}`
      );

    } finally {

      setLoading(false);
    }
  }


  // =========================================================
  // HELPERS
  // =========================================================

  function getStudentName(student) {

    return (
      student.fullName ||
      `${student.firstName || ""} ${student.lastName || ""}`.trim()
    );
  }


  function getStatusClass(status) {

    if (status === "PRESENT")
      return "btn-success";

    if (status === "ABSENT")
      return "btn-danger";

    if (status === "LATE")
      return "btn-warning";

    if (status === "HALF_DAY")
      return "btn-info";

    return "btn-secondary";
  }


  // =========================================================
  // UI
  // =========================================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff, #fff4e6, #f4efff)"
      }}
    >

      {/* HEADER */}

      <nav
        className="navbar navbar-dark"
        style={{
          background:
            "linear-gradient(90deg, #1473ff, #6542d3)"
        }}
      >

        <div className="container">

          <span
            className="navbar-brand fw-bold"
          >
            🏫 KVR Kids Campus
          </span>

          <a
            href="/admin/dashboard"
            className="btn btn-light fw-bold"
          >
            ← Admin Dashboard
          </a>

        </div>

      </nav>


      {/* MAIN */}

      <div
        className="container py-5"
      >

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1
              className="fw-bold text-primary"
            >
              📋 Attendance Management
            </h1>

            <p className="text-muted mb-0">
              Manage daily student attendance
            </p>

          </div>

        </div>


        {/* FILTER CARD */}

        <div
          className="card border-0 shadow-sm mb-4"
        >

          <div className="card-body">

            <div className="row g-3 align-items-end">

              {/* DATE */}

              <div className="col-md-3">

                <label
                  className="form-label fw-bold"
                >
                  Attendance Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={e =>
                    setSelectedDate(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* CLASS */}

              <div className="col-md-3">

                <label
                  className="form-label fw-bold"
                >
                  Class
                </label>

                <select
                  className="form-select"
                  value={selectedClass}
                  onChange={e =>
                    setSelectedClass(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Class
                  </option>

                  {classes.map(cls => (

                    <option
                      key={
                        cls.id ||
                        cls.classId
                      }
                      value={
                        cls.id ||
                        cls.classId
                      }
                    >

                      {cls.className ||
                        cls.name ||
                        cls.classLabel ||
                        `Class ${cls.id}`}

                    </option>

                  ))}

                </select>

              </div>


              {/* ACADEMIC YEAR */}

              <div className="col-md-3">

                <label
                  className="form-label fw-bold"
                >
                  Academic Year
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={academicYear}
                  onChange={e =>
                    setAcademicYear(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* MARK ALL */}

              <div className="col-md-3">

                <button
                  className="btn btn-outline-success w-100"
                  onClick={
                    markAllPresent
                  }
                >
                  ✓ Mark All Present
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* MESSAGE */}

        {message && (

          <div
            className="alert alert-info"
          >
            {message}
          </div>

        )}


        {/* TABLE */}

        <div
          className="card border-0 shadow-sm"
        >

          <div className="card-body">

            {!selectedClass ? (

              <div
                className="text-center py-5"
              >

                <div
                  style={{
                    fontSize: "60px"
                  }}
                >
                  📚
                </div>

                <h4>
                  Select a class
                </h4>

                <p className="text-muted">
                  Students will appear here
                  after selecting a class.
                </p>

              </div>

            ) : loading && !students.length ? (

              <div
                className="text-center py-5"
              >
                Loading students...
              </div>

            ) : !students.length ? (

              <div
                className="text-center py-5"
              >

                <div
                  style={{
                    fontSize: "60px"
                  }}
                >
                  👨‍🎓
                </div>

                <h4>
                  No active students
                </h4>

              </div>

            ) : (

              <>

                <div
                  className="table-responsive"
                >

                  <table
                    className="table table-hover align-middle"
                  >

                    <thead
                      className="table-light"
                    >

                      <tr>

                        <th>
                          #
                        </th>

                        <th>
                          Roll No
                        </th>

                        <th>
                          Admission No
                        </th>

                        <th>
                          Student
                        </th>

                        <th>
                          Attendance Status
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {students.map(
                        (student, index) => {

                          const status =
                            attendance[
                              student.id
                            ] ||
                            "PRESENT";

                          return (

                            <tr
                              key={
                                student.id
                              }
                            >

                              <td>
                                {index + 1}
                              </td>

                              <td>
                                <strong>
                                  {
                                    student.rollNo
                                  }
                                </strong>
                              </td>

                              <td>
                                {
                                  student.admissionNo
                                }
                              </td>

                              <td>

                                <strong>
                                  {
                                    getStudentName(
                                      student
                                    )
                                  }
                                </strong>

                                <br />

                                <small
                                  className="text-muted"
                                >
                                  {
                                    student.parentMobile
                                  }
                                </small>

                              </td>

                              <td>

                                <div
                                  className="btn-group"
                                  role="group"
                                >

                                  <button
                                    className={`btn btn-sm ${
                                      status ===
                                      "PRESENT"
                                        ? "btn-success"
                                        : "btn-outline-success"
                                    }`}
                                    onClick={() =>
                                      changeStatus(
                                        student.id,
                                        "PRESENT"
                                      )
                                    }
                                  >
                                    ✓ Present
                                  </button>


                                  <button
                                    className={`btn btn-sm ${
                                      status ===
                                      "ABSENT"
                                        ? "btn-danger"
                                        : "btn-outline-danger"
                                    }`}
                                    onClick={() =>
                                      changeStatus(
                                        student.id,
                                        "ABSENT"
                                      )
                                    }
                                  >
                                    ✕ Absent
                                  </button>


                                  <button
                                    className={`btn btn-sm ${
                                      status ===
                                      "LATE"
                                        ? "btn-warning"
                                        : "btn-outline-warning"
                                    }`}
                                    onClick={() =>
                                      changeStatus(
                                        student.id,
                                        "LATE"
                                      )
                                    }
                                  >
                                    ⏰ Late
                                  </button>


                                  <button
                                    className={`btn btn-sm ${
                                      status ===
                                      "HALF_DAY"
                                        ? "btn-info"
                                        : "btn-outline-info"
                                    }`}
                                    onClick={() =>
                                      changeStatus(
                                        student.id,
                                        "HALF_DAY"
                                      )
                                    }
                                  >
                                    ½ Day
                                  </button>

                                </div>

                              </td>

                            </tr>

                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>


                {/* SAVE */}

                <div
                  className="d-flex justify-content-between align-items-center mt-4"
                >

                  <div>

                    <strong>
                      Total Students:
                    </strong>{" "}
                    {students.length}

                  </div>


                  <button
                    className="btn btn-primary btn-lg px-5 fw-bold"
                    onClick={
                      saveAttendance
                    }
                    disabled={loading}
                  >

                    {loading
                      ? "Saving..."
                      : "💾 Save Attendance"}

                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Attendance;