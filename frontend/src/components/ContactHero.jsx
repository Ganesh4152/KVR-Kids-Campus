import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

function ContactHero() {
  return (
    <section className="contact-hero">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10 text-center">

            <span className="contact-badge">
              📞 Contact KVR Kids Campus
            </span>

            <h1 className="contact-title">
              We're Here to Help
            </h1>

            <p className="contact-description">
              We'd love to hear from you. Contact us for admissions,
              school information, fee details, or any other enquiries.
            </p>

            <div className="contact-hero-card">

              <div className="contact-row">
                <FaPhoneAlt className="contact-icon" />
                <span>
                  <strong>Mobile :</strong> +91 76740 50823
                </span>
              </div>

              <div className="contact-row">
                <FaWhatsapp className="contact-icon whatsapp" />
                <span>
                  <strong>WhatsApp :</strong> +91 76740 50823
                </span>
              </div>

              <div className="contact-row">
                <FaEnvelope className="contact-icon" />
                <span>
                  <strong>Email :</strong> info@kvrkidscampus.com
                </span>
              </div>

              <div className="contact-row">
                <FaMapMarkerAlt className="contact-icon location" />
                <span>
                  <strong>Address :</strong><br />

                  KVR Kids Campus,<br />

                  Vayalpadu - Tharigonda Road,<br />

                  Near HP Bunk,<br />

                  Vayalpadu,<br />

                  Andhra Pradesh - 517299,<br />

                  India.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactHero;
