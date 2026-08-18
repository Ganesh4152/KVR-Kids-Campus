import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);

  // =========================================================
  // FEE STATE
  // =========================================================

  const [feeData, setFeeData] = useState(null);
  const [feeLoading, setFeeLoading] = useState(false);
  const [feeError, setFeeError] = useState("");
  const [showFees, setShowFees] = useState(true);


  const toAmount = (value) => {
    const amount = Number(value);
    return Number.isFinite(amount) ? amount : 0;
  };

  const firstAmount = (source, keys) => {
    for (const key of keys) {
      if (source && source[key] !== undefined && source[key] !== null && source[key] !== "") {
        return toAmount(source[key]);
      }
    }
    return 0;
  };

  const getAdmissionNo = (source) =>
    String(
      source?.admissionNo ??
      source?.admissionNumber ??
      source?.admission_id ??
      source?.studentAdmissionNo ??
      source?.student?.admissionNo ??
      ""
    ).trim().toLowerCase();

  const mapFeeResponse = (responseData, student) => {
    const rawList = Array.isArray(responseData)
      ? responseData
      : Array.isArray(responseData?.fees)
        ? responseData.fees
        : Array.isArray(responseData?.data)
          ? responseData.data
          : responseData
            ? [responseData]
            : [];

    const admissionNo = String(student?.admissionNo || "")
      .trim()
      .toLowerCase();

    const matchingFees = rawList.filter((item) => {
      const itemAdmissionNo = getAdmissionNo(item);
      const itemStudentId = String(
        item?.studentId ?? item?.student?.id ?? ""
      );
      const currentStudentId = String(student?.id ?? student?.studentId ?? "");

      return (
        (admissionNo && itemAdmissionNo === admissionNo) ||
        (currentStudentId && itemStudentId === currentStudentId) ||
        (!itemAdmissionNo && !itemStudentId && rawList.length === 1)
      );
    });

    const records = matchingFees.length
      ? matchingFees
      : rawList.length === 1
        ? rawList
        : [];

    if (!records.length) {
      return null;
    }

    let schoolFee = 0;
    let busFee = 0;
    let totalFee = 0;
    let paid = 0;
    let pending = 0;
    let categoryRows = [];

    records.forEach((record) => {
      const category = String(
        record?.feeCategory ??
        record?.category ??
        record?.feeType ??
        "School Fee"
      ).trim();

      const categoryLower = category.toLowerCase();

      const recordSchoolFee = firstAmount(record, [
        "schoolFee",
        "school_fee",
      ]);

      const recordBusFee = firstAmount(record, [
        "busFee",
        "bus_fee",
        "transportFee",
        "transport_fee",
      ]);

      const recordTotal = firstAmount(record, [
        "total",
        "totalFee",
        "total_fee",
        "payableAmount",
        "payable_amount",
      ]);

      const recordPaid = firstAmount(record, [
        "paid",
        "paidAmount",
        "paid_amount",
        "paidFee",
        "paid_fee",
      ]);

      let recordPending = firstAmount(record, [
        "pending",
        "pendingAmount",
        "pending_amount",
        "pendingFee",
        "pending_fee",
        "balance",
        "balanceFee",
        "balance_fee",
      ]);

      if (recordSchoolFee || recordBusFee) {
        schoolFee += recordSchoolFee;
        busFee += recordBusFee;
        totalFee += recordTotal || recordSchoolFee + recordBusFee;
      } else {
        totalFee += recordTotal;

        if (categoryLower.includes("transport") || categoryLower.includes("bus")) {
          busFee += recordTotal;
        } else {
          schoolFee += recordTotal;
        }
      }

      paid += recordPaid;

      if (!recordPending && recordTotal > recordPaid) {
        recordPending = recordTotal - recordPaid;
      }

      pending += recordPending;

      categoryRows.push({
        category: category || "School Fee",
        total: recordTotal || recordSchoolFee + recordBusFee,
        paid: recordPaid,
        pending: recordPending,
        status:
          record?.paymentStatus ||
          record?.payment_status ||
          (recordPending > 0
            ? recordPaid > 0
              ? "PARTIAL"
              : "PENDING"
            : "PAID"),
      });
    });

    // Aggregate-style API responses already contain the final paid/pending values.
    // Use them when present so the student view matches Admin Fee Management exactly.
    const aggregate = rawList.find((item) => {
      const itemAdmissionNo = getAdmissionNo(item);
      return (
        !admissionNo ||
        !itemAdmissionNo ||
        itemAdmissionNo === admissionNo
      );
    });

    const aggregatePaid = firstAmount(aggregate, [
      "paid",
      "totalPaid",
      "total_paid",
      "paidAmount",
      "paid_amount",
      "paidFee",
      "paid_fee",
    ]);

    const aggregatePending = firstAmount(aggregate, [
      "pending",
      "totalPending",
      "total_pending",
      "pendingAmount",
      "pending_amount",
      "pendingFee",
      "pending_fee",
    ]);

    const aggregateTotal = firstAmount(aggregate, [
      "total",
      "grandTotal",
      "grand_total",
      "totalFee",
      "total_fee",
      "payableAmount",
      "payable_amount",
    ]);

    const aggregateSchoolFee = firstAmount(aggregate, [
      "schoolFee",
      "school_fee",
    ]);

    const aggregateBusFee = firstAmount(aggregate, [
      "busFee",
      "bus_fee",
      "transportFee",
      "transport_fee",
    ]);

    if (aggregate) {
      if (aggregateTotal) {
        totalFee = aggregateTotal;
      }
      if (aggregatePaid || aggregate?.paid !== undefined || aggregate?.paidAmount !== undefined) {
        paid = aggregatePaid;
      }
      if (aggregatePending || aggregate?.pending !== undefined || aggregate?.pendingAmount !== undefined) {
        pending = aggregatePending;
      }

      if (aggregateSchoolFee) {
        schoolFee = aggregateSchoolFee;
      }
      if (aggregateBusFee) {
        busFee = aggregateBusFee;
      }
    }

    // Final consistency rule: pending is always total - paid when API pending is absent.
    if (!pending && totalFee > paid) {
      pending = totalFee - paid;
    }

    if (!totalFee && (schoolFee || busFee)) {
      totalFee = schoolFee + busFee;
    }

    let details = categoryRows;

    const aggregateHasSeparateFees =
      aggregate && (aggregateSchoolFee > 0 || aggregateBusFee > 0);

    if (aggregateHasSeparateFees) {
      const schoolPaid = Math.min(paid, schoolFee);
      const busPaid = Math.max(0, paid - schoolPaid);

      details = [];

      if (schoolFee > 0) {
        const schoolPending = Math.max(0, schoolFee - schoolPaid);
        details.push({
          category: "School Fee",
          total: schoolFee,
          paid: schoolPaid,
          pending: schoolPending,
          status: schoolPending > 0
            ? schoolPaid > 0
              ? "PARTIAL"
              : "PENDING"
            : "PAID",
        });
      }

      if (busFee > 0) {
        const busPending = Math.max(0, busFee - busPaid);
        details.push({
          category: "Bus Fee",
          total: busFee,
          paid: busPaid,
          pending: busPending,
          status: busPending > 0
            ? busPaid > 0
              ? "PARTIAL"
              : "PENDING"
            : "PAID",
        });
      }
    }

    if (!details.length) {
      details = [
        {
          category: "School Fee",
          total: totalFee,
          paid,
          pending,
          status: pending > 0
            ? paid > 0
              ? "PARTIAL"
              : "PENDING"
            : "PAID",
        },
      ];
    }

    return {
      totalFee,
      paid,
      pending,
      schoolFee,
      busFee,
      academicYear:
        aggregate?.academicYear ||
        aggregate?.academic_year ||
        student?.academicYear ||
        "-",
      details,
    };
  };

  const loadStudentFees = async (student) => {
    const admissionNo = String(student?.admissionNo || "").trim();

    if (!admissionNo) {
      setFeeError("Admission ID is missing.");
      return;
    }

    try {
      setFeeLoading(true);
      setFeeError("");

      const response = await fetch(
        "http://localhost:8080/api/fees"
      );

      if (!response.ok) {
        throw new Error("Unable to load fee details.");
      }

      const data = await response.json();
      const mappedFees = mapFeeResponse(data, student);

      if (!mappedFees) {
        setFeeData(null);
        setFeeError("No fee record found for this student.");
        return;
      }

      setFeeData(mappedFees);
    } catch (error) {
      console.error("Student fee load error:", error);
      setFeeData(null);
      setFeeError(
        "Unable to load fee details. Please try again."
      );
    } finally {
      setFeeLoading(false);
    }
  };

  useEffect(() => {
    /*
     * Primary student session.
     */
    const storedStudent =
      localStorage.getItem("student");

    /*
     * Compatibility with old session.
     */
    const storedStudentData =
      localStorage.getItem("studentData");

    let student = null;

    try {
      if (storedStudent) {
        student = JSON.parse(storedStudent);
      } else if (storedStudentData) {
        student = JSON.parse(storedStudentData);
      }
    } catch (error) {
      console.error(
        "Unable to read student session:",
        error
      );

      localStorage.removeItem("student");
      localStorage.removeItem("studentData");
    }

    if (!student) {
      navigate("/student/login", {
        replace: true,
      });

      return;
    }

    setStudentData(student);
    loadStudentFees(student);

  }, [navigate]);

  const handleLogout = () => {

    localStorage.removeItem("student");
    localStorage.removeItem("studentData");
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("studentAdmissionNo");

    navigate("/student/login", {
      replace: true,
    });
  };

  /*
   * Wait until session is loaded.
   */
  if (!studentData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <p className="mt-3 text-muted">
            Loading student dashboard...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef7ff 0%, #fff4e6 50%, #fcecff 100%)",
      }}
    >

      {/* Navbar */}

      <nav
        style={{
          background:
            "linear-gradient(90deg, #0d6efd, #6f42c1)",
          padding: "16px 0",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">

          <div
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            🏫 KVR Kids Campus
          </div>

          <button
            className="btn btn-light fw-bold"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Main */}

      <div className="container py-5">

        {/* Welcome */}

        <div
          className="card border-0 shadow-lg mb-4"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(90deg, #0d6efd, #6f42c1)",
              color: "white",
              padding: "30px",
            }}
          >

            <div className="row align-items-center">

              <div className="col-md-8">

                <div
                  style={{
                    fontSize: "18px",
                    opacity: 0.9,
                  }}
                >
                  🎓 Student Portal
                </div>

                <h1
                  className="fw-bold mt-2 mb-2"
                >
                  Welcome, {studentData.fullName}
                </h1>

                <p className="mb-0">
                  KVR Kids Campus
                </p>

              </div>

              <div className="col-md-4 text-md-end mt-3 mt-md-0">

                <div
                  className="bg-white text-primary d-inline-block p-3"
                  style={{
                    borderRadius: "15px",
                  }}
                >

                  <div className="small">
                    Admission ID
                  </div>

                  <div className="fw-bold fs-5">
                    {studentData.admissionNo}
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Student Information */}

        <div className="row g-4">

          <div className="col-md-6 col-lg-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  👨‍🎓 Student Details
                </h5>

                <hr />

                <p>
                  <strong>Name:</strong>{" "}
                  {studentData.fullName || "-"}
                </p>

                <p>
                  <strong>Admission ID:</strong>{" "}
                  {studentData.admissionNo || "-"}
                </p>

                <p>
                  <strong>Roll No:</strong>{" "}
                  {studentData.rollNo || "-"}
                </p>

                <p>
                  <strong>Gender:</strong>{" "}
                  {studentData.gender || "-"}
                </p>

              </div>

            </div>

          </div>

          {/* Class */}

          <div className="col-md-6 col-lg-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  🏫 Class Information
                </h5>

                <hr />

                <p>
                  <strong>Class:</strong>{" "}
                  {studentData.className ||
                    studentData.classId ||
                    "-"}
                </p>

                <p>
                  <strong>Section:</strong>{" "}
                  {studentData.section || "-"}
                </p>

                <p>
                  <strong>Academic Year:</strong>{" "}
                  {studentData.academicYear || "-"}
                </p>

              </div>

            </div>

          </div>

          {/* Parent */}

          <div className="col-md-6 col-lg-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  👨‍👩‍👦 Parent Details
                </h5>

                <hr />

                <p>
                  <strong>Father:</strong>{" "}
                  {studentData.fatherName || "-"}
                </p>

                <p>
                  <strong>Mother:</strong>{" "}
                  {studentData.motherName || "-"}
                </p>

                <p>
                  <strong>Mobile:</strong>{" "}
                  {studentData.parentMobile || "-"}
                </p>

              </div>

            </div>

          </div>

          {/* Attendance */}

          <div className="col-md-6 col-lg-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  📅 Attendance
                </h5>

                <hr />

                <p className="text-muted">
                  Attendance details will appear here.
                </p>

                <button
                  className="btn btn-primary"
                  disabled
                >
                  View Attendance
                </button>

              </div>

            </div>

          </div>

          {/* Fees */}

          <div className="col-md-6 col-lg-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">
                    💰 Fees
                  </h5>

                  {feeData && feeData.pending > 0 && (
                    <span className="badge bg-danger">
                      PENDING
                    </span>
                  )}
                </div>

                <hr />

                {feeLoading ? (
                  <div className="text-center py-3">
                    <div
                      className="spinner-border spinner-border-sm text-warning"
                      role="status"
                    />
                    <span className="ms-2 text-muted">
                      Loading fee details...
                    </span>
                  </div>
                ) : feeError ? (
                  <div>
                    <p className="text-danger mb-3">
                      {feeError}
                    </p>

                    <button
                      className="btn btn-warning"
                      onClick={() => loadStudentFees(studentData)}
                    >
                      Retry Fees
                    </button>
                  </div>
                ) : feeData ? (
                  <>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Fee</span>
                      <strong className="text-primary">
                        ₹{feeData.totalFee.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Paid</span>
                      <strong className="text-success">
                        ₹{feeData.paid.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span>Pending</span>
                      <strong className="text-danger">
                        ₹{feeData.pending.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <button
                      className="btn btn-warning mb-3"
                      onClick={() => setShowFees(!showFees)}
                    >
                      {showFees ? "Hide Fees" : "View Fees"}
                    </button>

                    {showFees && (
                      <div>
                        <div className="fw-bold mb-2">
                          Fee Details
                        </div>

                        <div className="table-responsive">
                          <table
                            className="table table-sm table-bordered mb-0"
                            style={{ fontSize: "13px" }}
                          >
                            <thead className="table-warning">
                              <tr>
                                <th>Category</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Pending</th>
                                <th>Status</th>
                              </tr>
                            </thead>

                            <tbody>
                              {feeData.details.map((item, index) => (
                                <tr key={`${item.category}-${index}`}>
                                  <td>{item.category}</td>
                                  <td>
                                    ₹{Number(item.total || 0).toLocaleString("en-IN")}
                                  </td>
                                  <td className="text-success">
                                    ₹{Number(item.paid || 0).toLocaleString("en-IN")}
                                  </td>
                                  <td className="text-danger">
                                    ₹{Number(item.pending || 0).toLocaleString("en-IN")}
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        item.status === "PAID"
                                          ? "bg-success"
                                          : "bg-danger"
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}


                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted mb-0">
                    No fee details available.
                  </p>
                )}

              </div>

            </div>

          </div>

        {/* Marks */}

          <div className="col-md-6 col-lg-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  📊 Marks Memo
                </h5>

                <hr />

                <p className="text-muted">
                  Examination marks will appear here.
                </p>

                <button
                  className="btn btn-success"
                  disabled
                >
                  View Marks
                </button>

              </div>

            </div>

          </div>

          {/* Class Teacher */}

          <div className="col-md-6 col-lg-4">

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  👨‍🏫 Class Teacher
                </h5>

                <hr />

                <p className="text-muted">
                  Class teacher details will appear here.
                </p>

                <button
                  className="btn btn-info"
                  disabled
                >
                  View Teacher
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;