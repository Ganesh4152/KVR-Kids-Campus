import { useState } from "react";

import {
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa";

import AdmissionApplicationForm
  from "./AdmissionApplicationForm";

function Admissions() {

  const [showApplicationForm, setShowApplicationForm] =
    useState(false);

  return (
    <>
      <section
        id="admissions"
        className="admissions-section"
      >

        <div className="container">

          <div className="row align-items-center">

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="col-lg-7">

              <span className="admission-badge">
                🎓 Admissions Open 2027 – 2028
              </span>


              <h2 className="admission-title">
                Give Your Child the Best Start
              </h2>


              <p className="admission-text">
                Admissions are now open from Nursery to Grade X.
                Join KMR Kids Campus and provide your child with
                quality education, caring teachers, modern
                facilities, and joyful learning.
              </p>


              <div className="admission-list">

                <div className="admission-item">
                  <FaCheckCircle className="icon" />
                  Smart Digital Classrooms
                </div>


                <div className="admission-item">
                  <FaCheckCircle className="icon" />
                  Experienced Teachers
                </div>


                <div className="admission-item">
                  <FaCheckCircle className="icon" />
                  Safe School Transport
                </div>


                <div className="admission-item">
                  <FaCheckCircle className="icon" />
                  Sports & Activity-Based Learning
                </div>

              </div>


              <div className="admission-buttons">

                <button
                  type="button"
                  className="btn btn-warning btn-lg me-3"
                  onClick={() =>
                    setShowApplicationForm(true)
                  }
                >
                  Apply Now
                  <FaArrowRight className="ms-2" />
                </button>


                <button
                  type="button"
                  className="btn btn-light btn-lg"
                  onClick={() =>
                    window.print()
                  }
                >
                  Download Brochure
                </button>

              </div>

            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="col-lg-5">

              <div className="contact-card">

                <h3>
                  Need Help?
                </h3>


                <p>
                  Contact our Admission Office.
                </p>


                <div className="contact-item">
                  <FaPhoneAlt />
                  <span>
                    +91 7674050823
                  </span>
                </div>


                <div className="contact-item">
                  <FaEnvelope />
                  <span>
                    admissions@kmrkidscampus.com
                  </span>
                </div>


                <button
                  type="button"
                  className="btn btn-primary w-100 mt-4"
                  onClick={() =>
                    setShowApplicationForm(true)
                  }
                >
                  Apply for Admission
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          APPLICATION FORM
      ===================================================== */}

      {showApplicationForm && (
        <AdmissionApplicationForm
          onClose={() =>
            setShowApplicationForm(false)
          }
        />
      )}

    </>
  );
}

export default Admissions;